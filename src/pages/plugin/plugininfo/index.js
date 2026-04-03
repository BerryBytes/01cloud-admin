import PluginInfo from "./PluginInfo";
import {
  actions as PluginInfoActions,
  reducer as PluginInfoReducer,
  initialState as PluginInfoInitialState,
  Sagas as PluginInfoSaga,
} from "./redux";
export default PluginInfo;

export {
  PluginInfoActions,
  PluginInfoInitialState,
  PluginInfoReducer,
  PluginInfoSaga,
};
