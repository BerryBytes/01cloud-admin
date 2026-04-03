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
import { fetchSubscriptions, deleteSubscription } from "./redux/actions";
import { spaceConversion, coreConversion } from "../../helpers/utils";
import paths from "../../constants/paths";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { updateBreadcrumb } from "./redux/actions";

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

export class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionList: this.props.subscriptionList,
      isDeletePopupOpened: false,
      selectedSubID: undefined,
    };
  }
  handleCreateSubscription = () => {
    this.props.history.push({
      pathname: "/subscription/create",
    });
  };

  deletePopupAgreeHandler = () => {
    this.props.deleteSubscription(this.state.selectedSubID);
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

  getSubcriptionList = () => {};

  componentDidMount() {
    this.props.fetchSubscriptions();
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.subscriptionList && newProps.subscriptionList.length > 0) {
      const breadcrumbData = [{ name: "Subscription ", path: "/subscription" }];
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
    const { subscriptionList } = this.props;
    const { isDeletePopupOpened } = this.state;
    const { t } = this.props;
    return (
      <div data-test="main-container">
        <div className="listContainer">
          <Typography color="textPrimary" variant="h5" data-test="header-text">
            {t("Subscriptions")}
          </Typography>
          <CustomButton
            label={t("CreateSubscription")}
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
                <StyledTableCell>Disk Space</StyledTableCell>
                <StyledTableCell>Memory</StyledTableCell>
                <StyledTableCell>Cores</StyledTableCell>
                <StyledTableCell>Data Transfers</StyledTableCell>
                <StyledTableCell>No of Backups</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Apps</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {subscriptionList &&
                subscriptionList.map((sub, ind) => (
                  <StyledTableRow key={sub.id} data-test="subscriptions-list">
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell>{sub.name}</StyledTableCell>
                    <StyledTableCell>
                      {spaceConversion(sub.disk_space)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {spaceConversion(sub.memory)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {coreConversion(sub.cores)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {spaceConversion(sub.data_transfer)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {sub.backups}
                    </StyledTableCell>
                    <StyledTableCell>${sub.price}</StyledTableCell>
                    <StyledTableCell>{sub.apps}</StyledTableCell>
                    <StyledTableCell >
                      {sub.active ? (
                        <p>
                          <span className="activestatus"></span> Active
                        </p>
                      ) : (
                        <p>
                          <span className="inactivestatus"></span> Inactive
                        </p>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right" data-test="actions-container">
                      <Link
                        to={{
                          pathname: `${paths.EDIT_SUBSCRIPTION.replace(
                            ":id",
                            sub.id
                          )}`,
                        }}
                      >
                        <IconButton aria-label="edit">
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
          open={isDeletePopupOpened}
          handleAgree={this.deletePopupAgreeHandler}
          handleDisAgree={this.deletePopupDisagreeHandler}
          message={`Are you sure you want to delete the Subscription?`}
          yesText="Yes"
          noText="No"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { subscriptionList: state.SubscriptionReducer.subscriptionList };
};

const mapDispatchToProps = (dispatch) => ({
  fetchSubscriptions: () => dispatch(fetchSubscriptions()),
  updateBreadcrumb: (breadcrumbData) =>
    dispatch(updateBreadcrumb(breadcrumbData)),
  deleteSubscription: (subId) => dispatch(deleteSubscription(subId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Subscription));
