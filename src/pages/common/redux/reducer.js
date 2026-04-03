import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_MULTIPLE_FILES,
  UPDATE_NAV,
  
  FETCH_QUOTA_CONFIG,
  FETCH_QUOTA_CONFIG_SUCCESS,
  FETCH_QUOTA_CONFIG_FAILURE,
  CLEAR_QUOTA_CONFIG,
  UPDATE_QUOTA_CONFIG,
  UPDATE_QUOTA_CONFIG_SUCCESS,
  UPDATE_QUOTA_CONFIG_FAILURE,
} from "./actions";
  import initialState from './initialState';
  
  const reducer = (state = initialState, payload ) => {
    switch (payload.type) {
      case UPLOAD_FILE:
        return {
          ...state,
          uploadingFile: true,
        };
      case UPLOAD_MULTIPLE_FILES:
        return {
          ...state,
          uploadingFile: true,
        };
      case UPLOAD_FILE_SUCCESS:
        return {
          ...state,
          uploadingFile: false,
        };
      case UPLOAD_FILE_FAILURE:
        return {
          ...state,
          uploadingFile: false,
        };
      case UPDATE_NAV:
        return {
          ...state,
          nav: {
            navText: payload.data.navText,
            toLink: payload.data.toLink,
          },
        };
      
      case FETCH_QUOTA_CONFIG:
        return {
          ...state,
          fetchingQuotaConfig: true,
          quotaConfig: null,
          quotaConfigError: null,
        };

      case FETCH_QUOTA_CONFIG_SUCCESS:
        return {
          ...state,
          fetchingQuotaConfig: false,
          quotaConfig: payload.data,
          quotaConfigError: null,
        };

      case FETCH_QUOTA_CONFIG_FAILURE:
        return {
          ...state,
          fetchingQuotaConfig: false,
          quotaConfig: null,
          quotaConfigError: payload.error,
        };
      
      case UPDATE_QUOTA_CONFIG:
        return {
          ...state,
          isUpdatingQuataConfig: true,

          updateQuotaConfigError: null,
        };
      case UPDATE_QUOTA_CONFIG_SUCCESS:
        return {
          ...state,
          isUpdatingQuataConfig: false,
          
          quotaConfig: payload.data,
          updateQuotaConfigError: null,
        };
      case UPDATE_QUOTA_CONFIG_FAILURE:
        return {
          ...state,
          isUpdatingQuataConfig: false,
          updateQuotaConfigError: payload.error,
        };

      case CLEAR_QUOTA_CONFIG: {
        return {
          ...state,
          fetchingQuotaConfig: false,
          quotaConfig: null,
          quotaConfigError: null,
          isUpdatingQuataConfig:false,
          updateQuotaConfigError:null,
        };
      }
      default:
        return state;
    }
  }
  
  export default reducer