import React, { Component } from 'react'
import {
    Button,
    withStyles,
    Grid,
    Paper,
    Typography,
    FormControl,
    MenuItem,
    Card,
    TextField,
    CardContent,
    Select,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText
} from '@material-ui/core';
import { connect } from 'react-redux';
import ProviderPermissions from './ProviderPermissions'
import { compose } from 'redux';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { AppConstants } from "../../../../constants/appconstants"
import { ClusterProviders } from '../../../../constants/clusterconstants';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InfoIcon from '@material-ui/icons/Info';
import BackdropLoader from '../../../../components/loader/BackdropLoader'
import { validatePermission, getProviderConfig } from '../../redux/actions'
import { withTranslation } from 'react-i18next'

const useStyles = () => ({
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom:'2rem'
    },
    container: {
        marginTop: 20,
        minHeight: '20rem',
    },
    
    selectbox: {
        height: 30
    },
    formControl: {
        minWidth: '90%',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        padding: '1rem',
    },

    continueButton: {
        marginTop: '1rem'
    },
    logo: {
        height: 150,
        width: 'auto',
        objectFit: 'cover',
        padding: '10px 0'
    },
    center: {
        justifyContent: 'center'
    },
    root: {
        marginTop: 0
    },
    paperContainer: {
        height: 180,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0
    },
    icon: {
        fontSize: 100
    },
    iconContainer: {
        width: '100%',
        height: 180,
        padding:0
    },
    selectTemplateTypography: {
        marginTop: '1rem',
        textTransform: 'none'
    },
    checkselect: {
        position: 'absolute',
        top: 20,
        right: 15,

    },
    branchInfo: {
        display: 'flex',
        alignItems: 'center'
    }
});

class Provider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            
            provider: "",
            region: "Select",
            access_key: "",
            secret_key: "",
            isShowAccessKey: false,
            isShowSecretKey: false,
            selectedFile: null,
            permissionStatus: false,
            permissionCount: { hasPermission: 0, noPermission : 0 },
            project_id: ''
        }
    }
    
    handleContinue = () => {
        
        const data = { 
            provider: this.state.provider,
            region: this.state.region,
            access_key: this.state.access_key,
            secret_key: this.state.secret_key,
            credentials: this.props.gcpFilePath,
            project_id: this.state.project_id
        };
        this.props.handleChange(this.state.currentStep + 1, data)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps) {
          if(!this.props.validationData && nextProps.validationData){
            const permissionCount = {
                hasPermission: nextProps.validationData.has_permission ? nextProps.validationData.has_permission.length : 0,
                noPermission: nextProps.validationData.no_permission ? nextProps.validationData.no_permission.length : 0
            }
            this.setState({
                permissionCount,
                permissionStatus : permissionCount.noPermission === 0 ? true : false
            })
          }
        }
    }

    handleProviderSelection = (item) => {
        this.props.getProviderConfig(item.provider);
        this.setState({
            provider: item.provider,
            region: "Select",
            access_key: "",
            secret_key: "",          
            selectedFile: null,
            permissionStatus: false,
            permissionCount: { hasPermission: 0, noPermission : 0 }  
        })
    }

    handleAccessKeyChange = (e) => {
        this.setState({
            access_key: e.target.value
        })
    }

    handleShowAccessKey = () => {
        this.setState({
            isShowAccessKey: !this.state.isShowAccessKey
        })
    }
    
    handleSecretKeyChange = (e) => {
        this.setState({
            secret_key: e.target.value
        })
    }

    handleShowSecretKey = () => {
        this.setState({
            isShowSecretKey : !this.state.isShowSecretKey
        })
    }

    handleRegionChange = (e) => {
        
        this.setState({
            region: e.target.value
        })
    }

    handleValidate = () => {
        let jsonBody = {
            provider:  this.state.provider,
            region : this.state.region
        };
        let uploadBody = null;
        
        if(this.state.provider === AppConstants.ClusterProvider.EKS)
        {
            jsonBody.access_key = this.state.access_key;
            jsonBody.secret_key = this.state.secret_key;
        }
        else if (this.state.provider === AppConstants.ClusterProvider.GCP)
        {
            uploadBody = new FormData(); 
            uploadBody.append('file_name', this.state.selectedFile.name);
            
            uploadBody.append('file_type', "json"); 
            uploadBody.append('file', this.state.selectedFile);
        }
        this.props.validatePermission(jsonBody, uploadBody);
    }
    
    onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const _file = e.target.files[0];
            if (_file) { 
                this.setState({
                    selectedFile: _file
                });
                var reader = new FileReader();
                const $this = this; 
                reader.onload = function(event) {
                    try {
                        if(event.target.result)
                        {
                           const _jsonFile = JSON.parse(event.target.result)
                           if(_jsonFile)
                           {
                               $this.setState({ project_id : _jsonFile.project_id })
                           }
                        } 
                    }
                    catch (err) {
                        /* empty */
                    }
                };
                reader.readAsText(_file);
            }
            else {
                /* empty */
            }
        }
    };

    isFormValid = () => {
        let valid = false;
        if(this.state.region !== "Select") {
            if( this.state.provider === AppConstants.ClusterProvider.EKS)
            {
                if(this.state.access_key.trim() !== "" && this.state.secret_key.trim() !== "")    
                    valid = true;
            }
            else if( this.state.provider === AppConstants.ClusterProvider.GCP)
            {
                if(this.state.selectedFile)
                    valid = true;
            }
        }
        return !valid;    
    }
    
    render() {
        const { classes, validationData, providerConfig, t } = this.props;
        const _region = providerConfig && providerConfig.properties && providerConfig.properties.region;
        if (this.props.activeStep !== this.state.currentStep) {
            return null
        }
        return (
            <div>
                <Grid container spacing={2} className={classes.root}>
                    {
                        ClusterProviders && ClusterProviders.length > 0 && ClusterProviders.map((item, index) => (
                            <Grid item xs={12} md={2} key={ index }>
                                <Button className={ classes.iconContainer } onClick={() => this.handleProviderSelection(item) } disabled = {this.state.permissionStatus} >
                                    <Paper className={classes.paperContainer}>
                                        {
                                            this.state.provider === item.provider && 
                                            <CheckCircleIcon color="primary" className={classes.checkselect} />
                                        }
                                        <div  >
                                            <img src={ item.image } width="80px" alt=""/>
                                        </div>
                                        <Typography className={classes.selectTemplateTypography} variant="h6" color="textPrimary">
                                            {item.name}
                                        </Typography>
                                    </Paper>
                                </Button>
                            </Grid>
                        ))
                    }

                    <Grid item xs={12} md={2}>
                        <Button className={classes.iconContainer}>
                            <Paper className={classes.paperContainer}>

                                <div className="ribbon ribbon-top-right"><span>{t('Cluster.Provider.comingSoon')}</span></div>
                                <div>
                                    <img src="/images/provider/aks.svg" width="80px" alt=""/>
                                </div>
                                <Typography className={classes.selectTemplateTypography} variant="h6" color="textPrimary">
                                {t('Cluster.Provider.azure')}
                                </Typography>
                            </Paper>
                        </Button>
                    </Grid>

                    {
                        this.state.provider !== "" &&
                        <Grid item xs={12} md={12}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        {
                                            this.state.provider === AppConstants.ClusterProvider.EKS &&
                                            <Grid item xs={ 12 }>
                                                <Grid container spacing={3}>
                                                    <Grid item sm={6} xs={12}>
                                                        <Grid container direction="column" spacing={2}>
                                                            <Grid item className={classes.branchInfo}>
                                                                <Typography variant='h5'> {t('Cluster.Provider.accessKey')} </Typography>
                                                                <InfoIcon color='primary'
                                                                  aria-describedby="webhook_pop"
                                                                    
                                                                />
                                                            </Grid>
                                                            <Grid item>
                                                                <TextField style={{width:"0px", height:"0px"}}/>
                                                                <OutlinedInput
                                                                  value={this.state.access_key}
                                                                  variant="outlined"
                                                                    
                                                                  fullWidth
                                                                  margin="normal"
                                                                  name="access_key"
                                                                  type={ this.state.isShowAccessKey ? "text" : "password" }
                                                                  onChange={ (e) => this.handleAccessKeyChange(e) }
                                                                  disabled={this.state.permissionStatus}
                                                                  endAdornment={
                                                                      <>
                                                                          <InputAdornment position="end">
                                                                              <IconButton
                                                                                aria-label="toggle visibility"
                                                                                onClick={() => this.handleShowAccessKey() }
                                                                                edge="end"
                                                                              >
                                                                                  {this.state.isShowAccessKey ? <Visibility /> : <VisibilityOff /> }
                                                                              </IconButton>
                                                                          </InputAdornment>
                                                                      </>
                                                                    }
                                                                >
                                                                </OutlinedInput>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item sm={6} xs={12}>
                                                        <Grid container direction="column" spacing={2}>
                                                            <Grid item className={classes.branchInfo}>
                                                                <Typography variant='h5' > {t('Cluster.Provider.secretKey')} </Typography>
                                                                <InfoIcon color='primary'
                                                                  aria-describedby="webhook_pop"
                                                                    
                                                                />
                                                            </Grid>
                                                            <Grid item >
                                                                <OutlinedInput
                                                                  value={this.state.secret_key}
                                                                  variant="outlined"
                                                                    
                                                                  margin="normal"
                                                                  fullWidth
                                                                  name="secret_key"
                                                                  type={ this.state.isShowSecretKey ? "text" : "password" }
                                                                  onChange={ (e) => this.handleSecretKeyChange(e) }
                                                                  disabled={this.state.permissionStatus}
                                                                  endAdornment={
                                                                      <>
                                                                          <InputAdornment position="end">
                                                                              <IconButton
                                                                                aria-label="toggle visibility"
                                                                                onClick={() => this.handleShowSecretKey() }
                                                                                edge="end"
                                                                              >
                                                                                  {this.state.isShowSecretKey ? <Visibility /> : <VisibilityOff /> }
                                                                              </IconButton>
                                                                          </InputAdornment>
                                                                      </>
                                                                    }
                                                                >
                                                                </OutlinedInput>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        }
                                        {
                                            this.state.provider === AppConstants.ClusterProvider.GCP &&
                                            <Grid item md={6} xs={12}>
                                                <Typography variant='h5' > {t('Cluster.Provider.serviceAccount')} </Typography>
                                                <TextField
                                                  id=""
                                                  type="file"
                                                  title=""
                                                  color="primary"
                                                  name=""
                                                  variant="outlined"
                                                  className="w-100"
                                                  margin="normal"
                                                  onChange={this.onFileChange}
                                                  disabled={this.state.permissionStatus}
                                                />
                                            </Grid>
                                        }
                                        <Grid item xs={12} md={6}>
                                            <Grid container direction="column">
                                                <Grid item className={classes.branchInfo}>
                                                    <Typography variant='h5'> {t('Cluster.Provider.region')} </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <FormControl className="w-100" error={""} variant="outlined" margin="normal">
                                                        <Select
                                                          name='region'
                                                          value={ this.state.region }
                                                          color='primary'
                                                          onChange={(e) => this.handleRegionChange(e)}
                                                          disabled={this.state.permissionStatus}
                                                          MenuProps={{
                                                            getContentAnchorEl: null,
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            }
                                                        }}
                                                        >
                                                            <MenuItem value="Select"> {t('Cluster.Provider.selectRegion')}</MenuItem>
                                                            
                                                            {
                                                            _region && _region.items && _region.items.length > 0 &&
                                                            _region.items.map((reg, ind) =>  <MenuItem value={ reg } key={ ind }>{ reg }</MenuItem>)
                                                        }
                                                        </Select>
                                                        <FormHelperText >{ _region && _region.description }</FormHelperText>
                                                        
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    }
                </Grid>

                <ProviderPermissions validationData={ validationData } provider={this.state.provider} />
                { this.props.isValidatingPermission && <BackdropLoader message={t('Cluster.Provider.validatingPermission')} />}
                {
                    <div className={classes.actions}>
                        <Grid container className={classes.continueButton} justify="center" spacing={2}>
                            {
                                this.state.provider !== "" && !this.state.permissionStatus &&
                                <Grid item xl={1} md={2} xs={6}>
                                    <Button variant="contained" color='primary' fullWidth onClick={() => this.handleValidate()} disabled = { this.isFormValid() }>
                                        { this.state.permissionCount.noPermission > 0 ? t('Cluster.Provider.reValidate') : t('Cluster.Provider.validate') }
                                    </Button>
                                </Grid>
                            }
                            {
                                this.state.permissionStatus &&
                                <Grid item lg={1} md={2} xs={6}>
                                    <Button variant="contained" color='primary' fullWidth onClick={() => this.handleContinue()}>
                                        {t('Cluster.Provider.continue')}
                                    </Button>
                                </Grid>
                            }
                        </Grid>
                    </div>
                }
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        validatePermission: (jsonBody, uploadBody) => dispatch(validatePermission(jsonBody, uploadBody)),
        getProviderConfig: (provider) => dispatch(getProviderConfig(provider))
    }
}

const mapStateToProps = (state) => {
    return {
        validationData: state.ClusterReducer.validationData,
        isValidatingPermission: state.ClusterReducer.isValidatingPermission,
        gcpFilePath: state.ClusterReducer.gcpFilePath,
        providerConfig: state.ClusterReducer.providerConfig
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(
    compose(
        withStyles,
    )(useStyles)(withTranslation()(Provider))
)