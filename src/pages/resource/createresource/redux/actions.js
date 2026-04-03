const PREFIX = "@RESOURCE";

export const CREATE_RESOURCE_CALL = `${PREFIX}/CREATE`;
export const CREATE_RESOURCE_CALL_SUCCESS = `${PREFIX}/CREATE_SUCCESS`;
export const CREATE_RESOURCE_CALL_FAILURE = `${PREFIX}/CREATE_FAILURE`;
export const EDIT_RESOURCE_CALL = `${PREFIX}/EDIT`;
export const EDIT_RESOURCE_CALL_SUCCESS = `${PREFIX}/EDIT_SUCCESS`;
export const EDIT_RESOURCE_CALL_FAILURE = `${PREFIX}/EDIT_FAILURE`;

const createResourceCall = (payload, history) => {
  return {
    type: CREATE_RESOURCE_CALL,
    data: {
      payload,
      history,
    },
  };
};
const editResourceCall = (id, payload, history) => {
  return {
    type: EDIT_RESOURCE_CALL,
    data: {
      id,
      payload,
      history,
    },
  };
};

export { createResourceCall, editResourceCall };
