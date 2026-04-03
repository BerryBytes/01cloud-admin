import {
  CREATE_SUBSCRIPTION_CALL,
  CREATE_SUBSCRIPTION_CALL_SUCCESS,
  CREATE_SUBSCRIPTION_CALL_FAILURE,
  EDIT_SUBSCRIPTION_CALL,
  EDIT_SUBSCRIPTION_CALL_SUCCESS,
  EDIT_SUBSCRIPTION_CALL_FAILURE,
} from "./actions";
import axios from "axios";
import { takeLatest, put, call, select } from "redux-saga/effects";
import toast from "../../../../components/toast/Toast";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import endpoints from "../../../../constants/endpoints";
import paths from "../../../../constants/paths";

const SubscriptionCall = async (sessionToken, data, method, id) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  let res;
  if (method === "post") {
    res = await axios.post(endpoints.CREATE_SUBSCRIPTION, data, config);
  } else if (method === "put") {
    res = await axios.put(
      endpoints.EDIT_SUBSCRIPTION.replace(":id", id),
      data,
      config
    );
  }
  return res;
};

function* createSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const res = yield call(
      SubscriptionCall,
      sessionToken,
      payload.data.subscriptionData,
      "post"
    );
    const data = res.data;
    if (data) {
      yield put({ type: CREATE_SUBSCRIPTION_CALL_SUCCESS, data });
      toast.success("Subscription Created Successfully");
      payload.data.history.push(`${paths.SUBSCRIPTION}`);
    } else {
      yield put({
        type: CREATE_SUBSCRIPTION_CALL_FAILURE,
        data: {
          error: "Error While creating subscription",
        },
      });
      toast.error("Some Error while adding Subscription");
    }
  } catch (err) {
    yield put({
      type: CREATE_SUBSCRIPTION_CALL_FAILURE,
      data: { error: err.message },
    });
    toast.error(err.message);
  }
}
function* editSubscription(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    if (!payload.data.id) {
      toast.error("Cannot Update subscription without ID");
      yield put({
        type: EDIT_SUBSCRIPTION_CALL_FAILURE,
        data: {
          error: "Error While Updating subscription",
        },
      });
    } else {
      const res = yield call(
        SubscriptionCall,
        sessionToken,
        payload.data.subscriptionData,
        "put",
        payload.data.id
      );
      const data = res.data;
      if (data) {
        yield put({ type: EDIT_SUBSCRIPTION_CALL_SUCCESS, data });
        toast.success("Subscription Updated Successfully");
        payload.data.history.push(`${paths.SUBSCRIPTION}`);
      } else {
        yield put({
          type: EDIT_SUBSCRIPTION_CALL_FAILURE,
          data: {
            error: "Error While Updating subscription",
          },
        });
        toast.error("Some Error while updating Subscription");
      }
    }
  } catch (err) {
    yield put({
      type: EDIT_SUBSCRIPTION_CALL_FAILURE,
      data: { error: err.message },
    });
    toast.error(err.message);
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_SUBSCRIPTION_CALL, createSubscription);
  yield takeLatest(EDIT_SUBSCRIPTION_CALL, editSubscription);
}
