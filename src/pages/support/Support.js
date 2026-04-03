import React, { useState, useEffect } from "react";
import { 
  TableContainer,
  Select,
  FormControl,
  Grid,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  TableCell,
  MenuItem,
  TextField,
  InputAdornment,
  Typography, Tooltip } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from '@material-ui/core/styles';
import ConfirmDeletePopup from "../../components/confirmdeletepopup/ConfirmDeletePopup";
import { getDateInStandardFormat } from '../../helpers/utils';

import { connect } from 'react-redux';
import { 
  getTicketList,
  updateBreadcrumb,
  deleteTicket,
  getTicketGroup,
  getTicketStats,
  getAdminGroup
 } from "./redux/actions";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import SupportCard from '../../components/SupportCard/SupportCard';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2)
  },
  table: {
    minWidth: 650,
  }, 
  tableHeight: {
    maxHeight:300
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
  customWidth: {
    maxWidth: 200
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
  },
  gridWidthStyle: {
    width: '83%'
  }
}));

export function Support(props) {
    const classes = useStyles();

    const [category , setCategory] = useState('category');
    const [status , setStatus] = useState('status');
    const [priority , setPriority] = useState('priority');
    const [ticketDeletePopupOpen, setTicketDeletePopupOpen] = useState(false);
    
    const [searchText, setSearchText] = useState('');
    const [user, setUser] = useState('user');
    const [assignee, setAssignee] = useState('assignee');
    const [openCount, setOpenCount] = useState(0);
    const [closedCount, setClosedCount ] = useState(0);
    const [totalTicketTypes, setTotalTicketTypes ] = useState(0);

    const limit = 0;

    const fetchSupportTickets = (pageNumber) => {
      props.getTicketList(
        pageNumber,
        limit,
        status === 'status' ? "" : status,
        searchText === null || '' ? "": searchText,
        priority === 'priority' ? "" : priority,
        category === 'category' ? "" : category,
        user === 'user' ? "" : user,
        assignee === 'assignee' ? "" : assignee
        
      );
    };  

    const handleReset = () => {
      setSearchText("");
      setUser("");
      setAssignee("");
      setPriority('priority');
      setStatus('status');
      setCategory('category');
      setAssignee('assignee');
      setUser('user');
      setSearchText('');
    }

    useEffect(() => {
      fetchSupportTickets(1);
    }, [status,searchText, priority, category, user, assignee])

    useEffect(() => {
        props.getAdminGroup();
        props.getTicketGroup();
        fetchSupportTickets(1);  
        props.getTicketStats();     
        props.updateBreadcrumb([
          {
            name: "Support",
            path: "/ticket",
          },
        ]);
    },[])

    useEffect(() => {
      props.updateBreadcrumb([
        {
          name: "Support",
          path: "/ticket",
        },
      ]);
  },[props])

  const checkCategory = () => (
    props.ticketStats?.data?.map((data,index) => (
      setTotalTicketTypes(index+1),
      data.ticketType === "Closed" ? setClosedCount(data.count): setOpenCount(data.count)
    ))
)

  useEffect(() => {
    checkCategory();
  }, [props.ticketStats?.data])

    const goToOverview = (id) => {
     props.history.push(`/ticket/${id}`)
    };

    const categoryChangeHandler = (e) => {
      setCategory(e.target.value);
    }

    const searchChangeHandler = (e) => {
      setSearchText(e.target.value);
    }

    const assigneeChangeHandler = (e) => {
      setAssignee(e.target.value);
    }

    const statusChangeHandler = (e) => {
      setStatus(e.target.value);
    }

    const priorityChangeHandler = (e) => {
      setPriority(e.target.value);
    }
   
    const deleteTicketAgreeHandler = () => {
      setTicketDeletePopupOpen(false);
      
    };
  
    const deleteTicketDisagreeHandler = () => {
      setTicketDeletePopupOpen(false);
    };

    const getStatus = (_status) => {
      switch (_status) {
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

    const isValid = () =>{
      let valid = true;
      if(category === 'category' && priority === 'priority' && status === 'status' && assignee === 'assignee' && searchText === '' ){
        valid = false;
      }
      return valid
    }

    return (
      <>
      <div className={classes.root} data-test="support-container">
      
        <Grid container spacing={4} data-test="stats-card">
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SupportCard  data-test="open-count" title="Open Tickets" count={openCount}/>
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SupportCard data-test="close-count" title="Closed Tickets" count={closedCount} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SupportCard data-test="total-tickets" title="Total Tickets" count={parseInt(openCount) + parseInt(closedCount)} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <SupportCard data-test="ticket-types" title="Ticket Types" count={totalTicketTypes} />
          </Grid>
        </Grid>

              <div className={classes.headerText} data-test="filter-tickets">
               <Grid container justify="flex-end">
                <Grid item>
                    <TextField
                      id="searchText"
                      input ={<BootstrapInput />}
                      color="primary"
                      onChange={searchChangeHandler}
                      style={{ marginTop: 8 }}
                      placeholder= "Enter Search Text"
                      size="small"
                      value={searchText}
                      variant="outlined"
                      InputProps={{
                        style: {
                          height: 40
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"
                            >
                              <SearchIcon size="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                </Grid>

                  <Grid item >
                    <FormControl className={classes.formControl} >
                          <Select
                              input ={<BootstrapInput />}
                              labelId="demo-simple-select-outlined-label"
                              name="app"
                              value={ assignee }
                              onChange={ assigneeChangeHandler }
                          >
                              <MenuItem value="assignee"> assignee </MenuItem>
                              {
                                props.adminGroup?.data?.user?.map((data) =>(
                                  <MenuItem key={data.id} value={data.id}>{data.firstName + ' ' + data.lastName} </MenuItem>
                                ))
                              }
                          </Select>
                    </FormControl>
                  </Grid>

                  <Grid item >
                    <FormControl className={classes.formControl} >
                          <Select
                              input ={<BootstrapInput />}
                              labelId="demo-simple-select-outlined-label"
                              name="app"
                              value={ category }
                              onChange={ categoryChangeHandler }
                          >
                              <MenuItem value="category"> category </MenuItem>
                              {
                                  props.ticketGroup?.data?.map((data) => 
                                  (
                                    <MenuItem key={data.id} value={data.id}>{data.title} </MenuItem>
                                  ))
                              }
                          </Select>
                    </FormControl>
                  </Grid>

                <Grid item>
                 
                    <FormControl className={classes.formControl}> 
                        <Select
                            input={<BootstrapInput />}
                            labelId="demo-simple-select-outlined-label"
                            name="app"
                            value={ status }
                            onChange={ statusChangeHandler }
                        >
                            <MenuItem value="status"> status </MenuItem>
                            <MenuItem value="Open"> Open </MenuItem>
                            <MenuItem value="Closed"> Closed </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item>
                    <FormControl className={classes.formControl}>
                        <Select
                            input={<BootstrapInput />}
                            name="env"
                            value={ priority }
                            onChange={ priorityChangeHandler }
                        >
                            <MenuItem value="priority">priority</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </Select>
                    </FormControl> 
                </Grid>

                { isValid() &&
                <IconButton>
                  <Typography
                    color="disabled"
                    onClick={() => handleReset()}
                    variant="h5"
                    data-test="reset-button"
                  >
                    Reset{" "}
                  </Typography>
                </IconButton>
                }
               </Grid>
              </div>
           
             <div className="listContainer"> 
                <Typography color="textPrimary" variant="h4" data-test="unassigned-ticket">
                    Unassigned Tickets
                </Typography>
             </div>

          <TableContainer component={Paper} className={classes.tableHeight} data-test="unassigned-ticket-list-container">
           
                <Table stickyHeader className={classes.table} aria-label="simple table">
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
                      !ticket.assignee ?
                        <TableRow key={ticket.id} onClick={()=>goToOverview(ticket.id)} data-test="unassigned-data">
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
                      : ''
                      ))
                    }
                    </TableBody>
                </Table>
                {props.ticketList?.data?.filter(t => (
                  t.assignee  === null
                ))?.length === 0 && (
                      <div className="alignCenter" data-test="no-unassigned-ticket">
                        <p> No Unassigned Tickets</p>
                      </div>
                    )
                }

                { 
                  props?.ticketList?.data === null ?
                  (
                    <div className="alignCenter" data-test="no-ticket-available-unassigned">
                      <p> No Tickets Available</p>
                    </div>
                  ) : ""
                }
          </TableContainer>

          <div className={classes.headerText}>
            <div className="listContainer"> 
                <Typography color="textPrimary" variant="h4" data-test="assigned-ticket">
                    Assigned Tickets
                </Typography>
            </div>
          </div> 

          <TableContainer component={Paper} className={classes.tableHeight} data-test="assigned-ticket-list-container">
                <Table stickyHeader className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Assignee</TableCell>
                            <TableCell align="left">Priority</TableCell>
                            
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">Owner</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      props.ticketList?.data?.map((ticket) => (   
                      ticket.assignee ?
                        <TableRow key={ticket.id} onClick={()=>goToOverview(ticket.id)}>
                        <TableCell data-test="ticket-id-cell-assigned">     
                              <button className="buttonStyle" onClick={()=>goToOverview(ticket.id)}>
                                  #{ ticket.id }
                              </button> 
                        </TableCell>
                            <TableCell align="left" data-test="ticket-title-cell-assigned">
                              <Tooltip arrow title={ticket.title} classes={{ tooltip: classes.customWidth }}>
                                <button className={classes.idStyle} onClick={()=>goToOverview(ticket.id)}>
                                { ticket.title.length > 20 ? ticket.title.substring(0,20)+'...' : ticket.title}
                                </button>
                              </Tooltip>
                            </TableCell>
                            <TableCell component="th" scope="row" data-test="ticket-date-cell-assigned">
                              {getDateInStandardFormat(ticket.date * 1000)}
                            </TableCell>
                            <TableCell align="left" data-test="ticket-category-cell-assigned">{ticket.category}</TableCell>
                            <TableCell align="left" data-test="ticket-assignee-cell-assigned">{ 
                              props.adminGroup?.data?.user?.map((data) =>(
                                 data.id === ticket.assignee ? data.firstName + ' ' + data.lastName : ""
                              ))
                            }
                            </TableCell>
                            <TableCell align="left" data-test="ticket-priority-cell-assigned"> {getPriority(ticket.priority)}</TableCell>

                            <TableCell align="left" data-test="ticket-status-cell-assigned"><span className={getStatus(
                    ticket.status
                  )}
                                                                                            >
                                                                                            </span> {ticket.status} 
                            </TableCell>
                  <TableCell align="left" data-test="ticket-owner-cell-assigned">{ticket.user.firstName + ' ' + ticket.user.lastName}</TableCell>

                        </TableRow>
                        : ''
                      )) 
                    
                    }

                    </TableBody>
                </Table>
                {props.ticketList?.data?.filter(t => (
                  t.assignee  !== null
                ))?.length === 0 && (
                      <div className="alignCenter" data-test="no-assigned-ticket">
                        <p> No Assigned Tickets</p>
                      </div>
                    )
                }

                { 
                  props?.ticketList?.data === null ?
                  (
                    <div className="alignCenter" data-test="no-ticket-available-assigned">
                      <p> No Tickets Available</p>
                    </div>
                  ) : ""
                }
          </TableContainer> 

      </div>

      <ConfirmDeletePopup
        open={ticketDeletePopupOpen}
        handleAgree={deleteTicketAgreeHandler}
        handleDisAgree={deleteTicketDisagreeHandler}
        yesText="Yes"
        noText="No"
        toMatchName={"Delete"}
        toDeleteModule="support ticket"
        message={`Are you sure you want to delete the ticket?`}
        action="delete"
      />
      </>
    );
}

const mapStateToProps = state => {
  return {
    ticketStats: state.SupportReducer.ticketStats,
    ticketList : state.SupportReducer.ticketList,
    ticketGroup: state.SupportReducer.ticketGroup,
    adminGroup: state.SupportReducer.adminGroup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAdminGroup : () => dispatch(getAdminGroup()),
    getTicketStats : () => dispatch(getTicketStats()),
    getTicketGroup : () => dispatch(getTicketGroup()),
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
    deleteTicket: (id) => dispatch(deleteTicket(id)),
    updateBreadcrumb: (breadcrumbData) => dispatch(updateBreadcrumb(breadcrumbData)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Support);
