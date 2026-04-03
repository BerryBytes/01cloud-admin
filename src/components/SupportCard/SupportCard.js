import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";

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
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIconGrowth: {
    color: theme.palette.success.dark,
  },
  differenceIconFall: {
    color: theme.palette.error.dark,
  },
  differenceValueGrowth: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1),
  },
  differenceValueFall: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

const SupportCard = (props) => {
  const { className, title, count } = props;

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
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
            <Typography variant="h3">{count}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

SupportCard.propTypes = {
  className: PropTypes.string,
};

export default SupportCard;
