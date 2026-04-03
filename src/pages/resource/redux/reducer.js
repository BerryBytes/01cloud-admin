import {
  FETCH_RESOURCES,
  FETCH_RESOURCES_SUCCESS,
  FETCH_RESOURCES_FAILURE,
  FETCH_RESOURCE,
  FETCH_RESOURCE_FAILURE,
  FETCH_RESOURCE_SUCCESS,
  DELETE_RESOURCE,
  DELETE_RESOURCE_FAILURE,
  DELETE_RESOURCE_SUCCESS,
  UPDATE_BREADCRUMB,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_RESOURCES:
      return {
        ...state,
      };
    case FETCH_RESOURCES_SUCCESS:
      return {
        ...state,
        resourceList: payload.data,
      };
    case FETCH_RESOURCES_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_RESOURCE:
      return {
        ...state,
      };
    case FETCH_RESOURCE_SUCCESS:
      return {
        ...state,
        resource: payload.data,
      };
    case FETCH_RESOURCE_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case DELETE_RESOURCE:
      return {
        ...state,
        deleteResourceStarted: true,
        deleteResourceSuccess: false,
        deleteResourceFailure: false,
      };
    case DELETE_RESOURCE_SUCCESS:
      return {
        ...state,
        deleteResourceStarted: false,
        deleteResourceSuccess: true,
        deleteResourceFailure: false,
      };
    case DELETE_RESOURCE_FAILURE:
      return {
        ...state,
        deleteResourceStarted: false,
        deleteResourceSuccess: false,
        deleteResourceFailure: true,
        error: payload.error,
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
