import Plugin from "./Plugin";
import {
  actions as PluginActions,
  reducer as PluginReducer,
  initialState as PluginInitialState,
  Sagas as PluginSaga,
} from "./redux";

export default Plugin;

export { PluginActions, PluginReducer, PluginInitialState, PluginSaga };
