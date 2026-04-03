import { FETCH_EMAIL_TEMPLATE,FETCH_EMAIL_CONTENT, FETCH_EMAIL_TEMPLATE_SUCCESS, FETCH_EMAIL_CONTENT_SUCCESS } from "./action";
import initialState from "./initialState";

const reducer = (state = initialState, payload) => {
    switch(payload.type){
        case FETCH_EMAIL_TEMPLATE:
            return{
                ...state
            }
        case FETCH_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                emailTemplate: payload.data.data
            }
        case FETCH_EMAIL_CONTENT:
            return{
                ...state
            }
        case FETCH_EMAIL_CONTENT_SUCCESS:
            return{
                ...state,
                emailContent: payload.data.data
            }
        default:
            return state;
    }
}

export default reducer;