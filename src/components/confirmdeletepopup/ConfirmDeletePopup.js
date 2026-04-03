import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Slide,
  Button,
  Grid,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiTextField from "../textfield/MuiTextField";
import Loader from "../loader/Loader";

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Popup = (props) => {
  const userInputText = useRef();
  const [userInput, setUserInput] = useState({
    text: "",
    isFieldError: false,
    fieldErrorMessage: "",
  });
  const [initialLoad, setInitialLoad] = useState(true);

  const handleUserInputChange = (e) => {
    setInitialLoad(false);
    if (e.target.value !== props.toMatchName) {
      const toSet = {
        text: e.target.value,
        isFieldError: true,
        fieldErrorMessage: `Please enter the name of the ${props.toDeleteModule} you are deleting.`,
      };
      setUserInput({
        ...userInput,
        ...toSet,
      });
    } else {
      setUserInput({
        text: e.target.value,
        isFieldError: false,
        fieldErrorMessage: "",
      });
    }
  };

  useEffect(() => {
    if (userInputText && userInputText.current) {
      userInputText.current.focus();
    }
  });

  const handleAgree = () => {
    if (userInput.isFieldError) {
      setUserInput({
        ...userInput,
        fieldErrorMessage: `Please enter the name of the ${props.toDeleteModule} you are deleting.`,
      });
    } else {
      setUserInput({
        ...userInput,
        text: "",
        fieldErrorMessage: "",
        isFieldError: false,
      });
      props.handleAgree();
    }
  };

  const preventCopy = (e) => {
    e.preventDefault();
  };

  const handleDisAgree = () => {
    setUserInput({
      ...userInput,
      text: "",
      fieldErrorMessage: "",
      isFieldError: false,
    });
    setInitialLoad(true);
    props.handleDisAgree();
  };

  return (
    <Dialog
      open={props.open}
      TransitionComponent={transition}
      keepMounted
      data-test="main-container"
      onClose={handleDisAgree}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      onKeyDown={(e) => {
        if (e.keyCode === 13 && !(userInput.isFieldError || initialLoad)) {
          handleAgree();
        }
      }}
      onEscapeKeyDown={handleDisAgree}
    >
      <DialogTitle>
        <Typography className="dialogtitle">
          <b>Are you sure ? </b>
        </Typography>

        <IconButton
          aria-label="close"
          size="small"
          className="right"
          onClick={handleDisAgree}
          data-test="close-btn"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ minWidth: 360 }} dividers>
        <Typography variant="subtitle1" data-test="delete-msg">
          {props.message ? (
            props.message
          ) : (
            <>
              The action you are taking <b> cannot be undone.</b> This will
              <b> permanently delete</b> your {props.toDeleteModule}
              <b> {props.toMatchName}</b>
            </>
          )}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          If you are sure, please type <b>{props.toMatchName} </b>.
        </Typography>
        <Grid>
          <Grid container spacing={1}>
            <Grid item md={12}>
              <MuiTextField
                inputProps={{ autoFocus: true }}
                value={userInput.text}
                inputRef={userInputText}
                variant="outlined"
                label={props.label || ""}
                style={{
                  marginRight: "1rem",
                  marginBottom: "1rem",
                  width: "100%",
                }}
                name="userInputText"
                error={userInput.isFieldError}
                helperText={userInput.fieldErrorMessage}
                
                onChange={handleUserInputChange}
                autoComplete="off"
                onCut={preventCopy}
                onCopy={preventCopy}
                onPaste={preventCopy}
                data-test="input-field"
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      {!props.loading ? (
        <DialogActions>
          <Button
            onClick={handleAgree}
            color="primary"
            variant="contained"
            disabled={userInput.isFieldError || initialLoad}
            type="submit"
            data-test="confirm-btn"
          >
            I understand, {props.action ? props.action : "delete"} this{" "}
            {props.toDeleteModule}
          </Button>
        </DialogActions>
      ) : (
        <div className="loader-center">
          <Loader data-test="loader"/>
        </div>
      )}
    </Dialog>
  );
};

export default Popup;
