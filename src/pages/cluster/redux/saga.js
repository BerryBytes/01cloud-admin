import { call, put, takeLatest, select } from "redux-saga/effects";
import {
  FETCH_CLUSTERS,
  FETCH_CLUSTERS_SUCCESS,
  FETCH_CLUSTERS_FAILURE,
  DELETE_CLUSTER,
  DELETE_CLUSTER_FAILURE,
  DELETE_CLUSTER_SUCCESS,
  FETCH_CLUSTER,
  FETCH_CLUSTER_SUCCESS,
  FETCH_CLUSTER_FAILURE,
} from "./actions";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import { sessionTokenSelector } from "../../login/redux/selectors";
import toast from "../../../components/toast/Toast";

async function deleteClusterApiCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.delete(
    endpoints.EDIT_CLUSTER.replace(":id", id),
    config
  );
  return response;
}
async function clusterCall(sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(endpoints.GET_CLUSTER_LIST, config);
  return response;
}
async function fetchClusterCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.GET_CLUSTER.replace(":id", id),
    config
  );
  return response;
}

function* fetchClusters() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(clusterCall, sessionToken);
    const data = response.data;
    if (response.data) {
      yield put({ type: FETCH_CLUSTERS_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_CLUSTERS_FAILURE,
        data: {
          error: "Error fetching Clusters",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_CLUSTERS_FAILURE,
      data: {
        error: "Error fetching Clusters",
      },
    });
  }
}
function* fetchCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      fetchClusterCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (response.data) {
      yield put({ type: FETCH_CLUSTER_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_CLUSTER_FAILURE,
        data: {
          error: "Error fetching Cluster",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_CLUSTER_FAILURE,
      data: {
        error: "Error fetching Cluster",
      },
    });
  }
}

function* deleteCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      deleteClusterApiCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (response.status === 204) {
      yield put({ type: DELETE_CLUSTER_SUCCESS, data });
      yield put({ type: FETCH_CLUSTERS });

      toast.success("Successfully Deleted Cluster");
    } else {
      yield {
        type: DELETE_CLUSTER_FAILURE,
        data: {
          error: "Error While deleting a Cluster",
        },
      };
      toast.error("Couldn't Delete Cluster");
    }
  } catch (err) {
    yield {
      type: DELETE_CLUSTER_FAILURE,
      data: {
        error: err.message,
      },
    };
    toast.error(err.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_CLUSTERS, fetchClusters);
  yield takeLatest(FETCH_CLUSTER, fetchCluster);
  yield takeLatest(DELETE_CLUSTER, deleteCluster);
}
