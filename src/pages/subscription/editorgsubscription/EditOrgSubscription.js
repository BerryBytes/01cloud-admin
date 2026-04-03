import React from 'react'
import { connect } from 'react-redux'
import OrganizationSubscriptionForm from '../OrganizationSubscriptionForm'
import { updateBreadcrumb } from "../redux/actions";
import { editOrgSubscription, fetchOrgSubscription } from "../redux/actions";
import paths from '../../../constants/paths';
import BackdropLoader from "../../../components/loader/BackdropLoader";

export const EditOrgSubscription = (props) => {
    const { t, history } = props;

    React.useEffect(() => {
        const breadcrumbData = [
            { name: "Org Subscriptions ", path: `${paths.ORG_SUBSCRIPTION}` },
            { name: "Update Subscription ", path: `${paths.EDIT_ORG_SUBSCRIPTION}` },
        ];
        props.updateBreadcrumb(breadcrumbData);
    }, [])

    React.useEffect(() => {
        if (props.match.params) {
            props.fetchOrgSubscription(props.match.params.id);
        }
    }, [props?.match?.params?.id])

    const updateSubscription = (values) => {
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
        props.editOrgSubscription(props?.match?.params?.id, payload, props.history);
    };

    return (
        <div data-test="main-container">
            {props.orgSubscription && (
                <OrganizationSubscriptionForm
                    data-test="orgSubscription-form"
                    history={history}
                    t={t}
                    subscriptionAction={updateSubscription}
                    edit={true}
                    subData={props.orgSubscription}
                />
            )}
            {props.editingSubscription && (<BackdropLoader message={"Updating Subscription"} data-test="editing-subscription"/>)}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        orgSubscription: state.SubscriptionReducer.orgSubscription,
        editingSubscription: state.SubscriptionReducer.editingSubscription,
    }

}

const mapDispatchToProps = (dispatch) => ({
    editOrgSubscription: (id, payload, history) =>
        dispatch(editOrgSubscription(id, payload, history)),
    fetchOrgSubscription: (id) =>
        dispatch(fetchOrgSubscription(id)),
    updateBreadcrumb: (breadCrumpData) =>
        dispatch(updateBreadcrumb(breadCrumpData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditOrgSubscription)
