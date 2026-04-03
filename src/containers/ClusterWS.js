import React, { Component } from 'react';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { getWorkflowLog, updateClusterPackageStatus, updateClusterWorkflowLog, updateClusterWorkflows } from '../pages/clusters/redux/actions';
import { sessionTokenSelector } from '../pages/login/redux/selectors';

class ClusterWS extends Component {
    constructor(props){
        super(props);
        this.state = {
            ws: null,
        }
    }

    componentDidMount() {
        if(this.props.clusterId > 0)
            this.socketConnection(this.props.clusterId);
    }

    componentWillUnmount(){
        if(this.state.ws !== null){
          this.state.ws.close(1000);
        }
    }

    socketConnection = (id) => {
        if(this.state.ws !== null) return;
        let $this = this;
        const sessionToken = this.props.validSessionId;
        var ws = new W3CWebSocket(window?.config?.REACT_APP_SOCKET_IO_ENDPOINT + '?token='+ sessionToken + '&room=cluster-' + id);
        this.setState({
            ws
        })
        ws.onopen = () => {
            console.log('WebSocket Client Connected');
            this.setState({ ws: ws });
        };
        ws.onclose = e => {
            console.log('WebSocket connection closed');
            this.setState({ ws: null });
            if(e.code !== 1000)
                this.socketConnection(id);
        };
        ws.onerror = () => {
            console.log('WebSocket error');
            ws.close();
            this.setState({ ws: null })
        };
        ws.addEventListener('message', (response) => {
            if(response.type=== 'message'){
                const { data } = response;
                if(data)
                {
                    const _data = JSON.parse(data);
                    if(_data.type === 'create-cluster-watcher')
                    {
                        $this.updateMainMessage(_data);
                        
                    }
                    else if(_data.type === 'cluster-apply' || _data.type === 'cluster-destroy' || _data.type === 'package-install' || _data.type === 'package-uninstall')
                    {
                        $this.updateLogMessage(_data);
                        
                    }
                    else if(_data.type === 'package-status'){                        
                        const nsData= _data.data
                        let newStatus = {
                            ...this.props.clusterPackageStatus,
                            [nsData.namespace]: {
                                ...nsData
                            }
                        }
                        
                        this.props.updateClusterPackageStatus(newStatus)  
                    }
                }
            }
        });
    }

    updateMainMessage = (_data) => {
        
        const _newWorkflow = {
            workflow: {
                object_meta: {
                    creationTimestamp: _data.data.workflow.started_at,
                    name: _data.name,
                },
                status: {
                    finished_at: _data.data.workflow.finished_at,
                    phase: _data.data.workflow.phase,
                    started_at: _data.data.workflow.started_at,
                    message: _data.data.workflow.message,
                },
            },
            ci_request: {}, 
            log_steps: _data.log_steps,
            type: _data.data.type ? _data.data.type : 'cluster-watcher'
        };

        let _clusterWorkflows = [];
        if(this.props.clusterWorkflows){
            _clusterWorkflows = [ ...this.props.clusterWorkflows ];
        }
        const _workflowIndex = _clusterWorkflows.findIndex(x => x.workflow.object_meta.name === _data.name);
        if(_workflowIndex > -1)
        {
            _clusterWorkflows[_workflowIndex] = _newWorkflow;
        }
        else
        {
            _clusterWorkflows.unshift(_newWorkflow);
        }
        this.props.updateClusterWorkflows(_clusterWorkflows);
        if(_data.data.workflow.phase === 'Succeeded') {
            let $this = this;
            setTimeout( function () { $this.props.getWorkflowLog($this.props.clusterId, _data.name); }, 2000)
        }
    }

    updateLogMessage = (_data) => {
        
        let _clusterWorkflowLog = [ ...this.props.clusterWorkflowLog ];
        const _workflowLogIndex = _clusterWorkflowLog.findIndex(x => x.name === _data.workflow_name);
        if(_workflowLogIndex > -1)
        {
            if(_clusterWorkflowLog[_workflowLogIndex] && _clusterWorkflowLog[_workflowLogIndex].logs && _clusterWorkflowLog[_workflowLogIndex].logs.length > 0)
            {
                _clusterWorkflowLog[_workflowLogIndex].logs.push({
                    log: _data.data,
                    
                })
            }
        }
        else
        {
            let newWorkflowlog = {
                name: _data.workflow_name,
                logs : [ {
                    log: _data.data,
                    
                } ],
                type: _data.type
            };
            _clusterWorkflowLog.push(newWorkflowlog);
        }
        this.props.updateClusterWorkflowLog(_clusterWorkflowLog);
    }

    getEmptyDiv = () =>{
       return(<div></div>)
    }

    render() {
        return (
            this.getEmptyDiv()
        )
    }
}

const mapStateToProps = state => ({
    clusterWorkflows: state.ClusterReducer.clusterWorkflows,
    clusterWorkflowLog: state.ClusterReducer.clusterWorkflowLog,
    clusterPackageStatus: state.ClusterReducer.clusterPackageStatus,
    validSessionId: sessionTokenSelector(state),
})

const mapDispatchtoProps = dispatch => {
    return {
        getWorkflowLog: (id, workflowName) => dispatch(getWorkflowLog(id, workflowName)),
        updateClusterWorkflowLog: (workflowLogs) => dispatch(updateClusterWorkflowLog(workflowLogs)),
        updateClusterWorkflows: (workflows) => dispatch(updateClusterWorkflows(workflows)),
        updateClusterPackageStatus: (status) => dispatch(updateClusterPackageStatus(status)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(ClusterWS)