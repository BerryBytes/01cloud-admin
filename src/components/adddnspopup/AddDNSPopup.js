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
import DeleteIcon from "@material-ui/icons/Delete";
import { ClusterProviders } from "../../constants/clusterconstants";
import { AppConstants } from "../../constants/appconstants";
import ConfirmDeletePopup from "../confirmdeletepopup/ConfirmDeletePopup";
import InfoPopupContainer from "../infopopup/InfoPopupContainer";
import {
  getProviderConfig,
  validateDnsPermission,
  clearDnsValidation,
  createDns,
  deleteDns,
  updateDns,
} from "../../pages/dns/redux/actions";
import MuiTextField from "../../components/textfield/MuiTextField";
import { validateRegex } from "../../helpers/utils";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/styles";
import BackdropLoader from "../loader/BackdropLoader";

const useStyles = makeStyles(() => ({
  deleteButton: {
    color: "rgba(255, 0, 0, 0.75)",
    border: "1px solid",
  },
}));

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const generalRegex = "^[a-z0-9-]*$";
const generalHelperText =
  "Allowed only lowercase characters, numbers and hyphen";

export const AddDNSPopup = (props) => {
  const [provider, setProvider] = useState("Select");
  const [name, setName] = useState("");
  const [project_id, setProject_id] = useState("");
  const [access_key, setAccess_key] = useState("");
  const [secret_key, setSecret_key] = useState("");
  const [base_domain, setBase_domain] = useState("");
  const [properties, setProperties] = useState(null);
  const [region, setRegion] = useState("Select");
  const [regionList, setRegionList] = useState(null);
  const [zone, setZone] = useState("Select");
  const [zoneList, setZoneList] = useState(null);
  const [errors, setErrors] = useState({});
  const [helperTexts, setHelperTexts] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [credentialValidated, setCredentialValidated] = useState(false);
  const [isShowAccessKey, setIsShowAccessKey] = useState(false);
  const [isShowSecretKey, setIsShowSecretKey] = useState(false);
  const [deleteObject, setDeleteObject] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleClosePopup = () => {
    props.handleClosePopup();
  };

  const handleSuccessDNSUpdate = () => {
    handleClosePopup();
  };

  useEffect(() => {
    let _data = props.editData;
    if (_data) {
      setProvider(_data.provider);
      setName(_data.name);
      setAccess_key(_data.access_key);
      setSecret_key(_data.secret_key);
      setBase_domain(_data.base_domain);
      setRegion(_data.region);
      setZone(_data.zone_id);
      setApiKey(_data.credentials);
      setProjectId(_data.project_id);
    }
  }, [props?.editData]);

  useEffect(() => {
    const permissionCount = {
      hasPermission: props.validationDnsData?.has_permission
        ? props.validationData?.has_permission.length
        : 0,
      noPermission: props.validationDnsData?.no_permission
        ? props.validationData?.no_permission.length
        : 0,
    };
    
    setCredentialValidated(permissionCount.hasPermission !== 0);
  }, [props.validationDnsData]);
  
  const handleValidate = () => {
    let _provider = provider;
    let uploadBody = null;
    let jsonBody = {
      provider: _provider,
      region: region,
    };
    
    if (_provider === AppConstants.ClusterProvider.EKS) {
      jsonBody["access_key"] = access_key;
      jsonBody["secret_key"] = secret_key;
    } else if (_provider === AppConstants.ClusterProvider.GCP) {
      uploadBody = new FormData();
      uploadBody.append("file_name", selectedFile.name);
      uploadBody.append("file_type", "json");
      uploadBody.append("file", selectedFile);
    }
    props.validateDnsPermission(jsonBody, uploadBody);
  };

  const handleSubmit = () => {
    let _provider = provider;
    let uploadBody;
    let jsonBody = {
      provider: _provider,
      name: name,
      
      base_domain: base_domain,
      zone_id: zone,
      tls: "zerone-tls-cert",
      organization_id: 0,
      active: props?.editData?.active ?? true,
    };
    if (_provider === AppConstants.ClusterProvider.EKS) {
      jsonBody["region"] = region;
      jsonBody["access_key"] = access_key;
      jsonBody["secret_key"] = secret_key;
    } else if (_provider === AppConstants.ClusterProvider.GCP) {
      jsonBody["project_id"] = project_id;

      uploadBody = new FormData();
      uploadBody.append("file_name", selectedFile.name);
      uploadBody.append("file_type", "json");
      uploadBody.append("file", selectedFile);
    } else if (_provider === AppConstants.ClusterProvider.CLOUDFLARE) {
      jsonBody = {
        provider: _provider,
        name: name,
        project_id: projectId,
        base_domain: base_domain,
        organization_id: 0,
        active: props?.editData?.active ?? true,
        credentials: apiKey,
        zone_id: "NA",
        tls: "zerone-tls-cert",
      };
    }
    if (props.editMode) {
      props.updateDns(
        props?.editData?.id,
        jsonBody,
        uploadBody,
        handleSuccessDNSUpdate
      );
    } else {
      props.createDns(jsonBody, uploadBody, handleSuccessDNSUpdate);
    }
  };

  const handleProviderChange = (e) => {
    setProvider(e.target.value);
    setRegion("Select");
    if (e.target.value === AppConstants.ClusterProvider.EKS || e.target.value === AppConstants.ClusterProvider.GCP) setZone("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    let regx;
    if (properties?.cluster_name?.validation) {
      regx = properties?.cluster_name?.validation;
    } else {
      regx = generalRegex;
    }
    setErrors({
      ...errors,
      [e.target.name]: validateRegex(e.target.value, regx) ? false : true,
    });
    setHelperTexts({
      ...helperTexts,
      [e.target.name]: !validateRegex(e.target.value, regx)
        ? properties?.cluster_name?.description
          ? properties?.cluster_name?.description
          : generalHelperText
        : "",
    });
    
  };

  const onFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const _file = e.target.files[0];
      if (_file) {
        
        setSelectedFile(_file);
      }
    }
  };

  useEffect(() => {
    if (props.providerConfig) {
      const _properties =
        props.providerConfig && props.providerConfig.properties;
      setProperties(_properties);
      setRegionList(_properties.region);
    }
  }, [props.providerConfig]);

  useEffect(() => {
    if (
      provider !== "Select" &&
      provider !== AppConstants.ClusterProvider.Other &&
      provider !== AppConstants.ClusterProvider.CLOUDFLARE
    ) {
      props.getProviderConfig(provider);
      setCredentialValidated(false);
    }
    if (provider === AppConstants.ClusterProvider.CLOUDFLARE) {
      setCredentialValidated(true);
      setRegion("cloudflare");
    }
    if (provider === AppConstants.ClusterProvider.GCP) {
      setRegion("gcp");
    }
    if (provider === "Select") {
      setCredentialValidated(false);
    }
  }, [provider]);

  useEffect(() => {
    let regx;
    if (properties?.region?.validation) {
      regx = properties?.region?.validation;
    } else {
      regx = generalRegex;
    }
    setErrors({
      ...errors,
      region: validateRegex(region, regx) ? false : true,
    });
    setHelperTexts({
      ...helperTexts,
      region: !validateRegex(region, regx)
        ? properties?.region?.description
          ? properties?.region?.description
          : generalHelperText
        : "",
    });
    if (region === "Select") {
      setZoneList(null);
    } else {
      if (properties && properties.zone) {
        setZoneList(
          properties.zone.items &&
            properties.zone.items.filter((zn) => zn.startsWith(region))
        );
      }
    }
    
  }, [region]);

  useEffect(() => {}, [projectId]);

  useEffect(() => {
    if (props.edit) {
      const z = zoneList?.find((_z) => {
        return props.cluster?.cluster?.zone === _z;
      });
      if (z) {
        setZone(props.cluster?.cluster?.zone);
      } else if (zoneList && zoneList[0]) {
        setZone(zoneList[0]);
      }
    } else if (provider !== AppConstants.ClusterProvider.Other) {
      if (provider === AppConstants.ClusterProvider.GCP) setZone("Select");
      else if (provider === AppConstants.ClusterProvider.EKS) setZone("");
    }
  }, [zoneList]);

  const isFormValid = () => {
    let valid = false;
    let e = false;
    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        e = true;
        return;
      }
    });
    if (
      name.trim() !== "" && 
      provider !== "Select" &&
      region !== "Select" &&
      base_domain !== "" &&
      !e
    ) {
      
      if (provider === AppConstants.ClusterProvider.GCP) {
        if (zone !== "" && project_id !== "" && selectedFile) {
          valid = true;
        }
      } else if (provider === AppConstants.ClusterProvider.EKS) {
        if (zone !== "" && access_key !== "" && secret_key !== "") {
          valid = true;
        }
      } else if (provider === AppConstants.ClusterProvider?.CLOUDFLARE) {
        if (projectId?.trim()?.length > 0 && apiKey?.trim()?.length > 0) {
          valid = true;
        }
      } else {
        valid = true;
      }
    }
    if (
      props.editMode &&
      props.editData.name === name &&
      props.editData?.provider !== AppConstants.ClusterProvider.CLOUDFLARE &&
      props.editData.zone_id === zone &&
      props.editData.base_domain === base_domain
    ) {
      valid = false;
    }
    return !valid;
  };

  useEffect(() => {
    return () => {
      props.clearDnsValidation();
    };
  }, []);

  const isValidateFormValid = () => {
    let valid = false;
    let e = false;
    Object.keys(errors).forEach((k) => {
      if (errors[k]) {
        e = true;
        return;
      }
    });
    if (provider !== "Select" && region !== "Select" && !e) {
      if (provider === AppConstants.ClusterProvider.GCP) {
        if (selectedFile) {
          valid = true;
        }
      } else if (provider === AppConstants.ClusterProvider.EKS) {
        if (access_key !== "" && secret_key !== "") {
          valid = true;
        }
      } else {
        valid = true;
      }
    }
    return !valid;
  };

  const handleDelete = (dns) => {
    setDeleteObject(dns);
  };

  const handleDeleteDnsDisagree = (dnsDeleted) => {
    setDeleteObject(null);
    if (dnsDeleted) props.handleClosePopup();
  };

  const handleDeleteDnsAgree = () => {
    props.deleteDns(deleteObject.id, handleDeleteDnsDisagree);
  };

  const classes = useStyles();

  const getInfoMessage = () => {
    let message = "";
    let scope = "";
    switch (provider) {
      case AppConstants.ClusterProvider.EKS:
        message = (
          <Typography variant="h5">
            {" "}
            Required Permission: route53:* and route53domains:*{" "}
          </Typography>
        );
        scope = "component";
        break;
      case AppConstants.ClusterProvider.GCP:
        message = (
          <Typography variant="h5">
            {" "}
            Required Permission: roles/dns.admin{" "}
          </Typography>
        );
        scope = "component";
        break;
      case "cloudflare":
        message = "Requires Global API key. ";
        break;
      default:
        message = "";
    }
    return { message, scope };
  };

  const getInfoUrl = () => {
    let url = null;
    switch (provider) {
      case "cloudflare":
        url = "https://dash.cloudflare.com/profile/api-tokens";
        break;
      default:
        url = null;
    }
    return url;
  };

  const loadingMsg = () => {
    let message = "Loading...";
    if (props.isValidatingDnsPermission)
      message = "Validating DNS Permission...";
    else if (props.creatingDns) message = "Creating DNS ...";
    else if (props.updatingDns) message = "Updating DNS ...";
    return message;
  };

  return (
    <>
      <Dialog
        open={props.openPopup}
        TransitionComponent={transition}
        onClose={props.handleClosePopup}
        keepMounted
        data-test="main-container"
      >
        <DialogTitle>
          <Typography className="dialogtitle">
            {props.editMode ? "Edit DNS" : "Add DNS"}
          </Typography>

          <IconButton
            aria-label="close"
            size="small"
            className="right"
            onClick={props.handleClosePopup}
            data-test="close-icon"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={provider !== "Select" ? "6" : "12"}>
                <Typography variant="h5">Provider</Typography>
                <FormControl
                  className="w-100"
                  error={""}
                  variant="outlined"
                  margin="normal"
                >
                  <Select
                    disabled={
                      (credentialValidated || props.editMode) &&
                      provider !== AppConstants?.ClusterProvider?.CLOUDFLARE
                    }
                    name="provider"
                    value={provider}
                    color="primary"
                    onChange={(e) => handleProviderChange(e)}
                    MenuProps={{
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                    }}
                    data-test="provider-select"
                  >
                    <MenuItem value="Select">{"Select Provider"}</MenuItem>
                    {ClusterProviders &&
                      ClusterProviders.length > 0 &&
                      ClusterProviders.map((item, ind) => (
                        <MenuItem value={item.provider} key={ind}>
                          {item.name}
                        </MenuItem>
                      ))}
                    <MenuItem value={AppConstants.ClusterProvider.CLOUDFLARE}>
                      {"CloudFlare"}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {provider !== "Select" && (
                <>
                  {credentialValidated && (
                    <Grid item xs={12} md="6">
                      <Typography variant="h5">{"Name"}</Typography>
                      <MuiTextField
                        name="name"
                        value={name}
                        onChange={(e) => handleNameChange(e)}
                        type="text"
                        margin="normal"
                        inputProps={{
                          regex:
                            properties &&
                            properties.cluster_name &&
                            properties.cluster_name.validation,
                        }}
                        error={errors.name}
                        helperText={helperTexts.name}
                        placeholder={"Name"}
                        data-test="dns-name"
                      />
                    </Grid>
                  )}
                  {provider !== AppConstants?.ClusterProvider?.CLOUDFLARE &&
                    provider !== AppConstants?.ClusterProvider?.GCP && (
                      <Grid item xs={12} md="6">
                        <Typography variant="h5">{"Region"}</Typography>
                        <FormControl
                          className="w-100"
                          error={""}
                          variant="outlined"
                          margin="normal"
                        >
                          <Select
                            name="region"
                            value={region}
                            disabled={credentialValidated}
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
                            <MenuItem value="Select">
                              {"Select Region"}
                            </MenuItem>
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
                  {provider === AppConstants.ClusterProvider.CLOUDFLARE && (
                    <Grid item md={6} xs={12}>
                      <InfoPopupContainer
                        label={"Api Key"}
                        message={getInfoMessage().message}
                        url={getInfoUrl()}
                        scope={getInfoMessage().scope}
                      />

                      <MuiTextField
                        className="w-100"
                        margin="normal"
                        name="apiKey"
                        value={apiKey}
                        
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={"Cloudflare API Key"}
                        error={errors.apiKey}
                        helperText={helperTexts.apiKey}
                        data-test="api-key"
                      />
                    </Grid>
                  )}
                  {provider === AppConstants.ClusterProvider.CLOUDFLARE && (
                    <Grid item xs={12} md="6">
                      <Typography variant="h5">{"Cloudflare Email"}</Typography>
                      <MuiTextField
                        className="w-100"
                        margin="normal"
                        name="projectId"
                        value={projectId}
                        
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder={"CloudFlare Email"}
                        error={errors.projectId}
                        helperText={helperTexts.projectId}
                        data-test="cf-email"
                      />
                    </Grid>
                  )}
                  {(provider === AppConstants.ClusterProvider.EKS ||
                    provider === AppConstants.ClusterProvider.GCP) &&
                    credentialValidated && (
                      <Grid item xs={12} md="6">
                        <Typography variant="h5">{"Zone"}</Typography>
                        <MuiTextField
                          className="w-100"
                          margin="normal"
                          name="zone"
                          value={zone}
                          
                          onChange={(e) => setZone(e.target.value)}
                          placeholder={"Hosted Zone Id"}
                          error={errors.zone}
                          helperText={helperTexts.zone}
                          data-test="dns-hosted-zone"
                        />
                      </Grid>
                    )}
                  {provider === AppConstants.ClusterProvider.GCP &&
                    credentialValidated && (
                      <Grid item xs={12} md="6">
                        <Typography variant="h5">{"Project ID"}</Typography>
                        <MuiTextField
                          name="project_id"
                          value={project_id}
                          onChange={(e) => setProject_id(e.target.value)}
                          type="text"
                          margin="normal"
                          inputProps={
                            {
                              
                            }
                          }
                          error={errors.project_id}
                          helperText={helperTexts.project_id}
                          placeholder={"Project ID"}
                          data-test="project-id"
                        />
                      </Grid>
                    )}
                  {provider === AppConstants.ClusterProvider.EKS && (
                    <>
                      <Grid item xs={12} md="6">
                        <Typography variant="h5">{"Access Key"}</Typography>
                        <TextField
                          style={{
                            width: "0px",
                            height: "0px",
                          }}
                        />
                        <OutlinedInput
                          name="access_key"
                          disabled={credentialValidated}
                          value={access_key}
                          onChange={(e) => setAccess_key(e.target.value)}
                          type={isShowAccessKey ? "text" : "password"}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          error={errors.access_key}
                          helperText={helperTexts.access_key}
                          placeholder={"Access Key"}
                          className="m-t-20"
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
                          data-test="access-key"
                        >
                        </OutlinedInput>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        {}
                        <InfoPopupContainer
                          label={"Secret Key"}
                          message={getInfoMessage().message}
                          url={getInfoUrl()}
                          scope={getInfoMessage().scope}
                        />
                        <OutlinedInput
                          name="secret_key"
                          disabled={credentialValidated}
                          value={secret_key}
                          onChange={(e) => setSecret_key(e.target.value)}
                          type={isShowSecretKey ? "text" : "password"}
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          inputProps={
                            {
                              
                            }
                          }
                          error={errors.secret_key}
                          helperText={helperTexts.secret_key}
                          placeholder={"Secret Key"}
                          className="m-t-20"
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
                          data-test="secret-key"
                        >
                        </OutlinedInput>
                      </Grid>
                    </>
                  )}
                  {provider === AppConstants.ClusterProvider.GCP && (
                    <Grid item md={credentialValidated ? 12 : 6} xs={12}>
                      <InfoPopupContainer
                        label={"Credentials"}
                        message={getInfoMessage().message}
                        scope={getInfoMessage().scope}
                        url={getInfoUrl()}
                      />

                      <TextField
                        disabled={credentialValidated}
                        id=""
                        type="file"
                        title=""
                        color="primary"
                        name=""
                        variant="outlined"
                        className="w-100"
                        margin="normal"
                        onChange={(e) => onFileChange(e)}
                        data-test="cred-file"
                      />
                    </Grid>
                  )}
                  {credentialValidated && (
                    <Grid item xs={12} md="6">
                      <Typography variant="h5">{"Base Domain"}</Typography>
                      <MuiTextField
                        name="base_domain"
                        value={base_domain}
                        onChange={(e) => setBase_domain(e.target.value)}
                        type="text"
                        margin="normal"
                        inputProps={
                          {
                            
                          }
                        }
                        error={errors.base_domain}
                        helperText={helperTexts.base_domain}
                        placeholder={"Base Domain"}
                        data-test="base-domain"
                      />
                    </Grid>
                  )}
                </>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            justify={props.editMode ? "space-between" : "flex-end"}
          >
            {props.editMode && (
              <Grid item>
                <Button
                  className={classes.deleteButton}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(props?.editData)}
                  data-test="delete-btn"
                >
                  Delete DNS
                </Button>
              </Grid>
            )}
            <Grid item>
              {credentialValidated ? (
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  disabled={isFormValid()}
                  data-test="add-btn"
                >
                  {props.editMode ? "Update" : "Add"}
                </Button>
              ) : (
                <Button
                  onClick={handleValidate}
                  color="primary"
                  variant="contained"
                  disabled={isValidateFormValid()}
                  data-test="validate-btn"
                >
                  {"Validate"}
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
      {deleteObject && deleteObject.id > 0 && (
        <ConfirmDeletePopup
          open={deleteObject && deleteObject.id > 0}
          handleAgree={handleDeleteDnsAgree}
          handleDisAgree={handleDeleteDnsDisagree}
          message={`This action will permanently delete DNS data. Please type "${deleteObject.name}" to delete the DNS : ${deleteObject.name}`}
          yesText={"Delete"}
          noText={"Cancel"}
          action="delete"
          toMatchName={deleteObject.name}
          toDeleteModule="dns"
          loading={props.deletingDns}
          data-test="delete-popup"
        />
      )}
      {(props.isValidatingDnsPermission ||
        props.creatingDns ||
        props.updatingDns) && <BackdropLoader message={loadingMsg()} />}
    </>
  );
};

const mapStateToProps = (state) => ({
  providerConfig: state.DnsReducer.providerConfig,
  validationDnsData: state.DnsReducer.validationDnsData,
  isValidatingDnsPermission: state.DnsReducer.isValidatingDnsPermission,
  creatingDns: state.DnsReducer.creatingDns,
  deletingDns: state.DnsReducer.deletingDns,
  updatingDns: state.DnsReducer.updatingDns,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    validateDnsPermission: (jsonBody, uploadBody) =>
      dispatch(validateDnsPermission(jsonBody, uploadBody)),
    getProviderConfig: (provider) => dispatch(getProviderConfig(provider)),
    createDns: (jsonBody, uploadBody, callback) =>
      dispatch(createDns(jsonBody, uploadBody, callback)),
    updateDns: (dnsId, jsonBody, uploadBody, callback) =>
      dispatch(updateDns(dnsId, jsonBody, uploadBody, callback)),
    clearDnsValidation: () => dispatch(clearDnsValidation()),
    deleteDns: (dnsId, callback) => dispatch(deleteDns(dnsId, callback)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddDNSPopup);
