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
    Grid,
    Card,
    CardContent} from "@material-ui/core";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getDateInStandardFormat } from '../../../helpers/utils';
import BackdropLoader from "../../../components/loader/BackdropLoader";

import PaymentSummaryPopup from '../../../components/paymentsummarypopup/PaymentSummaryPopup';
import { getInvoiceList, getInvoiceById, clearInvoiceData } from '../redux/actions';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { fetchUsers } from "../../user/redux/actions";

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
      title: {
        fontWeight: 700,
        fontSize:"15px",
        padding: "15px"
      },
      overviewPadding:{
        padding: "15px"
      },
      overview:{
        marginTop:"10px",
        marginBottom:"20px"
      }
}))

export function InvoiceList(props){
    const classes = useStyles() 
    const [paymentPopup, setPaymentPopup] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');
    const [userId, setUserId] = React.useState(0);
    const [status, setStatus] = React.useState('status');
    const [fromDate, setFromDateValue] = React.useState('');
    const [ fromDateError, setFromDateError] = React.useState(false);
    const [ fromDateErrorMessage, setFromDateErrorMessage ] = React.useState('');
    const [toDate, setToDateValue] = React.useState('');
    const [ toDateError, setToDateError] = React.useState(false);
    const [ toDateErrorMessage, setToDateErrorMessage ] = React.useState('');
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [ page, setPage ] = React.useState(1);
    const [overview, setOverview] = React.useState({total_cost:0,total_deductions:0,promocode_usage:0});
    const limit = 20;
    const [t] = useTranslation()

    const callGetInvoiceList = (pageNum=1, size = 20, searchTextStr='', statusStr='',fromDateStr='',toDateStr='') => {
        props.getInvoiceList(
            pageNum,
            size,
            searchTextStr, 
            statusStr === 'status' ? "" : statusStr, 
            userId,
            fromDateStr, 
            toDateStr
        );
    }

    const overviewDetils = (invoiceList) => {
     if(!invoiceList) return;
     let computedOverview = invoiceList.reduce((acc,invoice)=>{
         acc.total_cost=invoice.total_cost+acc.total_cost;
         acc.total_deductions=acc.total_deductions+ invoice.deduct_amount;
         acc.promocode_usage=acc.promocode_usage+ invoice.promocode||0;
        return acc;
     },overview)
    
    setOverview(computedOverview)
    }

    useEffect(() => {
        
        overviewDetils(props.invoiceList);
        return () => {
            props.clearInvoiceData()
        }
    }, [props.invoiceList])

    useEffect(() => {
       if ( page !== 1) callGetInvoiceList(page,limit,searchText,status,fromDate,toDate)
    }, [page])

    useEffect(() => {
        if(status !== 'status' || userId !== 0){
            props.getInvoiceList(
                1,
                limit,
                searchText, 
                status === 'status' ? "" : status, 
                userId,
                fromDate, 
                toDate
            );
        }
    }, [status,userId])

    useEffect(() => {
        if((new Date(toDate)) > new Date(fromDate) && (fromDate !== "" || toDate !== ""))
        {
            props.getInvoiceList(
                1,
                limit,
                searchText, 
                status === 'status' ? "" : status, 
                userId,
                fromDate, 
                toDate
            );
        }
    }, [fromDate,toDate])

    const searchChangeHandler = (st) => {
        setSearchText(st);
    }
  
    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
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
        } else if (fromDate ==='' && e.target.value !=='') {
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

    const openPaymentSummaryPopup = (id) => {
        props.getInvoiceById(id)
    }

    useEffect(() => {
        props.invoiceData && setPaymentPopup(true)     
    }, [props.invoiceData])

    const resetFilters = () => {
        setUserId(0)
        setInputValue('')
        setSearchText('')
        setStatus('status')
        setFromDateValue('')
        setToDateValue('')
        setPage(1)
        callGetInvoiceList(1,limit,'','status','','')
    }

    const closePaymentSummaryPopup = () => {
        setPaymentPopup(false)
        resetFilters()
    }

    useEffect(() => {
        if(inputValue === ''){
            callGetInvoiceList()
            props.fetchUsers(1, 20, "", "", "");
        }else if (inputValue !== ''){
            props.fetchUsers(1, 20, inputValue, "", "");
        }
    }, [inputValue])

    const isVisible = () => {
        if(searchText !== '' 
        || status !== 'status' || 
        fromDate !== '' 
        || toDate !== '' 
        || userId !== 0 || inputValue !== '')
        {
            return true
        }
        return false
    }

    const handleSearch = (st) => {
        props.getInvoiceList(
            1,
            limit,
            st,
            status === 'status' ? "" : status,
            userId,
            fromDate,
            toDate);
    }

    const loadMore = () => {
        let newPageNo = page + 1;
        setPage(newPageNo);
    };

    return (
        <div className={classes.root} data-test="main-container">
                <Grid container>
                   <Grid item md={1} xs={12}>
                        <Typography color="textPrimary" style={{ marginTop: 18}}  variant="h4" data-test="invoice-header">
                            {t('Billing.InvoiceList.invoice')}
                        </Typography>
                   </Grid>

                    <Grid item md={11} xs={12} style={{paddingBottom:16}}>
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
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                    data-test="user-field"
                                    loading={props.fetchingUser}
                                    loadingText={t('Billing.InvoiceList.loadingText')}
                                    noOptionsText={t('Billing.InvoiceList.noOptions')}
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setUserId(newValue?.id ?? 0)
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                    id="search"
                                    options={props?.userList}
                                    getOptionLabel={(option) => option.first_name + " " + option.last_name}
                                    style={{ width: 190, marginTop: 8 }}
                                    renderInput={(params) => <TextField 
                                                                label={t('Billing.InvoiceList.userSearch')}
                                                                {...params} 
                                                                InputLabelProps={{
                                                                    shrink: true
                                                                }}
                                                                variant="outlined" 
                                                                placeholder={"Enter the name.."}
                                                             />}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl className={classes.formControl}>
                                <Select
                                    data-test="status-field"
                                    labelId="demo-simple-select-outlined-label"
                                    name="app"
                                    value={status}
                                    onChange={ statusChangeHandler }
                                    variant="outlined"
                                >
                                    <MenuItem value="status"> Status </MenuItem>
                                    <MenuItem value="true"> Paid </MenuItem>
                                    <MenuItem value="false"> Unpaid </MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            
            <InfiniteScroll
                data-test="pagination-component"
                dataLength={props?.invoiceList?.length ?? 0}
                next={loadMore}
                hasMore={ page * limit >= props?.invoiceList?.length }
            >
                                                         
            <Grid container spacing={2} className={classes.overview}>
            {
                overview && Object.keys(overview).map((el, index) =>(
                <Grid item md={4} xs={12}  key={index}>
                    <Card>
                        <CardContent classsName={classes.overviewPadding}>
                            <Typography variant="body2" className={classes.title}>{el.replace(/_/g, " ").toUpperCase()}</Typography>
                            <Typography variant="h4" className={classes.overviewPadding}>{Math.round(overview[el])}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                ))
             }      
            </Grid>
            
            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="simple table" data-test="table-field">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{t('Billing.InvoiceList.invoiceId')}</TableCell>
                            <TableCell align="left">{t('Billing.InvoiceList.title')}</TableCell>
                            <TableCell align="left">{t('Billing.InvoiceList.generatedDate')}</TableCell>
                            <TableCell align="left">{t('Billing.InvoiceList.user')}</TableCell>
                            <TableCell align="left">{t('Billing.InvoiceList.amount')}</TableCell>
                            <TableCell align="left">{t('Billing.InvoiceList.status')}</TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                            {props.invoiceList && props?.invoiceList?.map((invoice) => (
                                <TableRow key={invoice.id}>
                                    <TableCell>                                  
                                        <button data-test="id-cell" className="buttonStyle" onClick={() => openPaymentSummaryPopup(invoice.id)}>
                                            {invoice.id}
                                        </button>  
                                    </TableCell>
                                    <TableCell>                                            
                                        <button data-test="title-cell" className="buttonStyle" onClick={() => openPaymentSummaryPopup(invoice.id)}> 
                                            {invoice.title}
                                        </button>                            
                                    </TableCell>
                                    <TableCell data-test="created-cell">                                            
                                       {getDateInStandardFormat(invoice.createdat)}                              
                                    </TableCell>
                                    <TableCell data-test="user-cell">                                            
                                       {invoice.user.first_name + " "+ invoice.user.last_name}                         
                                    </TableCell>
                                    <TableCell data-test="cost-cell">                                            
                                        $ {invoice.total_cost}                               
                                    </TableCell>
                                  
                                    <TableCell>                                          
                                        {invoice.is_paid ? (
                                            <p>
                                            <span data-test="active-cell" className="activestatus"></span> {t('Billing.InvoiceList.paid')}
                                            </p>
                                        ) : (
                                            <p>
                                            <span data-test="inactive-cell" className="inactivestatus"></span> {t('Billing.InvoiceList.unpaid')}
                                            </p>
                                        )}                       
                                    </TableCell>
                                </TableRow> 
                            ))}                
                            </TableBody>  
                       
                </Table>
                { props.invoiceList?.length < 1 ? (
                    <div data-test="no-invoice" className="alignCenter">
                      <p> {t('Billing.InvoiceList.noInvoice')} </p>
                    </div>
                ) : ''}
            </TableContainer>
            </InfiniteScroll>
            {paymentPopup &&
                <PaymentSummaryPopup 
                    data-test="paymentsummary-popup"
                    openPopup={paymentPopup}
                    handleClosePopup={closePaymentSummaryPopup}
                    invoice={props.invoiceData}
                />
            }
            {props.fetchingInvoiceData && <BackdropLoader data-test="fetchingInvoice-loader" message={t('Billing.InvoiceList.fetchingInvoiceData')} />}
            {props.fetchingInvoiceList && <BackdropLoader data-test="fetchingInvoiceList-loader" message={t('Billing.InvoiceList.fetchingInvoiceList')} />}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        userList: state.UserReducer.userList,
        invoiceList: state.BillingReducer.invoiceList,
        invoiceData: state.BillingReducer.invoiceData,
        fetchingInvoiceList: state.BillingReducer.fetchingInvoiceList,
        fetchingInvoiceData: state.BillingReducer.fetchingInvoiceData,
        fetchingUser: state.UserReducer.fetchingUser
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        fetchUsers: (page, size, search, sortColumn, sortDirection) => dispatch(fetchUsers(page, size, search, sortColumn, sortDirection)),
		getInvoiceList: (page,size,searchText, status, user_id, fromDate, toDate) => dispatch(getInvoiceList(page,size,searchText, status, user_id, fromDate, toDate)),
        getInvoiceById: (id) => dispatch(getInvoiceById(id)),
        clearInvoiceData: () => dispatch(clearInvoiceData())
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(InvoiceList);