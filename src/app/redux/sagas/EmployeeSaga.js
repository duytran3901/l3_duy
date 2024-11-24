import { put, call, takeEvery } from "redux-saga/effects";
import {
  createEmployee,
  getEmployeeById,
  deleteEmployee,
  editEmployee,
  searchEmployee,
} from "../reducers/EmployeeReducer";
import { toast } from "react-toastify";
import { EMPLOYEE } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiEmployeeURL = ConstantList.API_ENPOINT + "employee/";
const SUCCESS_CODE = 200;

function* uploadImage(file) {
  if (!file) return "";
  const formData = new FormData();
  formData.append("file", file);
  try {
    const data = yield call(postData, apiEmployeeURL + "upload-image", formData);
    console.log('data: ', data);
    
    if (data.id) {
      return data?.name
        ? ConstantList.API_ENPOINT + `public/image/${data?.name}`
        : "";
    } else {
      toast.error("Thêm ảnh thất bại");
      return "";
    }
  } catch (error) {
    toast.error("Upload ảnh thất bại");
    return "";
  }
}

function* createEmployeeSaga(action) {
  try {
    const image = action.payload.file
      ? yield call(uploadImage, action.payload.file)
      : action.payload.image;
    const result = yield call(postData, apiEmployeeURL, {
      ...action.payload,
      image,
      certificatesDto: [],
      employeeFamilyDtos: [],
    });
    if (result?.code === SUCCESS_CODE) {
      yield put(createEmployee(result?.data));
      toast.success("Thêm thành công!");
    } else {
      toast.error(`Thêm không thành công!`);
    }
  } catch (error) {
    toast.error("Thêm không thành công!");
  }
}

function* editEmployeeSaga(action) {
  const editEmployeeUrl = apiEmployeeURL + `${action.payload.id}`;
  console.log('employee: ', action.payload);
  try {
    const image = action.payload.data?.file
      ? yield call(uploadImage, action.payload.data?.file)
      : action.payload.data?.image;
    const result = yield call(putData, editEmployeeUrl, {
      ...action.payload.data,
      image,
    });
    console.log('res: ', result);
    
    if (result?.code === SUCCESS_CODE) {
      yield put(editEmployee(result?.data));
      switch (action.payload?.action) {
        case 'sendLeader':
          toast.success("Trình lãnh đạo thành công!");
          break;
        case 'rejectEmployee':
          toast.success("Từ chối nhân viên thành công!");
          break;
        case 'additionalRequest':
          toast.success("Yêu cầu bổ sung thành công!");
          break;
        case 'leaderApprove':
          toast.success("Đã duyệt nhân viên!");
          break;
        default:
          toast.success("Chỉnh sửa thành công!");
          break;
      }
    } else {
      toast.error(`Có lỗi xảy ra!`);
    }
  } catch (error) {
    toast.error("Có lỗi xảy ra!");
  }
}

function* searchEmployeeSaga(action) {
  const searchEmployeesUrl = apiEmployeeURL + `search`;
  try {
    const result = yield call(getData, searchEmployeesUrl, action.payload);
    if (result?.code === SUCCESS_CODE) {
      yield put(searchEmployee(result));
    } else {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra khi tìm kiếm!');
    }
  }
}

function* deleteEmployeeSaga(action) {
  const deleteEmployeeUrl = apiEmployeeURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteEmployeeUrl);
    if (result?.code === SUCCESS_CODE) {
      yield put(deleteEmployee(action.payload));
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

function* getEmployeeByIdSaga(action) {
  const url = apiEmployeeURL + `${action.payload}`;
  try {
    const result = yield call(getData, url);
    console.log(result);

    if (result?.code === SUCCESS_CODE) {
      yield put(getEmployeeById(result?.data));
    } else {
      toast.error('Có lỗi xảy ra!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra!');
    }
  }
}

export default function* employeeSaga() {
  yield takeEvery(EMPLOYEE.CREATE_EMPLOYEE, createEmployeeSaga);
  yield takeEvery(EMPLOYEE.UPDATE_EMPLOYEE, editEmployeeSaga);
  yield takeEvery(EMPLOYEE.SEARCH_EMPLOYEE, searchEmployeeSaga);
  yield takeEvery(EMPLOYEE.DELETE_EMPLOYEE, deleteEmployeeSaga);
  yield takeEvery(EMPLOYEE.GET_EMPLOYEE_BY_ID, getEmployeeByIdSaga);
}