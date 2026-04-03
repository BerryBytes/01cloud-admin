import {
    LOGIN,
    LOGIN_SUCCESS,
    FETCH_PROFILE_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
  } from './actions'
import initialState from './initialState'
  
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        return state
      case LOGIN_SUCCESS:
        return { 
          ...state, 
          ...action.data
        }
      case FETCH_PROFILE_SUCCESS : 
        return {...state , user: action.data}
      case LOGIN_FAILURE:
        return { ...state, ...action.data, sessionToken: initialState.sessionToken }
      case LOGOUT:
        return initialState
      default:
        return state
    }
  }
  
  export default auth
