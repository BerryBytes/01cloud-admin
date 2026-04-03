import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  DialogTitle} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from 'react-i18next';
import { makeStyles } from "@material-ui/styles";
import { PaymentSummary } from "./PaymentSummary";

const useStyles = makeStyles((theme) => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      minWidth: 600,
    },
  }
}));

export const PaymentSummaryPopup = (props) => {
  const [ t ] = useTranslation();
  const classes = useStyles();
  return (
    <>
      <Dialog
        open={props.openPopup}
        onClose={props.handleClosePopup}
        keepMounted
        classes={{paper: classes.paper}}
      >
        <DialogTitle>
          <Typography className="dialogtitle">
            {t('Billing.InvoiceList.monthlyInvoice')}
          </Typography>

          <IconButton
            aria-label="close"
            size="small"
            className="right"
            onClick={props.handleClosePopup}
            data-test="close-icon"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
            <PaymentSummary invoice={props?.invoice} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentSummaryPopup;
