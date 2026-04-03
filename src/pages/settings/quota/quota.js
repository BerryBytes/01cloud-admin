import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import {
  Grid,
  Button,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import BackdropLoader from "../../../components/loader/BackdropLoader";
import MuiTextField from "../../../components/textfield/MuiTextField";
import { clearQuotaConfig, fetchQuotaConfig, updateQuotaConfig } from "../../common/redux/actions";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    content: {
      padding: 10,
    },
  })
);

const UserQuota = (props) => {
  const {
    fetchQuotaConfigData,
    updateQuotaConfigData,
    fetchingQuotaConfig,
    quotaConfig,
    isUpdatingQuataConfig,
    clearQuotaConfigData
  } = props;
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    payment_threshold_days: Yup.number("Value must be a number")
      .required("Threshold days value is required")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value >= 0
      )
      .integer("Input value must not contain decimal places"),

    user_project: Yup.number("Value must be a number")
      .required("User Project value is required")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value >= 0
      )
      .integer("Input value must not contain decimal places"),
    user_organization: Yup.number("Value must be a number")
      .required("User organization value is required")
      .test(
        "Is positive?",
        "ERROR: The number must be greater than 0!",
        (value) => value >= 0
      )
      .integer("Input value must not contain decimal places"),
  });

  const configData = {
    payment_threshold_days: 0,
    user_organization: 0,
    user_project: 0,
  };

  const [initialValues, setInitialValues] = useState(configData);

  useEffect(() => {
    if (quotaConfig) {
      setInitialValues((state) => ({
        ...state,

        payment_threshold_days: quotaConfig.payment_threshold_days,
        user_organization: props.quotaConfig.quotas.user_organization,
        user_project: props.quotaConfig.quotas.user_project,
      }));
    }
    return ()=>{clearQuotaConfigData()}
  }, [quotaConfig,clearQuotaConfigData]);
  useEffect(() => {
    fetchQuotaConfigData();
  
  }, [fetchQuotaConfigData]);

  const handleFormikSubmit = (values) => {
    
    const { user_project, user_organization, payment_threshold_days } = values;
    
    if (
      user_project < 0 ||
      !user_organization < 0 ||
      !payment_threshold_days < 0
    ) {
      return;
    }

    const configPayload = {
      payment_threshold_days: payment_threshold_days,
      quotas: {
        user_organization: user_organization,
        user_project: user_project,
      },
    };
    updateQuotaConfigData(configPayload);
    
  };

  if (fetchingQuotaConfig) {
    return <BackdropLoader message="Getting config data" />;
  } else if (isUpdatingQuataConfig) {
    return <BackdropLoader message="Updating config data" />;
  }
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader title={"Quota configuration"} />
        <Divider />
        <CardContent className={classes.content}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormikSubmit}
          >
            {({ errors, isValid, touched, dirty, values }) => {
              return (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                      <Field
                        as={MuiTextField}
                        margin="normal"
                        required
                        fullWidth
                        id="payment_threshold_days"
                        type="number"
                        label="Payment threshold days"
                        name="payment_threshold_days"
                        autoComplete="payment_threshold_days"
                        value={values.payment_threshold_days}
                        error={
                          Boolean(errors.payment_threshold_days) &&
                          Boolean(touched.payment_threshold_days)
                        }
                        helperText={errors.payment_threshold_days}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Field
                        as={MuiTextField}
                        margin="normal"
                        required
                        fullWidth
                        id="user_organization"
                        type="number"
                        label="User Organization"
                        name="user_organization"
                        autoComplete="user_organization"
                        value={values.user_organization}
                        error={
                          Boolean(errors.user_organization) &&
                          Boolean(touched.user_organization)
                        }
                        helperText={errors.user_organization}
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <Field
                        as={MuiTextField}
                        margin="normal"
                        required
                        fullWidth
                        id="user_project"
                        type="number"
                        label="User Project"
                        name="user_project"
                        autoComplete="user_project"
                        value={values.user_project}
                        error={
                          Boolean(errors.user_project) &&
                          Boolean(touched.user_project)
                        }
                        helperText={errors.user_project}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!isValid || !dirty}
                  >
                    Submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </CardContent>
        <CardHeader />
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  fetchingQuotaConfig: state.CommonReducer.fetchingQuotaConfig,
  quotaConfig: state.CommonReducer.quotaConfig,
  
  isUpdatingQuataConfig: state.CommonReducer.isUpdatingQuataConfig,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchQuotaConfigData: () => dispatch(fetchQuotaConfig()),
    updateQuotaConfigData: (quotaConfig) =>
      dispatch(updateQuotaConfig(quotaConfig)),
      clearQuotaConfigData:()=>dispatch(clearQuotaConfig())
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(UserQuota);
