import React from "react";
import clsx from "clsx";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  
  CardHeader,
  CardContent,
  
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const TotalSubscriptionList = (props) => {
  const { data, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Subscriptions" />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data &&
                data.map((sub, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{sub.name}</TableCell>
                    <TableCell>${sub.price}</TableCell>
                    <TableCell>{sub.count}</TableCell>
                    <TableCell>${sub.revenue}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Divider />
      
    </Card>
  );
};

TotalSubscriptionList.propTypes = {
  className: PropTypes.string,
};

export default TotalSubscriptionList;
