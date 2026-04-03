import {
  GET_OPERATORS,
  GET_OPERATORS_SUCCESS,
  GET_OPERATORS_FAILURE,
  UPDATE_OPERATOR_STATUS,
  UPDATE_OPERATOR_STATUS_SUCCESS,
  UPDATE_OPERATOR_STATUS_FAILURE,
  SYNC_OPERATOR,
  SYNC_OPERATOR_SUCCESS,
  SYNC_OPERATOR_FAILURE,
  FETCH_OPERATOR_DETAILS,
  FETCH_OPERATOR_DETAILS_SUCCESS,
  FETCH_OPERATOR_DETAILS_FAILURE,
  CLEAR_OPERATOR_DETAILS,
  UPDATE_OPERATOR_DETAILS,
  UPDATE_OPERATOR_DETAILS_SUCCESS,
  UPDATE_OPERATOR_DETAILS_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_OPERATORS:
      return {
        ...state,
        fetchingOperators: true,
      };
    case GET_OPERATORS_SUCCESS:
      return {
        ...state,
        operators: payload.data.data,
        operatorsCount: payload.data.total,
        fetchingOperators: false,
      };
    case GET_OPERATORS_FAILURE:
      return {
        ...state,
        fetchingOperators: false,
      };
    case UPDATE_OPERATOR_STATUS:
      return {
        ...state,
        updatingOperatorStatus: true,
      };
    case UPDATE_OPERATOR_STATUS_SUCCESS:
      return {
        ...state,
        updatingOperatorStatus: false,
      };
    case UPDATE_OPERATOR_STATUS_FAILURE:
      return {
        ...state,
        updatingOperatorStatus: false,
      };
    case SYNC_OPERATOR:
      return {
        ...state,
        syncingOperator: true,
      };
    case SYNC_OPERATOR_SUCCESS:
      return {
        ...state,
        syncingOperator: false,
      };
    case SYNC_OPERATOR_FAILURE:
      return {
        ...state,
        syncingOperator: false,
      };
    case FETCH_OPERATOR_DETAILS:
      return {
        ...state,
        fetchingOperatorDetails: true,
      };
    case FETCH_OPERATOR_DETAILS_SUCCESS:
      return {
        ...state,
        operatorDetails: payload.data,
        fetchingOperatorDetails: false,
      };
    case FETCH_OPERATOR_DETAILS_FAILURE:
      return {
        ...state,
        fetchingOperatorDetails: false,
      };
    case CLEAR_OPERATOR_DETAILS:
      return {
        ...state,
        operatorDetails: initialState.operatorDetails,
      };
    case UPDATE_OPERATOR_DETAILS:
      return {
        ...state,
        updatingOperatorDetails: true,
      };
    case UPDATE_OPERATOR_DETAILS_SUCCESS:
      return {
        ...state,
        updatingOperatorDetails: false,
      };
    case UPDATE_OPERATOR_DETAILS_FAILURE:
      return {
        ...state,
        updatingOperatorDetails: false,
      };
    default:
      return state;
  }
};

export default reducer;
