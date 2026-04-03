import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import MuiTextField from '../../components/textfield/MuiTextField';
import { addInvitation } from './redux/actions';

const useStyles = () => ({
    firstNameInputBox: {
        marginRight: "0.5rem !important"
    },
    lastNameInputBox: {
        marginLeft: "0.5rem !important"
    },
    registrationButtonDiv: {
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        display: "flex",
        justifyContent: "center"
     }
  });

export class AddInvitation extends Component {
    constructor(props){
      super(props);
      this.state = {
      }
      this.firstNameInput = React.createRef();
    }

    componentDidMount(){
      let $this = this;
      setTimeout( function () { $this.firstNameInput.current.focus(); }, 500)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps) {
          if(!this.props.addInvitationCallSuccess && nextProps.addInvitationCallSuccess){
            this.props.handleCreateEditSuccess();
          }
        }
    }

    render () {
        const { t,classes } = this.props;
        return (
            <>
                    <div data-test="main-container">
                        <Formik initialValues={ { firstName:'',lastName:'',email : '' ,companyName : ''
                            ,designation : '' , password : '' , confirmPassword : '', purpose : '' } } 
                        onSubmit={ (values, { setSubmitting }) => {
                          setSubmitting(true);
                            const payload = {
                              first_name: values.firstName,
                              last_name: values.lastName,
                              email: values.email,
                              company: values.companyName,
                              designation: values.designation,
                              remarks: values.purpose
                            }
                            this.props.addInvitation(payload , this.props.history);
                        } }
                          validationSchema = { 
                            Yup.object().shape({
                              firstName : Yup.string().min(2,'Too Short!').max(30,'Too Long!').required('Please enter your First Name'),
                              
                              email : Yup.string().min(2,'Too Short!').email().required('Please enter your email address'),
                              
                            }) }
                        >
                            {
                        (props) => {
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
                              <form onSubmit={ handleSubmit } >
                                  <div className='displayFlex'>
                                      <MuiTextField 
                                    id="firstName"
                                    required
                                    data-test="name-field" 
                                    
                                    inputRef={ this.firstNameInput }
                                    error={ errors.firstName && touched.firstName }
                                    label='First name' 
                                    name="firstName" 
                                    color='primary'
                                    onChange={ handleChange } 
                                    value={ values.firstName }
                                    customClassName={ classes.firstNameInputBox }
                                    onBlur={ handleBlur }
                                    helperText={ (errors.firstName && touched.firstName) && errors.firstName }
                                    margin="normal"
                                      />
                                      <MuiTextField 
                                    id="lastName" 
                                    error={ errors.lastName && touched.lastName }
                                    label='Last name' 
                                    data-test="last-field"
                                    customClassName={ classes.lastNameInputBox}
                                    name="lastName" 
                                    color='primary'
                                    onChange={ handleChange } 
                                    value={ values.lastName }
                                    onBlur={ handleBlur }
                                    helperText={ (errors.lastName && touched.lastName) && errors.lastName }
                                    margin="normal"
                                      />
                                  </div>
                                  <MuiTextField 
                                id="email" 
                                error={ errors.email && touched.email }
                                required
                                label='Email Address' 
                                name="email" 
                                data-test="email-field"
                                color='primary'
                                onChange={ handleChange } 
                                value={ values.email }
                                onBlur={ handleBlur }
                                helperText={ (errors.email && touched.email) && errors.email }
                                autoComplete="new-password"
                                margin="normal"
                                  />
                                  <MuiTextField 
                                    id="companyName" 
                                    error={ errors.companyName && touched.companyName }
                                    label='Company name' 
                                    name="companyName" 
                                    data-test="company-field"
                                    color='primary'
                                    onChange={ handleChange } 
                                    value={ values.companyName }
                                    onBlur={ handleBlur }
                                    helperText={ (errors.companyName && touched.companyName) && errors.companyName }
                                    margin="normal"
                                  />
                                  <MuiTextField 
                                    id="designation" 
                                    error={ errors.designation && touched.designation }
                                    label='Role' 
                                    name="designation" 
                                    data-test="designation-field"
                                    color='primary'
                                    onChange={ handleChange } 
                                    value={ values.designation }
                                    onBlur={ handleBlur }
                                    helperText={ (errors.designation && touched.designation) && errors.designation }
                                    margin="normal"
                                    autoComplete="new-password"
                                  />
                                      <MuiTextField 
                                        id="purpose" 
                                        error={ errors.purpose && touched.purpose }
                                        label='Purpose' 
                                        name="purpose"
                                        data-test="purpose-field" 
                                        color='primary'
                                        onChange={ handleChange } 
                                        value={ values.purpose }
                                        onBlur={ handleBlur }
                                        helperText={ (errors.purpose && touched.purpose) && errors.purpose }
                                        margin="normal"
                                        autoComplete="new-password"
                                      /> 
                                  <div className={classes.registrationButtonDiv}>
                                      <Button
                                        variant="contained"
                                        type='submit'
                                        color='primary'
                                        data-test="invite-button"
                                        align='center'
                                        className="w-100"
                                        disabled={ !(isValid && dirty) }
                                      >
                                          {t('Invite')}
                                      </Button>
                                    
                                  </div>
                              </form>
                          )
                        }
                      }
                        </Formik>
                    </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
  executingAddInvitation: state.InvitationReducer.executingAddInvitation,
  addInvitationCallSuccess: state.InvitationReducer.addInvitationCallSuccess
})

const mapDispatchtoProps = dispatch => {
  return {
    addInvitation: (payload,history) => dispatch(addInvitation(payload,history)),
  }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
  )(withStyles(useStyles)(withTranslation()(AddInvitation))) 