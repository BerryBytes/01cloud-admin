import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { fetchProjectApps, fetchProjectInfo } from "./redux/actions";
import { spaceConversion, coreConversion } from "../../../helpers/utils";
import { fetchUserInfo } from "../userinfo/redux/actions";
import { updateBreadcrumb } from "../redux/actions";
import UsageCard from "../../../components/usagecard/UsageCard";
import Skeleton from "react-loading-skeleton";
import { Tooltip } from "@material-ui/core";
import AppsIcon from "@material-ui/icons/Apps";
import MemoryIcon from "@material-ui/icons/Memory";
import WebIcon from "@material-ui/icons/Web";
import ReceiptIcon from "@material-ui/icons/Receipt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import "./projectinfo.css";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Grid,
  Typography,
  Box,
  Link
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import paths from "../../../constants/paths";
import { connect } from "react-redux";
import { compose } from "redux";
import "./projectinfo.css";
import BackButton from "../../../components/button/BackButton";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: "grey",
    fontWeight: 500,
  },
  body: {
    color: "#555",
    fontSize: 14,
  },
}))(TableCell);

const useStyles = (theme) => {
  return {
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
  };
};

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

export function Row(props) {
  const { row, ind } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root} onClick={() => setOpen(!open)}>
        <TableCell component="th" scope="row">
          {ind + 1}
        </TableCell>
        <TableCell data-test="name">{row.name}</TableCell>
        <TableCell data-test="environments">{row.environments && row.environments.length}</TableCell>
        <TableCell data-test="memory">
          {row.total_memory && spaceConversion(row.total_memory)}
        </TableCell>
        <TableCell data-test="cores">
          {row.total_cores && coreConversion(row.total_cores)}
        </TableCell>
        <TableCell data-test="active">{row.active ? "Active" : "Inactive"}</TableCell>
        <TableCell>
          {row.environments && row.environments.length > 0 ? (
            <IconButton
              aria-label="expand row"
              size="small"
              data-test="icon-button"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            ""
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, background: "#eeeeee" }}
          colSpan={12}
        >
          <Collapse in={open} data-test="collapse" timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" gutterBottom component="div" data-test="env-name">
                Environments
              </Typography>
              <Table size="small" aria-label="purchases" data-test="env-table">
                <TableHead>
                  <TableRow className="thheader">
                    <TableCell>S.N</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Replicas</TableCell>
                    <TableCell>Memory</TableCell>
                    <TableCell>Cores</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.environments &&
                    row.environments.map((env, envInd) => (
                      <TableRow key={envInd}>
                        <TableCell component="th" scope="row">
                          {envInd + 1}
                        </TableCell>
                        <TableCell component="th" scope="row" data-test="environment-name">
                          <Link
                            href={`${window?.config?.REACT_APP_01CLOUD_CONSOLE_URL}${paths.ENVIRONMENT_INFO.replace(
                              ":eId",
                              env.id
                            )}`}
                            target="_blank"
                            underline="always"
                          >
                            {env.name}
                          </Link>
                        </TableCell>
                        <TableCell data-test="env-replicas">{env.replicas}</TableCell>
                        <TableCell data-test="env-memory">
                          {env.resource && spaceConversion(env.resource.memory)}
                        </TableCell>
                        <TableCell data-test="env-cores">
                          {env.resource && coreConversion(env.resource.cores)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: this.props.match.params.pId,
      userId: this.props.match.params.uId,
      environments: {},
      projectInfo: this.props.location.projectInfo,
      userInfo: this.props.location.userInfo,
      expanded: {},
      projectApps: [],
      
    };
  }
  componentDidMount() {
    this.props.fetchProjectApps(this.state.projectId);
    this.props.fetchProjectInfo(this.state.projectId);
    
  }

  calculateProjectInfo(projectInfo, projectApps) {
    let _projectInfo = { ...projectInfo };
    let _projectApps = [];

    const total_apps = projectInfo.subscription.apps;
    const total_cores = projectInfo.subscription.cores * total_apps;
    const total_memory = projectInfo.subscription.memory * total_apps;
    
    projectApps &&
      projectApps.map((app) => {
        let _appInfo = { ...app };
        let total_app_memory = 0;
        let total_app_cores = 0;
        for (let i = 0; i < app.environments.length; i++) {
          total_app_memory +=
            app.environments[i].resource.memory * app.environments[i].replicas;
          total_app_cores +=
            app.environments[i].resource.cores * app.environments[i].replicas;
        }

        _appInfo.total_memory = total_app_memory;
        _appInfo.total_cores = total_app_cores;
        _projectApps.push(_appInfo);
      });
    let total_project_memory = 0;
    let total_project_cores = 0;
    
    for (let j = 0; j < _projectApps.length; j++) {
      const project = _projectApps[j];
      total_project_memory += project.total_memory;
      total_project_cores += project.total_cores;
    }
    _projectInfo.available_apps_count = total_apps - projectInfo.apps_count;
    _projectInfo.available_memory = total_memory - total_project_memory;
    _projectInfo.available_cores = total_cores - total_project_cores;
    _projectInfo.total_apps = total_apps;
    _projectInfo.total_memory = total_memory;
    _projectInfo.total_cores = total_cores;
    _projectInfo.used_apps = projectInfo.apps_count;
    _projectInfo.used_memory = total_project_memory;
    _projectInfo.used_cores = total_project_cores;
    this.setState({
      projectApps: _projectApps,
      projectInfo: _projectInfo,
    });
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.projectApps &&
      newProps.userInfo &&
      newProps.projectInfo &&
      newProps.projectInfo.subscription &&
      newProps.projectInfo.user
    ) {
      const breadcrumbData = [
        { name: "Users", path: `${paths.USERS}` },
        {
          name:
            newProps.projectInfo.user.first_name +
            " " +
            newProps.projectInfo.user.last_name,
          path: `${paths.USER_INFO.replace(
            ":userId",
            newProps.projectInfo.user.id
          )}`,
        },
        {
          name: newProps.projectInfo.name,
          path: `${paths.PROJECT_INFO.replace(
            ":pId",
            newProps.projectInfo.id
          )}`,
        },
      ];
      this.props.updateBreadcrumb(breadcrumbData);

      this.calculateProjectInfo(newProps.projectInfo, newProps.projectApps);
    }
  }

  handleExpandClick = (appId) => {
    this.setState({
      expanded: {
        ...this.state.expanded,
        [`${appId}`]: !this.state.expanded[`${appId}`],
      },
    });
  };

  render() {
    
    const { projectApps, projectInfo } = this.state;
    return (
      <div data-test="main-container">
      <BackButton clickHandler={() => this.props.history.goBack()} name="Back To Project List"/>
        <div className="projectDetailsContainer">
          {projectInfo && projectInfo.image ? (
            <div>
              <img
                src={projectInfo.image}
                alt="Project icon"
                height={60}
                width={60}
                data-test="projectImage"
                className="projecticonImg"
              />
            </div>
          ) : (
            <div className="square">
              <DashboardIcon color="primary" className="projectIcon" data-test="dashboard-icon"/>
            </div>
          )}
          <div className="projectDetailsSubContainer">
            <Typography color="textPrimary" variant="h5" data-test="project-name">
              {projectInfo && projectInfo.name ? (
                projectInfo.name
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <div className="projectSubDetails">
              {projectInfo && projectInfo.subscription ? (
                <span>
                  <Tooltip title="Subscription Package">
                    <ReceiptIcon className="topIcon" />
                  </Tooltip>
                  <span style={{ position: "relative", top: "-1px" }} data-test="subscription-name">
                    {projectInfo && projectInfo.subscription
                      ? projectInfo.subscription.name
                      : ""}
                  </span>
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
        </div>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <UsageCard
              data-test="app-card"
              icon={<AppsIcon />}
              colorClass="app"
              title="Apps Usage"
              data={{
                total: projectInfo?.total_apps,
                available: projectInfo?.available_apps_count,
                used: projectInfo?.used_apps,
                used_percentage: parseInt(
                  (projectInfo?.used_apps / projectInfo?.total_apps) * 100
                ),
              }}
            />
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <UsageCard
              data-test="memory-card"
              icon={<MemoryIcon />}
              colorClass="memory"
              title="Memory Usage"
              data={{
                total: spaceConversion(projectInfo?.total_memory),
                available: spaceConversion(projectInfo?.available_memory),
                used: spaceConversion(projectInfo?.used_memory),
                used_percentage: parseInt(
                  (projectInfo?.used_memory / projectInfo?.total_memory) * 100
                ),
              }}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <UsageCard
              data-test="cores-card"
              icon={<WebIcon />}
              colorClass="core"
              title="Cores Usage"
              data={{
                total: coreConversion(projectInfo?.total_cores),
                available: coreConversion(projectInfo?.available_cores),
                used: projectInfo?.used_cores
                  ? coreConversion(projectInfo?.used_cores)
                  : 0,
                used_percentage: parseInt(
                  (projectInfo?.used_cores / projectInfo?.total_cores) * 100
                ),
              }}
            />
          </Grid>
          <Grid item lg={12} sm={12}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table" data-test="projects-table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>S.N.</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Environments</StyledTableCell>
                    <StyledTableCell>Used Memory</StyledTableCell>
                    <StyledTableCell>Used Cores</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectApps &&
                    projectApps.map((app, ind) => (
                      <Row key={ind} row={app} ind={ind} data-test="row" />
                    ))}
                </TableBody>
              </Table>
              {projectApps && projectApps.length === 0 ? (
                <div className="alignCenter" data-test="no-apps">
                  <p>No Apps to Show</p>
                </div>
              ) : (
                ""
              )}
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projectApps: state.UserProjectInfoReducer.projectApps,
    token: state.AuthReducer.token,
    projectInfo: state.UserProjectInfoReducer.projectInfo,
    userInfo: state.UserInfoReducer.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),
    fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId)),
    fetchProjectApps: (projectId) => {
      dispatch(fetchProjectApps(projectId));
    },
    fetchProjectInfo: (projectId) => {
      dispatch(fetchProjectInfo(projectId));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(useStyles, {
    name: "ProjectInfo",
  })
)(withTranslation()(ProjectInfo));
