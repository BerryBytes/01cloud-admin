import React from "react";

import Chart from "react-apexcharts";

import { makeStyles } from "@material-ui/styles";
import {
  
  Paper,
  Typography,
  
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  div: {
    fontFamily: "sans-serif",
    textAlign: "center",
    padding: "15px 0",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    padding: "15px 10px 15px",
    borderRadius: 2,
  },
  title: {
    fontWeight: 400,
    marginBottom: 10,
    fontSize: 17,
  },
  
}));

export const TimeSeriesGraph = (props) => {

  const classes = useStyles();

  const series = [];
  const timeStamps = Object.entries(props.data)[0][1].values.map((a) =>
    new Date(a[0] * 1000).toISOString()
  );
  
  for(let e in props.data) {
    let _valueArray = props.data[e].values.map((a) => {
      let _val = a[1];
      _val = (e === "cpu_usages") ? _val / (10 ** 9) : _val / (1024 ** 3);
      
      return _val;
    });
    series.push({name: props.data[e].label, data: _valueArray})
  }

  const data = {
    series: series,
    options: {
      chart: {
        type: "area",
      },
      colors: [props.color ?? "#1A73E8"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        categories: timeStamps,
        labels: {
          datetimeUTC: false,
          rotate: -45,
          format: "hh:mm:ss",
        },
      },
      yaxis: {
        title: {
          text: props.yLabel,
        },
        labels: {
          formatter: (val) => parseInt(val),
        },
        
        max: props.total,
        min: 0
      },
      tooltip: {
        x: {
          format: "dd/MM/yy hh:mm TT",
        },
        y: {
          formatter: (val, { seriesIndex }) => {
            if (typeof val === "undefined") return "";
            
            let _unit = Object.entries(props.data)[seriesIndex][1].unit;
            
            return `${val.toFixed(2)} ${_unit}`;
          }
        },
      },
      legend: {
        showForSingleSeries: true,
        fontSize: "14px",
        height: 40,
        position: "top",
        horizontalAlign: "left",
      },
      markers: {
        size: 2,
      },
    },
  };

  return (
    <div className={classes.div}>
      <Paper elevation={2} className={classes.paper}>
        <Typography variant="h5" className={classes.title}>
          {props.title}
        </Typography>
        
        <Chart
          options={data.options}
          series={data.series}
          height={300}
          width="100%"
          type="area"
        />
      </Paper>
    </div>
  );
};
