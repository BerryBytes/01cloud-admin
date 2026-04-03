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
import BackdropLoader from "../../../components/loader/BackdropLoader";
import IconButton from "@material-ui/core/IconButton";

import { getGateWaysList, addGateWay, updateGateWay, clearGateWayData, getGateWayById } from '../redux/actions';
import { useTranslation } from 'react-i18next'
import EditIcon from "@material-ui/icons/Edit";
import GateWayPopUp from '../../../components/gatewaypopup/GateWayPopUp';

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

export function GateWaysList(props){
    const classes = useStyles() 
    const [openAddPopup, setOpenAddPopup]  = React.useState(false)
    const [t] = useTranslation()

    useEffect(() => {
       props.getGateWaysList()
       return () => {
            props.clearGateWayData()
        }
    }, [])

    const openAddPopupHandler = () => {
        setOpenAddPopup(true)
    }

    const handleCancelPopUp = () => {
        setOpenAddPopup(false)
    }

    const handleGateWayEdit = (id) => {
        props.getGateWayById(id)
    }

    useEffect(() => {
        props.gatewayDetail && setOpenAddPopup(true)    
    }, [props.gatewayDetail])

    return (
        <div className={classes.root} data-test="main-container">
                <Grid container>
                   <Grid item md={2} sm={4} xs={12}>
                        <Typography color="textPrimary" style={{ marginTop: 18}}  variant="h4" data-test="gateways-header">
                            {t('Billing.GateWaysList.gateWayList')}
                        </Typography>
                   </Grid>
                    <Grid item md={10} sm={8} xs={12} style={{paddingBottom:16}}>
                        <Grid container justify="flex-end" spacing={1}>
                            <Grid item>
                                <Button data-test="add-button" variant="contained" style={{ marginTop: 8, height:39}} onClick={(e) => openAddPopupHandler(e)} color="primary">
                                {t('Billing.GateWaysList.addGateWay')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            
            <TableContainer component={Paper} data-test="lb-list-container">
                <Table stickyHeader className={classes.table} aria-label="simple table" data-test="gateway-table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.name')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.code')}</TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.description')}</TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.country')}</TableCell>
                            <TableCell align="left">{t('Billing.PromoCodeList.active')}</TableCell>
                            <TableCell align="left">{t('Billing.GateWaysList.actions')}</TableCell>
                        </TableRow>
                    </TableHead>
                            <TableBody>
                            {
                                props.gatewaysList && props?.gatewaysList?.map((gateway) => (
                                <TableRow key={gateway.id}>
                                    <TableCell data-test="gateway-icon">                                            
                                            {gateway.icon && gateway.icon.length? <img src={gateway.icon} alt='img'></img>:null}                      
                                    </TableCell>
                                    <TableCell data-test="gateway-name">                                            
                                            {gateway.name}                     
                                    </TableCell>
                                    <TableCell data-test="gateway-code">                                            
                                            {gateway.code}                 
                                    </TableCell>
                                    <TableCell data-test="gateway-description">                                            
                                            {gateway.description}                       
                                    </TableCell>
                                    <TableCell data-test="gateway-country">                                  
                                            {gateway.country}
                                    </TableCell>
                               
                                    <TableCell>   
                                        <p>
                                        {gateway.active ? (
                                            <p>
                                            <span data-test="gateway-active" className="activestatus"></span> {t('Billing.PromoCodeList.active')}
                                            </p>
                                        ) : (
                                            <p>
                                            <span data-test="gateway-inactive" className="inactivestatus"></span> {t('Billing.PromoCodeList.inactive')}
                                            </p>
                                        )}  
                                        </p>                                         
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={t('Billing.PromoCodeList.edit')} placement="start-top">
                                            <IconButton 
                                                data-test="edit-icon"
                                                aria-label="edit"
                                                onClick={() => handleGateWayEdit(gateway.id)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow> 
                            ))}                
                            </TableBody>  
                       
                </Table>
                { props.gateWaysList?.length < 1 ? (
                    <div className="alignCenter" data-test="no-gateway">
                      <p> {t('Billing.GateWaysList.noGateWayAvailable')} </p>
                    </div>
                ) : ''}
            </TableContainer>
            {openAddPopup && (
                <GateWayPopUp
                    data-test="add-popup" 
                    openAddPopup={openAddPopup}
                    handleCancelPopUp={handleCancelPopUp}
                    gateway={props.gatewayDetail}
                    clearData = {() => props.clearGateWayData()}
                    addGateWay={(jsonBody) => props.addGateWay(jsonBody)}
                    updateGateWay = {(id, jsonBody) => props.updateGateWay(id,jsonBody)}
                />
            )}
            {props.fetchingGateWaysList && <BackdropLoader data-test="fetching-loader" message={t('Billing.GateWaysList.fetchingGateWay')} />}
            {props.fetchingGateWayDetail && <BackdropLoader data-test="fetchingDetail-loader" message={t('Billing.GateWaysList.fetchingGateWayDetail')} />}
            {props.addingGateWay && <BackdropLoader data-test="adding-loader" message={t('Billing.GateWaysList.addingGateWay')} />}
            {props.updatingGateWay && <BackdropLoader data-test="updating-loader" message={t('Billing.GateWaysList.updatingGateWay')} />}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        gatewaysList: state.BillingReducer.gatewaysList,
        gatewayDetail: state.BillingReducer.gatewayDetail,
        fetchingGateWaysList: state.BillingReducer.fetchingGateWaysList,
        fetchingGateWayDetail: state.BillingReducer.fetchingGateWayDetail,
        addingGateWay: state.BillingReducer.addingGateWay,
        updatingGateWay: state.BillingReducer.updatingGateWay,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getGateWaysList: () => dispatch(getGateWaysList()),
        addGateWay: (jsonBody) => dispatch(addGateWay(jsonBody)),
        getGateWayById: (id) => dispatch(getGateWayById(id)),
        updateGateWay: (id, jsonBody) => dispatch(updateGateWay(id,jsonBody)),
        clearGateWayData: () => dispatch(clearGateWayData())
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(GateWaysList);