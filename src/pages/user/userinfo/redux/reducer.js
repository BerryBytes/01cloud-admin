import {
  FETCH_USER_INFO,
  FETCH_USER_INFO_SUCCESS,
  FETCH_USER_INFO_FAILURE,
  UPDATE_USER_ACTIVE_STATUS,
  UPDATE_USER_ACTIVE_STATUS_SUCCESS,
  UPDATE_USER_ACTIVE_STATUS_FAILURE,
  UPDATE_USER_ADMIN_STATUS,
  UPDATE_USER_ADMIN_STATUS_SUCCESS,
  UPDATE_USER_ADMIN_STATUS_FAILURE,
  FETCH_USER_PROJECTS,
  FETCH_USER_PROJECTS_SUCCESS,
  FETCH_USER_PROJECTS_FAILURE,
  
  ADD_USER_DISCOUNT,
  ADD_USER_DISCOUNT_FAILURE,
  ADD_USER_DISCOUNT_SUCCESS,
  UPDATE_USER_DISCOUNT,
  UPDATE_USER_DISCOUNT_SUCCESS,
  UPDATE_USER_DISCOUNT_FAILURE,
  GET_USER_DISCOUNT,
  GET_USER_DISCOUNT_FAILURE,
  GET_USER_DISCOUNT_SUCCESS,
  CLEAR_USER_DISCOUNT_DATA
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_USER_INFO:
      return {
        ...state,
      };
    case FETCH_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: payload.data,
      };
    case FETCH_USER_INFO_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case FETCH_USER_PROJECTS:
      return {
        ...state,
      };
    case FETCH_USER_PROJECTS_SUCCESS:
      return {
        ...state,
        userProjects: payload.data,
      };
    case FETCH_USER_PROJECTS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_USER_ACTIVE_STATUS:
      return {
        ...state,
      };
    case UPDATE_USER_ACTIVE_STATUS_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_USER_ACTIVE_STATUS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_USER_ADMIN_STATUS:
      return {
        ...state,
      };
    case UPDATE_USER_ADMIN_STATUS_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_USER_ADMIN_STATUS_FAILURE:
      return {
        ...state,
        error: payload.error,
      };
    
    case ADD_USER_DISCOUNT:
      return {
        ...state,
        addingUserDiscount: true
      };
    case ADD_USER_DISCOUNT_SUCCESS:
      return {
        ...state,
        addingUserDiscount: false
      };
    case ADD_USER_DISCOUNT_FAILURE:
      return {
        ...state,
        addingUserDiscount: false
      };
    case UPDATE_USER_DISCOUNT:
      return {
        ...state,
        updatingUserDiscount: true
      };
    case UPDATE_USER_DISCOUNT_SUCCESS:
      return {
        ...state,
        updatingUserDiscount: false
      };
    case UPDATE_USER_DISCOUNT_FAILURE:
      return {
        ...state,
        updatingUserDiscount: false
      };
    case GET_USER_DISCOUNT:
      return {
        ...state,
        fetchingUserDiscount: true
      }
    case GET_USER_DISCOUNT_FAILURE: {
      return {
        ...state,
        fetchingUserDiscount: false
      }
    }
    case GET_USER_DISCOUNT_SUCCESS:      
    return {
      ...state,
      userDiscount: payload.data,
      fetchingUserDiscount: false
    }
    case CLEAR_USER_DISCOUNT_DATA:
      return{
        ...state,
        userDiscount: initialState.userDiscount
      }

    default:
      return state;
  }
};

export default reducer;
