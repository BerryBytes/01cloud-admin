import EnvironmentInfo from "./EnvironmentInfo";

import {
  actions as EnvironmentInfoActions,
  reducer as EnvironmentInfoReducer,
  initialState as EnvironmentInfoInitialState,
  Sagas as EnvironmentInfoSaga,
} from "./redux";
export default EnvironmentInfo;

export {
  EnvironmentInfoActions,
  EnvironmentInfoInitialState,
  EnvironmentInfoReducer,
  EnvironmentInfoSaga,
};
