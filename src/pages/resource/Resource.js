import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchResources, deleteResource } from "./redux/actions";
import { spaceConversion, coreConversion } from "../../helpers/utils";
import paths from "../../constants/paths";
import { Typography } from "@material-ui/core";
import CustomButton from "../../components/custombutton/CustomButton";
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
export class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeletePopupOpened: false,
      selectedResourceId: undefined,
    };
  }

  componentDidMount() {
    this.props.fetchResources();
  }
  handleCreateResource = () => {
    this.props.history.push({
      pathname: "/resource/create",
    });
  };

  deletePopupAgreeHandler = () => {
    this.props.deleteResource(this.state.selectedResourceId);
    this.setState({
      selectedResourceId: undefined,
      isDeletePopupOpened: false,
    });
  };

  deletePopupDisagreeHandler = () => {
    this.setState({
      selectedResourceId: undefined,
      isDeletePopupOpened: false,
    });
  };

  handleDelete(resourceId) {
    this.setState({
      selectedResourceId: resourceId,
      isDeletePopupOpened: true,
    });
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.resourceList && newProps.resourceList.length > 0) {
      
      const breadcrumbData = [{ name: "Resources ", path: "/resources" }];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  };

  render() {
    const { resourceList, t } = this.props;
    const { isDeletePopupOpened } = this.state;
    return (
      <div data-test="main-component">
        <div className="listContainer">
          <Typography color="textPrimary" variant="h5" data-test="typography">
            {t("Resources")}
          </Typography>
          <CustomButton
            data-test="createresource-button"
            label={t("CreateResource")}
            onClick={this.handleCreateResource}
          />
        </div>
        <TableContainer component={Paper}>
          <Table data-test="table-data">
            <TableHead>
              <TableRow>
                <StyledTableCell>S.N</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Memory</StyledTableCell>
                <StyledTableCell>Cores</StyledTableCell>
                <StyledTableCell>Weight</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {resourceList &&
                resourceList.map((resource, ind) => (
                  <StyledTableRow key={resource.id} data-test="resourceTable-data">
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell data-test="resource-name">{resource.name}</StyledTableCell>
                    <StyledTableCell data-test="resource-memory">
                      {spaceConversion(resource.memory)}
                    </StyledTableCell>
                    <StyledTableCell data-test="resource-cores">
                      {coreConversion(resource.cores)}
                    </StyledTableCell>
                    <StyledTableCell data-test="resource-weight">
                      {resource.weight}
                    </StyledTableCell>
                    <StyledTableCell>
                      {resource.active ? (
                        <p>
                          <span className="activestatus" data-test="active-status"></span> Active
                        </p>
                      ) : (
                        <p>
                          <span className="inactivestatus" data-test="inactive-status"></span> Inactive
                        </p>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Link
                        data-test="edit-link"
                        to={{
                          pathname: `${paths.EDIT_RESOURCE.replace(
                            ":id",
                            resource.id
                          )}`,
                        }}
                      >
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>

                      <IconButton
                        data-test="delete-button"
                        aria-label="delete"
                        onClick={() => this.handleDelete(resource.id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <ConfirmActionPopup
                        data-test="confirm-popup"
                        open={isDeletePopupOpened}
                        handleAgree={() => this.deletePopupAgreeHandler()}
                        handleDisAgree={this.deletePopupDisagreeHandler}
                        message={`Are you sure you want to delete the Resource?`}
                        yesText="Yes"
                        noText="No"
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    resourceList: state.ResourceReducer.resourceList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchResources: () => dispatch(fetchResources()),
  updateBreadcrumb: (breadcrumbData) =>
    dispatch(updateBreadcrumb(breadcrumbData)),
  deleteResource: (id) => dispatch(deleteResource(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Resource));
