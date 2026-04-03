import {
  GET_INVITATION_LIST_SUCCESS,
  ADD_INVITATION,
  ADD_INVITATION_SUCCESS,
  ADD_INVITATION_FAILURE

  } from './actions'
import initialState from './initialState'
  
  const invite = (state = initialState, action) => {
    switch (action.type) {
      case GET_INVITATION_LIST_SUCCESS:
        return { 
          ...state, 
          invitationList: action.data
        }
      case ADD_INVITATION:
        return {
          ...state,
          executingAddInvitation: true,
          addInvitationCallSuccess: false
        }
      case ADD_INVITATION_SUCCESS:
        return {
          ...state,
          executingAddInvitation: false,
          addInvitationCallSuccess: true
        }
      case ADD_INVITATION_FAILURE:
        return {
          ...state,
          executingAddInvitation: false,
          addInvitationCallSuccess: false
        }
      default:
        return state
    }
  }
  
  export default invite
