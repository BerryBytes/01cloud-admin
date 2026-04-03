import {
  CREATE_RESOURCE_CALL,
  CREATE_RESOURCE_CALL_SUCCESS,
  CREATE_RESOURCE_CALL_FAILURE,
  EDIT_RESOURCE_CALL,
  EDIT_RESOURCE_CALL_SUCCESS,
  EDIT_RESOURCE_CALL_FAILURE,
} from "./actions";
import axios from "axios";
import { takeLatest, put, call, select } from "redux-saga/effects";
import { sessionTokenSelector } from "../../../login/redux/selectors";
import toast from "../../../../components/toast/Toast";
import paths from "../../../../constants/paths";

import endpoints from "../../../../constants/endpoints";

const createResourceCall = async (sessionToken, payload) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.post(
    endpoints.RESOURCES.CREATE_RESOURCE,
    payload,
    config
  );
  return response;
};
const editResourceCall = async (sessionToken, payload, id) => {
  const config = {
    headers: {
      Authorization: "basic " + sessionToken,
    },
  };
  const response = await axios.put(
    endpoints.RESOURCES.EDIT_RESOURCE.replace(":id", id),
    payload,
    config
  );
  return response;
};

function* createResource(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    const response = yield call(
      createResourceCall,
      sessionToken,
      payload.data.payload
    );
    
    if (response.status === 201) {
      yield put({ type: CREATE_RESOURCE_CALL_SUCCESS });
      toast.success("Resource created Successfully");
      payload.data.history.push(`${paths.RESOURCES}`);
    } else {
      yield put({
        type: CREATE_RESOURCE_CALL_FAILURE,
        data: {
          error: " Cannot Create Resource",
        },
      });
      toast.error("Some error while adding Resource");
    }
  } catch (error) {
    yield put({
      type: CREATE_RESOURCE_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else toast.error("Some error while creating Resource. Please try again");
  }
}
function* editResource(payload) {
  try {
    const sessionToken = yield select(sessionTokenSelector);

    const response = yield call(
      editResourceCall,
      sessionToken,
      payload.data.payload,
      payload.data.id
    );
    
    if (response.status === 200) {
      yield put({ type: EDIT_RESOURCE_CALL_SUCCESS });
      toast.success("Resource Updated Successfully");
      payload.data.history.push(`${paths.RESOURCES}`);
    } else {
      yield put({
        type: EDIT_RESOURCE_CALL_FAILURE,
        data: {
          error: " Cannot Update Resource",
        },
      });
      toast.error("Some error while updating Resource");
    }
  } catch (error) {
    yield put({
      type: EDIT_RESOURCE_CALL_FAILURE,
      data: {
        error: error.message,
      },
    });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    )
      toast.error(error.response.data.error);
    else toast.error("Some error while updating Resource.");
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_RESOURCE_CALL, createResource);
  yield takeLatest(EDIT_RESOURCE_CALL, editResource);
}
