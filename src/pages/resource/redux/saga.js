import { takeLatest, put, call, select } from "redux-saga/effects";

import {
  FETCH_RESOURCES_FAILURE,
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCE,
  FETCH_RESOURCE_FAILURE,
  FETCH_RESOURCE_SUCCESS,
  DELETE_RESOURCE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
} from "./actions";
import axios from "axios";
import { sessionTokenSelector } from "../../login/redux/selectors";
import endpoints from "../../../constants/endpoints";
import toast from "../../../components/toast/Toast";

async function fetchResourcesCall(sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(endpoints.RESOURCES.FETCH_RESOURCES, config);
  return response;
}
async function fetchResourceCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.RESOURCES.GET_RESOURCE.replace(":id", id),
    config
  );
  return response;
}

function* fetchResources() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchResourcesCall, sessionToken);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_RESOURCES_SUCCESS, data });
    } else {
      yield {
        type: FETCH_RESOURCES_FAILURE,
        data: {
          error: "Error While fetching Resources",
        },
      };
    }
  } catch (error) {
    yield {
      type: FETCH_RESOURCES_FAILURE,
      data: {
        error: "Error While fetching Resources",
      },
    };
  }
}
function* fetchResource(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      fetchResourceCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_RESOURCE_SUCCESS, data });
    } else {
      yield {
        type: FETCH_RESOURCE_FAILURE,
        data: {
          error: "Error While fetching Resource",
        },
      };
    }
  } catch (error) {
    yield {
      type: FETCH_RESOURCE_FAILURE,
      data: {
        error: error.message,
      },
    };
  }
}

async function deleteResourceApiCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.delete(
    endpoints.RESOURCES.EDIT_RESOURCE.replace(":id", id),
    config
  );
  return response;
}

function* deleteResource(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      deleteResourceApiCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (response.status === 200) {
      yield put({ type: DELETE_RESOURCE_SUCCESS, data });
      yield put({ type: FETCH_RESOURCES });

      toast.success("Successfully Deleted Resource");
    } else {
      yield {
        type: DELETE_RESOURCE_FAILURE,
        data: {
          error: "Error While deleting a Resource",
        },
      };
      toast.error("Couldn't Delete Resource");
    }
  } catch (err) {
    yield {
      type: DELETE_RESOURCE_FAILURE,
      data: {
        error: err.message,
      },
    };
    toast.error(err.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_RESOURCES, fetchResources);
  yield takeLatest(FETCH_RESOURCE, fetchResource);
  yield takeLatest(DELETE_RESOURCE, deleteResource);
}
