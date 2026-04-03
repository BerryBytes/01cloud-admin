import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
} from "@material-ui/core";

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
  avatar: { height: 56, width: 56 },
  appsAvatar: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  memoryAvatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  coresAvatar: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  icon: {
    height: 32,
    width: 32,
  },
  progress: {
    marginTop: theme.spacing(3),
  },
  appProgress: {
    backgroundColor: theme.palette.success.main,
  },
  memoryProgress: {
    backgroundColor: theme.palette.primary.main,
  },
  coreProgress: {
    backgroundColor: theme.palette.warning.main,
  },
}));

const UsageCard = (props) => {
  const { colorClass, icon, data, title, className, ...rest } = props;
  const classes = useStyles();

  const getAvatarClass = (avatarClassName) => {
    switch (avatarClassName) {
      case "app":
        return classes.appsAvatar;
      case "core":
        return classes.coresAvatar;
      case "memory":
        return classes.memoryAvatar;
      default:
        return classes.avatar;
    }
  };
  const getProgressColor = (progressColorClassName) => {
    switch (progressColorClassName) {
      case "app":
        return classes.appProgress;
      case "core":
        return classes.coreProgress;
      case "memory":
        return classes.memoryProgress;
      default:
        return classes.memoryProgress;
    }
  };

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
              {title}
            </Typography>
            <Typography variant="h4">
              {data.used} / {data.total}{" "}
              {colorClass && colorClass === "app" ? "   Apps" : ""}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={getAvatarClass(colorClass)}>{icon}</Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          classes={{ barColorPrimary: getProgressColor(colorClass) }}
          color="primary"
          value={data.used_percentage}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

UsageCard.propTypes = {
  className: PropTypes.string,
};

export default UsageCard;
