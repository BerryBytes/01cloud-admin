import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import SidebarNav from "./sidebarnav/SidebarNav";
import { withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import styleConstants from "../../theme/styleConstants";

import { compose } from "redux";
import paths from "../../constants/paths";

/* istanbul ignore next */
const useStyles = (theme) => ({
  flex: {
    display: "flex",
    flexDirection: "column",
    padding: "0px 0px 10px 0px",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  flexItem: {
    margin: "0px 0px 10px 0px",
  },
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: styleConstants.drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: styleConstants.drawerWidth,
    background: "#0057fa",
    boxShadow:
      "0px 3px 3px -2px darkgray, 0px 1px 1px 0px darkgray, 0px 1px 33px 0px rgba(0,0,0,0.12)",
    scrollbarWidth: "thin",
    scrollbarColor: "rgb(105 146 222) rgba(0, 0, 0, 0)",
    '&::-webkit-scrollbar': {
      width: "0.5em"
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgb(105 146 222)',
      borderRadius: 6,
      '&:hover': {
        backgroundColor: "rgb(147 174 225)"
      }
    },
    '&:not(:hover)': {
      scrollbarColor: "rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)",
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    }
  },
  navLogo: {
    marginTop: 30,
    marginBottom: 20,
  },
  logoContainer: {
    margin: "0px 0px 10px 0px",
    alignSelf: "center",
  },
});

export class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, mobileOpen, drawerToggle } = this.props;
    const drawer = (
      <div className={classes.flex} data-test="drawer-container">
        <RouterLink to={paths.DASHBOARD} className={classes.logoContainer}>
          <img
            alt="Logo"
            height="40"
            className={classes.navLogo}
            src="/images/logos/logo-white.svg"
          />
        </RouterLink>
        <div className={classes.flexItem}>
          <SidebarNav />
        </div>
      </div>
    );

    return (
      <div className={classes.drawer} data-test="sidebar-container">
        <Hidden lgUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={drawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, 
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

export default (compose(withStyles)(useStyles)(SideBar));
