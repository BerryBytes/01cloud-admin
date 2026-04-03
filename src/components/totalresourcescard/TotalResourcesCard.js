import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MemoryIcon from "@material-ui/icons/Memory";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    fontSize:"15px"
  },
  equalValue: {
    color: theme.palette.info.light,
    marginRight: theme.spacing(1),
    fontSize:"15px"
  },
  curMonth:{
    marginTop:"10px",
    color: theme.palette.warning.light
  },
  caption:{
    fontSize:"15px"
  }
}));

const TotalResourcesCard = (props) => {
  const { data, className, ...rest } = props;

  const classes = useStyles();

  const resourceDetails = (count, msg) => {
    return (
      <>
        { <ArrowForwardIcon className={classes.equalValue}/> }
        <Typography className={classes.equalValue} variant="body2">{count}</Typography>
        <Typography className={classes.caption} variant="caption">{msg}</Typography>
      </>
    )
  }

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
            RESOURCES
            </Typography>
            <Grid container spacing={1}>
              <Grid item><Typography variant="h2">{data && data.total} 3</Typography></Grid>
              <Grid item><Typography variant="h5" className={classes.curMonth}>new</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <MemoryIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>{resourceDetails(data && data.memory, "memory")}</div>
        <div className={classes.difference}>{resourceDetails(data && data.core, "core")}</div>
      </CardContent>
    </Card>
  );
};

TotalResourcesCard.propTypes = {
  className: PropTypes.string,
};

export default TotalResourcesCard;
