import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    textBox: {
        margin: '10px 0px 10px 0px',
    },
    resize:{
        fontSize:'1rem'
    }
}));

export function MuiTextField({ value , id, label, type, onChange, onKeyDown, name, customClassName, ...rest }) {
    const classes = useStyles();
  return (
      <TextField id={ id }
        data-test="text-field-container" 
        label={ label } 
        name={ name } 
        type={ type }
        onChange={ onChange } 
        onKeyDown={ onKeyDown }
        value={ value } 
        variant='outlined' 
        fullWidth 
        className={ `${ customClassName }` }
        color="primary"
        InputProps={ {
            classes: {
              input: classes.resize,
            },
        } }
        { ...rest }
      />
  );
}

export default MuiTextField