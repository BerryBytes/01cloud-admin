import React from 'react';
import { Card, CardContent, IconButton, Typography, Grid } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles, withStyles } from '@material-ui/styles';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

const BootstrapInput = withStyles(() => ({
    input: {
      borderRadius: 4,
      position: 'relative',
      
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '10px 20px 10px 12px',
    },
  }))(InputBase);

  const BootstrapInput2 = withStyles(() => ({
    input: {
      borderRadius: 6,
      position: 'relative',
      backgroundColor : 'blue',
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '10px 20px 10px 12px',
      color: 'white'
    },
  }))(InputBase);

const useStyles = makeStyles(() => ({
    root:{
        marginTop: 20
    },
    cardContainer: {
        height: 350,
        width:300
    },
    icon:{
        fontSize:85
    },
    iconContainer: {
      width: 150,
      height: 150,
      margin: '0 auto',
      borderRadius: '5px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    formControl: {
        marginTop: 30,
        marginRight: 15,
    },
    selectbox: {
        height: 30
    }
  }));

const AppTemplateCard = () => {
    const classes = useStyles();
  return (
      <Grid container spacing={ 4 } className={ classes.root }>
          <Grid item xs={ 3 }>
              <Card className={ classes.cardContainer } variant="outlined">
                  <CardContent>
                      <IconButton className={ classes.iconContainer }>
                          <SettingsIcon className={ classes.icon }/>
                      </IconButton>
                      <Typography align="center" gutterBottom variant="h6">Wordpress</Typography>
                      <br />
                      <Typography align="center" variant="body2">
                          The most powerful, popular & customizable platforms to create website.
                      </Typography>
                      <FormControl className={ classes.formControl }>
                          <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value='0'
                        input={ <BootstrapInput /> }
                          >
                              <MenuItem value={ 0 }>Version 5.3.2</MenuItem>
                          </Select>
                      </FormControl>
                      <FormControl className={ classes.formControl }>
                          <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value='0'
                        input={ <BootstrapInput2 /> }
                          >
                              <MenuItem value={ 0 }>Quick Install</MenuItem>
                          </Select>
                      </FormControl>
                  </CardContent>
              </Card>
          </Grid>
      </Grid>
    )
};

export default AppTemplateCard;
