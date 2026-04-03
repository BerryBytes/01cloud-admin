import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Divider,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import BackdropLoader from "../loader/BackdropLoader";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MuiTextField from "../../components/textfield/MuiTextField";
import ClearIcon from "@material-ui/icons/Clear";
import { updateUserQuota } from "../../pages/user/redux/actions";
import { connect } from "react-redux";
import {
  fetchQuotaConfig,
  clearQuotaConfig,
} from "../../pages/common/redux/actions";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: "100%",
    },
    content: {
      padding: 10,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    clearIcon: {
      padding: 10,
    },
  })
);

function FormDialog({
  userData,
  resetQuotaIndex,
  updateUserQuotaConfig,
  fetchDefaultQuotaConfig,
  fetchingQuotaConfig,
  quotaConfig,
  clearQuotaConfigData,
  userQuotaUpdated
}) {
  const [initialValues, setInitialValues] = useState(userData.quotas);
  const classes = useStyles();

  useEffect(()=>{
    if(userQuotaUpdated){
      setTimeout(()=>{
        resetQuotaIndex()
      },3000)

    }
  },[userQuotaUpdated])
  useEffect(() => {
    if (userData && userData.quotas === null) {
      fetchDefaultQuotaConfig();
    }
    return () => {
      clearQuotaConfigData();
    };
  }, [fetchDefaultQuotaConfig, userData, clearQuotaConfigData]);

  useEffect(() => {
    if (userData && userData.quotas !== null) {
      setInitialValues((state) => ({
        ...state,

        user_organization: userData.quotas.user_organization,
        user_project: userData.quotas.user_project,
      }));
    }
    if (userData && userData.quotas === null && quotaConfig !== null) {
      setInitialValues((state) => ({
        ...state,

        user_organization: quotaConfig.quotas.user_organization,
        user_project: quotaConfig.quotas.user_project,
      }));
    }
  }, [userData, quotaConfig]);

  const validationSchema = Yup.object().shape({
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
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    resetQuotaIndex();
  };

  const handleFormikSubmit = (values) => {
    
    const { user_project, user_organization } = values;
    
    if (user_project < 0 || !user_organization < 0) {
      return;
    }

    const configPayload = {
      userId: userData.id,
      data: {
        user_organization: user_organization,
        user_project: user_project,
      },
    };
    updateUserQuotaConfig(configPayload);
    
  };

  if (fetchingQuotaConfig) {
    return <BackdropLoader message={"fetching default Quota configuration"} />;
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Card className={classes.root}>
          <span className={classes.header}>
            <CardHeader title={"Quota configuration"} />
            <IconButton onClick={resetQuotaIndex} >
              <ClearIcon />
            </IconButton>
          </span>
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
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fetchingQuotaConfig: state.CommonReducer.fetchingQuotaConfig,
  quotaConfig: state.CommonReducer.quotaConfig,
  userQuotaUpdated:state.UserReducer.userQuotaUpdated
  
});

const mapDispatchtoProps = (dispatch) => {
  return {
    updateUserQuotaConfig: (payload) => dispatch(updateUserQuota(payload)),
    fetchDefaultQuotaConfig: () => dispatch(fetchQuotaConfig()),
    clearQuotaConfigData: () => dispatch(clearQuotaConfig()),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(FormDialog);
