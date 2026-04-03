import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Paper,
  Tooltip
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { paymentSummaryDateFormat2 } from "../../helpers/utils";
import IconButton from "@material-ui/core/IconButton";
import { useTranslation } from 'react-i18next';
 
export const PaymentSummary = (props) => {
    const [ t ] = useTranslation();
    return (
            <Grid item xs={12} data-test="main-container">
                <Card>
                    <CardHeader
                    
                    data-test="card-header"
                    title={
                        <Typography variant="h4">
                            {t('Billing.InvoiceList.summary')}
                        <Typography
                            variant="h5"
                            display="inline"
                            style={{ color: "lightslategray" }}
                            data-test="summary-date"
                        >
                        {" "}
                        | {" "}
                        {
                          
                            paymentSummaryDateFormat2(props.invoice?.start_date, props.invoice?.end_date)
                            
                        }
                        </Typography>
                        <Tooltip title={"Download Invoice"} placement={"right"}>
                            <IconButton>
                                <GetAppIcon />
                            </IconButton>
                        </Tooltip>
                        </Typography>
                    }
                    />
                    <CardContent>
                    <TableContainer component={Paper}>
                        <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                            <TableCell colSpan={7}>{t('Billing.InvoiceList.details')}</TableCell>
                            <TableCell colSpan={1}>{t('Billing.InvoiceList.days')}</TableCell>
                            <TableCell align="center">{t('Billing.InvoiceList.cost')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.invoice?.invoice_items?.length > 0 &&
                            props.invoice.invoice_items.map((item, idx) => (
                                <TableRow  data-test="item-row" key={idx}>
                                <TableCell colSpan={7} data-test="item-name"> 
                                {item.particular}
                                </TableCell>
                                <TableCell colSpan={1} data-test="item-days"> {item.days} </TableCell>
                                <TableCell align="center" data-test="item-total"> ${item.total} </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                            <TableCell rowSpan={3} colSpan={6} />
                            <TableCell colSpan={2} align="right">
                                <b> {t('Billing.InvoiceList.subTotal')} </b>
                            </TableCell>
                            <TableCell align="center" data-test="subtotal">${props.invoice?.sub_total}</TableCell>
                            </TableRow>
                            {
                            props.invoice?.deduct_amount > 0 && props.invoice?.deduction?.name && props.invoice?.deduction?.value && 
                                <TableRow>
                                <TableCell colSpan={2} align="right" data-test="deduction-name">
                                {`${props.invoice.deduction.name} (${props.invoice.deduction.value}%)`}
                                </TableCell>
                                <TableCell align="center" data-test="deduction-amount">
                                $
                                {props.invoice?.deduct_amount}
                                </TableCell>
                                </TableRow>
                            }
                            <TableRow>
                            <TableCell colSpan={2} align="right">
                            <b>{t('Billing.InvoiceList.total')}</b>
                            </TableCell>
                            <TableCell align="center" data-test="total">
                            <b>${props.invoice?.total_cost ?? 0.0}</b>
                            </TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
    )
}

export default PaymentSummary           