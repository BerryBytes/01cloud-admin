const VERSION_PREFIX = "@VERSION";

export const FETCH_VERSION_CALL = `${VERSION_PREFIX}/FETCH`;
export const FETCH_VERSION_CALL_SUCCESS = `${VERSION_PREFIX}/FETCH_SUCCESS`;
export const FETCH_VERSION_CALL_FAILURE = `${VERSION_PREFIX}/FETCH_FAILURE`;
export const CREATE_VERSION_CALL = `${VERSION_PREFIX}/CREATE`;
export const CREATE_VERSION_CALL_SUCCESS = `${VERSION_PREFIX}/CREATE_SUCCESS`;
export const CREATE_VERSION_CALL_FAILURE = `${VERSION_PREFIX}/CREATE_FAILURE`;
export const EDIT_VERSION_CALL = `${VERSION_PREFIX}/EDIT`;
export const EDIT_VERSION_CALL_SUCCESS = `${VERSION_PREFIX}/EDIT_SUCCESS`;
export const EDIT_VERSION_CALL_FAILURE = `${VERSION_PREFIX}/EDIT_FAILURE`;
export const DELETE_VERSION_CALL = `${VERSION_PREFIX}/DELETE`;
export const DELETE_VERSION_CALL_SUCCESS = `${VERSION_PREFIX}/DELETE_SUCCESS`;
export const DELETE_VERSION_CALL_FAILURE = `${VERSION_PREFIX}/DELETE_FAILURE`;

const createVersionCall = (data, history) => {
  return {
    type: CREATE_VERSION_CALL,
    data: {
      versionData: data,
      history,
    },
  };
};

const deleteVersionCall = (payload) => {
  return {
    type: DELETE_VERSION_CALL,
    data: { payload },
  };
};

const editVersionCall = (id, plugin_id, payload, history) => {
  return {
    type: EDIT_VERSION_CALL,
    data: { id, plugin_id, payload, history },
  };
};

const fetchVersionData = (id) => {
  return {
    type: FETCH_VERSION_CALL,
    data: { id },
  };
};
export {
  createVersionCall,
  deleteVersionCall,
  editVersionCall,
  fetchVersionData,
};
