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
import { fetchClusters, deleteCluster } from "./redux/actions";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import paths from "../../constants/paths";
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

const StyledTableRow = withStyles(() => ({
  root: {},
}))(TableRow);

export class Cluster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeletePopupOpened: false,
      selectedClusterId: undefined,
    };
  }

  deletePopupAgreeHandler = () => {
    if (this.state.selectedClusterId) {
      this.props.deleteCluster(this.state.selectedClusterId);
    }
    this.setState({
      selectedClusterId: undefined,
      isDeletePopupOpened: false,
    });
  };

  deletePopupDisagreeHandler = () => {
    this.setState({
      selectedClusterId: undefined,
      isDeletePopupOpened: false,
    });
  };

  handleDelete(clusterId) {
    this.setState({
      selectedClusterId: clusterId,
      isDeletePopupOpened: true,
    });
  }

  handleCreateCluster = () => {
    this.props.history.push({
      pathname: "/cluster/create",
    });
  };

  componentDidMount() {
    this.props.fetchClusterList();
  }
  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.clusterList && newProps.clusterList.length > 0) {
      const breadcrumbData = [{ name: "Clusters ", path: "/cluster" }];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  };

  render() {
    const { clusterList, t } = this.props;
    const { isDeletePopupOpened } = this.state;
    return (
      <div data-test="main-container">
        <div className="listContainer">
          <Typography color="textPrimary" variant="h5" data-test="clusters">
            {t("Clusters")}
          </Typography>
          <CustomButton
            data-test="create-cluster"
            label={t("CreateCluster")}
            onClick={() => this.handleCreateCluster()}
          />
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>S.N</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Context</StyledTableCell>
                <StyledTableCell>Region</StyledTableCell>
                <StyledTableCell>Zone</StyledTableCell>
                <StyledTableCell>Provider</StyledTableCell>
                <StyledTableCell>PV Capacity</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clusterList &&
                clusterList.map((cluster, ind) => (
                  <StyledTableRow key={cluster.id}>
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell data-test="name">{cluster.name}</StyledTableCell>
                    <StyledTableCell data-test="context">{cluster.context}</StyledTableCell>
                    <StyledTableCell data-test="region">{cluster.region}</StyledTableCell>
                    <StyledTableCell data-test="zone">{cluster.zone}</StyledTableCell>
                    <StyledTableCell data-test="provider">{cluster.provider}</StyledTableCell>
                    <StyledTableCell data-test="capacity">{cluster.pv_capacity}</StyledTableCell>
                    <StyledTableCell >
                      
                      {cluster.active ? (
                        <p data-test="active">
                          <span className="activestatus" ></span> Active
                        </p>
                      ) : (
                        <p data-test="inactive">
                          <span className="inactivestatus"></span> Inactive
                        </p>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Link
                        to={{
                          pathname: `${paths.EDIT_CLUSTER.replace(
                            ":id",
                            cluster.id
                          )}`,
                        }}
                      >
                        <IconButton aria-label="edit" data-test="edit-button">
                          <EditIcon />
                        </IconButton>
                      </Link>

                      <IconButton
                        data-test="delete-button"
                        aria-label="delete"
                        onClick={() => this.handleDelete(cluster.id)}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <ConfirmActionPopup
                        data-test="actionpopup"
                        open={isDeletePopupOpened}
                        handleAgree={() => this.deletePopupAgreeHandler()}
                        handleDisAgree={() => this.deletePopupDisagreeHandler()}
                        message={`Are you sure you want to delete the Cluster?`}
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
    clusterList: state.ClusterReducer.clusterList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClusterList: () => {
      dispatch(fetchClusters());
    },
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),
    deleteCluster: (id) => {
      dispatch(deleteCluster(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Cluster));
