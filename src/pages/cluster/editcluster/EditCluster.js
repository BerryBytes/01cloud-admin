import React, { Component } from "react";
import { connect } from "react-redux";
import ClusterForm from "../ClusterForm";
import { editClusterCall } from "../createcluster/redux/actions";
import { fetchCluster } from "../redux/actions";
import paths from "../../../constants/paths";
import { updateBreadcrumb } from "../redux/actions";

export class EditCluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterId: this.props.match.params.id,
    };
  }

  editCluster = (values) => {
    let labels = "";
    if (values.label.length === 0) {
      labels = "";
    } else {
      labels = values.label.join(",");
    }
    const clusterData = new FormData();
    clusterData.append("name", values.clusterName);
    clusterData.append("context", values.clusterContext);
    if (values.config) {
      clusterData.append("file", values.config);
    }
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
    clusterData.append("attributes", "");
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
    
    const clusterId = values.id;

    this.props.editClusterApiCall(clusterId, clusterData, this.props.history);
  };
  componentDidMount() {
    this.props.fetchClusterData(this.state.clusterId);
    const breadcrumbData = [
      { name: "Clusters ", path: `${paths.CLUSTER}` },
      {
        name: "Edit Cluster ",
        path: `${paths.EDIT_CLUSTER.replace(":id", this.state.clusterId)}`,
      },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  render() {
    const { history, t, cluster } = this.props;
    return (
      <div data-test="main-container">
        <ClusterForm
          data-test="form-container"
          history={history}
          t={t}
          clusterAction={this.editCluster}
          edit={true}
          clusterData={cluster}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cluster: state.ClusterReducer.cluster,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchClusterData: (id) => dispatch(fetchCluster(id)),
  editClusterApiCall: (id, payload, history) =>
    dispatch(editClusterCall(id, payload, history)),
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCluster);
