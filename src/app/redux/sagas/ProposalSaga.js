import { put, call, takeEvery } from "redux-saga/effects";
import {
  getProposalsByIdEmployee,
  createProposal,
  editProposal,
  deleteProposal,
  getProposalsByLeader
} from "../reducers/ProposalReducer";
import { toast } from "react-toastify";
import { PROPOSAL } from "../actions/actions";
import { delData, getData, postData, putData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiProposalURL = ConstantList.API_ENPOINT + "proposal";
const SUCCESS_CODE = 200;

function* createProposalSaga(action) {
  try {
    console.log(action.payload);
    const { employeeId, data, type } = action.payload;
    const result = yield call(postData, apiProposalURL + '?employeeId=' + employeeId, data);
    console.log(result);

    if (result?.code === SUCCESS_CODE) {
      yield put(createProposal(result?.data));
      if (type) {
        toast.success('Trình lãnh đạo thành công!')
      } else toast.success('Thêm thành công!');
    } else {
      toast.error(`Có lỗi xảy ra!`);
    }
  } catch (error) {
    if (error) {
      toast.error(`Có lỗi xảy ra!`);
    }
  }
}

function* editProposalSaga(action) {
  const editProposalUrl = apiProposalURL + `/${action.payload.id}`;
  try {
    const result = yield call(putData, editProposalUrl, action.payload.data);
    if (result?.code === SUCCESS_CODE) {
      yield put(editProposal(result?.data));
      if (action.payload?.type) {
        toast.success('Trình lãnh đạo thành công!');
      } else toast.success('Chỉnh sửa thành công!');
    } else {
      toast.error(`Có lỗi xảy ra!`);
    }
  } catch (error) {
    if (error) {
      toast.error(`Có lỗi xảy ra!`);
    }
  }
}

function* getProposalsByIdEmployeeSaga(action) {
  const getProposalsUrl = apiProposalURL;
  try {
    const result = yield call(getData, getProposalsUrl, action.payload);
    console.log('result: ', result.data);

    if (result?.code === SUCCESS_CODE) {
      yield put(getProposalsByIdEmployee(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* getProposalsByLeaderSaga() {
  const getProposalsUrl = apiProposalURL + '/current-leader';
  try {
    const result = yield call(getData, getProposalsUrl);
    console.log(result.data);

    if (result?.code === SUCCESS_CODE) {
      yield put(getProposalsByLeader(result?.data));
    } else {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  } catch (error) {
    if (error) {
      toast.error('Không lấy được danh sách văn bằng!');
    }
  }
}

function* deleteProposalSaga(action) {
  const deleteProposalUrl = apiProposalURL + `/${action.payload}`;
  try {
    const result = yield call(delData, deleteProposalUrl);
    console.log(result);

    if (result?.code === SUCCESS_CODE) {
      yield put(deleteProposal(action.payload));
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

export default function* proposalSaga() {
  yield takeEvery(PROPOSAL.CREATE_PROPOSAL, createProposalSaga);
  yield takeEvery(PROPOSAL.UPDATE_PROPOSAL, editProposalSaga);
  yield takeEvery(PROPOSAL.GET_PROPOSALS, getProposalsByIdEmployeeSaga);
  yield takeEvery(PROPOSAL.GET_PROPOSALS_BY_LEADER, getProposalsByLeaderSaga);
  yield takeEvery(PROPOSAL.DELETE_PROPOSAL, deleteProposalSaga);
}