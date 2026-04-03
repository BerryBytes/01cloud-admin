import React, { Component } from "react";
import { connect } from "react-redux";
import SubscriptionForm from "../SubscriptionForm";
import { editSubscriptionCall } from "../createsubscription/redux/actions";
import { fetchSubscription } from "../redux/actions";
import { updateBreadcrumb } from "../redux/actions";
import paths from "../../../constants/paths";

export class EditSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      subId: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.props.fetchSubData(this.state.subId);
    const breadcrumbData = [
      { name: "Subscriptions ", path: `${paths.SUBSCRIPTION}` },
      {
        name: "Edit Subscription",
        path: `${paths.EDIT_SUBSCRIPTION.replace(":id", this.state.subId)}`,
      },
    ];
    this.props.updateBreadcrumb(breadcrumbData);
  }

  editSubscription = (values) => {
    const payload = {
      name: values.subscriptionName,
      
      disk_space: parseFloat(values.diskSpace),
      memory: parseFloat(values.memory),
      data_transfer: parseFloat(values.dataTransfer),
      backups: parseInt(values.backups),
      cores: parseFloat(values.cores),
      apps: parseInt(values.apps),
      price: parseFloat(values.price),
      cron_job: parseInt(values.cron_job),
      ci_build: parseInt(values.ci_build),
      resource_list: {
        configmaps: parseInt(values.resource_list.configmaps),
        persistentvolumeclaims: parseInt(values.resource_list.persistentvolumeclaims),
        pods: parseInt(values.resource_list.pods),
        replicationcontrollers: parseInt(values.resource_list.replicationcontrollers),
        secrets: parseInt(values.resource_list.secrets),
        services: parseInt(values.resource_list.services),
        loadbalancers: parseInt(values.resource_list.loadbalancers),
        gpu: parseInt(values.resource_list.gpu),
      },
      price_list: {
        data_transfer: parseFloat(values.price_list.data_transfer),
        load_balancer: parseFloat(values.price_list.load_balancer),
      },
      active: values.active,
    };
    const subId = values.id;
    this.props.editSubscriptionApiCall(subId, payload, this.props.history);
  };

  render() {
    const { t, history, subscription } = this.props;

    return (
      <div data-test="main-container">
        <SubscriptionForm
          data-test="subscription-form"
          history={history}
          t={t}
          subscriptionAction={this.editSubscription}
          subData={subscription}
          edit={true}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subscription: state.SubscriptionReducer.subscription,
  };
};

const mapDispatchToProps = (dispatch) => ({
  editSubscriptionApiCall: (subId, payload, history) =>
    dispatch(editSubscriptionCall(subId, payload, history)),
  fetchSubData: (subId) => {
    dispatch(fetchSubscription(subId));
  },
  updateBreadcrumb: (breadCrumpData) =>
    dispatch(updateBreadcrumb(breadCrumpData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditSubscription);
