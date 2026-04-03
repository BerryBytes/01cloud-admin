import React from "react";
import { LineChart as LineC } from "react-chartkick";

import {
  Card,
  CardHeader,
  CardContent,
  Divider
} from "@material-ui/core";
import { formatDate } from "../../helpers/utils";

const LineChart = ({data}) => {
  
  const revenue_data = {};
  if(data){
    data.forEach((rev) =>{
      const month = `${rev.month}` 
      const date = formatDate(month)
      const pay = parseFloat(`${rev.payable}`)
      revenue_data[date]=pay
    })
  }
  
  return (
    <div>
      
      <Card>
        <CardHeader
          title="Transaction Graph"
          
        />

        <Divider />
        <CardContent>
          <div>
            <LineC
              xtitle="Dates"
              legend={true}
              ytitle="Transaction"
              data={revenue_data}
              prefix="$"
              thousands=","
              
              round={2}
              zeros={true}
              messages={{ empty: "No data" }}
              dataset={{ label: "Transaction Per Month", borderCapStyle: "butt" }}
              download={true}
            />
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default LineChart;
