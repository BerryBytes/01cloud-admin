const RESOURCE_PREFIX = "@RESOURCE";

export const FETCH_RESOURCES = `${RESOURCE_PREFIX}/FETCH_RESOURCES`;
export const FETCH_RESOURCES_SUCCESS = `${RESOURCE_PREFIX}/FETCH_RESOURCES_SUCCESS`;
export const FETCH_RESOURCES_FAILURE = `${RESOURCE_PREFIX}/FETCH_RESOURCES_FAILURE`;
export const FETCH_RESOURCE = `${RESOURCE_PREFIX}/FETCH_RESOURCE`;
export const FETCH_RESOURCE_SUCCESS = `${RESOURCE_PREFIX}/FETCH_RESOURCE_SUCCESS`;
export const FETCH_RESOURCE_FAILURE = `${RESOURCE_PREFIX}/FETCH_RESOURCE_FAILURE`;
export const DELETE_RESOURCE = `${RESOURCE_PREFIX}/DELETE_RESOURCE`;
export const DELETE_RESOURCE_SUCCESS = `${RESOURCE_PREFIX}/DELETE_RESOURCE_SUCCESS`;
export const DELETE_RESOURCE_FAILURE = `${RESOURCE_PREFIX}/DELETE_RESOURCE_FAILURE`;
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'

const fetchResources = () => ({
  type: FETCH_RESOURCES,
});

const fetchResource = (id) => ({
  type: FETCH_RESOURCE,
  data: {
    id,
  },
});

const deleteResource = (id) => ({
  type: DELETE_RESOURCE,
  data: {
    id,
  },
});
const updateBreadcrumb = (payload) => ({ 
	type: UPDATE_BREADCRUMB,
	data: { payload } 
})

export { fetchResources, fetchResource, deleteResource, updateBreadcrumb };
