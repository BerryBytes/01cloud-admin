import React from "react";
import { LineChart } from "react-chartkick";
import "chart.js";

const LineChartComponent = ({
  data,
  lineColor = "blue",
  xtitle = "",
  ytitle = "",
  suffix = "",
}) => {
  return (
    <LineChart
      data={data}
      responsive={true}
      colors={[lineColor]}
      curve={true}
      legend={false}
      dataset={{ paddingLeft: 1000 }}
      xtitle={xtitle}
      ytitle={ytitle}
      suffix={suffix}
      library={{
        color: "red",
        scales: {
          xAxes: [
            {
              type: "time",
              parser: "string",
              time: {
                unit: "hour",
                displayFormats: {
                  hour: "MMM D - h:mm a",
                  
                },
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                precision: 2,
              },
            },
          ],
        },
      }}
    />
  );
};

export default LineChartComponent