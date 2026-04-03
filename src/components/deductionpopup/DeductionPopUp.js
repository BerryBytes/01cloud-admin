import React from 'react';
import {DialogActions,Typography,Divider,Grid,FormControlLabel,Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiTextField from "../textfield/MuiTextField";
import Checkbox from '@material-ui/core/Checkbox';
import { useTranslation } from 'react-i18next';
import { useFormik } from "formik"
import { getDateInStandardFormat, formatDate } from '../../helpers/utils';

export function DeductionPopUp(props){
    const [t] = useTranslation()

    React.useEffect(() => {
        return () => {
            props.clearData()
        }
    }, [])

    const validate = (values) => {
        let errors = {}
        if (!values.name?.trim()?.length) {
            errors.name = t('Billing.GateWayPopUp.nameError');
        }

        if (!values.value?.toString()?.length) {
            errors.value = t('Billing.DeductionPopUp.valueError');
        }

        if (!values.country?.trim()?.length) {
            errors.country = t('Billing.GateWayPopUp.countryError');
        }

        if (!values.description?.trim()?.length) {
            errors.description = t('Billing.GateWayPopUp.descriptionError');
        }

        if (!values.attributes?.trim()?.length) {
            errors.attributes = t('Billing.DeductionPopUp.attributesError');
        }

        if (values.effectiveDate === "NaN-NaN-NaN") {
            errors.effectiveDate = t('Billing.DeductionPopUp.invalidDate');
        }else if(new Date(values.effectiveDate) < new Date()){
            errors.effectiveDate = t('Billing.DeductionPopUp.effectiveDateError');
        }

        return errors
    }

    const addDeductionHandler = (values) => {
        let jsonBody = {
            name: values.name,
            value: parseInt(values.value),
            is_percent: values.percentageCheck,
            country: values.country,
            description: values.description,
            attributes: values.attributes,
            date: values.effectiveDate.concat("T06:08:56.736667Z")
        }
        props.addDeduction(jsonBody)
        props.handleCancelPopUp()
    }

    const updateDeductionHandler = (values) => {
        let id = props?.deduction?.ID
        let jsonBody = {
            name: values.name,
            value: parseInt(values.value),
            is_percent: values.percentageCheck,
            country: values.country,
            description: values.description,
            attributes: values.attributes,
            date: values.effectiveDate.concat("T06:08:56.736667Z")
        }
        props.updateDeduction(id,jsonBody)
        props.handleCancelPopUp()
    }

    const handleFormSubmit = (values) => {
        if (props?.deduction) {
            updateDeductionHandler(values)
        } else {
            addDeductionHandler(values)
        }
    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setFieldTouched,
        touched,
        values,
        errors,
        dirty,
        isValid,
    } = useFormik({
        initialValues: {
            name: props.deduction?.name ?? "",
            value: props.deduction?.value ?? "",
            country: props.deduction?.country ?? "",
            description: props.deduction?.description ?? "",
            attributes: props.deduction?.attributes ?? "",
            percentageCheck: props.deduction?.is_percent ?? true,
            effectiveDate: formatDate(getDateInStandardFormat(props.deduction?.date)) ?? new Date()
        },
        enableReinitialize: true,
        onSubmit: (formValues) => handleFormSubmit(formValues),
        validate: validate,
    })

    return (
        <Dialog
          open={props.openAddPopup}
          keepMounted
          onClose={props.handleCancelPopUp}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          disableBackdropClick={true}
          data-test="add-reg-popup"
        >
          <DialogTitle id="alert-dialog-slide-title">
            <Typography className="dialogtitle" data-test="dialog-title">
              {props?.deduction
                ? t('Billing.DeductionPopUp.edit')
                : t('Billing.DeductionPopUp.add')}
            </Typography>
            <IconButton
              data-test="close-icon"
              aria-label="close"
              size="small"
              className="right"
              onClick={props.handleCancelPopUp}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent dividers>
            <Grid>
                <Grid container spacing={2} data-test="form-grid">
                    <Grid item md={12} xs={12}>
                    <MuiTextField
                            data-test="name-field"
                            id="name"
                            label={t('Billing.GateWaysList.name')}
                            name="name"
                            autoFocus
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            variant="outlined"
                            value={ values.name }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.name && errors.name}
                            helperText={
                                touched.name &&
                                errors.name && errors.name
                            }
                    />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                            data-test="description-field"
                            id="description"
                            label={t('Billing.GateWaysList.description')}
                            name="description"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            variant="outlined"
                            value={ values.description }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.description && errors.description}
                            helperText={
                                touched.description &&
                                errors.description && errors.description
                            }
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                            data-test="country-field"
                            id="country"
                            label={t('Billing.GateWaysList.country')}
                            name="country"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            variant="outlined"
                            value={ values.country }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.country && errors.country}
                            helperText={
                                touched.country &&
                                errors.country && errors.country
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={6} style={{paddingTop: 24}}>
                        <MuiTextField
                            data-test="effectiveDate-field"
                            id="date"
                            label={t('Billing.DeductionsList.effectiveDate')}
                            type="date"
                            name="effectiveDate"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                            value={ values.effectiveDate }
                            onBlur={handleBlur}
                            onInput={() => setFieldTouched('effectiveDate', true, true)}
                            onChange={e => setFieldValue('effectiveDate', e.target.value)}
                            error={touched.effectiveDate && errors.effectiveDate}
                            helperText={
                                touched.effectiveDate && errors.effectiveDate && errors.effectiveDate
                            }
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                            data-test="attributes-field"
                            id="attributes"
                            label={t('Billing.DeductionsList.attributes')}
                            name="attributes"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            variant="outlined"
                            value={ values.attributes }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.attributes && errors.attributes}
                            helperText={
                                touched.attributes &&
                                errors.attributes && errors.attributes
                            }
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                            data-test="value-field"
                            id="value"
                            label={t('Billing.DeductionsList.value')}
                            name="value"
                            style={{ width: "100%" }}
                            color="primary"
                            margin="normal"
                            variant="outlined"
                            value={ values.value }
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={touched.value && errors.value}
                            helperText={
                                touched.value &&
                                errors.value && errors.value
                            }
                        />
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <FormControlLabel
                            data-test="percentage-field"
                            style={{paddingTop: 25}}
                            control={
                                <Checkbox
                                    data-test="checkbox"
                                    checked={values.percentageCheck}
                                    onChange={() => setFieldValue('percentageCheck', !values.percentageCheck)}
                                    name="percentage"
                                    color="primary"
                                />
                            }
                            label={t('Billing.PromoCodePopup.percent')}
                        />
                    </Grid>
                </Grid>      
            </Grid>
          </DialogContent>
          <DialogActions>
                <Button
                    data-test="submit-button"
                    disabled={!(dirty && isValid)}
                    className="oneRemLeftMarginSeperator"
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                >
                    {props?.deduction ? t('Billing.PromoCodePopup.update') : t('Billing.PromoCodePopup.add')}
                </Button>
          </DialogActions>
        </Dialog>
    );
}

export default DeductionPopUp