import {
  CREATE_PLUGIN_CALL,
  CREATE_PLUGIN_CALL_SUCCESS,
  CREATE_PLUGIN_CALL_FAILURE,
  EDIT_PLUGIN_CALL,
  EDIT_PLUGIN_CALL_FAILURE,
  EDIT_PLUGIN_CALL_SUCCESS,
} from "./actions";
import axios from "axios";
import { takeLatest, put, call, select } from "redux-saga/effects";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import toast from "../../../../components/toast/Toast";

import endpoints from "../../../../constants/endpoints";
import paths from "../../../../constants/paths";

const createPluginCall = async (sessionToken, payload) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.post(
    endpoints.PLUGIN.CREATE_PLUGIN,
    payload,
    config
  );
  return response;
};

const uploadPluginIconCall = async (sessionToken, payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.post(
    endpoints.PLUGIN.UPLOAD_ICON,
    payload.data.iconPayload,
    config
  );
  return response;
};

const editPLuginCall = async (sessionToken, payload, id) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.put(
    endpoints.PLUGIN.EDIT_PLUGIN.replace(":id", id),
    payload,
    config
  );
  return response;
};

function* createPlugin(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    if (payload.data.iconPayload) {
      const iconResponse = yield call(
        uploadPluginIconCall,
        sessionToken,
        payload
      );
      const iconData = iconResponse.data;
      if (iconResponse.status === 200 && iconData) {
        payload.data.payload["image"] = iconData.url;
      }
    }
    const response = yield call(
      createPluginCall,
      sessionToken,
      payload.data.payload
    );
    const data = response.data;
    if (response.status === 201) {
      const { ID } = data;
      yield put({ type: CREATE_PLUGIN_CALL_SUCCESS });
      toast.success("Plugin Created Successfully");
      payload.data.history.push(
        ID > 0 ? paths.PLUGIN_INFO.replace(":id", ID) : "/plugin"
      );
    } else {
      yield put({
        type: CREATE_PLUGIN_CALL_FAILURE,
        data: {
          error: " Cannot Create Plugin",
        },
      });
      toast.error("Some error while adding Plugin");
    }
  } catch (error) {
    yield put({
      type: CREATE_PLUGIN_CALL_FAILURE,
      data: {
        error: "Cannot Create Plugin",
      },
    });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else toast.error("Some error while creating Plugin. Please try again");
  }
}

function* editPlugin(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    if (payload.data.iconPayload) {
      const iconResponse = yield call(
        uploadPluginIconCall,
        sessionToken,
        payload
      );
      const iconData = iconResponse.data;
      if (iconResponse.status === 200 && iconData) {
        payload.data.payload["image"] = iconData.url;
      }
    }
    const response = yield call(
      editPLuginCall,
      sessionToken,
      payload.data.payload,
      payload.data.id
    );
    const data = response.data;
    if (response.status === 200) {
      const { ID } = data;
      yield put({ type: EDIT_PLUGIN_CALL_SUCCESS });
      toast.success("Plugin Updated Successfully");
      payload.data.history.push(
        ID > 0 ? paths.PLUGIN_INFO.replace(":id", ID) : "/plugin"
      );
    } else {
      yield put({
        type: EDIT_PLUGIN_CALL_FAILURE,
        data: {
          error: " Cannot Update Plugin",
        },
      });
      toast.error("Some error while update Plugin");
    }
  } catch (error) {
    yield put({
      type: EDIT_PLUGIN_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    toast.error(error.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_PLUGIN_CALL, createPlugin);
  yield takeLatest(EDIT_PLUGIN_CALL, editPlugin);
}
