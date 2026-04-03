import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  
  Divider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  chartContainer: {
    position: "relative",
    height: "300px",
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  device: {
    textAlign: "center",
    padding: theme.spacing(1),
  },
  deviceIcon: {
    color: theme.palette.icon,
  },
}));

const TotalSubscriptionChart = (props) => {
  const [subData, setSubData] = useState({});
  const [subscription, setSubscription] = useState([]);
  const { className, ...rest } = props;
  const classes = useStyles();
  const theme = useTheme();

  const calculateData = (_subData) => {
    const total = _subData.reduce((acc, sub) => {
      return acc + sub.count;
    }, 0);
    const subPercentage = _subData.map((sub) => {
      return Math.round((sub.count / total) * 100, 2);
    });
    return subPercentage;
  };

  const findLabels = (_subData) => {
    const labels = _subData.map((sub) => {
      return sub.name;
    });
    return labels;
  };

  useEffect(() => {
    if (props.data) {
      setSubData({
        ...subData,
        data: calculateData(props.data),
        labels: findLabels(props.data),
      });
    }
  }, [props.data]);

  const data = {
    datasets: [
      {
        data: subData.data,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main,
          theme.palette.secondary.main,
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white,
      },
    ],
    labels: subData.labels,
  };

  const options = {
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: "index",
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
    },
  };

  const getSubscription = (_subData) => {
    const subscriptionArr = [];
    if (_subData.labels && _subData.data) {
      for (let i = 0; i < _subData.labels.length; i++) {
        subscriptionArr.push({
          title: _subData.labels[i],
          value: _subData.data[i],
        });
      }
    }
    return subscriptionArr;
  };

  useEffect(() => {
    setSubscription(getSubscription(subData));
  }, [subData]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Subscription Percentage" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={options} />
        </div>
        <div className={classes.stats}>
          {subscription.map((device) => (
            <div className={classes.device} key={device.title}>
              <span className={classes.deviceIcon}>{device.icon}</span>
              <Typography variant="body1">{device.title}</Typography>
              <Typography style={{ color: device.color }} variant="h2">
                {device.value}%
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

TotalSubscriptionChart.propTypes = {
  className: PropTypes.string,
};

export default TotalSubscriptionChart;
