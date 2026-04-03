import { takeLatest, put , select} from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_TICKET_LIST,
    GET_TICKET_LIST_SUCCESS,
    GET_TICKET_LIST_FALIURE,
    GET_TICKET_DETAILS,
    GET_TICKET_DETAILS_SUCCESS,
    GET_TICKET_DETAILS_FALIURE,
    ASSIGN_TICKETS,
    ASSIGN_TICKETS_FALIURE,
    ASSIGN_TICKETS_SUCCESS,
    ASSIGN_SERVICE_TYPE,
    ASSIGN_SERVICE_TYPE_SUCCESS,
    ASSIGN_SERVICE_TYPE_FALIURE,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_FALIURE,
    ADD_NOTES,
    CLOSE_TICKET_SUCCESS,
    CLOSE_TICKET_FALIURE,
    CLOSE_TICKET,
    REPLY_ISSUE_SUCCESS,
    REPLY_ISSUE_FAILURE,
    REPLY_ISSUE, 
    DELETE_TICKET,
    DELETE_TICKET_FAILURE,
    DELETE_TICKET_SUCCESS,
    GET_TICKET_GROUP,
    GET_TICKET_GROUP_SUCCESS,
    GET_TICKET_GROUP_FALIURE,
    GET_ADMIN_GROUP,
    GET_ADMIN_GROUP_SUCCESS,
    GET_ADMIN_GROUP_FALIURE,
    GET_TICKET_STATS,
    GET_TICKET_STATS_SUCCESS,
    GET_TICKET_STATS_FALIURE
} from './actions';

import { sessionTokenSelector } from "../../login/redux/selectors";
import endpoints from "../../../constants/endpoints";
import Toast from '../../../components/toast/Toast';

function* getAdminGroup(){
  try{

    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.SUPPORT.GET_ADMIN_GROUP, config);

    const data = response.data;
    if(data){
        yield put({ type: GET_ADMIN_GROUP_SUCCESS, data})
    }else{
        yield put({ type: GET_ADMIN_GROUP_FALIURE })
        Toast.error(response.message ?? "Failed To Get Admin Group");
    }
}catch(error){
    yield put({ type: GET_ADMIN_GROUP_FALIURE })
  }
}

function* getTicketStats(){
  try{
    const sessionToken = yield select(sessionTokenSelector)
    const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
    const response = yield axios.get(endpoints.SUPPORT.GET_TICKET_STATS, config);

    const data = response.data;
    if(data){
        yield put({ type: GET_TICKET_STATS_SUCCESS, data})
    }else{
        yield put({ type: GET_TICKET_STATS_FALIURE })
        Toast.error(response.message ?? "Failed To Get Ticket Stats");
    }
}catch(error){
    yield put({ type: GET_TICKET_STATS_FALIURE })
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        Toast.error(error.response.data.error);
      }
  }
}

function* getTicketGroup(){
    try{

      const sessionToken = yield select(sessionTokenSelector)
      const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
      const response = yield axios.get(endpoints.SUPPORT.GET_TICKET_GROUP, config);

      const data = response.data;
      if(data){
          yield put({ type: GET_TICKET_GROUP_SUCCESS, data})
      }else{
          yield put({ type: GET_TICKET_GROUP_FALIURE })
          Toast.error(response.message ?? "Failed To Get Ticket Group");
      }
  }catch(error){
      yield put({ type: GET_TICKET_GROUP_FALIURE })
      if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          Toast.error(error.response.data.error);
        }
  }
}

function* getTicketList(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = { 
          headers : { 'Authorization': 'basic ' + sessionToken },
          params: { 
              page: payload.data.pageNumber,
              limit: payload.data.limit,
              category: payload.data.category,
              query: payload.data.search,
              status: payload.data.status,
              priority: payload.data.priority,
              user_id: payload.data.user,
              assignee_id: payload.data.assignee
            },
          }
        const response = yield axios.get(
          endpoints.SUPPORT.GET_TICKET_LIST,
          config,
        );
        const data = response.data;

        if(data){
            yield put({ type: GET_TICKET_LIST_SUCCESS, data})
        }else{
            yield put({ type: GET_TICKET_LIST_FALIURE })
            Toast.error(response.message ?? "Failed To Get Ticket List");
        }
    }catch(error){
        yield put({ type: GET_TICKET_LIST_FALIURE })
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Toast.error(error.response.data.error);
          }
    }
}

function* getTicketDetails(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
        const response = yield axios.get(endpoints.SUPPORT.GET_TICKET_OVERVIEW.replace(":id", payload.id),config);

        const data = response.data;
        if(data){
            yield put({ type: GET_TICKET_DETAILS_SUCCESS, data})
        }else{
            yield put({ type: GET_TICKET_DETAILS_FALIURE }) 
            Toast.error(response.message ?? "Failed To Get Ticket Details");
        }
    }catch(error){
      
        yield put({ type: GET_TICKET_DETAILS_FALIURE })
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Toast.error(error.response.data.error);
          }
    }
}

function* assignTickets(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
        const response = yield axios.post(endpoints.SUPPORT.ASSIGN_TICKET, payload.data.jsonData ,config);

        const data = "ok"
        if(data){
            yield put({ type: ASSIGN_TICKETS_SUCCESS, data})
            yield put({ type: GET_TICKET_DETAILS, id: payload.data.jsonData.ticketId });
            Toast.success(response.message ?? "Ticket Assigned Successfully");
        }else{
            yield put({ type: ASSIGN_TICKETS_FALIURE })
            Toast.error(response.message ?? "Failed To Assign Tickets");
        }
    }
    catch(error){
        yield put({ type: ASSIGN_TICKETS_FALIURE })
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Toast.error(error.response.data.error);
          }
    }
}

function* assignServiceType(payload){
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
        "Content-Type": "application/json",
      },
    };
    const response = yield axios.put(
      endpoints.SUPPORT.ASSIGN_SERVICE_TYPE.replace(":id", payload.data.jsonData.id),
      payload.data.jsonData.payload,
      config
    );
    if (response.status === 200 || response.status === 201) {
      yield put({ type: ASSIGN_SERVICE_TYPE_SUCCESS });
      Toast.success(response.message ?? "Support ticket updated successfully");
      yield put({ type: GET_TICKET_DETAILS, id: payload.data.jsonData.id });
    } else {
      yield put({ type: ASSIGN_SERVICE_TYPE_FALIURE });
      Toast.error(response.message ?? "Support ticket updated failed");
    }
  } catch (error) {
    yield put({ type: ASSIGN_SERVICE_TYPE_FALIURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      Toast.error(error.response.data.error);
    }
  }
}

function* addNotes(payload){
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
        "Content-Type": "application/json",
      },
    };
    const response = yield axios.put(
      endpoints.SUPPORT.ADD_NOTES.replace(":id", payload.data.jsonData.id),
      payload.data.jsonData.payload,
      config
    );
    if (response.status === 200 || response.status === 201) {
      yield put({ type: ADD_NOTES_SUCCESS });
      Toast.success(response.message ?? "Support ticket updated successfully");
      yield put({ type: GET_TICKET_DETAILS, id: payload.data.jsonData.id });
    } else {
      yield put({ type: ADD_NOTES_FALIURE });
      Toast.error(response.message ?? "Support ticket updated failed");
    }
  } catch (error) {
    yield put({ type: ADD_NOTES_FALIURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      Toast.error(error.response.data.error);
    }
  }
}

function* closeTicket(payload){
  try {
    const sessionToken = yield select(sessionTokenSelector);
    const config = {
      headers: {
        Authorization: "basic " + sessionToken,
        "Content-Type": "application/json",
      },
    };
    const response = yield axios.put(
      endpoints.SUPPORT.CLOSE_TICKET.replace(":id", payload.data.jsonData.id),
      payload.data.jsonData.payload,
      config
    );
    if (response.status === 200 || response.status === 201) {
      yield put({ type: CLOSE_TICKET_SUCCESS });
      Toast.success(response.message ?? "Support ticket updated successfully");
      yield put({ type: GET_TICKET_DETAILS, id: payload.data.jsonData.id });
    } else {
      yield put({ type: CLOSE_TICKET_FALIURE });
      Toast.error(response.message ?? "Support ticket updated failed");
    }
  } catch (error) {
    yield put({ type: CLOSE_TICKET_FALIURE });
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      Toast.error(error.response.data.error);
    }
  }
}

function* replyTicket(payload){
    try{
        const sessionToken = yield select(sessionTokenSelector)
        const config = { headers : { 'Authorization': 'basic ' + sessionToken } }
        const response = yield axios.post(endpoints.SUPPORT.REPLY_TICKET, payload.data.jsonData ,config);

        if (response.status === 200  || response.status === 201) {
            yield put({ type: REPLY_ISSUE_SUCCESS });
            Toast.success(response.message ?? "Replied successfully");
            if (payload.data?.jsonData?.ticketId) {
                yield put({
                    type: GET_TICKET_DETAILS,
                    id: payload.data?.jsonData?.ticketId,
                  });
            } else {
                Toast.error("Couldn't fetch updated data");
            }
        } else {
            yield put({ type: REPLY_ISSUE_FAILURE });
            Toast.error(response.message ?? "Failed to reply");
        }
    
    }
    catch(error){
        yield put({ type: REPLY_ISSUE_FAILURE })
        if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            Toast.error(error.response.data.error);
          }
    }
}

function* deleteTicket(payload) {
    try {
      const sessionToken = yield select(sessionTokenSelector);
      const config = {
        headers: {
          Authorization: "basic " + sessionToken,
        },
      };
      const response = yield axios.delete(
        endpoints.SUPPORT.DELETE_TICKET.replace(":id", payload.id),
        config
      );
      if (response.status === 200 || response.status === 201) {
        yield put({ type: DELETE_TICKET_SUCCESS });
        yield put({ type: GET_TICKET_LIST })
        Toast.success(response.message ?? "Support ticket deleted successfully");
        yield put({ type: GET_TICKET_LIST });
      } else {
        yield put({ type: DELETE_TICKET_FAILURE });
        Toast.error(response.message ?? "Support ticket deletion failed");
      }
    } catch (error) {
      yield put({ type: DELETE_TICKET_FAILURE });
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        Toast.error(error.response.data.error);
      }
    }
  }

export default function* watcherSaga(){
    yield takeLatest(GET_TICKET_LIST, getTicketList);
    yield takeLatest(GET_TICKET_DETAILS, getTicketDetails);
    yield takeLatest(ASSIGN_TICKETS, assignTickets);
    yield takeLatest(ASSIGN_SERVICE_TYPE, assignServiceType);
    yield takeLatest(ADD_NOTES, addNotes);
    yield takeLatest(CLOSE_TICKET, closeTicket);
    yield takeLatest(REPLY_ISSUE, replyTicket);
    yield takeLatest(DELETE_TICKET, deleteTicket);
    yield takeLatest(GET_TICKET_GROUP, getTicketGroup);
    yield takeLatest(GET_ADMIN_GROUP, getAdminGroup);
    yield takeLatest(GET_TICKET_STATS, getTicketStats);
}