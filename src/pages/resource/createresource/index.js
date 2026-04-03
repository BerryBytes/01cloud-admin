import CreateResource from "./CreateResource.js";
import {
  actions as CreateResourceActions,
  reducer as CreateResourceReducer,
  initialState as CreateResourceInitialState,
  sagas as CreateResourceSaga,
} from "./redux";

export default CreateResource;
export {
  CreateResourceActions,
  CreateResourceInitialState,
  CreateResourceReducer,
  CreateResourceSaga,
};
