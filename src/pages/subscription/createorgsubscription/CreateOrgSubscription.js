import React from 'react'
import { connect } from 'react-redux'
import OrganizationSubscriptionForm from '../OrganizationSubscriptionForm'
import { createOrgSubscription } from "../redux/actions";
import { updateBreadcrumb } from "../redux/actions";
import paths from '../../../constants/paths';
import BackdropLoader from "../../../components/loader/BackdropLoader";

export const CreateOrgSubscription = (props) => {
    const { t, history } = props;

    React.useEffect(() => {
        const breadcrumbData = [
            { name: "Org Subscriptions ", path: `${paths.ORG_SUBSCRIPTION}` },
            { name: "Add Subscription ", path: `${paths.CREATE_ORG_SUBSCRIPTION}` },
        ];
        props.updateBreadcrumb(breadcrumbData);
    }, [])

    const createSubscription = (values) => {
        const payload = {
            name: values.name,
            
            memory: parseFloat(values.memory) ?? 0,
            cores: parseFloat(values.cores) ?? 0,
            apps: parseInt(values.apps) ?? 0,
            cluster: parseInt(values.cluster) ?? 0,
            price: parseFloat(values.price) ?? 0,
            weight: parseFloat(values.weight) ?? 0,
            active: values.active,
            attributes: values.attributes ?? "",
            no_of_user: parseInt(values.no_of_user) ?? 0
        };
        props.createOrgSubscription(payload, props.history);
    };

    return (
        <div data-test="main-container">
            <OrganizationSubscriptionForm
                data-test="orgSubscription-form"
                history={history}
                t={t}
                subscriptionAction={createSubscription}
            />
            {props.creatingSubscription && <BackdropLoader message="Creating Organizaion Subscription" data-test="creating-subscription" />}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        creatingSubscription: state.SubscriptionReducer.creatingSubscription,
    };
};

const mapDispatchToProps = (dispatch) => ({
    createOrgSubscription: (payload, history) =>
        dispatch(createOrgSubscription(payload, history)),
    updateBreadcrumb: (breadCrumpData) =>
        dispatch(updateBreadcrumb(breadCrumpData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrgSubscription)
