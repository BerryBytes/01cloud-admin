import {
  FETCH_PLUGIN_VERSION,
  FETCH_PLUGIN_VERSION_SUCCESS,
  FETCH_PLUGIN_VERSION_FAILURE,
  FETCH_PLUGIN_INFO,
  FETCH_PLUGIN_INFO_SUCCESS,
  FETCH_PLUGIN_INFO_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_PLUGIN_VERSION:
      return {
        ...state,
      };
    case FETCH_PLUGIN_VERSION_SUCCESS:
      return {
        ...state,
        pluginVersion: payload.data,
      };
    case FETCH_PLUGIN_VERSION_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_PLUGIN_INFO:
      return {
        ...state,
      };
    case FETCH_PLUGIN_INFO_SUCCESS:
      return {
        ...state,
        pluginInfo: payload.data,
      };
    case FETCH_PLUGIN_INFO_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
