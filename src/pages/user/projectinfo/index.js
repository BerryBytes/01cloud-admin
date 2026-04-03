import ProjectInfo from "./ProjectInfo";

import {
  actions as UserProjectInfoActions,
  reducer as UserProjectInfoReducer,
  initialState as UserProjectInfoInitialState,
  Sagas as UserProjectInfoSaga,
} from "./redux";
export default ProjectInfo;

export {
  UserProjectInfoActions,
  UserProjectInfoInitialState,
  UserProjectInfoReducer,
  UserProjectInfoSaga,
};
