import React, { useEffect } from "react";
import { withRouter } from 'react-router';
import { 
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Tooltip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { getDateInStandardFormat } from '../../../helpers/utils';
import { connect } from 'react-redux';
import {
  getTicketList,
  getTicketDetails
} from "../redux/actions";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 650,
  },  
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
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
    height: '8vh',
    width: '12vw'
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
      padding: '2%'
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
    backgroundColor: 'gray',
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  titleStyle: {
    color: 'blue',
    '&:hover': {
      color: 'darkblue',
      cursor: 'pointer'
   }
  },
  idStyle: {
    background: "none!important",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    color: 'blue',
    padding: "3px 10px 3px 3px",
    '&:hover': {
      color: 'blue',
   }
  }
}));

export function OtherTicketTab(props) {
    const classes = useStyles();

  const getTicketListOfAUser = () => {
    props.getTicketList(
      1,
      20,
      "",
      "",
      "",
      "",
      props.ticketDetails?.data?.ticketDetails?.user?.id,
      ""
    );
  }

    useEffect(() => {
      props.getTicketDetails(props.match.params.ticketId);
      getTicketListOfAUser();
    },[])

    const goToOverview = (id) => {
      props.history.push(`/ticket/${id}`)
    };

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

      const getPriority = (p) => {
        let arrow;
        switch (p) {
          case "High":
            arrow = <ArrowUpwardIcon style={{ color: "red" }} />;
            break;
          case "Medium":
            arrow = <ArrowUpwardIcon color="primary" />;
            break;
          case "Low":
            arrow = <ArrowDownwardIcon style={{ color: "green" }} />;
            break;
          default:
            arrow = <ArrowUpwardIcon color="primary" />;
            break;
        }
        return (
          <>
            {" "}
            <span style={{ marginTop: 5 }}>{arrow} </span> {p}
          </>
        );
      };

    return (
      <div className={classes.root} data-test="otherTickets-container">
      <TableContainer component={Paper} data-test="tab-container">
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Priority</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Owner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      props.ticketList?.data?.map((ticket) => (
                      !ticket.assignee && ticket.id !== props.match.params.ticketId?
                      <TableRow key={ticket.id} onClick={()=>goToOverview(ticket.id)}>
                            <TableCell data-test="ticket-id-cell">     
                              <button className="buttonStyle" onClick={()=>goToOverview(ticket.id)}>
                                  #{ ticket.id }
                              </button> 
                            </TableCell>
                            <TableCell align="left" data-test="ticket-title-cell">
                              <Tooltip arrow title={ticket.title} classes={{ tooltip: classes.customWidth }}>
                                <button className={classes.idStyle} onClick={()=>goToOverview(ticket.id)}>
                                { ticket.title.length > 20 ? ticket.title.substring(0,20)+'...' : ticket.title}
                                </button>
                              </Tooltip>
                            </TableCell>
                            <TableCell component="th" scope="row" data-test="ticket-date-cell">
                                {getDateInStandardFormat(ticket.date * 1000)}
                            </TableCell>
                            <TableCell align="left" data-test="ticket-category-cell">{ticket.category}</TableCell>
                            <TableCell align="left" data-test="ticket-priority-cell"> {getPriority(ticket.priority)}</TableCell>
                            <TableCell align="left" data-test="ticket-status-cell"><span className={getStatus(
                                ticket.status
                              )}
                                                                                   >
                                                                                   </span> {ticket.status} 
                            </TableCell>
                              <TableCell align="left" data-test="ticket-owner-cell">{ticket.user.firstName + ' ' + ticket.user.lastName}</TableCell>
                      </TableRow>
                        
                      : ""
                      ))
                    }
                    </TableBody>
                </Table>
                {props.ticketList?.data?.filter(t => (
                  !t.assignee
                ))?.length === 0  && (
                      <div className="alignCenter">
                        <p> No Tickets Available </p>
                      </div>
                    )
                } 

                {props.ticketList?.data?.filter(t => (
                  !t.assignee
                ))?.length === 0  && (
                      <div className="alignCenter">
                        <p> No Tickets Available </p>
                      </div>
                    )
                }
      </TableContainer>

      </div>
    );
}

const mapStateToProps = state => {
    return {
      ticketDetails: state.SupportReducer.ticketDetails,
      ticketList : state.SupportReducer.ticketList,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getTicketDetails : (id) => dispatch(getTicketDetails(id)),
      getTicketList : (  pageNumber,
        limit,
        status,
        search,
        priority,
        category,
        user,
        assignee) => dispatch(getTicketList(  pageNumber,
        limit,
        status,
        search,
        priority,
        category,
        user,
        assignee)),
    };
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OtherTicketTab));