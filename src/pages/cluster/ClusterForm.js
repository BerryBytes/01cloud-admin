import React, { Component } from "react";
import {
  Grid,
  Button,
  Divider,
  Card,
  CardActions,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  CardHeader,
  CardContent,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { connect } from "react-redux";
import CustomButton from "../../components/custombutton/CustomButton";
import { Formik } from "formik";
import MuiTextField from "../../components/textfield/MuiTextField";
import AddTags from "../../components/tagsinput/AddTags";

import * as Yup from "yup";
import { getRegions } from "./createcluster/redux/actions";

export class ClusterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clusterInfo: this.props.clusterInfo,
      config: null,
      regions: [
        "Africa",
        "Asia Pacific East",
        "Asia Pacific North East",
        "Asia Pacific South",
        "Australia",
        "Europe Central",
        "Europe North",
        "Europe West",
        "South America",
        "US East",
        "US West",
      ],
      zones: ["A", "B", "C", "D"],
      providers: ["AWS", "Digital Ocean", "GCP", "Linode"],
      tags: [],
      fileDirty: false,
      labelDirty: false,
    };
  }
  handleFileChange = (e) => {
    this.setState({
      [e.target.name]: e.target.files[0],
      fileDirty: true,
    });
  };

  handleCancel = () => {
    this.props.history.push("/cluster");
  };

  submitValues = (values) => {
    values.label = this.state.tags;
    if (this.state.config) {
      values.config = this.state.config;
    }
    if (this.props.edit && this.props.clusterData) {
      values.id = this.props.clusterData.id;
    }
    this.props.clusterAction(values);
  };

  selectedTags = (tags) => {
    this.setState(
      {
        tags: tags,
      },
      () => {
        if (
          this.props.edit &&
          this.props.clusterData &&
          this.props.clusterData.labels
        ) {
          const labels = this.props.clusterData.labels.split(",");
          if (JSON.stringify(this.state.tags) !== JSON.stringify(labels)) {
            this.setState({
              labelDirty: true,
            });
          } else {
            this.setState({
              labelDirty: false,
            });
          }
        }
      }
    );
  };

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  componentDidMount() {
    this.props.fetchRegions();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (
      newProps.clusterData !== this.props.clusterData &&
      newProps.clusterData.labels
    ) {
      const labels = newProps.clusterData.labels.split(",");
      this.setState({
        tags: labels,
      });
    }
  }
  render() {
    const { providers, regions, tags } = this.state;
    const { clusterData, edit } = this.props;

    return (
      <div>
        <Grid item className="add-cluster-form" data-test="main-container">
          <Formik
            initialValues={{
              clusterName:
                edit && clusterData && clusterData.name ? clusterData.name : "",
              clusterContext:
                edit && clusterData && clusterData.context
                  ? clusterData.context
                  : "",
              clusterToken:
                edit && clusterData && clusterData.token
                  ? clusterData.token
                  : "",
              clusterRegion:
                edit && clusterData && clusterData.region
                  ? clusterData.region
                  : "",
              clusterZone:
                edit && clusterData && clusterData.zone ? clusterData.zone : "",
              clusterProvider:
                edit && clusterData && clusterData.provider
                  ? clusterData.provider
                  : "",
              clusterLabel:
                edit && clusterData && clusterData.label
                  ? clusterData.label
                  : "",
              active:
                edit && clusterData && clusterData.active
                  ? clusterData.active
                  : false,
              clusterNodes:
                edit && clusterData && clusterData.nodes
                  ? clusterData.nodes
                  : "",
              prometheus_server_url:
                edit && clusterData && clusterData.prometheus_server_url
                  ? clusterData.prometheus_server_url
                  : "",
              argo_server_url:
                edit && clusterData && clusterData.argo_server_url
                  ? clusterData.argo_server_url
                  : "",
              image_repo_service:
                edit && clusterData && clusterData.image_repo_service
                  ? clusterData.image_repo_service
                  : "",
              image_repo_username:
                edit && clusterData && clusterData.image_repo_username
                  ? clusterData.image_repo_username
                  : "",
              image_repo_password:
                edit && clusterData && clusterData.image_repo_password
                  ? clusterData.image_repo_password
                  : "",
              dns_zone:
                edit && clusterData && clusterData.dns_zone
                  ? clusterData.dns_zone
                  : "",
              image_repo_project:
                edit && clusterData && clusterData.image_repo_project
                  ? clusterData.image_repo_project
                  : "",
              pv_capacity:
                edit && clusterData && clusterData.pv_capacity
                  ? clusterData.pv_capacity
                  : "",
              storage_access_key:
                edit && clusterData && clusterData.storage_access_key
                  ? clusterData.storage_access_key
                  : "",
              storage_secret_key:
                edit && clusterData && clusterData.storage_secret_key
                  ? clusterData.storage_secret_key
                  : "",
            }}
            enableReinitialize={true}
            onSubmit={this.submitValues}
            validationSchema={Yup.object().shape({
              clusterName: Yup.string().required("Cluster Name is required"),
              clusterContext: Yup.string().required("Context is required"),
              clusterToken: Yup.string(),
              
              active: Yup.bool(),
              clusterZone: Yup.string().required("Zone is required"),
              clusterProvider: Yup.string().required("Provider is required"),
              prometheus_server_url: Yup.string().required(
                "Prometheus Server URl is required"
              ),
              argo_server_url: Yup.string().required(
                "Argo Server URL is required"
              ),
              image_repo_service: Yup.string().required(
                "Image Repo Service is required"
              ),
              image_repo_username: Yup.string().required(
                "Image Repo UserName is required"
              ),
              image_repo_password: Yup.string().required(
                "Image Repo password is required"
              ),
              dns_zone: Yup.string().required("DNS zone is required"),
              image_repo_project: Yup.string().required(
                "Image Repo Project is required"
              ),
              storage_access_key: Yup.string().required(
                "Storage access key is required"
              ),
              storage_secret_key: Yup.string().required(
                "Storage secret key is required"
              ),
              pv_capacity: Yup.number()
                .positive()
                .required("PVC Capacity is required"),
            })}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
              } = props;
              return (
                <Card>
                  <CardHeader data-test="card-header" title={edit ? "Update Cluster" : "Add Cluster"} />
                  <Divider />
                  <CardContent>
                    <form onSubmit={handleSubmit} onKeyDown={this.onKeyDown}>
                      <Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="clusterName"
                              error={errors.clusterName && touched.clusterName}
                              label="Name"
                              name="clusterName"
                              data-test="name-field"
                              autoFocus
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.clusterName}
                              onBlur={handleBlur}
                              helperText={
                                errors.clusterName &&
                                touched.clusterName &&
                                errors.clusterName
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="clusterContext"
                              error={
                                errors.clusterContext && touched.clusterContext
                              }
                              label="Context"
                              name="clusterContext"
                              data-test="context-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.clusterContext}
                              onBlur={handleBlur}
                              helperText={
                                errors.clusterContext &&
                                touched.clusterContext &&
                                errors.clusterContext
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="changeLog"
                              error={
                                errors.clusterToken && touched.clusterToken
                              }
                              type="clusterToken"
                              color="primary"
                              label="Token"
                              data-test="token-field"
                              name="clusterToken"
                              style={{ width: "100%" }}
                              onChange={handleChange}
                              value={values.clusterToken}
                              onBlur={handleBlur}
                              helperText={
                                errors.clusterToken &&
                                touched.clusterToken &&
                                errors.clusterToken
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="config"
                              title="Select Config File"
                              error={errors.config && touched.config}
                              type="file"
                              color="primary"
                              data-test="config-field"
                              name="config"
                              style={{ width: "100%" }}
                              onChange={this.handleFileChange}
                              value={values.config}
                              onBlur={handleBlur}
                              helperText={
                                errors.config && touched.config && errors.config
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>

                            <FormControl
                              variant="outlined"
                              id="clusterRegion"
                              error={
                                errors.clusterProvider &&
                                touched.clusterProvider
                              }
                              style={{ width: "100%" }}
                              margin="normal"
                            >
                              <InputLabel>Provider</InputLabel>
                              <Select
                                id="demo-simple-select-outlined"
                                value={values.clusterProvider}
                                onChange={handleChange}
                                data-test="provider-field"
                                label="Provider"
                                name="clusterProvider"
                                helpertext={
                                  errors.clusterProvider &&
                                  touched.clusterProvider &&
                                  touched.clusterProvider &&
                                  errors.clusterProvider
                                }
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {providers &&
                                  providers.map((provider, ind) => (
                                    <MenuItem value={provider} key={ind}>
                                      {provider}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <FormControl
                              variant="outlined"
                              id="clusterRegion"
                              error={
                                errors.clusterRegion && touched.clusterRegion
                              }
                              style={{ width: "100%" }}
                              margin="normal"
                            >
                              <InputLabel>Region</InputLabel>
                              <Select
                                id="demo-simple-select-outlined"
                                value={values.clusterRegion}
                                onChange={handleChange}
                                label="Region"
                                name="clusterRegion"
                                data-test="region-field"
                                helpertext={
                                  errors.clusterRegion &&
                                  touched.clusterRegion &&
                                  touched.clusterRegion &&
                                  errors.clusterRegion
                                }
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                {regions &&
                                  regions.map((region, ind) => (
                                    <MenuItem value={region} key={ind}>
                                      {region}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="clusterZone"
                              error={errors.clusterZone && touched.clusterZone}
                              label="Zone"
                              name="clusterZone"
                              data-test="zone-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.clusterZone}
                              onBlur={handleBlur}
                              helperText={
                                errors.clusterZone &&
                                touched.clusterZone &&
                                errors.clusterZone
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            
                            <AddTags
                              data-test="tags-field"
                              tags={tags}
                              selectedTags={this.selectedTags}
                              label={"Label (Press Enter to add Tags)"}
                              name="clusterLabel"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="prometheus_server_url"
                              error={
                                errors.prometheus_server_url &&
                                touched.prometheus_server_url
                              }
                              label="Prometheus Server URL"
                              name="prometheus_server_url"
                              style={{ width: "100%" }}
                              color="primary"
                              data-test="prometheus-field"
                              onChange={handleChange}
                              value={values.prometheus_server_url}
                              onBlur={handleBlur}
                              helperText={
                                errors.prometheus_server_url &&
                                touched.prometheus_server_url &&
                                errors.prometheus_server_url
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="argo_server_url"
                              error={
                                errors.argo_server_url &&
                                touched.argo_server_url
                              }
                              label="Argo Server URL"
                              name="argo_server_url"
                              data-test="argo-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.argo_server_url}
                              onBlur={handleBlur}
                              helperText={
                                errors.argo_server_url &&
                                touched.argo_server_url &&
                                errors.argo_server_url
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="image_repo_service"
                              error={
                                errors.image_repo_service &&
                                touched.image_repo_service
                              }
                              label="Image Repo Service"
                              name="image_repo_service"
                              data-test="image-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.image_repo_service}
                              onBlur={handleBlur}
                              helperText={
                                errors.image_repo_service &&
                                touched.image_repo_service &&
                                errors.image_repo_service
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="image_repo_username"
                              error={
                                errors.image_repo_username &&
                                touched.image_repo_username
                              }
                              label="Image Repo User Name"
                              name="image_repo_username"
                              data-test="username-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.image_repo_username}
                              onBlur={handleBlur}
                              helperText={
                                errors.image_repo_username &&
                                touched.image_repo_username &&
                                errors.image_repo_username
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="image_repo_project"
                              error={
                                errors.image_repo_project &&
                                touched.image_repo_project
                              }
                              label="Image Repo Project"
                              name="image_repo_project"
                              data-test="imagerepo-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.image_repo_project}
                              onBlur={handleBlur}
                              helperText={
                                errors.image_repo_project &&
                                touched.image_repo_project &&
                                errors.image_repo_project
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="image_repo_password"
                              error={
                                errors.image_repo_password &&
                                touched.image_repo_password
                              }
                              label="Image Repo Password"
                              name="image_repo_password"
                              data-test="imagerepopassword-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.image_repo_password}
                              onBlur={handleBlur}
                              helperText={
                                errors.image_repo_password &&
                                touched.image_repo_password &&
                                errors.image_repo_password
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="dns_zone"
                              error={errors.dns_zone && touched.dns_zone}
                              label="DNS Zone"
                              name="dns_zone"
                              data-test="dnszone-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.dns_zone}
                              onBlur={handleBlur}
                              helperText={
                                errors.dns_zone &&
                                touched.dns_zone &&
                                errors.dns_zone
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="pvc_capacity"
                              error={errors.pv_capacity && touched.pv_capacity}
                              label="PV Capacity"
                              name="pv_capacity"
                              data-test="pv-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.pv_capacity}
                              onBlur={handleBlur}
                              helperText={
                                errors.pv_capacity &&
                                touched.pv_capacity &&
                                errors.pv_capacity
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="storage_access_key"
                              error={errors.storage_access_key && touched.storage_access_key}
                              label="Storage access key"
                              name="storage_access_key"
                              data-test="storage-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.storage_access_key}
                              onBlur={handleBlur}
                              helperText={
                                errors.storage_access_key &&
                                touched.storage_access_key &&
                                errors.storage_access_key
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="storage_secret_key"
                              error={errors.storage_secret_key && touched.storage_secret_key}
                              label="Storage secret key"
                              name="storage_secret_key"
                              data-test="storagesecret-field"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.storage_secret_key}
                              onBlur={handleBlur}
                              helperText={
                                errors.storage_secret_key &&
                                touched.storage_secret_key &&
                                errors.storage_secret_key
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                          <Grid item md={3} xs={12}>
                            <FormControlLabel
                              data-test="active-field"
                              control={
                                <Switch
                                  checked={values.active}
                                  onChange={handleChange}
                                  name="active"
                                  color="primary"
                                />
                              }
                              label={values.support_ci ? "Active" : "Inactive"}
                            />
                          </Grid>
                        </Grid>
                      </Grid>

                      <br />
                      <Divider />
                      <CardActions>
                        <CustomButton
                          data-test="button-field"
                          type="danger"
                          label={"Cancel"}
                          onClick={this.handleCancel}
                        />
                        <Button
                          disabled={
                            !(
                              (isValid && dirty) ||
                              (this.state.fileDirty && isValid) ||
                              (this.state.labelDirty && isValid)
                            ) || (edit ? false : this.state.config === null)
                          }
                          className="oneRemLeftMarginSeperator"
                          color="primary"
                          type="submit"
                          variant="contained"
                        >
                          {edit ? "Update" : "Add"}
                        </Button>
                      </CardActions>
                    </form>
                  </CardContent>
                </Card>
              );
            }}
          </Formik>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    regions: state.CreateClusterReducer.regions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchRegions: () => dispatch(getRegions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClusterForm);
