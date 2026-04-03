import React, { Component } from "react";
import {
  Grid,
  
  Button,
  CardActions,
  Divider,
  
  TextField,
  Card,
  CardHeader,
  CardContent,
  Switch,
  
  FormControlLabel,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { connect } from "react-redux";
import { fetchCategories } from "./redux/actions";
import { Formik } from "formik";
import MuiTextField from "../../components/textfield/MuiTextField";
import * as Yup from "yup";
import paths from "../../constants/paths";
import PluginAddonsList from "./PluginAddonsList";

export class PluginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pluginFile: null,
      formDirty: false,
      fileValid: false,
      addons: "",
      categoriesValue: [],
    };
  }
  submitValues = (values) => {
    if (this.state.pluginFile !== null) {
      values.pluginFile = this.state.pluginFile;
    }
    if (this.props.edit && this.props.pluginData) {
      values.id = this.props.pluginData.id;
    }
    values.add_ons = this.state.addons;
    values.categories = values.is_add_on ? this.state.categoriesValue : [];
    this.props.pluginAction(values);
  };

  setCategories = (cat) => {
    this.setState({
      categoriesValue: cat,
    });
  };

  componentDidMount() {
    
    this.props.fetchCategories();
    if (this.props.edit && this.props.pluginData) {
      this.setCategories(this.props.pluginData?.Categories);
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.pluginData && newProps.edit) {
      this.setCategories(newProps.pluginData?.Categories);
    }
  }

  categoryChanged = (e, value) => {
    if (e) {
      this.setState({
        categoriesValue: value,
        formDirty: true,
      });
    }
  };

  handleCancel = () => {
    this.props.history.push(`${paths.PLUGIN}`);
  };

  handleFileChange = (e) => {
    this.setState({
      pluginFile: e.target.files[0],
      formDirty: true,
      
    });
  };

  setAddons = (addons) => {
    this.setState({
      addons,
      formDirty: true,
    });
  };
  render() {
    const { edit, pluginData } = this.props;
    const { formDirty } = this.state;
    return (
      <div data-test="main-container">
        <Card>
          <CardHeader data-test="card-header" title={edit ? "Update Plugin" : "Add Plugin"} />
          <Divider />
          <CardContent>
            <Formik
              initialValues={{
                pluginName: (edit && pluginData?.name) ?? "",
                pluginDescription: (edit && pluginData?.description) ?? "",
                pluginSourceUrl: (edit && pluginData?.source_url) ?? "",
                min_cpu: (edit && pluginData?.min_cpu) ?? 100,
                min_memory: (edit && pluginData?.min_memory) ?? 128,
                support_ci: (edit && pluginData?.support_ci) ?? false,
                pluginActive: (edit && pluginData?.active) ?? true,
                is_add_on: (edit && pluginData?.is_add_on) ?? false,
              }}
              enableReinitialize={true}
              onSubmit={this.submitValues}
              validationSchema={Yup.object().shape({
                pluginName: Yup.string()
                  .min(2, "Too Short!")
                  .max(30, "Too Long!")
                  .required("Please enter Plugin name"),
                pluginSourceUrl: Yup.string()
                  .url("Provide a Valid Source URL")
                  .min(5, "Too Short")
                  .required("Please enter a plugin source url"),
                pluginDescription: Yup.string()
                  .min(10, "Too Short!")
                  .max(300, "Too Long!")
                  .required("Please Enter Plugin Description"),
                min_memory: Yup.number()
                  .required("Please Enter Minimum Memory")
                  .min(128, "Minimum memory cannot be less than 128"),
                min_cpu: Yup.number()
                  .required("Please Enter Minimum CPU")
                  .min(100, "Minimum CPU cannot be less than 100"),
                support_ci: Yup.bool(),
                pluginActive: Yup.bool(),
                is_add_on: Yup.bool(),
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
                  <form onSubmit={handleSubmit}>
                    <Grid>
                      <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                          <MuiTextField
                            id="pluginName"
                            error={errors.pluginName && touched.pluginName}
                            label="Plugin Name"
                            name="pluginName"
                            data-test="name-field"
                            autoFocus
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.pluginName}
                            onBlur={handleBlur}
                            helperText={
                              errors.pluginName &&
                              touched.pluginName &&
                              errors.pluginName
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <MuiTextField
                            id="pluginSourceUrl"
                            error={
                              errors.pluginSourceUrl && touched.pluginSourceUrl
                            }
                            label="Plugin Source Url"
                            data-test="url-field"
                            name="pluginSourceUrl"
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.pluginSourceUrl}
                            onBlur={handleBlur}
                            helperText={
                              errors.pluginSourceUrl &&
                              touched.pluginSourceUrl &&
                              errors.pluginSourceUrl
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                          <MuiTextField
                            id="min_memory"
                            error={errors.min_memory && touched.min_memory}
                            label="Minimum Memory"
                            name="min_memory"
                            data-test="minMemory-field"
                            type="number"
                            autoFocus
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.min_memory}
                            onBlur={handleBlur}
                            helperText={
                              errors.min_memory &&
                              touched.min_memory &&
                              errors.min_memory
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <MuiTextField
                            id="min_cpu"
                            error={errors.min_cpu && touched.min_cpu}
                            label="Minimum CPU"
                            name="min_cpu"
                            data-test="minCpu-field"
                            type="number"
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.min_cpu}
                            onBlur={handleBlur}
                            helperText={
                              errors.min_cpu &&
                              touched.min_cpu &&
                              errors.min_cpu
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={8} xs={12}>
                          <MuiTextField
                            data-test="description-field"
                            id="lastName"
                            error={
                              errors.pluginDescription &&
                              touched.pluginDescription
                            }
                            type="pluginDescription"
                            color="primary"
                            label="Plugin Description"
                            name="pluginDescription"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            value={values.pluginDescription}
                            onBlur={handleBlur}
                            multiline
                            helperText={
                              errors.pluginDescription &&
                              touched.pluginDescription &&
                              errors.pluginDescription
                            }
                            margin="normal"
                            variant="outlined"
                            rows={5}
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={4} xs={12}>
                          <TextField
                            data-test="file-field"
                            id="pluginFile"
                            error={errors.pluginFile && touched.pluginFile}
                            type="file"
                            title="Select Plugin Icon"
                            color="primary"
                            name="pluginFile"
                            onChange={this.handleFileChange}
                            value={values.pluginFile}
                            onBlur={handleBlur}
                            helperText={
                              errors.pluginFile &&
                              touched.pluginFile &&
                              errors.pluginFile
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={3} xs={12}>
                          <FormControlLabel
                            data-test="status-field"
                            control={
                              <Switch
                                checked={values.pluginActive}
                                onChange={handleChange}
                                name="pluginActive"
                                color="primary"
                              />
                            }
                            label={values.pluginActive ? "Active" : "Inactive"}
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <FormControlLabel
                            data-test="ci-field"
                            control={
                              <Switch
                                checked={values.support_ci}
                                onChange={handleChange}
                                name="support_ci"
                                color="primary"
                              />
                            }
                            label={
                              values.support_ci
                                ? "Supports CI"
                                : "Doesn't Support CI"
                            }
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <FormControlLabel
                            data-test="isAddon-field"
                            control={
                              <Switch
                                checked={values.is_add_on}
                                onChange={handleChange}
                                name="is_add_on"
                                color="primary"
                              />
                            }
                            label={values.is_add_on ? "Addon" : "Not Addon"}
                          />
                        </Grid>
                      </Grid>
                      {values.is_add_on && (
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <Autocomplete
                              multiple
                              data-test="autocomplete-field"
                              limitTags={2}
                              id="multiple-limit-tags"
                              options={this.props.categories}
                              getOptionLabel={(option) => option?.name}
                              defaultValue={[]}
                              value={this.state.categoriesValue}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Category"
                                  placeholder="Category"
                                />
                              )}
                              onChange={(e, value, reason) =>
                                this.categoryChanged(e, value, reason)
                              }
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                    <br />
                    {!values.is_add_on && (
                      <PluginAddonsList
                        data-test="addonList-field"
                        setAddons={this.setAddons}
                        AddOns={edit ? pluginData.AddOns : null}
                      />
                    )}
                    <Divider />

                    <CardActions>
                      <Button color="secondary" onClick={this.handleCancel} data-test="cancel-button">
                        Cancel
                      </Button>
                      <Button
                        data-test="add-button"
                        disabled={
                          !((isValid && dirty) || (formDirty && isValid)) ||
                          (edit ? false : this.state.pluginFile === null)
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
                );
              }}
            </Formik>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.PluginReducer.categories,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PluginForm);
