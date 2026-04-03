const SUPPORT_PREFIX = "@SUPPORT";

export const GET_TICKET_LIST = `${SUPPORT_PREFIX}/GET_TICKET_LIST`;
export const GET_TICKET_LIST_SUCCESS = `${SUPPORT_PREFIX}/GET_TICKET_LIST_SUCCESS`;
export const GET_TICKET_LIST_FALIURE = `${SUPPORT_PREFIX}/GET_TICKET_LIST_FALIURE`;

export const GET_TICKET_DETAILS = `${SUPPORT_PREFIX}/GET_TICKET_DETAILS`;
export const GET_TICKET_DETAILS_SUCCESS = `${SUPPORT_PREFIX}/GET_TICKET_DETAILS_SUCCESS`;
export const GET_TICKET_DETAILS_FALIURE = `${SUPPORT_PREFIX}/GET_TICKET_DETAILS_FALIURE`;

export const ASSIGN_TICKETS = `${SUPPORT_PREFIX}/ASSIGN_TICKETS`;
export const ASSIGN_TICKETS_SUCCESS = `${SUPPORT_PREFIX}/ASSIGN_TICKETS_SUCCESS`;
export const ASSIGN_TICKETS_FALIURE = `${SUPPORT_PREFIX}/ASSIGN_TICKETS_FALIURE`;

export const ASSIGN_SERVICE_TYPE = `${SUPPORT_PREFIX}/ASSIGN_SERVICE_TYPE`;
export const ASSIGN_SERVICE_TYPE_SUCCESS = `${SUPPORT_PREFIX}/ASSIGN_SERVICE_TYPE_SUCCESS`;
export const ASSIGN_SERVICE_TYPE_FALIURE = `${SUPPORT_PREFIX}/ASSIGN_SERVICE_TYPE_FALIURE`;

export const ADD_NOTES = `${SUPPORT_PREFIX}/ADD_NOTES`;
export const ADD_NOTES_SUCCESS = `${SUPPORT_PREFIX}/ADD_NOTES_SUCCESS`;
export const ADD_NOTES_FALIURE = `${SUPPORT_PREFIX}/ADD_NOTES_FALIURE`;

export const CLOSE_TICKET = `${SUPPORT_PREFIX}/CLOSE_TICKET`;
export const CLOSE_TICKET_SUCCESS = `${SUPPORT_PREFIX}/CLOSE_TICKET_SUCCESS`;
export const CLOSE_TICKET_FALIURE = `${SUPPORT_PREFIX}/CLOSE_TICKET_FALIURE`;

export const REPLY_ISSUE = `${SUPPORT_PREFIX}/REPLY_ISSUE`;
export const REPLY_ISSUE_SUCCESS = `${SUPPORT_PREFIX}/REPLY_ISSUE_SUCCESS`;
export const REPLY_ISSUE_FAILURE = `${SUPPORT_PREFIX}/REPLY_ISSUE_FAILURE`;

export const DELETE_TICKET = `${SUPPORT_PREFIX}/DELETE_TICKET`;
export const DELETE_TICKET_SUCCESS = `${SUPPORT_PREFIX}/DELETE_TICKET_SUCCESS`;
export const DELETE_TICKET_FAILURE = `${SUPPORT_PREFIX}/DELETE_TICKET_FAILURE`;

export const UPDATE_BREADCRUMB = "UPDATE_BREADCRUMB";

export const GET_TICKET_GROUP = `${SUPPORT_PREFIX}/GET_TICKET_GROUP`;
export const GET_TICKET_GROUP_SUCCESS = `${SUPPORT_PREFIX}/GET_TICKET_GROUP_SUCCESS`;
export const GET_TICKET_GROUP_FALIURE = `${SUPPORT_PREFIX}/GET_TICKET_GROUP_FALIURE`;

export const GET_ADMIN_GROUP = `${SUPPORT_PREFIX}/GET_ADMIN_GROUP`;
export const GET_ADMIN_GROUP_SUCCESS = `${SUPPORT_PREFIX}/GET_ADMIN_GROUP_SUCCESS`;
export const GET_ADMIN_GROUP_FALIURE = `${SUPPORT_PREFIX}/GET_ADMIN_GROUP_FALIURE`;

export const GET_TICKET_STATS = `${SUPPORT_PREFIX}/GET_TICKET_STATS`;
export const GET_TICKET_STATS_SUCCESS = `${SUPPORT_PREFIX}/GET_TICKET_STATS_SUCCESS`;
export const GET_TICKET_STATS_FALIURE = `${SUPPORT_PREFIX}/GET_TICKET_STATS_FALIURE`;

const getAdminGroup = () => ({
    type: GET_ADMIN_GROUP
});
const getTicketStats = () => ({
    type: GET_TICKET_STATS
});

const getTicketList = (  
  pageNumber,
  limit,
  status,
  search,
  priority,
  category,
  user,
  assignee) => ({
    type: GET_TICKET_LIST,
    data: {
        pageNumber,
        limit,
        status,
        search,
        priority,
        category,
        user,
        assignee
    },
});

const getTicketGroup = () => ({
    type: GET_TICKET_GROUP
})

const getTicketDetails = (id) => ({
    type: GET_TICKET_DETAILS,
    id: id
});

const assignTickets = (jsonData) => ({
    type: ASSIGN_TICKETS,
    data : { jsonData }
})

const assignServiceType = (jsonData) => ({
    type: ASSIGN_SERVICE_TYPE,
    data : { jsonData }
})

const addNotes = (jsonData) => ({
    type: ADD_NOTES,
    data : { jsonData }
})

const closeTicket = (jsonData) => ({
    type: CLOSE_TICKET,
    data: {
        jsonData
    },
})

const replyTicket = (jsonData) => ({
    type: REPLY_ISSUE,
    data: {jsonData}
})

const deleteTicket = (id) => ({
    type: DELETE_TICKET,
    id: id
})

const updateBreadcrumb = (payload) => ({
    type: UPDATE_BREADCRUMB,
    data: { payload },
  });

export {
    getTicketList,
    getTicketDetails,
    assignTickets,
    assignServiceType,
    addNotes,
    closeTicket,
    replyTicket,
    updateBreadcrumb,
    deleteTicket,
    getTicketGroup,
    getAdminGroup,
    getTicketStats
};
