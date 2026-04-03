import React from 'react';
import { Backdrop, Grid } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Loader from './Loader';
const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.appBar + 301,
      color: '#fff',
    },
  })
);
export function BackdropLoader(props) {
  const classes = useStyles();
  const message = props.message || 'Loading...'
  return (
      <div data-test="main-container">
          <Backdrop className={ classes.backdrop } open={ true } data-test="backdrop">
              <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                      <Loader data-test="loader" />
                  </Grid>
                  <Grid item data-test="message">{message}</Grid>
              </Grid>
          </Backdrop>
      </div>
  );
}

export default BackdropLoader;
