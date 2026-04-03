import {
  FETCH_REVENUE_DATA,
  FETCH_REVENUE_DATA_FAILURE,
  FETCH_REVENUE_DATA_SUCCESS,
  UPDATE_BREADCRUMB,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_REVENUE_DATA:
      return {
        ...state,
      };
    case FETCH_REVENUE_DATA_SUCCESS:
      return {
        ...state,
        dashboardData: payload.data,
      };
    case FETCH_REVENUE_DATA_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_BREADCRUMB:
      return {
        ...state,
        breadcrumbData: payload.data.payload,
      };
    default:
      return state;
  }
};

export default reducer;
