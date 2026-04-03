const USER_PREFIX = "@USER";

export const FETCH_USERS = `${USER_PREFIX}/FETCH_USERS`;
export const FETCH_USERS_SUCCESS = `${USER_PREFIX}/FETCH_USERS_SUCCESS`;
export const FETCH_USERS_FAILURE = `${USER_PREFIX}/FETCH_USERS_FAILURE`;
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'

export const UPDATE_USER_QUOTA=`${USER_PREFIX}/UPDATE_USER_QUOTA`;
export const UPDATE_USER_QUOTA_SUCCESS=`${USER_PREFIX}/UPDATE_USER_QUOTA_SUCCESS`;
export const UPDATE_USER_QUOTA_FAILURE=`${USER_PREFIX}/UPDATE_USER_QUOTA_FAILURE`;
export const REINIT_USER_QOUTA=`${USER_PREFIX}/REINIT_USER_QOUTA`;

const fetchUsers = (page, size, search, sortColumn, sortDirection) => ({
  type: FETCH_USERS,
  data: {
	page, size, search, sortColumn, sortDirection
  }
});

const updateBreadcrumb = (payload) => ({ 
	type: UPDATE_BREADCRUMB,
	data: { payload } 
})

export const updateUserQuota=(quotaConfig)=>({
  type:UPDATE_USER_QUOTA,
  data:quotaConfig
})

export const updateUserQuotaSuccess=(userData)=>({
  type:UPDATE_USER_QUOTA_SUCCESS,
  data:userData
})

export const updateUserQuotaFailure=(updateError)=>({
  type:UPDATE_USER_QUOTA_FAILURE,
  error:updateError
})

export const reInitUserQuota=()=>({
  type:REINIT_USER_QOUTA
})
export { fetchUsers, updateBreadcrumb };
