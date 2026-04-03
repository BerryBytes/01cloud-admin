const PREFIX = '@Invitation'

export const GET_INVITATION_LIST = `${PREFIX}/GET_INVITATION_LIST`
export const GET_INVITATION_LIST_SUCCESS = `${PREFIX}/GET_INVITATION_LIST_SUCCESS`
export const GET_INVITATION_LIST_FAILURE = `${PREFIX}/GET_INVITATION_LIST_FAILURE`

export const APPROVE_INVITATION = `${PREFIX}/APPROVE_INVITATION`
export const APPROVE_INVITATION_SUCCESS = `${PREFIX}/APPROVE_INVITATION_SUCCESS`
export const APPROVE_INVITATION_FAILURE = `${PREFIX}/APPROVE_INVITATION_FAILURE`

export const ADD_INVITATION = `${PREFIX}/ADD_INVITATION`
export const ADD_INVITATION_SUCCESS = `${PREFIX}/ADD_INVITATION_SUCCESS`
export const ADD_INVITATION_FAILURE = `${PREFIX}/ADD_INVITATION_FAILURE`

export const DELETE_INVITATION = `${PREFIX}/DELETE_INVITATION`
export const RESEND_EMAIL = `${PREFIX}/RESEND_EMAIL`

export const fetchInvitationList = () => ({
    type: GET_INVITATION_LIST
})

export const approveInvitation = (id) => ({
    type: APPROVE_INVITATION,
    data: { id }
})

export const addInvitation = (jsonBody) => ({
    type: ADD_INVITATION,
    data: { jsonBody }
})

export const deleteInvitation = (id) => ({
    type: DELETE_INVITATION,
    data: { id }
})

export const emailResend = (id) => ({
    type: RESEND_EMAIL,
    data: { id }
})