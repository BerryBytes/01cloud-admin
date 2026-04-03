import {
    Button,FormControl, Grid,MenuItem, Select, Typography, Divider, Tooltip, Card, CardHeader, CardContent, Collapse
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BackdropLoader from '../../components/loader/BackdropLoader';
import { getRegistries } from '../registry/redux/actions';
import { updateClusterRepo } from './redux/actions';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import AddRegistry from '../registry/AddRegistry';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/styles";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import clsx from "clsx"
import { getDateInStandardFormat } from "../../helpers/utils";
import KeyValueRow from "../../components/keyvaluerow/KeyValueRow";

const useStyles = makeStyles((theme) => ({
	expand: {
		transform: "rotate(0deg)",
		transition: theme?.transitions?.create("transform", {
            duration: theme?.transitions?.duration?.shortest,
        }),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	cardHeader:{
		padding: "0 !important"
	},
    editIcon: {
        border: "2px dashed",
    },
    cardHeaderAction: {
        marginTop: 3,
        marginRight: 3
    }
}));

const ClusterRegistry = (props) => {
    const [registry, setRegistry] = useState(0);
    const [selectedRegistry, setSelectedRegistry] = useState(null);
    const [openAddPopup, setOpenAddPopup] = useState(false);
    const [editObject, setEditObject] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [ t ] = useTranslation()
    const [editRegistry, setEditRegistry] = useState(false);
    
    const classes = useStyles()
    useEffect(() => {
        props.getRegistries();
    }, []);

    useEffect(() => {
        if(props.cluster?.image_registry_id > 0){
            setRegistry(props.cluster.image_registry_id)
            let _reg = props?.registrylist?.filter(x => x.id === props.cluster.image_registry_id)[0];
            if(_reg) setSelectedRegistry(_reg);
        }else{
            setExpanded(true)
        }
    }, [props.cluster]);
    
    useEffect(() => {
        if(props.cluster?.image_registry_id > 0){
            let _reg = props?.registrylist?.filter(x => x.id === props.cluster.image_registry_id)[0];
            if(_reg) setSelectedRegistry(_reg);
        }
    }, [props.registrylist]);

    const handleSubmit = () => {
        let jsonBody = new FormData();
        jsonBody.append("image_registry_id", registry);
        props.updateClusterRepo(props.clusterId, jsonBody, props.mainClusterId);
    };

    const handleRegistryChange = (e) => {
        setRegistry(e.target.value);
        if (props.isCreateMode) {
            props.handleRegistryChange(e.target.value);
        }
    }

    const isFormValid = () => {
        let valid = false;
        if (registry > 0 || registry !== props?.cluster?.image_registry_id) {
            valid = true;
        }
        return !valid;
    }

    const handleAddRegistry = () => {
        setOpenAddPopup(true);
    }

    const handleCancelPopUp = () => {
        setOpenAddPopup(false);
        setEditObject(null);
    }

    const addSuccessCallback = (data) => {
        props.getRegistries();
        setRegistry(data.id)
        if (props.isCreateMode) {
            props.handleRegistryChange(data.id);
        }
        handleCancelPopUp();
    }

    const handleEditIconClick = () => {
        setEditRegistry(!editRegistry);
    }

    useEffect(() => {
        setRegistry(props?.cluster?.image_registry_id ?? 0)
    }, [editRegistry])

    const content = (
        <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} md={props.isCreateMode ? 12 : 6}>
          <Grid container direction="column">
            <Grid item>
              <Grid
                container
                xs={12}
                spacing={1}
                alignItems="center"
                justify="flex-start"
              >
                <Grid
                  item
                  xs={12}
                  sm={props.isCreateMode ? 9 : 6}
                  md={9}
                  justify="flex-end"
                >
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justify="space-between"
                  >
                    <Grid
                      item
                      md={props.isInForm ? 10 : 7}
                      sm={props.isInForm ? 10 : 6}
                      xs={props.isInForm ? 10 : 12}
                    >
                      <FormControl
                        error={""}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      >
                        <Select
                          
                          className="w-100"
                          color="primary"
                          
                          value={registry}
                          
                          onChange={(e) => handleRegistryChange(e)}
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                          }}
                        >
                          <MenuItem value={0}>
                            {t("Cluster.ClusterRegistry.selectRegistry")}
                          </MenuItem>
                          {props.registrylist &&
                            props.registrylist.length > 0 &&
                            props.registrylist.map((_registry, index) => (
                              <MenuItem value={_registry.id} key={index}>
                                {_registry.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {props.isInForm ? (
                      <Grid item xs={2}>
                        <Tooltip arrow title="Add New Registry">
                          <IconButton onClick={() => handleAddRegistry()}>
                            <AddCircleOutlineOutlinedIcon fontSize="large" />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : (
                      <Grid item md={5} sm={6} xs={12}>
                        <Button
                          color="primary"
                          variant="contained"
                          size="large"
                          onClick={() => handleAddRegistry()}
                          disabled={props.destroyed}
                        >
                          {t("Cluster.ClusterRegistry.addNew")}
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                  
                </Grid>
                {!props.isCreateMode && (
                  <Grid item xs={12} sm={3} md={3} justify="flex-end">
                    <Button
                      onClick={handleSubmit}
                      color="primary"
                      variant="contained"
                      disabled={isFormValid() || props.destroyed}
                      size="large"
                    >
                      {t("Cluster.ClusterRegistry.update")}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
    )
    
    return (
        !props.isInForm ?
        <Card className="m-t-20">
            <CardHeader 
                className={classes.cardHeader}
                classes = {{action: classes.cardHeaderAction}}
                title={
                    <Typography varaint="h5" display="inline">
                        <strong> {t('Cluster.ClusterRegistry.registry')}</strong>{" "}
                        {props?.cluster?.image_registry_id > 0  && (
                            <IconButton disabled style={{opacity: props?.cluster?.image_registry_id > 0 ? "1" : "0" }}>
                                <CheckCircleSharpIcon
                                fontSize="12"
                                style={{ color: "green" }}
                                />
                            </IconButton>
                        )}
                    </Typography>
                }
                subheader ={
                    <Typography display="block" className="m-b-5" variant="caption"> Regisry is required for pushing CI images.{" "} </Typography>
                }
                avatar={
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={() => {
                        setExpanded(!expanded);
                        setEditRegistry(false);
                      }}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                }
                action={
                    !props.destroyed && expanded && (
                        <Tooltip
                            title={editRegistry ? "Cancel Edit" : "Edit Registry"}
                            placement="left"
                            className={classes.storageEditIcon}
                        >
                            <IconButton
                              onClick={() => handleEditIconClick()}
                              className={editRegistry ? classes.editIcon : ""}
                              data-test="edit-button"
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    )
                }
            />

            <Collapse in={expanded}>
            {!editRegistry ? (
                <CardContent>
                    {selectedRegistry ? (
                        <>
                            <KeyValueRow keyXs={3} rowKey={"Name"} rowValue={selectedRegistry?.name  ?? ""} />
                            <KeyValueRow keyXs={3} rowKey={"Created"} rowValue={selectedRegistry.createdat ? getDateInStandardFormat(
                                selectedRegistry.createdat
                                ) : ""}
                            />
                            <KeyValueRow keyXs={3} rowKey={"Provider"} rowValue={selectedRegistry?.provider  ?? ""} />
                            <KeyValueRow keyXs={3} rowKey={"Active"} rowValue={selectedRegistry?.active.toString()  ?? ""} />

                        </>
                    ) : (
                        <Grid><Typography variant="caption">No Registry details found for the cluster!</Typography></Grid>
                    )}
                </CardContent>
            ) : (
            <CardContent>
                <Divider />
                <br />
                {content}
            { props.updatingRepoDetails && <BackdropLoader message={t('Cluster.ClusterRegistry.updatingRegistry')}/>}

            {
                openAddPopup &&
                <Dialog
                    open={openAddPopup}
                    keepMounted
                    onClose={handleCancelPopUp}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    disableBackdropClick={true}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <Typography className='dialogtitle'>{ editObject ?  t('Cluster.ClusterRegistry.editRegistry') : t('Cluster.ClusterRegistry.addRegistry') }</Typography>
                        <IconButton aria-label="close" size="small" className='right' onClick={handleCancelPopUp}>
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <Divider />
                    <DialogContent dividers>
                        <DialogContentText id="alert-dialog-slide-description">
                            <AddRegistry successCallback={addSuccessCallback} registryDetails={editObject}/>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            }
            </CardContent>
            )}
            </Collapse>

        </Card>
        :
        (
            <>
                {content}

                { props.updatingRepoDetails && <BackdropLoader message={t('Cluster.ClusterRegistry.updatingRegistry')}/>}

                {
                    openAddPopup &&
                    <Dialog
                        open={openAddPopup}
                        keepMounted
                        onClose={handleCancelPopUp}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                        disableBackdropClick={true}
                    >
                        <DialogTitle id="alert-dialog-slide-title">
                            <Typography className='dialogtitle'>{ editObject ?  t('Cluster.ClusterRegistry.editRegistry') : t('Cluster.ClusterRegistry.addRegistry') }</Typography>
                            <IconButton aria-label="close" size="small" className='right' onClick={handleCancelPopUp}>
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <Divider />
                        <DialogContent dividers>
                            <DialogContentText id="alert-dialog-slide-description">
                                <AddRegistry successCallback={addSuccessCallback} registryDetails={editObject}/>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                }
            </>
        )
    );
};

const mapStateToProps = state => ({
    updatingRepoDetails: state.ClusterReducer.updatingRepoDetails,
    registrylist: state.RegistryReducer.registrylist
})

const mapDispatchtoProps = dispatch => {
    return {
        updateClusterRepo: (id, jsonBody, mainClusterId) => dispatch(updateClusterRepo(id, jsonBody, mainClusterId)),
        getRegistries: () => dispatch(getRegistries()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(ClusterRegistry)
