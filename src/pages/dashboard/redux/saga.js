import {
  FETCH_REVENUE_DATA,
  FETCH_REVENUE_DATA_FAILURE,
  FETCH_REVENUE_DATA_SUCCESS,
} from "./actions";
import { call, takeLatest, put, select } from "redux-saga/effects";

import endpoints from "../../../constants/endpoints";
import axios from "axios";
import { sessionTokenSelector } from "../../login/redux/selectors";

const fetchRevenueDataApiCall = async (sessionToken) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = axios.get(endpoints.DASHOBARD, config);  
  return response;
};

function* fetchRevenueData() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchRevenueDataApiCall, sessionToken);
    const data = response.data;
    if (response.data) {
      yield put({ type: FETCH_REVENUE_DATA_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_REVENUE_DATA_FAILURE,
        error: "Cannot fetch Revenue Data",
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_REVENUE_DATA_FAILURE,
      error: error.message,
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_REVENUE_DATA, fetchRevenueData);
}
