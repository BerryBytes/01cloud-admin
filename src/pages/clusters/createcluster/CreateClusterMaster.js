import React, {Component} from 'react';
import Stepper from '@material-ui/core/Stepper';
import { Step, Typography, ButtonBase } from '@material-ui/core';
import StepLabel from '@material-ui/core/StepLabel';
import Cluster from './cluster/Cluster'
import NodeGroup from './nodegroup/NodeGroup'
import Provider from './provider/Provider'
import Initalize from './initalize/Initalize'
import Plan from './plan/Plan'
import { createCluster, clearCreateCluster, clearNewClusterData, getClusterDetails, getProviderConfig, cancelWorkflow, redirectToCluster } from '../redux/actions'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from 'react-redux';
import { sessionTokenSelector } from '../../login/redux/selectors';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Prompt } from 'react-router-dom';
import {withTranslation} from 'react-i18next';

class CreateClusterMaster extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeStep : 0,
            completeData : {},
            newClusterId: 0,
            logData: "",
            workflowPhase : "",
            WorkflowName : null,
            ws: null,
            isEditMode: false,
            editClusterID: this.props.match.params.id,
            cancelled: false,
            isBlocking: true
        }
        this.handleStepChange = this.handleStepChange.bind(this)
        this.socketConnection = this.socketConnection.bind(this)
    }

    componentDidMount() {
        this.props.clearNewClusterData();
        if(this.props.match.params.id > 0) {
            this.setState({
                isEditMode: true,
                activeStep: 1
            })
            this.props.getClusterDetails(this.props.match.params.id)
        }
    }

    getSteps = () => {
        
        return [
            { label: 'Provider', isDisabled: this.state.isEditMode },
            { label: 'Cluster', isDisabled: false },
            { label: 'Node Group', isDisabled: false },
            { label: 'Initialize', isDisabled: false },
            { label: 'Plan', isDisabled: false }
        ]
    }

    handleStepChange(stepNumber,data={}){
        const completeData = {...this.state.completeData , ...data}
        
        this.setState({
            activeStep : stepNumber,
            completeData
        })
    }

    handleBack = (stepNumber) => {
        this.setState({
            activeStep : stepNumber,
            cancelled: false,
        })
    }

    handleStep = (step) => {
        this.setState({
            activeStep : step,
        })
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps) {
          if(this.state.isEditMode && !this.props.clusterDetails && nextProps.clusterDetails){
            this.props.getProviderConfig(nextProps.clusterDetails.provider);
            this.setState({
                completeData : { 
                    provider: nextProps.clusterDetails.provider,
                    
                }
            })
          }
        }
    }

    componentWillUnmount(){
        if(this.state.ws !== null){
          this.state.ws.close(1000);
        }
        this.props.clearCreateCluster()
    }

    cancelWorkflow = () => {
        if(this.state.newClusterId && this.state.WorkflowName){
            this.props.cancelWorkflow(this.state.newClusterId, this.state.WorkflowName)
        }
        this.setState({
            cancelled: true
        })
    }

    tabChanger = () => {
        this.props.redirectToCluster();
        this.props.history.goBack();
    }

    updateBlockInfo = () => {
        this.setState({ isBlocking: false });
    }

    socketConnection = (id) => {
        if(this.state.ws !== null) return;
        this.setState({ newClusterId: id })
        const sessionToken = this.props.validSessionId;
        var ws = new W3CWebSocket(window?.config?.REACT_APP_SOCKET_IO_ENDPOINT + "?token="+ sessionToken + "&room=cluster-" + id);
        ws.onopen = () => {
            console.log('WebSocket Client Connected');
            this.setState({ ws: ws });
        };
        ws.onclose = () => {
            console.log('WebSocket connection closed');
            this.setState({ ws: null });
            
        };
        ws.onerror = () => {
            console.log('WebSocket error');
            ws.close();
            this.setState({ ws: null })
        };
        ws.onmessage = (response) => {
            if(response.type === "message"){
                const { data } = response;
                if(data)
                {
                    const _data = JSON.parse(data);
                    if(_data){
                        if(_data.Type === "create-cluster-watcher")
                        {
                            this.setState({ 
                                workflowPhase : _data.Data && _data.Data.Workflow && _data.Data.Workflow.phase
                            })
                            if(_data.Data?.Workflow?.phase === "Failed"){
                                this.setState({
                                    cancelled : false
                                })
                            }
                        }
                        else if(_data.Type === "cluster-plan")
                        {
                            if(this.state.activeStep === 3)
                                this.setState({ activeStep: 4 })
                            let { logData } = this.state;
                            logData = logData + "\n" + _data.Data;
                            this.setState({ logData, WorkflowName: _data.WorkflowName })
                        }
                        
                    }
                }
            }
        }
    }

    render () {
        const steps = this.getSteps();
        const { t } = this.props;
        return (
            <div>
                <Prompt
                    when={this.state.isBlocking}
                    message={() =>
                        `There are unsaved changes. Are you sure you want leave ?`
                    }
                />
            <ButtonBase
                onClick={this.tabChanger}
                style={{ color: "#357dfd", marginBottom: 20 }}
                data-test="backButton"
            >
                <ArrowBackIcon fontSize="small" />{" "}
                <span className="jobNav">{t('App.CreateApp.back')}</span>
            </ButtonBase>

                <Typography variant="h4" color="primary" align="center"> { this.state.isEditMode ? t('Cluster.CreateClusterMaster.editYourCluster') : t('Cluster.CreateClusterMaster.createYourCluster') }  </Typography>
                <Stepper style={{background:'#f6f8fa' , paddingLeft : '0px'}} activeStep={this.state.activeStep} alternativeLabel>
                    {steps.map((item, index) => (
                        <Step key={item.label} disabled={ item.isDisabled || this.state.activeStep <= index } >
                            
                            <StepLabel>  
                                {item.label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Provider activeStep={this.state.activeStep} handleChange={this.handleStepChange}/>
                <Cluster activeStep={this.state.activeStep} completeData={this.state.completeData} handleChange={this.handleStepChange} isEditMode={ this.state.isEditMode }
                  handleBack={ this.handleBack }
                />
                <NodeGroup activeStep={this.state.activeStep} 
                  completeData={this.state.completeData} 
                  handleChange={this.handleStepChange} 
                  history={this.props.history} 
                  socketConnection={ this.socketConnection }
                  isEditMode={ this.state.isEditMode }
                  editClusterID={ this.state.editClusterID }
                  handleBack={ this.handleBack }
                />
                <Initalize activeStep={this.state.activeStep} completeData={this.state.completeData} handleChange={this.handleStepChange} history={this.props.history} />
                <Plan activeStep={this.state.activeStep} 
                  completeData={this.state.completeData} 
                  handleChange={this.handleStepChange} 
                  history={this.props.history} 
                  clusterId={ this.state.newClusterId}
                  logData={ this.state.logData}
                  workflowPhase = { this.state.workflowPhase}
                  handleBack={ this.handleBack }
                  cancelWorkflow = {this.cancelWorkflow}
                  cancelled = { this.state.cancelled }
                  updateBlockInfo={this.updateBlockInfo}
                />
            
            </div>
        )
    }
}

const mapStateToProps = state => ({
    validSessionId: sessionTokenSelector(state),
    clusterDetails: state.ClusterReducer.clusterDetails,
})

const mapDispatchtoProps = dispatch => {
  return {
    redirectToCluster: () => dispatch(redirectToCluster()),
    createCluster: (jsonBody) => dispatch(createCluster(jsonBody)),
    clearCreateCluster: () => dispatch(clearCreateCluster()),
    clearNewClusterData: () => dispatch(clearNewClusterData()),
    getClusterDetails: (id) => dispatch(getClusterDetails(id)),
    getProviderConfig: (provider) => dispatch(getProviderConfig(provider)),
    cancelWorkflow: (id, workflow) => dispatch(cancelWorkflow(id, workflow)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withTranslation()(CreateClusterMaster))