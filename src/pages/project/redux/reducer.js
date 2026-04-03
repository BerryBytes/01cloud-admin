import { 
  FETCH_PROJECT_DETAIL,
  FETCH_PROJECT_DETAIL_SUCCESS,
  FETCH_PROJECT_APPLIST,
  FETCH_PROJECT_APPLIST_SUCCESS,
  UPDATE_BREADCRUMB,
  FETCH_PROJECT_ACTIVITIES_SUCCESS,
  FETCH_PROJECT_INSIGHT_SUCCESS
} from './actions';
import initialState from './initialState';

const reducer = (state = initialState, payload ) => {
  switch (payload.type) {
    case FETCH_PROJECT_DETAIL:
      return {
        ...state
      }
    case FETCH_PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        projectDetails : payload.data
    }
    case FETCH_PROJECT_APPLIST:
      return {
        ...state,
        projectDetails : payload.data
    }
    case FETCH_PROJECT_APPLIST_SUCCESS:
      return {
        ...state,
        appList : payload.data
    }
    case UPDATE_BREADCRUMB: 
      return {
        ...state,
        breadcrumbData : payload.data.payload
      }
    case FETCH_PROJECT_ACTIVITIES_SUCCESS:
      return {
        ...state,
        projectActivities : payload.data
    }
    case FETCH_PROJECT_INSIGHT_SUCCESS:
      return {
        ...state,
        projectInsights : payload.data
    }
    default:
      return state
  }
}

export default reducer