import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import HelpIcon from '@material-ui/icons/Help';
import { toast } from 'react-toastify';

export const Message = ({ msg, icon }) => (
    <>
        <Grid container direction="row" data-test="main-container">
            <Grid item data-test="icon">{icon}</Grid>
      &nbsp;&nbsp;&nbsp;
            <Grid item>
                <Typography variant="subtitle1" style={ { color : 'white' } } data-test="message">{msg}</Typography>
            </Grid>
        </Grid>
    </>
);

const ToastConfig = {
  default(msg) { 
    return toast(<Message msg={ msg } />)
  },
  success(msg) {
    return toast.success(<Message msg={ msg } icon={ <CheckIcon /> } />, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose:4000,
      className: 'rotateY animated'
    });
  },
  info(msg) {
    return toast.info(<Message msg={ msg } icon={ <InfoIcon /> } />);
  },
  warn(msg) {
    return toast.warn(<Message msg={ msg } icon={ <HelpIcon /> } />,{
      position: toast.POSITION.TOP_RIGHT,
      autoClose:4000,
      className: 'rotateY animated'
    });
  },
  error(msg) {
    return toast.error(<Message msg={ msg } icon={ <WarningIcon /> } />,{
      position: toast.POSITION.TOP_RIGHT,
      autoClose:4000,
      className: 'rotateY animated'
    });
  }
};

export default ToastConfig;
