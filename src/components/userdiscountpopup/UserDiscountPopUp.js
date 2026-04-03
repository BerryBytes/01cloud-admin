import React from 'react';
import {DialogActions,Typography,Divider,Grid,FormControlLabel,Button,Switch} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import MuiTextField from "../textfield/MuiTextField";
import { useTranslation } from 'react-i18next';

export function UserDiscountPopUp(props){
    const [ discount, setDiscount ] = React.useState(props?.userDiscountData?.discount ?? 0)
    const [ discountError, setDiscountError ] = React.useState(false);
    const [ discountErrorMessage, setDiscountErrorMessage ] = React.useState('');
    const [ discountActive, setDiscountActive ] = React.useState(props?.userDiscountData?.enable_discount ?? false)
    const [t] = useTranslation()

    const handleDiscountOnBlur = () => {
        if (discount.length === 0) {
            setDiscountError(true);
            setDiscountErrorMessage(t('Billing.PromoCodePopup.emptyDiscount'));
        }
    };

    const handleDiscountChange = (e) => {
        if(e.target.value < 0){
            setDiscountError(true);
            setDiscountErrorMessage(t('Billing.PromoCodePopup.discountError'));
        }
        else{
            setDiscountError(false);
            setDiscountErrorMessage("");
        }
        setDiscount(e.target.value)
    }

    const handleDiscountActive = () => {
        discountActive ? setDiscountActive(false) : setDiscountActive(true)
    }

    const isValid = () => {
        if(discountError)
        {
            return false
        }
        else if(discount === ''){
            return false
        }
        return true
    }

    const updateUserDiscountHandler = () => {
        let id = props?.userId
        let jsonBody = {
            user_id: props?.userId,
            discount_is_percent: true,
            discount: parseInt(discount),
            enable_discount: discountActive
        }
        props.updateDiscount(id,jsonBody)
        props.clearDiscountData()
        props.handleCancelPopUp()
    }

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
            <Typography className="dialogtitle" data-test="dialogue-title">
              {props?.userDiscountData?.discount
                ? t('Billing.PromoCodePopup.editDiscount')
                : t('Billing.PromoCodePopup.addDiscount')}
            </Typography>
            <IconButton
              aria-label="close"
              size="small"
              className="right"
              data-test="close-icon"
              onClick={props.handleCancelPopUp}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent dividers>
            <Grid>
                <Grid container spacing={2} data-test="form-container">
                        <Grid item md={12} xs={12}>
                            <Typography variant='h5'>Balance: ${props.userBalance}</Typography>
                        </Grid>
                        
                    <Grid item md={6} xs={6}>
                        <MuiTextField
                        id="discount"
                        label={"Discount % "}
                        name="discount"
                        type="number"
                        style={{ width: "100%" }}
                        color="primary"
                        margin="normal"
                        variant="outlined"
                        value={ discount }
                        error={ discountError }
                        helperText={ discountErrorMessage }
                        onChange={ handleDiscountChange }
                        onBlur={ handleDiscountOnBlur }
                        data-test="discount-field"
                        />
                    </Grid>

                    <Grid item md={12} xs={12}>
                        <FormControlLabel
                            data-test="discountAction-field"
                            control={
                                <Switch
                                    data-test="switch"
                                    checked={discountActive}
                                    onChange={handleDiscountActive}
                                    name="activeStatus"
                                    color="primary"
                                />
                            }
                            label={discountActive ? t('Billing.PromoCodeList.active') : t('Billing.PromoCodeList.inactive')}
                        />
                    </Grid>
                </Grid>     
            </Grid>
          </DialogContent>
          <DialogActions>
                <Button
                    disabled={!isValid()}
                    className="oneRemLeftMarginSeperator"
                    color="primary"
                    type="submit"
                    variant="contained"
                    onClick={updateUserDiscountHandler}
                    data-test="submit-button"
                >
                    {props?.userDiscountData?.discount ? t('Billing.PromoCodePopup.update') : t('Billing.PromoCodePopup.add')}
                </Button>
          </DialogActions>
        </Dialog>
    );
}

export default UserDiscountPopUp