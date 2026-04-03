import { select, takeLatest, call, put, delay } from "redux-saga/effects";
import axios from "axios";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import endpoints from "../../../../constants/endpoints";
import {
  FETCH_ENVIRONMENT_DETAIL,
  FETCH_ENVIRONMENT_DETAIL_SUCCESS,
  FETCH_ENVIRONMENT_DETAIL_FAILURE,
  FETCH_ENVIRONMENT_INSIGHT,
  FETCH_ENVIRONMENT_INSIGHT_SUCCESS,
  FETCH_ENVIRONMENT_INSIGHT_FAILURE,
  FETCH_ENV_STATE_SUCCESS,
  FETCH_ENV_STATE_INITIATE,
  FETCH_ENV_STATE,
} from "./actions";

async function fetchEnvironmentInsightsCall(sessionToken, payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endpoint = endpoints.ENVIRONMENT.GET_INSIGHTS.replace(
    ":eId",
    payload.data.id
  );
  const res = await axios.post(endpoint, payload.data.payload, config);
  return res;
}

function* fetchEnvironmentInsights(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(fetchEnvironmentInsightsCall, sessionToken, payload);
    const data = res.data;
    if (data) {
      yield put({ type: FETCH_ENVIRONMENT_INSIGHT_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_ENVIRONMENT_INSIGHT_FAILURE,
        data: {
          error: "Problem fetching insights",
        },
      });
    }
  } catch (err) {
    yield put({
      type: FETCH_ENVIRONMENT_INSIGHT_FAILURE,
      data: {
        error: err.error,
      },
    });
  }
}

function envDetailsCall(sessionToken, payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  return axios.get(
    endpoints.ENV_DETAILS.replace(":eId", payload.data.id),
    config
  );
}

function* fetchEnvDetails(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(envDetailsCall, sessionToken, payload);
    const data = response.data;
    if (data !== null) {
      yield put({ type: FETCH_ENVIRONMENT_DETAIL_SUCCESS, data });
    }
    
  } catch (error) {
    if (
      error &&
      error.response &&
      (error.response.status === 404 || error.response.status === 401)
    ) {
      yield put({ type: FETCH_ENVIRONMENT_DETAIL_FAILURE });
    }
  }
}

function startFetchStateCall(sessionToken, payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  return axios.get(
    endpoints.ENVIRONMENT.GET_STATE_INITIATE.replace(":eId", payload.data.id),
    config
  );
}

function* startFetchState(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(startFetchStateCall, sessionToken, payload);
    const data = response.data;
    if (data !== null) {
      yield call(fetchState, payload);
    }
  } catch (error) {
    return
  }
}

function fetchStateCall(sessionToken, payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  return axios.get(
    endpoints.ENVIRONMENT.GET_STATE.replace(":eId", payload.data.id),
    config
  );
}

function* fetchState(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchStateCall, sessionToken, payload);
    const data = response.data;
    if (data !== null) {
      yield put({ type: FETCH_ENV_STATE_SUCCESS, data });
      if (data.State !== "Running" && data.CName === "") {
        yield delay(10000);
        yield call(fetchState, payload);
      }
    } else {
      yield delay(5000);
      yield call(fetchState, payload);
    }
  } catch (error) {
    return
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_ENVIRONMENT_DETAIL, fetchEnvDetails);
  yield takeLatest(FETCH_ENVIRONMENT_INSIGHT, fetchEnvironmentInsights);
  yield takeLatest(FETCH_ENV_STATE_INITIATE, startFetchState);
  yield takeLatest(FETCH_ENV_STATE, fetchState);
}
