import { select, takeLatest, call, put } from "redux-saga/effects";
import {
  FETCH_PLUGIN_VERSION,
  FETCH_PLUGIN_VERSION_SUCCESS,
  FETCH_PLUGIN_VERSION_FAILURE,
  FETCH_PLUGIN_INFO,
  FETCH_PLUGIN_INFO_SUCCESS,
  FETCH_PLUGIN_INFO_FAILURE,
} from "./actions";
import axios from "axios";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import endpoints from "../../../../constants/endpoints";

async function fetchPluginVersionCall(sessionToken, pluginId) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.PLUGIN.PLUGIN_VERSION.replace(":pId", pluginId),
    config
  );
  return response;
}

async function fetchPluginInfoCall(sessionToken, pluginId) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.PLUGIN.PLUGIN_INFO.replace(":pId", pluginId),
    config
  );
  return response;
}

function* fetchPluginVersion(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const pluginVersionResponse = yield call(
      fetchPluginVersionCall,
      sessionToken,
      payload.id
    );
    const data = pluginVersionResponse.data;
    if (data !== null) {
      yield put({ type: FETCH_PLUGIN_VERSION_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_PLUGIN_VERSION_FAILURE,
        data: {
          error: "Problem fetching Plugin Versions",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_PLUGIN_VERSION_FAILURE,
      data: {
        error: "Problem fetching Plugin Versions",
      },
    });
  }
}

function* fetchPluginInfo(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const pluginInfoResponse = yield call(
      fetchPluginInfoCall,
      sessionToken,
      payload.id
    );
    const data = pluginInfoResponse.data;
    if (data !== null) {
      yield put({ type: FETCH_PLUGIN_INFO_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_PLUGIN_INFO_FAILURE,
        data: {
          error: "Problem fetching Plugin Info",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_PLUGIN_INFO_FAILURE,
      data: {
        error: "Problem fetching Plugin Info",
      },
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_PLUGIN_VERSION, fetchPluginVersion);
  yield takeLatest(FETCH_PLUGIN_INFO, fetchPluginInfo);
}
