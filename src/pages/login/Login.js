import React, { Component } from "react";
import {
  CssBaseline,
  FormHelperText,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  Paper,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import CompanyBanner from "../../components/companybanner/CompanyBanner";
import "./login.css";
import { withTranslation } from "react-i18next";
import MuiTextField from "../../components/textfield/MuiTextField";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { login } from "./redux/actions";
import paths from "../../constants/paths";
import { hasValidSessionSelector } from "./redux/selectors";
import { Formik } from "formik";
import * as Yup from "yup";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Auth0Login from "./Auth0Login";

const useStyles = (theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/images/infographics/login.svg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(9, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "15%",
    paddingRight: "15%",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2.5%",
      paddingRight: "2.5%",
      margin: theme.spacing(10, 6),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(1.5, 0, 2),
  },
});

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      email: "",
      password: "",
    };
  }
  componentDidMount() {
    this.checkLoginSuccess = this.checkLoginSuccess.bind(this);
    this.checkLoginSuccess();
  }

  checkLoginSuccess = () => {
    if (this.props.hasValidSession === true) {
      const redirect = this.props.location.state
        ? this.props.location.state.from
        : { pathname: paths.DASHBOARD };
      this.props.history.push(redirect.pathname);
    } else {
      setTimeout(this.checkLoginSuccess, 200);
    }
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmitOnEnter = (e) => {
    var _key = e.which || e.keyCode;
    if (_key === 13) {
      this.handleSubmit();
    }
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
isLegacyMode=()=>{
  return   window?.config?.REACT_APP_AUTH0_MODE.toLowerCase()==="legacy"
}

  render() {
    const { t, classes } = this.props;
    if(!this.isLegacyMode()) return <Auth0Login/>
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <CompanyBanner />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>

          <div style={{display:this.isLegacyMode()?"block":'none'}}>
          <img
              src="/images/logos/logo-blue.svg"
              alt="01Cloud"
              className="authlogo"
              id="imgLogo"
          />
            <Typography variant="h5" align="center" id="loginTopMsg">
              {t("LoginWelcomeBack")}
            </Typography>
            <Formik
              initialValues={{
                email: this.state.email,
                password: this.state.password,
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                const payload = {
                  email: values.email,
                  password: values.password,
                };
                this.props.loginAction(payload);
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .min(2, "Too Short!")
                  
                  .email("This is not a valid Email address")
                  .required("Please enter your Email address"),
                password: Yup.string()
                  
                  .required("Please enter your Password"),
                
              })}
            >
              {(props) => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isValid,
                } = props;
                return (
                  <form onSubmit={handleSubmit} className={classes.form}>
                    <MuiTextField
                      id="email"
                      error={errors.email && touched.email}
                      label="Email Address"
                      name="email"
                      autoFocus
                      color="primary"
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}
                      margin="normal"
                    />
                    <FormControl variant="outlined" margin="normal" fullWidth>
                      <InputLabel
                        htmlFor="password"
                        error={errors.password && touched.password}
                      >
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="password"
                        error={errors.password && touched.password}
                        type={this.state.showPassword ? "text" : "password"}
                        color="primary"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        onBlur={handleBlur}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.shandleMouseDownPassword}
                              edge="end"
                            >
                              {this.state.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText
                        error={errors.password && touched.password}
                      >
                        {errors.password && touched.password
                          ? errors.password
                          : ""}
                      </FormHelperText>
                    </FormControl>

                    <div className="signInButtonDiv">
                      <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        align="center"
                        justify="center"
                        disabled={!(isValid && dirty)}
                      >
                        {t("SIGN IN")}
                      </Button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  hasValidSession: hasValidSessionSelector(state),
});

const mapDispatchtoProps = (dispatch) => {
  return {
    loginAction: (payload) => dispatch(login(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(Login)));
