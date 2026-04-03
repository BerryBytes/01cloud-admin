import React, { memo } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Header from '../pages/header/Header'
import SideBar from '../pages/sidebar'
import Breadcrumb from '../pages/header/Breadcrumb'
import { makeStyles } from '@material-ui/core/styles';
import styleConstants from '../theme/styleConstants'
import { hasValidSessionSelector } from '../pages/login/redux/selectors';
import { useSelector } from 'react-redux'
import paths from '../constants/paths';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding : '2rem',
    [ theme.breakpoints.up('lg') ]: {
      marginLeft: styleConstants.drawerWidth,
    }
  },
  breadcrumb: {
    padding : '1rem 2rem 0rem 2rem',
    [ theme.breakpoints.up('lg') ]: {
      marginLeft: styleConstants.drawerWidth,
    }
  },
}));

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const classes = useStyles();
  const [ mobileOpen, setMobileOpen ] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const hasValidSession = useSelector(hasValidSessionSelector);

  return (
      <Route
      { ...rest }
      render={ props =>
        hasValidSession ? (
            <>
                <Header drawerToggle = { handleDrawerToggle }/>
                <div className={ classes.breadcrumb }> 
                  <Breadcrumb />
                </div>
                <SideBar drawerToggle = { handleDrawerToggle } mobileOpen = { mobileOpen }/>
                <div className={ classes.content }> 
                    <Component { ...props } />
                </div>
            </>
        ) : (
            <Redirect
            to={ {
              pathname: paths.DEFAULT,
              state: { from: props.location },
            } }
            />
        )
      }
      />
  )
}

export default memo(PrivateRoute)
