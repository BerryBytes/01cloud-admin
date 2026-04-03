import React from "react";
import { Grid, Typography } from "@material-ui/core";
import CopyIcon from "../copyicon/CopyIcon";

export function KeyValueRow(props) {
  const keyXs = parseInt(props.keyXs) <= 12 ? parseInt(props.keyXs) : 4;
  const keyMd = parseInt(props.keyMd) <= 12 ? parseInt(props.keyMd) : 4;
  return (
    <Grid
      data-test="mainContainer"
      container
      spacing={2}
      className={props.className}
    >
      <Grid item xs={keyXs} md={keyMd} data-test="keyContainer">
        <Typography
          color="primary"
          variant={props.variant ?? "h6"}
          className="oneLine"
          data-test="rowKey"
        >
          {props.rowKey}
        </Typography>
      </Grid>
      <Grid
        item
        md={props.copy ? 10 - keyMd : 12 - keyMd}
        xs={props.copy ? 10 - keyXs : 12 - keyXs}
        data-test="valueContainer"
      >
        <span className="oneLine" data-test="rowValue">
          {props.rowValue}
        </span>
      </Grid>
      {props.copy && (
        <Grid item xs={2} md={2} className="txt-right">
          <CopyIcon copyText={props.rowValue} />
        </Grid>
      )}
    </Grid>
  );
}

export default KeyValueRow;
