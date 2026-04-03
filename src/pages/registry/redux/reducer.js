import {
  GET_REGISTRIES,
  GET_REGISTRIES_SUCCESS,
  GET_REGISTRIES_FAILURE,
  GET_REGISTRY,
  GET_REGISTRY_SUCCESS,
  GET_REGISTRY_FAILURE,
  ADD_REGISTRY,
  ADD_REGISTRY_SUCCESS,
  ADD_REGISTRY_FAILURE,
  UPDATE_REGISTRY,
  UPDATE_REGISTRY_SUCCESS,
  UPDATE_REGISTRY_FAILURE,
  GET_REGISTRY_CONFIG,
  GET_REGISTRY_CONFIG_FAILURE,
  GET_REGISTRY_CONFIG_SUCCESS,
} from "./actions";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case GET_REGISTRIES:
      return {
        ...state,
        
      };
    case GET_REGISTRIES_SUCCESS:
      return {
        ...state,
        
        registrylist: payload.data,
      };
    case GET_REGISTRIES_FAILURE:
      return {
        ...state,
        
      };
    case GET_REGISTRY:
      return {
        ...state,
        
      };
    case GET_REGISTRY_SUCCESS:
      return {
        ...state,
        
        registryDetails: payload.data,
      };
    case GET_REGISTRY_FAILURE:
      return {
        ...state,
        
      };
    case ADD_REGISTRY:
      return {
        ...state,
        addingRegistry: true,
      };
    case ADD_REGISTRY_SUCCESS:
      return {
        ...state,
        addingRegistry: false,
      };
    case ADD_REGISTRY_FAILURE:
      return {
        ...state,
        addingRegistry: false,
      };
    case UPDATE_REGISTRY:
      return {
        ...state,
        updatingRegistry: true,
      };
    case UPDATE_REGISTRY_SUCCESS:
      return {
        ...state,
        updatingRegistry: false,
      };
    case UPDATE_REGISTRY_FAILURE:
      return {
        ...state,
        updatingRegistry: false,
      };

    case GET_REGISTRY_CONFIG:
      return {
        ...state,
        registryconfigLoading: true,
      };
    case GET_REGISTRY_CONFIG_SUCCESS:
      return {
        ...state,
        registryconfigLoading: false,
        registryConfig: payload.data,
      };
    case GET_REGISTRY_CONFIG_FAILURE:
      return {
        ...state,
        registryconfigLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
