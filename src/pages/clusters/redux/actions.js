const CLUSTER_PREFIX = "@CLUSTER";

export const CREATE_CLUSTER = `${ CLUSTER_PREFIX }/CREATE_CLUSTER`
export const CREATE_CLUSTER_SUCCESS = `${ CLUSTER_PREFIX }/CREATE_CLUSTER_SUCCESS`
export const CREATE_CLUSTER_FAILURE = `${ CLUSTER_PREFIX }/CREATE_CLUSTER_FAILURE`

export const UPDATE_CLUSTER = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER`
export const UPDATE_CLUSTER_SUCCESS = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_SUCCESS`
export const UPDATE_CLUSTER_FAILURE = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_FAILURE`

export const VALIDATE_PERMISSION = `${ CLUSTER_PREFIX }/VALIDATE_PERMISSION`
export const VALIDATE_PERMISSION_SUCCESS = `${ CLUSTER_PREFIX }/VALIDATE_PERMISSION_SUCCESS`
export const VALIDATE_PERMISSION_FAILURE = `${ CLUSTER_PREFIX }/VALIDATE_PERMISSION_FAILURE`

export const GET_CLUSTER_LIST = `${ CLUSTER_PREFIX }/GET_CLUSTER_LIST`
export const GET_CLUSTER_LIST_SUCCESS = `${ CLUSTER_PREFIX }/GET_CLUSTER_LIST_SUCCESS`
export const GET_CLUSTER_LIST_FAILURE = `${ CLUSTER_PREFIX }/GET_CLUSTER_LIST_FAILURE`

export const GET_CLUSTER_DETAILS = `${ CLUSTER_PREFIX }/GET_CLUSTER_DETAILS`
export const GET_CLUSTER_DETAILS_SUCCESS = `${ CLUSTER_PREFIX }/GET_CLUSTER_DETAILS_SUCCESS`
export const GET_CLUSTER_DETAILS_FAILURE = `${ CLUSTER_PREFIX }/GET_CLUSTER_DETAILS_FAILURE`

export const DELETE_CLUSTER = `${ CLUSTER_PREFIX }/DELETE_CLUSTER`
export const DELETE_CLUSTER_SUCCESS = `${ CLUSTER_PREFIX }/DELETE_CLUSTER_SUCCESS`
export const DELETE_CLUSTER_FAILURE = `${ CLUSTER_PREFIX }/DELETE_CLUSTER_FAILURE`

export const DESTROY_CLUSTER = `${ CLUSTER_PREFIX }/DESTROY_CLUSTER`
export const DESTROY_CLUSTER_SUCCESS = `${ CLUSTER_PREFIX }/DESTROY_CLUSTER_SUCCESS`
export const DESTROY_CLUSTER_FAILURE = `${ CLUSTER_PREFIX }/DESTROY_CLUSTER_FAILURE`

export const APPLY_TERRAFORM = `${ CLUSTER_PREFIX }/APPLY_TERRAFORM`
export const APPLY_TERRAFORM_SUCCESS = `${ CLUSTER_PREFIX }/APPLY_TERRAFORM_SUCCESS`
export const APPLY_TERRAFORM_FAILURE = `${ CLUSTER_PREFIX }/APPLY_TERRAFORM_FAILURE`

export const CANCEL_WORKFLOW = `${ CLUSTER_PREFIX }/CANCEL_WORKFLOW`
export const CANCEL_WORKFLOW_SUCCESS = `${ CLUSTER_PREFIX }/CANCEL_WORKFLOW_SUCCESS`
export const CANCEL_WORKFLOW_FAILURE = `${ CLUSTER_PREFIX }/CANCEL_WORKFLOW_FAILURE`

export const GET_WORKFLOWS = `${ CLUSTER_PREFIX }/GET_WORKFLOWS`
export const GET_WORKFLOWS_SUCCESS = `${ CLUSTER_PREFIX }/GET_WORKFLOWS_SUCCESS`
export const GET_WORKFLOWS_FAILURE = `${ CLUSTER_PREFIX }/GET_WORKFLOWS_FAILURE`
export const GET_MORE_WORKFLOWS_SUCCESS = `${ CLUSTER_PREFIX }/GET_MORE_WORKFLOWS_SUCCESS`

export const GET_WORKFLOW_LOG = `${ CLUSTER_PREFIX }/GET_WORKFLOW_LOG`
export const GET_WORKFLOW_LOG_SUCCESS = `${ CLUSTER_PREFIX }/GET_WORKFLOW_LOG_SUCCESS`
export const GET_WORKFLOW_LOG_FAILURE = `${ CLUSTER_PREFIX }/GET_WORKFLOW_LOG_FAILURE`

export const UPDATE_CLUSTER_WORKFLOWS = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_WORKFLOWS`
export const UPDATE_CLUSTER_WORKFLOW_LOG = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_WORKFLOW_LOG`
export const CLEAR_CLUSTER_WORKFLOWS = `${ CLUSTER_PREFIX }/CLEAR_CLUSTER_WORKFLOWS`

export const CLEAR_NEW_CLUSTER_DATA = `${ CLUSTER_PREFIX }/CLEAR_NEW_CLUSTER_DATA`
export const CLEAR_CLUSTER_INFO = `${ CLUSTER_PREFIX }/CLEAR_CLUSTER_INFO`
export const CLEAR_CREATE_CLUSTER =  `${ CLUSTER_PREFIX }/CLEAR_CREATE_CLUSTER`

export const UPDATE_GCP_FILEPATH = `${ CLUSTER_PREFIX }/UPDATE_GCP_FILEPATH`

export const EXPORT_WORKFLOW = `${ CLUSTER_PREFIX }/EXPORT_WORKFLOW`
export const EXPORT_WORKFLOW_SUCCESS = `${ CLUSTER_PREFIX }/EXPORT_WORKFLOW_SUCCESS`
export const EXPORT_WORKFLOW_FAILURE = `${ CLUSTER_PREFIX }/EXPORT_WORKFLOW_FAILURE`
export const CLEAR_EXPORT_WORKFLOW = `${ CLUSTER_PREFIX }/CLEAR_EXPORT_WORKFLOW`

export const GET_PROVIDER_CONFIG =  `${ CLUSTER_PREFIX }/GET_PROVIDER_CONFIG`
export const GET_PROVIDER_CONFIG_SUCCESS =  `${ CLUSTER_PREFIX }/GET_PROVIDER_CONFIG_SUCCESS`
export const GET_PROVIDER_CONFIG_FAILURE =  `${ CLUSTER_PREFIX }/GET_PROVIDER_CONFIG_FAILURE`

export const GET_CLUSTER_PACKAGE =  `${ CLUSTER_PREFIX }/GET_CLUSTER_PACKAGE`
export const GET_CLUSTER_PACKAGE_SUCCESS =  `${ CLUSTER_PREFIX }/GET_CLUSTER_PACKAGE_SUCCESS`
export const GET_CLUSTER_PACKAGE_FAILURE =  `${ CLUSTER_PREFIX }/GET_CLUSTER_PACKAGE_FAILURE`

export const GET_PACKAGE_STATUS =  `${ CLUSTER_PREFIX }/GET_PACKAGE_STATUS`
export const GET_PACKAGE_STATUS_SUCCESS =  `${ CLUSTER_PREFIX }/GET_PACKAGE_STATUS_SUCCESS`
export const GET_PACKAGE_STATUS_FAILURE =  `${ CLUSTER_PREFIX }/GET_PACKAGE_STATUS_FAILURE`

export const INSTALL_CLUSTER_PACKAGE =  `${ CLUSTER_PREFIX }/INSTALL_CLUSTER_PACKAGE`
export const INSTALL_CLUSTER_PACKAGE_SUCCESS =  `${ CLUSTER_PREFIX }/INSTALL_CLUSTER_PACKAGE_SUCCESS`
export const INSTALL_CLUSTER_PACKAGE_FAILURE =  `${ CLUSTER_PREFIX }/INSTALL_CLUSTER_PACKAGE_FAILURE`

export const UNINSTALL_CLUSTER_PACKAGE =  `${ CLUSTER_PREFIX }/UNINSTALL_CLUSTER_PACKAGE`
export const UNINSTALL_CLUSTER_PACKAGE_SUCCESS =  `${ CLUSTER_PREFIX }/UNINSTALL_CLUSTER_PACKAGE_SUCCESS`
export const UNINSTALL_CLUSTER_PACKAGE_FAILURE =  `${ CLUSTER_PREFIX }/UNINSTALL_CLUSTER_PACKAGE_FAILURE`

export const UPDATE_CLUSTER_PACKAGE_STATUS=  `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_PACKAGE_STATUS`
export const CLEAR_CLUSTER_PACKAGE_STATUS=  `${ CLUSTER_PREFIX }/CLEAR_CLUSTER_PACKAGE_STATUS`

export const APPLIED_CLUSTERS = `${ CLUSTER_PREFIX }/APPLIED_CLUSTERS`

export const IMPORT_CLUSTER = `${ CLUSTER_PREFIX }/IMPORT_CLUSTER`
export const IMPORT_CLUSTER_SUCCESS = `${ CLUSTER_PREFIX }/IMPORT_CLUSTER_SUCCESS`
export const IMPORT_CLUSTER_FAILURE = `${ CLUSTER_PREFIX }/IMPORT_CLUSTER_FAILURE`

export const ENABLE_DISABLE_CLUSTER = `${ CLUSTER_PREFIX }/ENABLE_DISABLE_CLUSTER`
export const ENABLE_DISABLE_CLUSTER_SUCCESS = `${ CLUSTER_PREFIX }/ENABLE_DISABLE_CLUSTER_SUCCESS`
export const ENABLE_DISABLE_CLUSTER_FAILURE = `${CLUSTER_PREFIX}/ENABLE_DISABLE_CLUSTER_FAILURE`

export const UPDATE_CLUSTER_REPO = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_REPO`
export const UPDATE_CLUSTER_REPO_SUCCESS = `${ CLUSTER_PREFIX }/UPDATE_CLUSTER_REPO_SUCCESS`
export const UPDATE_CLUSTER_REPO_FAILURE = `${CLUSTER_PREFIX}/UPDATE_CLUSTER_REPO_FAILURE`

export const SET_CLUSTER_DNS = `${ CLUSTER_PREFIX }/SET_CLUSTER_DNS`
export const SET_CLUSTER_DNS_SUCCESS = `${ CLUSTER_PREFIX }/SET_CLUSTER_DNS_SUCCESS`
export const SET_CLUSTER_DNS_FAILURE = `${CLUSTER_PREFIX}/SET_CLUSTER_DNS_FAILURE`

export const SET_CLUSTER_STORAGE = `${ CLUSTER_PREFIX }/SET_CLUSTER_STORAGE`
export const SET_CLUSTER_STORAGE_SUCCESS = `${ CLUSTER_PREFIX }/SET_CLUSTER_STORAGE_SUCCESS`
export const SET_CLUSTER_STORAGE_FAILURE = `${CLUSTER_PREFIX}/SET_CLUSTER_STORAGE_FAILURE`

export const VALIDATE_DNS_PERMISSION = `${ CLUSTER_PREFIX }/VALIDATE_DNS_PERMISSION`
export const VALIDATE_DNS_PERMISSION_SUCCESS = `${ CLUSTER_PREFIX }/VALIDATE_DNS_PERMISSION_SUCCESS`
export const VALIDATE_DNS_PERMISSION_FAILURE = `${ CLUSTER_PREFIX }/VALIDATE_DNS_PERMISSION_FAILURE`

export const REDIRECT_TO_CLUSTER = `${ CLUSTER_PREFIX }/REDIRECT_TO_CLUSTER`
export const REDIRECT_TO_CLUSTER_CHANGER = `${ CLUSTER_PREFIX }/REDIRECT_TO_CLUSTER_CHANGER`

export const CLEAR_DNS_VALIDATION = `${ CLUSTER_PREFIX }/CLEAR_DNS_VALIDATION`

export const GET_CLUSTERENV_DETAILS = `${ CLUSTER_PREFIX }/GET_CLUSTERENV_DETAILS`
export const GET_CLUSTERENV_DETAILS_SUCCESS = `${ CLUSTER_PREFIX }/GET_CLUSTERENV_DETAILS_SUCCESS`
export const GET_CLUSTERENV_DETAILS_FAILURE = `${ CLUSTER_PREFIX }/GET_CLUSTERENV_DETAILS_FALURE`
export const CLEAR_CLUSTERENV_DETAILS = `${ CLUSTER_PREFIX }/CLEAR_CLUSTERENV_DETAILS`

export const GET_CLUSTER_INSIGHTS = `${ CLUSTER_PREFIX }/GET_CLUSTER_INSIGHTS`
export const GET_CLUSTER_INSIGHTS_SUCCESS = `${ CLUSTER_PREFIX }/GET_CLUSTER_INSIGHTS_SUCCESS`
export const GET_CLUSTER_INSIGHTS_FAILURE = `${ CLUSTER_PREFIX }/GET_CLUSTER_INSIGHTS_FAILURE`

export const getClusterEnvDetails = (id) => ({
    type: GET_CLUSTERENV_DETAILS,
	id : id
});

export const clearClusterEnvDetails = () => ({
	type: CLEAR_CLUSTERENV_DETAILS
})

export const createCluster = (jsonBody, history) => ({
	type: CREATE_CLUSTER,
	data: { jsonBody, history }
})

export const updateCluster = (id, jsonBody, edit, callback, history) => ({
	type: UPDATE_CLUSTER,
	data: { id, jsonBody, edit, callback, history }
})

export const updateClusterRepo = (id, jsonBody, mainClusterId) => ({
	type: UPDATE_CLUSTER_REPO,
	data: { id, jsonBody, mainClusterId }
})

export const validatePermission = (jsonBody, uploadBody) => ({
	type: VALIDATE_PERMISSION,
	data: { jsonBody, uploadBody }
})

export const validateDnsPermission = (jsonBody, uploadBody) => ({
	type: VALIDATE_DNS_PERMISSION,
	data: { jsonBody, uploadBody }
})

export const clearDnsValidation = () => ({
	type: CLEAR_DNS_VALIDATION
})

export const getClusterList = () => ({
	type: GET_CLUSTER_LIST
})

export const getClusterDetails = (id) => ({
	type: GET_CLUSTER_DETAILS,
	data: { id }
})

export const deleteCluster = (id) => ({
	type: DELETE_CLUSTER,
	data: { id }
})

export const destroyCluster = (id) => ({
	type: DESTROY_CLUSTER,
	data: { id }
})

export const applyTerraform = (id, history) => ({
	type: APPLY_TERRAFORM,
	data: { id, history }
})

export const getWorkflows = (id, pageNo, pageSize) => ({
	type: GET_WORKFLOWS,
	data: { id, pageNo, pageSize }
})

export const cancelWorkflow = (id, workflow) => ({
	type: CANCEL_WORKFLOW,
	data: { id, workflow }
})

export const getWorkflowLog = (id, workflowName, noEmptyCheck) => ({
	type: GET_WORKFLOW_LOG,
	data: { id, workflowName, noEmptyCheck }
})

export const clearClusterInfo = () => ({ type: CLEAR_CLUSTER_INFO })

export const clearNewClusterData = () => ({ type: CLEAR_NEW_CLUSTER_DATA })

export const clearCreateCluster = () => ({ type: CLEAR_CREATE_CLUSTER })

export const clearClusterWorkflows = () => ({type: CLEAR_CLUSTER_WORKFLOWS})

export const updateClusterWorkflowLog = (workflowlogs) => ({
	type: UPDATE_CLUSTER_WORKFLOW_LOG,
	data: { workflowlogs }
})

export const updateClusterWorkflows = (workflows) => ({
	type: UPDATE_CLUSTER_WORKFLOWS,
	data: { workflows }
})

export const exportWorkflow = (id) => ({
	type: EXPORT_WORKFLOW,
	data: { id }
})

export const clearExportWorkflow = () => ({
	type: CLEAR_EXPORT_WORKFLOW
})

export const getProviderConfig = (provider) => ({
	type: GET_PROVIDER_CONFIG,
	data: { provider }
})

export const importCluster = (formData, callback) => ({
	type: IMPORT_CLUSTER,
	data: { formData, callback }
})

export const setupClusterDNS = (id, jsonBody, mainClusterId, callback) => ({
	type: SET_CLUSTER_DNS,
	data: { id, jsonBody, mainClusterId, callback }
})

export const getClusterPackage = () => ({
	type: GET_CLUSTER_PACKAGE,
})

export const installClusterPackage = (id,packages, callback) => ({
	type: INSTALL_CLUSTER_PACKAGE,
	data: { packages, id, callback}
})

export const uninstallClusterPackage = (id,packages, callback) => ({
	type: UNINSTALL_CLUSTER_PACKAGE,
	data: { packages, id, callback}
})

export const getPackageStatus = (id) => ({
	type: GET_PACKAGE_STATUS,
	data: { id}
})

export const updateClusterPackageStatus = (status) => ({
	type: UPDATE_CLUSTER_PACKAGE_STATUS,
	data: status
})

export const clearClusterPackageStatus = () => ({
	type: CLEAR_CLUSTER_PACKAGE_STATUS,
})

export const enableDisableCluster = (id, jsonBody) => ({
	type: ENABLE_DISABLE_CLUSTER,
	data: { id, jsonBody }
})

export const redirectToCluster = () =>({
	type: REDIRECT_TO_CLUSTER
})

export const redirectToClusterChanger = () =>({
	type: REDIRECT_TO_CLUSTER_CHANGER
})

export const setClusterStorage = (id, jsonBody, uploadBody, clusterId, callback) =>({
	type: SET_CLUSTER_STORAGE, 
	data: {
		id, jsonBody, uploadBody, clusterId, callback
	}
})

export const getClusterInsights = (id, jsonBody) => ({
	type: GET_CLUSTER_INSIGHTS,
	data : { id, jsonBody }
});