import {
  FETCH_PROJECT_APPS,
  FETCH_PROJECT_APPS_SUCCESS,
  FETCH_PROJECT_APPS_FAILURE,
  FETCH_PROJECT_INFO,
  FETCH_PROJECT_INFO_SUCCESS,
  FETCH_PROJECT_INFO_FAILURE,
  FETCH_PROJECT_INSIGHTS,
  FETCH_PROJECT_INSIGHTS_SUCCESS,
  FETCH_PROJECT_INSIGHTS_FAILURE,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_PROJECT_APPS:
      return {
        ...state,
      };
    case FETCH_PROJECT_APPS_SUCCESS:
      return {
        ...state,
        projectApps: payload.data,
      };
    case FETCH_PROJECT_APPS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_PROJECT_INFO:
      return {
        ...state,
      };
    case FETCH_PROJECT_INFO_SUCCESS:
      return {
        ...state,
        projectInfo: payload.data,
      };
    case FETCH_PROJECT_INFO_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_PROJECT_INSIGHTS:
      return {
        ...state,
      };
    case FETCH_PROJECT_INSIGHTS_SUCCESS:
      return {
        ...state,
        projectInsight: payload.data,
      };
    case FETCH_PROJECT_INSIGHTS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
};

export default reducer;
