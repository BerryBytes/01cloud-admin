import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TextField,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

const useStyles = makeStyles(() => ({
  textBox: {
    margin: "10px 0px 10px 0px",
  },
  resize: {
    fontSize: "1rem",
    textAlign: "center",
  },
  
}));

export function MuiNumberCounter(props) {
  const classes = useStyles();
  const [value, setValue] = useState(
    props.initialValue ? props.initialValue : props.defaultValue
  );

  useEffect(() => {
    if (props.defaultValue) {
      props.updateValueChange(
        value,
        props.additionalData1,
        props.additionalData2
      );
    }
    return () => {
      setValue("");
    };
  }, []);

  useEffect(() => {
    if (props.updateIncomingValue) {
      setValue(props.initialValue);
    }
  }, [props.initialValue]);

  const updateValue = (_value) => {
    setValue(_value);
    props.updateValueChange(
      _value,
      props.additionalData1,
      props.additionalData2
    );
  };

  const onChange = (e) => {
    updateValue(parseInt(e.target.value));
  };

  const onClick = (e, mode) => {
    if (mode === 1) {
      if (value > props.defaultValue) updateValue(value - 1);
    } else {
      if (props.maxValue) {
        if (props.maxValue >= value + 1) {
          updateValue(value + 1);
          return;
        }
      } else {
        updateValue(value + 1);
      }
    }
    
  };

  return (
    <TextField
      label={props.label}
      name={props.label}
      data-test="text-field-container"
      type="number"
      onChange={onChange}
      error={props.isError}
      helperText={props.helperText}
      
      fullWidth={props.isFullWidth}
      value={value}
      variant="outlined"
      className={`${classes.textField} ${props.customClassName}`}
      margin={props.margin}
      color="primary"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              
              onClick={(e) => onClick(e, 1)}
              
            >
              <RemoveOutlinedIcon color="primary" />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {props.unit ? props.unit : ""}
            <IconButton
              
              onClick={(e) => onClick(e, 2)}
              
            >
              <AddOutlinedIcon color="primary" />
            </IconButton>
          </InputAdornment>
        ),
        classes: {
          input: classes.resize,
        },
      }}
    />
  );
}

export default MuiNumberCounter