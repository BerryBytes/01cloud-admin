import React, { useEffect } from 'react';
import { 
    Button,
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Typography, 
    Tooltip,
    Grid} from "@material-ui/core";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getDateInStandardFormat } from '../../../helpers/utils';
import BackdropLoader from "../../../components/loader/BackdropLoader";
import IconButton from "@material-ui/core/IconButton";

import { getDeductionsList, addDeduction, getDeductionById, deleteDeduction, updateDeduction, clearDeductionData } from '../redux/actions';
import { useTranslation } from 'react-i18next'
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DeductionPopUp from '../../../components/deductionpopup/DeductionPopUp';

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

export function DeductionsList(props){
    const classes = useStyles() 
    const [openAddPopup, setOpenAddPopup]  = React.useState(false)
    const [t] = useTranslation()

    useEffect(() => {
       props.getDeductionsList()
       return () => {
        props.clearDeductionData()
        }
    }, [])

    const openAddPopupHandler = () => {
        setOpenAddPopup(true)
    }

    const handleCancelPopUp = () => {
        setOpenAddPopup(false)
    }

    const handleDeductionEdit = (id) => {
        props.getDeductionById(id)
    }

    const handleDeductionDelete = (id) => {
        props.deleteDeduction(id)
    }

    useEffect(() => {
        props.deductionDetail && setOpenAddPopup(true)    
    }, [props.deductionDetail])

    return (
        <div className={classes.root} data-test="main-container">
                <Grid container>
                   <Grid item md={2} sm={4} xs={12}>
                        <Typography data-test="deduction-header" color="textPrimary" style={{ marginTop: 18}}  variant="h4">
                            {t('Billing.DeductionsList.deductionList')}
                        </Typography>
                   </Grid>
                    <Grid item md={10} sm={8} xs={12} style={{paddingBottom:16}}>
                        <Grid container justify="flex-end" spacing={1}>
                            <Grid item>
                                <Button data-test="add-button" variant="contained" style={{ marginTop: 8, height:39}} onClick={(e) => openAddPopupHandler(e)} color="primary">
                                {t('Billing.DeductionsList.addDeductions')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            
            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="simple table" data-test="deduction-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">{t('Billing.GateWaysList.name')}</TableCell>
                            <TableCell align="left">{t('Billing.DeductionsList.value')}</TableCell>
                            <TableCell align="left">{t('Billing.DeductionsList.ispercent')}</TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.country')}</TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.description')}</TableCell>
                            
                            <TableCell align="left">{t('Billing.DeductionsList.effectiveDate')}</TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                            {
                                props.deductionsList && props?.deductionsList?.map((deduction) => (
                                <TableRow key={deduction.ID}>
                                    <TableCell data-test="name-cell">                                            
                                            {deduction.name}                     
                                    </TableCell>
                                    <TableCell data-test="value-cell">                                            
                                            {deduction.value}                 
                                    </TableCell>
                                    <TableCell data-test="percentage-cell">                                            
                                            {deduction.is_percent ? "Active" : "Inactive"}                       
                                    </TableCell>

                                    <TableCell data-test="country-cell">                                            
                                            {deduction.country}                       
                                    </TableCell>

                                    <TableCell data-test="description-cell">                                            
                                            {deduction.description}                       
                                    </TableCell>

                                    <TableCell data-test="date-cell">                                            
                                            {getDateInStandardFormat(deduction.date)}                       
                                    </TableCell>
                       
                                    <TableCell>
                                        <Tooltip title={t('Billing.PromoCodeList.edit')} placement="start-top">
                                            <IconButton 
                                                data-test="edit-icon"
                                                aria-label="edit"
                                                onClick={() => handleDeductionEdit(deduction.ID)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={t('Billing.DeductionsList.delete')} placement="start-top">
                                            <IconButton
                                                data-test="delete-icon"
                                                aria-label="delete"
                                                onClick={() => handleDeductionDelete(deduction.ID)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip> 
                                    </TableCell>
                                </TableRow> 
                            ))}                
                            </TableBody>  
                       
                </Table>
                { props.deductionsList?.length < 1 ? (
                    <div className="alignCenter" data-test="no-deduction">
                      <p> {t('Billing.DeductionsList.noDeductions')} </p>
                    </div>
                ) : ''}
            </TableContainer>
            {openAddPopup && (
                <DeductionPopUp 
                    data-test="add-popup"
                    openAddPopup={openAddPopup}
                    handleCancelPopUp={handleCancelPopUp}
                    deduction={props.deductionDetail}
                    clearData = {() => props.clearDeductionData()}
                    addDeduction={(jsonBody) => props.addDeduction(jsonBody)}
                    updateDeduction = {(id, jsonBody) => props.updateDeduction(id,jsonBody)}
                />
            )}
            {props.fetchingDeductionsList && <BackdropLoader data-test="fetching-loader" message={t('Billing.DeductionsList.fetchingDeduction')} />}
            {props.fetchingDeductionDetail && <BackdropLoader data-test="fetchingDetail-loader" message={t('Billing.DeductionsList.fetchingDeductionDetail')} />}
            {props.addingDeduction && <BackdropLoader data-test="adding-loader" message={t('Billing.DeductionsList.addingDeduction')} />}
            {props.updatingDeduction && <BackdropLoader data-test="updating-loader" message={t('Billing.DeductionsList.updatingDeduction')} />}
            {props.deletingDeduction && <BackdropLoader data-test="deleting-loader" message={t('Billing.DeductionsList.deletingDeduction')} />}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        deductionsList: state.BillingReducer.deductionsList,
        deductionDetail: state.BillingReducer.deductionDetail,
        fetchingDeductionsList: state.BillingReducer.fetchingDeductionsList,
        fetchingDeductionDetail: state.BillingReducer.fetchingDeductionDetail,
        addingDeduction: state.BillingReducer.addingDeduction,
        updatingDeduction: state.BillingReducer.updatingDeduction,
        deletingDeduction: state.BillingReducer.deletingDeduction,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getDeductionsList: () => dispatch(getDeductionsList()),
        addDeduction: (jsonBody) => dispatch(addDeduction(jsonBody)),
        getDeductionById: (id) => dispatch(getDeductionById(id)),
        deleteDeduction: (id) => dispatch(deleteDeduction(id)),
        updateDeduction: (id, jsonBody) => dispatch(updateDeduction(id,jsonBody)),
        clearDeductionData: () => dispatch(clearDeductionData())
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(DeductionsList);