import {
  UPDATE_GCP_FILEPATH,
  GET_PROVIDER_CONFIG,
  GET_PROVIDER_CONFIG_SUCCESS,
  GET_PROVIDER_CONFIG_FAILURE,
  VALIDATE_DNS_PERMISSION,
  VALIDATE_DNS_PERMISSION_SUCCESS,
  VALIDATE_DNS_PERMISSION_FAILURE,
  CLEAR_DNS_VALIDATION,
  GET_DNS_LIST_SUCCESS,
  CREATE_DNS,
  CREATE_DNS_SUCCESS,
  CREATE_DNS_FAILURE,
  DELETE_DNS,
  DELETE_DNS_SUCCESS,
  DELETE_DNS_FAILURE,
  UPDATE_DNS,
  UPDATE_DNS_SUCCESS,
  UPDATE_DNS_FAILURE,
} from "./actions";

import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case VALIDATE_DNS_PERMISSION:
      return {
        ...state,
        isValidatingDnsPermission: true,
        validationDnsData: null,
      };
    case VALIDATE_DNS_PERMISSION_SUCCESS:
      return {
        ...state,
        isValidatingDnsPermission: false,
        validationDnsData: payload.data,
      };
    case VALIDATE_DNS_PERMISSION_FAILURE:
      return {
        ...state,
        isValidatingDnsPermission: false,
      };
    case CLEAR_DNS_VALIDATION:
      return {
        ...state,
        validationDnsData: null,
      };
    case UPDATE_GCP_FILEPATH: {
      return {
        ...state,
        gcpFilePath: payload.data,
      };
    }
    case GET_PROVIDER_CONFIG: {
      return {
        ...state,
        fetchingProviderConfig: true,
      };
    }
    case GET_PROVIDER_CONFIG_SUCCESS: {
      return {
        ...state,
        providerConfig: payload.data,
        fetchingProviderConfig: false,
      };
    }
    case GET_PROVIDER_CONFIG_FAILURE: {
      return {
        ...state,
        fetchingProviderConfig: false,
      };
    }
    case GET_DNS_LIST_SUCCESS:
      return {
        ...state,
        dnsList: payload.data,
      };
      case CREATE_DNS:
      return {
        ...state,
        creatingDns: true
      }
    case CREATE_DNS_SUCCESS:
      return {
        ...state,
        creatingDns: false
      }
    case CREATE_DNS_FAILURE:
      return {
        ...state,
        creatingDns: false
      }
      case DELETE_DNS:
      return {
        ...state,
        deletingDns: true
      }
    case DELETE_DNS_SUCCESS:
      return {
        ...state,
        deletingDns: false
      }
    case DELETE_DNS_FAILURE:
      return {
        ...state,
        deletingDns: false
      }
      case UPDATE_DNS:
      return {
        ...state,
        updatingDns: true
      }
    case UPDATE_DNS_SUCCESS:
      return {
        ...state,
        updatingDns: false
      }
    case UPDATE_DNS_FAILURE:
      return {
        ...state,
        updatingDns: false
      }
    default:
      return state;
  }
  
};

export default reducer;
