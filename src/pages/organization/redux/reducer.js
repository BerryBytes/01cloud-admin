import { 
    GET_ORGANIZATION_LIST,
    GET_ORGANIZATION_LIST_SUCCESS,
    GET_ORGANIZATION_LIST_FAILURE,
    GET_PROJECT_OF_ORGANIZATION,
    GET_PROJECT_OF_ORGANIZATION_FAILURE,
    GET_PROJECT_OF_ORGANIZATION_SUCCESS,
    GET_CLUSTER_OF_ORGANIZATION,
    GET_CLUSTER_OF_ORGANIZATION_FAILURE,
    GET_CLUSTER_OF_ORGANIZATION_SUCCESS,
    GET_ORGANIZATION_BY_ID,
    GET_ORGANIZATION_BY_ID_SUCCESS,
    GET_ORGANIZATION_BY_ID_FAILURE
} from './actions'
import initialState from './initialState'

const reducer = ( state = initialState, payload ) => {
    switch(payload.type){
        case GET_ORGANIZATION_LIST_SUCCESS:
            return {
                ...state,
                count: payload.data.count,
                organizationList: payload.data.data,
                fetchingOrganizationList: false
            }
        case GET_ORGANIZATION_LIST_FAILURE:
            return {
                ...state,
                fetchingOrganizationList: false
            }
        case GET_ORGANIZATION_LIST:
            return {
                ...state,
                fetchingOrganizationList: true
            }
        case GET_ORGANIZATION_BY_ID_SUCCESS:
            return {
                ...state,
                organizationDetailById: payload.data,
                fetchingOrganizationDetailById: false
            }
        case GET_ORGANIZATION_BY_ID_FAILURE:
            return {
                ...state,
                fetchingOrganizationDetailById: false
            }
        case GET_ORGANIZATION_BY_ID:
            return {
                ...state,
                fetchingOrganizationDetailById: true
            }
        case GET_PROJECT_OF_ORGANIZATION_SUCCESS:
            return {
                ...state,
                projectsList: payload.data,
                fetchingOrganizationDetailById: false
            }
        case GET_PROJECT_OF_ORGANIZATION_FAILURE:
            return {
                ...state,
                fetchingOrganizationDetailById: false
            }
        case GET_PROJECT_OF_ORGANIZATION:
            return {
                ...state,
                fetchingOrganizationDetailById: true
            }
        case GET_CLUSTER_OF_ORGANIZATION_SUCCESS:
            return {
                ...state,
                clustersList: payload.data,
                fetchingOrganizationDetailById: false
            }
        case GET_CLUSTER_OF_ORGANIZATION_FAILURE:
            return {
                ...state,
                fetchingOrganizationDetailById: false
            }
        case GET_CLUSTER_OF_ORGANIZATION:
            return {
                ...state,
                fetchingOrganizationDetailById: true
            }
        default:
            return state
    }
}

export default reducer