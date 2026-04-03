import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Paper, Typography } from "@material-ui/core";
import Chart from "react-apexcharts";

const useStyles = makeStyles(() => ({
  div: {
    fontFamily: "sans-serif",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  info: {
    display: "flex",
  },
  div2: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 8,
  },
  paper: {
    padding: "10px 0px",
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontWeight: 400,
    marginBottom: 10,
    fontSize: 17,
  },
}));

export const UsageGaugeChart = (props) => {
  const classes = useStyles();

  const value = props.used / props.total;
  const series = [(value * 100).toFixed(2)]
  const options = {
    chart: {
      height: 350,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -145,
        endAngle: 145,
        hollow: {
          margin: 0,
          size: "55%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
        },
        track: {
          background: "#b3b3b3",
          strokeWidth: 100,
          margin: 5, 
          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 2,
            opacity: 0.24,
          },
        },

        dataLabels: {
          show: true,
          name: {
            
            show: true,
            color: "#888",
            fontSize: "15px",
          },
          value: {
            
            fontSize: "18px",
            color: undefined,
            formatter: function (val) {
              return val === "NaN" ? "N/A" : val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          {
            offset: 0,
            color: "#05eb46",
            opacity: 1,
          },
          {
            offset: 65,
            color: "#ffc400",
            opacity: 1,
          },
          {
            offset: 100,
            color: "#ff3300",
            opacity: 1,
          },
        ],
      },
    },
    stroke: {
      lineCap: "butt",
    },
    labels: ["Used"],
  };

  const colorArray = ["#32a72d", "#ff8100", "#e33434"];
  const textColor = () => {
    if (value <= 0.65) return colorArray[0];
    else if (value <= 0.90) return colorArray[1];
    else return colorArray[2];
  };

  return (
    <div className={classes.div}>
      <div className={classes.div2}>
        <Paper elevation={2} className={classes.paper}>
          <Typography variant="h5" className={classes.title}>
            {props.title}
          </Typography>
          <Chart
            options={options}
            series={series}
            type="radialBar"
            width="100%"
          />
        </Paper>
      </div>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={2}>
            <>
              <Typography variant="h5">Used</Typography>
              <br />
              <Typography
                variant="h4"
                style={{ color: textColor() }}
              >{`${props.used} ${props.unit}`}
              </Typography>
            </>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={2}>
            <>
              <Typography variant="h5">Total</Typography>
              <br />
              <Typography variant="h4">{`${props.total} ${props.unit}`}</Typography>
            </>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
