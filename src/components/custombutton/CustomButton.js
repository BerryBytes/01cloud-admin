import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  primaryButton: {
    background:'#0057fa',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 38,
    minWidth : '180px',
    maxWidth: '100%',
    '&:hover': {
      background: '#0057fa',
      opacity:0.9
    }
  },
  dangerButton: {
    background:'#ff6565',
    border: 0,
    minWidth : '180px',
    maxWidth: '100%',
    borderRadius: 3,
    color: 'white',
    height: 38,
    width : '6rem',
    '&:hover': {
      background: "#ff6565",
      opacity:0.9
    }
  },
});

export function CustomButton({ label, type = 'primary', customClass = "", ...rest }) {
  const classes = useStyles();
  return <Button data-test="main-container" className={`${customClass ? customClass : ""} ${type === 'danger' ? classes.dangerButton : classes.primaryButton}`} {...rest}>{label}</Button>;
}

export default CustomButton