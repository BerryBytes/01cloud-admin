import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import { sessionTokenSelector } from "../../login/redux/selectors";
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
} from "./actions";
import toast from "../../../components/toast/Toast";
import paths from "../../../constants/paths";

async function subscriptionsCall(sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(endpoints.GET_SUBSCRIPTION_LIST, config);
  return response;
}

function* fetchSubscriptions() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(subscriptionsCall, sessionToken);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_SUBSCRIPTIONS_SUCCESS, data });
    } else {
      yield {
        type: FETCH_SUBSCRIPTIONS_FAILURE,
        data: {
          error: "Error While fetching Subscription",
        },
      };
    }
  } catch (err) {
    yield {
      type: FETCH_SUBSCRIPTIONS_FAILURE,
      data: {
        err: err.message,
      },
    };
  }
}

function* fetchOrgSubscriptions() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.get(endpoints.SUBSCRIPTION.GET_ORG_SUBSCRIPTION_LIST, config);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_ORG_SUBSCRIPTIONS_SUCCESS, data });
    } else {
      yield {
        type: FETCH_ORG_SUBSCRIPTIONS_FAILURE,
        data: {
          error: "Error While fetching Organization Subscription",
        },
      };
    }
  } catch (err) {
    yield {
      type: FETCH_ORG_SUBSCRIPTIONS_FAILURE,
      data: {
        err: err.message,
      },
    };
  }
}

function* fetchOrgSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.get(endpoints.SUBSCRIPTION.GET_ORG_SUBSCRIPTION.replace(":id", payload.data.id), config);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_ORG_SUBSCRIPTION_SUCCESS, data });
    } else {
      yield {
        type: FETCH_ORG_SUBSCRIPTION_FAILURE,
        data: {
          error: "Error While fetching Organization Subscription",
        },
      };
    }
  } catch (err) {
    yield {
      type: FETCH_ORG_SUBSCRIPTION_FAILURE,
      data: {
        err: err.message,
      },
    };
  }
}

function* createOrgSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.post(endpoints.SUBSCRIPTION.CREATE_ORG_SUBSCRIPTION, payload.data.payload, config);
    const data = response.data;
    if (data) {
      toast.success("Subscription created Successfully");
      payload.data.history.push(`${paths.ORG_SUBSCRIPTION}`);
      yield put({ type: CREATE_ORG_SUBSCRIPTION_SUCCESS });
    } else {
      toast.error("failed to create subscription")
      yield {
        type: CREATE_ORG_SUBSCRIPTION_FAILURE,
        data: {
          error: "Error While creating Organization Subscription",
        },
      };
    }
  } catch (err) {
    toast.error(err.message)
    yield {
      type: CREATE_ORG_SUBSCRIPTION_FAILURE,
      data: {
        err: err.message,
      },
    };
  }
}

function* updateOrgSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.put(endpoints.SUBSCRIPTION.UPDATE_ORG_SUBSCRIPTION.replace(":id", payload.data.id), payload.data.payload, config);
    if (response.status === 200) {
      toast.success("Subscription Updated Successfully");
      if (payload?.data?.history) {
        payload.data.history.push(`${paths.ORG_SUBSCRIPTION}`);
      }
      yield put({ type: EDIT_ORG_SUBSCRIPTION_SUCCESS });
    } else {
      toast.error("Failed to update Subscription");
      yield {
        type: EDIT_ORG_SUBSCRIPTION_FAILURE,
        data: {
          error: "Error While updating Organization Subscription",
        },
      };
    }
  } catch (err) {
    toast.error(err.message);
    yield {
      type: EDIT_ORG_SUBSCRIPTION_FAILURE,
      data: {
        err: err.message,
      },
    };
  }
}

function* deleteOrgSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
      },
    };
      yield axios.delete(endpoints.SUBSCRIPTION.DELETE_ORG_SUBSCRIPTION.replace(":id", payload.data.id), config);
      toast.success("Subscription deleted success");
      yield put({ type: DELETE_ORG_SUBSCRIPTION_SUCCESS });
      yield put({ type: FETCH_ORG_SUBSCRIPTIONS })
  } catch (err) {
    toast.error(err.message);

    yield {
      type: DELETE_ORG_SUBSCRIPTION_FAILURE,
      data: {
        err: err.message,
      },
    };
  }
}

async function fetchSubscriptionApiCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.GET_SUBSCRIPTION.replace(":id", id),
    config
  );
  return response;
}

async function deleteSubscriptionApiCall(sessionToken, id) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.delete(
    endpoints.EDIT_SUBSCRIPTION.replace(":id", id),
    config
  );
  return response;
}

function* fetchSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      fetchSubscriptionApiCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_SUBSCRIPTION_SUCCESS, data });
    } else {
      yield {
        type: FETCH_SUBSCRIPTION_FAILURE,
        data: {
          error: "Error While fetching a Subscription",
        },
      };
    }
  } catch (err) {
    yield {
      type: FETCH_SUBSCRIPTIONS_FAILURE,
      data: {
        error: err.message,
      },
    };
  }
}
function* deleteSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      deleteSubscriptionApiCall,
      sessionToken,
      payload.data.id
    );
    const data = response.data;
      yield put({ type: DELETE_SUBSCRIPTION_SUCCESS, data });
      yield put({ type: FETCH_SUBSCRIPTIONS });

      toast.success("Successfully Deleted Subscription");
  } catch (err) {
    yield {
      type: DELETE_SUBSCRIPTION_FAILURE,
      data: {
        error: err.message,
      },
    };
    toast.error(err.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_SUBSCRIPTIONS, fetchSubscriptions);
  yield takeLatest(FETCH_ORG_SUBSCRIPTIONS, fetchOrgSubscriptions);
  yield takeLatest(FETCH_ORG_SUBSCRIPTION, fetchOrgSubscription);
  yield takeLatest(CREATE_ORG_SUBSCRIPTION, createOrgSubscription);
  yield takeLatest(EDIT_ORG_SUBSCRIPTION, updateOrgSubscription);
  yield takeLatest(DELETE_ORG_SUBSCRIPTION, deleteOrgSubscription);
  yield takeLatest(FETCH_SUBSCRIPTION, fetchSubscription);
  yield takeLatest(DELETE_SUBSCRIPTION, deleteSubscription);
}
