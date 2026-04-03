import {
    GET_TICKET_LIST_SUCCESS,
    GET_TICKET_DETAILS_SUCCESS,
    ASSIGN_TICKETS_SUCCESS,
    ASSIGN_TICKETS,
    ASSIGN_TICKETS_FALIURE,
    ASSIGN_SERVICE_TYPE_SUCCESS,
    ASSIGN_SERVICE_TYPE,
    ASSIGN_SERVICE_TYPE_FALIURE,
    ADD_NOTES,
    ADD_NOTES_SUCCESS,
    ADD_NOTES_FALIURE,
    CLOSE_TICKET_SUCCESS,
    REPLY_ISSUE_SUCCESS,
    REPLY_ISSUE,
    REPLY_ISSUE_FAILURE,
    GET_TICKET_GROUP_SUCCESS,
    GET_ADMIN_GROUP_SUCCESS,
    GET_TICKET_STATS_SUCCESS,
    UPDATE_BREADCRUMB
} from './actions';

import initialState from './initialState';

const reducer = ( state=initialState, payload ) => {
    switch (payload.type){
        case GET_ADMIN_GROUP_SUCCESS:
            return {
                ...state,
                adminGroup : payload.data
            }

        case GET_TICKET_STATS_SUCCESS:
            return {
                ...state,
                ticketStats : payload.data
            }
        case GET_TICKET_GROUP_SUCCESS:
            return {
                ...state,
                ticketGroup : payload.data
            }
        case GET_TICKET_LIST_SUCCESS:
            return {
                ...state,
                ticketList : payload.data
            }
        case GET_TICKET_DETAILS_SUCCESS:
            return {
                ...state,
                ticketDetails: payload.data
            }
        case ASSIGN_TICKETS_SUCCESS:
            return {
                ...state,
                assignedTicketResponse: payload.data,
                assignTicketLoader: false
            }
        case ASSIGN_TICKETS:
            return {
                ...state,
                assignTicketLoader: true
            }
        case ASSIGN_TICKETS_FALIURE:
            return {
                ...state,
                assignTicketLoader: false
            }
        
        case ASSIGN_SERVICE_TYPE_SUCCESS:
            return {
                ...state,
                assignedServiceTypeResponse: payload.data,
                serviceTypeLoader: false
            }
        case ASSIGN_SERVICE_TYPE:
            return {
                ...state,
                serviceTypeLoader: true
            }
        case ASSIGN_SERVICE_TYPE_FALIURE:
            return {
                ...state,
                serviceTypeLoader: false
            }
        case ADD_NOTES_SUCCESS:
            return {
                ...state,
                addNotesResponse: payload.data,
                notesLoader: false
            }
        case ADD_NOTES:
            return {
                notesLoader: true
            }
        case ADD_NOTES_FALIURE:
            return {
                ...state,
                notesLoader: false
            }
        case CLOSE_TICKET_SUCCESS:
            return {
                ...state,
                closedTicketResponse: payload.data
            }
        case REPLY_ISSUE_SUCCESS:
            return {
                ...state,
                replyIssueResponse: payload.data,
                replyIssueLoader: false
            }
        case REPLY_ISSUE:
            return {
                 ...state,  
                 replyIssueLoader: true
            }
        case REPLY_ISSUE_FAILURE:
            return {
                ...state,
                replyIssueLoader: false
            }
        case UPDATE_BREADCRUMB:
            return {
                ...state,
                breadcrumbData: payload.data.payload,
            };
        default:
            return state
    }
}

export default reducer