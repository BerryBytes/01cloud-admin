import { takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { sessionTokenSelector } from "../../login/redux/selectors";
import endpoints from "../../../constants/endpoints";
import Toast from '../../../components/toast/Toast';

import {
    GET_LB_LIST,
    GET_LB_LIST_FALIURE,
    GET_LB_LIST_SUCCESS,
    GET_LB_DATA,
    GET_LB_DATA_FALIURE,
    GET_LB_DATA_SUCCESS
} from './actions'

function* getLbList(){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
        const response = yield axios.get(endpoints.LOADBALANCERS.GET_LB_LIST, config);
  
        const data = response.data;
        if(data){
            yield put({ type: GET_LB_LIST_SUCCESS, data})
        }else{
            yield put({ type: GET_LB_LIST_FALIURE })
            Toast.error(response.message ?? "Failed To Get LoadBalancers List");
        }
    }catch(error){
        yield put({ type: GET_LB_LIST_FALIURE })
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Toast.error(error.response.data.error);
          }
    }
}

function* getLbData(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
        const response = yield axios.get(
            endpoints.LOADBALANCERS.GET_LB_DETAIL.replace(":id", payload.id),
            config
        );
        
        const data = response.data;
        if(data){
            yield put({ type: GET_LB_DATA_SUCCESS, data})
        }else{
            yield put({ type: GET_LB_DATA_FALIURE })
            Toast.error(response.message ?? "Failed To Get LoadBalancers Data");
        }
    }catch(error){
        yield put({ type: GET_LB_DATA_FALIURE })
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Toast.error(error.response.data.error);
          }
    }
}

export default function* watcherSaga(){
    yield takeLatest(GET_LB_LIST, getLbList)
    yield takeLatest(GET_LB_DATA, getLbData)
}