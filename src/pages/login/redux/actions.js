const PREFIX = '@Login'

export const LOGIN = `${PREFIX}/LOGIN`
export const GETPROFILE = `${PREFIX}/GETPROFILE`
export const LOGIN_SUCCESS = `${PREFIX}/LOGIN_SUCCESS`
export const LOGIN_FAILURE = `${PREFIX}/LOGIN_FAILURE`
export const LOGOUT = `${PREFIX}/LOGOUT`
export const LOGOUT_SUCCESS = `${PREFIX}/LOGOUT_SUCCESS`
export const LOGOUT_FAILURE = `${PREFIX}/LOGOUT_FAILURE`
export const FETCH_PROFILE_SUCCESS = `${PREFIX}/FETCH_PROFILE_SUCCESS`
export const LOGIN_OAUTH = `${PREFIX}/LOGIN_OAUTH`
export const RESEND_VERIFICATION_MAIL = `${PREFIX}/RESEND_VERIFICATION_MAIL`
export const LOGIN_AUTH0 = `${PREFIX}/LOGIN_AUTH0`

const login = (payload) => ({
    type: LOGIN,
    data: payload
})

const loginAuth0 = (history,cb) => ({
    type: LOGIN_AUTH0,
    data:{
        history,cb
    }
})

const loginOAuth = (payload, history) => ({
    type: LOGIN_OAUTH,
    data: { payload, history }
})

const fetchProfile = (payload) => ({
    type: GETPROFILE,
    data: payload
})

const logout = (cb) => ({
    type: LOGOUT,
    data: {cb}
})

const resendVerification = (payload) => ({
    type: RESEND_VERIFICATION_MAIL,
    data: payload
})

const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
})

export {
    login,
    loginAuth0,
    logout,
    fetchProfile,
    loginOAuth,
    logoutSuccess,
    resendVerification
}
