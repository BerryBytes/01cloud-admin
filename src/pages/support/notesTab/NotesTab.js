import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography, Button, FormControl } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import TicketDetailCard from '../../../components/ticketdetailcard/TicketDetailCard';
import {
  getTicketDetails,
  addNotes
} from "../redux/actions";
import MarkdownField from "../../../components/markdown/MarkdownField";

import BackdropLoader from '../../../components/loader/BackdropLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2)
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
    height: 55,
    width: 120
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
  }
}));

export function NotesTab(props) {
  const [value, setValue] = React.useState("");
  const [markdown, setMarkdown] = React.useState(true);

  const classes = useStyles();

  useEffect(() => {
    props.getTicketDetails(props.match.params.ticketId);
  }, []);

  const addNotesHandler = () => {
    markdown ? setMarkdown(false) : setMarkdown(true);
  }

  const notesSaveClickHandler = () => {
    let payload = {
      payload: {
        note: value
      },
      id: props.match.params.ticketId
  }
    props.addNotes(payload);
    addNotesHandler();
  }

  const isNoteValid = () => {
    let val = false;
    if (value?.trim()?.length > 0) {
      val = true;
    }
    return val;
  };

  return (
      <div className={classes.root} data-test="notes-container">
      <Grid container spacing={2}>
        <Grid item xs={8}>

         {/* ticket description start */}
          <Paper className={classes.paper}>
                
          <div className="listContainer">
                <Typography color="textPrimary" variant="h5" data-test="notes-header">
                    <strong> Notes </strong>
                </Typography>
                <Button onClick={addNotesHandler} data-test="edit-button">
                  <EditIcon />
                </Button>
          </div>
            <hr />
                 
                        <Grid container  spacing={1} className={classes.styleGrid} >
                            <Grid item xs={12} sm={6} md={12}>
                                <div className={classes.divStyling} data-test="description-container"> 
                                <MarkdownField
                                  value={props.ticketDetails?.data?.ticketDetails?.notes}
                                  readOnly={true}
                                /> 
                                </div>
                            </Grid> 
                        </Grid>
          </Paper>
          {/* ticket description end */}

           {/* Reply Ticket Start */}
           {
              props.ticketDetails?.data?.ticketDetails?.status === 'Closed' || markdown ? ''  :
              <Paper className={classes.paper} data-test="reply-container">
                <Grid container  spacing={1} className={classes.styleGrid}>
                    
                    <Grid item md={12} sm={6} xs={12}>
                        
                        <div className={classes.divStyling}>
                          <FormControl variant="outlined" style={{width: '100%'}} data-test="reply-notes-container">
                            
                            <MarkdownField
                                value={props.ticketDetails?.data?.ticketDetails?.notes ?? value}
                                onChange={setValue}
                                title={"Write a Note"}
                            />
                          </FormControl>
                        </div>
  
                    </Grid>
                   
                </Grid>

                <Grid container justify="flex-end" spacing={2} style={{marginLeft:'-3%'}}>
                  <Grid item>
                    <Button variant="contained" color="primary" className={classes.customButtonStyle} onClick={addNotesHandler} data-test="close-button"> Cancel </Button>
                  </Grid> 
                  <Grid item>
                  <Button variant="contained" color="primary" className={classes.customButtonStyle} onClick={notesSaveClickHandler} disabled={!isNoteValid()} data-test="save-button"> Save </Button>          
                  </Grid>
                </Grid>

              </Paper>
            }
            {/* reply ticket end */}
                
        </Grid>

    <Grid item xs={4}>
      <TicketDetailCard ticketDetails={props.ticketDetails} />
    
    </Grid>    
      </Grid>
      {props.notesLoader && <BackdropLoader message="Loading Notes" />}
      </div>
  );
}

const mapStateToProps = state => {
  return {
    ticketDetails: state.SupportReducer.ticketDetails,
    addNotesResponse: state.SupportReducer.addNotesResponse,
    notesLoader: state.SupportReducer.notesLoader
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getTicketDetails : (id) => dispatch(getTicketDetails(id)),
    addNotes: (jsonData) => dispatch(addNotes(jsonData)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NotesTab));