import React, { Component } from "react";
import { connect } from "react-redux";
import PluginForm from "../PluginForm";
import { editPluginCall } from "../createplugin/redux/actions";
import { fetchPluginInfo } from "../plugininfo/redux/actions";
import { updateBreadcrumb } from "../redux/actions";
import paths from "../../../constants/paths";

export class EditPlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginId: this.props.match.params.id,
    };
  }

  editPlugin = (values) => {
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
    if(!values.is_add_on){     
      payload.add_ons =  values.add_ons
    }
    let iconPayload = null;
    if (values.pluginFile) {
      iconPayload = new FormData();
      iconPayload.append("file", values.pluginFile);
      iconPayload.append("file_name", values.pluginFile.name);
      iconPayload.append("file_type", values.pluginFile.type);
    }
    const pluginId = values.id;
    this.props.editPluginApiCall(
      pluginId,
      payload,
      iconPayload,
      this.props.history
    );
  };

  componentDidMount() {
    this.props.fetchPluginInfo(this.state.pluginId);
    const breadcrumbData = [
      { name: "Plugins ", path: `${paths.PLUGIN}` },
      {
        name: "Edit Plugin ",
        path: `${paths.EDIT_PLUGIN.replace(":id", this.state.pluginId)}`,
      },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  render() {
    const { history, t, pluginData } = this.props;

    return (
      <div data-test="main-container">
        <PluginForm
          data-test="form-container"
          history={history}
          t={t}
          pluginAction={this.editPlugin}
          edit={true}
          pluginData={pluginData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pluginData: state.PluginInfoReducer.pluginInfo,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchPluginInfo: (pluginId) => dispatch(fetchPluginInfo(pluginId)),
  editPluginApiCall: (id, payload, iconPayload, history) =>
    dispatch(editPluginCall(id, payload, iconPayload, history)),
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPlugin);
