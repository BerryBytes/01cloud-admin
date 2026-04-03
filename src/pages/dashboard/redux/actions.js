const DASHBOARD_PREFIX = "@DASHBAORD";

export const FETCH_REVENUE_DATA = `${DASHBOARD_PREFIX}/REVENUE_DETAIL`;
export const FETCH_REVENUE_DATA_SUCCESS = `${DASHBOARD_PREFIX}/REVENUE_DETAIL_SUCCESS`;
export const FETCH_REVENUE_DATA_FAILURE = `${DASHBOARD_PREFIX}/REVENUE_DETAIL_FAILURE`;
export const UPDATE_BREADCRUMB = "UPDATE_BREADCRUMB";

const fetchRevenueData = () => ({
  type: FETCH_REVENUE_DATA,
});

const updateBreadcrumb = (payload) => ({
  type: UPDATE_BREADCRUMB,
  data: { payload },
});

export { fetchRevenueData, updateBreadcrumb };
