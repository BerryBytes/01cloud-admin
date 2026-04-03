import initialState from "./initialState";
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_BREADCRUMB,
  UPDATE_USER_QUOTA,
  UPDATE_USER_QUOTA_FAILURE,
  UPDATE_USER_QUOTA_SUCCESS,
  REINIT_USER_QOUTA,
} from "./actions";
import {getNewUserList} from './utils'

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_USERS:
      return {
        ...state,
        fetchingUser: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        userList: payload.data?.data ?? [],
        userCount: payload.data?.count,
        fetchingUser: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        error: payload.data?.error,
      };
    case UPDATE_BREADCRUMB: 
    return {
      ...state,
      breadcrumbData : payload.data.payload
    }

    case UPDATE_USER_QUOTA:
      return {
        ...state,
        isUpdatingUserQuota:true,
        userQuotaUpdated:false,
        userQuotaError:null,
      }
    
      case UPDATE_USER_QUOTA_SUCCESS:
        return {
          ...state,
          isUpdatingUserQuota:false,
          userQuotaUpdated:true,
          userList:getNewUserList(state.userList,payload.data),
          userQuotaError:null,
        }

    case UPDATE_USER_QUOTA_FAILURE:
        return {
          ...state,
          isUpdatingUserQuota:false,
          userQuotaUpdated:false,
          userQuotaError:payload.error,
      }
    case REINIT_USER_QOUTA:
      return {...state,
        isUpdatingUserQuota:false,
        userQuotaUpdated:false,
        userQuotaError:null,
      }
    default:
      return state;
  }
};

export default reducer;
