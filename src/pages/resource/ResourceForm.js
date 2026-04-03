import React, { Component } from "react";
import {
  Grid,
  Button,
  Divider,
  CardActions,
  CardHeader,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
} from "@material-ui/core";

import CustomButton from "../../components/custombutton/CustomButton";

import { Formik } from "formik";
import MuiTextField from "../../components/textfield/MuiTextField";

import * as Yup from "yup";

export class ResourceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleCancel = () => {
    this.props.history.push("/resources");
  };

  submitValues = (values) => {
    if (this.props.edit && this.props.resourceData) {
      values.id = this.props.resourceData.id;
    }
    this.props.resourceAction(values);
  };

  render() {
    const { edit, resourceData } = this.props;
    return (
      <div data-test="main-container">
        <Card>
          <CardHeader data-test="card-header" title={edit ? "Update Resource" : "Add Resource"} />
          <Divider />
          <CardContent>
            <Formik
              data-test="formik-component"
              initialValues={{
                resourceName:
                  edit && resourceData.name ? resourceData.name : "",
                cores: edit && resourceData.cores ? resourceData.cores : "",
                memory: edit && resourceData.memory ? resourceData.memory : "",
                weight: edit && resourceData.weight ? resourceData.weight : "",
                active:
                  edit ? resourceData.active : true,
              }}
              enableReinitialize={true}
              onSubmit={this.submitValues}
              validationSchema={Yup.object().shape({
                resourceName: Yup.string()
                  .min(2, "Too Short!")
                  .max(30, "Too Long!")
                  .required("Please enter Resource name"),
                cores: Yup.number()
                  .positive("Must be positive")
                  .required("Please Enter Cores"),
                memory: Yup.number()
                  .positive("Must be Positive")
                  .required("Please Enter Memory"),
                  weight: Yup.number()
                  .positive("Must be Positive")
                  .required("Please Enter Resource weight"),
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
                            id="resourceName"
                            error={errors.resourceName && touched.resourceName}
                            label="Name"
                            name="resourceName"
                            data-test="resourcename-input"
                            autoFocus
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            onChange={handleChange}
                            value={values.resourceName}
                            onBlur={handleBlur}
                            variant="outlined"
                            helperText={
                              errors.resourceName &&
                              touched.resourceName &&
                              errors.resourceName
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={3} xs={12}>
                          <MuiTextField
                            id="cores"
                            error={errors.cores && touched.cores}
                            label="Cores"
                            type="number"
                            name="cores"
                            data-test="cores-input"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            value={values.cores}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            helperText={
                              errors.cores && touched.cores && errors.cores
                            }
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <MuiTextField
                            id="memory"
                            error={errors.memory && touched.memory}
                            label="Memory"
                            type="number"
                            name="memory"
                            data-test="memory-input"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            value={values.memory}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            helperText={
                              errors.memory && touched.memory && errors.memory
                            }
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <MuiTextField
                            id="weight"
                            error={errors.weight && touched.weight}
                            label="Resource Weight"
                            type="number"
                            name="weight"
                            data-test="weight-input"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            value={values.weight}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            variant="outlined"
                            helperText={
                              errors.weight && touched.weight && errors.weight
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md={3} xs={12}>
                          <FormControlLabel
                            data-test="active"
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
                    </Grid>
                    <br />
                    <Divider />
                    <CardActions>
                      <CustomButton
                        data-test="cancel-button"
                        onClick={this.handleCancel}
                        type="danger"
                        label={"Cancel"}
                      />

                      <Button
                        data-test="button"
                        disabled={!(isValid && dirty)}
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

export default ResourceForm;
