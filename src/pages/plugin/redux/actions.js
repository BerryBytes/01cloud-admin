const PLUGIN_PREFIX = "@PLUGIN";

export const FETCH_PLUGIN = `${PLUGIN_PREFIX}/FETCH_PLUGIN`;
export const FETCH_PLUGIN_SUCCESS = `${PLUGIN_PREFIX}/FETCH_PLUGIN_SUCCESS`;
export const FETCH_PLUGIN_FAILURE = `${PLUGIN_PREFIX}/FETCH_PLUGIN_FAILURE`;
export const FETCH_CATEGORY = `${PLUGIN_PREFIX}/FETCH_CATEGORY`;
export const FETCH_CATEGORY_SUCCESS = `${PLUGIN_PREFIX}/FETCH_CATEGORY_SUCCESS`;
export const FETCH_CATEGORY_FAILURE = `${PLUGIN_PREFIX}/FETCH_CATEGORY_FAILURE`;
export const DELETE_PLUGIN = `${PLUGIN_PREFIX}/DELETE_PLUGIN`;
export const DELETE_PLUGIN_SUCCESS = `${PLUGIN_PREFIX}/DELETE_PLUGIN_SUCCESS`;
export const DELETE_PLUGIN_FAILURE = `${PLUGIN_PREFIX}/DELETE_PLUGIN_FAILURE`;
export const UPDATE_BREADCRUMB = "UPDATE_BREADCRUMB";

const fetchPlugin = (page, size, search, sortColumn, sortDirection) => {
  return {
    type: FETCH_PLUGIN,
    data: {
      page, 
      size, 
      search, 
      sortColumn, 
      sortDirection
    }
  };
};

export const fetchCategories = () => {
  return {
    type: FETCH_CATEGORY,
  };
};

const deletePlugin = (id) => {
  return {
    type: DELETE_PLUGIN,
    data: {
      id,
    },
  };
};

const updateBreadcrumb = (payload) => ({
  type: UPDATE_BREADCRUMB,
  data: { payload },
});

export { fetchPlugin, deletePlugin, updateBreadcrumb };
