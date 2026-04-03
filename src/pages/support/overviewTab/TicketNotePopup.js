import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Slide,
  Button,
  Grid,
  DialogTitle,
  
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MarkdownField from "../../../components/markdown/MarkdownField";

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const TicketNotePopup = (props) => {
  const { open } = props;
  const [note, setNote] = useState("");

  const handleAction = () => {
    props.action(note);
  };

  const closePopup = () => {
    setNote("");
    props.handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={transition}
        onClose={closePopup}
        keepMounted
      >
        <DialogTitle>
          <Typography className="dialogtitle" data-test="dialog-title">{props.label} Ticket</Typography>

          <IconButton
            data-test="close-button"
            aria-label="close"
            size="small"
            className="right"
            onClick={closePopup}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ minWidth: 360 }} dividers>
          <Grid>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <Typography variant="h5" data-test="dialog-content">Note</Typography>
              </Grid>
              <Grid item md={12}>
                <MarkdownField
                  data-test="markdown-field"
                  value={note}
                  onChange={setNote}
                  title={""}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            data-test="action-button"
            onClick={() => handleAction()}
            color="primary"
            variant="contained"
            disabled={Boolean(note.trim().length === 0)}
          >
            {props.label} Ticket
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TicketNotePopup;