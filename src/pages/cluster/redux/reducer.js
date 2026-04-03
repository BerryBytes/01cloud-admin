import initialState from "./initialState";
import {
  FETCH_CLUSTERS,
  FETCH_CLUSTERS_SUCCESS,
  FETCH_CLUSTERS_FAILURE,
  FETCH_CLUSTER,
  FETCH_CLUSTER_SUCCESS,
  FETCH_CLUSTER_FAILURE,
  DELETE_CLUSTER,
  DELETE_CLUSTER_FAILURE,
  DELETE_CLUSTER_SUCCESS,
  UPDATE_BREADCRUMB,
} from "./actions";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_CLUSTERS:
      return {
        ...state,
      };
    case FETCH_CLUSTERS_SUCCESS:
      return {
        ...state,
        clusterList: payload.data,
      };
    case FETCH_CLUSTERS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_CLUSTER:
      return {
        ...state,
      };
    case FETCH_CLUSTER_SUCCESS:
      return {
        ...state,
        cluster: payload.data,
      };
    case FETCH_CLUSTER_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case DELETE_CLUSTER:
      return {
        ...state,
        deletCludterStarted: true,
        deletCludterSuccess: false,
        deletCludterFailure: false,
      };
    case DELETE_CLUSTER_SUCCESS:
      return {
        ...state,
        deletCludterStarted: false,
        deletCludterSuccess: true,
        deletCludterFailure: false,
      };
    case DELETE_CLUSTER_FAILURE:
      return {
        ...state,
        deletCludterStarted: false,
        deletCludterSuccess: false,
        deletCludterFailure: true,
      };
      case UPDATE_BREADCRUMB: 
      return {
        ...state,
        breadcrumbData : payload.data.payload
      }
    default:
      return state;
  }
};

export default reducer;
