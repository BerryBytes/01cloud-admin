import { takeLatest, put, call, select } from 'redux-saga/effects';
import { 
  CREATE_CLUSTER, 
  CREATE_CLUSTER_FAILURE, 
  CREATE_CLUSTER_SUCCESS, 
  VALIDATE_PERMISSION, 
  VALIDATE_PERMISSION_SUCCESS, 
  VALIDATE_PERMISSION_FAILURE, 
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
  GET_WORKFLOWS,
  GET_WORKFLOWS_SUCCESS,
  GET_WORKFLOWS_FAILURE,
  CANCEL_WORKFLOW,
  CANCEL_WORKFLOW_FAILURE,
  CANCEL_WORKFLOW_SUCCESS,
  GET_WORKFLOW_LOG,
  GET_WORKFLOW_LOG_SUCCESS,
  GET_WORKFLOW_LOG_FAILURE,
  GET_MORE_WORKFLOWS_SUCCESS,
  UPDATE_GCP_FILEPATH,
  EXPORT_WORKFLOW,
  EXPORT_WORKFLOW_SUCCESS,
  EXPORT_WORKFLOW_FAILURE,
  UPDATE_CLUSTER,
  UPDATE_CLUSTER_SUCCESS,
  UPDATE_CLUSTER_FAILURE,
  GET_PROVIDER_CONFIG,
  GET_PROVIDER_CONFIG_SUCCESS,
  GET_PROVIDER_CONFIG_FAILURE,
  APPLIED_CLUSTERS,
  IMPORT_CLUSTER,
  IMPORT_CLUSTER_SUCCESS,
  IMPORT_CLUSTER_FAILURE,
  GET_CLUSTER_PACKAGE,
  GET_CLUSTER_PACKAGE_FAILURE,
  GET_CLUSTER_PACKAGE_SUCCESS,
  GET_PACKAGE_STATUS,
  GET_PACKAGE_STATUS_FAILURE,
  GET_PACKAGE_STATUS_SUCCESS,
  INSTALL_CLUSTER_PACKAGE,
  INSTALL_CLUSTER_PACKAGE_FAILURE,
  INSTALL_CLUSTER_PACKAGE_SUCCESS,
  UNINSTALL_CLUSTER_PACKAGE,
  UNINSTALL_CLUSTER_PACKAGE_FAILURE,
  UNINSTALL_CLUSTER_PACKAGE_SUCCESS,
  ENABLE_DISABLE_CLUSTER,
  UPDATE_CLUSTER_REPO,
  UPDATE_CLUSTER_REPO_FAILURE,
  UPDATE_CLUSTER_REPO_SUCCESS,
  SET_CLUSTER_DNS,
  SET_CLUSTER_DNS_SUCCESS,
  SET_CLUSTER_DNS_FAILURE,
  VALIDATE_DNS_PERMISSION,
  VALIDATE_DNS_PERMISSION_SUCCESS,
  VALIDATE_DNS_PERMISSION_FAILURE,
  GET_CLUSTERENV_DETAILS,
  GET_CLUSTERENV_DETAILS_FAILURE,
  GET_CLUSTERENV_DETAILS_SUCCESS,
  SET_CLUSTER_STORAGE,
  SET_CLUSTER_STORAGE_FAILURE,
  SET_CLUSTER_STORAGE_SUCCESS,
  GET_CLUSTER_INSIGHTS,
  GET_CLUSTER_INSIGHTS_SUCCESS,
  GET_CLUSTER_INSIGHTS_FAILURE,
} from './actions';
import { GET_DNS_LIST } from "../../dns/redux/actions"
import axios from 'axios';
import { sessionTokenSelector } from '../../login/redux/selectors';
import endpoints from '../../../constants/endpoints';
import toast from '../../../components/toast/Toast';

function* createCluster(payload) {
    try {
      const sessionToken = yield select(sessionTokenSelector)
      const config = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'basic ' + sessionToken
        }
      }
      const response = yield axios.post(endpoints.CLUSTER.CREATE_CLUSTER, payload.data.jsonBody, config);
      const data = response.data;
      if (data){   
        yield put({ type: CREATE_CLUSTER_SUCCESS, data })
        
      } else {
        yield put({ type: CREATE_CLUSTER_FAILURE })
        toast.error('Some error while creating cluster. Please try again');
      }
    }
    catch (error) {
      yield put({ type: CREATE_CLUSTER_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else
        toast.error('Some error while creating cluster. Please try again');
    }
  }

  function* updateCluster(payload) {
    try {
      const sessionToken = yield select(sessionTokenSelector)
      const config = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'basic ' + sessionToken
        }
      }
      const response = yield axios.put(endpoints.CLUSTER.UPDATE_CLUSTER.replace(':id' , payload.data.id), payload.data.jsonBody, config);
      const data = response.data;
      if (data){   
        yield put({ type: UPDATE_CLUSTER_SUCCESS, data })
        if(payload.data.callback && payload.data.edit){
          payload.data.callback(data)
        }
      } else {
        yield put({ type: UPDATE_CLUSTER_FAILURE })
        toast.error('Some error while updating cluster. Please try again');
      }
    }
    catch (error) {
      yield put({ type: UPDATE_CLUSTER_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else
        toast.error('Some error while updating cluster. Please try again');
    }
  }
  
function* updateClusterRepo(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'basic ' + sessionToken
      }
    }
    const response = yield axios.put(endpoints.CLUSTER.UPDATE_CLUSTER_REPO.replace(':id' , payload.data.id), payload.data.jsonBody, config);
    const data = response.data;
    if (data){   
      yield call(getClusterDetails, { data: { id: payload.data.mainClusterId }} )
      yield put({ type: UPDATE_CLUSTER_REPO_SUCCESS })
      toast.success('Repository details updated successfully');
    } else {
      yield put({ type: UPDATE_CLUSTER_REPO_FAILURE })
      toast.error('Some error while updating repo details. Please try again');
    }
  }
  catch (error) {
    yield put({ type: UPDATE_CLUSTER_REPO_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while updating repo details. Please try again');
  }
}
  
  function* validatePermission(payload) {
    try {
      const sessionToken = yield select(sessionTokenSelector)
      if(payload.data.uploadBody)
      {
        const config = {
          headers : {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'basic ' + sessionToken
          }
        }
        const uploadResponse = yield axios.post(endpoints.PROJECT.UPLOAD_ICON, payload.data.uploadBody, config);
        const fileData = uploadResponse.data;
        if (uploadResponse.status === 200 && fileData) {
          payload.data.jsonBody['credentials'] = fileData.path;
          yield put({ type: UPDATE_GCP_FILEPATH, data: fileData.path })
        } 
      }
      const config = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'basic ' + sessionToken
        }
      }
      const response = yield axios.post(endpoints.CLUSTER.CHECK_PERMISSION, payload.data.jsonBody, config);
      const data = response.data;
      if (data){   
        yield put({ type: VALIDATE_PERMISSION_SUCCESS, data })
      } else {
        yield put({ type: VALIDATE_PERMISSION_FAILURE })
        toast.error('Unable to validate. Please try again');
      }
    }
    catch (error) {
      yield put({ type: VALIDATE_PERMISSION_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else
        toast.error('Unable to validate. Please try again');
    }
  }

  function* validateDnsPermission(payload) {
    try {
      const sessionToken = yield select(sessionTokenSelector)
      if(payload.data.uploadBody)
      {
        const config = {
          headers : {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'basic ' + sessionToken
          }
        }
        const uploadResponse = yield axios.post(endpoints.PROJECT.UPLOAD_ICON, payload.data.uploadBody, config);
        const fileData = uploadResponse.data;
        if (uploadResponse.status === 200 && fileData) {
          payload.data.jsonBody['credentials'] = fileData.path;
          yield put({ type: UPDATE_GCP_FILEPATH, data: fileData.path })
        } 
      }
      
      const config = {
        headers : {
          'Content-Type': 'application/json',
          'Authorization': 'basic ' + sessionToken
        }
      }
      const response = yield axios.post(endpoints.CLUSTER.CHECK_DNS_PERMISSION, payload.data.jsonBody, config);
      const data = response.data;
      if (data){   
        yield put({ type: VALIDATE_DNS_PERMISSION_SUCCESS, data })
      } else {
        yield put({ type: VALIDATE_DNS_PERMISSION_FAILURE })
        toast.error('Unable to validate. Please try again');
      }
    }
    catch (error) {
      yield put({ type: VALIDATE_DNS_PERMISSION_FAILURE })
      if(error && error.response && error.response.data && error.response.data.error)
        toast.error(error.response.data.error);
      else
        toast.error('Unable to validate. Please try again');
    }
  }

 function* getClusterList() {
   try {
     const sessionToken = yield select(sessionTokenSelector)
     const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
     const response = yield axios.get(endpoints.CLUSTER.GET_CLUSTER_LIST, config)

     const data = response.data;
     if (data) {
       yield put({ type: GET_CLUSTER_LIST_SUCCESS, data })
     } else {
       yield put({ type: GET_CLUSTER_LIST_FAILURE })
     }
   } catch (error) {
    yield put({ type: GET_CLUSTER_LIST_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
      toast.error(error.response.data.error);
     }
   }
 }

 function* getClusterDetails(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.GET_CLUSTER.replace(':id' , payload.data.id), config)

    const data = response.data;
    if (data) {
      yield put({ type: GET_CLUSTER_DETAILS_SUCCESS, data })
    } else {
      yield put({ type: GET_CLUSTER_DETAILS_FAILURE })
    }
  } catch (error) {
   yield put({ type: GET_CLUSTER_DETAILS_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* deleteCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + sessionToken
      }
    }
    
      yield axios.delete(endpoints.CLUSTER.DELETE_CLUSTER.replace(':id', payload.data.id), config)
    
    toast.success('Cluster delete successful');
    yield put({ type: DELETE_CLUSTER_SUCCESS })
    yield call(getClusterList)
  } catch (error) {
    yield put({ type: DELETE_CLUSTER_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* destroyCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = {
      headers : {
        
        'Authorization': 'basic ' + sessionToken
      }
    }
    
      yield axios.delete(endpoints.CLUSTER.DESTROY_CLUSTER.replace(':id', payload.data.id), config)
    
    toast.success('Cluster destroy triggered');
    yield put({ type: DESTROY_CLUSTER_SUCCESS })
    yield call(getClusterList)
  } catch (error) {
    yield put({ type: DESTROY_CLUSTER_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* applyTerraform(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.APPLY_TERRAFORM.replace(':id' , payload.data.id), config)

    const data = response.data;
    if (data) {
      yield put({ type: APPLY_TERRAFORM_SUCCESS, data })
      yield put ({ type: APPLIED_CLUSTERS, data: payload.data.id })
      toast.success('Cluster apply triggered');
      if (payload.data.history)
        payload.data.history.push('/cluster' );
    } else {
      yield put({ type: APPLY_TERRAFORM_FAILURE })
    }
  } catch (error) {
   yield put({ type: APPLY_TERRAFORM_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* getWorkflows(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.GET_WORKFLOWS.replace(':id' , payload.data.id)
      .replace(':page', payload.data.pageNo)
      .replace(':limit', payload.data.pageSize), config);

    const data = response.data;
    if (data) {
      if (payload.data.pageNo === 1)
          yield put({ type: GET_WORKFLOWS_SUCCESS, data: data.data });
      else
        yield put({ type: GET_MORE_WORKFLOWS_SUCCESS, data: data.data });
    } else {
      yield put({ type: GET_WORKFLOWS_FAILURE })
    }
  } catch (error) {
   yield put({ type: GET_WORKFLOWS_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* cancelWorkflow(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.CANCEL_WORKFLOW.replace(':id' , payload.data.id).replace(':workflow', payload.data.workflow), config);

    const data = response.data;
    if (response.status === 200 || response.status === 201) {
          yield put({ type: CANCEL_WORKFLOW_SUCCESS });
          toast.success(data.message ?? 'Workflow cancellation initiated')
    } 
    else {
      yield put({ type: CANCEL_WORKFLOW_FAILURE })
      toast.error(data.message ?? 'Workflow cancellation failed')

    }
  } catch (error) {
   yield put({ type: CANCEL_WORKFLOW_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* getWorkflowLog(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.GET_WORKFLOW_LOG.replace(':id' , payload.data.id).replace(':workflow-name', payload.data.workflowName), config)

    const data = response.status === 204 && !payload.data.noEmptyCheck ? { Name: payload.data.workflowName } : response.data;
    if (data) {
      yield put({ type: GET_WORKFLOW_LOG_SUCCESS, data })
    } else {
      yield put({ type: GET_WORKFLOW_LOG_FAILURE })
    }
  } catch (error) {
   yield put({ type: GET_WORKFLOW_LOG_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* exportWorkflow(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.DOWNLOAD_TF_FILES.replace(':id' , payload.data.id), config);

    const data = response.data;
    if (data) {
      yield put({ type: EXPORT_WORKFLOW_SUCCESS, data });
    } else {
      yield put({ type: EXPORT_WORKFLOW_FAILURE })
    }
  } catch (error) {
    yield put({ type: EXPORT_WORKFLOW_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* getProviderConfig(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.GET_PROVIDER_CONFIG.replace(':provider' , payload.data.provider), config);

    const data = response.data;
    if (data) {
      yield put({ type: GET_PROVIDER_CONFIG_SUCCESS, data });
    } else {
      yield put({ type: GET_PROVIDER_CONFIG_FAILURE })
    }
  } catch (error) {
    yield put({ type: GET_PROVIDER_CONFIG_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* importCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    if(payload.data.formData)
    {
      const config = {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'basic ' + sessionToken
        }
      }
      const response = yield axios.post(endpoints.CLUSTER.IMPORT_CLUSTER, payload.data.formData, config);
      const data = response.data;
      if (data){   
        yield put({ type: IMPORT_CLUSTER_SUCCESS, data })
        if(payload.data.callback)
        {
          payload.data.callback(data);
        }
      } else {
        yield put({ type: IMPORT_CLUSTER_FAILURE })
        
      }
    }
  }
  catch (error) {
    yield put({ type: IMPORT_CLUSTER_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Unable to import Cluster. Please try again');
  }
}

function* getClusterPackage() {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.GET_CLUSTER_PACKAGE, config);

    const data = response.data;
    if (data) {
      yield put({ type: GET_CLUSTER_PACKAGE_SUCCESS, data });
    } else {
      yield put({ type: GET_CLUSTER_PACKAGE_FAILURE })
    }
  } catch (error) {
    yield put({ type: GET_CLUSTER_PACKAGE_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* getPackageStatus(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.CLUSTER.GET_PACKAGE_STATUS.replace(':id', payload.data.id), config);

    const data = response.data;
    if (response.status === 200) {
      yield put({ type: GET_PACKAGE_STATUS_SUCCESS, data });
    } else {
      yield put({ type: GET_PACKAGE_STATUS_FAILURE })
    }
  } catch (error) {
    yield put({ type: GET_PACKAGE_STATUS_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* installPackage(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.post(endpoints.CLUSTER.INSTALL_CLUSTER_PACKAGE.replace(':id', payload.data.id), payload.data.packages, config);

    const data = response.data;
    if (response.status === 200) {
      yield put({ type: INSTALL_CLUSTER_PACKAGE_SUCCESS });
      toast.success(data.message ?? 'Package installation initiated');
      payload.data.callback()
    } else {
      yield put({ type: INSTALL_CLUSTER_PACKAGE_FAILURE })
      toast.success(data.message ?? 'Package installation failed');
    }
  } catch (error) {
    yield put({ type: INSTALL_CLUSTER_PACKAGE_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* uninstallPackage(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.post(endpoints.CLUSTER.UNINSTALL_CLUSTER_PACKAGE.replace(':id', payload.data.id), payload.data.packages, config);

    const data = response.data;
    if (response.status === 200) {
      yield put({ type: UNINSTALL_CLUSTER_PACKAGE_SUCCESS });
      toast.success(data.message ?? 'Package uninstallation initiated');
      payload.data.callback()
    } else {
      yield put({ type: UNINSTALL_CLUSTER_PACKAGE_FAILURE })
      toast.success(data.message ?? 'Package uninstallation failed');
    }
  } catch (error) {
    yield put({ type: UNINSTALL_CLUSTER_PACKAGE_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}

function* enableDisableCluster(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    
      yield axios.post(endpoints.CLUSTER.ENABLE_DISABLE_CLUSTER.replace(':id', payload.data.id), payload.data.jsonBody, config);
    
    yield call(getClusterList);
    toast.success('Cluster successfully ' + (payload.data.jsonBody.active ? 'enabled' : 'disabled'));
  } catch (error) {
    
    if(error && error.response && error.response.data && error.response.data.error){
      toast.error(error.response.data.error);
    }
  }
}

function* setupClusterDNS(payload) { 
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'basic ' + sessionToken
      }
    }
    const response = yield axios.put(endpoints.CLUSTER.UPDATE_CLUSTER_REPO.replace(':id' , payload.data.id), payload.data.jsonBody, config);
    const data = response.data;
    if (data) {   
      yield call(getClusterDetails, { data: { id: payload.data.mainClusterId }} );
      yield put({ type: GET_DNS_LIST});
      toast.success('DNS details setup successfully');
      yield put({ type: SET_CLUSTER_DNS_SUCCESS })
      if(payload.data.callback)
      {
        payload.data.callback(data);
      }
    } else {
      yield put({ type: SET_CLUSTER_DNS_FAILURE })
      toast.error('Unable to update Cluster DNS. Please try again');
    }
  }
  catch (error) {
    yield put({ type: SET_CLUSTER_DNS_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Unable to update Cluster DNS. Please try again');
  }
}

function* getClusterEnvDetails(payload) { 
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.GET_ENVIRONMENT_IN_CLUSTER.replace(':id', payload.id), config);
    
    const data = response.data;

    if (data) {
      yield put({ type: GET_CLUSTERENV_DETAILS_SUCCESS, data });
    } else {
      yield put({ type: GET_CLUSTERENV_DETAILS_FAILURE })
    }
  } catch (error) {
    yield put({ type: GET_CLUSTERENV_DETAILS_FAILURE }) 
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
  }
}
function* createClusterStorage(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    if (payload.data.uploadBody)
    {
      const config = {
        headers : {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'basic ' + sessionToken
        }
      }
      const uploadResponse = yield axios.post(endpoints.PROJECT.UPLOAD_ICON, payload.data.uploadBody, config);
      const fileData = uploadResponse.data;
      if (uploadResponse.status === 200 && fileData) {
        payload.data.jsonBody['credentials'] = fileData.path;
      } 
    }
    const _config = {
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + sessionToken
      }
    }
    const response = yield axios.post(endpoints.CLUSTER.CREATE_STORAGE.replace(":cluster_id", payload.data.id), payload.data.jsonBody, _config);
    if(response.data) {
      yield put({type: GET_CLUSTER_DETAILS, data: {
        id: payload.data.clusterId
      }})
      toast.success("Storage added successfully!")
      yield put({type: SET_CLUSTER_STORAGE_SUCCESS, data: response.data});
      if(payload.data.callback) payload.data.callback();
    }
  } catch(error) {
    toast.error(error?.response?.data?.error);
    yield put({type: SET_CLUSTER_STORAGE_FAILURE});
  }
}

function* getClusterInsights(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.post(endpoints.CLUSTER.GET_CLUSTER_INSIGHTS.replace(':cluster_id', payload.data.id), payload.data.jsonBody, config);

    const data = response.data;
    if (response.status === 200) {
      yield put({ type: GET_CLUSTER_INSIGHTS_SUCCESS, data });
    }
  } catch (error) {
    if(error && error.response && error.response.data && error.response.data.error){
     toast.error(error.response.data.error);
    }
    yield put({type: GET_CLUSTER_INSIGHTS_FAILURE});
  }
}

export default function* watcherSaga() {
    yield takeLatest(CREATE_CLUSTER, createCluster);
    yield takeLatest(UPDATE_CLUSTER, updateCluster);
    yield takeLatest(VALIDATE_PERMISSION, validatePermission);
    yield takeLatest(GET_CLUSTER_LIST, getClusterList);
    yield takeLatest(GET_CLUSTER_DETAILS, getClusterDetails);
    yield takeLatest(DELETE_CLUSTER, deleteCluster);
    yield takeLatest(DESTROY_CLUSTER, destroyCluster);
    yield takeLatest(APPLY_TERRAFORM, applyTerraform);
    yield takeLatest(GET_WORKFLOWS, getWorkflows);
    yield takeLatest(CANCEL_WORKFLOW, cancelWorkflow);
    yield takeLatest(GET_WORKFLOW_LOG, getWorkflowLog);
    yield takeLatest(GET_CLUSTER_PACKAGE, getClusterPackage)
    yield takeLatest(GET_PACKAGE_STATUS, getPackageStatus)
    yield takeLatest(INSTALL_CLUSTER_PACKAGE, installPackage)
    yield takeLatest(UNINSTALL_CLUSTER_PACKAGE, uninstallPackage)
    yield takeLatest(EXPORT_WORKFLOW, exportWorkflow);
    yield takeLatest(GET_PROVIDER_CONFIG, getProviderConfig)
    yield takeLatest(IMPORT_CLUSTER, importCluster)
    yield takeLatest(ENABLE_DISABLE_CLUSTER, enableDisableCluster)
    yield takeLatest(UPDATE_CLUSTER_REPO, updateClusterRepo)
    yield takeLatest(SET_CLUSTER_DNS, setupClusterDNS)
    yield takeLatest(SET_CLUSTER_STORAGE, createClusterStorage)
    yield takeLatest(VALIDATE_DNS_PERMISSION, validateDnsPermission)
    yield takeLatest(GET_CLUSTERENV_DETAILS, getClusterEnvDetails)
    yield takeLatest(GET_CLUSTER_INSIGHTS, getClusterInsights)
}
