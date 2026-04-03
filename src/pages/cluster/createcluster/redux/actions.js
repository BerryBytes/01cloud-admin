const PREFIX = "@CLUSTER";
const REGION_PREFIX = "@REGIONS";

export const CREATE_CLUSTER_CALL = `${PREFIX}/CREATE`;
export const CREATE_CLUSTER_CALL_SUCCESS = `${PREFIX}/CREATE_SUCCESS`;
export const CREATE_CLUSTER_CALL_FAILURE = `${PREFIX}/CREATE_FAILURE`;
export const EDIT_CLUSTER_CALL = `${PREFIX}/EDIT`;
export const EDIT_CLUSTER_CALL_SUCCESS = `${PREFIX}/EDIT_SUCCESS`;
export const EDIT_CLUSTER_CALL_FAILURE = `${PREFIX}/EDIT_FAILURE`;
export const FETCH_REGIONS = `${REGION_PREFIX}/FETCH_REGIONS`;
export const FETCH_REGIONS_SUCCESS = `${REGION_PREFIX}/FETCH_REGIONS_SUCCESS`;
export const FETCH_REGIONS_FAILURE = `${REGION_PREFIX}/FETCH_REGIONS_FAILURE`;

const createClusterCall = (payload, history) => {
  return {
    type: CREATE_CLUSTER_CALL,
    data: {
      clusterData: payload,
      history,
    },
  };
};

const getRegions = () => {
  return {
    type: FETCH_REGIONS,
  };
};

const editClusterCall = (id, payload, history) => {
  return {
    type: EDIT_CLUSTER_CALL,
    data: {
      clusterData: payload,
      id,
      history,
    },
  };
};

export { createClusterCall, getRegions, editClusterCall };
