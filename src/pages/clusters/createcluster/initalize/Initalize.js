import React, { Component } from 'react'
import {
    withStyles,
    Grid,
    Card,
    CardContent, 
    Typography,
    LinearProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

const useStyles = () => ({
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom:'2rem'
    },

    selectbox: {
        height: 30
    },

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        padding: '1rem',
    },

    continueButton: {
        marginTop: '2rem'
    },

    center: {
        justifyContent: 'center'
    }
});

class Initalize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 3,
        }
    }

    handleContinue = () => {
        this.props.handleChange(this.state.currentStep + 1)
    }

    render() {

        const { classes,t } = this.props;

        if (this.props.activeStep !== this.state.currentStep) {
            return null
        }

        return (
            <div className={ classes.root }>
                <Card>
                    <CardContent>
                        <Grid container spacing={ 2 } justify="center" >
                            <Grid item md={ 12 } className="center">
                                <img src="/images/infographics/download.svg" width="200px" alt="" />
                                <Typography>{t('Cluster.Initalize.wait')}</Typography>
                                <Typography>{t('Cluster.Initalize.download')}</Typography>
                            </Grid>
                            <Grid item md={ 4 } className="center">
                                <LinearProgress />
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
                
            </div>
        )
    }
}

const mapDispatchtoProps = () => {
    return {

    }
}

const mapStateToProps = () => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(
    compose(
        withStyles,
    )(useStyles)(withTranslation()(Initalize))
)
