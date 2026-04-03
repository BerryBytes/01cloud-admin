const CLUSTER_PREFIX = "@CLUSTER";

export const FETCH_CLUSTERS = `${CLUSTER_PREFIX}/FETCH_CLUSTERS`;
export const FETCH_CLUSTERS_SUCCESS = `${CLUSTER_PREFIX}/FETCH_CLUSTERS_SUCCESS`;
export const FETCH_CLUSTERS_FAILURE = `${CLUSTER_PREFIX}/FETCH_CLUSTERS_FAILURE`;
export const FETCH_CLUSTER = `${CLUSTER_PREFIX}/FETCH_CLUSTER`;
export const FETCH_CLUSTER_SUCCESS = `${CLUSTER_PREFIX}/FETCH_CLUSTER_SUCCESS`;
export const FETCH_CLUSTER_FAILURE = `${CLUSTER_PREFIX}/FETCH_CLUSTER_FAILURE`;
export const DELETE_CLUSTER = `${CLUSTER_PREFIX}/DELETE_CLUSTER`;
export const DELETE_CLUSTER_SUCCESS = `${CLUSTER_PREFIX}/DELETE_CLUSTER_SUCCESS`;
export const DELETE_CLUSTER_FAILURE = `${CLUSTER_PREFIX}/DELETE_CLUSTER_FAILURE`;
export const UPDATE_BREADCRUMB = 'UPDATE_BREADCRUMB'
const fetchClusters = () => {
  return {
    type: FETCH_CLUSTERS,
  };
};

const deleteCluster = (id) => {
  return {
    type: DELETE_CLUSTER,
    data: { id },
  };
};

const fetchCluster = (id) => {
  return {
    type: FETCH_CLUSTER,
    data: { id },
  };
};
const updateBreadcrumb = (payload) => ({ 
	type: UPDATE_BREADCRUMB,
	data: { payload } 
})

export { fetchClusters, deleteCluster, fetchCluster,updateBreadcrumb };
