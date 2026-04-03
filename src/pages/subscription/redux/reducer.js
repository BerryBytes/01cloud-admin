import initialState from "./initialState";
import {
  FETCH_SUBSCRIPTIONS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_SUBSCRIPTIONS_FAILURE,
  FETCH_ORG_SUBSCRIPTIONS,
  FETCH_ORG_SUBSCRIPTIONS_SUCCESS,
  FETCH_ORG_SUBSCRIPTIONS_FAILURE,
  FETCH_ORG_SUBSCRIPTION,
  FETCH_ORG_SUBSCRIPTION_SUCCESS,
  FETCH_ORG_SUBSCRIPTION_FAILURE,
  CREATE_ORG_SUBSCRIPTION,
  CREATE_ORG_SUBSCRIPTION_SUCCESS,
  CREATE_ORG_SUBSCRIPTION_FAILURE,
  EDIT_ORG_SUBSCRIPTION,
  EDIT_ORG_SUBSCRIPTION_SUCCESS,
  EDIT_ORG_SUBSCRIPTION_FAILURE,
  DELETE_ORG_SUBSCRIPTION,
  DELETE_ORG_SUBSCRIPTION_SUCCESS,
  DELETE_ORG_SUBSCRIPTION_FAILURE,
  FETCH_SUBSCRIPTION,
  FETCH_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTION_FAILURE,
  DELETE_SUBSCRIPTION,
  DELETE_SUBSCRIPTION_SUCCESS,
  DELETE_SUBSCRIPTION_FAILURE,
  UPDATE_BREADCRUMB,
} from "./actions";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_SUBSCRIPTIONS:
      return {
        ...state,
      };
    case FETCH_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptionList: payload.data,
      };
    case FETCH_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_ORG_SUBSCRIPTIONS:
      return {
        ...state,
        fetchingSubscription: true,
      };
    case FETCH_ORG_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        orgSubscriptionList: payload.data,
        fetchingSubscription: false,
    };
    case FETCH_ORG_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        fetchingSubscription: false,
        error: payload.error,
    };
    case FETCH_ORG_SUBSCRIPTION:
      return {
        ...state,
        fetchingSubscription: true,
      };
    case FETCH_ORG_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        orgSubscription: payload.data,
        fetchingSubscription: false,
    };
    case FETCH_ORG_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        fetchingSubscription: false,
        error: payload.error,
    };
    case CREATE_ORG_SUBSCRIPTION:
      return {
        ...state,
        creatingSubscription: true,
    };
    case CREATE_ORG_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        creatingSubscription: false,
    };
    case CREATE_ORG_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        creatingSubscription: false,
    };
    case EDIT_ORG_SUBSCRIPTION:
      return {
        ...state,
        editingSubscription: true,
    };
    case EDIT_ORG_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        editingSubscription: false,
    };
    case EDIT_ORG_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        editingSubscription: false,
    };
    case DELETE_ORG_SUBSCRIPTION:
      return {
        ...state,
        deletingSubscription: true,
    };
    case DELETE_ORG_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        deletingSubscription: false,
    };
    case DELETE_ORG_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        deletingSubscription: false,
    };
    case FETCH_SUBSCRIPTION:
      return {
        ...state,
      };
    case FETCH_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: payload.data,
      };
    case FETCH_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        deleteSubscriptionStarted: true,
        deleteSubscriptionSuccess: false,
        deleteSubscriptionFailure: false,
      };
    case DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        deleteSubscriptionStarted: false,
        deleteSubscriptionSuccess: true,
        deleteSubscriptionFailure: false,
      };
    case DELETE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        deleteSubscriptionStarted: false,
        deleteSubscriptionSuccess: false,
        deleteSubscriptionFailure: true,
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
