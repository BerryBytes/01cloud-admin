import Login from './Login'
import {
    actions as LoginActions,
    initialState as LoginInitialState,
    reducer as LoginReducer,
    Sagas as LoginSaga,
} from './redux'

export default Login
export {
    LoginActions,
    LoginInitialState,
    LoginReducer,
    LoginSaga
}