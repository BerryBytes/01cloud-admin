import axios from 'axios';
import { sessionTokenSelector } from '../../login/redux/selectors';
import endpoints from '../../../constants/endpoints';
import toast from '../../../components/toast/Toast';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import { 
    LIST_PROMO_CODES,
    LIST_PROMO_CODES_SUCCESS,
    LIST_PROMO_CODES_FAILURE,
    PROMO_CODE_DETAIL,
    PROMO_CODE_DETAIL_FAILURE,
    PROMO_CODE_DETAIL_SUCCESS,
    ADD_PROMO_CODE,
    ADD_PROMO_CODE_FAILURE,
    ADD_PROMO_CODE_SUCCESS,
    UPDATE_PROMO_CODE,
    UPDATE_PROMO_CODE_FAILURE,
    UPDATE_PROMO_CODE_SUCCESS,
    DELETE_PROMO_CODE,
    DELETE_PROMO_CODE_FAILURE,
    DELETE_PROMO_CODE_SUCCESS,
    GET_PAYMENTS_LIST,
    GET_PAYMENTS_LIST_FAILURE,
    GET_PAYMENTS_LIST_SUCCESS,
    GET_MORE_PAYMENTS_LIST_SUCCESS,
    GET_INVOICE_LIST,
    GET_INVOICE_LIST_FAILURE,
    GET_INVOICE_LIST_SUCCESS,
    GET_MORE_INVOICE_LIST_SUCCESS,
    GET_INVOICE_BY_ID,
    GET_INVOICE_BY_ID_FAILURE,
    GET_INVOICE_BY_ID_SUCCESS,
    GET_GATEWAYS_LIST,
    GET_GATEWAYS_LIST_FAILURE,
    GET_GATEWAYS_LIST_SUCCESS,
    GET_GATEWAY_BY_ID,
    GET_GATEWAY_BY_ID_FAILURE,
    GET_GATEWAY_BY_ID_SUCCESS,
    ADD_GATEWAY,
    ADD_GATEWAY_FAILURE,
    ADD_GATEWAY_SUCCESS,
    UPDATE_GATEWAY,
    UPDATE_GATEWAY_SUCCESS,
    UPDATE_GATEWAY_FAILURE,
    DELETE_GATEWAY,
    DELETE_GATEWAY_SUCCESS,
    DELETE_GATEWAY_FAILURE,
    GET_DEDUCTIONS_LIST,
    GET_DEDUCTIONS_LIST_FAILURE,
    GET_DEDUCTIONS_LIST_SUCCESS,
    GET_DEDUCTION_BY_ID,
    GET_DEDUCTION_BY_ID_FAILURE,
    GET_DEDUCTION_BY_ID_SUCCESS,
    ADD_DEDUCTION,
    ADD_DEDUCTION_FAILURE,
    ADD_DEDUCTION_SUCCESS,
    UPDATE_DEDUCTION,
    UPDATE_DEDUCTION_SUCCESS,
    UPDATE_DEDUCTION_FAILURE,
    DELETE_DEDUCTION,
    DELETE_DEDUCTION_SUCCESS,
    DELETE_DEDUCTION_FAILURE,
} from './actions'

function* listPromoCodes(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'basic ' + sessionToken
            }
        }
        const response = yield axios.get(endpoints.BILLING.LIST_PROMO_CODES
            .replace(':searchText', payload.data.searchText)
            .replace(':status',payload.data.status), config)
        const data = response.data;
        if(data){
            
            yield put({ type: LIST_PROMO_CODES_SUCCESS, data})
        }else{
            yield put({ type: LIST_PROMO_CODES_FAILURE})
            toast.error('Some error while fetching promo code list. Please try again');
        }
    }
    catch(error){
        yield put({ type: LIST_PROMO_CODES_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching promo code list. Please try again');
        }
    }
}

function* getPromoCodeDetail(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.BILLING.GET_PROMO_CODE_DETAIL.replace(':id', payload.id), config)
        const data = response.data
        if(data){
            yield put({ type: PROMO_CODE_DETAIL_SUCCESS, data})
        }else{
            yield put({ type: PROMO_CODE_DETAIL_FAILURE})
            toast.error('Some error while fetching promo code detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: PROMO_CODE_DETAIL_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching promo code detail. Please try again');
        }
    }
}

function* addPromoCode(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.post(endpoints.BILLING.ADD_PROMO_CODE, payload.data.jsonBody, config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: ADD_PROMO_CODE_SUCCESS})
            yield put({ type: LIST_PROMO_CODES , data : {searchText:'', status: " "}})
        }else{
            yield put({type: ADD_PROMO_CODE_FAILURE})
            toast.error('Some error while adding promo code. Please try again');
        }
    }catch(error){
        yield put({ type: ADD_PROMO_CODE_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while adding promo code. Please try again');
        }
    }
}

function* updatePromoCode(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.put(endpoints.BILLING.UPDATE_PROMO_CODE.replace(':id', payload.data.id), payload.data.jsonBody, config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: UPDATE_PROMO_CODE_SUCCESS})
            yield put({ type: LIST_PROMO_CODES , data : {searchText:'', status: " "}})
        }else{
            yield put({type: UPDATE_PROMO_CODE_FAILURE})
            toast.error('Some error while updating promo code. Please try again');
        }
    }catch(error){
        yield put({ type: UPDATE_PROMO_CODE_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while updating promo code. Please try again');
        }
    }
}

function* deletePromoCode(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.delete(endpoints.BILLING.DELETE_PROMO_CODE.replace(':id', payload.id), config)
        
        if(response.status === 200 || response.status === 201){
            yield put({ type: DELETE_PROMO_CODE_SUCCESS,data:{id:payload.id}})
            
        }else{
            yield put({type: DELETE_PROMO_CODE_FAILURE})
            toast.error('Some error while deleting promo code. Please try again');
        }
    }catch(error){
        yield put({ type: DELETE_PROMO_CODE_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while deleting promo code. Please try again');
        }
    }
}

function* getPaymentsList(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'basic ' + sessionToken
            }
        }
        const response = yield axios.get(endpoints.BILLING.GET_PAYMENTS_LIST
            .replace(':page', payload.data.page)
            .replace(':size', payload.data.size)
            .replace(':searchText', payload.data.searchText)
            .replace(':status',payload.data.status)
            .replace(':fromDate',payload.data.fromDate)
            .replace(':toDate',payload.data.toDate), config)
        const data = response.data;
        if(data){
            if (payload.data?.page === 1) {
                yield put({ type: GET_PAYMENTS_LIST_SUCCESS, data})
            }else{
                yield put({ type: GET_MORE_PAYMENTS_LIST_SUCCESS, data})
            }
        }else{
            yield put({ type: GET_PAYMENTS_LIST_FAILURE})
            toast.error('Some error while fetching payments list. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_PAYMENTS_LIST_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching payments list. Please try again');
        }
    }
}

function* getInvoiceList(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'basic ' + sessionToken
            }
        }
        const response = yield axios.get(endpoints.BILLING.GET_INVOICE_LIST  
            .replace(':page', payload.data.page)
            .replace(':size', payload.data.size)
            .replace(':searchText', payload.data.searchText)
            .replace(':status',payload.data.status)
            .replace(':user_id', payload.data.user_id)
            .replace(':fromDate',payload.data.fromDate)
            .replace(':toDate',payload.data.toDate), config)
        const data = response.data;
        if(data){
            if (payload.data?.page === 1) {
                yield put({ type: GET_INVOICE_LIST_SUCCESS, data})
            }else{
                yield put({ type: GET_MORE_INVOICE_LIST_SUCCESS, data})
            }
        }else{
            yield put({ type: GET_INVOICE_LIST_FAILURE})
            toast.error('Some error while fetching invoice list. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_INVOICE_LIST_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching invoice list. Please try again');
        }
    }
}

function* getInvoiceById(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.BILLING.GET_INVOICE_BY_ID.replace(':id', payload.id), config)
        const data = response.data
        if(data){
            yield put({ type: GET_INVOICE_BY_ID_SUCCESS, data})
        }else{
            yield put({ type: GET_INVOICE_BY_ID_FAILURE})
            toast.error('Some error while fetching invoice detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_INVOICE_BY_ID_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching invoice detail. Please try again');
        }
    }
}

function* getGateWaysList(){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'basic ' + sessionToken
            }
        }
        const response = yield axios.get(endpoints.BILLING.GET_GATEWAYS_LIST, config)
        const data = response.data;
        if(data){
            yield put({ type: GET_GATEWAYS_LIST_SUCCESS, data})
        }else{
            yield put({ type: GET_GATEWAYS_LIST_FAILURE})
            toast.error('Some error while fetching gateways list. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_GATEWAYS_LIST_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching gateways list. Please try again');
        }
    }
}

function* addGateWay(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.post(endpoints.BILLING.ADD_GATEWAY, payload.data.jsonBody, config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: ADD_GATEWAY_SUCCESS})
            yield put({type: GET_GATEWAYS_LIST})
        }else{
            yield put({type: ADD_GATEWAY_FAILURE})
            toast.error('Some error while adding gateway. Please try again');
        }
    }catch(error){
        yield put({ type: ADD_GATEWAY_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while adding gateway. Please try again');
        }
    }
}

function* updateGateWay(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.put(endpoints.BILLING.UPDATE_GATEWAY.replace(':id', payload.data.id), payload.data.jsonBody, config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: UPDATE_GATEWAY_SUCCESS})
            yield put({ type: GET_GATEWAYS_LIST})
        }else{
            yield put({type: UPDATE_GATEWAY_FAILURE})
            toast.error('Some error while updating gateway. Please try again');
        }
    }catch(error){
        yield put({ type: UPDATE_GATEWAY_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while updating gateway. Please try again');
        }
    }
}

function* deleteGateWay(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.delete(endpoints.BILLING.DELETE_GATEWAY.replace(':id', payload.id), config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: DELETE_GATEWAY_SUCCESS})
            yield put({ type: GET_GATEWAYS_LIST})
        }else{
            yield put({type: DELETE_GATEWAY_FAILURE})
            toast.error('Some error while deleting gateway. Please try again');
        }
    }catch(error){
        yield put({ type: DELETE_GATEWAY_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while deleting gateway. Please try again');
        }
    }
}

function* getGateWayById(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.BILLING.GET_GATEWAY_BY_ID.replace(':id', payload.id), config)
        const data = response.data
        if(data){
            yield put({ type: GET_GATEWAY_BY_ID_SUCCESS, data})
        }else{
            yield put({ type: GET_GATEWAY_BY_ID_FAILURE})
            toast.error('Some error while fetching gateway detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_GATEWAY_BY_ID_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching gateway detail. Please try again');
        }
    }
}

function* getDeductionsList(){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'basic ' + sessionToken
            }
        }
        const response = yield axios.get(endpoints.BILLING.GET_DEDUCTIONS_LIST, config)
        const data = response.data;
        if(data){
            yield put({ type: GET_DEDUCTIONS_LIST_SUCCESS, data})
        }else{
            yield put({ type: GET_DEDUCTIONS_LIST_FAILURE})
            toast.error('Some error while fetching deduction list. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_DEDUCTIONS_LIST_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching deduction list. Please try again');
        }
    }
}

function* addDeduction(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.post(endpoints.BILLING.ADD_DEDUCTION, payload.data.jsonBody, config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: ADD_DEDUCTION_SUCCESS})
            yield put({type: GET_DEDUCTIONS_LIST})
        }else{
            yield put({type: ADD_DEDUCTION_FAILURE})
            toast.error('Some error while adding deduction. Please try again');
        }
    }catch(error){
        yield put({ type: ADD_DEDUCTION_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while adding deduction. Please try again');
        }
    }
}

function* updateDeduction(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.put(endpoints.BILLING.UPDATE_DEDUCTION.replace(':id', payload.data.id), payload.data.jsonBody, config)
        if(response.status === 200 || response.status === 201){
            yield put({ type: UPDATE_DEDUCTION_SUCCESS})
            yield put({ type: GET_DEDUCTIONS_LIST})
        }else{
            yield put({type: UPDATE_DEDUCTION_FAILURE})
            toast.error('Some error while updating deduction. Please try again');
        }
    }catch(error){
        yield put({ type: UPDATE_DEDUCTION_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while updating deduction. Please try again');
        }
    }
}

function* deleteDeduction(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type' : 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }
        const response = yield axios.delete(endpoints.BILLING.DELETE_DEDUCTION.replace(':id', payload.id), config)
        if(response.status === 200 || response.status === 201 || response.status === 204){
            yield put({ type: DELETE_DEDUCTION_SUCCESS})
            yield put({ type: GET_DEDUCTIONS_LIST})
        }else{
            yield put({type: DELETE_DEDUCTION_FAILURE})
            toast.error('Some error while deleting deduction. Please try again');
        }
    }catch(error){
        yield put({ type: DELETE_DEDUCTION_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while deleting deduction. Please try again');
        }
    }
}

function* getDeductionById(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization' : 'basic ' + sessionToken
            }
        }

        const response = yield axios.get(endpoints.BILLING.GET_DEDUCTION_BY_ID.replace(':id', payload.id), config)
        const data = response.data
        if(data){
            yield put({ type: GET_DEDUCTION_BY_ID_SUCCESS, data})
        }else{
            yield put({ type: GET_DEDUCTION_BY_ID_FAILURE})
            toast.error('Some error while fetching deduction detail. Please try again');
        }
    }
    catch(error){
        yield put({ type: GET_DEDUCTION_BY_ID_FAILURE })
        if(error && error.response && error.response.data && error.response.data.error)
          toast.error(error.response.data.error);
        else{
          toast.error('Some error while fetching deduction detail. Please try again');
        }
    }
}

export default function* watcherSaga(){
    yield takeLatest(LIST_PROMO_CODES, listPromoCodes)
    yield takeLatest(PROMO_CODE_DETAIL, getPromoCodeDetail)
    yield takeLatest(ADD_PROMO_CODE, addPromoCode)
    yield takeLatest(UPDATE_PROMO_CODE, updatePromoCode)
    yield takeLatest(DELETE_PROMO_CODE, deletePromoCode)
    yield takeLatest(GET_PAYMENTS_LIST, getPaymentsList)
    yield takeLatest(GET_INVOICE_LIST, getInvoiceList)
    yield takeLatest(GET_INVOICE_BY_ID, getInvoiceById)
    yield takeLatest(GET_GATEWAYS_LIST, getGateWaysList)
    yield takeLatest(ADD_GATEWAY, addGateWay)
    yield takeLatest(UPDATE_GATEWAY, updateGateWay)
    yield takeLatest(DELETE_GATEWAY, deleteGateWay)
    yield takeLatest(GET_GATEWAY_BY_ID, getGateWayById)
    yield takeLatest(GET_DEDUCTIONS_LIST, getDeductionsList)
    yield takeLatest(ADD_DEDUCTION, addDeduction)
    yield takeLatest(UPDATE_DEDUCTION, updateDeduction)
    yield takeLatest(DELETE_DEDUCTION, deleteDeduction)
    yield takeLatest(GET_DEDUCTION_BY_ID, getDeductionById)
}