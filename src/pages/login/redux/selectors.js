export const hasValidSessionSelector = ({ AuthReducer }) => !!AuthReducer.token
export const sessionTokenSelector = ({ AuthReducer }) => AuthReducer.token