import { put, call, takeEvery } from "redux-saga/effects";
import {
  getCertificatesByIdEmployee,
  getCertificateById,
  createCertificate,
  editCertificate,
  deleteCertificate
} from "../reducers/CertificateReducer";
import { toast } from "react-toastify";
import { CERTIFICATE } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiCertificateURL = ConstantList.API_ENPOINT + "certificate";
const SUCCESS_CODE = 200;

function* createCertificateSaga(action) {
  try {
    const { employeeId, data } = action.payload
    const result = yield call(postData, apiCertificateURL + '?employeeId=' + employeeId, data);
    if (result?.code === SUCCESS_CODE) {
      yield put(createCertificate(result?.data));
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

function* editCertificateSaga(action) {
  const editCertificateUrl = apiCertificateURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editCertificateUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editCertificate(result?.data));
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

function* getCertificatesByIdEmployeeSaga(action) {
  const getCertificatesUrl = apiCertificateURL;
  try {
    const result = yield call(getData, getCertificatesUrl, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(getCertificatesByIdEmployee(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* deleteCertificateSaga(action) {
  const deleteCertificateUrl = apiCertificateURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteCertificateUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteCertificate(action.payload));
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

export default function* certificateSaga() {
  yield takeEvery(CERTIFICATE.CREATE_CERTIFICATE, createCertificateSaga);
  yield takeEvery(CERTIFICATE.UPDATE_CERTIFICATE, editCertificateSaga);
  yield takeEvery(CERTIFICATE.GET_CERTIFICATES, getCertificatesByIdEmployeeSaga);
  yield takeEvery(CERTIFICATE.DELETE_CERTIFICATE, deleteCertificateSaga);
}