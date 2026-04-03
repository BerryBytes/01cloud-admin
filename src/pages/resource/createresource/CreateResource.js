import React, { Component } from "react";
import { connect } from "react-redux";
import ResourceForm from "../ResourceForm";

import { createResourceCall } from "./redux/actions";
import { updateBreadcrumb } from "../redux/actions";
import paths from "../../../constants/paths";

export class CreateResource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCreateResource = (values) => {
    const payload = {
      name: values.resourceName,
      cores: parseInt(values.cores),
      memory: parseInt(values.memory),
      weight: parseInt(values.weight),
      active: values.active,
      attributes: "",
    };

    this.props.createResourceCall(payload, this.props.history);
  };

  componentDidMount() {
    const breadcrumbData = [
      { name: "Resources ", path: `${paths.RESOURCES}` },
      {
        name: "Add Resource",
        path: `${paths.CREATE_RESOURCE}`,
      },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  render() {
    const { history, t } = this.props;
    return (
      <div data-test="main-container">
        <ResourceForm
          data-test="resource-form"
          t={t}
          history={history}
          resourceAction={(values) => this.handleCreateResource(values)}
        />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  createResourceCall: (payload, history) =>
    dispatch(createResourceCall(payload, history)),
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateResource);
