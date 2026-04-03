import { call, put, select, takeLatest } from "redux-saga/effects";
import { sessionTokenSelector } from "../../login/redux/selectors";
import axios from "axios";
import endpoints from "../../../constants/endpoints";
import { FETCH_EMAIL_CONTENT, FETCH_EMAIL_CONTENT_SUCCESS, FETCH_EMAIL_TEMPLATE, FETCH_EMAIL_TEMPLATE_SUCCESS, UPDATE_EMAIL_CONTENT } from "./action";
import { toast } from "react-toastify";

async function fetchEmailTemplatesCall(sessionToken){
    const config = {
        headers: {
          Authorization: "basic " + sessionToken,
        },
      };
    const response = await axios.get(endpoints.SETTINGS.FETCH_EMAIL_TEMPLATE, config);
    return response;
}

function* fetchEmailTemplates(){
    try{
        const sessionToken = yield select(sessionTokenSelector);
        const response = yield call(fetchEmailTemplatesCall, sessionToken)
        const data = response.data;
        if(data){
            yield put({type: FETCH_EMAIL_TEMPLATE_SUCCESS, data: {data}})
        }
    }
    catch(error){
      toast.error("Error while fetching email templates");
    }
}

async function fetchEmailContentCall(sessionToken, {payload}){
    const config = {
        headers: {
          Authorization: "basic " + sessionToken,
        },
      };
      const response = await axios.get(endpoints.SETTINGS.FETCH_EMAIL_CONTENT.replace("{template}", payload.email), 
        config);
      return response;
}

function* fetchEmailContent(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector);
        const response = yield call(fetchEmailContentCall, sessionToken, payload);
        const data = response.data;
        if(data){
          yield put({type:FETCH_EMAIL_CONTENT_SUCCESS, data: {data}})
        }
    }catch(error){
      toast.error("Error while fetching email lists")
    }
}

async function updateEmailContentCall(sessionToken, {payload}){
  const config = {
      headers: {
        Authorization: "basic " + sessionToken,
      },
    };
    const response = await axios.put(endpoints.SETTINGS.UPDATE_EMAIL_CONTENT.replace("{template}", payload.title),
    payload.email, 
    config);
    return response;
}

function* updateEmailContent(payload){
  try{
    const sessionToken = yield select(sessionTokenSelector);
    yield call(updateEmailContentCall, sessionToken, payload);
    toast.success("Email content updated successfully")
  }catch(error){
    toast.error("Error while updating email content");
  }
}

export default function* watcherSaga() {
    yield takeLatest(FETCH_EMAIL_TEMPLATE, fetchEmailTemplates);
    yield takeLatest(FETCH_EMAIL_CONTENT, fetchEmailContent);
    yield takeLatest(UPDATE_EMAIL_CONTENT, updateEmailContent);
}