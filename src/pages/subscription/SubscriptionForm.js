import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  TextField,
  Divider,
  CardActions,
  CardHeader,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  IconButton,
  Collapse,
  InputAdornment
} from "@material-ui/core";
import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { Formik, getIn } from "formik";
import MuiTextField from "../../components/textfield/MuiTextField";
import * as Yup from "yup";

const useStyles = (theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  inlinewithbtn: {
    display: 'inline'
  },
  right: {
    float: 'right'
  }
});

export class SubscriptionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      showProject: true,
      showEnv: false,
      showPriceList: false,
    };
  }

  minValues = {
    configmaps: 10,
    persistentvolumeclaims: 4,
    pods: 20,
    replicationcontrollers: 40,
    secrets: 20,
    services: 10,
    loadbalancers: 1,
    gpu: 0,
    backups: 5,
  }

  submitValues = (values) => {
    if (this.props.subData) {
      values.id = this.props.subData.id;
    }
    this.props.subscriptionAction(values);
  };

  handleCancel = () => {
    this.props.history.push("/subscription");
  };

  handleShowProject = () => {
    this.setState({
      showProject: !this.state.showProject,
      showEnv: !this.state.showProject ? this.state.showProject : this.state.showEnv,
      showPriceList: !this.state.showProject ? this.state.showProject : this.state.showPriceList,
    })
  }
  handleShowEnv = () => {
    this.setState({
      showEnv: !this.state.showEnv,
      showProject: !this.state.showEnv ? this.state.showEnv : this.state.showProject,
      showPriceList: !this.state.showEnv ? this.state.showEnv : this.state.showPriceList,
    })
  }

  handleShowPriceList = () => {
    this.setState({
      showPriceList: !this.state.showPriceList,
      showEnv: !this.state.showPriceList ? this.state.showPriceList : this.state.showEnv,
      showProject: !this.state.showPriceList ? this.state.showPriceList : this.state.showProject,
    })
  }

  render() {
    const { edit, t, subData, classes } = this.props;
    return (
      <div data-test="main-container">
        <Card>
          <CardHeader
            title={edit ? "Update Subscription" : "Add Subscription"}
          />
          <Divider />
          <CardContent>
            <Formik
              initialValues={{
                subscriptionName: edit && subData.name ? subData.name : "",
                
                memory:
                  edit && subData && subData.memory >= 0 ? subData.memory : "",
                diskSpace:
                  edit && subData && subData.disk_space >= 0
                    ? subData.disk_space
                    : "",
                apps: edit && subData && subData.apps >= 0 ? subData.apps : "",
                price:
                  edit && subData && subData.price >= 0 ? subData.price : "",
                dataTransfer:
                  edit && subData && subData.data_transfer >= 0
                    ? subData.data_transfer
                    : "",
                backups:
                  edit && subData && subData.backups >= 0
                    ? subData.backups
                    : this.minValues.backups,
                cores:
                  edit && subData && subData.cores >= 0 ? subData.cores : "",
                cron_job:
                  edit && subData?.cron_job >= 0
                    ? subData.cron_job
                    : "",
                ci_build:
                  edit && subData?.ci_build >= 0
                    ? subData.ci_build
                    : "",
                resource_list: {
                  configmaps: edit && subData && subData.resource_list && subData.resource_list.configmaps >= 0 ? subData.resource_list.configmaps : this.minValues.configmaps,
                  persistentvolumeclaims: edit && subData && subData.resource_list && subData.resource_list.persistentvolumeclaims >= 0 ? subData.resource_list.persistentvolumeclaims : this.minValues.persistentvolumeclaims,
                  pods: edit && subData && subData.resource_list && subData.resource_list.pods >= 0 ? subData.resource_list.pods : this.minValues.pods,
                  replicationcontrollers: edit && subData && subData.resource_list && subData.resource_list.replicationcontrollers >= 0 ? subData.resource_list.replicationcontrollers : this.minValues.replicationcontrollers,
                  secrets: edit && subData && subData.resource_list && subData.resource_list.secrets >= 0 ? subData.resource_list.secrets : this.minValues.secrets,
                  services: edit && subData && subData.resource_list && subData.resource_list.services >= 0 ? subData.resource_list.services : this.minValues.services,
                  loadbalancers: edit && subData && subData.resource_list && subData.resource_list.loadbalancers >= 0 ? subData.resource_list.loadbalancers : this.minValues.loadbalancers,
                  gpu: edit && subData && subData.resource_list && subData.resource_list.gpu >= 0 ? subData.resource_list.gpu : this.minValues.gpu,
                },
                price_list: {
                  data_transfer: edit && subData?.price_list?.data_transfer >= 0 ? subData.price_list.data_transfer : "",
                  load_balancer: edit && subData?.price_list?.load_balancer >= 0 ? subData.price_list.load_balancer : "",
                },
                active: edit ? subData.active : true
              }}
              enableReinitialize={true}
              onSubmit={(values) => this.submitValues(values)}
              validationSchema={Yup.object().shape({
                subscriptionName: Yup.string()
                  .min(2, t('Account.PasswordTab.tooShort'))
                  .required(t('Subscription.SubscriptionForm.subscriptionNameError')),
                
                diskSpace: Yup.number()
                  .positive(t('Resource.ResourceForm.positive'))
                  .required(t('Subscription.SubscriptionForm.diskSpaceError')),

                cores: Yup.number()
                  .positive(t('Resource.ResourceForm.positive'))
                  .required(t('Subscription.SubscriptionForm.coresError')),
                memory: Yup.number()
                  .positive(t('Resource.ResourceForm.positive'))
                  .required(t('Subscription.SubscriptionForm.memoryError')),
                apps: Yup.number()
                  .positive(t('Resource.ResourceForm.positive'))
                  .required(t('Subscription.SubscriptionForm.appError')),
                resource_list: Yup.object().shape({
                  configmaps: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.configMapsError')),
                  persistentvolumeclaims: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.volumeClaimsError')),
                  pods: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.podsError')),
                  replicationcontrollers: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.replicationError')),
                  secrets: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.secretsError')),
                  services: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.servicesError')),
                  loadbalancers: Yup.number()
                    .positive(t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.loadBalancersError')),
                  gpu: Yup.number()
                    .moreThan(-1, t('Resource.ResourceForm.positive'))
                    .required(t('Subscription.SubscriptionForm.gpuError'))
                }),
                price: Yup.number()
                  .required(t('Subscription.SubscriptionForm.priceError'))
                  .test({
                    name: "min",
                    message: t('Resource.ResourceForm.positive'),
                    test: (value) => {
                      return value >= 0;
                    },
                  }),
                backups: Yup.number()
                  .test({
                    name: "min",
                    message: t('Resource.ResourceForm.positive'),
                    test: (value) => {
                      return value >= 0;
                    },
                  })
                  .required(t('Subscription.SubscriptionForm.backupsError')),
                cron_job: Yup.number()
                  .required(t("Subscription.SubscriptionForm.cronJobsError"))
                  .test({
                    name: "min",
                    message: t('Resource.ResourceForm.positive'),
                    test: (value) => {
                      return value >= 0;
                    },
                  }),
                ci_build: Yup.number()
                  .required(t("Subscription.SubscriptionForm.ciBuildsError"))
                  .test({
                    name: "min",
                    message: t('Resource.ResourceForm.positive'),
                    test: (value) => {
                      return value >= 0;
                    },
                  }),
                dataTransfer: Yup.number()
                  .positive(t('Resource.ResourceForm.positive'))
                  .required(t('Subscription.SubscriptionForm.dataError')),
                price_list: Yup.object().shape({
                  data_transfer: Yup.number()
                    .required(t('Subscription.SubscriptionForm.dataError'))
                    .test({
                      name: "min",
                      message: t("Subscription.SubscriptionForm.dataTransferValidError"),
                      test: (value) => {
                        return value > 0;
                      },
                    }),
                  load_balancer: Yup.number()
                    .required(t("Subscription.SubscriptionForm.loadBalancersError"))
                    .test({
                      name: "min",
                      message: t("Subscription.SubscriptionForm.loadBalancerValidError"),
                      test: (value) => {
                        return value > 0;
                      },
                    }),
                }),
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
                        <Grid item md={8} xs={12}>
                          <MuiTextField
                            id="subscriptionName"
                            error={
                              errors.subscriptionName &&
                              touched.subscriptionName
                            }
                            label={t('Subscription.SubscriptionForm.subscriptionName')}
                            name="subscriptionName"
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.subscriptionName}
                            onBlur={handleBlur}
                            data-test="name-field"
                            helperText={
                              errors.subscriptionName &&
                              touched.subscriptionName &&
                              errors.subscriptionName
                            }
                            margin="normal"
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="price"
                            error={errors.price && touched.price}
                            type="number"
                            label="Price"
                            name="price"
                            style={{ width: "100%" }}
                            color="primary"
                            onChange={handleChange}
                            value={values.price}
                            onBlur={handleBlur}
                            helperText={
                              errors.price && touched.price && errors.price
                            }
                            margin="normal"
                            InputProps={{
                              endAdornment: <InputAdornment position="end">$</InputAdornment>,
                            }}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item md="12">
                          <Typography variant='h5' className={classes.inlinewithbtn}>{t('Subscription.SubscriptionForm.quota')}</Typography>
                          <IconButton
                            aria-label="Show/Hide Activity"
                            aria-expanded={this.state.showProject}
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: this.state.showProject,
                            })}
                            onClick={() => this.handleShowProject()}
                            data-test="show-project-button"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Collapse in={this.state.showProject} timeout={600} unmountOnExit data-test="project-collapse">
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <TextField
                              id="diskSpace"
                              error={errors.diskSpace && touched.diskSpace}
                              type="number"
                              label={t('Subscription.SubscriptionForm.space')}
                              name="diskSpace"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.diskSpace}
                              onBlur={handleBlur}
                              data-test="diskspace-field"
                              helperText={
                                errors.diskSpace &&
                                touched.diskSpace &&
                                errors.diskSpace
                              }
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                              }}
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>

                            <TextField
                              id="cores"
                              error={errors.cores && touched.cores}
                              type="number"
                              label={t('Subscription.SubscriptionForm.cores')}
                              name="cores"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.cores}
                              onBlur={handleBlur}
                              data-test="cores-field"
                              helperText={
                                errors.cores && touched.cores && errors.cores
                              }
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">mCores</InputAdornment>,
                              }}
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>

                            <TextField
                              id="memory"
                              error={errors.memory && touched.memory}
                              type="number"
                              label={t('Subscription.SubscriptionForm.memory')}
                              name="memory"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.memory}
                              onBlur={handleBlur}
                              data-test="memory-field"
                              helperText={
                                errors.memory && touched.memory && errors.memory
                              }
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                              }}
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>

                            <TextField
                              id="dataTransfer"
                              error={errors.dataTransfer && touched.dataTransfer}
                              type="number"
                              label={t('Subscription.SubscriptionForm.dataTransfer')}
                              name="dataTransfer"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.dataTransfer}
                              onBlur={handleBlur}
                              data-test="dataTransfer-field"
                              helperText={
                                errors.dataTransfer &&
                                touched.dataTransfer &&
                                errors.dataTransfer
                              }
                              margin="normal"
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                              }}
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="apps"
                              error={errors.apps && touched.apps}
                              type="number"
                              label={t('Subscription.SubscriptionForm.apps')}
                              name="apps"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.apps}
                              onBlur={handleBlur}
                              data-test="apps-field"
                              helperText={
                                errors.apps && touched.apps && errors.apps
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="cron_job"
                              error={errors.cron_job && touched.cron_job}
                              type="number"
                              label={t("Subscription.SubscriptionForm.cronJobs")}
                              name="cron_job"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.cron_job}
                              onBlur={handleBlur}
                              data-test="cronjob-field"
                              helperText={
                                errors.cron_job && touched.cron_job && errors.cron_job
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="ci_build"
                              error={errors.ci_build && touched.ci_build}
                              type="number"
                              label={t("Subscription.SubscriptionForm.ciBuilds")}
                              name="ci_build"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.ci_build}
                              onBlur={handleBlur}
                              data-test="cibuild-field"
                              helperText={
                                errors.ci_build && touched.ci_build && errors.ci_build
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      </Collapse>
                      <Grid container spacing={2}>
                        <Grid item md="12">
                          <Typography variant='h5' className={classes.inlinewithbtn}>{t('Subscription.SubscriptionForm.quotaIndividual')}</Typography>
                          <IconButton
                            aria-label="Show/Hide Env Quota"
                            aria-expanded={this.state.showEnv}
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: this.state.showEnv,
                            })}
                            onClick={() => this.handleShowEnv()}
                            data-test="show-env-button"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Collapse in={this.state.showEnv} timeout={600} unmountOnExit data-test="env-collapse">
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="configmaps"
                              error={getIn(errors, 'resource_list.configmaps') && getIn(touched, 'resource_list.configmaps')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.configMaps')}
                              name="resource_list.configmaps"
                              onChange={handleChange}
                              value={values.resource_list.configmaps}
                              onBlur={handleBlur}
                              data-test="configmaps-field"
                              helperText={
                                getIn(errors, 'resource_list.configmaps') && getIn(touched, 'resource_list.configmaps') && getIn(errors, 'resource_list.configmaps')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="persistentvolumeclaims"
                              error={getIn(errors, 'resource_list.persistentvolumeclaims') && getIn(touched, 'resource_list.persistentvolumeclaims')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.volumeClaims')}
                              name="resource_list.persistentvolumeclaims"
                              onChange={handleChange}
                              value={values.resource_list.persistentvolumeclaims}
                              onBlur={handleBlur}
                              data-test="pv-claim-field"
                              helperText={
                                getIn(errors, 'resource_list.persistentvolumeclaims') && getIn(touched, 'resource_list.persistentvolumeclaims') && getIn(errors, 'resource_list.persistentvolumeclaims')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="pods"
                              error={getIn(errors, 'resource_list.pods') && getIn(touched, 'resource_list.pods')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.pods')}
                              name="resource_list.pods"
                              onChange={handleChange}
                              value={values.resource_list.pods}
                              onBlur={handleBlur}
                              data-test="pods-field"
                              helperText={
                                getIn(errors, 'resource_list.pods') && getIn(touched, 'resource_list.pods') && getIn(errors, 'resource_list.pods')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="replicationcontrollers"
                              error={getIn(errors, 'resource_list.replicationcontrollers') && getIn(touched, 'resource_list.replicationcontrollers')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.replications')}
                              name="resource_list.replicationcontrollers"
                              onChange={handleChange}
                              value={values.resource_list.replicationcontrollers}
                              onBlur={handleBlur}
                              data-test="replication-field"
                              helperText={
                                getIn(errors, 'resource_list.replicationcontrollers') && getIn(touched, 'resource_list.replicationcontrollers') && getIn(errors, 'resource_list.replicationcontrollers')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="secrets"
                              error={getIn(errors, 'resource_list.secrets') && getIn(touched, 'resource_list.secrets')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.secrets')}
                              name="resource_list.secrets"
                              onChange={handleChange}
                              value={values.resource_list.secrets}
                              onBlur={handleBlur}
                              data-test="secrets-field"
                              helperText={
                                getIn(errors, 'resource_list.secrets') && getIn(touched, 'resource_list.secrets') && getIn(errors, 'resource_list.secrets')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="services"
                              error={getIn(errors, 'resource_list.services') && getIn(touched, 'resource_list.services')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.services')}
                              name="resource_list.services"
                              onChange={handleChange}
                              value={values.resource_list.services}
                              onBlur={handleBlur}
                              data-test="services-field"
                              helperText={
                                getIn(errors, 'resource_list.services') && getIn(touched, 'resource_list.services') && getIn(errors, 'resource_list.services')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="loadbalancers"
                              error={getIn(errors, 'resource_list.loadbalancers') && getIn(touched, 'resource_list.loadbalancers')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.loadbalancers')}
                              name="resource_list.loadbalancers"
                              onChange={handleChange}
                              value={values.resource_list.loadbalancers}
                              onBlur={handleBlur}
                              data-test="lb-field"
                              helperText={
                                getIn(errors, 'resource_list.loadbalancers') && getIn(touched, 'resource_list.loadbalancers') && getIn(errors, 'resource_list.loadbalancers')
                              }
                              margin="normal"
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="gpu"
                              error={getIn(errors, 'resource_list.gpu') && getIn(touched, 'resource_list.gpu')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.gpu')}
                              name="resource_list.gpu"
                              onChange={handleChange}
                              value={values.resource_list.gpu}
                              data-test="gpu-field"
                              onBlur={handleBlur}
                              helperText={
                                getIn(errors, 'resource_list.gpu') && getIn(touched, 'resource_list.gpu') && getIn(errors, 'resource_list.gpu')
                              }
                              margin="normal"
                            />
                          </Grid>

                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="backups"
                              error={errors.backups && touched.backups}
                              type="number"
                              label={t('Subscription.SubscriptionForm.backups')}
                              name="backups"
                              style={{ width: "100%" }}
                              color="primary"
                              onChange={handleChange}
                              value={values.backups}
                              onBlur={handleBlur}
                              data-test="backup-field"
                              helperText={
                                errors.backups && touched.backups && errors.backups
                              }
                              margin="normal"
                              variant="outlined"
                            />
                          </Grid>

                        </Grid>
                      </Collapse>
                      <Grid container spacing={2}>
                        <Grid item md="12">
                          <Typography variant='h5' className={classes.inlinewithbtn}>Price List</Typography>
                          <IconButton
                            aria-label="Show/Hide Price List"
                            aria-expanded={this.state.showPriceList}
                            className={clsx(classes.expand, {
                              [classes.expandOpen]: this.state.showPriceList,
                            })}
                            onClick={() => this.handleShowPriceList()}
                            data-test="show-price-list-button"
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Collapse in={this.state.showPriceList} timeout={600} unmountOnExit data-test="priceList-collapse">
                        <Grid container spacing={2}>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="priceListDataTransfer"
                              error={getIn(errors, 'price_list.data_transfer') && getIn(touched, 'price_list.data_transfer')}
                              type="number"
                              label={t('Subscription.SubscriptionForm.dataTransfer')}
                              name="price_list.data_transfer"
                              onChange={handleChange}
                              value={values.price_list.data_transfer}
                              onBlur={handleBlur}
                              data-test="priceList-dataTransfer-field"
                              helperText={
                                getIn(errors, 'price_list.data_transfer') && getIn(touched, 'price_list.data_transfer') && getIn(errors, 'price_list.data_transfer')
                              }
                              margin="normal"
                              InputProps={{
                                endAdornment: <InputAdornment position="end">MB</InputAdornment>,
                              }}
                            />
                          </Grid>
                          <Grid item md={4} xs={12}>
                            <MuiTextField
                              id="priceListLoadBalancer"
                              error={getIn(errors, 'price_list.load_balancer') && getIn(touched, 'price_list.load_balancer')}
                              type="number"
                              label={t("Subscription.SubscriptionForm.priceListLoadBalancer")}
                              name="price_list.load_balancer"
                              onChange={handleChange}
                              value={values.price_list.load_balancer}
                              onBlur={handleBlur}
                              data-test="priceList-loadBalancer-field"
                              helperText={
                                getIn(errors, 'price_list.load_balancer') && getIn(touched, 'price_list.load_balancer') && getIn(errors, 'price_list.load_balancer')
                              }
                              margin="normal"
                            />
                          </Grid>
                        </Grid>
                      </Collapse>
                      <Grid container spacing="2">

                        <Grid item md={12} xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={values.active}
                                onChange={handleChange}
                                name="active"
                                color="primary"
                              />
                            }
                            label={values.active ? t('Resource.ResourceForm.active') : t('Resource.ResourceForm.inactive')}
                            data-test="active-field"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <CardActions className="right">
                      <Button
                        disabled={!(isValid && dirty)}
                        className="right"
                        color="primary"
                        type="submit"
                        variant="contained"
                        data-test="submit-button"
                      >
                        {edit ? t('Resource.ResourceForm.update') : t('Resource.ResourceForm.add')}
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

const mapStateToProps = () => {
  return {
    
  };
};

const mapDispatchToProps = () => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(withTranslation()(SubscriptionForm)));
