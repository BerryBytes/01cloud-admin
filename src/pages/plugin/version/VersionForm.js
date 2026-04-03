import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  CardActions,
  Card,
  CardHeader,
  FormControlLabel,
  Switch,
  CardContent,
} from "@material-ui/core";
import { Formik } from "formik";
import MuiTextField from "../../../components/textfield/MuiTextField";
import * as Yup from "yup";
import paths from "../../../constants/paths";
export class VersionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      package: null,
      fileDirty: false,
      
    };
  }

  submitValues = (values) => {
    if (this.state.package) {
      values.package = this.state.package;
    }

    this.props.versionAction(values);
  };

  handleCancel = () => {
    this.props.history.push(
      `${paths.PLUGIN_INFO.replace(":id", this.props.pluginId)}`
    );
  };

  handleFileChange = (e) => {
    this.setState({
      fileDirty: true,
      [e.target.name]: e.target.files[0],
    });
  };
  render() {
    const { edit, versionData } = this.props;
    return (
      <div data-test="main-container">
        <Card>
          <CardContent>
            <CardHeader data-test="card-header" title={edit ? "Update Version" : "Add Version"} />
            <Divider />

            <Formik
              initialValues={{
                versionName:
                  edit && versionData && versionData.version
                    ? versionData.version
                    : "",
                versionUrl:
                  edit && versionData && versionData.url ? versionData.url : "",
                active:
                  edit && versionData && versionData.active
                    ? versionData.active
                    : false,

                changeLog:
                  edit && versionData && versionData.change_logs
                    ? versionData.change_logs
                    : "",
                upgradable: 
                    edit && versionData && versionData.upgradable
                    ? versionData.upgradable
                    : false,
              }}
              enableReinitialize={true}
              onSubmit={this.submitValues}
              validationSchema={Yup.object().shape({
                versionName: Yup.string().required("Version Name is required"),
                changeLog: Yup.string()
                  .min(0)
                  .required("Version Change Log is required"),
                active: Yup.bool(),
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
                            id="versionName"
                            data-test="version-field"
                            error={errors.versionName && touched.versionName}
                            label="Version Name"
                            name="versionName"
                            autoFocus
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.versionName}
                            onBlur={handleBlur}
                            helperText={
                              errors.versionName &&
                              touched.versionName &&
                              errors.versionName
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
         
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                          <Typography
                            component="h6"
                            variant="subtitle1"
                            className="m-t-20"
                          >
                            Package
                          </Typography>
                          <TextField
                            data-test="package-field"
                            id="package"
                            error={errors.package && touched.package}
                            type="file"
                            color="primary"
                            name="package"
                            onChange={this.handleFileChange}
                            value={values.package}
                            onBlur={handleBlur}
                            helperText={
                              errors.package &&
                              touched.package &&
                              errors.package
                            }
                            margin="normal"
                            style={{ width: "100%" }}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={12}>
                          <MuiTextField
                            id="changeLog"
                            data-test="changeLog-field"
                            error={errors.changeLog && touched.changeLog}
                            type="changeLog"
                            color="primary"
                            label="Change Log"
                            name="changeLog"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            value={values.changeLog}
                            onBlur={handleBlur}
                            multiline
                            helperText={
                              errors.changeLog &&
                              touched.changeLog &&
                              errors.changeLog
                            }
                            margin="normal"
                            variant="outlined"
                            rows={5}
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                      <Grid item md={3} xs={12}>
                          <FormControlLabel
                            data-test="ci-field"
                            control={
                              <Switch
                                checked={values.active}
                                onChange={handleChange}
                                name="active"
                                color="primary"
                              />
                            }
                            label={values.active ? "Active" : "Inactive"}
                          />
                      </Grid>
                      </Grid>
                      <Grid container>
                      <Grid item md={3} xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={values.upgradable}
                                onChange={handleChange}
                                name="upgradable"
                                color="primary"
                              />
                            }
                            label="upgradable"
                          />
                      </Grid>
                      </Grid>
                    </Grid>
                    <br/>
                    <Divider />
                    <CardActions>
                      <Button color="secondary" onClick={this.handleCancel} data-test="cancel-button">
                        Cancel
                      </Button>
                      <Button
                        data-test="add-button"
                        disabled={
                          !(
                            (isValid && dirty) ||
                            (this.state.fileDirty && isValid)
                          ) || (edit ? false : this.state.package === null)
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

export default VersionForm;
