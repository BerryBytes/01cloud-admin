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
    CLEAR_INVOICE_DATA,
    CLEAR_PROMO_CODE_DATA,
    CLEAR_PAYMENT_DATA,
    CLEAR_GATEWAY_DATA,
    CLEAR_DEDUCTIONS_DATA,
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
    DELETE_DEDUCTION_FAILURE
} from './actions'
import initialState from './initialState'
import { deletePromo } from './utils'

const reducer = ( state = initialState, payload ) => {
    switch(payload.type){
        case LIST_PROMO_CODES_SUCCESS:
            return {
                ...state,
                promoCodesList: payload.data,
                fetchingPromoCodes: false
            }
        case LIST_PROMO_CODES_FAILURE:
            return {
                ...state,
                fetchingPromoCodes: false
            }
        case LIST_PROMO_CODES:
            return {
                ...state,
                fetchingPromoCodes: true
            }
        case PROMO_CODE_DETAIL_SUCCESS: {
            return {
                ...state,
                promoCodeDetail: payload.data,
                fetchingPromoCodeDetail: false
            }
        }
        case PROMO_CODE_DETAIL_FAILURE: {
            return {
                ...state,
                fetchingPromoCodeDetail: false
            }
        }
        case PROMO_CODE_DETAIL: {
            return {
                ...state,
                fetchingPromoCodeDetail: true
            }
        }
        case ADD_PROMO_CODE_SUCCESS:
            return {
                ...state,
                addingPromoCode: false
            }
        case ADD_PROMO_CODE_FAILURE:
            return {
                ...state,
                addingPromoCode: false
            }
        case ADD_PROMO_CODE:
            return {
                ...state,
                addingPromoCode: true
            }
        case UPDATE_PROMO_CODE_SUCCESS:
            return {
                ...state,
                updatingPromoCode: false
            }
        case UPDATE_PROMO_CODE_FAILURE:
            return {
                ...state,
                updatingPromoCode: false
            }
        case UPDATE_PROMO_CODE:
            return {
                ...state,
                updatingPromoCode: true
            }
        case DELETE_PROMO_CODE_SUCCESS:
            return {
                ...state,
                deletingPromoCode: false,
                promoCodesList:deletePromo(state.promoCodesList,payload.data.id)
            }
        case DELETE_PROMO_CODE_FAILURE:
            return {
                ...state,
                deletingPromoCode: false
            }
        case DELETE_PROMO_CODE:
            return {
                ...state,
                deletingPromoCode: true
            }
        case GET_PAYMENTS_LIST_SUCCESS:
            return {
                ...state,
                paymentsList: payload.data ?? [],
                fetchingPaymentsList: false
            }
        case GET_MORE_PAYMENTS_LIST_SUCCESS:
            return {
                ...state,
                paymentsList: state.paymentsList ?
                [...state.paymentsList, ...payload.data]
               : [...payload.data],
                fetchingPaymentsList: false
            }
        case GET_PAYMENTS_LIST_FAILURE:
            return {
                ...state,
                fetchingPaymentsList: false
            }
        case GET_PAYMENTS_LIST:
            return {
                ...state,
                fetchingPaymentsList: true
            }
        case GET_INVOICE_LIST_SUCCESS:
            return {
                ...state,
                invoiceList: payload.data ?? [],
                fetchingInvoiceList: false
            }
        case GET_MORE_INVOICE_LIST_SUCCESS:
            return {
                ...state,
                invoiceList: state.invoiceList ?
                [...state.invoiceList, ...payload.data]
                : [...payload.data],
                fetchingInvoiceList: false
            }
        case GET_INVOICE_LIST_FAILURE:
            return {
                ...state,
                fetchingInvoiceList: false
            }
        case GET_INVOICE_LIST:
            return {
                ...state,
                fetchingInvoiceList: true
            }
        case GET_INVOICE_BY_ID_SUCCESS:
            return {
                ...state,
                invoiceData: payload.data,
                fetchingInvoiceData: false
            }
        case GET_INVOICE_BY_ID_FAILURE:
            return {
                ...state,
                fetchingInvoiceData: false
            }
        case GET_INVOICE_BY_ID:
            return {
                ...state,
                fetchingInvoiceData: true
            }
        case GET_GATEWAYS_LIST_SUCCESS:
            return {
                ...state,
                gatewaysList: payload.data,
                fetchingGateWaysList: false
            }
        case GET_GATEWAYS_LIST_FAILURE:
            return {
                ...state,
                fetchingGateWaysList: false
            }
        case GET_GATEWAYS_LIST:
            return {
                ...state,
                fetchingGateWaysList: true
            }
        case GET_GATEWAY_BY_ID:
            return {
                ...state,
                fetchingGateWayDetail: true
            }
        case GET_GATEWAY_BY_ID_SUCCESS:
            return {
                ...state,
                fetchingGateWayDetail: false,
                gatewayDetail: payload.data
            }
        case GET_GATEWAY_BY_ID_FAILURE:
            return {
                ...state,
                fetchingGateWayDetail: false,
            }
        case ADD_GATEWAY:
            return {
                ...state,
                addingGateway: true
            }
        case ADD_GATEWAY_SUCCESS:
            return {
                ...state,
                addingGateway: false,
            }
        case ADD_GATEWAY_FAILURE:
            return {
                ...state,
                addingGateway: false,
            }
        case UPDATE_GATEWAY:
            return {
                ...state,
                updatingGateWay: true
            }
        case UPDATE_GATEWAY_SUCCESS:
            return {
                ...state,
                updatingGateWay: false,
            }
        case UPDATE_GATEWAY_FAILURE:
            return {
                ...state,
                updatingGateWay: false,
            }
        case DELETE_GATEWAY:
            return {
                ...state,
                deletingGateWay: true
            }
        case DELETE_GATEWAY_SUCCESS:
            return {
                ...state,
                deletingGateWay: false,
            }
        case DELETE_GATEWAY_FAILURE:
            return {
                ...state,
                deletingGateWay: false,
            }
        case GET_DEDUCTIONS_LIST_SUCCESS:
            return {
                ...state,
                deductionsList: payload.data.data,
                fetchingDeductionsList: false
            }
        case GET_DEDUCTIONS_LIST_FAILURE:
            return {
                ...state,
                fetchingDeductionsList: false
            }
        case GET_DEDUCTIONS_LIST:
            return {
                ...state,
                fetchingDeductionsList: true
            }
        case GET_DEDUCTION_BY_ID:
            return {
                ...state,
                fetchingDeductionDetail: true
            }
        case GET_DEDUCTION_BY_ID_SUCCESS:
            return {
                ...state,
                fetchingDeductionDetail: false,
                deductionDetail: payload.data
            }
        case GET_DEDUCTION_BY_ID_FAILURE:
            return {
                ...state,
                fetchingDeductionDetail: false,
            }
        case ADD_DEDUCTION:
            return {
                ...state,
                addingDeduction: true
            }
        case ADD_DEDUCTION_SUCCESS:
            return {
                ...state,
                addingDeduction: false,
            }
        case ADD_DEDUCTION_FAILURE:
            return {
                ...state,
                addingDeduction: false,
            }
        case UPDATE_DEDUCTION:
            return {
                ...state,
                updatingDeduction: true
            }
        case UPDATE_DEDUCTION_SUCCESS:
            return {
                ...state,
                updatingDeduction: false,
            }
        case UPDATE_DEDUCTION_FAILURE:
            return {
                ...state,
                updatingDeduction: false,
            }
        case DELETE_DEDUCTION:
            return {
                ...state,
                deletingDeduction: true
            }
        case DELETE_DEDUCTION_SUCCESS:
            return {
                ...state,
                deletingDeduction: false,
            }
        case DELETE_DEDUCTION_FAILURE:
            return {
                ...state,
                deletingDeduction: false,
            }
        case CLEAR_INVOICE_DATA:
            return {
                ...state,
                invoiceData: initialState.invoiceData,
            }
        case CLEAR_PROMO_CODE_DATA:
            return {
                ...state,
                promoCodeDetail: initialState.promoCodeDetail
            }
        case CLEAR_PAYMENT_DATA:
            return {
                ...state,
                paymentsList: initialState.paymentsList,
            }
        case CLEAR_GATEWAY_DATA:
            return {
                ...state,
                gatewayDetail: initialState.gatewayDetail,
            }
        case CLEAR_DEDUCTIONS_DATA:
            return {
                ...state,
                deductionDetail: initialState.deductionDetail,
            }
        default:
            return state
    }
}

export default reducer