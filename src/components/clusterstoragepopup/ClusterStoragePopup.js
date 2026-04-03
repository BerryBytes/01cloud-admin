import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Slide,
  Button,
  TextField,
  Grid,
  DialogTitle,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@material-ui/core";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ClusterProviders } from "../../constants/clusterconstants";
import { AppConstants } from "../../constants/appconstants";
import {
  getProviderConfig,
  setClusterStorage,
} from "../../pages/clusters/redux/actions";
import MuiTextField from "../../components/textfield/MuiTextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useTranslation } from 'react-i18next';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ClusterStoragePopup = (props) => {
  const [provider, setProvider] = useState("Select");
  const [access_key, setAccess_key] = useState("");
  const [secret_key, setSecret_key] = useState("");
  const [region, setRegion] = useState("Select");
  const [regionList, setRegionList] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isShowAccessKey, setIsShowAccessKey] = useState(false);
  const [isShowSecretKey, setIsShowSecretKey] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [t] = useTranslation()

  useEffect(() => {
    let _data = props.editData;
    if (_data) {
      setProvider(_data.provider);
      setAccess_key(_data.access_key);
      setSecret_key(_data.secret_key);
      setRegion(_data.region);
      setProjectId(_data.project_id);
    }
  }, [props?.editData]);

  const handleSubmit = () => {
    let _provider = provider;
    let uploadBody;
    let jsonBody = {
      provider: _provider,
    };
    if (_provider === AppConstants.ClusterProvider.EKS) {
      jsonBody["access_key"] = access_key;
      jsonBody["secret_key"] = secret_key;
      jsonBody["region"] = region;
    } else if (_provider === AppConstants.ClusterProvider.GCP) {
      jsonBody["project_id"] = projectId;
      uploadBody = new FormData();
      uploadBody.append("file_name", selectedFile.name);
      uploadBody.append("file_type", "json");
      uploadBody.append("file", selectedFile);
    }
    
    props.setClusterStorage(
      props?.clusterDetails?.cluster?.id,
      jsonBody,
      uploadBody,
      props?.clusterDetails?.id
    );
    
    props.handleClosePopup();
  };

  useEffect(() => {
    if (props.providerConfig) {
      const _properties =
        props.providerConfig && props.providerConfig.properties;
      setRegionList(_properties.region);
    }
  }, [props.providerConfig]);

  useEffect(() => {
    if (
      provider !== "Select" &&
      provider !== AppConstants.ClusterProvider.Other
    ) {
      props.getProviderConfig(provider);
    }
  }, [provider]);

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
    setRegion("Select");
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const _file = e.target.files[0];
      if (_file) {
        let fr = new FileReader();
        fr.readAsText(_file);
        fr.onload = (_e) => {
          var content = JSON.parse(_e?.target?.result);
          const pId = content?.project_id;
          if (pId) {
            setProjectId(pId);
          }
        };
        
        setSelectedFile(_file);
      }
    }
  };

  const isFormValid = () => {
    let invalid = false;
    if (provider === AppConstants.ClusterProvider?.GCP) {
      if (!selectedFile) {
        invalid = true;
        return !invalid;
      }
    } else if (provider === AppConstants.ClusterProvider?.EKS) {
      if (
        region === "Select" ||
        !access_key?.trim()?.length ||
        !secret_key?.trim()?.length
      ) {
        invalid = true;
        return !invalid;
      }
    } else {
      invalid = true;
    }
    return !invalid;
  };

  return (
    <>
      <Dialog
        open={props.openPopup}
        TransitionComponent={transition}
        onClose={props.handleClosePopup}
        keepMounted
        data-test="storage-popup"
      >
        <DialogTitle data-test="title-container">
          <Typography className="dialogtitle" data-test="title-text">
            {props.editMode ? t('Cluster.ClusterStorage.updateStorage') : t('Cluster.ClusterStorage.addStorage')}
          </Typography>

          <IconButton
            aria-label="close"
            size="small"
            className="right"
            onClick={props.handleClosePopup}
            data-test="close-button"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers data-test="content-container">
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={provider !== "Select" ? "6" : "12"}>
                <Typography variant="h5">{t('Cluster.ClusterStorage.provider')}</Typography>
                <FormControl
                  className="w-100"
                  error={""}
                  variant="outlined"
                  margin="normal"
                >
                  <Select
                    name="provider"
                    value={provider}
                    color="primary"
                    onChange={(e) => handleProviderChange(e)}
                    data-test="provider-select"
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                    }}
                  >
                    <MenuItem value="Select">{t('Cluster.ClusterStorage.selectProvider')}</MenuItem>
                    {ClusterProviders &&
                      ClusterProviders.length > 0 &&
                      ClusterProviders.map((item, ind) => (
                        <MenuItem value={item.provider} key={ind}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              {provider !== "Select" && (
                <React.Fragment >
                  {provider === AppConstants?.ClusterProvider?.EKS && (
                    <Grid item md="6">
                      <Typography variant="h5">{t('Cluster.ClusterStorage.region')}</Typography>
                      <FormControl
                        className="w-100"
                        error={""}
                        variant="outlined"
                        margin="normal"
                      >
                        <Select
                          name="region"
                          value={region}
                          color="primary"
                          onChange={(e) => setRegion(e.target.value)}
                          MenuProps={{
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                          }}
                          data-test="region-select"
                        >
                          <MenuItem value="Select">{t('Cluster.ClusterStorage.selectRegion')}</MenuItem>
                          {regionList &&
                            regionList.items &&
                            regionList.items.length > 0 &&
                            regionList.items.map((reg, ind) => (
                              <MenuItem value={reg} key={ind}>
                                {reg}
                              </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                          {regionList && regionList.description}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  )}

                  {provider === AppConstants.ClusterProvider.EKS && (
                    <>
                      <Grid item md="6">
                        <Typography variant="h5">{t('Cluster.ClusterStorage.accessKey')}</Typography>
                        <TextField
                          style={{
                            width: "0px",
                            height: "0px",
                          }}
                        />
                        <OutlinedInput
                          name="access_key"
                          value={access_key}
                          onChange={(e) => setAccess_key(e.target.value)}
                          type={isShowAccessKey ? "text" : "password"}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          placeholder={t('Cluster.ClusterStorage.accessKey')}
                          className="m-t-20"
                          data-test="access-key"
                          endAdornment={
                            <>
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle visibility"
                                  onClick={() =>
                                    setIsShowAccessKey(!isShowAccessKey)
                                  }
                                  edge="end"
                                >
                                  {isShowAccessKey ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            </>
                          }
                        >
                        </OutlinedInput>
                      </Grid>
                      <Grid item md="6">
                        <Typography variant="h5">{t('Cluster.ClusterStorage.secretKey')}</Typography>
                        <OutlinedInput
                          name="secret_key"
                          value={secret_key}
                          onChange={(e) => setSecret_key(e.target.value)}
                          type={isShowSecretKey ? "text" : "password"}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          placeholder={t('Cluster.ClusterStorage.secretKey')}
                          className="m-t-20"
                          data-test="secret-key"
                          endAdornment={
                            <>
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle visibility"
                                  onClick={() =>
                                    setIsShowSecretKey(!isShowSecretKey)
                                  }
                                  edge="end"
                                >
                                  {isShowSecretKey ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            </>
                          }
                        >
                        </OutlinedInput>
                      </Grid>
                    </>
                  )}

                  {provider === AppConstants.ClusterProvider.GCP && (
                    <Grid item md="6">
                      <Typography variant="h5">{t('Cluster.ClusterStorage.projectId')}</Typography>
                      <MuiTextField
                        name="projectId"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        type="text"
                        margin="normal"
                        placeholder={t('Cluster.ClusterStorage.projectId')}
                        data-test="project-id"
                      />
                    </Grid>
                  )}

                  {provider === AppConstants.ClusterProvider.GCP && (
                    <Grid item md={12}>
                      <Typography variant="h5"> {t('Cluster.ClusterStorage.credentials')}</Typography>
                      <TextField
                        id=""
                        type="file"
                        inputProps={{
                          accept: "application/json",
                        }}
                        title=""
                        color="primary"
                        name=""
                        variant="outlined"
                        className="w-100"
                        margin="normal"
                        data-test="file-field"
                        onChange={(e) => onFileChange(e)}
                      />
                    </Grid>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify={"flex-end"}>
            <Grid item>
              <Button
                disabled={!isFormValid()}
                onClick={handleSubmit}
                color="primary"
                variant="contained"
                data-test="submit-button"
              >
                {props.editMode ? t('Cluster.ClusterStorage.update') : t('Cluster.ClusterStorage.add')}
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  providerConfig: state.ClusterReducer.providerConfig,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    setClusterStorage: (id, jsonBody, uploadBody, clusterId, callback) =>
      dispatch(
        setClusterStorage(id, jsonBody, uploadBody, clusterId, callback)
      ),
    getProviderConfig: (provider) => dispatch(getProviderConfig(provider)),
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(ClusterStoragePopup);
