import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ClusterStoragePopup from "../../components/clusterstoragepopup/ClusterStoragePopup";
import BackdropLoader from "../../components/loader/BackdropLoader";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import { useTranslation } from 'react-i18next';
import KeyValueRow from "../../components/keyvaluerow/KeyValueRow";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    border: "2px dashed",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme?.transitions?.create("transform", {
      duration: theme?.transitions?.duration?.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardHeader: {
    padding: "0 !important",
  },
  storageEditIcon: {
    marginTop: "8px !important",
    marginRight: "8px !important",
  },
}));

export const ClusterStorage = (props) => {
  const [editStorage, setEditStorage] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [t] = useTranslation()

  const classes = useStyles();

  const handleEditIconClick = () => {
    setEditStorage(!editStorage);
  };

  const handleCreateClick = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditStorage(false);
  };

  useEffect(() => {
    if (!props.clusterDetails?.cluster?.cloud_storage) {
      setExpanded(true);
    }
    return () => {
      setExpanded(false);
    };
  }, [props.clusterDetails]);

  const { clusterDetails } = props;

  return (
    <>
      <Card className="m-t-20" data-test="card-container">
        <CardHeader
          data-test="card-header"
          className={classes.cardHeader}
          title={
            <Typography variant="h5" display="inline" data-test="card-title">
              <strong data-test="title-text"> {t('Cluster.ClusterStorage.storageDetails')} </strong>{" "}
              
                <IconButton data-test="checked-icon" style={{opacity: clusterDetails?.cluster?.cloud_storage ? "1" : "0" }} disabled>
                  <CheckCircleSharpIcon
                    fontSize="12"
                    style={{ color: "green" }}
                  />
                </IconButton>
              
            </Typography>
          }
          subheader={
            <Typography display="block" className="m-b-5" variant="caption">
              {" "}
              {t('Cluster.ClusterStorage.valero')}{" "}
            </Typography>
          }
          avatar={
            <IconButton
              data-test="icon-button"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          }     
          action={
            props.destroyed || !clusterDetails?.cluster?.cloud_storage ? (
              ""
            ) : (
              expanded &&
                <Tooltip
                  title={editStorage ? t('Cluster.ClusterStorage.cancelEdit') : t('Cluster.ClusterStorage.edit')}
                  placement="left"
                  className={classes.storageEditIcon}
                >
                  <IconButton
                    onClick={() => handleEditIconClick()}
                    className={editStorage ? classes.editIcon : ""}
                    data-test="edit-button"
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
            )
          }
        />
        <Collapse in={expanded}>
          <Divider />
          <br />
          {!clusterDetails?.cluster?.cloud_storage ? (
            <CardContent data-test="add-storage-container">
              <Grid
                container
                spacing={2}
                alignItems="center"
                justify="flex-start"
              >
                <Grid item md={12}>
                  <Typography variant="caption" data-test="no-storage-text">
                  {t('Cluster.ClusterStorage.noStorage')}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={5} md={4}>
                  <Button
                    onClick={() => handleCreateClick()}
                    color="primary"
                    variant="contained"
                    size="large"
                    className="w-100"
                    data-test="setup-storage-button"
                    disabled={props.destroyed}
                  >
                    {t('Cluster.ClusterStorage.setupStorage')}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          ) : (
            <CardContent data-test="storage-detail-container">
              <>
              <KeyValueRow data-test="provider-info" keyXs={3} rowKey={t('Cluster.ClusterStorage.provider')} rowValue={clusterDetails?.cluster?.cloud_storage?.provider ?? ""} />
                {clusterDetails?.cluster?.cloud_storage?.region && (
                    <KeyValueRow keyXs={3} rowKey={t('Cluster.ClusterStorage.region')} rowValue={clusterDetails?.cluster?.cloud_storage?.region ?? ""} />
                )}
              </>
            </CardContent>
          )}
        </Collapse>
      </Card>
      {openPopup && (
        <ClusterStoragePopup
          openPopup={openPopup}
          handleClosePopup={handleClosePopup}
          clusterDetails={props.clusterDetails}
          editMode={false}
        />
      )}
      {editStorage && (
        <ClusterStoragePopup
          editData={props.clusterDetails?.cluster?.cloud_storage}
          openPopup={editStorage}
          handleClosePopup={handleClosePopup}
          clusterDetails={props.clusterDetails}
          editMode={true}
        />
      )}
      {props.settingClusterStorage && (
        <BackdropLoader message={t('Cluster.ClusterStorage.message')} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  settingClusterStorage: state.ClusterReducer.settingClusterStorage,
});

const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchtoProps)(ClusterStorage);
