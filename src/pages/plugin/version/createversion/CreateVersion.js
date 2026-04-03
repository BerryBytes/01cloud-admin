import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import { createVersionCall } from "../redux/actions";

import Skeleton from "react-loading-skeleton";
import VersionForm from "../VersionForm";
import { fetchPluginInfo } from "../../plugininfo/redux/actions";
import "./createVersion.css";
import { updateBreadcrumb } from "../../redux/actions";
import paths from "../../../../constants/paths";

export class CreateVersion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginId: this.props.match.params.id,
      package: null,
    };
  }

  createVersion = (values) => {
    let formData = null;
    if (values.package) {
      formData = new FormData();
      formData.append("package", values.package);
      formData.append("version", values.versionName);
      formData.append("change_logs", values.changeLog);
      formData.append("plugin_id", this.state.pluginId);
      formData.append("active", values.active);
      formData.append("attributes", values.atributes ? values.attributes : "");
      formData.append("upgradable", values.upgradable);

      this.props.addVersion(formData, this.props.history);
    }
  };

  componentDidMount() {
    this.props.fetchPluginInfo(this.state.pluginId);
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
          name: "Add Version ",
          path: `${paths.CREATE_VERSION.replace(":id", this.state.pluginId)}`,
        },
      ];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  }

  render() {
    const { pluginInfo, history, t } = this.props;
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
            versionAction={this.createVersion}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addVersion: (pluginData, history) =>
      dispatch(createVersionCall(pluginData, history)),
    fetchPluginInfo: (pluginId) => dispatch(fetchPluginInfo(pluginId)),
    updateBreadcrumb: (breadCrumpData) =>
      dispatch(updateBreadcrumb(breadCrumpData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(CreateVersion));
