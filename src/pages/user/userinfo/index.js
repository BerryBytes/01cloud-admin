import UserInfo from "./UserInfo";
import {
  actions as UserInfoActions,
  reducer as UserInfoReducer,
  initialState as UserInfoInitialState,
  Sagas as UserInfoSaga,
} from "./redux";
export default UserInfo;

export { UserInfoActions, UserInfoInitialState, UserInfoReducer, UserInfoSaga };
