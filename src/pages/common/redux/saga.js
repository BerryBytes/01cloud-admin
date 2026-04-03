import { call, takeLatest, put, select } from 'redux-saga/effects';
import axios from 'axios';
import endpoints from '../../../constants/endpoints';
import { sessionTokenSelector } from '../../login/redux/selectors'
import { 
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  UPLOAD_MULTIPLE_FILES,
  FETCH_QUOTA_CONFIG,
  fetchQuotaConfigSuccess,
  fetchQuotaFailure,
  updateQuotaConfigSuccess,
  updateQuotaConfigFailure,
  UPDATE_QUOTA_CONFIG,
 } from './actions';
 import toast from '../../../components/toast/Toast';

function *uploadApiCall(fileData){
  const sessionToken = yield select(sessionTokenSelector)
    const config = {
      headers : {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'basic ' + sessionToken
      }
    }
    const iconResponse = yield axios.post(endpoints.PROJECT.UPLOAD_ICON, fileData, config)
    return iconResponse

}

function* uploadSingleFile(payload) {
  try {
    const response = yield call(uploadApiCall, payload.file)
    if(payload.callBack){
      payload.callBack(response.data, payload.file.get("file"))
    }
    yield put({ type: UPLOAD_FILE_SUCCESS })
  } catch(error) {
    yield put({ type: UPLOAD_FILE_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while uploading');
  }
}

function* uploadFiles(payload) {
  try {
    let d = {
      callBack: payload.data.callBack
    }
    for (const i in payload.data.files) {
      const file = payload.data.files[i]
      d.file = file    
      yield call(uploadSingleFile, d);
    }
    yield put({ type: UPLOAD_FILE_SUCCESS })
  } catch (error) {
    yield put({ type: UPLOAD_FILE_FAILURE })
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while uploading');
  }
}

function* uploadFile(payload) {
  try {
    
    const iconResponse = yield call(uploadApiCall, payload.data.formData)
    const iconData = iconResponse.data;
    if(payload.data.callBack)
    {
       payload.data.callBack(iconData);
    }
    yield put({ type: UPLOAD_FILE_SUCCESS })
  } catch (error) {
    yield put({ type: UPLOAD_FILE_FAILURE })
    if(payload.data.callBack)
    {
      payload.data.callBack(null);
    }
    if(error && error.response && error.response.data && error.response.data.error)
      toast.error(error.response.data.error);
    else
      toast.error('Some error while uploading');
  }
}

function* fetchQuotaConfig() {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.get(
      endpoints.QUOTA.FETCH_QUOTA_CONFIG,
      config
    );
    const data = response.data;
    if (data) {
      yield put(fetchQuotaConfigSuccess(data));
    } else {
      yield put(
        fetchQuotaFailure(
          "Some error while Fetching quota config. Please try again"
        )
      );
      toast.error("Some error while Fetching quota config. Please try again");
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      yield put(fetchQuotaFailure(error.response.data.error));
      toast.error(error.response.data.error);
    } else {
      yield put(
        fetchQuotaFailure(
          "Some error while fetching quota config. Please try again"
        )
      );
      toast.error("Some error while fetching quota config. Please try again");
    }
  }
}

function* updateQuotaConfig(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: "basic " + sessionToken,
      },
    };
    const response = yield axios.put(
      endpoints.QUOTA.UPDATE_QUOTA_CONFIG,
      payload.data,
      config
    );
    const data = response.data;
    if (data) {
      yield put(updateQuotaConfigSuccess(data));
      toast.success(response.message || "Updated quota config");
    } else {
      yield put(
        updateQuotaConfigFailure(
          "Some error while Updating quota config. Please try again"
        )
      );
      toast.error("Some error while Updating quota config. Please try again");
    }
  } catch (error) {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      yield put(updateQuotaConfigFailure(error.response.data.error));
      toast.error(error.response.data.error);
    } else {
      yield put("Some error while updating quota config. Please try again");

      toast.error("Some error while updating quota config. Please try again");
    }
  }
}

export default function* watcherSaga() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(UPLOAD_MULTIPLE_FILES, uploadFiles);
  yield takeLatest(FETCH_QUOTA_CONFIG,fetchQuotaConfig);
  yield takeLatest(UPDATE_QUOTA_CONFIG,updateQuotaConfig)
}