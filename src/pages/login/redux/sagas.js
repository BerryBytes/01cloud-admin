import { call, takeLatest, select, put } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import toast from "../../../components/toast/Toast";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GETPROFILE,
  FETCH_PROFILE_SUCCESS,
  RESEND_VERIFICATION_MAIL,
  LOGOUT_SUCCESS,
  LOGOUT,
  LOGIN_AUTH0
} from "./actions";

import { sessionTokenSelector } from "./selectors";
import routes from "../../../routes";

function loginCall(payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(endpoints.AUTH.LOGIN, payload, config);
}

function loginAuth0Call() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CUSTOM-AUTH": window.localStorage.getItem("X-Custom-Auth"),
    },
  };
  return axios.post(endpoints.AUTH.Auth0Login,{},  config);
}
function* loginAuth0(payload) {
  try {
    const response = yield call(loginAuth0Call);
    const data = response.data;
   
      if (data && data.token) {
        yield put({ type: LOGIN_SUCCESS, data });
        payload.data.history.push(routes.DASHBOARD)
      } else {

        toast.error("Some error occured. Please try again");
        payload.data.cb()

      }
    
  } catch (error) {
        
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ){

      toast.error(error.response.data.error) && payload.data.cb();
    }
    else {
      toast.error("Some error occured. Please try again");
    }
        payload.data.cb()

  }
}

function getProfile(sessionToken, payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "basic " + sessionToken,
    },
  };
  return axios.get(endpoints.GET_PROFILE.replace(":userId", payload), config);
}

function logOutApiCall(sessionToken) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "basic " + sessionToken,
    },
  };
  return axios.post(endpoints.AUTH.LOGOUT, {}, config);
}

function* getProfileApiCall(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(getProfile, sessionToken, payload.data);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_PROFILE_SUCCESS, data });
    } else {
      toast.error("Error while fetching profile");
    }
  } catch (error) {
    toast.error("Error while fetching profile");
  }
}

function* login(payload) {
  try {
    const response = yield call(loginCall, payload.data);
    const data = response.data;
    if (!data.user.is_admin) {
      toast.error("You must be an admin to access this console");
      yield put({
        type: LOGIN_FAILURE,
        data: {
          message: "You must be admin to access this console",
        },
      });
      return;
    }
    if (data) {
      yield put({ type: LOGIN_SUCCESS, data });
    } else {
      toast.error("Invalid Credentials");
      yield put({
        type: LOGIN_FAILURE,
        data: {
          message: "Login failed",
        },
      });
    }
  } catch (error) {
    
    toast.error("Login failed");
    yield put({
      type: LOGIN_FAILURE,
      data: {
        message: "Login failed",
      },
    });
  }
}

function resendVerificationCall(payload) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.post(endpoints.AUTH.RESEND_VERIFY_EMAIL, payload.data, config);
}

function* resendVerification(payload) {
  try {
    const response = yield call(resendVerificationCall, payload);
    const data = response.data;
    if (data) {
      toast.success(data.message);
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else toast.error("Resend verification mail failed. Please try again");
  }
}

function* logOutUser(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(logOutApiCall, sessionToken);
    if (response.message === "Success") {
      
      yield put({ type: LOGOUT_SUCCESS });
      yield payload.data.cb();
    }
  } catch (error) {
    
    toast.error("Failed to log you out");
  }
}

export default function* watcherSaga() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(LOGIN_AUTH0, loginAuth0);
  yield takeLatest(GETPROFILE, getProfileApiCall);
  yield takeLatest(RESEND_VERIFICATION_MAIL, resendVerification);
  yield takeLatest(LOGOUT, logOutUser);
}
