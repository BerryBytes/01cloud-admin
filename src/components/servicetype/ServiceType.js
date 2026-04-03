import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, OutlinedInput, Button, FormControl, Select, MenuItem } from '@material-ui/core';
import "react-mde/lib/styles/css/react-mde-all.css";

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

const ServiceType = (props) => {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
        <Grid spacing={1} container >
            <Grid className={classes.styleParagraph} item xs={12} sm={12} md={12}>
            <p> Service Type </p>
            </Grid>
        </Grid>

        <Grid container  spacing={1} className={classes.styleGrid}>                    
                <Grid item xs={12} sm={6} md={12}>
                <FormControl variant="outlined" style={{width:'100%'}}> 
                    <Select
                        input={<OutlinedInput  />}
                        labelId="supportType"
                        name="support_type"
                        value={props.value}
                        onChange={ props.onChange }
                    >
                    {
                        props.ticketGroup?.data?.map((data) => 
                        (
                        <MenuItem key={data.id} value={data.id}>{data.title} </MenuItem>
                        ))
                    }
                        
                    </Select>
                </FormControl>
                </Grid>
            
        </Grid>

        <Grid container justify="center">
            <Button variant="contained" color="primary" className={classes.customButtonStyle} disabled={props.serviceTypeButtonEnabled} onClick={props.onClick}> Save </Button>
        </Grid>
        </Paper>
    )
}

export default ServiceType;
