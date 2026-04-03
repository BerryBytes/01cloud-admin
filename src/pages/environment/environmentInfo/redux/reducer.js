import {
  FETCH_ENVIRONMENT_DETAIL,
  FETCH_ENVIRONMENT_DETAIL_SUCCESS,
  FETCH_ENVIRONMENT_DETAIL_FAILURE,
  FETCH_ENVIRONMENT_INSIGHT,
  FETCH_ENVIRONMENT_INSIGHT_SUCCESS,
  FETCH_ENVIRONMENT_INSIGHT_FAILURE,
  FETCH_ENV_STATE_SUCCESS,
  UPDATE_BREADCRUMB,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_ENVIRONMENT_DETAIL:
      return {
        ...state,
      };
    case FETCH_ENVIRONMENT_DETAIL_SUCCESS:
      return {
        ...state,
        environmentDetails: payload.data.environment,
        environmentMetadata: payload.data.metadata,
        isDataNotFound: false,
      };
    case FETCH_ENVIRONMENT_DETAIL_FAILURE:
      return {
        ...state,
        isDataNotFound: true,
      };
    case FETCH_ENVIRONMENT_INSIGHT:
      return {
        ...state,
      };
    case FETCH_ENVIRONMENT_INSIGHT_SUCCESS:
      return {
        ...state,
        environmentInsights: payload.data,
      };
    case FETCH_ENVIRONMENT_INSIGHT_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_ENV_STATE_SUCCESS:
      return {
        ...state,
        environmentState: payload.data,
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
