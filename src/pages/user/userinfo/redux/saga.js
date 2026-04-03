import { select, takeLatest, call, put } from "redux-saga/effects";
import {
  FETCH_USER_INFO,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  UPDATE_USER_ACTIVE_STATUS,
  UPDATE_USER_ACTIVE_STATUS_SUCCESS,
  UPDATE_USER_ACTIVE_STATUS_FAILURE,
  UPDATE_USER_ADMIN_STATUS,
  UPDATE_USER_ADMIN_STATUS_SUCCESS,
  UPDATE_USER_ADMIN_STATUS_FAILURE,
  FETCH_USER_PROJECTS,
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILURE,
  
  ADD_USER_DISCOUNT,
  ADD_USER_DISCOUNT_SUCCESS,
  ADD_USER_DISCOUNT_FAILURE,
  UPDATE_USER_DISCOUNT,
  UPDATE_USER_DISCOUNT_SUCCESS,
  UPDATE_USER_DISCOUNT_FAILURE,
  GET_USER_DISCOUNT,
  GET_USER_DISCOUNT_FAILURE,
  GET_USER_DISCOUNT_SUCCESS
} from "./actions";
import axios from "axios";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import endpoints from "../../../../constants/endpoints";
import toast from "../../../../components/toast/Toast";

async function fetchUserInfoCall(sessionToken, userId) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.USER.USER_INFO.replace(":userId", userId),
    config
  );
  return response;
}

async function fetchUserProjectsCall(sessionToken, userId) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.get(
    endpoints.USER.USER_PROJECTS.replace(":userId", userId),
    config
  );
  return response;
}

function* fetchUserInfo(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const userInfoResponse = yield call(
      fetchUserInfoCall,
      sessionToken,
      payload.id
    );
    const data = userInfoResponse.data;

    if (data !== null) {
      yield put({ type: FETCH_USER_INFO_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_USER_INFO_FAILURE,
        data: {
          error: "Problem fetching User Info",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_USER_INFO_FAILURE,
      data: {
        error: "Problem fetching User Info",
      },
    });
  }
}

async function updateUserActiveStatusCall(userData, sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endpoint = endpoints.USER.UPDATE_USER_ACTIVE_STATUS.replace(
    ":userId",
    userData.id
  );
  const type = userData.active ? "unblock" : "block";
  const response = await axios.get(endpoint + `?type=${type}`, config);
  return response;
}

async function updateUserAdminStatusCall(userData, sessionToken) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endpoint = endpoints.USER.UPDATE_USER_ADMIN_STATUS.replace(
    ":userId",
    userData.id
  );
  const type = userData.is_admin ? true : false;
  const response = await axios.get(endpoint + `?is_admin=${type}`, config);
  return response;
}

function* updateUserActiveStatus(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      updateUserActiveStatusCall,
      payload.data,
      sessionToken
    );
    
    if (response.status === 200) {
      toast.success(
        `User ${payload.data.active ? "Unsuspended" : "Suspended"}`
      );
      yield put({
        type: UPDATE_USER_ACTIVE_STATUS_SUCCESS,
      });
      yield call(fetchUserInfo, {
        id: payload.data.id,
      });
    } else {
      toast.error("Cannot Update User Status");
      yield put({
        type: UPDATE_USER_ACTIVE_STATUS_FAILURE,
        data: {
          error: "Cannot Update User",
        },
      });
    }
  } catch (error) {
    toast.error("Cannot Update User Status");
    yield put({
      type: UPDATE_USER_ACTIVE_STATUS_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

function* updateUserAdminStatus(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(
      updateUserAdminStatusCall,
      payload.data,
      sessionToken
    );
    if (response.status === 200) {
      toast.success(
        `${
          payload.data.is_admin ? "User Made Admin" : "User Removed as an Admin"
        }`
      );
      yield put({
        type: UPDATE_USER_ADMIN_STATUS_SUCCESS,
      });
      yield call(fetchUserInfo, {
        id: payload.data.id,
      });
    } else {
      toast.error("Cannot Update User Admin Status");
      yield put({
        type: UPDATE_USER_ADMIN_STATUS_FAILURE,
        data: {
          error: "Cannot update admin Status",
        },
      });
    }
  } catch (error) {
    toast.error("Cannot Update User Admin Status");
    yield put({
      type: UPDATE_USER_ADMIN_STATUS_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

function* fetchUserProjects(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const userProjectsResponse = yield call(
      fetchUserProjectsCall,
      sessionToken,
      payload.id
    );
    const data = userProjectsResponse.data;

    if (data !== null) {
      yield put({ type: FETCH_USER_PROJECTS_SUCCESS, data });
    } else {
      yield put({
        type: FETCH_USER_PROJECTS_FAILURE,
        data: {
          error: "Problem fetching User Projects",
        },
      });
    }
  } catch (error) {
    yield put({
      type: FETCH_USER_PROJECTS_FAILURE,
      data: {
        error: error.message,
      },
    });
  }
}

function* addUserDiscount(payload){
  try{
      const sessionToken = yield select(sessionTokenSelector)
      const config = {
          headers: {
              'Content-type' : 'application/json',
              'Authorization' : 'basic ' + sessionToken,
          }
      }
      const response = yield axios.post(endpoints.USER.ADD_USER_DISCOUNT, payload.data.jsonBody, config)
      if(response.status === 200 || response.status === 201){
          yield put({ type: ADD_USER_DISCOUNT_SUCCESS})
      }else{
          yield put({type: ADD_USER_DISCOUNT_FAILURE})
          toast.error('Some error while adding discount. Please try again');
      }
  }catch(error){
      yield put({ type: ADD_USER_DISCOUNT_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else{
        toast.error('Some error while adding discount. Please try again');
      }
  }
}

function* updateUserDiscount(payload){
  try{
      const sessionToken = yield select(sessionTokenSelector)
      const config = {
          headers: {
              'Content-type' : 'application/json',
              'Authorization' : 'basic ' + sessionToken
          }
      }
      const response = yield axios.put(endpoints.USER.UPDATE_USER_DISCOUNT.replace(':id', payload.data.id), payload.data.jsonBody, config)
      if(response.status === 200 || response.status === 201){
          yield put({ type: UPDATE_USER_DISCOUNT_SUCCESS})
      }else{
          yield put({type: UPDATE_USER_DISCOUNT_FAILURE})
          toast.error('Some error while updating discount. Please try again');
      }
  }catch(error){
      yield put({ type: UPDATE_USER_DISCOUNT_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else{
        toast.error('Some error while updating discount. Please try again');
      }
  }
}

function* getUserDiscount(payload){
  try{
      const sessionToken = yield select(sessionTokenSelector)
      const config = {
          headers: {
              'Content-type' : 'application/json',
              'Authorization' : 'basic ' + sessionToken
          }
      }
      const response = yield axios.get(endpoints.USER.UPDATE_USER_DISCOUNT.replace(':id', payload.id), config)
      const data = response.data
      if(data){
          yield put({ type: GET_USER_DISCOUNT_SUCCESS, data})
      }else{
          yield put({type: GET_USER_DISCOUNT_FAILURE})
          toast.error('Some error while gettting discount. Please try again');
      }
  }catch(error){
      yield put({ type: GET_USER_DISCOUNT_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else{
        toast.error('Some error while getting discount. Please try again');
      }
  }
}

export default function* watcherSaga() {
  yield takeLatest(ADD_USER_DISCOUNT, addUserDiscount);
  yield takeLatest(GET_USER_DISCOUNT, getUserDiscount);
  yield takeLatest(UPDATE_USER_DISCOUNT, updateUserDiscount);
  yield takeLatest(FETCH_USER_INFO, fetchUserInfo);
  yield takeLatest(UPDATE_USER_ACTIVE_STATUS, updateUserActiveStatus);
  yield takeLatest(UPDATE_USER_ADMIN_STATUS, updateUserAdminStatus);
  yield takeLatest(FETCH_USER_PROJECTS, fetchUserProjects);
  
}
