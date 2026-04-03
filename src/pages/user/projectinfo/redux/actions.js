const PROJECT_INFO_PREFIX = "@PROJECT";
const PROJECT_INSIGHTS = "@PROJECT_INSIGHTS";

export const FETCH_PROJECT_INFO = `${PROJECT_INFO_PREFIX}/FETCH_PROJECT_INFO`;
export const FETCH_PROJECT_INFO_SUCCESS = `${PROJECT_INFO_PREFIX}/FETCH_PROJECT_INFO_SUCCESS`;
export const FETCH_PROJECT_INFO_FAILURE = `${PROJECT_INFO_PREFIX}/FETCH_PROJECT_INFO_FAILURE`;
export const FETCH_PROJECT_APPS = `${PROJECT_INFO_PREFIX}/FETCH_PROJECT_APP`;
export const FETCH_PROJECT_APPS_SUCCESS = `${PROJECT_INFO_PREFIX}/FETCH_PROJECT_APP_SUCCESS`;
export const FETCH_PROJECT_APPS_FAILURE = `${PROJECT_INFO_PREFIX}/FETCH_PROJECT_APP_FAILURE`;
export const FETCH_PROJECT_INSIGHTS = `${PROJECT_INSIGHTS}/FETCH`;
export const FETCH_PROJECT_INSIGHTS_SUCCESS = `${PROJECT_INSIGHTS}/FETCH_SUCCESS`;
export const FETCH_PROJECT_INSIGHTS_FAILURE = `${PROJECT_INSIGHTS}/FETCH_FAILURE`;

const fetchProjectApps = (id) => {
  return {
    type: FETCH_PROJECT_APPS,
    data: {
      id,
    },
  };
};

const fetchProjectInfo = (id) => {
  return {
    type: FETCH_PROJECT_INFO,
    data: {
      id,
    },
  };
};

const fetchProjectInsight = (id, payload) => {
  return {
    type: FETCH_PROJECT_INSIGHTS,
    data: {
      id,
      payload,
    },
  };
};
export { fetchProjectApps, fetchProjectInfo, fetchProjectInsight };
