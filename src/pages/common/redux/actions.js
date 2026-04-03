const COMMON_PREFIX = '@COMMON';

export const UPLOAD_FILE = `${ COMMON_PREFIX }/UPLOAD_FILE`
export const UPLOAD_FILE_SUCCESS = `${ COMMON_PREFIX }/UPLOAD_FILE_SUCCESS`
export const UPLOAD_FILE_FAILURE = `${ COMMON_PREFIX }/UPLOAD_FILE_FAILURE`
export const UPLOAD_MULTIPLE_FILES = `${ COMMON_PREFIX }/UPLOAD_MULTIPLE_FILES`
export const UPDATE_NAV = `${ COMMON_PREFIX }/UPDATE_NAV`

// quota config type
export const FETCH_QUOTA_CONFIG=`${COMMON_PREFIX}/FETCH_QUOTA_CONFIG`;
export const FETCH_QUOTA_CONFIG_SUCCESS=`${COMMON_PREFIX}/FETCH_QUOTA_CONFIG_SUCCESS`;
export const FETCH_QUOTA_CONFIG_FAILURE=`${COMMON_PREFIX}/FETCH_QUOTA_CONFIG_FAILURE`;

// update quota config
export const UPDATE_QUOTA_CONFIG=`${COMMON_PREFIX}/UPDATE_QUOTA_CONFIG`;
export const UPDATE_QUOTA_CONFIG_SUCCESS=`${COMMON_PREFIX}/UPDATE_QUOTA_CONFIG_SUCCESS`;
export const UPDATE_QUOTA_CONFIG_FAILURE=`${COMMON_PREFIX}/UPDATE_QUOTA_CONFIG_FAILURE`;
export const CLEAR_QUOTA_CONFIG=`${COMMON_PREFIX}/CLEAR_QUOTA_CONFIG`;

const uploadFile = (formData, callBack) => ({
	type: UPLOAD_FILE,
	data: { formData, callBack }
})

const uploadMultipleFiles = (files, callBack) => ({
	type: UPLOAD_MULTIPLE_FILES,
	data: { files, callBack }
})

const updateNav = (navText, toLink) => ({
  type: UPDATE_NAV,
  data: { navText, toLink },
});

// config quota config actions
const fetchQuotaConfig=()=>({type:FETCH_QUOTA_CONFIG})

const fetchQuotaConfigSuccess=(data)=>({
	type:FETCH_QUOTA_CONFIG_SUCCESS,
	data

})

const fetchQuotaFailure=(fetchQuotaError)=>({
	type:FETCH_QUOTA_CONFIG_FAILURE,
	error:fetchQuotaError
})

// update quota config
const updateQuotaConfig=(configData)=>({
	type:UPDATE_QUOTA_CONFIG,
	data:configData
})
const updateQuotaConfigSuccess=(updatedQuotaConfig)=>({
	type:UPDATE_QUOTA_CONFIG_SUCCESS,
	data:updatedQuotaConfig,

})
const updateQuotaConfigFailure=(updateQuotaConfigError)=>({
	type:UPDATE_QUOTA_CONFIG_FAILURE,
	error:updateQuotaConfigError
})
export const clearQuotaConfig=()=>({
type:CLEAR_QUOTA_CONFIG
})

export {
	uploadFile,
	uploadMultipleFiles,
	updateNav,
	fetchQuotaConfig,
	fetchQuotaConfigSuccess,fetchQuotaFailure,
	updateQuotaConfig,updateQuotaConfigSuccess,updateQuotaConfigFailure
}