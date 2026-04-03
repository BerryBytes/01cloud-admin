import React, { Component } from "react";
import { connect } from "react-redux";
import ClusterForm from "../ClusterForm";
import { createClusterCall } from "./redux/actions";
import paths from "../../../constants/paths";
import { updateBreadcrumb } from "../redux/actions";

export class CreateCluster extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createCluster = (values) => {
    let labels = "";
    if (values.label.length === 0) {
      labels = "";
    } else {
      labels = values.label.join(",");
    }
    const clusterData = new FormData();
    clusterData.append("name", values.clusterName);
    clusterData.append("context", values.clusterContext);
    clusterData.append("file", values.config);
    clusterData.append("token", values.clusterToken);
    clusterData.append("region", values.clusterRegion);
    clusterData.append("active", values.active);
    clusterData.append(
      "attributes",
      values.attributes ? values.attributes : ""
    );
    clusterData.append("zone", values.clusterZone);
    clusterData.append("provider", values.clusterProvider);
    clusterData.append("labels", labels);
    clusterData.append("prometheus_server_url", values.prometheus_server_url);
    clusterData.append("argo_server_url", values.argo_server_url);
    clusterData.append("image_repo_service", values.image_repo_service);
    clusterData.append("image_repo_username", values.image_repo_username);
    clusterData.append("image_repo_password", values.image_repo_password);
    clusterData.append("image_repo_project", values.image_repo_project);
    clusterData.append("dns_zone", values.dns_zone);
    clusterData.append("pv_capacity", values.pv_capacity);
    clusterData.append("storage_access_key", values.storage_access_key);
    clusterData.append("storage_secret_key", values.storage_secret_key);
    
    this.props.createClusterApiCall(clusterData, this.props.history);
  };
  componentDidMount() {
    const breadcrumbData = [
      { name: "Clusters ", path: `${paths.CLUSTER}` },
      { name: "Add Cluster ", path: `${paths.CREATE_CLUSTER}` },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  render() {
    const { history, t } = this.props;
    return (
      <div data-test="main-container">
        <ClusterForm
          data-test="form-container"
          history={history}
          t={t}
          clusterAction={this.createCluster}
        />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  createClusterApiCall: (payload, history) =>
    dispatch(createClusterCall(payload, history)),
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateCluster);
