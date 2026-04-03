import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import MemoryIcon from "@material-ui/icons/Memory";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";

import PowerIcon from "@material-ui/icons/Power";

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import "./sidebarnav.css";
import { withStyles } from "@material-ui/core/styles";
import paths from "../../../constants/paths";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import DnsIcon from '@material-ui/icons/Dns';
import DvrIcon from '@material-ui/icons/Dvr';

import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import Collapse from '@material-ui/core/Collapse';
import SpeakerGroupOutlinedIcon from '@material-ui/icons/SpeakerGroupOutlined';
import AmpStoriesOutlinedIcon from '@material-ui/icons/AmpStoriesOutlined';
import { connect } from "react-redux";
import { updateNav } from "../../common/redux/actions"

import { withRouter } from 'react-router-dom';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import PaymentIcon from '@material-ui/icons/Payment';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import BallotIcon from '@material-ui/icons/Ballot';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
/* istanbul ignore next */
const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  item: {
    color: "#0057fa",
    display: "flex",
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    color: "white",
    minWidth: 32,
  },
  link: {
    textDecoration: "none",
    textAlign: "center",
  },
  addproj: {
    color: "white",
  },
  Paper: {
    backgroundColor: "#0057fa",
    color: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 0,
    
  },
  ActivePaper: {
    backgroundColor: "#004ddf",
    color: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 0,
    
  },
  divider: {
    
    marginBottom: 40,
  },
  projects: {
    marginBottom: "1.5rem",
    marginLeft: 16,
  },
  subItem: {
    paddingLeft: theme.spacing(4),
  },
  iconColor: {
    color: "#fff"
  }
});

export class SidebarNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navLinks: [
        {
          navText: "Dashboard",
          toLink: paths.DASHBOARD,
          active: true,
          icon: <DashboardIcon />,
        },
        {
          navText: "User",
          icon: <RecentActorsIcon />,
          subNavs: [
            {
              navText: "Users",
              toLink: paths.USERS,
              active: false,
              icon: <PeopleIcon />,
            },
            {
              navText: "Invitations",
              toLink: paths.INVITATIONS,
              active: false,
              icon: <AssignmentIndIcon />,
            },
          ],
          expanded: false
        },
        {
          navText: "Organizations",
          icon: <AccountBalanceIcon />,
          subNavs: [
            {
              navText: "Organization List",
              toLink: paths.ORGANIZATIONLIST,
              active: false,
              icon: <FormatListNumberedRtlIcon />,
            },
          ],
          expanded: false
        },
        {
          navText: "Subscription",
          icon: <LocalAtmIcon />,
          expanded:false,
          subNavs: [
            {
              navText: "Project Subscription",
              toLink: paths.SUBSCRIPTION,
              active: false,
              icon: <AmpStoriesOutlinedIcon />
            },
            {
              navText: "Org Subscription",
              toLink: paths.ORG_SUBSCRIPTION,
              active: false,
              icon: <SpeakerGroupOutlinedIcon />
            },
          ]
        },
        {
          navText: "Resources",
          toLink: paths.RESOURCES,
          active: false,
          icon: <MemoryIcon />,
        },
        {
          navText: "Plugin",
          toLink: paths.PLUGIN,
          active: false,
          icon: <PowerIcon />,
        },
        {
          navText: "Cluster",
          icon: <GroupWorkIcon />,
          subNavs: [
            {
              navText: "Clusters",
              toLink: paths.CLUSTER,
              active: false,
              icon: <BubbleChartIcon />,
            },
            {
              navText: "Registry",
              toLink: paths.REGISTRIES,
              active: false,
              icon: <DvrIcon />,
            },
            {
              navText: "DNS",
              toLink: paths.DNS,
              active: false,
              icon: <DnsIcon />,
            },
            {
              navText: "Operators",
              toLink: paths.OPERATORS,
              active: false,
              icon: <OfflineBoltIcon />,
            },
          ],
          expanded: false
        },
        {
          navText: "Tickets",
          toLink: paths.SUPPORT,
          active: false,
          icon: <ConfirmationNumberIcon />,
        },
        {
          navText: "LoadBalancers",
          toLink: paths.LOADBALANCERS,
          active: false,
          icon: <BallotIcon />,
        },
        {
          navText: "Billing",
          icon: <DescriptionIcon />,
          subNavs: [
            {
              navText: "Promo Code",
              toLink: paths.BILLING,
              active: false,
              icon: <MonetizationOnIcon />,
            },
            {
              navText: "Deductions",
              toLink: paths.DEDUCTIONS,
              active: false,
              icon: <RemoveCircleOutlineIcon />,
            },
            {
              navText: "Gateways",
              toLink: paths.GATEWAY,
              active: false,
              icon: <AccountBalanceIcon />,
            },
            {
              navText: "Invoice",
              toLink: paths.INVOICE,
              active: false,
              icon: <ReceiptIcon />,
            },
            {
              navText: "Payments",
              toLink: paths.PAYMENT,
              active: false,
              icon: <PaymentIcon />,
            },
          ],
          expanded: false
        },
        {
          navText: "Settings",
          toLink:  paths.SETTINGS,
          active: false,
          icon: <PermDataSettingIcon />,
        }
      ],
    };
  }

  componentDidMount() {
    if(this.props.nav) {
      let text = this.props.nav.navText;
      let link = this.props.nav.toLink;
      if(text && link) {
        this.handleActiveNav({}, text, false);
      }
    }
  }

  handleActiveNav = (e, text, _updateNav=true) => {
    const navLinkCopy = [...this.state.navLinks];
    let _link = "";
    navLinkCopy.forEach(link => {
      if(link.navText === text && link.toLink) {
        _link = link.toLink
        link.active = true;
      }
      else link.active = false;
      if(link?.subNavs?.length > 0) {
        link.subNavs.forEach(subLink => {
          if(subLink.navText === text && subLink.toLink) {
            subLink.active = true;
            _link = subLink.toLink;
            link.expanded = true;
          }
          else subLink.active = false;
        })
      }
    })
    this.setState({
      navLinks: navLinkCopy,
    });
    if(_updateNav) this.props.updateNav(text, _link);
    
  };
  
  handleToggle = (text) => {
    const navLinkCopy = [...this.state.navLinks];
    
    navLinkCopy.forEach(link => {
      if(link.navText === text && !link.toLink && link?.subNavs?.length > 0) {
        
        link.expanded = !link.expanded;
      }
    })
    this.setState({
      navLinks: navLinkCopy,
    });
    
  }

  render() {
    const { classes } = this.props;
    const { navLinks } = this.state;
    if (navLinks.length > 0) {
      return (
        <div className={classes.root} data-test="sidebarnav-main-container">
          {navLinks.map((nav, id) => {
            return (
              <Paper
                elevation={0}
                className={nav.active ? classes.ActivePaper : classes.Paper}
                key={id}
                data-test="sidebarnav-item"
              >
                <Link
                  to={nav.toLink ?? "#"}
                  className={classes.link}
                  onClick={nav.toLink ? (e) => this.handleActiveNav(e, nav.navText) : () => this.handleToggle(nav.navText)}
                  data-test="sidebarnav-item-link"
                >
                  <ListItem button className={classes.item}>
                    <ListItemIcon className={classes.icon}>
                      {nav.icon}
                    </ListItemIcon>
                    <ListItemText className="linkText">
                      <span
                        style={{
                          display: "block",
                          color: "white",
                          marginTop: "2px",
                        }}
                        data-test="sidebarnav-item-link-text"
                      >
                        {nav.navText}
                      </span>
                    </ListItemText>
                    {!nav.toLink ? (nav.expanded ? <ExpandLess className={classes.iconColor} /> : <ExpandMore className={classes.iconColor} />) : <></>}
                  </ListItem>
                </Link>
                <Collapse in={nav?.expanded} timeout="auto" unmountOnExit data-test="sidebarnav-item-expanse">
                  {
                    nav?.subNavs?.length > 0 && nav?.subNavs.map((subNav, i) => (
                      <Paper
                        elevation={0}
                        className={subNav.active ? classes.ActivePaper : classes.Paper}
                        key={i}
                        data-test="sidebar-nav-sub-item"
                      >
                        <Link
                          to={subNav.toLink ?? "#"}
                          className={classes.link}
                          onClick={(e) => this.handleActiveNav(e, subNav.navText)}
                          data-test="sidebar-nav-sub-item-link"
                        >
                          <ListItem button className={`${classes.item} ${classes.subItem}`}>
                            <ListItemIcon className={classes.icon}>
                              {subNav.icon}
                            </ListItemIcon>
                            <ListItemText className="linkText">
                              <span
                                style={{
                                  display: "block",
                                  color: "white",
                                  marginTop: "2px",
                                }}
                                data-test="sidebar-nav-sub-item-linkText"
                              >
                                {subNav.navText} 
                              </span>
                            </ListItemText>
                          </ListItem>
                        </Link>
                      </Paper>
                    ))
                  }
                </Collapse>
              </Paper>
            );
          })}

          <br />
        </div>
      );
    }
  }
}

/* istanbul ignore next */
const mapStateToProps = (state) => {
  return {
    nav: state.CommonReducer.nav,
  };
};

/* istanbul ignore next */
const mapDispatchtoProps = (dispatch) => {
  return {
    updateNav: (navText, toLink) =>
      dispatch(updateNav(navText, toLink)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(SidebarNav))));
