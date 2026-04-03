import React, { useEffect } from 'react';

import { 
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Typography, 
    Grid} from "@material-ui/core";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getDateInStandardFormat } from '../../../helpers/utils';
import BackdropLoader from "../../../components/loader/BackdropLoader";
import { getPaymentsList } from '../redux/actions';
import { useTranslation } from 'react-i18next'
import SearchField from "../../../components/searchfield/SearchField";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
      },
      table: {
        minWidth: 650,
      }, 
      tableHeight: {
        maxHeight:300
      }, 
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
}))

export function PaymentList(props){
    const classes = useStyles() 
    const [searchText, setSearchText] = React.useState('');
    const [fromDate, setFromDateValue] = React.useState("");
    const [ fromDateError, setFromDateError] = React.useState(false);
    const [ fromDateErrorMessage, setFromDateErrorMessage ] = React.useState('');
    const [toDate, setToDateValue] = React.useState("");
    const [ toDateError, setToDateError] = React.useState(false);
    const [ toDateErrorMessage, setToDateErrorMessage ] = React.useState('');
    const [ status, setStatus] = React.useState('status');
    const [ page, setPage ] = React.useState(1)
    const [t] = useTranslation()

    const limit = 20;

    const getPaymentList = (pageNum=1, size = 20, searchTextStr='', statusStr='',fromDateStr='',toDateStr='') => {
        props.getPaymentsList(
            pageNum,
            size,
            searchTextStr, 
            statusStr === 'status' ? "" : statusStr, 
            fromDateStr, 
            toDateStr
        );
    }

    useEffect(() => {
        getPaymentList()
    }, [])

    useEffect(() => {
       if ( page !== 1) getPaymentList(page,limit,searchText,status,fromDate,toDate)
    }, [page])

    useEffect(() => {
        if ( status !== 'status' ) getPaymentList(1,limit,searchText,status,fromDate,toDate)
    }, [status])

    useEffect(() => {
        if((new Date(toDate)) > new Date(fromDate) && (fromDate !== "" || toDate !== ""))
        {
            props.getPaymentsList(
                1,
                limit,
                searchText,
                status === 'status' ? "" : status,
                fromDate,
                toDate
            );
        }
    }, [fromDate,toDate])

    const handleSearch = (st) => {
        props.getPaymentsList(
            1,
            limit,
            st,
            status === 'status' ? "" : status,
            fromDate,
            toDate);
    }

    const loadMore = () => {
        let newPageNo = page + 1;
        setPage(newPageNo);
    };

    const searchChangeHandler = (st) => {
        setSearchText(st);
    }

    const fromDateChangeHandler = (e) => {
        if (toDate ==='' && e.target.value !== '') {
            setToDateError(true);
            setToDateErrorMessage(t('Billing.PaymentList.endDateRequired'));
        }
        else if (toDate !=='' && new Date(e.target.value) > new Date(toDate)) {
            setFromDateError(true);
            setFromDateErrorMessage(t('Billing.PaymentList.startDateError'));
        }
        else if (toDate !== '' && fromDate !== '' && new Date(e.target.value) < new Date(toDate)) {
            setFromDateError(false);
            setFromDateErrorMessage("");
        } else if (toDate !== '' && e.target.value !== ''){
            setFromDateError(false);
            setFromDateErrorMessage("");
        }
        setFromDateValue(e.target.value);
    }

    const toDateChangeHandler = (e) => {
        if (toDate !== '' && new Date(e.target.value) > new Date(fromDate)) {
            setToDateError(false);
            setToDateErrorMessage("");
        } else if (fromDate === '' && e.target.value !== '') {
            setFromDateError(true);
            setFromDateErrorMessage(t('Billing.PaymentList.startDateRequired'));
        }else if(fromDate !== '' && new Date(e.target.value) < new Date(fromDate)){
            setToDateError(true);
            setToDateErrorMessage(t('Billing.PaymentList.endDateError'));
        }else if (e.target.value !== '' && fromDate !== ''){
            setToDateError(false);
            setToDateErrorMessage("");
        }
        setToDateValue(e.target.value);
    }
  
    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
    }

    const resetFilters = () => {
        setSearchText('')
        setStatus('status')
        setFromDateValue('')
        setToDateValue('')
        setPage(1)
        getPaymentList(1,limit,'','status','','');
    }

    const isVisible = () => {
        if(searchText !== '' || status !== 'status' || fromDate !== '' || toDate !== '')
        {
            return true
        }
        return false
    }

    return (
        <div className={classes.root} data-test="main-container">
                <Grid container>
                   <Grid item md={2}>
                        <Typography data-test="payments-header" color="textPrimary" style={{ marginTop: 18}}  variant="h4">
                            {t('Billing.PaymentList.payments')}
                        </Typography>
                   </Grid>

                    <Grid item md={10} style={{paddingBottom:16}}>
                        <Grid container justify="flex-end" spacing={1}>
                            {
                                isVisible() &&  <Grid item>
                                                    <Button data-test="reset-button" variant="contained" style={{ marginTop: 12, height:39}} onClick={(e) => resetFilters(e)} color="primary">
                                                        {t('Billing.PromoCodeList.reset')}
                                                    </Button>
                                                </Grid>
                            }
                            <Grid item>
                                <SearchField 
                                    data-test="search-field"
                                    label={"Search"}
                                    search={searchText}
                                    handleSearch = {handleSearch}
                                    handleSearchChange = {searchChangeHandler}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    data-test="fromDate-field"
                                    value={ fromDate }
                                    error={ fromDateError }
                                    helperText={ fromDateErrorMessage }
                                    onChange={ fromDateChangeHandler }
                                    id="date"
                                    label={t('Billing.PaymentList.startDate')}
                                    type="date"
                                    variant="outlined"
                                    style={{ marginTop: 8 }}
                                    InputProps={{
                                            
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    data-test="toDate-field"
                                    value={ toDate }
                                    error={ toDateError }
                                    helperText={ toDateErrorMessage }
                                    onChange={ toDateChangeHandler }
                                    id="date"
                                    label={t('Billing.PaymentList.endDate')}
                                    type="date"
                                    variant="outlined"
                                    style={{ marginTop: 8 }}
                                    InputProps={{
                                            
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl} >
                                <Select
                                    
                                    data-test="status-field"
                                    labelId="demo-simple-select-outlined-label"
                                    name="app"
                                    value={status}
                                    variant="outlined"
                                    onChange={ statusChangeHandler }
                                >
                                    <MenuItem value="status"> Status </MenuItem>
                                    <MenuItem value="success"> Success </MenuItem>
                                    <MenuItem value="failed"> Failed </MenuItem>
                                    <MenuItem value="pending"> Pending </MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            
            <InfiniteScroll
                data-test="pagination-component"
                dataLength={props?.paymentsList?.length ?? 0}
                next={loadMore}
                hasMore={ page * limit >= props?.paymentsList?.length }
            >
            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="simple table"  data-test="table-field">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{t('Billing.PaymentList.tranId')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.title')}</TableCell>
                            <TableCell align="left">{t('Billing.PaymentList.date')}</TableCell>
                            <TableCell align="left">{t('Billing.PaymentList.user')}</TableCell>
                            <TableCell align="left">{t('Billing.PaymentList.amount')}</TableCell>
                            <TableCell align="left">{t('Billing.PaymentList.status')}</TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                            {
                                props.paymentsList && props?.paymentsList?.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell>                                  
                                        <button data-test="id-cell" className="buttonStyle">
                                            {payment.id}
                                        </button>  
                                    </TableCell>
                                    <TableCell data-test="title-cell">                                            
                                        {payment.title}                          
                                    </TableCell>
                                    <TableCell data-test="created-cell">                                            
                                        {getDateInStandardFormat(payment.createdat)}                              
                                    </TableCell>
                                    <TableCell data-test="user-cell">                                            
                                    {payment.user.first_name + " "+ payment.user.last_name}                          
                                    </TableCell>
                                    <TableCell data-test="amount-cell">                                            
                                        $ {payment.amount}                               
                                    </TableCell>
                                  
                                    <TableCell>   
                                        <p data-test="status-cell">
                                            <span className={
                                                payment.status === 'success' ? "activestatus" : payment.status === 'failed' ? "inactivestatus" : "pendingstatus"
                                            }
                                            >
                                            </span>
                                            {payment.status}
                                        </p>                                         
                                    </TableCell>
                                </TableRow> 
                            ))}                
                            </TableBody>  
                       
                </Table>
                { props.paymentsList?.length < 1 ? (
                    <div className="alignCenter" data-test="no-payments">
                      <p> {t('Billing.PaymentList.noPayments')} </p>
                    </div>
                ) : ''}
            </TableContainer>
            </InfiniteScroll>
            {props.fetchingPaymentsList && <BackdropLoader data-test="payments-loader" message={t('Billing.PaymentList.fetchingList')} />}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        paymentsList: state.BillingReducer.paymentsList,
        fetchingPaymentsList: state.BillingReducer.fetchingPaymentsList
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPaymentsList: (page,size,searchText, status, fromDate, toDate) => dispatch(getPaymentsList(page,size,searchText, status, fromDate, toDate)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(PaymentList);