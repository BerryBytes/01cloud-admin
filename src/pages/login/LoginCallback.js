import React, { Component } from 'react'
import { loginOAuth } from './redux/actions'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Typography, CircularProgress, Grid } from '@material-ui/core';

const useStyles = () => ({
    container: {
        marginTop: 120
    }
});

class LoginCallback extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        if(this.props.location.search)
        {
            let payload = {};
            var params = new URLSearchParams(this.props.location.search);
            
            payload["service_name"] = params.has("state") ? params.get("state")  : "";
            payload["service_code"] = params.has("code") ? params.get("code")  : "";
            this.props.loginOAuth(payload, this.props.history);    
        }
    }

    render () {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    <Grid item><CircularProgress /></Grid>
                    <Grid item><Typography variant="h5">Please wait...</Typography></Grid>
                    <Grid item><Typography variant="subtitle1">You are being redirected</Typography></Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = () => ({
    
})

const mapDispatchtoProps = dispatch => {
  return {
    loginOAuth : (payload, history) => dispatch(loginOAuth(payload, history)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(LoginCallback))) 