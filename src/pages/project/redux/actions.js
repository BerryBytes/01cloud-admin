const PROJECT_DETAILS_PREFIX = '@PROJECT_DETAILS';

export const FETCH_PROJECT_DETAIL = `${ PROJECT_DETAILS_PREFIX }/PROJECT_DETAIL`
export const FETCH_PROJECT_DETAIL_SUCCESS = `${ PROJECT_DETAILS_PREFIX }/PROJECT_DETAIL_SUCCESS`
export const FETCH_PROJECT_APPLIST = `${ PROJECT_DETAILS_PREFIX }/FETCH_PROJECT_APPLIST`
export const FETCH_PROJECT_APPLIST_SUCCESS = `${ PROJECT_DETAILS_PREFIX }/FETCH_PROJECT_APPLIST_SUCCESS`
export const EDIT_PROJECT_CALL = `${ PROJECT_DETAILS_PREFIX }/EDIT_PROJECT`
export const DELETE_PROJECT_CALL = `${ PROJECT_DETAILS_PREFIX }/DELETE_PROJECT`
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'
export const FETCH_PROJECT_ACTIVITIES = `${ PROJECT_DETAILS_PREFIX }/FETCH_PROJECT_ACTIVITIES`
export const FETCH_PROJECT_ACTIVITIES_SUCCESS = `${ PROJECT_DETAILS_PREFIX }/FETCH_PROJECT_ACTIVITIES_SUCCESS`
export const FETCH_PROJECT_INSIGHT = `${ PROJECT_DETAILS_PREFIX }/FETCH_PROJECT_INSIGHT`
export const FETCH_PROJECT_INSIGHT_SUCCESS = `${ PROJECT_DETAILS_PREFIX }/FETCH_PROJECT_INSIGHT_SUCCESS`

const fetchProjectDetails = (id) => ({
	type: FETCH_PROJECT_DETAIL,
	data: { id }
})

const fetchAppListByPID = (id) => ({
	type: FETCH_PROJECT_APPLIST,
	data: { id }
})

const editProjectApiCall = (payload , id) => ({
	type: EDIT_PROJECT_CALL,
	data: {
		payload,
		id,
	}
})

const deleteProjectApiCall = (id , history) => ({
	type: DELETE_PROJECT_CALL,
	data: {
		id,
		history,
	}
})

const updateBreadcrumb = (payload) => ({ 
	type: UPDATE_BREADCRUMB,
	data: { payload } 
})

const fetchProjectActivities = (id) => ({
	type: FETCH_PROJECT_ACTIVITIES,
	data: { id }
})

const fetchProjectInsights = (id) => ({
	type: FETCH_PROJECT_INSIGHT,
	data: { id }
})

export {
	fetchProjectDetails,
	fetchAppListByPID,
	deleteProjectApiCall,
	editProjectApiCall,
	updateBreadcrumb,
	fetchProjectActivities,
	fetchProjectInsights
}