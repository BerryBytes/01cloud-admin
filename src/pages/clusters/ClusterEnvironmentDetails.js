import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { TableContainer, Paper,Table, TableBody, TableHead, Typography, ButtonBase} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";
import { connect } from 'react-redux';
import { getClusterEnvDetails, clearClusterEnvDetails } from './redux/actions';
import BackdropLoader from '../../components/loader/BackdropLoader';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardHeader: {
    padding: "0 !important",
  },
}));

export function ClusterEnvironmentDetails(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [t] = useTranslation();
  let history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    setIsExpanded(true)
  };

  useEffect(() => {
    if(isExpanded){
      props.getClusterEnvDetails(props.clusterId) 
    }
    return () => {
      props.clearClusterEnvDetails()
    }   
  },[isExpanded])

  const goToEnv = (id) => {
    history.push(`/environment/${id}`)
  }

  return (
    <>
      <Card className="m-t-20" data-test="main-container">
        <CardHeader
          className={classes.cardHeader}
          avatar={
              <IconButton
                  className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
              >
                  <ExpandMoreIcon />
              </IconButton>
          }
          title={
            <Typography varaint="h5" display="inline">
              <strong> {t('Cluster.ClusterEnvironmentDetails.header')} </strong>{" "}
              
            </Typography>
          }
        />
    
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table" data-test="table-data">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="left"> {t('Cluster.ClusterEnvironmentDetails.environment')} </StyledTableCell>
                          <StyledTableCell align="left"> {t('Cluster.ClusterEnvironmentDetails.app')} </StyledTableCell>
                          <StyledTableCell align="left"> {t('Cluster.ClusterEnvironmentDetails.project')} </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      { props?.clusterEnvData?.length > 0 && props?.clusterEnvData?.map((env,idx) => (
                          <TableBody key={idx}>
                                <StyledTableRow>
                                  <StyledTableCell>
                                    <ButtonBase
                                      onClick={() =>
                                        goToEnv(env?.id)
                                      }
                                    >
                                      <Typography color="primary" variant="h5">
                                        {env?.name}
                                      </Typography>
                                    </ButtonBase>
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                      {env?.application?.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                      {env?.application?.project?.name}
                                  </StyledTableCell>
                                </StyledTableRow>
                          </TableBody>
                        ))
                      }
                    </Table>
                    {(!props.clusterEnvData ||  props?.clusterEnvData?.length <= 0 ) && (
                        <div className="alignCenter" data-test="no-env">
                          <p>{t('Cluster.ClusterEnvironmentDetails.noEnv')}</p>
                        </div>
                    )}
              </TableContainer>
          </CardContent>
        </Collapse>
      </Card>
      {props.fetchingClusterEnvDetails && <BackdropLoader message={t('Cluster.ClusterEnvironmentDetails.fetching')} />}
    </>
  );
}

const mapStateToProps = state => {
    return {
      clusterEnvData:  state.ClusterReducer.clusterEnvDetails,
      fetchingClusterEnvDetails: state.ClusterReducer.fetchingClusterEnvDetails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getClusterEnvDetails: (id) => dispatch(getClusterEnvDetails(id)),
        clearClusterEnvDetails: () => dispatch(clearClusterEnvDetails())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ClusterEnvironmentDetails);