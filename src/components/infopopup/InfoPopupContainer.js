import React from "react";
import { Grid, Typography } from "@material-ui/core";
import InfoPopup from "./InfoPopup";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  fixedHeight: {
    height: "20px !important",
  },
}));

export function InfoPopupContainer(props) {
  const classes = useStyles();
  return (
    <Grid container style={{ height: "20px !important" }} data-test="main-container">
      <Grid item classes={{ item: classes.fixedHeight }}>
        <Typography variant="h5" data-test="label"> {props.label} </Typography>
      </Grid>
      <Grid item classes={{ item: classes.fixedHeight }}>
        <InfoPopup {...props} data-test="info-popup"/>
      </Grid>
    </Grid>
  );
}

export default InfoPopupContainer;