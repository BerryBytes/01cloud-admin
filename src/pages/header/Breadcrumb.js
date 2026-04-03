import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import "./header.css";
import HomeIcon from "@material-ui/icons/Home";
import paths from "../../constants/paths";

const useStyles = () => ({
  breadcrumb: {},
  breadcrumbLink: {
    fontSize: 13,
    color: "#43425D",
  },
});

const LinkRouter = (props) => (
  <Link {...props} component={RouterLink} underline="none" />
);

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  componentDidMount() {}

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="breadcrumbs">
          <ul>
            {this.props.breadcrumbData &&
              this.props.breadcrumbData.length >= 0 && (
                
                <li>
                  <LinkRouter
                    color="inherit"
                    to={`${paths.DEFAULT}`}
                    className={classes.breadcrumbLink}
                  >
                    <HomeIcon className="homeIcon" />
                  </LinkRouter>
                </li>
              )}

            {this.props.breadcrumbData &&
              this.props.breadcrumbData.length > 0 &&
              this.props.breadcrumbData.map((item, ind) => {
                return (
                  <Fragment key={ind}>
                    <li>
                      <LinkRouter
                        color="inherit"
                        to={{ pathname: item.path }}
                        className={classes.breadcrumbLink}
                      >
                        {item.name}
                      </LinkRouter>
                    </li>
                  </Fragment>
                );
              })}
          </ul>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  breadcrumbData: state.ProjectReducer.breadcrumbData,
});

const mapDispatchtoProps = () => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchtoProps
  )(withStyles(useStyles)(withTranslation()(Breadcrumb)))
);
