import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import DashboardDetails from "../dashboard/DashboardDetails";

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
    backgroundColor: theme.palette.success.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  curMonth:{
    marginTop:"10px",
    color: theme.palette.warning.light
  }
}));

const TotalEnvironmentsCard = (props) => {
  const { data, className, ...rest } = props;

  const classes = useStyles();

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
            ENVIRONMENTS
            </Typography>
            <Grid container spacing={1}>
              <Grid><Typography variant="h2">{data && data.current_month}</Typography></Grid>
              <Grid item><Typography variant="h5" className={classes.curMonth}>new</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <EcoIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <DashboardDetails data={data}/>
      </CardContent>
    </Card>
  );
};

TotalEnvironmentsCard.propTypes = {
  className: PropTypes.string,
};

export default TotalEnvironmentsCard;
