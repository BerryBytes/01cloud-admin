import React , { useEffect } from 'react';
import { 
    TableContainer,
    Table,
    Paper,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Typography } from "@material-ui/core";
import { connect } from 'react-redux';
import { getLbList } from './redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { getDateInStandardFormat } from '../../helpers/utils';
import BackdropLoader from "../../components/loader/BackdropLoader";

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
}))

export function LoadBalancers(props){
    const classes = useStyles()

    useEffect(() => {
        props.getLbList()
    }, [])

    const viewFullDetails = (id) => {
        props.history.push(`/loadbalancer/${id}`)
    }
    
    return (
        <div className={classes.root} data-test="main-container">
             <div className="listContainer"> 
                <Typography color="textPrimary" variant="h4" data-test="loadBalancer-title">
                    Load Balancers Used
                </Typography>
             </div>

            <TableContainer component={Paper}>
                <Table stickyHeader className={classes.table} aria-label="simple table" data-test="table-container">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell align="left">Project Associated</TableCell>
                            <TableCell align="left">Region</TableCell>
                            <TableCell align="left">Owner</TableCell>
                        </TableRow>
                    </TableHead>
                    {
                        props.lbData?.length > 0 && props?.lbData.map((lb) => (
                            <TableBody key={lb.id}>
                                <TableRow>
                                    <TableCell>     
                                        <button className="buttonStyle" data-test="lb-id" onClick={()=>viewFullDetails(lb.id)}>
                                            #{ lb.id }
                                        </button> 
                                    </TableCell>
                                    <TableCell data-test="lb-name">                                            
                                        { lb.name }                                        
                                    </TableCell>
                                    <TableCell data-test="lb-date">                                            
                                        {getDateInStandardFormat(lb.createdat)}                                       
                                    </TableCell>
                                    <TableCell>                                            
                                        <button data-test="lb-project" className="buttonStyle" onClick = {() => {props.history.push(`/project/${lb?.project?.id}`) }}>
                                            {lb?.project?.name}  
                                        </button>                                    
                                    </TableCell>
                                    <TableCell data-test="lb-region">                                            
                                        { lb?.cluster?.region }                                        
                                    </TableCell>
                                    <TableCell data-test="lb-fullname">                                            
                                        { lb?.project?.user?.first_name + ' ' + lb?.project?.user?.last_name}                                        
                                    </TableCell>
                                </TableRow>                 
                            </TableBody>  
                        )) 
                    } 
                </Table>
                { props.lbData?.length < 1 ? (
                    <div className="alignCenter" data-test="no-loadBalancers">
                      <p> No LoadBalancers Currently in Use</p>
                    </div>
                ) : ''}
            </TableContainer>
            {props.fetchingUsedLb && <BackdropLoader message="Loading..." data-test="loading-loadbalancers" />}
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        lbData: state.LbReducer.lbList,
        fetchingUsedLb: state.LbReducer.fetchingUsedLb
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getLbList : () => dispatch(getLbList())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadBalancers);