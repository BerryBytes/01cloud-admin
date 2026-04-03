import axios from "axios";
import { sessionTokenSelector } from "../../login/redux/selectors";
import endpoints from "../../../constants/endpoints";
import toast from "../../../components/toast/Toast";
import { takeLatest, put, select } from "@redux-saga/core/effects";
import {
  GET_OPERATORS,
  GET_OPERATORS_SUCCESS,
  GET_OPERATORS_FAILURE,
  UPDATE_OPERATOR_STATUS,
  UPDATE_OPERATOR_STATUS_SUCCESS,
  UPDATE_OPERATOR_STATUS_FAILURE,
  SYNC_OPERATOR,
  SYNC_OPERATOR_SUCCESS,
  SYNC_OPERATOR_FAILURE,
  FETCH_OPERATOR_DETAILS,
  FETCH_OPERATOR_DETAILS_SUCCESS,
  FETCH_OPERATOR_DETAILS_FAILURE,
  UPDATE_OPERATOR_DETAILS,
  UPDATE_OPERATOR_DETAILS_SUCCESS,
  UPDATE_OPERATOR_DETAILS_FAILURE,
} from "./actions";

function* getOperators() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.get(
      endpoints.OPERATORS.FETCH_OPERATORS,
      config
    );
    const data = response.data;
    if (data) {
      yield put({ type: GET_OPERATORS_SUCCESS, data });
    } else {
      yield put({ type: GET_OPERATORS_FAILURE });
      toast.error("Some error while fetching operators list. Please try again");
    }
  } catch (error) {
    yield put({ type: GET_OPERATORS_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else {
      toast.error("Some error while fetching operators list. Please try again");
    }
  }
}

function* updateOperatorStatus(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.post(
      endpoints.OPERATORS.UPDATE_OPERATOR_STATUS.replace(
        ":packageName",
        payload.packageName
      ).replace(":isActive", payload.isActive),
      null,
      config
    );
    const data = response.data;
    if (data || response.status === 200) {
      yield put({ type: UPDATE_OPERATOR_STATUS_SUCCESS });

      yield put({ type: GET_OPERATORS });
    } else {
      yield put({ type: UPDATE_OPERATOR_STATUS_FAILURE });
      toast.error(
        "Some error while updating operator status. Please try again"
      );
    }
  } catch (error) {
    yield put({ type: UPDATE_OPERATOR_STATUS_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else {
      toast.error(
        "Some error while updating operator status. Please try again"
      );
    }
  }
}

function* syncOperator(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.post(
      endpoints.OPERATORS.SYNC_OPERATOR.replace(
        ":packageName",
        payload.packageName
      ),
      null,
      config
    );
    const data = response.data;
    if (data || response.status === 200) {
      yield put({ type: SYNC_OPERATOR_SUCCESS });

      toast.success("Operator Sync successfully");

      yield put({ type: GET_OPERATORS });
    } else {
      yield put({ type: SYNC_OPERATOR_FAILURE });
      toast.error("Some error while syncing operator. Please try again");
    }
  } catch (error) {
    yield put({ type: SYNC_OPERATOR_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else {
      toast.error("Some error while syncing operator. Please try again");
    }
  }
}

function* fetchOperatorDetails(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.get(
      endpoints.OPERATORS.FETCH_OPERATOR_DETAILS.replace(
        ":packageName",
        payload.packageName
      ),
      config
    );
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_OPERATOR_DETAILS_SUCCESS, data });
    } else {
      yield put({ type: FETCH_OPERATOR_DETAILS_FAILURE });
      toast.error(
        "Some error while fetching operator details. Please try again"
      );
    }
  } catch (error) {
    yield put({ type: FETCH_OPERATOR_DETAILS_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else {
      toast.error(
        "Some error while fetching operator details. Please try again"
      );
    }
  }
}

function* updateOperatorDetails(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.put(
      endpoints.OPERATORS.UPDATE_OPERATOR_DETAILS.replace(
        ":packageName",
        payload.packageName
      ),
      payload.jsonPayload,
      config
    );
    const data = response.data;
    if (data || response.status === 200) {
      yield put({ type: UPDATE_OPERATOR_DETAILS_SUCCESS });
      yield put({
        type: FETCH_OPERATOR_DETAILS,
        packageName: payload.packageName,
      });
      toast.success("Operator Details Updated");
    } else {
      yield put({ type: UPDATE_OPERATOR_DETAILS_FAILURE });
      toast.error(
        "Some error while updating operator details. Please try again"
      );
    }
  } catch (error) {
    yield put({ type: UPDATE_OPERATOR_DETAILS_FAILURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else {
      toast.error(
        "Some error while updating operator details. Please try again"
      );
    }
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_OPERATORS, getOperators);
  yield takeLatest(UPDATE_OPERATOR_STATUS, updateOperatorStatus);
  yield takeLatest(SYNC_OPERATOR, syncOperator);
  yield takeLatest(FETCH_OPERATOR_DETAILS, fetchOperatorDetails);
  yield takeLatest(UPDATE_OPERATOR_DETAILS, updateOperatorDetails);
}
