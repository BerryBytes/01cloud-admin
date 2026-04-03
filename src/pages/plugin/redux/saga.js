import axios from "axios";
import { put, takeLatest, call, select } from "redux-saga/effects";
import { sessionTokenSelector } from "../../login/redux/selectors";
import endpoints from "../../../constants/endpoints";
import {
  FETCH_PLUGIN_FAILURE,
  FETCH_PLUGIN,
  FETCH_PLUGIN_SUCCESS,
  DELETE_PLUGIN,
  DELETE_PLUGIN_FAILURE,
  DELETE_PLUGIN_SUCCESS,
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "./actions";
import toast from "../../../components/toast/Toast";

async function fetchPluginCall(sessionToken,payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endPoint = endpoints.PLUGIN_LIST
    .replace(":page", payload?.data?.page ?? 1)
    .replace(":size", payload?.data?.size ?? 100)
    .replace(":search", payload?.data?.search?.toLowerCase() ?? "")
    .replace(":sort-column", payload?.data?.sortColumn ?? "id")
    .replace(":sort-direction", payload?.data?.sortDirection ?? "desc")
  const response = await axios.get(endPoint, config);
  return response;
}

async function fetchCategoryCall(sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(endpoints.PLUGIN.GET_ADDON_CATEGORIES, config);
  return response;
}

async function deletePluginCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.delete(
    endpoints.PLUGIN.EDIT_PLUGIN.replace(":id", id),
    config
  );
  return response;
}

function* fetchPlugin(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchPluginCall, sessionToken, payload);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_PLUGIN_SUCCESS, data:{data,count:response.count} });
    } else {
      yield put({
        type: FETCH_PLUGIN_FAILURE,
        data: {
          error: "Problem fetching Plugin",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_PLUGIN_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

function* fetchCategories() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchCategoryCall, sessionToken);

    const data = response.data;
    if (data) {
      yield put({ type: FETCH_CATEGORY_SUCCESS, data });
    } else {
      yield put({
        type:  FETCH_CATEGORY_FAILURE,
        data: {
          error: "Problem fetching Category",
        },
      });
    }
  } catch (error) {
    yield put({
      type:  FETCH_CATEGORY_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

function* deletePlugin(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      deletePluginCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (response.status === 204) {
      yield put({ type: DELETE_PLUGIN_SUCCESS, data });
      toast.success("Plugin Deleted Successfully");
      yield put({ type: FETCH_PLUGIN });
    } else {
      yield put({
        type: DELETE_PLUGIN_FAILURE,
        data: {
          error: "Problem deleting Plugin",
        },
      });
      toast.error("Couldn't delete Plugin");
    }
  } catch (error) {
    yield put({
      type: DELETE_PLUGIN_FAILURE,
      data: {
        error: error.message,
      },
    });
    toast.error(error.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_PLUGIN, fetchPlugin);
  yield takeLatest(FETCH_CATEGORY, fetchCategories);
  yield takeLatest(DELETE_PLUGIN, deletePlugin);
}
