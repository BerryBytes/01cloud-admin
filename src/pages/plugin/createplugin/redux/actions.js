const PREFIX = "@CREATE_PLUGIN";

export const CREATE_PLUGIN_CALL = `${PREFIX}/CREATE`;
export const CREATE_PLUGIN_CALL_SUCCESS = `${PREFIX}/CREATE_SUCCESS`;
export const CREATE_PLUGIN_CALL_FAILURE = `${PREFIX}/CREATE_FAILURE`;
export const EDIT_PLUGIN_CALL = `${PREFIX}/EDIT`;
export const EDIT_PLUGIN_CALL_SUCCESS = `${PREFIX}/EDIT_SUCCESS`;
export const EDIT_PLUGIN_CALL_FAILURE = `${PREFIX}/EDIT_FAILURE`;

const createPluginCall = (payload, iconPayload, history) => {
  return {
    type: CREATE_PLUGIN_CALL,
    data: {
      payload,
      iconPayload,
      history,
    },
  };
};

const editPluginCall = (id, payload, iconPayload, history) => {
  return {
    type: EDIT_PLUGIN_CALL,
    data: {
      id,
      payload,
      iconPayload,
      history,
    },
  };
};

export { createPluginCall, editPluginCall };
