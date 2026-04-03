import React, { Component } from "react";

import { Grid } from "@material-ui/core";
import TotalUsersCard from "../../components/totaluserscard/TotalUsersCard";
import TotalProjectsCard from "../../components/totalprojectscard/TotalProjectsCard";
import TotalSubscriptionList from "../../components/totalsubscriptionlist/TotalSubscriptionList";
import TotalSubscriptionChart from "../../components/totalsubscriptionchart/TotalSubscriptionChart";
import TotalClustersCard from "../../components/totalclusterscard/TotalClustersCard";
import TotalEnvironmentsCard from "../../components/totalenvironmentscard/TotalEnvironmentsCard";
import TotalAppsCard from "../../components/totalappscard/TotalAppsCard";
import TotalPluginsCard from "../../components/totalpluginscard/TotalPluginsCard";
import TotalResourcesCard from "../../components/totalresourcescard/TotalResourcesCard";
import LineChart from "../../components/charts/LineChart";
import { fetchRevenueData } from "./redux/actions";
import { withTranslation } from "react-i18next";
import { updateBreadcrumb } from "./redux/actions";

import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchRevenueData();
  }
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.dashboardData) {
      this.props.updateBreadcrumb([
        {
          name: "Home",
          path: "/dashboard",
        },
      ]);
    }
  };

  render() {
    const { dashboardData } = this.props;
    return (
      <div>
        <Grid container spacing={4}>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalUsersCard data={dashboardData && dashboardData.users} />
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalPluginsCard data={dashboardData && dashboardData.plugins} />
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalClustersCard data={dashboardData && dashboardData.clusters} />
          </Grid>
          <Grid item lg={12} sm={12}>
            <LineChart
              data={
                dashboardData &&
                dashboardData.transactions &&
                dashboardData.transactions?.transaction_data
              }
            />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProjectsCard data={dashboardData && dashboardData.projects} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalAppsCard data={dashboardData && dashboardData.applications} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalEnvironmentsCard
              data={dashboardData && dashboardData.environments}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalResourcesCard
              data={dashboardData && dashboardData.resources}
            />
          </Grid>
          <Grid item lg={8} sm={12}>
            <TotalSubscriptionList
              data={dashboardData && dashboardData.subscriptions}
            />
          </Grid>

          <Grid item lg={4} sm={12}>
            <TotalSubscriptionChart
              data={dashboardData && dashboardData.subscriptions}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dashboardData: state.DashboardReducer.dashboardData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRevenueData: () => dispatch(fetchRevenueData()),
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Dashboard));
