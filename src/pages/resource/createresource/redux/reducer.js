import {
  CREATE_RESOURCE_CALL,
  CREATE_RESOURCE_CALL_SUCCESS,
  CREATE_RESOURCE_CALL_FAILURE,
  EDIT_RESOURCE_CALL,
  EDIT_RESOURCE_CALL_SUCCESS,
  EDIT_RESOURCE_CALL_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case CREATE_RESOURCE_CALL:
      return {
        ...state,
        createResourceCallStarted: true,
        createResourceCallSuccess: false,
        createResourceCallFailure: false,
      };
    case CREATE_RESOURCE_CALL_SUCCESS:
      return {
        ...state,
        createResourceCallStarted: false,
        createResourceCallSuccess: true,
        createResourceCallFailure: false,
      };
    case CREATE_RESOURCE_CALL_FAILURE:
      return {
        ...state,
        createResourceCallStarted: false,
        createResourceCallSuccess: false,
        createResourceCallFailure: true,
        error: payload.error,
      };
    case EDIT_RESOURCE_CALL:
      return {
        ...state,
        editResourceCallStarted: true,
        editResourceCallSuccess: false,
        editResourceCallFailure: false,
      };
    case EDIT_RESOURCE_CALL_SUCCESS:
      return {
        ...state,
        editResourceCallStarted: false,
        editResourceCallSuccess: true,
        editResourceCallFailure: false,
      };
    case EDIT_RESOURCE_CALL_FAILURE:
      return {
        ...state,
        editResourceCallStarted: false,
        editResourceCallSuccess: false,
        editResourceCallFailure: true,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
