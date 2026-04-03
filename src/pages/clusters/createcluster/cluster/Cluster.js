import React, { Component } from 'react'
import {
    Button,
    withStyles,
    Grid,
    Typography,
    FormControl,
    MenuItem,
    Divider,
    FormControlLabel,
    Switch,
    Card,
    CardContent,
    Select, 
    CardHeader,
    InputAdornment,
    FormHelperText
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiTextField from "../../../../components/textfield/MuiTextField";
import { AppConstants } from "../../../../constants/appconstants"
import { validateRegex } from "../../../../helpers/utils" 
import ClusterRegistry from "../../ClusterRegistry";
import { withTranslation } from 'react-i18next';

const useStyles = () => ({
    actions: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom:'2rem'
    },

    selectbox: {
        height: 30
    },

    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        padding: '1rem',
    },

    continueButton: {
        marginTop: '2rem'
    },

    center: {
        justifyContent: 'center'
    }

});

class Cluster extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            cluster_name: "",
            cluster_version: "Select",
            
            zone: "Select",
            vpc_name: "",
            subnet_cidr_range: "Select",
            network_cidr: "Select",
            image_registry_id: 0,
            pvc_write_many: false,
            remove_default_node_pool: false,
            nfs_detail: {
                filestore_instance_name: "",
                filestore_tier: "Select",
                filestore_zone: "Select",
                filestore_capacity: ""
            },
            isClusterNameError: false,
            isVPCNameError: false,
            isFSInstanceNameError: false
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps) {
          if(this.props.isEditMode && !this.props.clusterDetails && nextProps.clusterDetails){
            this.setState({
                cluster_version: nextProps.clusterDetails.cluster_version
            })
          }
        }
    }

    handleContinue = () => {
        let data = {};
        if(this.props.isEditMode) {
            data.cluster_version = this.state.cluster_version
        }
        else {
            data.cluster_name = this.state.cluster_name
            data.cluster_version = this.state.cluster_version
            data.vpc_name = this.state.vpc_name
            data.pvc_write_many = this.state.pvc_write_many
            data.image_registry_id = this.state.image_registry_id
        
            if(this.props.completeData.provider === AppConstants.ClusterProvider.GCP)
            {
                
                data.zone = [ this.state.zone ];
                data.subnet_cidr_range = this.state.subnet_cidr_range;
                data.nfs_detail = this.state.nfs_detail;
                data.remove_default_node_pool = this.state.remove_default_node_pool;
            }
            else if(this.props.completeData.provider === AppConstants.ClusterProvider.EKS)
            {
                data.network_cidr = this.state.network_cidr;
            }
        }
        this.props.handleChange(this.state.currentStep + 1, data)
    }

    handleBack = () => {
        this.props.handleBack(this.state.currentStep - 1);
    }

    handleClusterNameChange = (e) => {
        if(validateRegex(e.target.value, e.currentTarget.getAttribute('regex')))
        {
            this.setState({
                cluster_name: e.target.value,
                isClusterNameError: false
            })
        }
        else{
            this.setState({
                cluster_name: e.target.value,
                isClusterNameError: true
            })
        }
    }

    handleClusterVersionChange = (e) => {
        this.setState({
            cluster_version: e.target.value
        })
    }

    handleZoneChange = (e) => {
        this.setState({
            zone: e.target.value
        })
    }

    handleVPCNameChange = (e) => {
        if(validateRegex(e.target.value, e.currentTarget.getAttribute('regex')))
        {
            this.setState({
                vpc_name: e.target.value,
                isVPCNameError: false
            })
        }
        else{
            this.setState({
                vpc_name: e.target.value,
                isVPCNameError: true
            })
        }
    }
    
    handleVPCCIDRChange = (e) => {
        this.setState({
            network_cidr: e.target.value
        })
    }

    handleSubnetCIDRChange = (e) => {
        this.setState({
            subnet_cidr_range: e.target.value
        })
    }

    handleRegistryChange = (value) => {
        this.setState({
            image_registry_id: value
        })
    }

    handlePVCWriteManyChange = (e) => {
        this.setState({
            pvc_write_many: e.target.checked
        })
    }
    handleRemoveDefaultNPChange = (e) => {
        this.setState({
            remove_default_node_pool: e.target.checked
        })
    }

    handleFileStoreChange = (e) => {
        const { nfs_detail } = this.state;
        if(e.target.name === "filestore_instance_name")
        {
            nfs_detail[e.target.name] = e.target.value
            if(validateRegex(e.target.value, e.currentTarget.getAttribute('regex')))
            {
                this.setState({
                    isFSInstanceNameError: false
                })
            }
            else{
                this.setState({
                    isFSInstanceNameError: true
                })
            }
        }
        else if(e.target.name === "filestore_capacity")
        {
            if(e.target.value > 0)
                nfs_detail[e.target.name] = e.target.value
        }
        else
            nfs_detail[e.target.name] = e.target.value
            
        this.setState({
            nfs_detail
        })
    }

    isLowerVersion = (ver) => {
        if(!this.props.isEditMode){
            return false
        }
        else{
            if(this.state.cluster_version > ver){
                return true
            }
            return false
        } 

    }

    isFormValid = () => {
        let valid = false;
        if(this.props.isEditMode) {
            if(this.state.cluster_version !== "Select") {
                valid = true;
            }
        }
        else {
            if(this.state.cluster_name.trim() !== "" && !this.state.isClusterNameError
                && this.state.cluster_version !== "Select"
                && this.state.vpc_name.trim() !== "" && !this.state.isVPCNameError)
            {
                if(this.props.completeData.provider === AppConstants.ClusterProvider.EKS)
                {
                    if(this.state.network_cidr !== "Select")
                        valid = true;
                }
                else if( this.props.completeData.provider === AppConstants.ClusterProvider.GCP)
                {
                    if(this.state.zone !== "Select" 
                        
                        && this.state.subnet_cidr_range !== "Select"
                    )
                    {
                        if(this.state.pvc_write_many)
                        {
                            const { nfs_detail } = this.state;
                            if(nfs_detail.filestore_instance_name !== "" && !this.state.isFSInstanceNameError
                                && nfs_detail.filestore_tier !== "Select"
                                && nfs_detail.filestore_zone !== "Select"
                                && nfs_detail.filestore_capacity !== ""
                            )
                                valid = true;
                        }
                        else
                            valid = true;
                    }
                }
            }
        }
        
        return !valid;    
    }

    render() {
        const { classes, completeData, providerConfig, t } = this.props;
        const properties = providerConfig && providerConfig.properties;
        const _zones = properties && properties.zone && properties.zone.items && properties.zone.items.filter(zn => zn.startsWith( completeData && completeData.region ));
        const fsProperties = properties && properties.filestore && properties.filestore.properties;
        
        if (this.props.activeStep !== this.state.currentStep) {
            return null
        }

        return (
            <div>

                <Grid container justify="center" alignItems="center" spacing={2}>
                    <Grid item md={10} >
                        <Card>

                            <CardContent>
                                <Grid container spacing={2}>
                                    {
                                    !this.props.isEditMode && 
                                    <Grid item md={6}>
                                        <Grid container direction="column">
                                            <Grid item className={classes.branchInfo}>
                                                <Typography variant='h5'> {t('Cluster.ClusterPage.clusterName')} </Typography>
                                            </Grid>
                                            <Grid item>
                                                <MuiTextField
                                                  name="cluster_name"
                                                  value={ this.state.cluster_name }
                                                  onChange = { (e) => this.handleClusterNameChange(e)}
                                                  type="text"
                                                  margin="normal"
                                                  inputProps = {{
                                                        regex: properties && properties.cluster_name && properties.cluster_name.validation 
                                                    }}
                                                  error = { this.state.isClusterNameError }
                                                  helperText = { this.state.isClusterNameError && properties && properties.cluster_name && properties.cluster_name.description }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                }
                                    <Grid item md={6}>
                                        <Grid container direction="column">
                                            <Grid item className={classes.branchInfo}>
                                                <Typography variant='h5'> {t('Cluster.ClusterPage.clusterVersion')}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <FormControl className="w-100" error={""} variant="outlined" margin="normal">
                                                    <Select
                                                      name="cluster_version"
                                                      value={ this.state.cluster_version }
                                                      onChange = { (e) => this.handleClusterVersionChange(e)}
                                                      color='primary'
                                                      MenuProps={{
                                                            getContentAnchorEl: null,
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem value="Select"> {t('Cluster.ClusterPage.selectVersion')} </MenuItem>
                                                        {
                                                            properties && properties.cluster_version && properties.cluster_version.items && properties.cluster_version.items.length > 0 &&
                                                        properties.cluster_version.items.map( (version, ind) => <MenuItem value={version} disabled={this.isLowerVersion(version)} key={ ind } >{version} { this.props.isEditMode && this.props.clusterDetails?.cluster_version === version ? "(current)" : "" }
                                                            
                                                                                                                </MenuItem>) 
                                                        }
                                                    </Select>
                                                    
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    {
                                    this.props.isEditMode && 
                                    <Grid item md={12}>
                                        <p>{t('Cluster.ClusterPage.note')}</p>
                                        <p>{t('Cluster.ClusterPage.operation')}</p>
                                    </Grid>    
                                }

                                {
                                    !this.props.isEditMode && 
                                    <>
                                        {
                                        completeData && completeData.provider === AppConstants.ClusterProvider.GCP &&
                                        <Grid item md={6}>
                                            <Grid container direction="column">
                                                <Grid item className={classes.branchInfo}>
                                                    <Typography variant='h5'>{t('Cluster.ClusterDNS.zone')}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <FormControl className="w-100" error={""} variant="outlined"   margin="normal">
                                                        <Select
                                                          name='zone'
                                                          value={ this.state.zone }
                                                          color='primary'
                                                          onChange={(e) => this.handleZoneChange(e)}
                                                          MenuProps={{
                                                                getContentAnchorEl: null,
                                                                anchorOrigin: {
                                                                    vertical: "bottom",
                                                                    horizontal: "left"
                                                                }
                                                            }}
                                                        >
                                                            <MenuItem value="Select">{t('Cluster.ClusterDNS.selectZone')}</MenuItem>
                                                            
                                                            {
                                                                _zones && _zones.length > 0 && _zones.map((zn,ind) => <MenuItem value={ zn } key={ ind } >{ zn }</MenuItem>)
                                                            }
                                                        </Select>
                                                        <FormHelperText>{ properties && properties.zone && properties.zone.description }</FormHelperText>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    }

                                        {
                                        completeData && completeData.provider === AppConstants.ClusterProvider.GCP &&
                                        <Grid item md={6}>
                                            <Grid container direction="column">
                                                <Grid item className={classes.branchInfo}>
                                                    <Typography variant='h5'>{t('Cluster.ClusterDNS.projectId')}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <MuiTextField
                                                        
                                                      value={ completeData.project_id }
                                                        
                                                      margin="normal"
                                                      type="text"
                                                      disabled
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    }
                                        {
                                        completeData && completeData.provider === AppConstants.ClusterProvider.EKS &&
                                        <Grid item md={6}>
                                            <Grid container direction="column">
                                                <Grid item className={classes.branchInfo}>
                                                    <Typography variant='h5'>{t('Cluster.ClusterDNS.region')}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <MuiTextField
                                                        
                                                      value={ completeData.region }
                                                        
                                                      margin="normal"
                                                      type="text"
                                                      disabled
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    }
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item md={6}>
                                                    <Grid container direction="column">
                                                        <Grid item className={classes.branchInfo}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterPage.vpcName')}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <MuiTextField
                                                              name="vpc_name"
                                                              value={ this.state.vpc_name }
                                                              onChange = { (e) => this.handleVPCNameChange(e)}
                                                              margin="normal"
                                                              type="text"
                                                              inputProps = {{
                                                                regex: properties && properties.vpc_name && properties.vpc_name.validation 
                                                            }}
                                                              error = { this.state.isVPCNameError }
                                                              helperText = { this.state.isVPCNameError && properties && properties.vpc_name && properties.vpc_name.description }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            
                                                {
                                                completeData && completeData.provider === AppConstants.ClusterProvider.GCP &&
                                                <Grid item md={6}>
                                                    <Grid container direction="column">
                                                        <Grid item className={classes.branchInfo}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterPage.subnetCIDRRange')}</Typography>
                                                            
                                                        </Grid>
                                                        <Grid item>
                                                            <FormControl className="w-100" error={""} variant="outlined"   margin="normal">
                                                                <Select
                                                                  name='subnet_cidr_range'
                                                                  value={ this.state.subnet_cidr_range }
                                                                  color='primary'
                                                                  onChange={(e) => this.handleSubnetCIDRChange(e)}
                                                                  MenuProps={{
                                                                        getContentAnchorEl: null,
                                                                        anchorOrigin: {
                                                                            vertical: "bottom",
                                                                            horizontal: "left"
                                                                        }
                                                                    }}
                                                                >
                                                                    <MenuItem value="Select">{t('Cluster.ClusterPage.selectCIDRRange')}</MenuItem>
                                                                    {
                                                                        properties && properties.subnet_cidr_range && properties.subnet_cidr_range.items && properties.subnet_cidr_range.items.length > 0 &&
                                                                        properties.subnet_cidr_range.items.map((item, ind) => <MenuItem value={item} key={ ind }>{item}</MenuItem>) 
                                                                    }
                                                                </Select>
                                                                <FormHelperText>{ properties && properties.subnet_cidr_range && properties.subnet_cidr_range.description }</FormHelperText>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            }
                                                {
                                                completeData && completeData.provider === AppConstants.ClusterProvider.EKS &&
                                                <Grid item md={6}>
                                                    <Grid container direction="column">
                                                        <Grid item className={classes.branchInfo}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterPage.vpcCIDRRange')}</Typography>
                                                            
                                                        </Grid>
                                                        <Grid item>
                                                            <FormControl className="w-100" error={""} variant="outlined"   margin="normal">
                                                                <Select
                                                                  name='network_cidr'
                                                                  value={ this.state.network_cidr }
                                                                  color='primary'
                                                                  onChange={(e) => this.handleVPCCIDRChange(e)}
                                                                  MenuProps={{
                                                                        getContentAnchorEl: null,
                                                                        anchorOrigin: {
                                                                            vertical: "bottom",
                                                                            horizontal: "left"
                                                                        }
                                                                    }}
                                                                >
                                                                    <MenuItem value="Select">{t('Cluster.ClusterPage.selectCIDRRange')}</MenuItem>
                                                                    {
                                                                        properties && properties.network_cidr && properties.network_cidr.items && properties.network_cidr.items.length > 0 &&
                                                                        properties.network_cidr.items.map((item, ind) => <MenuItem value={item} key={ ind }>{item}</MenuItem>)
                                                                    }
                                                                </Select>
                                                                
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            }
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6}>
                                                <ClusterRegistry isCreateMode={true} handleRegistryChange={ this.handleRegistryChange} isInForm />
                                        </Grid>
                                        {
                                        completeData && completeData.provider === AppConstants.ClusterProvider.GCP &&
                                        <Grid item md={12} sm={6} xs={12} >
                                            <FormControlLabel
                                              control={
                                                  <Switch
                                                    name="remove_default_node_pool"
                                                    color="primary"
                                                    checked={ this.state.remove_default_node_pool }
                                                    onChange={ (e) => this.handleRemoveDefaultNPChange(e) }
                                                  />
                                                }
                                              label={t('Cluster.ClusterPage.removeNode')}
                                            />
                                        </Grid>
                                    }
                                        <Grid item md={12} sm={6} xs={12} >
                                            <FormControlLabel
                                              control={
                                                  <Switch
                                                    name="pvc_write_many"
                                                    color="primary"
                                                    checked={this.state.pvc_write_many}
                                                    onChange={ (e) => this.handlePVCWriteManyChange(e) }
                                                  />
                                            }
                                              label={t('Cluster.ClusterPage.pvcWriteMany')}
                                            />
                                        </Grid>
                                    </>
                                    }
                                    
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {
                        !this.props.isEditMode && completeData && completeData.provider === AppConstants.ClusterProvider.GCP && this.state.pvc_write_many && 

                        <Grid item md={10} >
                            <Card>
                                <CardHeader title={t('Cluster.ClusterPage.fileStore')} />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                            <Typography variant='h5'>{t('Cluster.ClusterPage.instanceName')}</Typography>
                                            <label></label>
                                            <MuiTextField
                                              name="filestore_instance_name"
                                              value={ this.state.nfs_detail.filestore_instance_name }
                                              onChange = { (e) => this.handleFileStoreChange(e)}
                                              customClassName="oneRemMarginBottomSeperator"
                                              type="text"
                                              margin="normal"
                                              inputProps = {{
                                                    regex: fsProperties && fsProperties.filestore_instance_name && fsProperties.filestore_instance_name.validation 
                                                }}
                                              error = { this.state.isFSInstanceNameError }
                                              helperText = { this.state.isFSInstanceNameError && fsProperties && fsProperties.filestore_instance_name && fsProperties.filestore_instance_name.description }
                                            />
                                        </Grid>

                                        <Grid item md={6}>
                                            <Typography variant='h5'>{t('Cluster.ClusterPage.tier')}</Typography>
                                            <FormControl className="w-100" error={""} variant="outlined"  margin="normal">
                                                <Select
                                                  name='filestore_tier'
                                                  value={ this.state.nfs_detail.filestore_tier }
                                                  color='primary'
                                                  onChange={(e) => this.handleFileStoreChange(e)}
                                                  MenuProps={{
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left"
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="Select">{t('Cluster.ClusterPage.selectTier')}</MenuItem>
                                                    {
                                                        fsProperties && fsProperties.filestore_tier && fsProperties.filestore_tier.items && fsProperties.filestore_tier.items.length > 0 &&
                                                        fsProperties.filestore_tier.items.map((item, ind) => <MenuItem value={item} key={ ind }>{item}</MenuItem>)
                                                    }
                                                </Select>
                                                
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={6}>
                                            <Typography variant='h5'>{t('Cluster.ClusterDNS.zone')}</Typography>
                                            <FormControl className="w-100" error={""} variant="outlined"  margin="normal">
                                                <Select
                                                  name='filestore_zone'
                                                  value={ this.state.nfs_detail.filestore_zone }
                                                  color='primary'
                                                  onChange={(e) => this.handleFileStoreChange(e)}
                                                  MenuProps={{
                                                        getContentAnchorEl: null,
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left"
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value="Select">{t('Cluster.ClusterDNS.selectZone')}</MenuItem>
                                                    
                                                    {
                                                        _zones && _zones.length > 0 && _zones.map((zn, ind) => <MenuItem value={ zn } key={ ind }>{ zn }</MenuItem>)
                                                    }
                                                </Select>
                                                
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={6}>
                                            <Typography variant='h5'>{t('Cluster.ClusterPage.capacity')}</Typography>
                                            <MuiTextField
                                              name="filestore_capacity"
                                              value={ this.state.nfs_detail.filestore_capacity }
                                              onChange = { (e) => this.handleFileStoreChange(e)}
                                              customClassName="oneRemMarginBottomSeperator"
                                              type="number"
                                              margin="normal"
                                              InputProps={{
                                                    endAdornment: <InputAdornment position="end">TB</InputAdornment>,
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    }
                </Grid>

                <div className={classes.actions}>
                    <Grid container className={classes.continueButton} justify="center" spacing={2}>
                        {
                            !this.props.isEditMode &&
                            <Grid item xl={1} md={2} xs={6}>
                                <Button variant="contained" color='primary' onClick={() => this.handleBack()} fullWidth>
                                {t('App.CreateApp.back')}
                                </Button>
                            </Grid>
                        }
                        <Grid item xl={1} md={2} xs={6}>
                            <Button variant="contained" color='primary' onClick={() => this.handleContinue()} fullWidth disabled = { this.isFormValid() }>
                                {t('Cluster.ClusterPage.continue')}
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapDispatchtoProps = () => {
    return {

    }
}

const mapStateToProps = (state) => {
    return {
        providerConfig: state.ClusterReducer.providerConfig,
        clusterDetails: state.ClusterReducer.clusterDetails
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(
    compose(
        withStyles,
    )(useStyles)(withTranslation()(Cluster))
)
