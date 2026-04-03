const PLUGIN_INFO_PREFIX = "@PLUGIN_INFO";

export const FETCH_PLUGIN_VERSION = `${PLUGIN_INFO_PREFIX}/FETCH_PLUGIN_VERSION`;
export const FETCH_PLUGIN_VERSION_SUCCESS = `${PLUGIN_INFO_PREFIX}/FETCH_PLUGIN_VERSION_SUCCESS`;
export const FETCH_PLUGIN_VERSION_FAILURE = `${PLUGIN_INFO_PREFIX}/FETCH_PLUGIN_VERSION_FAILURE`;

export const FETCH_PLUGIN_INFO = `${PLUGIN_INFO_PREFIX}/FETCH_PLUGIN_INFO`;
export const FETCH_PLUGIN_INFO_SUCCESS = `${PLUGIN_INFO_PREFIX}/FETCH_PLUGIN_INFO_SUCCESS`;
export const FETCH_PLUGIN_INFO_FAILURE = `${PLUGIN_INFO_PREFIX}/FETCH_PLUGIN_INFO_FAILURE`;

const fetchPluginVersion = (pluginId) => {
  return {
    type: FETCH_PLUGIN_VERSION,
    id: pluginId,
  };
};

const fetchPluginInfo = (pluginId) => {
  return {
    type: FETCH_PLUGIN_INFO,
    id: pluginId,
  };
};

export { fetchPluginVersion, fetchPluginInfo };
