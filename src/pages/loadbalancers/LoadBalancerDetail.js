import React, { useEffect } from 'react';
import { Card, CardContent, Grid, Typography, ButtonBase } from "@material-ui/core";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { getLbData } from "./redux/actions";
import CustomButton from "../../components/custombutton/CustomButton";
import BackdropLoader from "../../components/loader/BackdropLoader";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    }, 
    titleStyle: {
      color: 'blue',
      '&:hover': {
        color: 'darkblue',
        cursor: 'pointer'
     }
    }
}))

export function LoadBalancerDetail(props){
    const classes = useStyles();

    useEffect(() => {
        let id = props.match.params.lbId;
        props.getLbData(id);
    }, [])

    const backToListClickHandler = () => {
        props.history.push('/loadbalancers');
    }
    return (
        <div className={classes.root} data-test="main-container">
            <div className="listContainer">
                <Typography color="textPrimary" variant="h5">
                    <strong data-test="list-title"> Environment Associated With LoadBalancer 
                        <button data-test="list-id" className="buttonStyle" onClick={backToListClickHandler}>
                            #{props.match.params.lbId}
                        </button> 
                    </strong>
                </Typography>
                <CustomButton
                    data-test="back-button"
                    onClick={backToListClickHandler}
                    label="Back to the List"
                />
            </div>

            <Card>
                <CardContent>
                {
                    props.lbData?.length > 0 && props?.lbData.map((lb) => (
                        <div key={lb.id}>
                            <Grid container spacing={2}>
                                <Grid item md={4} xs={4} data-test="lb-env">                      
                                    Environment Name                         
                                </Grid>
                                <Grid item md={8} xs={8}>
                                    <ButtonBase
                                    onClick = {() => {props.history.push(`/environment/${lb.id}`) }}
                                    >
                                        <Typography color="primary" variant="h5" data-test="lb-name">
                                            {lb.name}
                                        </Typography>
                                    </ButtonBase>
                                </Grid>
                            </Grid>
                            <hr></hr>
                        </div>
                    )) 
                } 
                { props.lbData?.length < 1 ? (
                    <div className="alignCenter" data-test="no-loadBalancers">
                      <p> No Environment Currently Associated With this Load Balancer</p>
                    </div>
                ) : ''}
                </CardContent>
            </Card>
            {props.fetchingUsedLb && <BackdropLoader message="Loading..." data-test="loading-loadbalancers" />}
        </div>
    ) 
}

const mapStateToProps = (state) => {
    return {
        lbData : state.LbReducer.lbData,
        fetchingUsedLb: state.LbReducer.fetchingLbData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getLbData: (id) => dispatch(getLbData(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoadBalancerDetail);