import { call, takeLatest, put, select } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import { sessionTokenSelector } from "../../login/redux/selectors";
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_USER_QUOTA,
  updateUserQuotaFailure,
  reInitUserQuota,updateUserQuotaSuccess,
} from "./actions";

import toast from '../../../components/toast/Toast'
async function fetchUsersCall(sessionToken, payload) {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const endPoint = endpoints.GET_USERS_LIST
    .replace(":page", payload?.data?.page ?? 1)
    .replace(":size", payload?.data?.size ?? 20)
    .replace(":search", payload?.data?.search ?? "")
    .replace(":sort-column", payload?.data?.sortColumn ?? "id")
    .replace(":sort-direction", payload?.data?.sortDirection ?? "desc")
  const response = await axios.get(endPoint, config);
  return response;
}

function* fetchUsers(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const response = yield call(fetchUsersCall, sessionToken, payload);
    const data = response.data;
    if (data) {
      yield put({ type: FETCH_USERS_SUCCESS, data: { data, count: response.count } });
    } else {
      yield {
        type: FETCH_USERS_FAILURE,
        data: {
          error: "Error While fetching Users",
        },
      };
    }
  } catch (error) {
    yield {
      type: FETCH_USERS_FAILURE,
      data: {
        error: "Error While fetching Users",
      },
    };
  }
}

// update user quota
function* updateUserQuota(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
          'Content-type' : 'application/json',
          'Authorization' : 'basic ' + sessionToken
      }
  }
    const response = yield axios.put(endpoints.QUOTA.UPDATE_USER_QUOTA_CONFIG.replace("id",payload.data.userId),payload.data.data,config)
    const data = response.data;
    if (data) {
      yield put(updateUserQuotaSuccess(data))
      toast.success(response.message||'Successfully updated user quota');
    } else {
      yield put(updateUserQuotaFailure("Error While fetching Users"))
      toast.error('Some error while updating quota config . Please try again');
    }
    yield put (reInitUserQuota())
  } catch (error) {
  
    if(error && error.response && error.response.data && error.response.data.error)
   {
     yield put(updateUserQuotaFailure(error.response.data.error))
     toast.error(error.response.data.error);
     
    }
      else{

        yield put(updateUserQuotaFailure("Some error while updating quota config . Please try again"))
        toast.error('Some error while updating quota config . Please try again');
      }

      yield put (reInitUserQuota())
  }
  
}

export default function* watcherSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
  yield takeLatest(UPDATE_USER_QUOTA,updateUserQuota)

}
