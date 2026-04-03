import React, {Component} from 'react';
import { Button, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { getWorkflows, getWorkflowLog, clearClusterWorkflows } from './redux/actions'
import InfiniteScroll from 'react-infinite-scroll-component';
import CicdCard from '../../components/cicdcard/CicdCard';
import CicdLogsPopup from '../../components/cicdlogspopup/CicdLogsPopup';
import CicdCardSkeleton from '../../components/skeletons/CicdCardSkeleton'
import BackdropLoader from '../../components/loader/BackdropLoader'
import ClusterWS from '../../containers/ClusterWS';
import { AppConstants } from '../../constants/appconstants';
import { withTranslation } from 'react-i18next';

const useStyles = () => ({
  divBuild: {
    display: "flex",
    marginBottom: 10
  },
  btnBuild: {
      marginLeft : "auto"
  },
  imgGrid: {
    textAlign: "center"
  },
  defaultImg: {
    width: "400px",
    objectFit: "cover"
  }
});

export class Clusterworkflow extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            openLogPopup: false,
            currentWorkflowName_Log : '',
            currentWorkflowLogStep : '',
            currentWorkFlowIsStale: false,
            pageNo: 1,
            pageSize: 10,
            
        }
    }

    componentDidMount() {
      if(this.props.clusterId > 0)
      {
        this.fetchClusterWorkflows(this.props.clusterId);
      }
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
      if(nextProps){
        if(!this.props.clusterWorkflowsLoaded && nextProps.clusterWorkflowsLoaded)
        {
          if(nextProps.clusterWorkflows && nextProps.clusterWorkflows.length > 0)
          {
            const pendingWorkflows = nextProps.clusterWorkflows.filter(x => x.workflow && x.workflow.status && (x.workflow.status.phase === "Pending" || x.workflow.status.phase === "Running"));
            if(pendingWorkflows && pendingWorkflows.length > 0)
            {
              pendingWorkflows.map(item => {
                this.props.getWorkflowLog(this.props.clusterId, item.workflow.object_meta.name, true);
              })
            }
          }
        }
      }
    }

    componentWillUnmount() {
      this.props.clearClusterWorkflows()
    }

    fetchClusterWorkflows = (id, pageNo) => {
      this.props.getWorkflows(id, pageNo ? pageNo : 1, this.state.pageSize);
    }

    handleShowLog = (workflowName, isWorkFlowStale, logStep) => {
      this.setState({
          openLogPopup: true,
          currentWorkflowName_Log : workflowName,
          currentWorkflowLogStep : logStep,
          currentWorkFlowIsStale: isWorkFlowStale
      })
    }

    handleCloseLogPopup = () => {
      this.setState({
          openLogPopup: false,
          currentWorkflowName_Log : '',
          currentWorkflowLogStep : '',
          currentWorkFlowIsStale: false
      })
    }

    fetchWorkflowLogs = (workflowName) => {
      const { clusterWorkflowLog } = this.props;
      if(clusterWorkflowLog && clusterWorkflowLog.length > 0)
      {
          const isExists = clusterWorkflowLog.filter(x => x.name === workflowName);
          if(isExists && isExists.length > 0)
              return;
      }
      this.props.getWorkflowLog(this.props.clusterId, workflowName)
    }

    loadMore = () => {
      let newPageNo = this.state.pageNo + 1;
      this.fetchClusterWorkflows(this.props.clusterId, newPageNo);
      this.setState({
          pageNo: newPageNo
      });
    }

    handleApplyTerraform = () => {
      
      this.props.handleClusterApply();
    }

    render () {
        const { classes, clusterDetails, appliedClusters,t } = this.props;
        return (
            <div data-test="main-container">
                <ClusterWS data-test="cluster-ws" clusterId={ this.props.clusterId} />
                {
                  clusterDetails && clusterDetails.status === AppConstants.ClusterStatus.Planned && 
                  <div className={classes.divBuild}>
                      <Button data-test="apply-button" variant="contained" color="primary" className={classes.btnBuild} onClick={() => this.handleApplyTerraform()} disabled={ appliedClusters && appliedClusters.find(x => x === this.props.clusterId) }> {t('Cluster.ClusterWorkflow.apply')} </Button>
                  </div>
                }
                {
                  this.props.clusterWorkflows && this.props.clusterWorkflows.length > 0 ?
                  (
                    <InfiniteScroll
                      data-test="infinite-scroll"
                      dataLength={ this.props.clusterWorkflows.length }
                      next={this.loadMore.bind(this)}
                      hasMore= { this.props.clusterWorkflows.length === this.state.pageSize * this.state.pageNo }
                    >
                        {
                        this.props.clusterWorkflows.map((workflow, index) => {
                            return (
                                <CicdCard source="2" 
                                  data-test="data-card"
                                  data={ workflow } 
                                logData={this.props.clusterWorkflowLog && workflow && workflow.workflow && this.props.clusterWorkflowLog.find(x => x.name === workflow.workflow.object_meta.name)}
                                  dataCount={ this.props.clusterWorkflows.length } 
                                  index={ index }
                                  key={index}
                                  fetchWorkflowLogs={this.fetchWorkflowLogs} 
                                    
                                  handleShowLog={this.handleShowLog}
                                    
                                  clusterDetails = { this.props.clusterDetails }
                                />
                            )
                        })
                    }
                    </InfiniteScroll>) :
                    (
                      (!this.props.clusterWorkflows) ?
                        [0,1,2,3,4].map(value => {
                            return (
                                <React.Fragment key={value}>
                                    <CicdCardSkeleton data-test="card-skeleton" />
                                </React.Fragment>
                            )
                        }) : 
                        <Grid item xs className={classes.imgGrid}>
                          <img
                            data-test="no-history"
                            src="/images/infographics/no_proj.svg"
                            alt="No History"
                            className={classes.defaultImg}
                          />
                          <p>{t('Cluster.ClusterWorkflow.noHistory')}</p>
                        </Grid>
                    )
                }
                <CicdLogsPopup
                  source="2"
                  openLogPopup={ this.state.openLogPopup } 
                  logData={this.props.clusterWorkflowLog && this.props.clusterWorkflowLog.find(x => x.name === this.state.currentWorkflowName_Log)} 
                  handleCloseLogPopup={this.handleCloseLogPopup}
                  currentWorkFlow={this.props.clusterWorkflows && this.props.clusterWorkflows.find(x => x.workflow && x.workflow.object_meta && x.workflow.object_meta.name === this.state.currentWorkflowName_Log) }
                  currentWorkflowName_Log = { this.state.currentWorkflowName_Log}
                  currentWorkflowLogStep = { this.state.currentWorkflowLogStep}
                  currentWorkFlowIsStale = { this.state.currentWorkFlowIsStale}
                />
                {this.props.fetchingClusterWorkflows && <BackdropLoader message={t('Cluster.ClusterWorkflow.fetchingCluster')} />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
  clusterWorkflows: state.ClusterReducer.clusterWorkflows,
  clusterWorkflowLog: state.ClusterReducer.clusterWorkflowLog,
  clusterWorkflowsLoaded: state.ClusterReducer.clusterWorkflowsLoaded,
  fetchingClusterWorkflows: state.ClusterReducer.fetchingClusterWorkflows,
  appliedClusters: state.ClusterReducer.appliedClusters
})

const mapDispatchtoProps = dispatch => {
  return {
    getWorkflows : (id, pageNo, pageSize) => dispatch(getWorkflows(id, pageNo, pageSize)),
    getWorkflowLog : (id, workflowName, noEmptyCheck) => dispatch(getWorkflowLog(id, workflowName, noEmptyCheck)),
    clearClusterWorkflows: () => dispatch(clearClusterWorkflows())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(Clusterworkflow)))