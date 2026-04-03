import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  IconButton,
  Collapse,
  Divider,
  List,
  ListItemText,
  ListItem,
} from "@material-ui/core";
import clsx from "clsx";
import { connect } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CheckIcon from "@material-ui/icons/Check";
import { useTranslation } from "react-i18next";
import KeyValueRow from "../../components/keyvaluerow/KeyValueRow";

const useStyles = makeStyles((theme) => ({
  editIcon: {
    border: "3px dashed",
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
}));

export const NodeGroup = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [activeNGIndex, setActiveNGIndex] = useState(0);
  const [t] = useTranslation();
  const classes = useStyles();

  const { clusterDetails } = props;

  const handleNGSelection = (ind) => {
    setActiveNGIndex(ind);
  };

  return (
    <>
      <Card className="m-t-20">
        <CardHeader
          className={classes.cardHeader}
          title={
            <Typography varaint="h5" display="inline">
              <strong> Node Group </strong>{" "}
              
                <IconButton disabled  style={{opacity: clusterDetails?.node_group_detail?.length > 0 ? "1" : "0" }}>
                  <CheckCircleSharpIcon
                    fontSize="12"
                    style={{ color: "green" }}
                  />
                </IconButton>
              
            </Typography>
          }
          avatar={
            <IconButton
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
          <br />
          <Grid container spacing={2}>
            <Grid item md={3} data-test="node-group-select">
              <List component="nav">
                {clusterDetails?.node_group_detail?.map((node, index) => (
                  <ListItem
                    button
                    selected={activeNGIndex === index ? true : false}
                    onClick={() => handleNGSelection(index)}
                    key={index}
                    data-test="node-group-list"
                  >
                    <ListItemText primary={node.node_group_name} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            {clusterDetails?.node_group_detail?.map((node, index) => {
              return activeNGIndex === index ? (
                <Grid key={index} item md={9} data-test="node-info">
                  <Card>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item md={6}>
                          <KeyValueRow data-test="node-name" keyXs={6} rowKey={t("Cluster.ClusterInfo.nodeGroupName")} rowValue={node.node_group_name} />
                          <KeyValueRow data-test="node-ins-type" keyXs={6} rowKey={t("Cluster.ClusterInfo.instanceType")} rowValue={node.instance_type} />
                          {node.disk_type && (
                            <KeyValueRow data-test="node-d-type" keyXs={6} rowKey={t("Cluster.ClusterInfo.diskType")} rowValue={node.disk_type} />
                          )}
                          <KeyValueRow data-test="node-d-size" keyXs={6} rowKey={t("Cluster.ClusterInfo.diskSize")} rowValue={`${node.disk_size} GB`} />
                          <KeyValueRow 
                            data-test="node-preem" 
                            keyXs={6} 
                            rowKey={t("Cluster.ClusterInfo.costOptimization")} 
                            rowValue={
                              node.preemptible ? (
                                <CheckIcon className="sucessIcon" />
                              ) : (
                                <ClearOutlinedIcon color="error" />
                              )}
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Grid container spacing={1}>
                            <KeyValueRow data-test="node-min" keyXs={6} rowKey={t("Cluster.ClusterInfo.minimumNodeCount")} rowValue={node.min_node_count} />
                            <KeyValueRow data-test="node-max" keyXs={6} rowKey={t("Cluster.ClusterInfo.maximumNodeCount")} rowValue={node.max_node_count} />
                            <KeyValueRow data-test="node-init" keyXs={6} rowKey={t("Cluster.ClusterInfo.initialNodeCount")} rowValue={node.initial_node_count} />
                          </Grid>
                        </Grid>
                      </Grid>
                      {node.node_group_labels &&
                        node.node_group_labels.length > 0 && (
                          <>
                            <Grid container spacing={2} className="m-t-20">
                              <Grid item md={12}>
                                <Typography
                                  variant="h5"
                                  data-test="node-label-header"
                                >
                                  {t("Cluster.ClusterImportPopup.labels")}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                              <Grid item md={6}>
                                <Grid container spacing={1}>
                                  {node.node_group_labels.map((label, ind) => (
                                    <div key={ind}>
                                      <KeyValueRow data-test="node-label" keyXs={6} rowKey={label.key} rowValue={label.value} />
                                    </div>
                                  ))}
                                </Grid>
                              </Grid>
                            </Grid>
                          </>
                        )}
                    </CardContent>
                  </Card>
                </Grid>
              ) : (
                <></>
              );
            })}
          </Grid>
        </Collapse>
      </Card>
    </>
  );
};

const mapStateToProps = () => ({});

const mapDispatchtoProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchtoProps)(NodeGroup);
