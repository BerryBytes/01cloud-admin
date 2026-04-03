import Settings from "./Settings";
import {
  actions as SettingsActions,
  reducer as SettingsReducer,
  initialState as SettingsInitialState,
  Sagas as SettingsSaga,
} from "./redux";

export default Settings;
export { SettingsActions,SettingsReducer, SettingsInitialState, SettingsSaga };