import React, { Component } from "react";
import { connect } from "react-redux";
import ResourceForm from "../ResourceForm";
import { editResourceCall } from "../createresource/redux/actions";
import { fetchResource } from "../redux/actions";
import { updateBreadcrumb } from "../redux/actions";
import paths from "../../../constants/paths";

export class EditResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourceId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.fetchResourceData(this.state.resourceId);
    const breadcrumbData = [
      { name: "Resources ", path: `${paths.RESOURCES}` },
      {
        name: "Edit Resource",
        path: `${paths.EDIT_RESOURCE.replace(":id", this.state.resourceId)}`,
      },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  editResource = (values) => {
    const payload = {
      name: values.resourceName,
      memory: parseFloat(values.memory),
      cores: parseFloat(values.cores),
      weight: parseFloat(values.weight),
      active: values.active === true ? true : false,
    };
    const resourceId = values.id;

    this.props.editResourceApiCall(resourceId, payload, this.props.history);
  };

  render() {
    const { t, history, resource } = this.props;
    return (
      <div data-test="main-container">
        <ResourceForm
          data-test="resource-form"
          history={history}
          t={t}
          resourceData={resource}
          edit={true}
          resourceAction={(values) => this.editResource(values)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resource: state.ResourceReducer.resource,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editResourceApiCall: (id, payload, history) =>
    dispatch(editResourceCall(id, payload, history)),
  fetchResourceData: (id) => {
    dispatch(fetchResource(id));
  },
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditResource);
