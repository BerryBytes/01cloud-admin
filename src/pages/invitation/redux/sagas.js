import { call, takeLatest, select, put } from "redux-saga/effects";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import toast from "../../../components/toast/Toast";
import {
  GET_INVITATION_LIST,
  GET_INVITATION_LIST_SUCCESS,
  GET_INVITATION_LIST_FAILURE,
  APPROVE_INVITATION,
  APPROVE_INVITATION_SUCCESS,
  APPROVE_INVITATION_FAILURE,
  ADD_INVITATION,
  ADD_INVITATION_SUCCESS,
  ADD_INVITATION_FAILURE,
  DELETE_INVITATION,
  RESEND_EMAIL
} from "./actions";
import { sessionTokenSelector } from "../../login/redux/selectors";

function* fetchInvitationList() {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.INVITATION.GET_INVITATION_LIST, config);
    const data = response.data;
    if (data){
      yield put({ type: GET_INVITATION_LIST_SUCCESS, data })
    } 
    else{
      yield put({ type: GET_INVITATION_LIST_FAILURE })  
    }
  } catch (error) {
    yield put({ type: GET_INVITATION_LIST_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
  }
}

function* approveInvitation(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + sessionToken
      }
    }
    const response = yield axios.post(endpoints.INVITATION.APPROVE_INVITATION.replace(":id", payload.data.id), null, config);
    const data = response.data;
    if (data){   
      yield put({ type: APPROVE_INVITATION_SUCCESS })
      yield call(fetchInvitationList);
      toast.success('Invitation Approved Successfully');
    }
    else{
      yield put({ type: APPROVE_INVITATION_FAILURE })
    }
  }
  catch (error) {
    yield put({ type: APPROVE_INVITATION_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
  }
}

function* addInvitation(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Content-Type': 'application/json', 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.post(endpoints.INVITATION.ADD_INVITATION, payload.data.jsonBody, config)
    const data = response.data;
    if (data) {
      yield put({ type: ADD_INVITATION_SUCCESS, data })
      toast.success("Invitation Sent Successful");
      yield call(fetchInvitationList);
    } else {
      toast.error("Request failed");
      yield put({ type: ADD_INVITATION_FAILURE })
    }
  } catch (error) {
    yield put({ type: ADD_INVITATION_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else 
      toast.error("Request failed");
  }
}

function* deleteInvitation(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = { headers: { Authorization: "Basic " + sessionToken } };
    yield axios.delete(endpoints.INVITATION.DELETE_INVITATION.replace(":id", payload.data.id),config);
    yield call(fetchInvitationList);
    toast.success("Invitation deleted successfully!");
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

function* emailResend(payload){
  try{
      const sessionToken = yield select(sessionTokenSelector)
      const config = {
          headers: {
              'Content-type' : 'application/json',
              'Authorization' : 'basic ' + sessionToken
          }
      }
      yield axios.post(endpoints.INVITATION.RESEND_EMAIL.replace(':id', payload.data.id), null, config)
      toast.success('Email Resend successfully');
  }catch(error){
      toast.error(error.response.data.error);
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_INVITATION_LIST, fetchInvitationList);
  yield takeLatest(APPROVE_INVITATION, approveInvitation);
  yield takeLatest(ADD_INVITATION, addInvitation);
  yield takeLatest(DELETE_INVITATION, deleteInvitation);
  yield takeLatest(RESEND_EMAIL, emailResend);
}
