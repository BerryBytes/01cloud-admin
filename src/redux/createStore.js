import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducers/index";
import { LoginSaga } from "../pages/login";
import { SubscriptionSaga } from "../pages/subscription";
import { UserSaga } from "../pages/user";
import { Sagas as ClusterSaga } from "../pages/clusters/redux";

import { Sagas as ProjectSaga } from "../pages/project/redux";

import { ResourceSaga } from "../pages/resource";
import { PluginSaga } from "../pages/plugin";
import { CreatePluginSaga } from "../pages/plugin/createplugin";
import { VersionSaga } from "../pages/plugin/version";
import { PluginInfoSaga } from "../pages/plugin/plugininfo";
import { UserInfoSaga } from "../pages/user/userinfo";
import { CreateResourceSaga } from "../pages/resource/createresource";
import { CreateClusterSaga } from "../pages/cluster/createcluster";
import { DashboardSaga } from "../pages/dashboard";
import { UserProjectInfoSaga } from "../pages/user/projectinfo";
import { CreateSubscriptionSaga } from "../pages/subscription/createsubscription";
import { EnvironmentInfoSaga } from "../pages/environment/environmentInfo";
import { Sagas as InvitationSaga } from "../pages/invitation/redux";
import { Sagas as SupportSaga} from "../pages/support/redux";
import { Sagas as CommonSaga } from '../pages/common/redux';
import { Sagas as RegistrySaga } from '../pages/registry/redux';
import { Sagas as LbSaga } from '../pages/loadbalancers/redux';
import { Sagas as DnsSaga } from "../pages/dns/redux";
import { Sagas as BillingSaga } from "../pages/billing/redux"
import { Sagas as OrganizationSaga } from "../pages/organization/redux"
import { Sagas as OperatorsSaga } from "../pages/operators/redux";
import {SettingsSaga} from "../pages/settings";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["AuthReducer", "CommonReducer"],
};

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = createStore(persistedReducer, enhancer);

  const persistor = persistStore(store);

  sagaMiddleware.run(LoginSaga);
  sagaMiddleware.run(SubscriptionSaga);
  sagaMiddleware.run(UserSaga);
  sagaMiddleware.run(ResourceSaga);
  sagaMiddleware.run(PluginSaga);
  sagaMiddleware.run(CreatePluginSaga);
  sagaMiddleware.run(PluginInfoSaga);
  sagaMiddleware.run(UserInfoSaga);
  sagaMiddleware.run(ClusterSaga);
  sagaMiddleware.run(ProjectSaga);
  
  sagaMiddleware.run(CreateResourceSaga);
  sagaMiddleware.run(CreateClusterSaga);
  sagaMiddleware.run(UserProjectInfoSaga);
  sagaMiddleware.run(CreateSubscriptionSaga);
  sagaMiddleware.run(VersionSaga);
  sagaMiddleware.run(DashboardSaga);
  sagaMiddleware.run(EnvironmentInfoSaga);
  sagaMiddleware.run(InvitationSaga);
  sagaMiddleware.run(SupportSaga);
  sagaMiddleware.run(CommonSaga);
  sagaMiddleware.run(RegistrySaga);
  sagaMiddleware.run(LbSaga);
  sagaMiddleware.run(DnsSaga);
  sagaMiddleware.run(BillingSaga);
  sagaMiddleware.run(OrganizationSaga);
  sagaMiddleware.run(OperatorsSaga);
  sagaMiddleware.run(SettingsSaga);
  return { store, persistor };
};
