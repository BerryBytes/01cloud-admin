import { combineReducers } from "redux";
import AuthReducer from "../../pages/login/redux/reducer";

import { reducer as ProjectReducer } from "../../pages/project/redux";

import { LOGOUT_SUCCESS } from "../../pages/login/redux/actions";
import { reducer as SubscriptionReducer } from "../../pages/subscription/redux";
import { UserReducer } from "../../pages/user";
import { ResourceReducer } from "../../pages/resource";
import { reducer as PluginReducer } from "../../pages/plugin/redux";
import { reducer as CreatePluginReducer } from "../../pages/plugin/createplugin/redux";
import { reducer as VersionReducer } from "../../pages/plugin/version/redux";
import { reducer as ClusterReducer } from "../../pages/clusters/redux";
import { reducer as PluginInfoReducer } from "../../pages/plugin/plugininfo/redux";
import { reducer as UserInfoReducer } from "../../pages/user/userinfo/redux";
import { reducer as EnvironmentInfoReducer } from "../../pages/environment/environmentInfo/redux";
import { CreateResourceReducer } from "../../pages/resource/createresource";
import { reducer as CreateClusterReducer } from "../../pages/cluster/createcluster/redux";
import { reducer as UserProjectInfoReducer } from "../../pages/user/projectinfo/redux";
import { CreateSubscriptionReducer } from "../../pages/subscription/createsubscription";
import { DashboardReducer } from "../../pages/dashboard";
import { reducer as InvitationReducer } from "../../pages/invitation/redux";
import { reducer as SupportReducer } from "../../pages/support/redux";
import { reducer as CommonReducer } from '../../pages/common/redux';
import { reducer as RegistryReducer } from '../../pages/registry/redux';
import { reducer as LbReducer } from '../../pages/loadbalancers/redux';
import { reducer as DnsReducer } from "../../pages/dns/redux"
import { reducer as BillingReducer } from "../../pages/billing/redux"
import { reducer as OrganizationReducer } from "../../pages/organization/redux"
import { reducer as OperatorsReducer } from "../../pages/operators/redux";
import { SettingsReducer } from "../../pages/settings";

const rootReducer = combineReducers({
  AuthReducer,
  SubscriptionReducer,
  ClusterReducer,
  ProjectReducer,
  
  UserReducer,
  ResourceReducer,
  PluginReducer,
  CreatePluginReducer,
  PluginInfoReducer,
  UserInfoReducer,
  CreateResourceReducer,
  CreateClusterReducer,
  UserProjectInfoReducer,
  CreateSubscriptionReducer,
  VersionReducer,
  DashboardReducer,
  EnvironmentInfoReducer,
  InvitationReducer,
  SupportReducer,
  CommonReducer,
  LbReducer,
  DnsReducer,
  RegistryReducer,
  BillingReducer,
  OrganizationReducer,
  OperatorsReducer,
  SettingsReducer,
});

export default (state, action) =>
  rootReducer(action.type === LOGOUT_SUCCESS ? undefined : state, action);
