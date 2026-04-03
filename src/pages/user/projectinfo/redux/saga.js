import { select, takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import endpoints from "../../../../constants/endpoints";

import {
  FETCH_PROJECT_APPS,
  FETCH_PROJECT_APPS_SUCCESS,
  FETCH_PROJECT_APPS_FAILURE,
  FETCH_PROJECT_INFO,
  FETCH_PROJECT_INFO_SUCCESS,
  FETCH_PROJECT_INFO_FAILURE,
  FETCH_PROJECT_INSIGHTS,
  FETCH_PROJECT_INSIGHTS_SUCCESS,
  FETCH_PROJECT_INSIGHTS_FAILURE,
} from "./actions";

async function fetchAppsEnvCall(appList, config) {
  const newAppListPromise = appList.map(async (app) => {
    const appCopy = app;
    const res = await axios.get(
      endpoints.PROJECT.GET_APPS_ENV.replace(":appId", app.id),
      config
    );
    const data = res.data;
    if (res.data) {
      appCopy.environments = data;
      return appCopy;
    }
    appCopy.environments = [];
    return appCopy;
  });

  return Promise.all(newAppListPromise);
}

async function fetchAppsEnv(appList, sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const newAppList = await fetchAppsEnvCall(appList, config);
  return newAppList;
}

async function fetchProjectAppsCall(sessionToken, projectId) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endpoint = endpoints.PROJECT.GET_APPS.replace(":pId", projectId);
  const response = await axios.get(endpoint, config);
  return response;
}

async function fetchProjectInfoCall(sessionToken, projectId) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endpoint = endpoints.PROJECT.GET_INFO.replace(":pId", projectId);
  const response = await axios.get(endpoint, config);
  return response;
}

function* fetchProjectApps(payload) {
  try {
    const projectId = payload.data.id;
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(fetchProjectAppsCall, sessionToken, projectId);
    const data = res.data;
    if (data) {
      const newAppList = yield call(fetchAppsEnv, data, sessionToken);
      if (newAppList !== null) {
        yield put({ type: FETCH_PROJECT_APPS_SUCCESS, data: newAppList });
      }
    } else {
      yield put({
        type: FETCH_PROJECT_APPS_FAILURE,
        data: {
          error: "Problem fetching Project Apps",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_PROJECT_APPS_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

function* fetchProjectInfo(payload) {
  try {
    const projectId = payload.data.id;
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(fetchProjectInfoCall, sessionToken, projectId);
    const data = res.data;

    if (data !== null) {
      yield put({ type: FETCH_PROJECT_INFO_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_PROJECT_INFO_FAILURE,
        data: {
          error: "Problem fetching Project Info",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_PROJECT_INFO_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

async function fetchProjectInsightCall(sessionToken, payload) {
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: "basic " + sessionToken,
    },
  };
  
  const endpoint = endpoints.PROJECT.GET_INSIGHTS.replace(
    ":pId",
    payload.data.id
  );
  const res = await axios.get(endpoint, config, payload.data.payload);
  return res;
}

function* fetchProjectInsight(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(fetchProjectInsightCall, sessionToken, payload);
    const data = res.data;
    if (data) {
      yield put({ type: FETCH_PROJECT_INSIGHTS_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_PROJECT_INSIGHTS_FAILURE,
        data: {
          error: "Problem fetching insights",
        },
      });
    }
  } catch (err) {
    yield put({
      type: FETCH_PROJECT_INSIGHTS_FAILURE,
      data: {
        error: err.error,
      },
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_PROJECT_APPS, fetchProjectApps);
  yield takeLatest(FETCH_PROJECT_INFO, fetchProjectInfo);
  yield takeLatest(FETCH_PROJECT_INSIGHTS, fetchProjectInsight);
}
