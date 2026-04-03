import {
  CREATE_SUBSCRIPTION_CALL,
  CREATE_SUBSCRIPTION_CALL_SUCCESS,
  CREATE_SUBSCRIPTION_CALL_FAILURE,
  EDIT_SUBSCRIPTION_CALL,
  EDIT_SUBSCRIPTION_CALL_SUCCESS,
  EDIT_SUBSCRIPTION_CALL_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case CREATE_SUBSCRIPTION_CALL:
      return {
        ...state,
        createSubscriptionCallStarted: true,
        createSubscriptionCallSuccess: false,
        createSubscriptionCallFailure: false,
      };
    case CREATE_SUBSCRIPTION_CALL_SUCCESS:
      return {
        ...state,
        createSubscriptionCallStarted: false,
        createSubscriptionCallSuccess: true,
        createSubscriptionCallFailure: false,
      };
    case CREATE_SUBSCRIPTION_CALL_FAILURE:
      return {
        ...state,
        createSubscriptionCallStarted: false,
        createSubscriptionCallSuccess: false,
        createSubscriptionCallFailure: true,
        error: payload.data.error,
      };
    case EDIT_SUBSCRIPTION_CALL:
      return {
        ...state,
        editSubscriptionCallStarted: true,
        editSubscriptionCallSuccess: false,
        editSubscriptionCallFailure: false,
      };
    case EDIT_SUBSCRIPTION_CALL_SUCCESS:
      return {
        ...state,
        editSubscriptionCallStarted: false,
        editSubscriptionCallSuccess: true,
        editSubscriptionCallFailure: false,
      };
    case EDIT_SUBSCRIPTION_CALL_FAILURE:
      return {
        ...state,
        editSubscriptionCallStarted: false,
        editSubscriptionCallSuccess: false,
        editSubscriptionCallFailure: true,
        error: payload.data.error,
      };

    default:
      return state;
  }
};

export default reducer;
