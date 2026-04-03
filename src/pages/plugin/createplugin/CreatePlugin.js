import React, { Component } from "react";
import { connect } from "react-redux";
import PluginForm from "../PluginForm";
import { createPluginCall } from "./redux/actions";
import "./createPlugin.css";
import { updateBreadcrumb } from "../redux/actions";
import paths from "../../../constants/paths";

export class CreatePlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createPlugin = (values) => {
    const payload = {
      name: values.pluginName,
      description: values.pluginDescription,
      attributes: values.attributes ? values.attributes : "",
      active: values.pluginActive,
      source_url: values.pluginSourceUrl,
      support_ci: values.support_ci,
      is_add_on: values.is_add_on,
      min_cpu: values.min_cpu,
      min_memory: values.min_memory,
      Categories: values.categories,
    };
    if (!values.is_add_on) {
      payload.add_ons = values.add_ons;
    }
    let iconPayload = null;
    if (values.pluginFile) {
      iconPayload = new FormData();
      iconPayload.append("file", values.pluginFile);
      iconPayload.append("file_name", values.pluginFile.name);
      iconPayload.append("file_type", values.pluginFile.type);
    }
    this.props.createPluginApiCall(payload, iconPayload, this.props.history);
  };

  componentDidMount() {
    const breadcrumbData = [
      { name: "Plugins ", path: `${paths.PLUGIN}` },
      { name: "Add Plugin ", path: `${paths.CREATE_PLUGIN}` },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  handleCancel = () => {
    this.props.history.push(`/plugin`);
  };

  render() {
    const { history, t } = this.props;

    return (
      <div data-test="main-container">
        <PluginForm history={history} t={t} pluginAction={this.createPlugin} data-test="form-container" />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  createPluginApiCall: (payload, iconPayload, history) =>
    dispatch(createPluginCall(payload, iconPayload, history)),
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlugin);
