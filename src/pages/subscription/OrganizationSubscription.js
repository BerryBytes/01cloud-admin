import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CustomButton from "../../components/custombutton/CustomButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { fetchOrgSubscriptions, deleteOrgSubscription } from "./redux/actions";
import { spaceConversion, coreConversion } from "../../helpers/utils";
import paths from "../../constants/paths";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { updateBreadcrumb } from "./redux/actions";
import BackdropLoader from "../../components/loader/BackdropLoader";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: "grey",
    fontWeight: 500,
  },
  body: {
    color: "#555",
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
  root: {},
}))(TableRow);

export class OrganizationSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgSubscriptionList: this.props.orgSubscriptionList,
      isDeletePopupOpened: false,
      selectedSubID: undefined,
    };
  }
  handleCreateSubscription = () => {
    this.props.history.push({
      pathname: "/subscription/org/create",
    });
  };

  deletePopupAgreeHandler = () => {
    this.props.deleteOrgSubscription(this.state.selectedSubID);
    this.setState({
      selectedSubID: undefined,
      isDeletePopupOpened: false,
    });
  };

  deletePopupDisagreeHandler = () => {
    this.setState({
      selectedSubID: undefined,
      isDeletePopupOpened: false,
    });
  };

  getSubcriptionList = () => { };

  componentDidMount() {
    this.props.fetchOrgSubscriptions();
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.orgSubscriptionList && newProps.orgSubscriptionList.length > 0) {
      const breadcrumbData = [{ name: "Org Subscription ", path: "/org/subscription" }];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  };

  handleDelete(subId) {
    this.setState({
      selectedSubID: subId,
      isDeletePopupOpened: true,
    });
  }

  render() {
    const { orgSubscriptionList } = this.props;
    const { isDeletePopupOpened } = this.state;
    const { t } = this.props;
    return (
      <div data-test="main-container">
        <div className="listContainer">
          <Typography color="textPrimary" variant="h5" data-test="header-text">
            {t("OrgSubscriptions")}
          </Typography>
          <CustomButton
            label={t("CreateOrgSubscription")}
            onClick={(e) => this.handleCreateSubscription(e)}
            data-test="create-sub-button"
          />
        </div>
        <TableContainer component={Paper} data-test="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>S.N</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Cluster</StyledTableCell>
                <StyledTableCell>Memory</StyledTableCell>
                <StyledTableCell>Cores</StyledTableCell>
                <StyledTableCell>No of Users</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Weight</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orgSubscriptionList &&
                orgSubscriptionList.map((sub, ind) => (
                  <StyledTableRow key={sub.id} data-test="subscriptions-list">
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell data-test="sub-name">{sub.name}</StyledTableCell>
                    <StyledTableCell data-test="sub-cluster">
                      {sub.cluster}
                    </StyledTableCell>
                    <StyledTableCell data-test="sub-memory">
                      {spaceConversion(sub.memory)}
                    </StyledTableCell>
                    <StyledTableCell data-test="sub-cores">
                      {coreConversion(sub.cores)}
                    </StyledTableCell>
                    <StyledTableCell data-test="sub-users">
                      {sub.no_of_user}
                    </StyledTableCell>
                    <StyledTableCell data-test="sub-price">${sub.price}</StyledTableCell>
                    <StyledTableCell data-test="sub-weight">{sub.weight}</StyledTableCell>
                    <StyledTableCell >
                      {sub.active ? (
                        <p>
                          <span data-test="sub-active" className="activestatus"></span> Active
                        </p>
                      ) : (
                        <p>
                          <span data-test="sub-inactive" className="inactivestatus"></span> Inactive
                        </p>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right" data-test="actions-container">
                      <Link
                        to={{
                          pathname: `${paths.EDIT_ORG_SUBSCRIPTION.replace(
                            ":id",
                            sub.id
                          )}`,
                        }}
                      >
                        <IconButton data-test="edit-button" aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        onClick={() => this.handleDelete(sub.id)}
                        data-test="delete-button"
                      >
                        <DeleteIcon />
                      </IconButton>

                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ConfirmActionPopup
          data-test="delete-subscription"
          open={isDeletePopupOpened}
          handleAgree={() => this.deletePopupAgreeHandler()}
          handleDisAgree={() => this.deletePopupDisagreeHandler()}
          message={`Are you sure you want to delete the organization Subscription?`}
          yesText="Yes"
          noText="No"
        />
        {this.props.fetchingSubscription && <BackdropLoader message="Fetching Organizaion Subscription" data-test="fetching-subscription" />}
        {this.props.deletingSubscription && <BackdropLoader message="Deleting Organizaion Subscription" data-test="deleting-subscription" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orgSubscriptionList: state.SubscriptionReducer.orgSubscriptionList,
    fetchingSubscription: state.SubscriptionReducer.fetchingSubscription,
    deletingSubscription: state.SubscriptionReducer.deletingSubscription,
    updatingSubscription: state.SubscriptionReducer.updatingSubscription,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchOrgSubscriptions: () => dispatch(fetchOrgSubscriptions()),
  updateBreadcrumb: (breadcrumbData) =>
    dispatch(updateBreadcrumb(breadcrumbData)),
  deleteOrgSubscription: (subId) => dispatch(deleteOrgSubscription(subId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(OrganizationSubscription));
