import React, { useEffect } from 'react';
import { 
    Button,
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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PromoCodePopup from '../../../components/promocodepopup/PromoCodePopup';
import Tooltip from '@material-ui/core/Tooltip';
import { getPromoCodeList, addPromoCode, getPromoCodeDetail, clearPromoCodeData, updatePromoCode } from '../redux/actions';
import { useTranslation } from 'react-i18next';
import SearchField from "../../../components/searchfield/SearchField";
import { deletePromoCode } from '../redux/actions';
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
      titleStyle: {
        color: 'blue',
        '&:hover': {
          color: 'darkblue',
          cursor: 'pointer'
       }
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
}))

export function PromoCodeList(props){
    const classes = useStyles() 
    const [openAddPopup, setOpenAddPopup]  = React.useState(false)
    const [searchText, setSearchText] = React.useState('');
    const [status, setStatus] = React.useState('status');
    const [t] = useTranslation()

    const getPromoList = (st='', statusStr='') => {
        props.getPromoCodeList(st,statusStr === 'status' ? "" : statusStr)
    }

    useEffect(() => {
        getPromoList();
        return () => {
            props.clearPromoCodeData()
        }
    }, [])

    useEffect(() => {
            getPromoList(searchText,status);
    }, [status])
     
    const openAddPopupHandler = () => {
        setOpenAddPopup(true)
    }

    const handleCancelPopUp = () => {
        setOpenAddPopup(false)
    }

    const searchChangeHandler = (st) => {
        setSearchText(st);
    }
  
    const statusChangeHandler = (e) => {
        setStatus(e.target.value);
    }

    const handlePromoCodeEdit = (id) => {
        props.getPromoCodeDetail(id)
    }

    useEffect(() => {
        props.promoCodeDetail && setOpenAddPopup(true)    
    }, [props.promoCodeDetail])

    const resetFilters = () => {
        setSearchText('')
        setStatus('status')
        getPromoList();
    }

    const isVisible = () => {
        if(searchText !== '' || status !== 'status')
        {
            return true
        }
        return false
    }

    const handleSearch = (st) => {
        props.getPromoCodeList(
            st,
            status === 'status' ? "" : status);
    }

    const deleteHandler=(promoId)=>()=>{
       props.deletePromo(promoId)
    }
    
    return (
        <div className={classes.root} data-test="main-container">
                <Grid container>
                   <Grid item md={2}>
                        <Typography color="textPrimary" style={{ marginTop: 18}}  variant="h4" data-test="promocode-header">
                            {t('Billing.PromoCodeList.promocodes')}
                        </Typography>
                   </Grid>

                    <Grid item md={10} style={{paddingBottom:16}}>
                        <Grid container justify="flex-end" spacing={1}>
                            {
                                isVisible() &&  <Grid item>
                                                    <Button variant="contained" style={{ marginTop: 14, height:39}} onClick={(e) => resetFilters(e)} color="primary" data-test="reset-button">
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
                                    <MenuItem value="true"> Active </MenuItem>
                                    <MenuItem value="false"> Inactive </MenuItem>
                                </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button data-test="add-button" variant="contained" style={{ marginTop: 10, height:50}} onClick={(e) => openAddPopupHandler(e)} color="primary">
                                    {t('Billing.PromoCodeList.addButtonText')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            
            <TableContainer component={Paper} data-test="lb-list-container">
                <Table stickyHeader className={classes.table} aria-label="simple table" data-test="promocode-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{t('Billing.PromoCodeList.title')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.code')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.createdDate')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.expiryDate')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.discount')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.limit')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.count')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.status')}</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                            {!!props.promoCodesList && props?.promoCodesList?.map((promoCode) => (
                                <TableRow key={promoCode.id}>
                                    <TableCell data-test="promocode-title">                                  
                                        {promoCode.title}    
                                    </TableCell>
                                    <TableCell data-test="promocode-code">                                            
                                        {promoCode.code}                                
                                    </TableCell>
                                    <TableCell data-test="promocode-createdAt">                                            
                                        {getDateInStandardFormat(promoCode.createdat)}                             
                                    </TableCell>
                                    <TableCell data-test="promocode-expirydate">                                            
                                        {getDateInStandardFormat(promoCode.expiry_date)}                                 
                                    </TableCell>
                                    <TableCell data-test="promocode-percentage">                                            
                                        { promoCode.is_percent ? promoCode.discount + " %" : promoCode.discount}                                 
                                    </TableCell>
                                    <TableCell data-test="promocode-limit">                                            
                                        {promoCode.limit}                                 
                                    </TableCell>
                                    <TableCell data-test="promocode-count">                                            
                                        {promoCode.count}                                 
                                    </TableCell>
                                    <TableCell>                                            
                                        {promoCode.active ? (
                                            <p>
                                            <span data-test="promocode-active" className="activestatus"></span> {t('Billing.PromoCodeList.active')}
                                            </p>
                                        ) : (
                                            <p>
                                            <span data-test="promocode-inactive" className="inactivestatus"></span> {t('Billing.PromoCodeList.inactive')}
                                            </p>
                                        )}                                
                                    </TableCell>
                                    <TableCell>
                                   <span style={{display:"flex",alignItems:"center",justifyContent:'space-evenly'}}>
                                    <Tooltip title={t('Billing.PromoCodeList.edit')} placement="start-top">
                                        <IconButton 
                                            data-test="edit-icon"
                                            aria-label="edit"
                                            onClick={() => handlePromoCodeEdit(promoCode.id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete" placement="start-top">
                                        <IconButton
                                        disabled={promoCode.count!==0}  
                                        onClick={deleteHandler(promoCode.id)}
                                            aria-label="delete"
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </Tooltip>
                                   </span>
                                    </TableCell>
                                </TableRow> 
                            ))}                
                            </TableBody>  
                       
                </Table>
                { props.promoCodesList?.length < 1 ? (
                    <div className="alignCenter" data-test="no-promocode">
                      <p> {t('Billing.PromoCodeList.noPromoCode')} </p>
                    </div>
                ) : ''}
            </TableContainer>
            {openAddPopup && (
                <PromoCodePopup 
                    data-test="add-popup"
                    resetFilters={resetFilters}
                    openAddPopup={openAddPopup}
                    handleCancelPopUp={handleCancelPopUp}
                    promoCode={props.promoCodeDetail}
                    clearData = {() => props.clearPromoCodeData()}
                    addPromoCode={(jsonBody) => props.addPromoCode(jsonBody)}
                    updatePromoCode = {(id, jsonBody) => props.updatePromoCode(id,jsonBody)}
                />
            )}

            {props.fetchingPromoCodes && <BackdropLoader data-test="fetching-loader" message={t('Billing.PromoCodeList.fetchingPromoCodes')} />}
            {props.fetchingPromoCodeDetail && <BackdropLoader data-test="fetchingDetail-loader" message={t('Billing.PromoCodeList.fetchingPromoCodeDetail')} />}
            {props.addingPromoCode && <BackdropLoader data-test="adding-loader" message={t('Billing.PromoCodeList.addingPromoCode')} />}
            {props.updatingPromoCode && <BackdropLoader data-test="updating-loader" message={t('Billing.PromoCodeList.updatingPromoCode')} />}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
       promoCodesList: state.BillingReducer.promoCodesList,
       promoCodeDetail: state.BillingReducer.promoCodeDetail,
       fetchingPromoCodes: state.BillingReducer.fetchingPromoCodes,
       fetchingPromoCodeDetail: state.BillingReducer.fetchingPromoCodeDetail,
       addingPromoCode: state.BillingReducer.addingPromoCode,
       updatingPromoCode: state.BillingReducer.updatingPromoCode
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPromoCodeList: (searchText,status) => dispatch(getPromoCodeList(searchText,status)),
        addPromoCode: (jsonBody) => dispatch(addPromoCode(jsonBody)),
        getPromoCodeDetail: (id) => dispatch(getPromoCodeDetail(id)),
        updatePromoCode: (id, jsonBody) => dispatch(updatePromoCode(id,jsonBody)),
        clearPromoCodeData: () => dispatch(clearPromoCodeData()),
        deletePromo:(id)=>dispatch(deletePromoCode(id))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(PromoCodeList);