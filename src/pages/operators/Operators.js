import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  TextField,
  Grid,
  ButtonBase,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import CustomButton from "../../components/custombutton/CustomButton";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import BackdropLoader from "../../components/loader/BackdropLoader";
import {
  getOperators,
  updateOperatorStatus,
  syncOperator,
  fetchOperatorDetails,
  clearOperatorDetails,
  updateOperatorDetails,
} from "./redux/actions";
import { useTranslation } from "react-i18next";
import SearchField from "../../components/searchfield/SearchField";
import SyncIcon from "@material-ui/icons/Sync";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

export const StyledTableCell = withStyles(theme => ({
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

const Operators = props => {
  const { operators, operatorDetails } = props;

  const [mode, setMode] = useState(0); // 0 - list, 1 - edit
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [showStatusChangeConfirm, setShowStatusChangeConfirm] = useState(false);
  const [showOperatorSyncConfirm, setShowOperatorSyncConfirm] = useState(false);

  const [crds, setCrds] = useState(null);
  const [channels, setChannels] = useState(null);

  const [filteredOperators, setFilteredOperators] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [t] = useTranslation();

  const handleStatusChange = operator => {
    setSelectedOperator(operator);
    setShowStatusChangeConfirm(true);
  };

  const statusChangeConfirmAgreeHandler = () => {
    props.updateOperatorStatus(
      selectedOperator.packageName,
      !selectedOperator.active
    );
    setShowStatusChangeConfirm(false);
    setSelectedOperator(null);
  };

  const statusChangeConfirmDisagreeHandler = () => {
    setShowStatusChangeConfirm(false);
    setSelectedOperator(null);
  };

  const handleOperatorSync = operator => {
    setSelectedOperator(operator);
    setShowOperatorSyncConfirm(true);
  };

  const operatorSyncConfirmAgreeHandler = () => {
    props.syncOperator(selectedOperator.packageName);
    setShowOperatorSyncConfirm(false);
    setSelectedOperator(null);
  };

  const operatorSyncConfirmDisagreeHandler = () => {
    setShowOperatorSyncConfirm(false);
    setSelectedOperator(null);
  };

  const handleOperatorEdit = operator => {
    setSelectedOperator(operator);
    setMode(1);
    props.fetchOperatorDetails(operator.packageName);
  };

  const cancelOperatorEdit = () => {
    setMode(0);
    setSelectedOperator(null);
    props.clearOperatorDetails();
  };

  const handleCrdsUpdate = e => {
    setCrds(e.target.value);
  };

  const handleChannelsUpdate = e => {
    setChannels(e.target.value);
  };

  const handleUpdateOperatorDetails = () => {
    props.updateOperatorDetails(operatorDetails.packageName, {
      customResourceDefinitions: JSON.parse(crds),
      channels: JSON.parse(channels),
    });
  };

  const handleSearchChange = str => setSearchText(str);

  const handleSearch = str => {
    setFilteredOperators(
      operators.filter(operator => operator.packageName.includes(str))
    );
  };

  useEffect(() => {
    props.getOperators();
  }, []);

  useEffect(() => {
    setFilteredOperators(operators);
  }, [operators]);

  useEffect(() => {
    if (operatorDetails) {
      setCrds(JSON.stringify(operatorDetails.customResourceDefinitions));
      setChannels(JSON.stringify(operatorDetails.channels));
    }
  }, [operatorDetails]);

  return (
    <div data-test="main-container">
      <div style={{ display: mode === 0 ? "block" : "none" }}>
        <div className="listContainer">
          <Typography color="textPrimary" variant="h5" data-test="header-text">
            {t("Cluster.Operator.operators")}
          </Typography>
          <div>
            <SearchField
              label={t("Cluster.Operator.search")}
              search={searchText}
              handleSearchChange={handleSearchChange}
              handleSearch={handleSearch}
              data-test="search-field"
            />
          </div>
        </div>

        <TableContainer component={Paper} data-test="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>{t("Cluster.Operator.sno")}</StyledTableCell>
                <StyledTableCell>{t("Cluster.Operator.image")}</StyledTableCell>
                <StyledTableCell>{t("Name")}</StyledTableCell>
                <StyledTableCell>
                  {t("Cluster.ClusterStorage.provider")}
                </StyledTableCell>
                <StyledTableCell>
                  {t("Cluster.ClusterInfo.version")}
                </StyledTableCell>
                <StyledTableCell>
                  {t("Cluster.ClusterInfo.status")}
                </StyledTableCell>
                <StyledTableCell>
                  {t("Cluster.NodeGroup.actions")}
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredOperators &&
                filteredOperators.map((operator, ind) => (
                  <StyledTableRow key={operator.ID} data-test="operators-list">
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={operator.thumbUrl}
                        alt={operator.displayName}
                        style={{
                          height: "60px",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{operator.displayName}</StyledTableCell>
                    <StyledTableCell>{operator.provider}</StyledTableCell>
                    <StyledTableCell>{operator.version}</StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={operator.active}
                            onChange={() => handleStatusChange(operator)}
                            name="status"
                            color="primary"
                          />
                        }
                        label={operator.active ? "Enabled" : "Disabled"}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      data-test="actions-container"
                    >
                      <IconButton
                        onClick={() => handleOperatorEdit(operator)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOperatorSync(operator)}
                        aria-label="sync-operator"
                      >
                        <SyncIcon />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {mode === 1 && operatorDetails && (
        <>
          <div className="m-b-20">
            <ButtonBase
              onClick={cancelOperatorEdit}
              style={{ color: "#357dfd" }}
              data-test="button-base"
            >
              <ArrowBackIcon fontSize="small" />
              <span style={{ marginLeft: "10px", fontWeight: 700 }}>
                {t("Cluster.ClusterList.backToList")}
              </span>
            </ButtonBase>
          </div>
          <div className="listContainer">
            <Typography
              color="textPrimary"
              variant="h5"
              data-test="header-text"
            >
              {operatorDetails.displayName}
            </Typography>
          </div>
          <TextField
            label={t("Cluster.Operator.customResourceDefinitions")}
            multiline
            rows={10}
            maxRows={10}
            variant="outlined"
            fullWidth
            value={crds}
            onChange={handleCrdsUpdate}
          />
          <TextField
            label={t("Cluster.Operator.channels")}
            multiline
            rows={10}
            maxRows={10}
            variant="outlined"
            fullWidth
            value={channels}
            onChange={handleChannelsUpdate}
            className="m-t-20"
          />
          <Grid
            container
            justifyContent="center"
            spacing={5}
            className="m-t-10"
          >
            <Grid item>
              <CustomButton label={t("Cluster.ClusterStorage.cancelEdit")} onClick={cancelOperatorEdit} />
            </Grid>
            <Grid item>
              <CustomButton
                label={t("Update")}
                onClick={handleUpdateOperatorDetails}
              />
            </Grid>
          </Grid>
        </>
      )}

      <ConfirmActionPopup
        open={showStatusChangeConfirm}
        handleAgree={statusChangeConfirmAgreeHandler}
        handleDisAgree={statusChangeConfirmDisagreeHandler}
        message={`Are you sure you want to update status of ${selectedOperator?.displayName}?`}
        yesText="Yes"
        noText="No"
      />
      <ConfirmActionPopup
        open={showOperatorSyncConfirm}
        handleAgree={operatorSyncConfirmAgreeHandler}
        handleDisAgree={operatorSyncConfirmDisagreeHandler}
        message={`Are you sure you want to sync ${selectedOperator?.displayName}?`}
        yesText="Yes"
        noText="No"
      />
      {props.fetchingOperators && (
        <BackdropLoader message={t("Cluster.Operator.fetchingOperators")} />
      )}
      {props.updatingOperatorStatus && (
        <BackdropLoader message={t("Cluster.Operator.updatingStatus")} />
      )}
      {props.syncingOperator && <BackdropLoader message={t("Cluster.Operator.syncing")} />}
      {props.fetchingOperatorDetails && (
        <BackdropLoader message={t("Cluster.Operator.fetchingDetails")} />
      )}
      {props.updatingOperatorDetails && (
        <BackdropLoader message={t("Cluster.Operator.updatingDetails")} />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    operators: state.OperatorsReducer.operators,
    fetchingOperators: state.OperatorsReducer.fetchingOperators,
    updatingOperatorStatus: state.OperatorsReducer.updatingOperatorStatus,
    syncingOperator: state.OperatorsReducer.syncingOperator,
    operatorDetails: state.OperatorsReducer.operatorDetails,
    fetchingOperatorDetails: state.OperatorsReducer.fetchingOperatorDetails,
    updatingOperatorDetails: state.OperatorsReducer.updatingOperatorDetails,
  };
};

const mapDispatchToProps = dispatch => ({
  getOperators: () => dispatch(getOperators()),
  updateOperatorStatus: (packageName, isActive) =>
    dispatch(updateOperatorStatus(packageName, isActive)),
  syncOperator: packageName => dispatch(syncOperator(packageName)),
  fetchOperatorDetails: packageName =>
    dispatch(fetchOperatorDetails(packageName)),
  clearOperatorDetails: () => dispatch(clearOperatorDetails()),
  updateOperatorDetails: (packageName, jsonPayload) =>
    dispatch(updateOperatorDetails(packageName, jsonPayload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Operators);
