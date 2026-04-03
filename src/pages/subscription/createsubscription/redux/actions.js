const PREFIX = "@SUBSCRIPTION";

export const CREATE_SUBSCRIPTION_CALL = `${PREFIX}/CREATE`;
export const CREATE_SUBSCRIPTION_CALL_SUCCESS = `${PREFIX}/CREATE_SUCCESS`;
export const CREATE_SUBSCRIPTION_CALL_FAILURE = `${PREFIX}/CREATE_FAILURE`;
export const EDIT_SUBSCRIPTION_CALL = `${PREFIX}/EDIT`;
export const EDIT_SUBSCRIPTION_CALL_SUCCESS = `${PREFIX}/EDIT_SUCCESS`;
export const EDIT_SUBSCRIPTION_CALL_FAILURE = `${PREFIX}/EDIT_FAILURE`;

const createSubscriptionCall = (payload, history) => {
  return {
    type: CREATE_SUBSCRIPTION_CALL,
    data: {
      subscriptionData: payload,
      history,
    },
  };
};
const editSubscriptionCall = (subId, payload, history) => {
  return {
    type: EDIT_SUBSCRIPTION_CALL,
    data: {
      id: subId,
      subscriptionData: payload,
      history,
    },
  };
};

export { createSubscriptionCall, editSubscriptionCall };
