import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid,ButtonBase, Typography, Link} from '@material-ui/core';
import { getDateInStandardFormat } from '../../helpers/utils';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      
      marginTop: theme.spacing(2)
    },
    styleGrid: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    labelStyle: {
      color: 'black',
      fontWeight: 'bolder',
      textAlign: 'start',
      marginBottom: theme.spacing(2)
    },
    customButtonStyle: {
      marginTop: theme.spacing(2),
      height: 40,
      width: '6rem',
      minWidth: '200px',
      maxWidth: '100%',
    },
    styleParagraph: {
      
      fontSize: '16px',
      color: 'black',
      fontWeight: 'bolder'
    },
    styleGridText: {
      color: '#0057fa',
      fontWeight: 'bolder'
    },
    styleGridValue: {
      color: 'gray',
      fontWeight: 'bolder'
    },
    headerText: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    divStyling: {
      
  },
  styledGrid: {
    fontSize: '16px',
    color: 'black',
    fontWeight: 'bolder',
    backgroundColor: 'gray',
    margin: '0',
    padding: '0'
  },
    paperUser: {
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(2)
    },
    style1: {
      fontSize: '16px',
      color: 'black',
      fontWeight: 'bolder',
      backgroundColor: '#f4f4f4',
      padding: '2%'
    },
    agentGrid: {
      padding: '2%'
    },
    fileStyle:{
      padding: '2%'
    },
    spanStyle: {
      color: '#0057fa'
    }
  }));

export const TicketDetailCard = (props) => {
    const classes = useStyles();

    const getStatus = (status) => {
        switch (status) {
          case "Open":
            return "activestatus";
          case "Closed":
            return "inactivestatus";
          default:
            return "";
        }
    };

    return (
        <Paper className={classes.paper} data-test="ticket-details-container-test">
                   
                          <Grid spacing={1} container >
                            <Grid className={classes.styleParagraph} item xs={12} sm={12} md={12} data-test="ticket-details-test">
                              <p> Ticket Details </p>
                            </Grid>
                          </Grid>

                          <Grid spacing={1} container >
                            <Grid className={classes.styleGridText} item xs={12} sm={5} md={5} data-test="issue-date-text">
                              Issued Date
                            </Grid>
                            <Grid className={classes.styleGridValue} item  xs={12} sm={7} md={7} data-test="issue-date-value">
                            {getDateInStandardFormat(props.ticketDetails?.data?.ticketDetails?.date * 1000,true)}
                            </Grid>
                          </Grid>
                            
                          <Grid spacing={1} container >
                              <Grid className={classes.styleGridText} item xs={12} sm={5} md={5} data-test="last-response-text">
                                Last Updated
                              </Grid>
                              <Grid className={classes.styleGridValue} item xs={12} sm={7} md={7} data-test="last-response-value">
                              {props.ticketDetails?.data?.conversation?.length > 0
                                ? getDateInStandardFormat(
                                    props.ticketDetails?.data?.conversation[
                                      props.ticketDetails?.data?.conversation?.length - 1
                                    ]?.date * 1000, true
                                  )
                                : "N/A"}
                              </Grid>
                          </Grid>

                            <Grid spacing={1} container >
                                <Grid className={classes.styleGridText} item xs={12} sm={5} md={5} data-test="priority-text">
                                  Priority
                                </Grid>
                                <Grid className={classes.styleGridValue} item xs={12} sm={7} md={7} data-test="priority-value">
                                {props.ticketDetails?.data?.ticketDetails?.priority}
                                </Grid>
                            </Grid>

                            <Grid spacing={1} container >
                                <Grid className={classes.styleGridText} item xs={12} sm={5} md={5} data-test="category-text">
                                  Category
                                </Grid>
                                <Grid className={classes.styleGridValue} item xs={12} sm={7} md={7} data-test="category-value">
                                {props.ticketDetails?.data?.ticketDetails?.category}
                                </Grid>
                            </Grid>
                            
                            <Grid spacing={1} container >
                                <Grid className={classes.styleGridText} item xs={12} sm={5} md={5} data-test="status-text">
                                  Status
                                </Grid>
                                <Grid className={classes.styleGridValue} item xs={12} sm={7} md={7} data-test="status-value">
                                  <span  className={getStatus(
                                      props.ticketDetails?.data?.ticketDetails?.status
                                    )}
                                  >
                                  </span> {props.ticketDetails?.data?.ticketDetails?.status}
                                </Grid>
                            </Grid>

                            {props.ticketDetails?.data?.ticketDetails?.project && (
              <Grid spacing={1} container>
                <Grid
                  className={classes.styleGridText}
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  data-test="project-text"
                >
                  Project
                </Grid>
                <Grid
                  className={classes.styleGridValue}
                  item
                  xs={12}
                  sm={7}
                  md={7}
                >
                  <ButtonBase
                  onClick = {() => {props.history.push(`/project/${props.ticketDetails?.data?.ticketDetails?.project?.id}`) }}
                  >
                    <Typography color="primary" variant="h5" data-test="project-value">
                      {props.ticketDetails?.data?.ticketDetails?.project?.name}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </Grid>
            )}
            {props.ticketDetails?.data?.ticketDetails?.application && (
              <Grid spacing={1} container>
                <Grid
                  className={classes.styleGridText}
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  data-test="application-text"
                >
                  Application
                </Grid>
                <Grid
                  className={classes.styleGridValue}
                  item
                  xs={12}
                  sm={7}
                  md={7}
                >
                  <ButtonBase
                  onClick = {() => {props.history.push(`/project/${props.ticketDetails?.data?.ticketDetails?.project?.id}`) }}
                  >
                    <Typography color="primary" variant="h5" data-test="application-value">    
                      {props.ticketDetails?.data?.ticketDetails?.application?.name}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </Grid>
            )}

            {props.ticketDetails?.data?.ticketDetails?.environment && (
              <Grid spacing={1} container>
                <Grid
                  className={classes.styleGridText}
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  data-test="environment-text"
                >
                  Environment
                </Grid>
                <Grid
                  className={classes.styleGridValue}
                  item
                  xs={12}
                  sm={7}
                  md={7}
                >
                  <Link
                    href={`${window?.config?.REACT_APP_01CLOUD_CONSOLE_URL}/environment/${props.ticketDetails?.data?.ticketDetails?.environment?.id}`}
                    target="_blank"
                  >
                    <Typography color="primary" variant="h5" data-test="environment-value">
                      {props.ticketDetails?.data?.ticketDetails?.environment?.name}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            )}

            {props.ticketDetails?.data?.ticketDetails?.organization && (
              <Grid spacing={1} container>
                <Grid
                  className={classes.styleGridText}
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  data-test="organization-text"
                >
                  Organization
                </Grid>
                <Grid
                  className={classes.styleGridValue}
                  item
                  xs={12}
                  sm={7}
                  md={7}
                >
                  <ButtonBase >
                    <Typography color="primary" variant="h5" data-test="organization-value">
                      {props.ticketDetails?.data?.ticketDetails?.organization?.name}
                    </Typography>
                  </ButtonBase>
                </Grid>
              </Grid>
            )}

        </Paper>
    )
}

export default withRouter(TicketDetailCard);