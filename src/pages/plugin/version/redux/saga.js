import {
  FETCH_VERSION_CALL,
  FETCH_VERSION_CALL_SUCCESS,
  FETCH_VERSION_CALL_FAILURE,
  CREATE_VERSION_CALL,
  CREATE_VERSION_CALL_FAILURE,
  CREATE_VERSION_CALL_SUCCESS,
  EDIT_VERSION_CALL,
  EDIT_VERSION_CALL_SUCCESS,
  EDIT_VERSION_CALL_FAILURE,
  DELETE_VERSION_CALL,
  DELETE_VERSION_CALL_SUCCESS,
  DELETE_VERSION_CALL_FAILURE,
} from "./actions";
import { fetchPluginVersion } from "../../plugininfo/redux/actions";
import axios from "axios";
import { takeLatest, put, call, select } from "redux-saga/effects";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import toast from "../../../../components/toast/Toast";

import endpoints from "../../../../constants/endpoints";

const createPluginVersionCall = async (sessionToken, payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.post(endpoints.CREATE_VERSION, payload, config);
  return response;
};
const editVersionCall = async (sessionToken, payload, id) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.put(
    endpoints.VERSION.EDIT_VERSION.replace(":id", id),
    payload,
    config
  );
  return response;
};
const fetchVersionCall = async (sessionToken, id) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.VERSION.EDIT_VERSION.replace(":id", id),
    config
  );
  return response;
};

const deleteVersionCall = async (sessionToken, id) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.delete(
    endpoints.VERSION.EDIT_VERSION.replace(":id", id),
    config
  );
  return response;
};

function* editVersion(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    const response = yield call(
      editVersionCall,
      sessionToken,
      payload.data.payload,
      payload.data.id
    );
    
    if (response.status === 200) {
      const ID = payload.data.plugin_id;
      yield put({ type: EDIT_VERSION_CALL_SUCCESS });
      toast.success("Version Updated Successfully");
      payload.data.history.push(ID > 0 ? `/plugin/${ID}` : "/plugin");
    } else {
      yield put({
        type: EDIT_VERSION_CALL_FAILURE,
        data: {
          error: "Cannot Update Version",
        },
      });
      toast.error("Some error while updating Version");
    }
  } catch (error) {
    yield put({
      type: EDIT_VERSION_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    toast.error(error.message);
  }
}

function* createVersion(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    const response = yield call(
      createPluginVersionCall,
      sessionToken,
      payload.data.versionData
    );
    
    if (response.status === 201) {
      const ID = payload.data.versionData.get("plugin_id");
      yield put({ type: CREATE_VERSION_CALL_SUCCESS });
      toast.success("Version Created Successfully");
      payload.data.history.push(ID > 0 ? `/plugin/${ID}` : "/plugin");
    } else {
      yield put({
        type: CREATE_VERSION_CALL_FAILURE,
        data: {
          error: "Cannot Create Version",
        },
      });
      toast.error("Some error while adding Version");
    }
  } catch (error) {
    yield put({
      type: CREATE_VERSION_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    toast.error(error.message);
  }
}

function* deleteVersion(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      deleteVersionCall,
      sessionToken,
      payload.data.payload.id
    );
    const data = response.data;
    if (response.status === 204) {
      yield put({ type: DELETE_VERSION_CALL_SUCCESS, data });
      toast.success("Version Deleted Successfully");
      yield put(fetchPluginVersion(payload.data.payload.plugin_id));
    } else {
      yield put({
        type: DELETE_VERSION_CALL_FAILURE,
        data: {
          error: "Problem deleting Version",
        },
      });
      toast.error("Couldn't delete Version");
    }
  } catch (error) {
    yield put({
      type: DELETE_VERSION_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    toast.error(error.message);
  }
}
function* fetchVersion(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      fetchVersionCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (response.status === 200) {
      yield put({ type: FETCH_VERSION_CALL_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_VERSION_CALL_FAILURE,
        data: {
          error: "Problem fetching Version",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_VERSION_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    toast.error(error.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_VERSION_CALL, fetchVersion);
  yield takeLatest(CREATE_VERSION_CALL, createVersion);
  yield takeLatest(EDIT_VERSION_CALL, editVersion);
  yield takeLatest(DELETE_VERSION_CALL, deleteVersion);
}
