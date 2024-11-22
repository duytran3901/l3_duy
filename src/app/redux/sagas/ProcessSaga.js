import { put, call, takeEvery } from "redux-saga/effects";
import {
  getProcessListByIdEmployee,
  createProcess,
  editProcess,
  deleteProcess,
  getProcessListByLeader
} from "../reducers/ProcessReducer";
import { toast } from "react-toastify";
import { PROCESS } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiProcessURL = ConstantList.API_ENPOINT + "process";
const SUCCESS_CODE = 200;

function* createProcessSaga(action) {
  try {
    console.log(action.payload);
    const { employeeId, data, type } = action.payload;
    const result = yield call(postData, apiProcessURL + '?employeeId=' + employeeId, data);
    if (result?.code === SUCCESS_CODE) {
      yield put(createProcess(result?.data));
      if (type) {
        toast.success('Trình lãnh đạo thành công!')
      } else toast.success('Thêm thành công!');
    } else {
      toast.error(`Thêm không thành công! ${result?.data?.message}`);
    }
  } catch (error) {
    if (error) {
      toast.error('Thêm không thành công!');
    }
  }
}

function* editProcessSaga(action) {
  const editProcessUrl = apiProcessURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editProcessUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editProcess(result?.data));
      if (action.payload?.type) {
        toast.success('Trình lãnh đạo thành công!');
      } else toast.success('Chỉnh sửa thành công!');
    } else {
      toast.error(`Có lỗi xảy ra!`);
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra!');
    }
  }
}

function* getProcesssByIdEmployeeSaga(action) {
  const getProcessListUrl = apiProcessURL;
  try {
    const result = yield call(getData, getProcessListUrl, action.payload);
    console.log('result: ', result);

    if (result?.code === SUCCESS_CODE) {
      yield put(getProcessListByIdEmployee(result?.data));
    } else {
      toast.error('Không lấy được danh sách đề xuất!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách đề xuất!');
    }
  }
}

function* getProcesssByLeaderSaga() {
  const getProcesssUrl = apiProcessURL + '/current-leader';
  try {
    const result = yield call(getData, getProcesssUrl);
    console.log(result.data);

    if (result?.code === SUCCESS_CODE) {
      yield put(getProcessListByLeader(result?.data));
    } else {
      toast.error('Không lấy được danh sách đề xuất!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách đề xuất!');
    }
  }
}

function* deleteProcessSaga(action) {
  const deleteProcessUrl = apiProcessURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteProcessUrl);
    console.log(result);

    if (result?.code === SUCCESS_CODE) {
      yield put(deleteProcess(action.payload));
      toast.success('Xóa thành công!');
    } else {
      toast.error('Xóa không thành công!');
    }
  } catch (error) {
    if (error) {
      toast.error('Xóa không thành công!');
    }
  }
}

export default function* processSaga() {
  yield takeEvery(PROCESS.CREATE_PROCESS, createProcessSaga);
  yield takeEvery(PROCESS.UPDATE_PROCESS, editProcessSaga);
  yield takeEvery(PROCESS.GET_PROCESS_LIST, getProcesssByIdEmployeeSaga);
  yield takeEvery(PROCESS.GET_PROCESS_LIST_BY_LEADER, getProcesssByLeaderSaga);
  yield takeEvery(PROCESS.DELETE_PROCESS, deleteProcessSaga);
}