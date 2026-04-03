const PREFIX = "@REGISTRY";

export const GET_REGISTRIES = `${PREFIX}/GET_REGISTRIES`;
export const GET_REGISTRIES_SUCCESS = `${PREFIX}/GET_REGISTRIES_SUCCESS`;
export const GET_REGISTRIES_FAILURE = `${PREFIX}/GET_REGISTRIES_FAILURE`;

export const GET_REGISTRY = `${PREFIX}/GET_REGISTRY`;
export const GET_REGISTRY_SUCCESS = `${PREFIX}/GET_REGISTRY_SUCCESS`;
export const GET_REGISTRY_FAILURE = `${PREFIX}/GET_REGISTRY_FAILURE`;

export const ADD_REGISTRY = `${PREFIX}/ADD_REGISTRY`;
export const ADD_REGISTRY_SUCCESS = `${PREFIX}/ADD_REGISTRY_SUCCESS`;
export const ADD_REGISTRY_FAILURE = `${PREFIX}/ADD_REGISTRY_FAILURE`;

export const UPDATE_REGISTRY = `${PREFIX}/UPDATE_REGISTRY`;
export const UPDATE_REGISTRY_SUCCESS = `${PREFIX}/UPDATE_REGISTRY_SUCCESS`;
export const UPDATE_REGISTRY_FAILURE = `${PREFIX}/UPDATE_REGISTRY_FAILURE`;

export const DELETE_REGISTRY = `${PREFIX}/DELETE_REGISTRY`;
export const DELETE_REGISTRY_SUCCESS = `${PREFIX}/DELETE_REGISTRY_SUCCESS`;
export const DELETE_REGISTRY_FAILURE = `${PREFIX}/DELETE_REGISTRY_FAILURE`;

export const GET_REGISTRY_CONFIG = `${PREFIX}/GET_REGISTRY_CONFIG`;
export const GET_REGISTRY_CONFIG_SUCCESS = `${PREFIX}/GET_REGISTRY_CONFIG_SUCCESS`;
export const GET_REGISTRY_CONFIG_FAILURE = `${PREFIX}/GET_REGISTRY_CONFIG_FAILURE`;

export const getRegistryConfig = () => ({
  type: GET_REGISTRY_CONFIG,
});

export const getRegistries = () => ({
  type: GET_REGISTRIES,
});

export const getRegistry = (id) => ({
  type: GET_REGISTRY,
  data: { id },
});

export const addRegistry = (jsonBody, callback) => ({
  type: ADD_REGISTRY,
  data: { jsonBody, callback },
});

export const updateRegistry = (id, jsonBody, callback) => ({
  type: UPDATE_REGISTRY,
  data: { id, jsonBody, callback },
});

export const deleteRegistry = (id) => ({
  type: DELETE_REGISTRY,
  data: { id },
});
