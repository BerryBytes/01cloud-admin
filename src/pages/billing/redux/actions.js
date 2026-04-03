const BILLING_PREFIX = "@BILLING"

export const ADD_PROMO_CODE = `${ BILLING_PREFIX }/ADD_PROMO_CODE`
export const ADD_PROMO_CODE_SUCCESS = `${ BILLING_PREFIX }/ADD_PROMO_CODE_SUCCESS`
export const ADD_PROMO_CODE_FAILURE = `${ BILLING_PREFIX }/ADD_PROMO_CODE_FAILURE`

export const UPDATE_PROMO_CODE = `${ BILLING_PREFIX }/UPDATE_PROMO_CODE`
export const UPDATE_PROMO_CODE_SUCCESS = `${ BILLING_PREFIX }/UPDATE_PROMO_CODE_SUCCESS`
export const UPDATE_PROMO_CODE_FAILURE = `${ BILLING_PREFIX }/UPDATE_PROMO_CODE_FAILURE`

export const DELETE_PROMO_CODE = `${ BILLING_PREFIX }/DELETE_PROMO_CODE`
export const DELETE_PROMO_CODE_SUCCESS = `${ BILLING_PREFIX }/DELETE_PROMO_CODE_SUCCESS`
export const DELETE_PROMO_CODE_FAILURE = `${ BILLING_PREFIX }/DELETE_PROMO_CODE_FAILURE`
export const DELETE_PROMO_CODE_CLEAN = `${ BILLING_PREFIX }/DELETE_PROMO_CODE_CLEAN`

export const LIST_PROMO_CODES = `${ BILLING_PREFIX }/LIST_PROMO_CODES`
export const LIST_PROMO_CODES_SUCCESS = `${ BILLING_PREFIX }/LIST_PROMO_CODES_SUCCESS`
export const LIST_PROMO_CODES_FAILURE = `${ BILLING_PREFIX }/LIST_PROMO_CODES_FAILURE`

export const PROMO_CODE_DETAIL = `${ BILLING_PREFIX }/PROMO_CODE_DETAIL`
export const PROMO_CODE_DETAIL_SUCCESS = `${ BILLING_PREFIX }/PROMO_CODE_DETAIL_SUCCESS`
export const PROMO_CODE_DETAIL_FAILURE = `${ BILLING_PREFIX }/PROMO_CODE_DETAIL_FAILURE`

export const GET_PAYMENTS_LIST = `${ BILLING_PREFIX }/GET_PAYMENTS_LIST`
export const GET_PAYMENTS_LIST_SUCCESS = `${ BILLING_PREFIX }/GET_PAYMENTS_LIST_SUCCESS`
export const GET_MORE_PAYMENTS_LIST_SUCCESS = `${ BILLING_PREFIX }/GET_MORE_PAYMENTS_LIST_SUCCESS`
export const GET_PAYMENTS_LIST_FAILURE = `${ BILLING_PREFIX }/GET_PAYMENTS_LIST_FAILURE`

export const GET_INVOICE_LIST = `${ BILLING_PREFIX }/GET_INVOICE_LIST`
export const GET_INVOICE_LIST_SUCCESS = `${ BILLING_PREFIX }/GET_INVOICE_LIST_SUCCESS`
export const GET_MORE_INVOICE_LIST_SUCCESS = `${ BILLING_PREFIX }/GET_MORE_INVOICE_LIST_SUCCESS`
export const GET_INVOICE_LIST_FAILURE = `${ BILLING_PREFIX }/GET_INVOICE_LIST_FAILURE`

export const GET_GATEWAYS_LIST = `${ BILLING_PREFIX }/GET_GATEWAYS_LIST`
export const GET_GATEWAYS_LIST_SUCCESS = `${ BILLING_PREFIX }/GET_GATEWAYS_LIST_SUCCESS`
export const GET_GATEWAYS_LIST_FAILURE = `${ BILLING_PREFIX }/GET_GATEWAYS_LIST_FAILURE`

export const GET_GATEWAY_BY_ID = `${ BILLING_PREFIX }/GET_GATEWAY_BY_ID`
export const GET_GATEWAY_BY_ID_SUCCESS = `${ BILLING_PREFIX }/GET_GATEWAY_BY_ID_SUCCESS`
export const GET_GATEWAY_BY_ID_FAILURE = `${ BILLING_PREFIX }/GET_GATEWAY_BY_ID_FAILURE`

export const ADD_GATEWAY = `${ BILLING_PREFIX }/ADD_GATEWAY`
export const ADD_GATEWAY_SUCCESS = `${ BILLING_PREFIX }/ADD_GATEWAY_SUCCESS`
export const ADD_GATEWAY_FAILURE = `${ BILLING_PREFIX }/ADD_GATEWAY_FAILURE`

export const UPDATE_GATEWAY = `${ BILLING_PREFIX }/UPDATE_GATEWAY`
export const UPDATE_GATEWAY_SUCCESS = `${ BILLING_PREFIX }/UPDATE_GATEWAY_SUCCESS`
export const UPDATE_GATEWAY_FAILURE = `${ BILLING_PREFIX }/UPDATE_GATEWAY_FAILURE`

export const DELETE_GATEWAY = `${ BILLING_PREFIX }/DELETE_GATEWAY`
export const DELETE_GATEWAY_SUCCESS = `${ BILLING_PREFIX }/DELETE_GATEWAY_SUCCESS`
export const DELETE_GATEWAY_FAILURE = `${ BILLING_PREFIX }/DELETE_GATEWAY_FAILURE`

export const GET_DEDUCTIONS_LIST = `${ BILLING_PREFIX }/GET_DEDUCTIONS_LIST`
export const GET_DEDUCTIONS_LIST_SUCCESS = `${ BILLING_PREFIX }/GET_DEDUCTIONS_LIST_SUCCESS`
export const GET_DEDUCTIONS_LIST_FAILURE = `${ BILLING_PREFIX }/GET_DEDUCTIONS_LIST_FAILURE`

export const GET_DEDUCTION_BY_ID = `${ BILLING_PREFIX }/GET_DEDUCTION_BY_ID`
export const GET_DEDUCTION_BY_ID_SUCCESS = `${ BILLING_PREFIX }/GET_DEDUCTION_BY_ID_SUCCESS`
export const GET_DEDUCTION_BY_ID_FAILURE = `${ BILLING_PREFIX }/GET_DEDUCTION_BY_ID_FAILURE`

export const ADD_DEDUCTION = `${ BILLING_PREFIX }/ADD_DEDUCTION`
export const ADD_DEDUCTION_SUCCESS = `${ BILLING_PREFIX }/ADD_DEDUCTION_SUCCESS`
export const ADD_DEDUCTION_FAILURE = `${ BILLING_PREFIX }/ADD_DEDUCTION_FAILURE`

export const UPDATE_DEDUCTION = `${ BILLING_PREFIX }/UPDATE_DEDUCTION`
export const UPDATE_DEDUCTION_SUCCESS = `${ BILLING_PREFIX }/UPDATE_DEDUCTION_SUCCESS`
export const UPDATE_DEDUCTION_FAILURE = `${ BILLING_PREFIX }/UPDATE_DEDUCTION_FAILURE`

export const DELETE_DEDUCTION = `${ BILLING_PREFIX }/DELETE_DEDUCTION`
export const DELETE_DEDUCTION_SUCCESS = `${ BILLING_PREFIX }/DELETE_DEDUCTION_SUCCESS`
export const DELETE_DEDUCTION_FAILURE = `${ BILLING_PREFIX }/DELETE_DEDUCTION_FAILURE`

export const GET_INVOICE_BY_ID = `${ BILLING_PREFIX }/GET_INVOICE_BY_ID`
export const GET_INVOICE_BY_ID_SUCCESS = `${ BILLING_PREFIX }/GET_INVOICE_BY_ID_SUCCESS`
export const GET_INVOICE_BY_ID_FAILURE = `${ BILLING_PREFIX }/GET_INVOICE_BY_ID_FAILURE`

export const CLEAR_PROMO_CODE_DATA = `${ BILLING_PREFIX }/CLEAR_PROMO_CODE_DATA`
export const CLEAR_INVOICE_DATA = `${ BILLING_PREFIX }/CLEAR_INVOICE_DATA`
export const CLEAR_PAYMENT_DATA = `${ BILLING_PREFIX }/CLEAR_PAYMENT_DATA`
export const CLEAR_GATEWAY_DATA = `${ BILLING_PREFIX }/CLEAR_GATEWAY_DATA`
export const CLEAR_DEDUCTIONS_DATA = `${ BILLING_PREFIX }/CLEAR_DEDUCTIONS_DATA`

export const clearInvoiceData = () => ({
	type: CLEAR_INVOICE_DATA
})

export const clearPromoCodeData = () => ({
	type: CLEAR_PROMO_CODE_DATA
})

export const clearGateWayData = () => ({
	type: CLEAR_GATEWAY_DATA
})

export const clearDeductionData = () => ({
	type: CLEAR_DEDUCTIONS_DATA
})

export const getGateWaysList = () => ({
	type: GET_GATEWAYS_LIST
})

export const getDeductionsList = () => ({
	type: GET_DEDUCTIONS_LIST
})

export const getPromoCodeList = (searchText, status) => ({
    type: LIST_PROMO_CODES,
	data: { searchText, status }
})

export const getPaymentsList = (page,size,searchText,status,fromDate,toDate) => ({
    type: GET_PAYMENTS_LIST,
	data: { page,size,searchText, status, fromDate, toDate }
})

export const getInvoiceList = (page, size, searchText, status,user_id, fromDate, toDate) => ({
    type: GET_INVOICE_LIST,
	data: { page, size, searchText, status,user_id, fromDate, toDate }
})

export const getInvoiceById = (id) => ({
    type: GET_INVOICE_BY_ID,
	id: id
})

export const getPromoCodeDetail = (id) => ({
    type: PROMO_CODE_DETAIL,
    id: id
})

export const getGateWayById = (id) => ({
	type: GET_GATEWAY_BY_ID,
	id: id
})

export const getDeductionById = (id) => ({
	type: GET_DEDUCTION_BY_ID,
	id: id
})

export const addPromoCode = (jsonBody) => ({
	type: ADD_PROMO_CODE,
	data: { jsonBody }
})

export const addGateWay = (jsonBody) => ({
	type: ADD_GATEWAY,
	data: { jsonBody }
})

export const addDeduction = (jsonBody) => ({
	type: ADD_DEDUCTION,
	data: { jsonBody }
})

export const updatePromoCode = (id, jsonBody) => ({
	type: UPDATE_PROMO_CODE,
	data: { id, jsonBody }
})

export const updateGateWay = (id, jsonBody) => ({
	type: UPDATE_GATEWAY,
	data: { id, jsonBody }
})

export const updateDeduction = (id, jsonBody) => ({
	type: UPDATE_DEDUCTION,
	data: { id, jsonBody }
})

export const deletePromoCode = (id) => ({
	type: DELETE_PROMO_CODE,
	id: id
})

export const deleteGateWay = (id) => ({
	type: DELETE_GATEWAY,
	id: id
})

export const deleteDeduction = (id) => ({
	type: DELETE_DEDUCTION,
	id: id
})
