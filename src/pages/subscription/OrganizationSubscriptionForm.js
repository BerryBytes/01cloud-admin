import React from 'react'
import {
    Grid,
    Button,
    TextField,
    Divider,
    CardActions,
    CardHeader,
    Card,
    CardContent,
    FormControlLabel,
    Switch,
    InputAdornment
} from "@material-ui/core";
import { useTranslation } from "react-i18next"
import { Formik } from 'formik';
import * as Yup from "yup"
import MuiTextField from '../../components/textfield/MuiTextField';

export function OrganizationSubscriptionForm(props) {
    const { edit, subData } = props
    const [t] = useTranslation()

    const [initialValues, setInitialValues] = React.useState({
        name: "",
        cluster: 1,
        cores: 1,
        memory: 1,
        no_of_user: 1,
        price: 0,
        weight: 0,
        active: true,
        attributes: ""
    })

    React.useEffect(() => {
        if (edit && subData) {
            setInitialValues({
                name: subData.name,
                cluster: subData.cluster,
                cores: subData.cores,
                memory: subData.memory,
                no_of_user: subData.no_of_user,
                price: subData.price,
                weight: subData.weight,
                active: subData.active,
                attributes: subData.attributes
            })
        }

    }, [edit, subData])

    const submitValues = (values) => {
        if (props.subData) {
            values.id = props.subData.id;
        }
        props.subscriptionAction(values);
    };

    return (
        <div data-test="main-container">
            <Card>
                <CardHeader
                    data-test="card-header"
                    title={edit ? "Update Org Subscription" : "Create Org Subscription"}
                />
                <Divider />
                <CardContent>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        onSubmit={(values) => submitValues(values)}
                        validationSchema={Yup.object().shape({
                            name: Yup.string()
                                .min(2, t('Account.PasswordTab.tooShort'))
                                .required(t('Subscription.SubscriptionForm.nameError')),
                            cores: Yup.number()
                                .positive(t('Resource.ResourceForm.positive'))
                                .min(0)
                                .required(t('Subscription.SubscriptionForm.coresError')),
                            memory: Yup.number()
                                .positive(t('Resource.ResourceForm.positive'))
                                .min(0)
                                .required(t('Subscription.SubscriptionForm.memoryError')),
                            cluster: Yup.number()
                                .positive(t('Resource.ResourceForm.positive'))
                                .min(0)
                                .required(t('Subscription.SubscriptionForm.clusterError')),
                            price: Yup.number()
                                .positive(t('Resource.ResourceForm.positive'))
                                .min(0)
                                .required(t('Subscription.SubscriptionForm.priceError')),
                            weight: Yup.number()
                                .positive(t('Resource.ResourceForm.positive'))
                                .min(0)
                                .required(t('Subscription.SubscriptionForm.weightError')),
                            no_of_user: Yup.number()
                                .positive(t('Resource.ResourceForm.positive'))
                                .min(0)
                                .required(t('Subscription.SubscriptionForm.userError')),
                            attributes: Yup.string(),
                            active: Yup.bool(),

                        })}
                    >
                        {(_props) => {
                            const {
                                values,
                                touched,
                                errors,
                                dirty,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isValid
                            } = _props;

                            return (
                                <form onSubmit={handleSubmit}>
                                    <Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={8} xs={12}>
                                                <MuiTextField
                                                    id="name"
                                                    error={
                                                        errors.name &&
                                                        touched.name
                                                    }
                                                    label={t('Subscription.SubscriptionForm.subscriptionName')}
                                                    name="name"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                    data-test="name-field"
                                                    helperText={
                                                        errors.name &&
                                                        touched.name &&
                                                        errors.name
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
                                                    data-test="price-field"
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
                                                        errors.memory &&
                                                        touched.memory &&
                                                        errors.memory
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
                                                        errors.cores &&
                                                        touched.cores &&
                                                        errors.cores
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
                                                    id="cluster"
                                                    error={errors.cluster && touched.cluster}
                                                    type="number"
                                                    label={t('Subscription.SubscriptionForm.cluster')}
                                                    name="cluster"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onChange={handleChange}
                                                    value={values.cluster}
                                                    onBlur={handleBlur}
                                                    data-test="cluster-field"
                                                    helperText={
                                                        errors.cluster &&
                                                        touched.cluster &&
                                                        errors.cluster
                                                    }
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    id="no_of_user"
                                                    error={errors.no_of_user && touched.no_of_user}
                                                    type="number"
                                                    label={t('Subscription.SubscriptionForm.users')}
                                                    name="no_of_user"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onChange={handleChange}
                                                    value={values.no_of_user}
                                                    onBlur={handleBlur}
                                                    data-test="no_of_user-field"
                                                    helperText={
                                                        errors.no_of_user &&
                                                        touched.no_of_user &&
                                                        errors.no_of_user
                                                    }
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    id="weight"
                                                    error={errors.weight && touched.weight}
                                                    type="number"
                                                    label={t('Subscription.SubscriptionForm.weight')}
                                                    name="weight"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onChange={handleChange}
                                                    value={values.weight}
                                                    onBlur={handleBlur}
                                                    data-test="weight-field"
                                                    helperText={
                                                        errors.weight &&
                                                        touched.weight &&
                                                        errors.weight
                                                    }
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <MuiTextField
                                                    id="attributes"
                                                    error={errors.attributes && touched.attributes}
                                                    label={t('Subscription.SubscriptionForm.attributes')}
                                                    name="attributes"
                                                    style={{ width: "100%" }}
                                                    color="primary"
                                                    onChange={handleChange}
                                                    value={values.attributes}
                                                    onBlur={handleBlur}
                                                    data-test="attributes-field"
                                                    helperText={
                                                        errors.attributes &&
                                                        touched.attributes &&
                                                        errors.attributes
                                                    }
                                                    margin="normal"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={2}>
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
                            )
                        }}
                    </Formik>
                </CardContent>

            </Card>

        </div>
    )
}

export default OrganizationSubscriptionForm