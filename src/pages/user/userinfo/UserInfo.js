import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ConfirmActionPopup from "../../../components/confirmactionpopup/ConfirmActionPopup";
import {
  fetchUserInfo,
  fetchUserProjects,
  updateUserActiveStatus,
  updateUserAdminStatus,
  
} from "./redux/actions";
import { fetchProjectInsight } from "../projectinfo/redux/actions";
import { fetchSubscriptions } from "../../subscription/redux/actions";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./userInfo.css";
import { getDateInStandardFormat } from "../../../helpers/utils";

import paths from "../../../constants/paths";
import IconButton from "@material-ui/core/IconButton";

import { updateBreadcrumb } from "../redux/actions";
import VisibilityIcon from "@material-ui/icons/Visibility";
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

export const StyledTableRow = withStyles(() => ({
  root: {},
}))(TableRow);
export class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      projectInsights: {},
      isAdminStatusPopupOpened: false,
      isActiveStatusPopupOpened: false,
      adminStatus: null,
      activeStatus: null,
      columns: [
        {
          name: "sn",
          label: "S.N",
          options: {
            type: "number",
            filter: false,
            sort: true,
          },
        },
        {
          name: "id",
          label: "ID",
          options: {
            display: true,
          },
        },
        {
          name: "name",
          label: "Name",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          name: "apps",
          label: "Apps",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "status",
          label: "Status",
          options: {
            filter: true,
            sort: false,
          },
        },
      ],
      data: [],
    };
  }

  getProjectsList = (projectList) => {
    return projectList.map((project, ind) => {
      return {
        sn: ind + 1,
        id: project.id,
        name: project.name,
        apps: project.apps_count,
        status: project.active ? "Active" : "Inactive",
      };
    });
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.setState({
        data : this.getProjectsList(newProps.userProjects)
      })
      
    }
    if (
      newProps.userProjects &&
      newProps.userProjects !== this.props.userProjects
    ) {
      let projectInsights = {};
      const nowInS = Math.round(new Date().getTime() / 1000);
      const payload = {
        start_time: nowInS - 60000,
        end_time: nowInS,
      };
      newProps.userProjects.map((project) => {
        const _id = project.id;
        this.props.fetchProjectInsight(_id, payload);
        projectInsights[_id] = this.props.projectInsight;
      });
      this.setState({
        projectInsights: projectInsights,
      });
    }
    if (newProps.userInfo && newProps.userInfo.id) {
      const breadcrumbData = [
        { name: "Users ", path: `${paths.USERS}` },
        {
          name:
            newProps.userInfo.first_name + " " + newProps.userInfo.last_name,
          path: `${paths.USER_INFO.replace(":userId", newProps.userInfo.id)}`,
        },
      ];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  }

  componentDidMount() {
    this.props.fetchUserInfo(this.state.userId);
    this.props.fetchUserProjects(this.state.userId);
    this.props.fetchSubscriptions();
  }

  toggleUserActiveStatus = (e) => {
    this.setState({
      isActiveStatusPopupOpened: true,
      activeStatus: e.target.checked,
    });
  };

  handleActiveStatusAgreeHandler = () => {
    const userData = {
      id: this.state.userId,
      active: this.state.activeStatus,
    };

    this.props.updateUserActiveStatus(userData);
    this.setState({
      isActiveStatusPopupOpened: false,
    });
  };

  handleActiveStatusDisAgreeHandler = () => {
    this.setState({
      isActiveStatusPopupOpened: false,
    });
  };

  getSubscriptionName = (subId) => {
    if (this.props.subscriptionList) {
      return this.props.subscriptionList.find((x) => x.id === subId).name;
    }
  };

  toogleAdminStatus = (e) => {
    this.setState({
      isAdminStatusPopupOpened: true,
      adminStatus: e.target.checked,
    });
  };

  handleAdminStatusAgreeHandler = () => {
    const userData = {
      id: this.state.userId,
      is_admin: this.state.adminStatus,
    };
    this.props.updateUserAdminStatus(userData);
    this.setState({
      isAdminStatusPopupOpened: false,
    });
  };

  handleAdminStatusDisAgreeHandler = () => {
    this.setState({
      isAdminStatusPopupOpened: false,
    });
  };

  tabChanger = () => {
    this.props.history.goBack();
  }

  render() {
    const { userInfo, userProjects } = this.props;
    const {
      isActiveStatusPopupOpened,
      isAdminStatusPopupOpened,
      
    } = this.state;
    return (
      <div data-test="main-container">

        <BackButton clickHandler={() => this.tabChanger()} name="Back To Users List"/>

        <div className="userDetailsContainer">
          <div className="userInfoSquare">
            <Typography
              align="center"
              variant="h3"
              color="textPrimary"
              className="squareText"
              data-test="user-firstname"
            >
              {String(userInfo.first_name)[0].toUpperCase()}
            </Typography>
          </div>
          <div className="userDetailsSubContainer">
            <Typography color="textPrimary" className="userName" data-test="username">
              {userInfo.first_name} {userInfo.last_name}
            </Typography>
            <div className="userSubDetails">
              {userInfo ? (
                <span style={{ position: "relative", top: "-1px" }} data-test="user-email">
                  {userInfo.email}
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
          <div className="userDetailsSubContainer userId">
            <Typography color="textPrimary" className="userName">
              ID
            </Typography>
            <div className="userSubDetails">
              {userInfo ? (
                <span style={{ position: "relative", top: "-1px" }} data-test="userId">
                  {userInfo.id}
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
          <div className="userDetailsSubContainer">
            <Typography color="textPrimary" className="userName">
              Company
            </Typography>
            <div className="userSubDetails">
              {userInfo ? (
                <span style={{ position: "relative", top: "-1px" }} data-test="user-company">
                  {userInfo.company}
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
          <div className="userDetailsSubContainer">
            <Typography color="textPrimary" className="userName">
              Created
            </Typography>
            <div className="userSubDetails">
              {userInfo ? (
                <span style={{ position: "relative", top: "-1px" }} data-test="user-createdAt">
                  {getDateInStandardFormat(userInfo.createdat)}
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
          <div className="userDetailsSubContainer">
            <div className="userSubDetails">
              {userInfo ? (
                <span style={{ position: "relative", top: "-1px" }}>
                  <FormControlLabel
                    data-test="active-status"
                    control={
                      <Switch
                        id={String(userInfo.id)}
                        checked={Boolean(userInfo.active)}
                        onClick={this.toggleUserActiveStatus}
                        name="userActiveStatus"
                        color="primary"
                      />
                    }
                    label={userInfo.active ? "Active" : "Inactive"}
                  />
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>

          <ConfirmActionPopup
            data-test="approve-popup"
            open={isActiveStatusPopupOpened}
            handleAgree={() => this.handleActiveStatusAgreeHandler()}
            handleDisAgree={() => this.handleActiveStatusDisAgreeHandler()}
            message={`Are you sure you want to ${
              userInfo.active ? "Suspend" : "Unsuspend"
            } the user?`}
            yesText="Yes"
            noText="No"
          />
          <div className="userDetailsSubContainer">
            <div className="userSubDetails">
              {userInfo ? (
                <span style={{ position: "relative", top: "-1px" }}>
                  <FormControlLabel
                    data-test="is-admin"
                    control={
                      <Switch
                        id={String(userInfo.id)}
                        checked={Boolean(userInfo.is_admin)}
                        onClick={this.toogleAdminStatus}
                        name="userAdminStatus"
                        color="primary"
                      />
                    }
                    label={userInfo.is_admin ? "Admin" : "Not a Admin"}
                  />
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
          <ConfirmActionPopup
            data-test="admin-popup"
            open={isAdminStatusPopupOpened}
            handleAgree={() => this.handleAdminStatusAgreeHandler()}
            handleDisAgree={() => this.handleAdminStatusDisAgreeHandler()}
            message={`Are you sure you want to ${
              userInfo.is_admin
                ? "remove the user as an Admin"
                : "add the user as an admin"
            }?`}
            yesText="Yes"
            noText="No"
          />
        </div>
        <hr className="horizontalLine" />
        <div className="userProjectsContainer">
          
          <TableContainer component={Paper}>
            <Table data-test="projects-table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.N.</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Apps</StyledTableCell>
                  <StyledTableCell>Subscription</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userProjects &&
                  userProjects.map((project, ind) => (
                    <StyledTableRow
                      key={project.id}
                      onClick={() => {
                        this.props.history.push(
                          paths.PROJECT_INFO.replace(":pId", project.id)
                        );
                      }}
                    >
                      <StyledTableCell>{ind + 1}</StyledTableCell>
                      <StyledTableCell data-test="name">{project.name}</StyledTableCell>
                      <StyledTableCell data-test="count">{project.apps_count}</StyledTableCell>
                      <StyledTableCell data-test="sub-name">
                        {this.props.subscriptionList &&
                        this.props.subscriptionList.length
                          ? `${this.getSubscriptionName(
                              project.subscription_id
                            )}`
                          : ""}
                      </StyledTableCell>
                      <StyledTableCell>
                        {project.active ? (
                          <p>
                            <span className="activestatus" data-test="active"></span>
                            Active
                          </p>
                        ) : (
                          <p>
                            <span className="inactivestatus" data-test="inactive"></span> Inactive
                          </p>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Link
                          to={{
                            pathname: paths.PROJECT_INFO.replace(
                              ":pId",
                              project.id
                            ),
                          }}
                        >
                          <IconButton aria-label="edit" data-test="edit">
                            <VisibilityIcon />
                          </IconButton>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            {userProjects && userProjects.length === 0 ? (
              <div className="alignCenter" data-test="no-user-projects">
                <p>No Projects to Show</p>
              </div>
            ) : (
              ""
            )}
          </TableContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.UserInfoReducer.userInfo,
    userProjects: state.UserInfoReducer.userProjects,
    subscriptionList: state.SubscriptionReducer.subscriptionList,
    projectInsight: state.UserProjectInfoReducer.projectInsight,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo: (userId) => dispatch(fetchUserInfo(userId)),
    fetchUserProjects: (userId) => dispatch(fetchUserProjects(userId)),
    updateUserActiveStatus: (userData) => {
      dispatch(updateUserActiveStatus(userData));
    },
    updateUserAdminStatus: (userData) => {
      dispatch(updateUserAdminStatus(userData));
    },
    
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),
    fetchSubscriptions: () => dispatch(fetchSubscriptions()),
    fetchProjectInsight: (id, payload) =>
      dispatch(fetchProjectInsight(id, payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(UserInfo));
