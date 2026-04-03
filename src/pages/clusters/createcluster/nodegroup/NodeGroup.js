import React, { Component } from 'react'
import {
    Button,
    withStyles,
    Grid,
    Paper,
    Typography,
    FormControl,
    TextField,
    MenuItem,
    Divider,
    FormControlLabel,
    Switch,
    Card,
    CardContent,
    Select,
    Table,
    TableBody,
    
    TableHead,
    TableRow,
    TableContainer
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MuiTextField from "../../../../components/textfield/MuiTextField";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from "@material-ui/icons/Close";
import { AppConstants } from '../../../../constants/appconstants'
import { createCluster, updateCluster } from '../../redux/actions'
import BackdropLoader from '../../../../components/loader/BackdropLoader'
import _ from 'lodash';
import { validateRegex } from "../../../../helpers/utils" 
import MuiNumberCounter from "../../../../components/textfield/MuiNumberCounter";
import { GeneralStyledTableCell as StyledTableCell} from '../../../../components/styledtabelcell/StyledTabelCell';
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

class NodeGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 2,
            node_group_count: 1,
            node_group_detail: [this.getSampleNodeGroup(1)],
            currentNodeGroupIndex: 0,
            _data: {}
        }
    }

    getSampleNodeGroup = (count) => {
        return {
            
            node_group_name : "node-group-" + count,
            instance_type :"Select",
            disk_type :"Select",
            min_node_count :1,
            disk_size :"",
            max_node_count :1,
            initial_node_count :1,
            node_autoscaling :false,
            preemptible :false,
            node_group_labels : [ this.getEmptyRowObject() ],
            isNGNameError: false,
            isDiskSizeError: false,
            isMinNodeError: false,
            isMaxNodeError: false,
            isInitNodeError: false
       }
    }

    getEmptyRowObject = () => {
        return {
          
          key: "",
          value: "",
        };
    }

    handleKeyChange = (e, ind, index) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 
        const value = e.target.value;

        const { node_group_labels } = _ngData;

        node_group_labels[ind].key = value;

        if (ind === node_group_labels.length - 1) {
          node_group_labels.push(this.getEmptyRowObject());
        }
    
        node_group_detail[index] = _ngData;

        this.setState({
          node_group_detail,
        });
    }
    
    handleValueChange = (e, ind, index) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 
        const value = e.target.value;

        const { node_group_labels } = _ngData;

        node_group_labels[ind].value = value;

        if (ind === node_group_labels.length - 1) {
          node_group_labels.push(this.getEmptyRowObject());
        }
    
        node_group_detail[index] = _ngData;

        this.setState({
          node_group_detail,
        });
    }

    handleRemoveLabel = (ind, index) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 
        
        const { node_group_labels } = _ngData;

        node_group_labels.splice(ind, 1);

        node_group_detail[index] = _ngData;

        this.setState({
          node_group_detail,
        });
    }

    addNodeGroup = () => {
        const { node_group_detail } = this.state;
        node_group_detail.push(this.getSampleNodeGroup(node_group_detail.length + 1));
        this.setState({
            node_group_count: node_group_detail.length,
            node_group_detail
        })
    }

    handleNGSelection = (index) => {
        this.setState({ currentNodeGroupIndex: index });
    }

    handleContinue = () => {
        const { node_group_detail } = this.state;
        let _node_group_detail = _.cloneDeep(node_group_detail)
        
        _node_group_detail.map(item => {
            let filteredLables = [];
            const labeles = item.node_group_labels;
            if(labeles)
            {
                labeles.map(lbl => {
                    if(lbl.key.trim() !== "" && lbl.value.trim() !== "" )
                        filteredLables.push(lbl);
                })
            }
            item.node_group_labels = filteredLables;
            item.min_node_count = item.min_node_count ? parseInt(item.min_node_count) : 1
            item.max_node_count = item.max_node_count ? parseInt(item.max_node_count) : 1
            item.initial_node_count = item.initial_node_count ? parseInt(item.initial_node_count) : 1
            item.instance_type = item.instance_type !== "Select" ? item.instance_type : ""
            item.disk_type = item.disk_type !== "Select" ? item.disk_type : ""
            item.disk_size = item.disk_size.toString()
            delete item.isDiskSizeError
            delete item.isNGNameError
            delete item.isMinNodeError
            delete item.isMaxNodeError
            delete item.isInitNodeError
        })
        let data = { 
            node_group_count: this.state.node_group_count,
            node_group_detail: _node_group_detail
        }
        
        const _completeData = {...this.props.completeData , ...data}
        this.setState({ _data : data })
        
        if(this.props.isEditMode) {
            this.props.updateCluster(this.props.editClusterID, _completeData)
        }
        else {
            if(this.props.newClusterData && this.props.newClusterData.id > 0)
            {
                this.props.updateCluster(this.props.newClusterData.id, _completeData)
            }
            else
                this.props.createCluster(_completeData)
        }
    }

    handleBack = () => {
        this.props.handleBack(this.state.currentStep - 1);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps) {
          if(!this.props.clusterCreationSuccess && nextProps.clusterCreationSuccess && nextProps.newClusterData && nextProps.newClusterData.id > 0){
            this.props.socketConnection(nextProps.newClusterData.id);
            this.props.handleChange(this.state.currentStep + 1, this.state._data)
            
          }
          if(this.props.isEditMode && !this.props.clusterDetails && nextProps.clusterDetails){
            this.setState({
                node_group_count: nextProps.clusterDetails.node_group_count,
                node_group_detail: nextProps.clusterDetails.node_group_detail
            })
          }
        }
    }

    handleNGCounterField = (value, index, fieldName) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 
        if(fieldName === "min_node_count"){
            if(value > 0){
                if(value > _ngData.max_node_count){
                    _ngData.max_node_count = value    
                }
                _ngData.min_node_count = value
                _ngData.isMinNodeError = false;
            }
            else {
                _ngData.min_node_count = value
                _ngData.isMinNodeError = true;
            }
        }
        else if(fieldName === "max_node_count"){
            if(value > 0) {
                if(value <= _ngData.min_node_count) {
                    _ngData.min_node_count = value
                }
                _ngData.max_node_count = value
                _ngData.isMaxNodeError = false;
            }
            else{
                _ngData.max_node_count = value
                _ngData.isMaxNodeError = true;
            }
        }
        else if(fieldName === "initial_node_count"){
            if(value > 0){
                _ngData.initial_node_count = value;
                _ngData.isInitNodeError = false;
            }
            else{
                _ngData.initial_node_count = value;
                _ngData.isInitNodeError = true;
            }
        }

        node_group_detail[index] = _ngData;
        this.setState({ 
            node_group_detail
        })
    }

    handleUpdateDiskSize = (value, index, fieldName) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 
        
        if(!isNaN(value))
        {
            _ngData[fieldName] = value;
            _ngData.isDiskSizeError = value < 10 
        }
        else
        {
            _ngData[fieldName] = 0;
            _ngData.isDiskSizeError = true 
        }

        node_group_detail[index] = _ngData;
        this.setState({ 
            node_group_detail
        })
    }

    handleNGFieldValueChange = (e, index) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 
        
        if(e.target.name === "min_node_count"){
            const value = parseInt(e.target.value);
            if(value > 0){
                if(value > _ngData.max_node_count){
                    _ngData.max_node_count = value    
                }
                _ngData.min_node_count = value
            }
        }
        else if(e.target.name === "max_node_count"){
            const value = parseInt(e.target.value);
            if(value > 0) {
                if(value <= _ngData.min_node_count) {
                    _ngData.min_node_count = value
                }
                _ngData.max_node_count = value
            }
        }
        else if(e.target.name === "initial_node_count"){
            if(e.target.value > 0){
                _ngData.initial_node_count = e.target.value
            }
        }
        else if(e.target.name === "disk_size") {
            if(e.target.value > 0)
            {
                _ngData[e.target.name] = e.target.value;
                _ngData.isDiskSizeError = e.target.value < 10 
            }
        }
        else if (e.target.name === "node_group_name"){
            _ngData[e.target.name] = e.target.value;
            _ngData.isNGNameError = !validateRegex(e.target.value, e.currentTarget.getAttribute('regex'))
        }
        else if(e.target.name === "preemptible")
            _ngData[e.target.name] = e.target.checked;
        else
            _ngData[e.target.name] = e.target.value;
        
        node_group_detail[index] = _ngData;
        this.setState({ 
            node_group_detail
        })
    }

    handleCountUpdate = (index, field, mode) => {
        const { node_group_detail } = this.state;
        let _ngData = node_group_detail[index]; 

        if(field === "min_node_count") {
            if(mode === 1)
            {
                if(_ngData.min_node_count > 1)
                    _ngData.min_node_count = _ngData.min_node_count - 1
            }
            else
            {
                if(_ngData.min_node_count >= _ngData.max_node_count){
                    _ngData.max_node_count = _ngData.max_node_count + 1    
                }
                _ngData.min_node_count = _ngData.min_node_count + 1
            }
        }
        else if(field === "max_node_count") {
            if(mode === 1)
            {
                if(_ngData.max_node_count > 1)
                {
                    if(_ngData.max_node_count <= _ngData.min_node_count) {
                        _ngData.min_node_count = _ngData.min_node_count - 1
                    }
                    _ngData.max_node_count = _ngData.max_node_count - 1
                }
            }
            else
                _ngData.max_node_count = _ngData.max_node_count + 1
        }
        else if(field === "initial_node_count") {
            if(mode === 1){
                if(_ngData.initial_node_count > 1)
                    _ngData.initial_node_count = _ngData.initial_node_count - 1
            }
            else
                _ngData.initial_node_count = _ngData.initial_node_count + 1
        }

        node_group_detail[index] = _ngData;
        this.setState({ 
            node_group_detail
        })
    }

    handleRemoveNodeGroup = (index) => {
        const { node_group_detail } = this.state;
        if(node_group_detail.length > 1)
        {
            if(node_group_detail.length - 1 === index)
            {
                this.setState({ currentNodeGroupIndex: 0 });
            }
            node_group_detail.splice(index, 1);
            this.setState({
                node_group_count: node_group_detail.length,
                node_group_detail
            })
        }
    }

    isFormValid = () => {
        let disable = true;
        
        const { node_group_detail } = this.state; 
        if(node_group_detail && node_group_detail.length > 0)
        {
            for (var i = 0; i < node_group_detail.length; i++) {
                const item = node_group_detail[i];
                if(item){
                    if(item.node_group_name.trim() !== "" && !item.isNGNameError
                        && item.instance_type !== "Select"
                        && item.disk_size > 0 && !item.isDiskSizeError
                        && parseInt(item.min_node_count) > 0
                        && parseInt(item.max_node_count) > 0
                        && parseInt(item.min_node_count) <= parseInt(item.max_node_count)
                        && parseInt(item.initial_node_count) > 0)
                    {
                        if( this.props.completeData.provider === AppConstants.ClusterProvider.GCP)
                        {
                            if(item.disk_type !== "Select"){
                                disable = false;
                            }
                            else {
                                disable = true
                                break;
                            }
                        }
                        else
                        {
                            disable = false;
                        }
                    }
                    else
                    {
                        disable = true
                        break;
                    }
                }
                else {
                    disable = true
                    break;
                }                               
            }
        }
        return disable;    
    }

    render() {
        const { classes, completeData, providerConfig,t } = this.props;
        const { node_group_detail } = this.state;
        
        const ngProperties = providerConfig && providerConfig.properties && providerConfig.properties.node_group && providerConfig.properties.node_group.properties;

        if (this.props.activeStep !== this.state.currentStep) {
            return null
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item md={3}>
                        <Card>
                            <List component="nav" aria-label="secondary mailbox folder">
                                {
                                    node_group_detail && node_group_detail.length > 0 && node_group_detail.map((item,index) => (
                                        <ListItem button selected={ this.state.currentNodeGroupIndex === index ? true : false} onClick={ () => this.handleNGSelection(index)} key={ index }>
                                            <ListItemText primary={ item.node_group_name} />
                                            <div><CloseIcon fontSize="small" onClick={() => this.handleRemoveNodeGroup(index) } /></div>
                                        </ListItem>
                                    ))
                                }
                                <Divider/>
                                <ListItem className={classes.center}>
                                    <Button variant="contained" color='primary' onClick={() => this.addNodeGroup()}>
                                        {t('Cluster.NodeGroup.addNodeGroup')}
                                    </Button>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                    {
                        node_group_detail && node_group_detail.length > 0 && node_group_detail.map((item,index) => {
                            return this.state.currentNodeGroupIndex === index ? 
                                <Grid item md={9}>
                                    <Grid container spacing="2">
                                        <Grid item md={12}>
                                            <Card>
                                                
                                                <Divider />

                                                <CardContent>
                                                    <Grid container spacing={2}>
                                                        <Grid item md={6}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.nodeGroupName')}</Typography>
                                                            <MuiTextField
                                                              name="node_group_name"
                                                              value={ item.node_group_name }
                                                              onChange={(e) => this.handleNGFieldValueChange(e, index) }
                                                              customClassName="oneRemMarginBottomSeperator"
                                                              type="text"
                                                              margin="normal"
                                                              inputProps = {{
                                                                regex: ngProperties && ngProperties.node_group_name_ && ngProperties.node_group_name_.validation 
                                                            }}
                                                              error = { item.isNGNameError }
                                                              helperText = { item.isNGNameError && ngProperties && ngProperties.node_group_name_ && ngProperties.node_group_name_.description }
                                                            />
                                                        </Grid>

                                                        {
                                                        completeData && completeData.provider === AppConstants.ClusterProvider.GCP &&
                                                        <Grid item md={6}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.diskType')} </Typography>
                                                            <FormControl variant="outlined" className="w-100" margin="normal">
                                                                <Select
                                                                  name='disk_type'
                                                                  value={ item.disk_type }
                                                                  margin="normal"
                                                                  onChange={(e) => this.handleNGFieldValueChange(e, index) }
                                                                >
                                                                    <MenuItem value="Select">{t('Cluster.NodeGroup.selectDiskType')}</MenuItem>
                                                                    {
                                                                        ngProperties && ngProperties.disk_type_g && ngProperties.disk_type_g.items && ngProperties.disk_type_g.items.length > 0 &&
                                                                        ngProperties.disk_type_g.items.map((disk, ind) => <MenuItem value={ disk } key={ ind }>{ disk }</MenuItem>)
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    }

                                                        <Grid item md={6}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.diskSize')}</Typography>
                                                        
                                                            <MuiNumberCounter updateValueChange={ this.handleUpdateDiskSize } 
                                                              initialValue={ parseInt(item.disk_size) } 
                                                              defaultValue={ 10 } 
                                                              additionalData1={ index } 
                                                              additionalData2="disk_size" 
                                                              isFullWidth = { true }
                                                              customClassName="oneRemMarginBottomSeperator"
                                                              margin="normal"
                                                              unit = "GB"
                                                              isError = { item.isDiskSizeError }
                                                              helperText={ ngProperties && ngProperties.disk_size_g && ngProperties.disk_size_g.description }
                                                            />
                                                            
                                                        </Grid>
                                                        <Grid item md={6}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.instanceType')}</Typography>
                                                            <FormControl variant="outlined" className="w-100"  margin="normal">
                                                                <Select 
                                                                  name='instance_type'
                                                                  value={ item.instance_type }
                                                               
                                                                  onChange={(e) => this.handleNGFieldValueChange(e, index) }
                                                                >
                                                                    <MenuItem value="Select">{t('Cluster.NodeGroup.selectInstanceType')}</MenuItem>
                                                                    {
                                                                    ngProperties && ngProperties.instance_type_g && ngProperties.instance_type_g.items && ngProperties.instance_type_g.items.length > 0 &&
                                                                    ngProperties.instance_type_g.items.map((instance, ind) => <MenuItem value={ instance } key={ ind }>{ instance }</MenuItem>)
                                                                }
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2} className="m-t-20">
                                                        <Grid item xs={12} md={4}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.minimumNodeCount')} </Typography>
                                                            <MuiNumberCounter updateValueChange={ this.handleNGCounterField } 
                                                              initialValue={ item.min_node_count } 
                                                              defaultValue={ 1 } 
                                                              additionalData1={ index } 
                                                              additionalData2="min_node_count" 
                                                              updateIncomingValue = { true }
                                                              isFullWidth = { true }
                                                              customClassName="oneRemMarginBottomSeperator"
                                                              margin="normal"
                                                              isError = { item.isMinNodeError }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.maximumNodeCount')} </Typography>
                                                            <MuiNumberCounter updateValueChange={ this.handleNGCounterField } 
                                                              initialValue={ item.max_node_count } 
                                                              defaultValue={ 1 } 
                                                              additionalData1={ index } 
                                                              additionalData2="max_node_count" 
                                                              updateIncomingValue = { true }
                                                              isFullWidth = { true }
                                                              customClassName="oneRemMarginBottomSeperator"
                                                              margin="normal"
                                                              isError = { item.isMaxNodeError }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} md={4}>
                                                            <Typography variant='h5'>{t('Cluster.ClusterInfo.initialNodeCount')} </Typography>
                                                            <MuiNumberCounter updateValueChange={ this.handleNGCounterField } 
                                                              initialValue={ item.initial_node_count } 
                                                              defaultValue={ 1 } 
                                                              additionalData1={ index } 
                                                              additionalData2="initial_node_count" 
                                                              isFullWidth = { true }
                                                              customClassName="oneRemMarginBottomSeperator"
                                                              margin="normal"
                                                              isError = { item.isInitNodeError }
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12} sm={6} xs={12} >
                                                            <FormControlLabel
                                                              control={
                                                                  <Switch
                                                                name="preemptible"
                                                                color="primary"
                                                                checked={item.preemptible}
                                                                onChange={ (e) => this.handleNGFieldValueChange(e, index) }
                                                                  />
                                                            }
                                                              label={t('Cluster.ClusterInfo.costOptimization')}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item md={12}>
                                            <TableContainer component={Paper} className={classes.topmargin}>
                                                <div className="m-t-20 m-b-20 oneRemLeftMarginSeperator">
                                                    <Typography variant="h5">{t('Cluster.ClusterImportPopup.labels')}</Typography>
                                                </div>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell>{t('Cluster.NodeGroup.key')}</StyledTableCell>
                                                            <StyledTableCell>{t('Cluster.NodeGroup.value')}</StyledTableCell>
                                                            <StyledTableCell>{t('Cluster.NodeGroup.actions')}</StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        { item.node_group_labels.map((label, ind) => (
                                                            <TableRow key={ind}>
                                                                <StyledTableCell component="th" scope="row">
                                                                    <TextField
                                                                  value={label.key}
                                                                  variant="outlined"
                                                                  fullWidth
                                                                  name={ind}
                                                                        
                                                                  onChange={(e) => this.handleKeyChange(e, ind, index)}
                                                                    >
                                                                    </TextField>
                                                                </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row">
                                                                    <TextField
                                                                  value={label.value}
                                                                  variant="outlined"
                                                                  fullWidth
                                                                  name={ind}
                                                                        
                                                                  onChange={(e) => this.handleValueChange(e, ind, index)}
                                                                    >
                                                                    </TextField>
                                                                </StyledTableCell>
                                                                <StyledTableCell component="th" scope="row">
                                                                    {
                                                                        ind !== item.node_group_labels.length - 1 &&
                                                                        <div>
                                                                            <CloseIcon onClick={() => this.handleRemoveLabel(ind, index) } />
                                                                        </div>
                                                                    }
                                                                </StyledTableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            : <></>
                        })
                    }
                    
                </Grid>
                <div className={classes.actions}>
                    <Grid container className={classes.continueButton} justify="center" spacing={2}>
                        <Grid item lg={1} md={2} xs={6}>
                            <Button variant="contained" color='primary' onClick={() => this.handleBack()} fullWidth >
                            {t('App.CreateApp.back')}
                            </Button>
                        </Grid>
                        <Grid item lg={1} md={2} xs={6}>
                            <Button variant="contained" color='primary' fullWidth onClick={() => this.handleContinue()} disabled = { this.isFormValid() }>
                            {t('Cluster.ClusterPage.continue')}
                            </Button>
                        </Grid>
                    </Grid>
                    
                </div>
                { this.props.isCreatingCluster && <BackdropLoader message={t('Cluster.NodeGroup.validateDetails')} /> }
            </div>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        createCluster: (jsonBody) => dispatch(createCluster(jsonBody)),
        updateCluster: (id, jsonBody) => dispatch(updateCluster(id, jsonBody))
    }
}

const mapStateToProps = (state) => {
    return {
        newClusterData: state.ClusterReducer.newClusterData,
        providerConfig: state.ClusterReducer.providerConfig,
        clusterCreationSuccess: state.ClusterReducer.clusterCreationSuccess,
        isCreatingCluster: state.ClusterReducer.isCreatingCluster,
        clusterDetails: state.ClusterReducer.clusterDetails
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(
    compose(
        withStyles,
    )(useStyles)(withTranslation()(NodeGroup))
)
