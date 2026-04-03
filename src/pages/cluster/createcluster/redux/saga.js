import {
  CREATE_CLUSTER_CALL,
  CREATE_CLUSTER_CALL_SUCCESS,
  CREATE_CLUSTER_CALL_FAILURE,
  EDIT_CLUSTER_CALL,
  EDIT_CLUSTER_CALL_FAILURE,
  EDIT_CLUSTER_CALL_SUCCESS,
  FETCH_REGIONS,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
} from "./actions";
import axios from "axios";
import { takeLatest, put, call, select } from "redux-saga/effects";
import toast from "../../../../components/toast/Toast";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import endpoints from "../../../../constants/endpoints";
import paths from "../../../../constants/paths";

const fetchRegionsCall = async (sessionToken) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const res = await axios.get(endpoints.REGIONS, config);
  return res;
};

const createClusterCall = async (sessionToken, payload) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.post(endpoints.CREATE_CLUSTER, payload, config);
  return response;
};

const editClusterCall = async (sessionToken, payload, id) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.put(
    endpoints.EDIT_CLUSTER.replace(":id", id),
    payload,
    config
  );
  return response;
};

function* createCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(
      createClusterCall,
      sessionToken,
      payload.data.clusterData
    );
    
    if (res.status === 201) {
      yield put({ type: CREATE_CLUSTER_CALL_SUCCESS });
      toast.success("Cluster Created Successfully");
      payload.data.history.push("/cluster");
    } else {
      yield put({
        type: CREATE_CLUSTER_CALL_FAILURE,
        error: "Cannot Create Cluster",
      });
      toast.error("Cannot Create Cluster");
    }
  } catch (error) {
    yield put({ type: CREATE_CLUSTER_CALL_FAILURE, error: error.message });
    toast.error(error.message);
  }
}

function* editCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    if (!payload.data.id) {
      toast.error("Cannot Update Cluster without ID");
      yield put({
        type: EDIT_CLUSTER_CALL_FAILURE,
        data: {
          error: "Error While Updating Cluster",
        },
      });
    } else {
      const res = yield call(
        editClusterCall,
        sessionToken,
        payload.data.clusterData,
        payload.data.id
      );
      const data = res.data;
      if (data) {
        yield put({ type: EDIT_CLUSTER_CALL_SUCCESS, data });
        toast.success("Cluster Updated Successfully");
        payload.data.history.push(`${paths.CLUSTER}`);
      } else {
        yield put({
          type: EDIT_CLUSTER_CALL_FAILURE,
          data: {
            error: "Error While Updating Cluster",
          },
        });
        toast.error("Some Error while updating Cluster");
      }
    }
  } catch (err) {
    yield put({
      type: EDIT_CLUSTER_CALL_FAILURE,
      data: { error: err.message },
    });
    toast.error(err.message);
  }
}

function* fetchRegions() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(fetchRegionsCall, sessionToken);
    const data = res.data;
    if (data) {
      yield put({
        type: FETCH_REGIONS_SUCCESS,
        data: data,
      });
    } else {
      yield put({
        type: FETCH_REGIONS_FAILURE,
        error: "Cannot Fetch Region",
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_REGIONS_FAILURE,
      error: error.message,
    });
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_CLUSTER_CALL, createCluster);
  yield takeLatest(FETCH_REGIONS, fetchRegions);
  yield takeLatest(EDIT_CLUSTER_CALL, editCluster);
}
