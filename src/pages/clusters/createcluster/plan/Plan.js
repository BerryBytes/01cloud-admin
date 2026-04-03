import React, { Component } from 'react'
import {
    Button,
    withStyles,
    Grid,
    IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { applyTerraform } from '../../redux/actions'
import ConfirmActionPopup from "../../../../components/confirmactionpopup/ConfirmActionPopup"
import Ansi from "ansi-to-react";
import BackdropLoader from '../../../../components/loader/BackdropLoader';
import { withTranslation } from 'react-i18next'

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
    },
    logContainer: {
        marginBottom: 20,
        backgroundColor: "#424242",
        color: "white",
        marginTop: 20,
        height: "58vh",
        whiteSpace: "pre-line",
        overflowY: "auto",
        paddingLeft: 20,
        position: 'relative'
    },
    logsStyle : {
        marginTop: 10
    },
    podDropdown: {
        minWidth: 180,

    },
});

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 4,
            confirmCancel:false,

        }
        this.logEndRef = React.createRef()
        this.container = React.createRef()
        this.isHanging = false
    }

    scrollToBottom = () => {
        if(this.logEndRef && this.logEndRef.current){
            this.logEndRef.current.scrollIntoView({ behaviour: "smooth"})
        }
      }

    handleScroll = () => {
        let posFromBottom = this.container.current.scrollTop + this.container.current.offsetHeight;
        let distanceFromBottom = this.container.current.scrollHeight - posFromBottom;
        if(distanceFromBottom <= 100){
            this.isHanging = false    
        }else{
            this.isHanging = true
        }
      };
    
    componentDidUpdate(){
        if (this.container.current && !this.isHanging) {
            this.container.current.scrollTop = this.container.current?.scrollHeight;
          }
    }

    handleApplyTerraform = () => {
        this.props.updateBlockInfo();
        this.props.applyTerraform(this.props.clusterId, this.props.history)
    }

    handleBack = () => {
        this.props.handleBack(this.state.currentStep - 2);
    }

    handleCancelWorkflow = () => {
        this.setState({
            confirmCancel: true
        })
    }
    
    handleCancelAgree = () => {
        this.setState({
            confirmCancel: false
        })
        this.props.cancelWorkflow()
    }

    handleCancelDisagree = () => {
        this.setState({
            confirmCancel: false
        })
    }

    render() {
        const { classes, t } = this.props;
        if (this.props.activeStep !== this.state.currentStep) {
            return null
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item md={12}>

                        <div className={classes.logContainer}  ref={this.container} onScroll={this.handleScroll}>
                            <div className="arrowgodown">
                                <IconButton title={t('Cluster.Plan.scrollBottom')} color="primary" aria-label="Scroll To Bottom" className="arrowgodownbtn" onClick={this.scrollToBottom}><ArrowDownwardIcon size="small" /></IconButton>
                            </div>
                            <pre className="podlogs">
                                <Ansi>
                                    { this.props.logData }
                                </Ansi>
                            </pre>
                            <div id="logs-container" className="logsStyle" ref={this.logEndRef}>
                            </div>
                        </div>

                    </Grid>
                </Grid>
                <div className={classes.actions}>
                    <Grid container className={classes.continueButton} justify="center" spacing={2}>
                        <Grid item lg={1} md={2} xs={4}>
                            <Button variant="contained" color='primary' fullWidth onClick={() => this.handleBack()} disabled={ this.props.workflowPhase !== "Succeeded" && this.props.workflowPhase !== "Failed" && !this.props.cancelled}>
                            {t('App.CreateApp.back')}
                            </Button>
                        </Grid>
                        <Grid item lg={1} md={2} xs={4}>
                            <Button variant="contained" color='primary' fullWidth onClick={() => this.handleApplyTerraform()} disabled={ this.props.workflowPhase !== "Succeeded"}>
                            {t('Cluster.ClusterWorkflow.apply')} 
                            </Button>
                        </Grid>
                        <Grid item lg={1} md={2} xs={4}>
                            <Button variant="contained" color='primary' fullWidth onClick={() => this.handleCancelWorkflow()} disabled={ this.props.cancelled || this.props.workflowPhase === "Succeeded" || this.props.workflowPhase === "Failed"}>
                                {this.props.cancelled ? "Cancelling" : "Cancel"}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
                { this.state.confirmCancel && (
                    <ConfirmActionPopup
                      open={this.state.confirmCancel}
                      message={t('Cluster.Plan.cancelMessage')}
                      handleAgree={this.handleCancelAgree}
                      handleDisAgree={this.handleCancelDisagree}
                      yesText={t("Projects.ProjectInfo.yesLabel")}
                    />
                )}
                { this.props.cancellingWorkflow && (
                    <BackdropLoader message={t('Cluster.Plan.cancelWorkFlow')} />
                )}
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        applyTerraform: (id, orgId, history) => dispatch(applyTerraform(id, orgId, history))
    }
}

const mapStateToProps = (state) => {
    return {
        cancellingWorkflow: state.ClusterReducer.cancellingWorkflow,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(
    compose(
        withStyles,
    )(useStyles)(withTranslation()(Plan))
)
