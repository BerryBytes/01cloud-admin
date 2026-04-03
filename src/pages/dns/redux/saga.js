import { takeLatest, put, select, call } from "redux-saga/effects";
import axios from "axios";
import { sessionTokenSelector } from "../../login/redux/selectors";
import endpoints from "../../../constants/endpoints";
import toast from "../../../components/toast/Toast";

import {
  GET_PROVIDER_CONFIG,
  GET_PROVIDER_CONFIG_SUCCESS,
  GET_PROVIDER_CONFIG_FAILURE,
  VALIDATE_DNS_PERMISSION,
  VALIDATE_DNS_PERMISSION_SUCCESS,
  VALIDATE_DNS_PERMISSION_FAILURE,
  UPDATE_GCP_FILEPATH,
  GET_DNS_LIST,
  GET_DNS_LIST_SUCCESS,
  CREATE_DNS,
  CREATE_DNS_SUCCESS,
  CREATE_DNS_FAILURE,
  DELETE_DNS,
  DELETE_DNS_SUCCESS,
  DELETE_DNS_FAILURE,
  UPDATE_DNS,
  UPDATE_DNS_SUCCESS,
  UPDATE_DNS_FAILURE,
} from "./actions";

function* getProviderConfig(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.get(
      endpoints.DNS.GET_PROVIDER_CONFIG.replace(
        ":provider",
        payload.data.provider
      ),
      config
    );

    const data = response.data;
    if (data) {
      yield put({ type: GET_PROVIDER_CONFIG_SUCCESS, data });
    } else {
      yield put({ type: GET_PROVIDER_CONFIG_FAILURE });
    }
  } catch (error) {
    yield put({ type: GET_PROVIDER_CONFIG_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      toast.error(error.response.data.error);
    }
  }
}

function* validateDnsPermission(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    if (payload.data.uploadBody) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "basic " + sessionToken,
        },
      };
      const uploadResponse = yield axios.post(
        endpoints.PLUGIN.UPLOAD_ICON,
        payload.data.uploadBody,
        config
      );
      const fileData = uploadResponse.data;
      if (uploadResponse.status === 200 && fileData) {
        payload.data.jsonBody["credentials"] = fileData.path;
        yield put({ type: UPDATE_GCP_FILEPATH, data: fileData.path });
      }
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.post(
      endpoints.DNS.CHECK_DNS_PERMISSION,
      payload.data.jsonBody,
      config
    );
    const data = response.data;
    if (data) {
      yield put({ type: VALIDATE_DNS_PERMISSION_SUCCESS, data });
    } else {
      yield put({ type: VALIDATE_DNS_PERMISSION_FAILURE });
      toast.error("Unable to validate. Please try again");
    }
  } catch (error) {
    yield put({ type: VALIDATE_DNS_PERMISSION_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else toast.error("Unable to validate. Please try again");
  }
}

function* getDnsList() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "basic " + sessionToken } };
    const response = yield axios.get(endpoints.DNS.GET_DNS_LIST, config);

    const data = response.data;
    if (data) {
      yield put({ type: GET_DNS_LIST_SUCCESS, data });
    } else {
      toast.error(response.message ?? "Failed To Get LoadBalancers List");
    }
  } catch (error) {
    if (error?.response?.data?.error) toast.error(error.response.data.error);
  }
}

function* createDns(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    if (payload.data.uploadBody) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "basic " + sessionToken,
        },
      };
      const uploadResponse = yield axios.post(
        endpoints.PLUGIN.UPLOAD_ICON,
        payload.data.uploadBody,
        config
      );
      const fileData = uploadResponse.data;
      if (uploadResponse.status === 200 && fileData) {
        payload.data.jsonBody["credentials"] = fileData.path;
      }
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.post(
      endpoints.DNS.CREATE_DNS,
      payload.data.jsonBody,
      _config
    );
    if (response.data) {
      yield call(getDnsList);
      toast.success("DNS created successfully!");
      yield put({ type: CREATE_DNS_SUCCESS, data: response.data });
      if (payload.data.callback) payload.data.callback();
    }
  } catch (error) {
    toast.error(error.response.data.error);
    yield put({ type: CREATE_DNS_FAILURE });
  }
}

function* deleteDns(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "Basic " + sessionToken } };
    const response = yield axios.delete(
      endpoints.DNS.DELETE_DNS.replace(":dns_id", payload.data.dnsId),
      config
    );
    if (response.status === 204) {
      yield call(getDnsList);
      toast.success("DNS deleted successfully!");
      yield put({ type: DELETE_DNS_SUCCESS, data: response.data });
      if (payload.data.callback) payload.data.callback(true);
    }
  } catch (error) {
    toast.error(error.response.data.error);
    yield put({ type: DELETE_DNS_FAILURE });
  }
}

function* updateDns(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    if (payload.data.uploadBody) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "basic " + sessionToken,
        },
      };
      const uploadResponse = yield axios.post(
        endpoints.PLUGIN.UPLOAD_ICON,
        payload.data.uploadBody,
        config
      );
      const fileData = uploadResponse.data;
      if (uploadResponse.status === 200 && fileData) {
        payload.data.jsonBody["credentials"] = fileData.path;
      }
    }

    const _config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.put(
      endpoints.DNS.UPDATE_DNS.replace(":dns_id", payload.data.dnsId),
      payload.data.jsonBody,
      _config
    );
    if (response.data) {
      yield call(getDnsList);
      toast.success("DNS updated successfully!");
      yield put({ type: UPDATE_DNS_SUCCESS, data: response.data });
      if (payload.data.callback) payload.data.callback();
    }
  } catch (error) {
    yield put({ type: UPDATE_DNS_FAILURE });
    toast.error(error.response.data.error);
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_PROVIDER_CONFIG, getProviderConfig);
  yield takeLatest(VALIDATE_DNS_PERMISSION, validateDnsPermission);
  yield takeLatest(GET_DNS_LIST, getDnsList);
  yield takeLatest(CREATE_DNS, createDns);
  yield takeLatest(DELETE_DNS, deleteDns);
  yield takeLatest(UPDATE_DNS, updateDns);
}
