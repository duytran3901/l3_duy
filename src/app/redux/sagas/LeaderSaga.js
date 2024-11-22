import { put, call, takeEvery } from "redux-saga/effects";
import {
  getLeaderById,
  getLeaders,
} from "../reducers/LeaderReducer";
import { toast } from "react-toastify";
import { LEADER } from "../actions/actions";
import { getData } from "../../services/AxiosServices";
import ConstantList from "../../appConfig";

const apiLeaderURL = ConstantList.API_ENPOINT + "leader/";
const SUCCESS_CODE = 200;

function* getLeadersSaga(action) {
  try {
    const result = yield call(getData, apiLeaderURL);
    if (result?.code === SUCCESS_CODE) {
      yield put(getLeaders(result?.data));
    } else {
      toast.error('Có lỗi xảy ra!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra!');
    }
  }
}

function* getLeaderByIdSaga(action) {
  const url = apiLeaderURL + `${action.payload}`;
  try {
    const result = yield call(getData, url);
    console.log(result);

    if (result?.code === SUCCESS_CODE) {
      yield put(getLeaderById(result?.data));
    } else {
      toast.error('Có lỗi xảy ra!');
    }
  } catch (error) {
    if (error) {
      toast.error('Có lỗi xảy ra!');
    }
  }
}

export default function* leaderSaga() {
  yield takeEvery(LEADER.GET_LEADERS, getLeadersSaga);
  yield takeEvery(LEADER.GET_LEADER_BY_ID, getLeaderByIdSaga);
}