import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import { editVersionCall, fetchVersionData } from "../redux/actions";

import Skeleton from "react-loading-skeleton";
import VersionForm from "../VersionForm";
import { fetchPluginInfo } from "../../plugininfo/redux/actions";
import { updateBreadcrumb } from "../../redux/actions";
import paths from "../../../../constants/paths";

export class EditVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginId: this.props.match.params.pluginId,
      versionId: this.props.match.params.versionId,
      package: null,
    };
  }

  editVersion = (values) => {
    let formData = null;
    formData = new FormData();
    if (values.package) {
      formData.append("package", values.package);
    }
    formData.append("version", values.versionName);
    formData.append("change_logs", values.changeLog);
    formData.append("plugin_id", this.state.pluginId);
    formData.append("active", values.active);
    formData.append("attributes", values.atributes ? values.attributes : "");

    this.props.editVersion(
      this.state.versionId,
      this.state.pluginId,
      formData,
      this.props.history
    );
  };

  componentDidMount() {
    this.props.fetchPluginInfo(this.state.pluginId);
    this.props.fetchVersionInfo(this.state.versionId);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.pluginInfo && newProps.pluginInfo.ID > 0) {
      const breadcrumbData = [
        { name: "Plugins ", path: `${paths.PLUGIN}` },
        {
          name: newProps.pluginInfo.name,
          path: `${paths.PLUGIN_INFO.replace(":id", this.state.pluginId)}`,
        },
        {
          name: "Edit Version ",
          path: `${paths.EDIT_VERSION.replace(
            ":pluginId",
            this.state.pluginId
          ).replace("versionId", this.state.versionId)}`,
        },
      ];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  }

  render() {
    const { pluginInfo, history, t, versionData } = this.props;
    const { pluginId } = this.state;
    return (
      <div data-test="main-container">
        <div className="pluginDetailsContainer">
          <div className="square">
            <img
              data-test="plugin-image"
              src={pluginInfo ? pluginInfo.image : ""}
              alt="Plugin"
              width={50}
            />
          </div>
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
        <div className="createVersionContainer">
          <VersionForm
            data-test="version-form"
            history={history}
            t={t}
            versionAction={this.editVersion}
            edit={true}
            versionData={versionData}
            pluginId={pluginId}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pluginInfo: state.PluginInfoReducer.pluginInfo,
    versionData: state.VersionReducer.version,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editVersion: (id, plugin_id, payload, history) =>
      dispatch(editVersionCall(id, plugin_id, payload, history)),

    fetchPluginInfo: (pluginId) => dispatch(fetchPluginInfo(pluginId)),
    fetchVersionInfo: (versionId) => dispatch(fetchVersionData(versionId)),
    updateBreadcrumb: (breadCrumpData) =>
      dispatch(updateBreadcrumb(breadCrumpData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(EditVersion));
