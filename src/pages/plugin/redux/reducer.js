import {
  FETCH_PLUGIN,
  FETCH_PLUGIN_FAILURE,
  FETCH_PLUGIN_SUCCESS,
  DELETE_PLUGIN,
  DELETE_PLUGIN_FAILURE,
  DELETE_PLUGIN_SUCCESS,
  UPDATE_BREADCRUMB,
  FETCH_CATEGORY,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_PLUGIN:
      return {
        ...state,
        fetchingPlugin: true
      };
    case FETCH_PLUGIN_SUCCESS:
      return {
        ...state,
        pluginList: payload.data.data,
        pluginCount: payload.data.count,
        fetchingPlugin: false
      };
    case FETCH_PLUGIN_FAILURE:
      return {
        ...state,
        error: payload.error,
        fetchingPlugin: false
      };
    case FETCH_CATEGORY:
      return {
        ...state,
        fetchingCategory: true,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: payload.data,
        fetchingCategory: false,
      };
    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        error: payload.error,
        fetchingCategory: false,
      };
    case DELETE_PLUGIN:
      return {
        ...state,
        deletePluginStarted: true,
        deletePluginSuccess: false,
        deletePluginFailure: false,
      };
    case DELETE_PLUGIN_SUCCESS:
      return {
        ...state,
        deletePluginStarted: false,
        deletePluginSuccess: true,
        deletePluginFailure: false,
      };
    case DELETE_PLUGIN_FAILURE:
      return {
        ...state,
        deletePluginStarted: false,
        deletePluginSuccess: false,
        deletePluginFailure: true,
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
