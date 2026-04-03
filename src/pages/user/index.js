import User from "./User";
import {
  actions as UserActions,
  reducer as UserReducer,
  initialState as UserInitialState,
  Sagas as UserSaga,
} from "./redux";

export default User;
export { UserActions, UserInitialState, UserReducer, UserSaga };
