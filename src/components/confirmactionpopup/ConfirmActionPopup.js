import React from 'react';
import { Dialog,
    DialogActions,
    DialogContent,
    Typography,
    Slide,
    Button, }
from '@material-ui/core';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

export const Popup = (props) => {
  return (
      <Dialog
        open={ props.open }
        TransitionComponent={ transition }
        keepMounted
        onClose={ props.handleDisAgree }
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        data-test="main-container"
      >
          <DialogContent>
            <Typography variant='subtitle1' data-test="popup-msg">{props.message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" data-test="no-text" onClick={ props.handleDisAgree }>
                {props.noText}
            </Button>
            <Button onClick={ props.handleAgree } data-test="yes-text" color="primary">
                {props.yesText}
            </Button>
          </DialogActions>
      </Dialog>
  );
}

export default Popup;