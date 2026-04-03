import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import { sessionTokenSelector } from "../../login/redux/selectors";
import {
  GET_REGISTRIES,
  GET_REGISTRIES_SUCCESS,
  GET_REGISTRIES_FAILURE,
  GET_REGISTRY,
  GET_REGISTRY_SUCCESS,
  GET_REGISTRY_FAILURE,
  ADD_REGISTRY,
  ADD_REGISTRY_SUCCESS,
  ADD_REGISTRY_FAILURE,
  UPDATE_REGISTRY,
  UPDATE_REGISTRY_SUCCESS,
  UPDATE_REGISTRY_FAILURE,
  DELETE_REGISTRY,
  DELETE_REGISTRY_SUCCESS,
  DELETE_REGISTRY_FAILURE,
  GET_REGISTRY_CONFIG,
  GET_REGISTRY_CONFIG_FAILURE,
  GET_REGISTRY_CONFIG_SUCCESS,
} from "./actions";
import toast from "../../../components/toast/Toast";

function* getRegistries() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.get(
      endpoints.REGISTRY.GET_REGISTRY_LIST,
      config
    );
    const data = response.data;
    if (data) {
      yield put({ type: GET_REGISTRIES_SUCCESS, data });
    } else {
      yield put({ type: GET_REGISTRIES_FAILURE });
    }
  } catch (error) {
    yield put({ type: GET_REGISTRIES_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
  }
}

function* getRegistry(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.get(
      endpoints.REGISTRY.GET_REGISTRY.replace(":id", payload.data.id),
      config
    );
    const data = response.data;
    if (data) {
      yield put({ type: GET_REGISTRY_SUCCESS, data });
    } else {
      yield put({ type: GET_REGISTRY_FAILURE });
    }
  } catch (error) {
    yield put({ type: GET_REGISTRY_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
  }
}

function* addRegistry(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.post(
      endpoints.REGISTRY.ADD_REGISTRY,
      payload.data.jsonBody,
      config
    );
    const data = response.data;
    if (data) {
      toast.success(data.message ?? "Registry added successfully");
      yield put({ type: ADD_REGISTRY_SUCCESS, data });
      if (payload.data.callback) {
        payload.data.callback(data);
      }
    } else {
      yield put({ type: ADD_REGISTRY_FAILURE });
    }
  } catch (error) {
    yield put({ type: ADD_REGISTRY_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
  }
}

function* updateRegistry(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.put(
      endpoints.REGISTRY.UPDATE_REGISTRY.replace(":id", payload.data.id),
      payload.data.jsonBody,
      config
    );
    const data = response.data;
    if (data) {
      toast.success(data.message ?? "Registry updated successfully");
      yield put({ type: UPDATE_REGISTRY_SUCCESS, data });
      if (payload.data.callback) {
        payload.data.callback(data);
      }
    } else {
      yield put({ type: UPDATE_REGISTRY_FAILURE });
    }
  } catch (error) {
    yield put({ type: UPDATE_REGISTRY_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
  }
}

function* deleteRegistry(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    yield axios.delete(
      endpoints.REGISTRY.DELETE_REGISTRY.replace(":id", payload.data.id),
      config
    );
    
    toast.success("Registry deleted successfully");
    yield put({ type: DELETE_REGISTRY_SUCCESS });
    yield call(getRegistries);
  } catch (error) {
    yield put({ type: DELETE_REGISTRY_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
  }
}

function* getRegistryConfig() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.get(
      endpoints.REGISTRY.GET_REGISTRY_CONFIG,
      config
    );
    const data = response.data;
    
    if (data) {
      yield put({ type: GET_REGISTRY_CONFIG_SUCCESS, data });
    } else {
      yield put({ type: GET_REGISTRY_CONFIG_FAILURE });
    }
  } catch (error) {
    yield put({ type: GET_REGISTRY_CONFIG_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_REGISTRIES, getRegistries);
  yield takeLatest(GET_REGISTRY, getRegistry);
  yield takeLatest(ADD_REGISTRY, addRegistry);
  yield takeLatest(UPDATE_REGISTRY, updateRegistry);
  yield takeLatest(DELETE_REGISTRY, deleteRegistry);
  yield takeLatest(GET_REGISTRY_CONFIG, getRegistryConfig);
}
