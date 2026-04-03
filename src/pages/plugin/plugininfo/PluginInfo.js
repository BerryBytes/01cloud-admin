import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPluginVersion, fetchPluginInfo } from "./redux/actions";
import { deleteVersionCall } from "../version/redux/actions";
import { Grid, Paper, Typography, Button, Divider } from "@material-ui/core";

import { withTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import { getDateInStandardFormat } from "../../../helpers/utils";
import Skeleton from "react-loading-skeleton";
import "./pluginInfo.css";
import paths from "../../../constants/paths";
import { updateBreadcrumb } from "../redux/actions";
import ConfirmActionPopup from "../../../components/confirmactionpopup/ConfirmActionPopup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PluginAddonsList from "../PluginAddonsList";

export class PluginInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginId: this.props.match.params.id,
      isDeletePopupOpened: false,
      selectedVersionId: undefined,
    };
  }

  deletePopupAgreeHandler = () => {
    const payload = {
      id: this.state.selectedVersionId,
      plugin_id: this.state.pluginId,
    };
    this.props.deleteVersion(payload);
    this.setState({
      selectedVersionId: undefined,
      isDeletePopupOpened: false,
    });
  };

  deletePopupDisagreeHandler = () => {
    this.setState({
      selectedVersionId: undefined,
      isDeletePopupOpened: false,
    });
  };

  handleVersionDelete = (versionId) => {
    this.setState({
      selectedVersionId: versionId,
      isDeletePopupOpened: true,
    });
  };

  handleVersionEdit = (versionId) => {
    this.props.history.push(
      `${paths.EDIT_VERSION.replace(":pluginId", this.state.pluginId).replace(
        ":versionId",
        versionId
      )}`
    );
  };

  componentDidMount() {
    this.props.fetchPluginVersion(this.state.pluginId);
    this.props.fetchPluginInfo(this.state.pluginId);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.pluginInfo && newProps.pluginInfo.id) {
      const breadcrumbData = [
        { name: "Plugins ", path: `${paths.PLUGIN}` },
        {
          name: newProps.pluginInfo.name,
          path: `${paths.PLUGIN_INFO.replace(":id", newProps.pluginInfo.id)}`,
        },
      ];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  }

  render() {
    const { pluginVersion, pluginInfo } = this.props;
    const { pluginId, isDeletePopupOpened } = this.state;
    return (
      <div data-test="main-container">
        <div className="pluginDetailsContainer">
          <img
            data-test="plugin-image"
            src={pluginInfo ? pluginInfo.image : ""}
            alt="Plugin"
            width={50}
          />
          <div className="pluginDetailsSubContainer">
            <Typography
              data-test="plugin-name"
              color="textPrimary"
              variant="h5"
              className="pluginTitle"
            >
              {pluginInfo ? pluginInfo.name : <Skeleton width={100} />}
            </Typography>
            <div className="pluginSubDetails">
              {pluginInfo ? (
                <span style={{ position: "relative", top: "-1px" }} data-test="plugin-description">
                  {pluginInfo ? pluginInfo.description : ""}
                </span>
              ) : (
                <Skeleton width={100} />
              )}
            </div>
          </div>
        </div>
        <div className="versionContainer">
          <Typography color="textPrimary" variant="h5" className="versionTitle" data-test="plugin-versionTitle">
            Versions
          </Typography>
          <span className="rightbtn">
            <Link to={paths.CREATE_VERSION.replace(":id", this.state.pluginId)}>
              <Button color="primary" variant="contained" data-test="plugin-addVersion">
                Add Version
              </Button>
            </Link>
          </span>
          <Grid container spacing={2}>
            {pluginVersion && pluginVersion.length > 0 ? (
              pluginVersion.map((plugin, ind) => (
                <Grid item md={4} xs={12} key={ind}>
                  <Paper variant="outlined" style={{ padding: "1rem" }}>
                    <Typography variant="h5" className="versionTitlecard" data-test="plugin-version">
                      {plugin.version}
                    </Typography>
                    <Typography data-test="plugin-createdAt">
                      {getDateInStandardFormat(plugin.createdat)}
                    </Typography>
                    <Typography>
                      <IconButton
                        data-test="plugin-deleteIcon"
                        aria-label="delete"
                        onClick={() => this.handleVersionDelete(plugin.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <ConfirmActionPopup
                        data-test="plugin-deletePopup"
                        open={isDeletePopupOpened}
                        handleAgree={() => this.deletePopupAgreeHandler()}
                        handleDisAgree={() => this.deletePopupDisagreeHandler()}
                        message={`Are you sure you want to delete the Version?`}
                        yesText="Yes"
                        noText="No"
                      />
                      <Link
                        to={{
                          pathname: `${paths.EDIT_VERSION.replace(
                            ":pluginId",
                            pluginId
                          ).replace(":versionId", plugin.id)}`,
                        }}
                      >
                        <IconButton aria-label="edit" data-test="plugin-edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item>
                <Typography
                  color="textPrimary"
                  align="center"
                  variant="h5"
                  className="no-version"
                  data-test="no-version"
                >
                  No Versions added
                </Typography>
              </Grid>
            )}
          </Grid>
          <Divider />
          {pluginInfo?.AddOns?.length > 0 && (
            <Grid container class="m-t-20">
              <PluginAddonsList viewMode={true} AddOns={pluginInfo.AddOns} data-test="plugin-addons" />
            </Grid>
          )} 

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pluginVersion: state.PluginInfoReducer.pluginVersion,
    pluginInfo: state.PluginInfoReducer.pluginInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteVersion: (payload) => dispatch(deleteVersionCall(payload)),
    fetchPluginVersion: (pluginId) => dispatch(fetchPluginVersion(pluginId)),
    fetchPluginInfo: (pluginId) => dispatch(fetchPluginInfo(pluginId)),
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PluginInfo));
