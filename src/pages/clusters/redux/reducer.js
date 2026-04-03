import { VALIDATE_PERMISSION_SUCCESS, 
  VALIDATE_PERMISSION_FAILURE, 
  VALIDATE_PERMISSION,
  GET_CLUSTER_LIST,
  GET_CLUSTER_LIST_SUCCESS,
  GET_CLUSTER_LIST_FAILURE,
  GET_CLUSTER_DETAILS,
  GET_CLUSTER_DETAILS_SUCCESS,
  GET_CLUSTER_DETAILS_FAILURE,
  DELETE_CLUSTER,
  DELETE_CLUSTER_SUCCESS,
  DELETE_CLUSTER_FAILURE,
  DESTROY_CLUSTER,
  DESTROY_CLUSTER_SUCCESS,
  DESTROY_CLUSTER_FAILURE,
  APPLY_TERRAFORM,
  APPLY_TERRAFORM_SUCCESS,
  APPLY_TERRAFORM_FAILURE,
  CREATE_CLUSTER,
  CREATE_CLUSTER_SUCCESS,
  CREATE_CLUSTER_FAILURE,
  CLEAR_NEW_CLUSTER_DATA,
  GET_WORKFLOWS,
  GET_WORKFLOWS_SUCCESS,
  GET_WORKFLOWS_FAILURE,
  GET_WORKFLOW_LOG_SUCCESS,
  GET_MORE_WORKFLOWS_SUCCESS,
  UPDATE_CLUSTER_WORKFLOW_LOG,
  UPDATE_CLUSTER_WORKFLOWS,
  CLEAR_CLUSTER_WORKFLOWS,
  UPDATE_GCP_FILEPATH,
  EXPORT_WORKFLOW,
  EXPORT_WORKFLOW_SUCCESS,
  EXPORT_WORKFLOW_FAILURE,
  UPDATE_CLUSTER,
  UPDATE_CLUSTER_SUCCESS,
  UPDATE_CLUSTER_FAILURE,
  CLEAR_EXPORT_WORKFLOW,
  CANCEL_WORKFLOW,
  CANCEL_WORKFLOW_FAILURE,
  CANCEL_WORKFLOW_SUCCESS,
  GET_PROVIDER_CONFIG,
  GET_PROVIDER_CONFIG_SUCCESS,
  GET_PROVIDER_CONFIG_FAILURE,
  CLEAR_CREATE_CLUSTER,
  CLEAR_CLUSTER_INFO,
  APPLIED_CLUSTERS,
  IMPORT_CLUSTER,
  IMPORT_CLUSTER_SUCCESS,
  IMPORT_CLUSTER_FAILURE,
  GET_CLUSTER_PACKAGE,
  GET_CLUSTER_PACKAGE_FAILURE,
  GET_CLUSTER_PACKAGE_SUCCESS,
  INSTALL_CLUSTER_PACKAGE,
  INSTALL_CLUSTER_PACKAGE_FAILURE,
  INSTALL_CLUSTER_PACKAGE_SUCCESS,
  UNINSTALL_CLUSTER_PACKAGE,
  UNINSTALL_CLUSTER_PACKAGE_FAILURE,
  UNINSTALL_CLUSTER_PACKAGE_SUCCESS,
  GET_PACKAGE_STATUS,
  GET_PACKAGE_STATUS_FAILURE,
  GET_PACKAGE_STATUS_SUCCESS,
  UPDATE_CLUSTER_PACKAGE_STATUS,
  CLEAR_CLUSTER_PACKAGE_STATUS,
  UPDATE_CLUSTER_REPO,
  UPDATE_CLUSTER_REPO_FAILURE,
  UPDATE_CLUSTER_REPO_SUCCESS,
  SET_CLUSTER_DNS,
  SET_CLUSTER_DNS_SUCCESS,
  SET_CLUSTER_DNS_FAILURE,
  VALIDATE_DNS_PERMISSION,
  VALIDATE_DNS_PERMISSION_SUCCESS,
  VALIDATE_DNS_PERMISSION_FAILURE,
  CLEAR_DNS_VALIDATION,
  REDIRECT_TO_CLUSTER,
  REDIRECT_TO_CLUSTER_CHANGER,
  GET_CLUSTERENV_DETAILS,
  GET_CLUSTERENV_DETAILS_FAILURE,
  GET_CLUSTERENV_DETAILS_SUCCESS,
  CLEAR_CLUSTERENV_DETAILS,
  SET_CLUSTER_STORAGE,
  SET_CLUSTER_STORAGE_FAILURE,
  SET_CLUSTER_STORAGE_SUCCESS,
  GET_CLUSTER_INSIGHTS_SUCCESS,
  GET_CLUSTER_INSIGHTS,
  GET_CLUSTER_INSIGHTS_FAILURE,
} from './actions';
import initialState from './initialState';

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case CREATE_CLUSTER :
      return {
        ...state,
        isCreatingCluster: true,
        clusterCreationSuccess: false,
        newClusterData: null
      }  
    case CREATE_CLUSTER_SUCCESS :
      return {
        ...state,
        isCreatingCluster: false,
        clusterCreationSuccess: true,
        newClusterData: payload.data
      }
    case CREATE_CLUSTER_FAILURE:
      return {
        ...state,
        isCreatingCluster: false,
      }
    case UPDATE_CLUSTER :
      return {
        ...state,
        isUpdatingCluster: true,
        clusterCreationSuccess: false,
        
      }  
    case UPDATE_CLUSTER_SUCCESS :
      return {
        ...state,
        isUpdatingCluster: false,
        clusterCreationSuccess: true,
        newClusterData: payload.data
      }
    case UPDATE_CLUSTER_FAILURE:
      return {
        ...state,
        isUpdatingCluster: false,
      }
    case VALIDATE_PERMISSION :
      return {
        ...state,
        isValidatingPermission : true,
        validationData: null
      }  
    case VALIDATE_PERMISSION_SUCCESS :
      return {
        ...state,
        isValidatingPermission : false,
        validationData: payload.data
      }
    case VALIDATE_PERMISSION_FAILURE:
      return {
        ...state,
        isValidatingPermission : false
      }
    case VALIDATE_DNS_PERMISSION :
      return {
        ...state,
        isValidatingDnsPermission : true,
        validationDnsData: null
      }  
    case VALIDATE_DNS_PERMISSION_SUCCESS :
      return {
        ...state,
        isValidatingDnsPermission : false,
        validationDnsData: payload.data
      }
    case VALIDATE_DNS_PERMISSION_FAILURE:
      return {
        ...state,
        isValidatingDnsPermission : false
      }
    case CLEAR_DNS_VALIDATION:
      return {
        ...state,
        validationDnsData : null
      }
    case GET_CLUSTER_LIST:
      return {
        ...state,
        fetchingClusterList: true
      }
    case GET_CLUSTER_LIST_SUCCESS:
      return {
        ...state,
        fetchingClusterList: false,
        clusterList: payload.data
      }
    case GET_CLUSTER_LIST_FAILURE:
      return {
        ...state,
        fetchingClusterList: false
      }
    case GET_CLUSTER_DETAILS:
      return {
        ...state,
        fetchingClusterDetails: true
      }
    case GET_CLUSTER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingClusterDetails: false,
        clusterDetails: payload.data
      }
    case GET_CLUSTER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingClusterDetails: false
      }
    case DELETE_CLUSTER:
      return {
        ...state,
        deletingCluster: true
      }
    case DELETE_CLUSTER_SUCCESS:
      return {
        ...state,
        deletingCluster: false
      }
    case DELETE_CLUSTER_FAILURE:
      return {
        ...state,
        deletingCluster: false
      }
    case DESTROY_CLUSTER:
      return {
        ...state,
        destroyingCluster: true
      }
    case DESTROY_CLUSTER_SUCCESS:
      return {
        ...state,
        destroyingCluster: false
      }
    case DESTROY_CLUSTER_FAILURE:
      return {
        ...state,
        destroyingCluster: false
      }
    case APPLY_TERRAFORM:
      return {
        ...state,
        applyingTerraform: true
      }
    case APPLY_TERRAFORM_SUCCESS:
      return {
        ...state,
        applyingTerraform: false
      }
    case APPLY_TERRAFORM_FAILURE:
      return {
        ...state,
        applyingTerraform: false
      }
    case CLEAR_NEW_CLUSTER_DATA:
      return {
        ...state,
        newClusterData: null
      }
    case GET_WORKFLOWS:
      return {
        ...state,
        fetchingClusterWorkflows: true
    }
    case GET_WORKFLOWS_SUCCESS:
      return {
        ...state,
        clusterWorkflows : payload.data ? payload.data : [],
        clusterWorkflowsLoaded : true,
        fetchingClusterWorkflows: false
    }
    case GET_WORKFLOWS_FAILURE:
      return {
        ...state,
        fetchingClusterWorkflows: false,
        clusterWorkflows : [],
    }
    case CANCEL_WORKFLOW:
      return {
        ...state,
        cancellingWorkflow: true
    }
    case CANCEL_WORKFLOW_SUCCESS:
      return {
        ...state,
        cancellingWorkflow: false
    }
    case CANCEL_WORKFLOW_FAILURE:
      return {
        ...state,
        cancellingWorkflow: false
    }
    case GET_MORE_WORKFLOWS_SUCCESS:
      return {
        ...state,
        clusterWorkflows : [ ...state.clusterWorkflows, ...payload.data ],
        fetchingClusterWorkflows: false
    }
    case GET_WORKFLOW_LOG_SUCCESS: {
      let existingLogs = [ ...state.clusterWorkflowLog ];
      const _index = existingLogs.findIndex(x => x.name === payload.data.name);
      if(_index > -1)
        existingLogs[_index] = payload.data;
      else
        existingLogs.push(payload.data);
      
      return {
          ...state,
          clusterWorkflowLog : existingLogs
      }
    }
    case UPDATE_CLUSTER_WORKFLOW_LOG: {
      return {
        ...state,
        clusterWorkflowLog: payload.data.workflowlogs
      }
    }
    case UPDATE_CLUSTER_WORKFLOWS: {
      return {
        ...state,
        clusterWorkflows: payload.data.workflows
      }
    }
    case CLEAR_CLUSTER_WORKFLOWS: {
      return {
        ...state,
        clusterWorkflows: initialState.clusterWorkflows,
        clusterWorkflowLog: initialState.clusterWorkflowLog,
        clusterWorkflowsLoaded: false
      }
    }
    case UPDATE_GCP_FILEPATH: {
      return {
        ...state,
        gcpFilePath: payload.data
      }
    }
    case EXPORT_WORKFLOW: {
      return {
        ...state,
        exportingCluster: true
      }
    }
    case EXPORT_WORKFLOW_SUCCESS: {
      return {
        ...state,
        exportingCluster: false,
        exportUrl: payload.data.download_url
      }
    }
    case EXPORT_WORKFLOW_FAILURE: {
      return {
        ...state,
        exportingCluster: false
      }
    }
    case CLEAR_EXPORT_WORKFLOW: {
      return {
        ...state,
        exportUrl: ''
      }
    }
    case GET_PROVIDER_CONFIG: {
      return {
        ...state,
        fetchingProviderConfig: true
      }
    }
    case GET_PROVIDER_CONFIG_SUCCESS: {
      return {
        ...state,
        providerConfig : payload.data,
        fetchingProviderConfig: false
      }
    }
    case GET_PROVIDER_CONFIG_FAILURE: {
      return {
        ...state,
        fetchingProviderConfig: false
      }
    }
    case GET_CLUSTER_PACKAGE: {
      return {
        ...state,
        fetchingClusterPackage: true
      }
    }
    case GET_CLUSTER_PACKAGE_SUCCESS: {
      return {
        ...state,
        clusterPackageConfig : payload.data,
        fetchingClusterPackage: false
      }
    }
    case GET_CLUSTER_PACKAGE_FAILURE: {
      return {
        ...state,
        fetchingClusterPackage: false
      }
    }
    case GET_PACKAGE_STATUS: {
      return {
        ...state,
        fetchingPackageStatus: true
      }
    }
    case GET_PACKAGE_STATUS_SUCCESS: {
      return {
        ...state,
        fetchingPackageStatus: false
      }
    }
    case GET_PACKAGE_STATUS_FAILURE: {
      return {
        ...state,
        fetchingPackageStatus: false
      }
    }
    case UPDATE_CLUSTER_PACKAGE_STATUS: {return {
        ...state,
        clusterPackageStatus: payload.data
      }
    }
    case CLEAR_CLUSTER_PACKAGE_STATUS: {
      return {
        ...state,
        clusterPackageStatus: initialState.clusterPackageStatus,
        clusterPackageConfig: initialState.clusterPackageConfig,
      }
    }
    case INSTALL_CLUSTER_PACKAGE: {
      return {
        ...state,
        installingPackage: true
      }
    }
    case INSTALL_CLUSTER_PACKAGE_SUCCESS: {
      return {
        ...state,
        installingPackage: false
      }
    }
    case INSTALL_CLUSTER_PACKAGE_FAILURE: {
      return {
        ...state,
        installingPackage: false
      }
    }
    case UNINSTALL_CLUSTER_PACKAGE: {
      return {
        ...state,
        uninstallingPackage: true
      }
    }
    case UNINSTALL_CLUSTER_PACKAGE_SUCCESS: {
      return {
        ...state,
        uninstallingPackage: false
      }
    }
    case UNINSTALL_CLUSTER_PACKAGE_FAILURE: {
      return {
        ...state,
        uninstallingPackage: false
      }
    }
    case CLEAR_CREATE_CLUSTER: {
      return {
        ...state,
        validationData: null,
        providerConfig: null
      }
    }
    case CLEAR_CLUSTER_INFO: {
      return {
        ...state,
        clusterDetails: null
      }
    }
    case APPLIED_CLUSTERS: {
      return {
        ...state,
        appliedClusters: [ ...state.appliedClusters, payload.data ]
      }
    }
    case IMPORT_CLUSTER: {
      return {
        ...state,
        importingCluster: true
      }
    }
    case IMPORT_CLUSTER_SUCCESS: {
      return {
        ...state,
        importingCluster: false
      }
    }
    case IMPORT_CLUSTER_FAILURE: {
      return {
        ...state,
        importingCluster: false
      }
    }
    case UPDATE_CLUSTER_REPO: {
      return {
        ...state,
        updatingRepoDetails: true
      }
    }
    case UPDATE_CLUSTER_REPO_SUCCESS: { 
      return {
        ...state,
        updatingRepoDetails: false
      }
    }
    case UPDATE_CLUSTER_REPO_FAILURE: { 
      return {
        ...state,
        updatingRepoDetails: false
      }
    }
    case SET_CLUSTER_DNS: { 
      return {
        ...state,
        updatingDNS: true
      }
    } 
    case SET_CLUSTER_DNS_SUCCESS: { 
      return {
        ...state,
        updatingDNS: false
      }
    } 
    case SET_CLUSTER_DNS_FAILURE: { 
      return {
        ...state,
        updatingDNS: false
      }
    }
    case SET_CLUSTER_STORAGE: { 
      return {
        ...state,
        settingClusterStorage: true
      }
    } 
    case SET_CLUSTER_STORAGE_SUCCESS: { 
      return {
        ...state,
        settingClusterStorage: false
      }
    } 
    case SET_CLUSTER_STORAGE_FAILURE: { 
      return {
        ...state,
        settingClusterStorage: false
      }
    }
    case REDIRECT_TO_CLUSTER:
      return {
        ...state,
        redirectToCluster: true
    }
    case REDIRECT_TO_CLUSTER_CHANGER:
      return {
        ...state,
        redirectToCluster: false
    }
    case GET_CLUSTERENV_DETAILS:
      return {
        ...state,
        fetchingClusterEnvDetails: true,
      }  
    case GET_CLUSTERENV_DETAILS_SUCCESS :
      return {
        ...state,
        fetchingClusterEnvDetails: false,
        clusterEnvDetails: payload.data
      }
    case GET_CLUSTERENV_DETAILS_FAILURE:
      return {
        ...state,
        fetchingClusterEnvDetails: false,
      }
    case CLEAR_CLUSTERENV_DETAILS: {
      return {
        ...state,
        clusterEnvDetails: initialState.clusterEnvDetails,
        fetchingClusterDetails: initialState.fetchingClusterEnvDetails
      }
    }
    case GET_CLUSTER_INSIGHTS: {
      return {
        ...state,
        fetchingClusterInsights: true,
      }
    }
    case GET_CLUSTER_INSIGHTS_SUCCESS: {
      return {
        ...state,
        clusterInsights: payload.data,
        fetchingClusterInsights: false
      }
    }
    case GET_CLUSTER_INSIGHTS_FAILURE: {
      return {
        ...state,
        fetchingClusterInsights: false
      }
    }
    default:
      return state;
  }
};

export default reducer;
