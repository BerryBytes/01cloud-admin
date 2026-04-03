import React, { useEffect } from 'react';
import { Link, Grid, Card, CardContent, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux'
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import RefreshIcon from '@material-ui/icons/Refresh';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { getDiffDays, getDiffBetweenDates, getDiffInHours } from '../../helpers/utils'
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Brightness1Icon from '@material-ui/icons/Brightness1';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import './cicdcard.css';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import CicdLogSkeleton from '../skeletons/CicdLogSkeleton'
import { AppConstants } from '../../constants/appconstants'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({

    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    svgicon: {
        fontSize: 14,
        color: '#357dfd',
        marginRight: 5,
    },

}));

function StatusIndicator(props) {
    let statusIndicator = <HourglassEmptyOutlinedIcon/>;
    if(props.status) {
        switch(props.status.phase) {
            case 'Succeeded' :
                statusIndicator = <CheckIcon className="sucessIcon" />
                break;
            case 'Running' :
                if(props.isStale)
                {
                    statusIndicator = <ClearOutlinedIcon color="error"/>
                }   
                else
                { 
                    statusIndicator = <div className="lds-ring running"><div></div><div></div><div></div><div></div></div>
                }
                break;
            case 'Pending' :
                statusIndicator = <HourglassEmptyOutlinedIcon/>
                break;
            case 'Failed' :
                statusIndicator = <ClearOutlinedIcon color="error"/>
                break;
            case 'Error' : 
                statusIndicator = <ClearOutlinedIcon color="error"/>
                break;
            case "":
                statusIndicator = <HourglassEmptyOutlinedIcon/>
                break
            default:
                if (props.status.finished_at && props.status.phase !== "")
                    statusIndicator = <ClearOutlinedIcon color="error"/>
                else
                    statusIndicator = <HourglassEmptyOutlinedIcon/>
        }
    }
    return (
        <div>
            { statusIndicator }
        </div>
    )
  }

  function StepStatusIndicator(props) {
    let stepStatusIndicator = '';
    switch(props.status) {
        case 'Succeeded' :
            stepStatusIndicator = <div className="circle"><CheckCircleIcon className="successStep"/></div>
            
            break;
        case 'Running' :
            
            stepStatusIndicator = <div className="circle"><Brightness1Icon className="runningStep" /><div className="lds1-ring"><div></div><div></div><div></div><div></div></div></div>
            break;
        case 'Pending' :
            stepStatusIndicator = <div className="circle"><Brightness1Icon className="pendingStep" /><div className="lds1-hour"><HourglassEmptyOutlinedIcon className="pendingStepIcon"/></div></div>
            break;
        case 'Failed' :
            stepStatusIndicator = <div className="circle"><CancelIcon className="failedStep" /></div>
            break;
        default:
            stepStatusIndicator = ''
    }
    return (
        <div>
            { stepStatusIndicator }
        </div>
    )
  }

  function StepComponent(props) {
    const { workflow, logStep, isStale } = props;

    const getStatus = () => {
        const _phase = workflow && workflow.status && workflow.status.phase
        let statusIndicator = 'Pending'
        if(props.logData)
        {
            if (props.logData && props.logData.logs && props.logData.logs.length > 0)
            {
                if (props.source === "1") {
                    const _currentStep = props.logData.logs.find(x => x.step === logStep.step);
                    if(_currentStep)
                    {
                        if(_phase === 'Running' || _phase === 'Failed' || _phase === 'Error')
                        {
                            const isNextStep = props.logData.logs.find(x => x.step === logStep.step + 1);
                            if(isNextStep && isNextStep.log)
                            {
                                statusIndicator = 'Succeeded';
                            }
                            else
                                statusIndicator = isStale ? 'Failed' : _phase
                        }
                        else
                            statusIndicator = _phase
                    }
                }
                else if (props.source === "2") { 
                    statusIndicator = isStale ? 'Failed' : _phase
                }
            }
        }
        return statusIndicator;
    }
      
    const getStepStatus = () => {
        return <StepStatusIndicator status={ getStatus() }/>;
    }

    const showStepLogOption = () => {
        let isShow = false;
        if(props.logData)
        {
            if(props.logData && props.logData.logs && props.logData.logs.length > 0)
            {
                if (props.source === "1") {
                    const _currentStep = props.logData.logs.find(x => x.step === logStep.step);
                    if(_currentStep && _currentStep.log) isShow = true;
                }
                else if (props.source === "2") { 
                    isShow = true;
                }
            }
        }
        return isShow;
    }

    const getStepElapsedTime = () => {
        let time = '';
        if(props.logData)
        {
            if(props.logData && props.logData.logs && props.logData.logs.length > 0)
            {
                if (props.source === "1") {
                    const _currentStep = props.logData.logs.filter(x => x.step === logStep.step);
                    if(_currentStep && _currentStep.length > 0)
                    {
                        try {
                            const _status = getStatus();
                            const endLineTime = _currentStep[_currentStep.length - 1].log.split(' ')[0].trim();
                            let finishTime = _status === AppConstants.WorkflowStatus.Running ? new Date().toUTCString() : endLineTime;
                            time = getDiffBetweenDates(_currentStep[0].log.split(' ')[0].trim(), finishTime);
                        }
                        catch(e){
                            /* empty */
                        }
                    }
                }
                else if (props.source === "2") {
                    const _status = getStatus();
                    const endLineTime = props.logData.logs[props.logData.logs.length - 1].log.split(' ')[0].trim();
                    let finishTime = _status === AppConstants.WorkflowStatus.Running ? new Date().toUTCString() : endLineTime;
                    time = getDiffBetweenDates(props.logData.logs[0].log.split(' ')[0].trim(), finishTime);
                }
            }
        }
        return time;
    }

    const handleShowLog = () => {
        props.handleShowLog(workflow.object_meta.name, isStale , logStep);
      }
      
      const getTitle = () => {
          let title = "";
          if (props.source === "1") {
              title = logStep && logStep.type
          }
          else if (props.source === "2") {
              title = props.logData && props.logData.type
          }
          return title;
      }

    return (
        <div className="step" key={ logStep && logStep.step }>
            <div className="iconSizeWidth">
                { getStepStatus()}
            </div>
            <div>
                <div className="title">{getTitle()}</div>
                <div className="stepsRight">
                    {
                        showStepLogOption() &&
                        <>
                            <span className="time"> { getStepElapsedTime() } </span>
                            <span><DescriptionOutlinedIcon className="logsIcon" onClick={ () => handleShowLog() }/></span>
                        </>
                    }
                </div>
                <Divider className="m-t-10" />
            </div>
        </div>
    )
  }
  
export const CICDCard = (props) => {
    const classes = useStyles();
    const [t] = useTranslation()
    const [ expanded, setExpanded ] = React.useState(false);
    
    const [ timer, setTimer ] = React.useState(null);
    const [ dummydate, setDummydate ] = React.useState(null);  
    const { ci_request, workflow, log_steps } = props.data
    const gitLink = ci_request && ci_request.repository_image ? ci_request.git_url.substring(0, ci_request.git_url.length - 4) + '/commit/' + ci_request.repository_image.tag : ''
    const isStale = workflow && workflow.status && workflow.status.phase === 'Running' ? 
        (getDiffInHours(workflow.status.started_at) > 1 ? true : false) : false
    useEffect(() => {
        if(timer === null && (workflow.status.phase === 'Pending' || workflow.status.phase === 'Running'))
        {
            let _timer = setInterval( () => setDummydate(Date.now()), 2000);
            setTimer(_timer);
        }
        if (timer !== null && (workflow.status.phase === 'Succeeded' || workflow.status.phase === 'Failed' || workflow.status.phase === 'Error'))
        {
            setTimer(null);
        }
    }, [ workflow ]);
    
    const handleExpandClick = (workflowName, isFetchLog) => {
        if(!expanded && isFetchLog) {
            props.fetchWorkflowLogs(workflowName);
        }
        else if(!isFetchLog){
            if(timer === null)
            {
                let _timer = setInterval( () => setDummydate(Date.now()), 2000);
                setTimer(_timer);
            }
        }
        setExpanded(!expanded);
    };

    const handleReRun = (workflowName) => {
        props.handleReRun(workflowName);
    }

    const handleStop = (workflowName) => {
        props.handleStop(workflowName);
    }

    const handleShowLog = (workflowName, isWorkFlowStale, logStep) => {
        props.handleShowLog(workflowName, isWorkFlowStale, logStep);
    }

    const getWorkflowFinishedTime = () => {
        let finishTime = new Date();
        const status = workflow && workflow.status;
        
        if (status.phase !== 'Running' && status.finished_at)
            finishTime = status.finished_at;
        
        return finishTime;
    }

    return (
        <div>
            {
                ci_request &&
                <Card className="m-b-20" data-test="main-container">
                    <CardContent>
                        <span style={{ display: "none" }}> { dummydate } </span>
                        <Grid>
                            <Grid container alignItems="center" spacing={1}>
                                <Grid item md={ 1 } >
                                    <StatusIndicator status={ workflow && workflow.status } isStale={ isStale }/>
                                </Grid>

                                <Grid item md={ 10 }>
                                    <Grid>
                                        <Grid container alignItems="center" >
                                            <Grid item md={ 10 }>
                                                <Grid>
                                                    <Grid container>
                                                        <Grid item md={ 12 } xs={ 12 }>
                                                            {
                                                                props.source === '1' &&
                                                                <>
                                                                    {t('Ci')}{ (props.dataCount - props.index) } {t('Commit')}&nbsp;
                                                                    {
                                                                        <Link href={ gitLink } target="_blank" rel="noreferrer" underline='always' data-test="repo-tag">
                                                                                {ci_request.repository_image && ci_request.repository_image.tag.substring(0, 7) }
                                                                        </Link>
                                                                    }
                                                                </>
                                                            }
                                                            {
                                                                props.source === '2' && <>#{ (props.dataCount - props.index) }</>
                                                            }
                                                            
                                                        </Grid>

                                                        <Grid item md={ 12 } xs={ 12 }>
                                                                {props.source === '1' && <p className="commitmsg oneLine" title={ci_request.commit_message} data-test="commit-msg"> {ci_request.commit_message }</p> }
                                                            { props.source === '2' && <p className="commitmsg oneLine" title={ props.data && props.data.type }> { props.data && props.data.type }</p> }
                                                        </Grid>

                                                        <Grid item md={ 12 }>
                                                            <Grid>
                                                                <Grid container>
                                                                    { 
                                                                        props.source === '1' &&
                                                                        <>
                                                                            <Grid item md={ 4 } xs={ 6 } className="header-details-grid">
                                                                                <PersonOutlineOutlinedIcon className={ classes.svgicon } />
                                                                                    <span className="infoGrid" data-test="author-name">{ci_request.author }</span>
                                                                            </Grid>
                                                                            <Grid item md={ 3 } xs={ 6 } className="header-details-grid">
                                                                                <AccountTreeOutlinedIcon className={ classes.svgicon } />
                                                                                    <span className="infoGrid" data-test="branch-name">{ci_request.git_branch }</span>
                                                                            </Grid>
                                                                        </>
                                                                    }
                                                                    {
                                                                        props.source === '2' &&
                                                                        <>
                                                                            <Grid item md={ 4 } xs={ 6 } className="header-details-grid">
                                                                                <SettingsOutlinedIcon className={ classes.svgicon } />
                                                                                <span className="infoGrid">{ props.clusterDetails && props.clusterDetails.cluster_version }</span>
                                                                            </Grid>
                                                                            <Grid item md={ 3 } xs={ 6 } className="header-details-grid">
                                                                                <PublicOutlinedIcon className={ classes.svgicon } />
                                                                                <span className="infoGrid">{ props.clusterDetails && props.clusterDetails.region }</span>
                                                                            </Grid>
                                                                        </>
                                                                    }
                                                                    <Grid item md={ 3 } xs={ 6 } className="header-details-grid">
                                                                        <DateRangeOutlinedIcon className={ classes.svgicon } />
                                                                            <span className="infoGrid" data-test="time-diff">{getDiffDays(workflow.object_meta?.creationTimestamp, true) }</span>
                                                                    </Grid>
                                                                    <Grid item md={ 2 } xs={ 6 } className="header-details-grid">
                                                                        <ScheduleOutlinedIcon className={ classes.svgicon } />
                                                                            <span className="infoGrid" data-test="started-time">{!isStale ? getDiffBetweenDates(workflow.status.started_at, getWorkflowFinishedTime()) : 'NA'}</span>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {
                                                props.source === '1' &&
                                                <Grid item md={ 2 }>
                                                    {
                                                        props.index === 0 && workflow && workflow.status && workflow.status.phase === 'Failed' &&
                                                        <Button variant="outlined" onClick={ () => handleReRun(workflow.object_meta.name) }
                                                          startIcon={ <RefreshIcon /> }
                                                          data-test="rerun-btn"
                                                        >
                                                            {t('ReRun')}
                                                        </Button>
                                                    }
                                                    {
                                                        workflow && workflow.status && (workflow.status.phase === 'Pending' || (workflow.status.phase === 'Running' && !isStale)) &&
                                                        <Button variant="outlined" onClick={ () => handleStop(workflow.object_meta.name) }
                                                          startIcon={ <StopRoundedIcon /> }
                                                          data-test="stop-btn"
                                                        >
                                                            {t('Stop')}
                                                        </Button>
                                                    }
                                                </Grid>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item md={ 1 } className="center stick-right">

                                    <IconButton
                                      className={ clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        }) }
                                      onClick={ () => handleExpandClick(workflow.object_meta.name, workflow.status && (workflow.status.phase === 'Pending' || (workflow.status.phase === 'Running' && !isStale)) ? false : true) }
                                      aria-expanded={ expanded }
                                      aria-label="show more"
                                      data-test="expand-icon"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <Collapse in={ expanded } timeout="auto" unmountOnExit>
                        <Divider />
                        <CardContent>
                            {
                                props.source === '1' &&
                                <>
                                    {
                                    !props.logData && 
                                    [ 0,1,2 ].map(value => {
                                        return (
                                            <React.Fragment key={ value }>
                                                <CicdLogSkeleton data-test="cicd-skel" />
                                            </React.Fragment>
                                        )
                                    })
                                }
                                    {
                                    props.logData && (!props.logData.logs || props.logData.logs.length === 0) && workflow && workflow.status && workflow.status.message &&
                                    <div className="step">
                                        <span>{t('ErrorMessage')} </span>
                                        <div className="title failedStep" data-test="no-workflow-msg">{ workflow.status.message }</div>
                                    </div>
                                }
                                    { 
                                    props.logData && props.logData.logs && log_steps && log_steps.length > 0 && log_steps.map((logStep, ind) => {
                                        return (
                                            <StepComponent 
                                                source={props.source}
                                                workflow={ workflow }
                                                isStale = { isStale }
                                                logStep = { logStep }
                                                logData = { props.logData }
                                                handleShowLog={handleShowLog}
                                                key={ ind }
                                                data-test="step-comp"
                                            />
                                        )
                                    })
                                }
                                </>
                            }
                            {
                                props.source === '2' &&
                                !log_steps &&
                                <StepComponent
                                    source={ props.source }
                                    workflow={workflow}
                                    isStale={isStale}
                                    logStep={ null }
                                    logData={props.logData}
                                    handleShowLog={handleShowLog}
                                    key={0}
                                />
                            }
                        </CardContent>
                    </Collapse>
                </Card>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        projectRole: state.ProjectReducer.projectRole
    }
}

export default connect(mapStateToProps, null)(CICDCard) 