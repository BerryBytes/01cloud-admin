import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    Typography,
    Slide,
    Button,
    TextField,
    Grid,
    DialogTitle,
    DialogActions,
    FormControl,
    Select,
    MenuItem,
    FormHelperText
} from "@material-ui/core";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { ClusterProviders } from "../../constants/clusterconstants"
import { AppConstants } from "../../constants/appconstants"
import { getProviderConfig, importCluster, updateCluster } from './redux/actions'
import MuiTextField from "../../components/textfield/MuiTextField";
import MultiValueChipInput from "../../components/emailinput/MultiValueChipInput";
import { validateRegex } from "../../helpers/utils" 
import ClusterRegistry from './ClusterRegistry';
import { useTranslation } from 'react-i18next';

const transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const generalRegex  = "^[a-z0-9-]*$"
const generalHelperText = "Allowed only lowercase characters, numbers and hyphen"

const ClusterImportPopup = (props) => {
    const [provider, setProvider] = useState("Select");
    const [name, setName] = useState("");
    
    const [properties, setProperties] = useState(null);
    const [region, setRegion] = useState("Select");
    const [regionList, setRegionList] = useState(null);
    const [zone, setZone] = useState("Select");
    const [zoneList, setZoneList] = useState(null);
    const [labels, setLabels] = useState([]);
    
    const [errors, setErrors] = useState({});
    const [helperTexts, setHelperTexts] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [providerName, setProviderName] = useState("");
    const [registry, setRegistry] = useState(0);
    const [ t ] = useTranslation();

    const handleClose = () => {
        props.closeHandler();
    };

    const handleSuccessImport = (data) => {
        props.successHandler(data);
    }

    const handleImport = () => {
        const _labels = labels.join(',')
        let jsonBody
        let _provider = provider
        if(provider === AppConstants.ClusterProvider.Other){
            _provider = providerName
        }
        if(!props.edit){
            jsonBody = new FormData(); 
            jsonBody.append("provider", _provider);
            jsonBody.append("name", name);
            jsonBody.append("region", region);
            jsonBody.append("zone", zone !== "Select" ? zone : "");
            jsonBody.append("labels", _labels);
            
            jsonBody.append('image_registry_id', registry);
            jsonBody.append('dns_zone', "");

            jsonBody.append('file', selectedFile);
            props.importCluster(jsonBody, handleSuccessImport);
        }else if(props.edit){
            jsonBody = {
                provider: _provider,
                cluster_name: name,
                region:region,
                zone: zone === "Select" ? "" : zone,
                labels: _labels,
                image_registry_id: registry,
                
                dns_zone: "",
            }
            props.updateCluster(props.cluster?.id, jsonBody, props.edit, handleSuccessImport)
        }
    };

    const handleProviderChange = (e) => {
        setProvider(e.target.value);
        
        setRegion("Select")
        setZone("Select")
    }

    const handleClusterNameChange = (e) => {
        setName(e.target.value);
        
        let regx
        if(properties?.cluster_name?.validation){
            regx = properties?.cluster_name?.validation
        }else{
            regx = generalRegex
        }
        setErrors({
            ...errors,
            [e.target.name] : validateRegex(e.target.value, regx) ? false : true
        })
        setHelperTexts({
            ...helperTexts,
            [e.target.name]:  !validateRegex(e.target.value, regx) ? properties?.cluster_name?.description ? properties?.cluster_name?.description  : generalHelperText : ""
        })
        
    }

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const _file = e.target.files[0];
            if (_file) { 
                setSelectedFile(_file)
            }
        }
    }

    useEffect(() => {
        if(props.providerConfig)
        {
            const _properties = props.providerConfig && props.providerConfig.properties;
            setProperties(_properties);
            setRegionList(_properties.region);
        }
    }, [props.providerConfig]);

    useEffect(() => {
        if(props.cluster && props.edit){
            setProvider(props.cluster?.provider ? props.cluster?.provider : props.cluster?.cluster?.provider)
            setRegion(props.cluster?.region ? props.cluster?.region : props.cluster?.cluster?.region)
            setName(props.cluster.cluster_name)
            setZone(props.cluster?.zone ? props.cluster?.zone : props.cluster?.cluster?.zone)
            if(props.cluster.cluster?.labels?.trim().length){
                setLabels(props.cluster.cluster?.labels?.split(','))
            }
        }
    }, [props.edit, props.cluster])

    useEffect(() => {
        if(provider !== "Select" && provider !==  AppConstants.ClusterProvider.Other){
            props.getProviderConfig(provider);
        }
        if(provider === AppConstants.ClusterProvider.Other){
            
            setRegion("")
            setZone ("")
            
        }
    }, [provider])

    useEffect(() => {
        let regx
        if(properties?.zone?.validation){
            regx = properties?.zone?.validation
        }else{
            regx = generalRegex
        }
        setErrors({
            ...errors,
            zone : validateRegex(zone, regx) ? false : true
        })
        setHelperTexts({
            ...helperTexts,
            zone:  !validateRegex(zone, regx) ? properties?.zone?.description ? properties?.zone?.description  : generalHelperText : ""
        })
    }, [zone])

    useEffect(() => {
        let regx
        if(properties?.provider?.validation){
            regx = properties?.provider?.validation
        }else{
            regx = generalRegex
        }
        setErrors({
            ...errors,
            providerName : validateRegex(providerName, regx) ? false : true
        })
        setHelperTexts({
            ...helperTexts,
            providerName:  !validateRegex(providerName, regx) ? properties?.provider?.description ? properties?.provider?.description  : generalHelperText : ""
        })
    }, [providerName])

    useEffect(() => {
        let regx
        if(properties?.region?.validation){
            regx = properties?.region?.validation
        }else{
            regx = generalRegex
        }
        setErrors({
            ...errors,
            region : validateRegex(region, regx) ? false : true
        })
        setHelperTexts({
            ...helperTexts,
            region:  !validateRegex(region, regx) ?( properties?.region?.description ? properties?.region?.description  : generalHelperText) : ""
        })
        
        if(region === "Select"){
            setZoneList(null);
        }
        else {
            if(properties && properties.zone)
            {
                setZoneList(properties.zone.items && properties.zone.items.filter(zn => zn.startsWith( region )));        
            }
        }
        
    }, [region, properties]);

    useEffect(() => {
        if(props.edit){
            const z = zoneList?.find(_z => {return props.cluster?.cluster?.zone === _z})
            if(z){
                setZone(props.cluster?.cluster?.zone)
            }else if(zoneList && zoneList[0]){
                setZone(zoneList[0])
            }
        }else if(provider !== AppConstants.ClusterProvider.Other){
            setZone("Select")
        }
    }, [zoneList])

    const isFormValid = () => {
        let valid = false;
        let e  = false
        Object.keys(errors).forEach(k => {
            if(errors[k]){
                e = true
                return
            }
        })
        if(name.trim() !== "" 
            && provider !== "Select"
            && region !== "Select"
            && labels !== "" 
            && !e
            && (selectedFile || props.edit))
        {
            if( provider === AppConstants.ClusterProvider.GCP)
            {
                if(zone !== "Select")
                {
                    valid = true;
                }
            }
            else {
                valid = true;
            }
        }
        return !valid;    
    }

    const handleLabelsChange = (newLabels) => {
        setLabels(newLabels)
    }

    const handleRegistryChange = (value) => {
        setRegistry(value);
    }

    return (
        <Dialog
          open={props.open}
          TransitionComponent={transition}
          onClose={handleClose}
          keepMounted
        >
            <DialogTitle>
                <Typography className="dialogtitle">{t('Cluster.ClusterImportPopup.importCluster')}</Typography>

                <IconButton
                  aria-label="close"
                  size="small"
                  className="right"
                  onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Grid>
                    <Grid container spacing={1}>
                        <Grid xs={12}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={ provider !== "Select" ? "6" : "12" }>
                                    <Typography variant='h5' >{t('Cluster.ClusterDNS.provider')}</Typography>

                                    <FormControl className="w-100" error={""} variant="outlined" margin="normal">
                                        <Select
                                          name='provider'
                                          value={ provider }
                                          color='primary'
                                          onChange={(e) => handleProviderChange(e)}
                                          MenuProps={{
                                                getContentAnchorEl: null,
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "left"
                                                }
                                            }}
                                        >
                                            <MenuItem value="Select">{t('Cluster.ClusterDNS.selectProvider')}</MenuItem>
                                        
                                            {
                                                ClusterProviders && ClusterProviders.length > 0 && ClusterProviders.map((item, ind) => 
                                                    <MenuItem value={ item.provider } key={ ind }>{ item.name }</MenuItem>
                                                    )
                                                }
                                            <MenuItem value="other">{t('Cluster.ClusterImportPopup.other')}</MenuItem>
                                        </Select>
                                        
                                    </FormControl>
                                </Grid>
                                {
                                    provider !== "Select" && 
                                    <>
                                        <Grid item xs={12} md="6">
                                            <Typography variant='h5' >{t('Cluster.ClusterImportPopup.clusterName')}</Typography>

                                            <MuiTextField
                                              name="name"
                                              value={ name }
                                              onChange = { (e) => handleClusterNameChange(e)}
                                              type="text"
                                              margin="normal"
                                              inputProps = {{
                                                    regex: properties && properties.cluster_name && properties.cluster_name.validation 
                                                }}
                                              error = { errors.name}
                                              helperText = {
                                                    helperTexts.name
                                                    
                                                    }
                                              placeholder={"Cluster Name"}

                                            />

                                        </Grid>
                                        {provider ===  AppConstants.ClusterProvider.Other &&
                                            <Grid item xs={12} md="12">
                                                <Typography variant='h5' >{t('Cluster.ClusterImportPopup.providerName')}</Typography>

                                                <MuiTextField
                                                  name="providerName"
                                                  value={ providerName }
                                                  onChange = { (e) => setProviderName(e.target.value)}
                                                  type="text"
                                                  margin="normal"
                                                  inputProps = {{
                                                        regex: properties && properties.cluster_name && properties.cluster_name.validation 
                                                    }}
                                                  error = { errors.providerName}
                                                  helperText= { helperTexts.providerName}
                                                    
                                                  placeholder={"Provider Name"}

                                                />

                                            </Grid>
                                        }

                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h5' >{t('Cluster.ClusterDNS.region')}</Typography>
                                            { provider !== AppConstants.ClusterProvider.Other && (
                                                <FormControl className="w-100" error={""} variant="outlined" margin="normal">
                                                    <Select
                                                      name='region'
                                                      value={ region }
                                                      color='primary'
                                                      onChange={ (e) => setRegion(e.target.value) }
                                                      MenuProps={{
                                                            getContentAnchorEl: null,
                                                            anchorOrigin: {
                                                                vertical: "bottom",
                                                                horizontal: "left"
                                                            }
                                                        }}
                                                    >
                                                        <MenuItem value="Select">{t('Cluster.ClusterDNS.selectRegion')}</MenuItem>
                                                        {
                                                            regionList && regionList.items && regionList.items.length > 0 &&
                                                            regionList.items.map((reg, ind) => <MenuItem value={ reg } key={ ind }>{ reg }</MenuItem>)
                                                        }
                                                    </Select>
                                                    <FormHelperText >{ regionList && regionList.description }</FormHelperText>
                                                </FormControl>

                                            ) }
                                            { provider === AppConstants.ClusterProvider.Other &&
                                            (
                                                <MuiTextField 
                                                  className="w-100" 
                                                  variant="outlined" 
                                                  margin="normal"
                                                  name='region'
                                                  value={ region }
                                                  inputProps = {{
                                                        regex: properties && properties.cluster_name && properties.cluster_name.validation 
                                                    }}
                                                  color='primary'
                                                  onChange={ (e) => setRegion(e.target.value) }
                                                  placeholder={"Cluster Region"}
                                                  error={errors.region}
                                                  helperText = {helperTexts.region}
                                                />          
                                            )}
                                            
                                        </Grid>

                                        {
                                            provider === AppConstants.ClusterProvider.GCP &&
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant='h5' >{t('Cluster.ClusterDNS.zone')}</Typography>

                                                <FormControl className="w-100" error={""} variant="outlined" margin="normal">
                                                    <Select
                                                      name='zone'
                                                      value={ zone }
                                                      color='primary'
                                                      onChange={(e) => setZone(e.target.value) }
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
                                                            zoneList && zoneList.length > 0 && zoneList.map((zn, ind) => <MenuItem value={ zn } key={ ind }>{ zn }</MenuItem>)
                                                        }
                                                    </Select>
                                                    <FormHelperText>{ properties && properties.zone && properties.zone.description }</FormHelperText>
                                                </FormControl>
                                            </Grid>
                                        }
                                        {
                                            provider === AppConstants.ClusterProvider.Other &&
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant='h5' >{t('Cluster.ClusterDNS.zone')}</Typography>
                                                <MuiTextField 
                                                  className="w-100" 
                                                  variant="outlined" 
                                                  margin="normal"
                                                  name='zone'
                                                  value={ zone }
                                                  inputProps = {{
                                                        regex: properties && properties.cluster_name && properties.cluster_name.validation 
                                                    }}
                                                  color='primary'
                                                  onChange={ (e) => setZone(e.target.value) }
                                                  placeholder={"Cluster Zone"}
                                                  error={errors.zone}
                                                  helperText = {helperTexts.zone}
                                                />  
                                            </Grid>
                                        }
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant='h5' >Registry</Typography>
                                            <ClusterRegistry isInForm isCreateMode={true} handleRegistryChange={ handleRegistryChange }/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='h5' > {provider === AppConstants.ClusterProvider.Other ? "Config File" : "JSON config file" }</Typography>
                                            <TextField
                                              id=""
                                              type="file"
                                              title=""
                                              color="primary"
                                              name=""
                                              variant="outlined"
                                              className="w-100"
                                              margin="normal"
                                              onChange={ (e) => onFileChange(e) }
                                              disabled = {props.edit}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant='h5'>{t('Cluster.ClusterImportPopup.labels')}</Typography>
                                            <br />
                                            <MultiValueChipInput handleValues={handleLabelsChange} values={labels} disabled={props.edit} />
                                        </Grid>

                                    </>
                                }
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                  onClick={handleImport}
                  color="primary"
                  variant="contained"
                  disabled = { isFormValid() }
                >
                    {props.edit ? "Edit" : "Import"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => ({
    providerConfig: state.ClusterReducer.providerConfig
});
  
const mapDispatchtoProps = (dispatch) => {
    return {
        getProviderConfig: (provider) => dispatch(getProviderConfig(provider)),
        importCluster: (formData, callback) => dispatch(importCluster(formData, callback)),
        updateCluster: (id, formData, edit, handleSuccessImport) => dispatch(updateCluster(id, formData, edit, handleSuccessImport))
    };
};
  
export default connect(mapStateToProps, mapDispatchtoProps)(ClusterImportPopup);