import { put, call, takeEvery } from "redux-saga/effects";
import {
  getExperiencesByIdEmployee,
  createExperience,
  editExperience,
  deleteExperience
} from "../reducers/ExperienceReducer";
import { toast } from "react-toastify";
import { EXPERIENCE } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiExperienceURL = ConstantList.API_ENPOINT + "experience";
const SUCCESS_CODE = 200;

function* createExperienceSaga(action) {
  try {
    const { idEmployee, data } = action.payload;
    const result = yield call(postData, apiExperienceURL + '?employeeId=' + idEmployee, data);
    if (result?.code === SUCCESS_CODE) {
      yield put(createExperience(result?.data));
      toast.success('Thêm thành công!');
    } else {
      toast.error(`Thêm không thành công! ${result?.data?.message}`);
    }
  } catch (error) {
    if (error) {
      toast.error('Thêm không thành công!');
    }
  }
}

function* editExperienceSaga(action) {
  const editExperienceUrl = apiExperienceURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editExperienceUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editExperience(result?.data));
      toast.success('Chỉnh sửa thành công!');
    } else {
      toast.error(`Chỉnh sửa không thành công! ${result?.data?.message}`);
    }
  } catch (error) {
    if (error) {
      toast.error('Chỉnh sửa không thành công!');
    }
  }
}

function* getExperiencesByIdEmployeeSaga(action) {
  const getExperiencesUrl = apiExperienceURL;
  try {
    const result = yield call(getData, getExperiencesUrl, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(getExperiencesByIdEmployee(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* deleteExperienceSaga(action) {
  const deleteExperienceUrl = apiExperienceURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteExperienceUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteExperience(action.payload));
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

export default function* experienceSaga() {
  yield takeEvery(EXPERIENCE.CREATE_EXPERIENCE, createExperienceSaga);
  yield takeEvery(EXPERIENCE.UPDATE_EXPERIENCE, editExperienceSaga);
  yield takeEvery(EXPERIENCE.GET_EXPERIENCES, getExperiencesByIdEmployeeSaga);
  yield takeEvery(EXPERIENCE.DELETE_EXPERIENCE, deleteExperienceSaga);
}