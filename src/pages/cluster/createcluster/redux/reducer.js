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
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case CREATE_CLUSTER_CALL:
      return {
        ...state,
        createClusterCallStarted: true,
        createClusterCallSuccess: false,
        createClusterCallFailure: false,
      };
    case CREATE_CLUSTER_CALL_SUCCESS:
      return {
        ...state,
        createClusterCallStarted: false,
        createClusterCallSuccess: true,
        createClusterCallFailure: false,
      };
    case CREATE_CLUSTER_CALL_FAILURE:
      return {
        ...state,
        createClusterCallStarted: false,
        createClusterCallSuccess: false,
        createClusterCallFailure: true,
        error: payload.error,
      };
    case EDIT_CLUSTER_CALL:
      return {
        ...state,
        editClusterCallStarted: true,
        editClusterCallSuccess: false,
        editClusterCallFailure: false,
      };
    case EDIT_CLUSTER_CALL_SUCCESS:
      return {
        ...state,
        editClusterCallStarted: false,
        editClusterCallSuccess: true,
        editClusterCallFailure: false,
      };
    case EDIT_CLUSTER_CALL_FAILURE:
      return {
        ...state,
        editClusterCallStarted: false,
        editClusterCallSuccess: false,
        editClusterCallFailure: true,
        error: payload.error,
      };
    case FETCH_REGIONS:
      return {
        ...state,
      };
    case FETCH_REGIONS_SUCCESS:
      return {
        ...state,
        regions: payload.data,
      };
    case FETCH_REGIONS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
