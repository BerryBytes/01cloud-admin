import {
  
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Typography,
  FormControl,
  MenuItem,
  Select,
  CircularProgress,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import { useTranslation } from "react-i18next";

import { getClusterInsights } from "./redux/actions";
import { TimeSeriesGraph } from "../../components/chartcard/TimeSeriesGraph";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    border: "2px dashed",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme?.transitions?.create("transform", {
      duration: theme?.transitions?.duration?.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardHeader: {
    padding: "0 !important",
  },
  storageEditIcon: {
    marginTop: "8px !important",
    marginRight: "8px !important",
  },
  grid: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "10px 0"
  },
  select: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  formControl: {
    flexDirection: "row",
    alignItems: "center"
  },
  loader: {
    marginRight: 10,
    animationDuration: '550ms',
  },
}));

export const ClusterMonitor = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [t] = useTranslation();
  const [insightsData, setInsightsData] = useState(null);
  const [range, setRange] = useState(60);
  
  const classes = useStyles();
  
  const makeApiCall = minutes => {
    let _id = props.clusterId;
    let _endTime = new Date().getTime();
    let _startTime = _endTime - (minutes * 60 * 1000);
    let _jsonBody = {
      start_time: parseInt(_startTime / 1000),
      end_time: parseInt(_endTime / 1000),
    };
    props.getClusterInsights(_id, _jsonBody);
  }
  
  useEffect(() => {
    makeApiCall(60);
  }, []);
  
  const handleChange = e => {
    setRange(e.target.value);
    makeApiCall(e.target.value);
  }

  useEffect(() => {
    if (!props.clusterInsights?.cpu_usages || !props.clusterInsights?.disk_usages || !props.clusterInsights?.memory_usages) return;
    let _i = props.clusterInsights;
    setInsightsData({
      cpu_usages: {
        total: parseInt(_i.total_cpu[0].values[0][1]),
        values: _i.cpu_usages[0].values,
        label: "CPU Usage",
        unit: "cores"
      },
      memory_usages: {
        total: parseInt(_i.total_memory[0].values[0][1] / (1024 ** 3)),
        values: _i.memory_usages[0].values,
        label: "Memory Usage",
        unit: "GB"
      },
      disk_usages: {
        total: parseInt(_i.total_disk[0].values[0][1] / (1024 ** 3)),
        values: _i.disk_usages[0].values,
        label: "Disk Usage",
        unit: "GB"
      },
    });
  }, [props.clusterInsights]);

  return (
    <>
      <Card className="m-t-20" data-test="card-container">
        <CardHeader
          data-test="card-header"
          className={classes.cardHeader}
          title={
            <Typography variant="h5" display="inline" data-test="card-title">
              <strong data-test="title-text">{t("Cluster.ClusterInfo.clusterMonitoring")}</strong>{" "}
              <IconButton data-test="checked-icon">
                {
                  (props?.clusterInsights?.cpu_usages && props?.clusterInsights?.disk_usages && props?.clusterInsights?.memory_usages) && (
                    <CheckCircleSharpIcon
                      fontSize="12"
                      style={{ color: "green" }}
                    />
                  )
                }
              </IconButton>
            </Typography>
          }
          subheader={
            <Typography display="block" className="m-b-5" variant="caption">
              {t("Cluster.ClusterInfo.clusterMonitoringHelper")}
            </Typography>
          }
          avatar={
            <IconButton
              data-test="icon-button"
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <Collapse in={expanded}>
          <Divider />
          <CardContent>
            <Grid className={classes.grid}>
              <FormControl variant="outlined" className={classes.formControl}>
                {
                  props.fetchingClusterInsights &&
                    <CircularProgress className={classes.loader} size={25} thickness={4} />
                }
                <Select
                  id="demo-simple-select-outlined"
                  value={range}
                  onChange={handleChange}
                  labelWidth={0}
                  classes={{root: classes.select}}
                  disabled={props.fetchingClusterInsights}
                >
                  <MenuItem value={5}>Last 5 minutes</MenuItem>
                  <MenuItem value={15}>Last 15 minutes</MenuItem>
                  <MenuItem value={30}>Last 30 minutes</MenuItem>
                  <MenuItem value={1 * 60}>Last 1 hour</MenuItem>
                  <MenuItem value={3 * 60}>Last 3 hours</MenuItem>
                  <MenuItem value={6 * 60}>Last 6 hours</MenuItem>
                  <MenuItem value={12 * 60}>Last 12 hours</MenuItem>
                  <MenuItem value={24 * 60}>Last 24 hours</MenuItem>
                  <MenuItem value={2 * 24 * 60}>Last 2 days</MenuItem>
                  <MenuItem value={7 * 24 * 60}>Last 7 days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                {
                  insightsData && 
                    <TimeSeriesGraph 
                      data={{memory_usages: insightsData.memory_usages}} 
                      title="Cluster Memory Usage" 
                      yLabel="GB"
                      total={insightsData.memory_usages.total}
                      
                    />
                }
              </Grid>
              <Grid item xs={12} md={6}>
                {
                  insightsData && 
                    <TimeSeriesGraph 
                      data={{disk_usages: insightsData.disk_usages}} 
                      title="Cluster Disk Usage" 
                      yLabel="GB"
                      color="#ff9429"
                      total={insightsData.disk_usages.total}
                      
                    />
                }
              </Grid>
              <Grid item xs={12}>
                {
                  insightsData && 
                    <TimeSeriesGraph 
                      data={{cpu_usages: insightsData.cpu_usages}} 
                      title="Cluster CPU Usage" 
                      yLabel="No. of cores"
                      color="#29ff66"
                      total={insightsData.cpu_usages.total}
                      
                    />
                }
              </Grid>
              
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

const mapStateToProps = (state) => ({
  clusterInsights: state.ClusterReducer.clusterInsights,
  fetchingClusterInsights: state.ClusterReducer.fetchingClusterInsights,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    getClusterInsights: (id, jsonBody) =>
      dispatch(getClusterInsights(id, jsonBody)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(ClusterMonitor);
