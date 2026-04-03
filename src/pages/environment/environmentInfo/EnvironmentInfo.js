import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ChartCard from "../../../components/chartcard/ChartCard";
import Skeleton from "react-loading-skeleton";
import { Tooltip } from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import AppsIcon from "@material-ui/icons/Apps";
import {
  fetchEnvironmentInsights,
  fetchEnvDetails,
  fetchEnvironmentStateInitiate,
  updateBreadcrumb,
} from "./redux/actions";
import "./environmentInfo.css";
import {
  convertToChartData,
  getDurationInSeconds,
  formatSizeUnits,
} from "../../../helpers/utils";
import paths from "../../../constants/paths";

const useStyles = () => ({
  durationDropdown: {
    minWidth: 120,
  },
  podDropdown: {
    minWidth: 180,
  },
});

export class EnvironmentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPod: "",
      selectedDuration: "Hour",
      eId: this.props.match.params.eId,
    };
  }

  componentDidMount() {
    this.props.fetchEnvDetails(this.state.eId);
    this.props.fetchEnvironmentStateInitiate(this.state.eId);
  }

  handlePodChange = (e) => {
    this.setState({
      selectedPod: e.target.value,
    });
  };

  handleDurationChange = (e) => {
    this.setState({
      selectedDuration: e.target.value,
    });
    this.getUsageData(this.props.environmentDetails.ID, e.target.value);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (
        (!this.props.environmentDetails.ID &&
          nextProps.environmentDetails.ID) ||
        this.props.environmentDetails.ID !== nextProps.environmentDetails.ID
      ) {
        this.getUsageData(
          nextProps.environmentDetails.ID,
          this.state.selectedDuration
        );
      }
      if (nextProps.environmentState.State) {
        if (
          nextProps.environmentState.PodStatus &&
          nextProps.environmentState.PodStatus.length > 0
        ) {
          const defaultPodSelected =
            nextProps.environmentState.PodStatus[0].PodName;
          this.setState({
            selectedPod: defaultPodSelected,
          });
        }
      }

      if (nextProps.environmentDetails.ID > 0) {
        const environmentDetails = nextProps.environmentDetails;
        const breadcrumbData = [
          {
            name: "Users",
            path: `${paths.USERS}`,
          },
          {
            name:
              environmentDetails.application.project.user.first_name +
              " " +
              environmentDetails.application.project.user.last_name,
            path: `${paths.USER_INFO.replace(
              ":userId",
              environmentDetails.application.project.user_id
            )}`,
          },
          {
            name: environmentDetails.application.project.name,
            path: `${paths.PROJECT_INFO.replace(
              ":pId",
              environmentDetails.application.project_id
            )}`,
          },
          {
            name: environmentDetails.name,
            path: `${paths.ENVIRONMENT_INFO.replace(
              ":eId",
              environmentDetails.ID
            )}`,
          },
        ];
        this.props.updateBreadcrumb(breadcrumbData);
      }
    }
  }

  getUsageData = (id, duration) => {
    const nowInS = Math.round(new Date().getTime() / 1000);
    let payload = {
      start_time: nowInS - getDurationInSeconds(duration),
      end_time: nowInS,
    };
    this.props.fetchEnvironmentInsights(id, payload);
  };

  render() {
    const { environmentInsights, environmentDetails, classes } = this.props;

    //CPU Usage chart
    const data_cpu_usage =
      this.state.selectedPod &&
      environmentInsights &&
      environmentInsights.cpu_usages &&
      environmentInsights.cpu_usages.length > 0 &&
      environmentInsights.cpu_usages.filter(
        (itm) => itm.metric.pod === this.state.selectedPod
      );
    const maxOfCPU =
      data_cpu_usage && data_cpu_usage.length > 0
        ? Math.max(...data_cpu_usage[0].values.map((o) => o[1]), 0)
        : 0;
    const unitObjectCPU = formatSizeUnits(maxOfCPU, 1);

    const data_memory_usage =
      this.state.selectedPod &&
      environmentInsights &&
      environmentInsights.memory_usages &&
      environmentInsights.memory_usages.length > 0 &&
      environmentInsights.memory_usages.filter(
        (itm) => itm.metric.pod === this.state.selectedPod
      );
    const maxOfRAM =
      data_memory_usage && data_memory_usage.length > 0
        ? Math.max(...data_memory_usage[0].values.map((o) => o[1]), 0)
        : 0;
    const unitObjectRAM = formatSizeUnits(maxOfRAM, 2);

    //Data Transfer chart
    let receive_tranfer_usage =
      this.state.selectedPod &&
      environmentInsights &&
      environmentInsights.data_transfer &&
      environmentInsights.data_transfer.receive &&
      environmentInsights.data_transfer.receive.filter(
        (itm) => itm.metric.pod === this.state.selectedPod
      );
    let transfer_tranfer_usage =
      this.state.selectedPod &&
      environmentInsights &&
      environmentInsights.data_transfer &&
      environmentInsights.data_transfer.transfer &&
      environmentInsights.data_transfer.transfer.filter(
        (itm) => itm.metric.pod === this.state.selectedPod
      );
    let data_transfer_usage = [];
    const maxValueOfY_Recieve =
      receive_tranfer_usage &&
      receive_tranfer_usage.length > 0 &&
      Math.max(...receive_tranfer_usage[0].values.map((o) => o[1]), 0);
    const maxValueOfY_Transfer =
      transfer_tranfer_usage &&
      transfer_tranfer_usage.length > 0 &&
      Math.max(...transfer_tranfer_usage[0].values.map((o) => o[1]), 0);
    const maxOfRT = Math.max(maxValueOfY_Recieve, maxValueOfY_Transfer);
    const unitObjectRT = formatSizeUnits(maxOfRT, 2);
    if (receive_tranfer_usage && receive_tranfer_usage.length > 0)
      data_transfer_usage.push({
        name: "receive",
        data: convertToChartData(
          receive_tranfer_usage[0].values,
          3,
          unitObjectRT
        ),
      });
    if (transfer_tranfer_usage && transfer_tranfer_usage.length > 0)
      data_transfer_usage.push({
        name: "transfer",
        data: convertToChartData(
          transfer_tranfer_usage[0].values,
          3,
          unitObjectRT
        ),
      });
    return (
      <div data-test="main-container">
        <div className="projectDetailsContainer">
          {environmentDetails &&
          environmentDetails.application &&
          environmentDetails.application.project &&
          environmentDetails.application.project.image ? (
            <div>
              <img
                src={
                  environmentDetails &&
                  environmentDetails.application &&
                  environmentDetails.application.project.image
                }
                alt="Project icon"
                height={60}
                width={60}
                data-test="project-icon"
                className="projecticonImg"
              />
            </div>
          ) : (
            <div className="square" data-test="square-icon">
              <DashboardIcon color="primary" className="projectIcon" />
            </div>
          )}
          
          <div className="projectDetailsSubContainer">
            <Typography color="textPrimary" variant="h5" data-test="environment-name">
              {environmentDetails ? (
                environmentDetails.name
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <div className="projectSubDetails">
              {environmentDetails && environmentDetails.application ? (
                <span>
                  <Tooltip title="App name">
                    <AppsIcon className="topIcon" />
                  </Tooltip>
                  <span style={{ position: "relative", top: "-1px" }} data-test="application-name">
                    {environmentDetails && environmentDetails.application
                      ? environmentDetails.application.name
                      : ""}
                  </span>
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
        </div>
        <Grid container justify="flex-end" spacing={1}>
          
          <Grid item>
            <FormControl variant="outlined" className={classes.podDropdown}>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.selectedPod}
                data-test="pod-status"
                onChange={this.handlePodChange}
                MenuProps={{
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                  getContentAnchorEl: null,
                }}
              >
                {this.props.environmentState &&
                  this.props.environmentState.PodStatus &&
                  this.props.environmentState.PodStatus.map((pods, ind) => (
                    <MenuItem key={ind} value={pods.PodName}>
                      {pods.PodName}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              variant="outlined"
              className={classes.durationDropdown}
            >
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.selectedDuration}
                data-test="duration-change"
                onChange={this.handleDurationChange}
                MenuProps={{
                  anchorOrigin: { vertical: "bottom", horizontal: "left" },
                  transformOrigin: { vertical: "top", horizontal: "left" },
                  getContentAnchorEl: null,
                }}
              >
                <MenuItem value={"Hour"}>last hour</MenuItem>
                <MenuItem value={"Day"}>last day</MenuItem>
                <MenuItem value={"Week"}>last week</MenuItem>
                <MenuItem value={"Month"}>last month</MenuItem>
                
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="m-t-20">
          <Grid container spacing={3}>
            {
              <Grid item sm={12} xs={12} md={4}>
                <ChartCard
                  title="Data Transfer"
                  lineColor="blue"
                  data-test="data-transfer"
                  data={
                    data_transfer_usage && data_transfer_usage.length > 0
                      ? data_transfer_usage
                      : []
                  }
                  suffix={unitObjectRT && unitObjectRT.Unit}
                />
              </Grid>
            }
            {
              <Grid item sm={12} xs={12} md={4}>
                <ChartCard
                  title="CPU Usage"
                  data-test="cpu-usage"
                  data={
                    data_cpu_usage && data_cpu_usage.length > 0
                      ? convertToChartData(
                          data_cpu_usage[0].values,
                          1,
                          unitObjectCPU
                        )
                      : []
                  }
                  lineColor="lightBlue"
                  suffix={unitObjectCPU && unitObjectCPU.Unit}
                />
              </Grid>
            }
            {
              <Grid item sm={12} xs={12} md={4}>
                <ChartCard
                  title="RAM"
                  data-test="ram"
                  data={
                    data_memory_usage && data_memory_usage.length > 0
                      ? convertToChartData(
                          data_memory_usage[0].values,
                          3,
                          unitObjectRAM
                        )
                      : []
                  }
                  lineColor="lightPink"
                  suffix={unitObjectRAM && unitObjectRAM.Unit}
                />
              </Grid>
            }
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  environmentDetails: state.EnvironmentInfoReducer.environmentDetails,
  environmentInsights: state.EnvironmentInfoReducer.environmentInsights,
  environmentState: state.EnvironmentInfoReducer.environmentState,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchEnvDetails: (payload) => dispatch(fetchEnvDetails(payload)),
    fetchEnvironmentStateInitiate: (id) =>
      dispatch(fetchEnvironmentStateInitiate(id)),
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),

    fetchEnvironmentInsights: (id, payload) =>
      dispatch(fetchEnvironmentInsights(id, payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(EnvironmentInfo)));
