import { put, call, takeEvery } from "redux-saga/effects";
import {
  getFamilyByIdEmployee,
  getFamilyMemberById,
  createFamilyMember,
  editFamilyMember,
  deleteFamilyMember
} from "../reducers/FamilyReducer";
import { toast } from "react-toastify";
import { FAMILY } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiCertificateURL = ConstantList.API_ENPOINT + "employee-family";
const SUCCESS_CODE = 200;

function* createFamilyMemberSaga(action) {
  try {
    const { employeeId, data } = action.payload
    const result = yield call(postData, apiCertificateURL + '?employeeId=' + employeeId, data);
    if (result?.code === SUCCESS_CODE) {
      yield put(createFamilyMember(result?.data));
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

function* editFamilyMemberSaga(action) {
  const editCertificateUrl = apiCertificateURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editCertificateUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editFamilyMember(result?.data));
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

function* getFamilyByIdEmployeeSaga(action) {
  const getCertificatesUrl = apiCertificateURL;
  try {
    const result = yield call(getData, getCertificatesUrl, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(getFamilyByIdEmployee(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* deleteFamilyMemberSaga(action) {
  const deleteCertificateUrl = apiCertificateURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteCertificateUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteFamilyMember(action.payload));
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

export default function* familySaga() {
  yield takeEvery(FAMILY.CREATE_FAMILY_MEMBER, createFamilyMemberSaga);
  yield takeEvery(FAMILY.UPDATE_FAMILY, editFamilyMemberSaga);
  yield takeEvery(FAMILY.GET_FAMILY, getFamilyByIdEmployeeSaga);
  yield takeEvery(FAMILY.DELETE_FAMILY_MEMBER, deleteFamilyMemberSaga);
}