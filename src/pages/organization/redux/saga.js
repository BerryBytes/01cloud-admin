import axios from 'axios';
import { sessionTokenSelector } from '../../login/redux/selectors';
import endpoints from '../../../constants/endpoints';
import toast from '../../../components/toast/Toast';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import { 
    GET_ORGANIZATION_LIST,
    GET_ORGANIZATION_LIST_SUCCESS,
    GET_ORGANIZATION_LIST_FAILURE,
    GET_ORGANIZATION_BY_ID,
    GET_ORGANIZATION_BY_ID_SUCCESS,
    GET_ORGANIZATION_BY_ID_FAILURE,
    GET_PROJECT_OF_ORGANIZATION,
    GET_PROJECT_OF_ORGANIZATION_FAILURE,
    GET_PROJECT_OF_ORGANIZATION_SUCCESS,
    GET_CLUSTER_OF_ORGANIZATION,
    GET_CLUSTER_OF_ORGANIZATION_FAILURE,
    GET_CLUSTER_OF_ORGANIZATION_SUCCESS
} from './actions'

function* getOrganizationList(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'basic ' + sessionToken
            }
        }
        const response = yield axios.get(endpoints.ORGANIZATION.GET_ORGANIZATION_LIST  
            .replace(':page', payload.data.page)
            .replace(':size', payload.data.size)
            .replace(':search', payload.data.search)
            , config)
        const data = response.data;
        if(data){
            yield put({ type: GET_ORGANIZATION_LIST_SUCCESS, data: { data, count: response.count }})
        }else{
            yield put({ type: GET_ORGANIZATION_LIST_FAILURE})
            toast.error('Some error while fetching organization list. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_ORGANIZATION_LIST_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching organization list. Please try again');
        }
    }
}

function* getOrganizationById(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.ORGANIZATION.GET_ORGANIZATION_BY_ID.replace(':id', payload.id), config)
        const data = response.data
        if(data){
            yield put({ type: GET_ORGANIZATION_BY_ID_SUCCESS, data})
        }else{
            yield put({ type: GET_ORGANIZATION_BY_ID_FAILURE})
            toast.error('Some error while fetching organization detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_ORGANIZATION_BY_ID_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching organization detail. Please try again');
        }
    }
}

function* getProjectOfOrganization(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.ORGANIZATION.GET_PROJECT_OF_ORGANIZATION.replace(':oid', payload.oid), config)
        const data = response.data
        if(data){
            yield put({ type: GET_PROJECT_OF_ORGANIZATION_SUCCESS, data})
        }else{
            yield put({ type: GET_PROJECT_OF_ORGANIZATION_FAILURE})
            toast.error('Some error while fetching organization detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_PROJECT_OF_ORGANIZATION_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching organization detail. Please try again');
        }
    }
}

function* getClusterOfOrganization(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.ORGANIZATION.GET_CLUSTER_OF_ORGANIZATION.replace(':oid', payload.oid), config)
        const data = response.data
        if(data){
            yield put({ type: GET_CLUSTER_OF_ORGANIZATION_SUCCESS, data})
        }else{
            yield put({ type: GET_CLUSTER_OF_ORGANIZATION_FAILURE})
            toast.error('Some error while fetching organization detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_CLUSTER_OF_ORGANIZATION_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching organization detail. Please try again');
        }
    }
}

export default function* watcherSaga(){
    yield takeLatest(GET_ORGANIZATION_LIST, getOrganizationList)
    yield takeLatest(GET_ORGANIZATION_BY_ID, getOrganizationById)
    yield takeLatest(GET_PROJECT_OF_ORGANIZATION, getProjectOfOrganization)
    yield takeLatest(GET_CLUSTER_OF_ORGANIZATION, getClusterOfOrganization)
}