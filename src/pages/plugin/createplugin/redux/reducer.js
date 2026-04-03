import {
  CREATE_PLUGIN_CALL,
  CREATE_PLUGIN_CALL_SUCCESS,
  CREATE_PLUGIN_CALL_FAILURE,
  EDIT_PLUGIN_CALL,
  EDIT_PLUGIN_CALL_FAILURE,
  EDIT_PLUGIN_CALL_SUCCESS,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case CREATE_PLUGIN_CALL:
      return {
        ...state,
        createPluginCallStarted: true,
        createPluginCallSuccess: false,
        createPluginCallFailure: false,
      };
    case CREATE_PLUGIN_CALL_SUCCESS:
      return {
        ...state,
        createPluginCallStarted: false,
        createPluginCallSuccess: true,
        createPluginCallFailure: false,
      };
    case CREATE_PLUGIN_CALL_FAILURE:
      return {
        ...state,
        createPluginCallStarted: false,
        createPluginCallSuccess: false,
        createPluginCallFailure: true,
        error: payload.error,
      };
    case EDIT_PLUGIN_CALL:
      return {
        ...state,
        editPluginCallStarted: true,
        editPluginCallSuccess: false,
        editPluginCallFailure: false,
      };
    case EDIT_PLUGIN_CALL_SUCCESS:
      return {
        ...state,
        editPluginCallStarted: false,
        editPluginCallSuccess: true,
        editPluginCallFailure: false,
      };
    case EDIT_PLUGIN_CALL_FAILURE:
      return {
        ...state,
        editPluginCallStarted: false,
        editPluginCallSuccess: false,
        editPluginCallFailure: true,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
