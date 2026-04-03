import React, { useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { getDiffBetweenDates } from '../../helpers/utils'
import { StepStatusIndicatorPopUp } from '../statusindicator/statusindicator'
import { AppConstants } from '../../constants/appconstants'
import Ansi from 'ansi-to-react';

import './cicdpopup.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialog: {
    
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
      <MuiDialogTitle disableTypography className={ classes.root } { ...other }>
          <Typography variant="h6" color="primary">
              {children}
          </Typography>
          {onClose ? (
              <IconButton
                aria-label="close"
                className={ classes.closeButton }
                onClick={ onClose }
              >
                  <CloseIcon />
              </IconButton>
      ) : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#424242',
  },
}))(MuiDialogContent);

export default function CustomizedDialogs(props) {
  const logEndRef = useRef(null);
  const [ dummydate, setDummydate ] = React.useState(null); 
  const [timer, setTimer] = React.useState(null); 
  
  const scrollToBottom = () => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [ props.logData ]);

  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      scrollToBottom();
    } else didMountRef.current = true;
  });

  useEffect(() => {
    if(props.openLogPopup)
    {
      let _timer = setInterval( () => setDummydate(Date.now()), 2000);
      setTimer(_timer);
    }
    else
    {
      setTimer(null);
    }
  },[ props.openLogPopup ])

  const getStatus = () => {
    const _phase = props.currentWorkFlow && props.currentWorkFlow.workflow && props.currentWorkFlow.workflow.status && props.currentWorkFlow.workflow.status.phase
    const step = props.currentWorkflowLogStep && props.currentWorkflowLogStep.step;
    let statusIndicator = 'Pending'
    if(props.logData)
    {
        if(props.logData && props.logData.logs && props.logData.logs.length > 0)
        {
          const _currentStep = props.logData.logs.find(x => x.step === step);
          if(_currentStep)
          { 
            if(_phase === 'Running' || _phase === 'Failed' || _phase === 'Error')
            {
              const isNextStep = props.logData.logs.find(x => x.step === step + 1);
              if(isNextStep && isNextStep.log)
              {
                  statusIndicator = 'Succeeded';
              }
              else
                  statusIndicator = props.currentWorkFlowIsStale ? 'Failed' : _phase
            }
            else
                statusIndicator = _phase
          }
        }
    }
    return statusIndicator;
  }

  const getStepStatus = () => {
      return <StepStatusIndicatorPopUp status={ getStatus() }/>;
  }

  const getStepElapsedTime = () => {
    let time = '';
    const step = props.currentWorkflowLogStep && props.currentWorkflowLogStep.step;
    if (props.logData) {
      
      if (props.logData.logs && props.logData.logs.length > 0) {
        if (props.source === '2') {
          const _status = getStatus();
          const endLineTime = props.logData.logs[props.logData.logs.length - 1].log.split(' ')[0].trim();
          let finishTime = _status === AppConstants.WorkflowStatus.Running ? new Date().toUTCString() : endLineTime;
          time = getDiffBetweenDates(props.logData.logs[0].log.split(' ')[0].trim(), finishTime);
        }
        else {
          const _currentStep = props.logData.logs.filter(x => x.step === step);
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
      }
    }
    return time;
  }

  const getLogPopupHeader = () => {
    if(props.source === '2'){
      return (props.logData && props.logData.type) + ' log'
    }
    else{
      return (props.currentWorkflowLogStep && props.currentWorkflowLogStep.type) + ' log' 
    }
  }

  return (
      <div data-test="main-container">
          
          <span style={{ display: "none" }}> {dummydate} { timer }</span>
          <Dialog
            aria-labelledby="customized-dialog-title"
            open={ props.openLogPopup }
            maxWidth="lg"
            className="modalZindex"
          >
              <DialogTitle
                id="customized-dialog-title"
                onClose={ () => props.handleCloseLogPopup() }
              >
                  <Grid>
                      <Grid container spacing={ 2 }>
                          <Grid item>{getStepStatus()}</Grid>
                          <Grid item data-test="build-header">
                              {getLogPopupHeader()}
                          </Grid>
                          <Grid item data-test="build-timer"> - { getStepElapsedTime() }</Grid>
                      </Grid>
                  </Grid>
              </DialogTitle>
              <DialogContent>
                  <Typography gutterBottom className="logstxt">
                      <div className="logs-container">
                          {props.logData &&
                props.logData.logs &&
                  props.logData.logs.length > 0 &&
                      [ ...props.logData.logs ].reverse().map((log, ind) => {
                        return (
                            <div key={ ind } data-test="log-div">
                                {
                              (props.source === '2' || (props.currentWorkflowLogStep && log.step === props.currentWorkflowLogStep.step)) && 
                              <div className="inner">
                                  <span className="cicdPre">
                                      <Ansi>
                                          { log.log.trim() }
                                      </Ansi>
                                  </span>
                              </div>
                            }
                            </div>
                        );
                      })
                }
                      </div>
                  </Typography>
                  
              </DialogContent>
          </Dialog>
      </div>
  );
}
