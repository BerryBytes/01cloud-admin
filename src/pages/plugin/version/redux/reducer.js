import {
  FETCH_VERSION_CALL,
  FETCH_VERSION_CALL_SUCCESS,
  FETCH_VERSION_CALL_FAILURE,
  CREATE_VERSION_CALL,
  CREATE_VERSION_CALL_SUCCESS,
  CREATE_VERSION_CALL_FAILURE,
  EDIT_VERSION_CALL,
  EDIT_VERSION_CALL_SUCCESS,
  EDIT_VERSION_CALL_FAILURE,
  DELETE_VERSION_CALL,
  DELETE_VERSION_CALL_SUCCESS,
  DELETE_VERSION_CALL_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_VERSION_CALL:
      return {
        ...state,
      };
    case FETCH_VERSION_CALL_SUCCESS:
      return {
        ...state,
        version: payload.data,
      };
    case FETCH_VERSION_CALL_FAILURE:
      return {
        ...state,

        error: payload.error,
      };
    case CREATE_VERSION_CALL:
      return {
        ...state,
        createVersionCallStarted: true,
        createVersionCallSuccess: false,
        createVersionCallFailure: false,
      };
    case CREATE_VERSION_CALL_SUCCESS:
      return {
        ...state,
        createVersionCallStarted: false,
        createVersionCallSuccess: true,
        createVersionCallFailure: false,
      };
    case CREATE_VERSION_CALL_FAILURE:
      return {
        ...state,
        createVersionCallStarted: false,
        createVersionCallSuccess: false,
        createVersionCallFailure: true,
        error: payload.error,
      };
    case EDIT_VERSION_CALL:
      return {
        ...state,
        editVersionCallStarted: true,
        editVersionCallSuccess: false,
        editVersionCallFailure: false,
      };
    case EDIT_VERSION_CALL_SUCCESS:
      return {
        ...state,
        editVersionCallStarted: false,
        editVersionCallSuccess: true,
        editVersionCallFailure: false,
      };
    case EDIT_VERSION_CALL_FAILURE:
      return {
        ...state,
        editVersionCallStarted: false,
        editVersionCallSuccess: false,
        editVersionCallFailure: true,
        error: payload.error,
      };
    case DELETE_VERSION_CALL:
      return {
        ...state,
        deleteVersionCallStarted: true,
        deleteVersionCallSuccess: false,
        deleteVersionCallFailure: false,
      };
    case DELETE_VERSION_CALL_SUCCESS:
      return {
        ...state,
        deleteVersionCallStarted: false,
        deleteVersionCallSuccess: true,
        deleteVersionCallFailure: false,
      };
    case DELETE_VERSION_CALL_FAILURE:
      return {
        ...state,
        deleteVersionCallStarted: false,
        deleteVersionCallSuccess: false,
        deleteVersionCallFailure: true,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default reducer;
