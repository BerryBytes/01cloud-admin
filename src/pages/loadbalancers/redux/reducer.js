import {
    GET_LB_LIST,
    GET_LB_LIST_FALIURE,
    GET_LB_LIST_SUCCESS,
    GET_LB_DATA,
    GET_LB_DATA_FALIURE,
    GET_LB_DATA_SUCCESS
} from './actions';

import initialState from './initialState';

const reducer = (state = initialState, payload ) => {
    switch(payload.type){
        case GET_LB_LIST:
            return {
                ...state,
                fetchingUsedLb: true
            }
        case GET_LB_LIST_SUCCESS:
            return {
                ...state,
                lbList : payload.data,
                fetchingUsedLb: false
            }
        case GET_LB_LIST_FALIURE:
            return {
                ...state,
                fetchingUsedLb: false
            }
        case GET_LB_DATA:
            return {
                ...state,
                fetchingLbData: true
            }
        case GET_LB_DATA_SUCCESS:
            return {
                ...state,
                lbData : payload.data,
                fetchingLbData: false
            }
        case GET_LB_DATA_FALIURE:
            return {
                ...state,
                fetchingLbData: false
            }
        default:
            return state
    }
}

export default reducer;