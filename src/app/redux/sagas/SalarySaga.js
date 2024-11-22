import { put, call, takeEvery } from "redux-saga/effects";
import {
  getSalarysByIdEmployee,
  createSalary,
  editSalary,
  deleteSalary,
  getSalarysByLeader
} from "../reducers/SalaryReducer";
import { toast } from "react-toastify";
import { SALARY } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiSalaryURL = ConstantList.API_ENPOINT + "salary-increase";
const SUCCESS_CODE = 200;

function* createSalarySaga(action) {
  try {
    console.log(action.payload);
    const { employeeId, data, type } = action.payload;
    const result = yield call(postData, apiSalaryURL + '?employeeId=' + employeeId, data);
    if (result?.code === SUCCESS_CODE) {
      yield put(createSalary(result?.data));
      if (type) {
        toast.success('Trình lãnh đạo thành công!')
      } else toast.success('Thêm thành công!');
    } else {
      toast.error(`Có lỗi xảy ra!`);
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra!');
    }
  }
}

function* editSalarySaga(action) {
  const editSalaryUrl = apiSalaryURL + `/${action.payload?.id}`;
  try {
    const result = yield call(putData, editSalaryUrl, action.payload?.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editSalary(result?.data));
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

function* getSalarysByIdEmployeeSaga(action) {
  const getSalarysUrl = apiSalaryURL;
  try {
    const result = yield call(getData, getSalarysUrl, action.payload);
    console.log('result: ' ,result.data);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(getSalarysByIdEmployee(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* getSalarysByLeaderSaga() {
  const getSalarysUrl = apiSalaryURL + '/current-leader';
  try {
    const result = yield call(getData, getSalarysUrl);
    console.log(result.data);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(getSalarysByLeader(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* deleteSalarySaga(action) {
  const deleteSalaryUrl = apiSalaryURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteSalaryUrl);
    console.log(result);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteSalary(action.payload));
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

export default function* salarySaga() {
  yield takeEvery(SALARY.CREATE_SALARY, createSalarySaga);
  yield takeEvery(SALARY.UPDATE_SALARY, editSalarySaga);
  yield takeEvery(SALARY.GET_SALARYS, getSalarysByIdEmployeeSaga);
  yield takeEvery(SALARY.GET_SALARYS_BY_LEADER, getSalarysByLeaderSaga);
  yield takeEvery(SALARY.DELETE_SALARY, deleteSalarySaga);
}