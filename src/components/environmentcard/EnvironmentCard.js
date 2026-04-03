import React from 'react';
import { Paper, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root:{
        marginTop: 20
    },
    avatar: {
        color: "blue",
        backgroundColor: "red"
    },
    shortTitle: {
        background: "white",
        border: "1px solid #0057fa",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30
    },
    container: {
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        justifyContent: "space-between"
    },
    progress: {
        margin: "7px 20px 0px 20px",
        borderRadius: 20,
    },
    titleContainer: {
        flex: 1
    }
}));

const EnvironmentCard = (props) => {
    const { details } = props;
    const classes = useStyles();
  return (
      <Grid item md={4} xs={12}>
        <Paper elevation={3}>
            
            <Link to={ {
                                      pathname: '/environment/' +  details.id,
                                      state: { details }
                                    } } style={{textDecoration:'none'}}
            >
                <div className={classes.container}>
                    <div className={classes.shortTitle}>
                        <p className='projectSmallTitle'>{ details.name !== "" && details.name.charAt(0).toUpperCase() }</p>
                    </div>
                    <div className={classes.titleContainer}>
                        <span className='projectTitle'>{details.name}</span>
                        
                    </div>
                    
                </div>
            </Link>
        </Paper>
      </Grid>
  )
}

export default EnvironmentCard