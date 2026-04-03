import React from 'react';
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/styles";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    difference: {
      marginTop: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      color:"#B7B9CB"
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
      fontSize:"15px"
    },
    differenceValueFall: {
      color: theme.palette.error.dark,
      marginRight: theme.spacing(1),
      fontSize:"15px"
    },
    equalValue: {
        color: theme.palette.info.light,
        marginRight: theme.spacing(1),
        fontSize:"15px"
      },
      caption:{
        fontSize:"15px"
      }
  }));

function DashboardDetails(props) {
    const {data} = props;
    const classes = useStyles();

  return (
    <>
        <div className={classes.difference}>
          {
            (data && data.current_month === data.last_month) ? (
                <ArrowForwardIcon className={classes.equalValue}/>
            ): (data && data.current_month > data.last_month)?(
                <ArrowUpwardIcon className={classes.differenceIconGrowth} />
            ): (
                <ArrowDownwardIcon className={classes.differenceIconFall} />
            )
          }
          <Typography
            className={
            (data && data.current_month === data.last_month)
                ? classes.equalValue
            : (data && data.current_month > data.last_month)
                ? classes.differenceValueGrowth
                : classes.differenceValueFall
            }
            variant="body2"
          >
            {Math.abs(data && data.current_month - data.last_month)}
          </Typography>
          <Typography className={classes.caption} variant="caption">
          vs previous month
          </Typography>
        </div>
        <div className={classes.difference}>
          <Typography variant="h5">
            TOTAL: {data && data.total}
          </Typography>
        </div>
    </>
  )
}

export default DashboardDetails