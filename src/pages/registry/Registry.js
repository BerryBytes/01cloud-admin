import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from "@material-ui/core";
import CustomButton from "../../components/custombutton/CustomButton";
import { connect } from "react-redux";
import AddRegistry from "./AddRegistry";
import { getRegistries, deleteRegistry } from "./redux/actions";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { getDateInStandardFormat } from "../../helpers/utils";
import ConfirmDeletePopup from "../../components/confirmdeletepopup/ConfirmDeletePopup";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(() => ({}));

export function Registry(props) {
  const classes = useStyles();
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [deleteObject, setDeleteObject] = useState(null);
  const [editObject, setEditObject] = useState(null);
  const [t] = useTranslation();

  useEffect(() => {
    props.getRegistries();
  }, []);

  const handleAddRegistry = () => {
    
    setOpenAddPopup(true);
  };

  const handleCancelPopUp = () => {
    setOpenAddPopup(false);
    setEditObject(null);
  };

  const addSuccessCallback = () => {
    props.getRegistries();
    handleCancelPopUp();
  };

  const handleDeleteRegistry = (registry) => {
    setDeleteObject(registry);
  };

  const handleDeleteRegistryDisAgreeHandler = () => {
    setDeleteObject(null);
    
  };

  const handleDeleteRegistryAgreeHandler = () => {
    props.deleteRegistry(deleteObject.id);
    handleDeleteRegistryDisAgreeHandler();
  };

  const handleEdit = (registry) => {
    const _registry = { ...registry };
    setOpenAddPopup(true);
    setEditObject(_registry);
  };

  return (
    <div data-test="main-container">
      {
        
        <>
          <div className="listContainer">
            <Typography color="textPrimary" variant="h5">
              {t("Registries")}
            </Typography>
            <CustomButton
              label={t("AddRegistry")}
              onClick={() => handleAddRegistry()}
              data-test="add-btn"
            />
          </div>
          <TableContainer component={Paper} data-test="table-container">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Name")}</TableCell>
                  
                  <TableCell align="left">
                    {t("Provider")}
                  </TableCell>
                  
                  <TableCell align="left">
                    {t("Created")}
                  </TableCell>
                  <TableCell align="right">
                    {t("Actions")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.registrylist &&
                  props.registrylist.length > 0 &&
                  props.registrylist.map((registry, ind) => {
                    
                    return (
                      <TableRow key={ind} data-test="registry-row">
                        <TableCell
                          component="th"
                          scope="row"
                          data-test="registry-name"
                        >
                          {" "}
                          {registry.name}{" "}
                        </TableCell>
                        
                        <TableCell align="left" data-test="registry-provider">
                          {registry.provider}
                        </TableCell>
                        
                        <TableCell data-test="registry-created" align="left">
                          {getDateInStandardFormat(registry.createdat)}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="edit"
                            onClick={() => handleEdit(registry)}
                            data-test="registry-edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon
                              onClick={() => handleDeleteRegistry(registry)}
                              data-test="registry-delete"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      }
      {openAddPopup && (
        <Dialog
          open={openAddPopup}
          keepMounted
          onClose={handleCancelPopUp}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          disableBackdropClick={true}
          data-test="add-reg-popup"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography className="dialogtitle">
              {editObject
                ? t("EditRegistry")
                : t("AddRegistry")}
            </Typography>
            <IconButton
              aria-label="close"
              size="small"
              className="right"
              onClick={handleCancelPopUp}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent dividers>
            <DialogContentText id="alert-dialog-slide-description">
              <AddRegistry
                successCallback={addSuccessCallback}
                registryDetails={editObject}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
      {deleteObject && deleteObject.id > 0 && (
        <ConfirmDeletePopup
          open={deleteObject && deleteObject.id > 0}
          handleAgree={handleDeleteRegistryAgreeHandler}
          handleDisAgree={handleDeleteRegistryDisAgreeHandler}
          message={`This action will permanently delete registry data. Please type "${deleteObject.name}" to delete the Registry : ${deleteObject.name}`}
          yesText={t("Projects.VariablesTab.yesText")}
          noText={t("Projects.VariablesTab.noText")}
          action="delete"
          toMatchName={deleteObject.name}
          toDeleteModule="registry"
          loading={props.deletingRegistry}
          data-test="delete-reg-popup"
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  registrylist: state.RegistryReducer.registrylist,
  fetchingRegistries: state.RegistryReducer.fetchingRegistries,
  deletingRegistry: state.RegistryReducer.deletingRegistry,
});

const mapDispatchToProps = (dispatch) => ({
  getRegistries: () => dispatch(getRegistries()),
  deleteRegistry: (id) => dispatch(deleteRegistry(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Registry);
