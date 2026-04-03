const DNS_PREFIX = "@DNS";

export const GET_PROVIDER_CONFIG = `${DNS_PREFIX}/GET_PROVIDER_CONFIG`;
export const GET_PROVIDER_CONFIG_SUCCESS = `${DNS_PREFIX}/GET_PROVIDER_CONFIG_SUCCESS`;
export const GET_PROVIDER_CONFIG_FAILURE = `${DNS_PREFIX}/GET_PROVIDER_CONFIG_FAILURE`;

export const VALIDATE_DNS_PERMISSION = `${DNS_PREFIX}/VALIDATE_DNS_PERMISSION`;
export const VALIDATE_DNS_PERMISSION_SUCCESS = `${DNS_PREFIX}/VALIDATE_DNS_PERMISSION_SUCCESS`;
export const VALIDATE_DNS_PERMISSION_FAILURE = `${DNS_PREFIX}/VALIDATE_DNS_PERMISSION_FAILURE`;

export const CLEAR_DNS_VALIDATION = `${DNS_PREFIX}/CLEAR_DNS_VALIDATION`;

export const UPDATE_GCP_FILEPATH = `${DNS_PREFIX}/UPDATE_GCP_FILEPATH`;

export const GET_DNS_LIST = `${DNS_PREFIX}/GET_DNS_LIST`;
export const GET_DNS_LIST_SUCCESS = `${DNS_PREFIX}/GET_DNS_LIST_SUCCESS`;

export const CREATE_DNS = `${DNS_PREFIX}/CREATE_DNS`;
export const CREATE_DNS_SUCCESS = `${DNS_PREFIX}/CREATE_DNS_SUCCESS`;
export const CREATE_DNS_FAILURE = `${DNS_PREFIX}/CREATE_DNS_FAILURE`;

export const DELETE_DNS = `${DNS_PREFIX}/DELETE_DNS`;
export const DELETE_DNS_SUCCESS = `${DNS_PREFIX}/DELETE_DNS_SUCCESS`;
export const DELETE_DNS_FAILURE = `${DNS_PREFIX}/DELETE_DNS_FAILURE`;

export const UPDATE_DNS = `${DNS_PREFIX}/UPDATE_DNS`;
export const UPDATE_DNS_SUCCESS = `${DNS_PREFIX}/UPDATE_DNS_SUCCESS`;
export const UPDATE_DNS_FAILURE = `${DNS_PREFIX}/UPDATE_DNS_FAILURE`;

export const getProviderConfig = (provider) => ({
  type: GET_PROVIDER_CONFIG,
  data: { provider },
});

export const validateDnsPermission = (jsonBody, uploadBody) => ({
  type: VALIDATE_DNS_PERMISSION,
  data: { jsonBody, uploadBody },
});

export const clearDnsValidation = () => ({
  type: CLEAR_DNS_VALIDATION,
});

export const getDnsList = () => ({
  type: GET_DNS_LIST,
});

export const createDns = (jsonBody, uploadBody, callback) => ({
  type: CREATE_DNS,
  data: { jsonBody, uploadBody, callback },
});

export const deleteDns = (dnsId, callback) => ({
  type: DELETE_DNS,
  data: { dnsId, callback },
});

export const updateDns = (dnsId, jsonBody, uploadBody, callback) => ({
  type: UPDATE_DNS,
  data: { dnsId, jsonBody, uploadBody, callback },
});
