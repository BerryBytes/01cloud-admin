import React, {Component} from 'react';
import { Typography, FormControlLabel, Switch,
    Grid,
    Card,
    CardContent,
    IconButton,
    Menu,
    MenuItem,
    ButtonBase,
    Chip,
    Button,
    Tooltip
 } from '@material-ui/core';
 import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomButton from '../../components/custombutton/CustomButton'
import DateRangeOutlinedIcon from "@material-ui/icons/DateRangeOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import { connect } from 'react-redux';
import { getClusterList, clearNewClusterData, deleteCluster, destroyCluster, exportWorkflow, clearExportWorkflow, clearClusterInfo, applyTerraform, enableDisableCluster, getClusterDetails } from './redux/actions'
import ClusterWorkflow from './ClusterWorkflow'
import ClusterInfo from './ClusterInfo'
import CronJobSkeleton from '../../components/skeletons/CronJobSkeleton'
import BackdropLoader from '../../components/loader/BackdropLoader'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ConfirmDeletePopup from "../../components/confirmdeletepopup/ConfirmDeletePopup";
import { AppConstants } from '../../constants/appconstants'
import ConfirmActionPopup from '../../components/confirmactionpopup/ConfirmActionPopup'
import ClusterImportPopup from './ClusterImportPopup'
import HistoryIcon from '@material-ui/icons/History';
import Toast from "../../components/toast/Toast";
import { useTranslation, withTranslation } from 'react-i18next';
import { DateHandler } from "../../components/dateHandler/DateHandler"

const useStyles = (theme) => ({
    jobHeader: {
      display: "flex",
    },
    createJob: {
      marginLeft: "auto",
    },
    svgicon: {
      fontSize: 14,
      color: "#357dfd",
      marginRight: 5,
    },
    jobStatus: {
      paddingLeft: 15,
      display: "flex",
    },
    historyIcon: {
        marginRight: "10px"
    },
    clickable : {
        cursor: "pointer",
    },

    projectListContainer:{
        marginBottom:theme.spacing(2),
    }
  });

  function StatusDOM(props) {
    let statusIndicator = "";
    if(props.type === AppConstants.ClusterStatus.Imported)
    {
        statusIndicator = <Chip variant="outlined" color="primary" label="Imported"/>
    }
    else
    {
        switch(props.status) {
            
            case AppConstants.ClusterStatus.Destroyed :
                statusIndicator = <Chip variant="outlined" color="primary"  label="Destroyed "/>
                break;
            case AppConstants.ClusterStatus.Imported : 
                statusIndicator = <Chip variant="outlined" color="primary"  label="Imported"/>
                break;
            case AppConstants.ClusterStatus.Planned:
                statusIndicator = <Chip variant="outlined" style={{ borderColor: "#ff9100", color: "#ff9100" }} label="Not Applied" />
                break;
            default:
                statusIndicator = ""
        }
    }
    return (
      <div>
        { statusIndicator }
      </div>
    )
  }

  function ClusterMenu(props){
    const { cluster } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClusterMenu = (e) => {
        setAnchorEl(e.currentTarget);
        props.handleClusterMenu(props.cluster);
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHistoryClick= () => {
        handleMenuClose();
        props.handleHistoryClick();
    };

    const handleEditCluster = () => {
        handleMenuClose();
        props.handleEditCluster();
    }

    const handleClusterApply = () => {
        handleMenuClose();
        props.handleClusterApply();
    }

    const handleClusterDelete= () => {
        handleMenuClose();
        props.handleClusterDelete();
    };

    const handleClusterDestroy= () => {
        handleMenuClose();
        props.handleClusterDestroy();
    };

    const handleClusterExport= () => {
        handleMenuClose();
        props.handleClusterExport();
    };

    return (
        <>
            <IconButton onClick={handleClusterMenu }>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <ClusterMenuItems cluster={ cluster }
                    hideDestory={true}
                    handleHistoryClick = { handleHistoryClick }
                    handleClusterDelete = { handleClusterDelete }
                    handleClusterApply = { handleClusterApply }
                    handleClusterDestroy = { handleClusterDestroy }
                    handleClusterExport = { handleClusterExport }
                    handleEditCluster = { handleEditCluster }
                    appliedClusters={props.appliedClusters}
                />
            </Menu>
        </>
    )
  } 

  function ClusterMenuItems(props){
      const [ t ] = useTranslation()
    return (
        <>
            <MenuItem onClick={() => props.handleHistoryClick()} > {t('Cluster.ClusterList.history')} </MenuItem>
            {
                (props.cluster.type === AppConstants.ClusterStatus.Imported || props.cluster.status === AppConstants.ClusterStatus.Planned ||  props.cluster.status === AppConstants.ClusterStatus.Drafted || props.cluster.status === "") &&
                <MenuItem onClick={() => props.handleClusterDelete()} > {t('Cluster.ClusterList.delete')} </MenuItem>
            }
            {
                props.cluster.status === AppConstants.ClusterStatus.Planned && !props.appliedClusters.find(x => x === props.cluster.id) &&
                <MenuItem onClick={() => props.handleClusterApply()} > {t('Cluster.ClusterList.apply')} </MenuItem>
            }
            {
                props.cluster.type !== AppConstants.ClusterStatus.Imported && (props.cluster.status === AppConstants.ClusterStatus.Applied || props.cluster.status === AppConstants.ClusterStatus.PackageInstalled) && !props.hideDestory &&
                <>
                    <MenuItem onClick={() => props.handleClusterDestroy()} > {t('Cluster.ClusterList.destroy')} </MenuItem>
                </>
            }
            {
                props.cluster.type !== AppConstants.ClusterStatus.Imported && (props.cluster.status === AppConstants.ClusterStatus.Applied || props.cluster.status === AppConstants.ClusterStatus.PackageInstalled) &&
                <>
                    <MenuItem onClick={() => props.handleClusterExport()} > {t('Cluster.ClusterList.export')} </MenuItem>
                </>
            }
            {
                
                 props.cluster.status !== AppConstants.ClusterStatus.Destroyed && 
                <>
                    <MenuItem onClick={() => props.handleEditCluster()} > {t('Cluster.ClusterList.edit')} </MenuItem>
                </>
            }
        </>
    )
  }

export class ClusterList extends Component {
    constructor(props){
        super(props);
        this.state = {
            
            mode: 0, 
            currentCluster: null,
            currentClusterId: 0,
            currentClusterName: "",
            isDeletePopupOpen: false,
            isDestroyPopupOpen: false,
            isEditPopupOpen: false,
            anchorElInfo: null,
            currentView: 1,
            isApplyPopupOpen: false,
            isImportPopupOpen: false,
            isEnablePopupOpen: false,
            enableSelection: null,
            enableDisableId: 0,
            importClusterEditPopup: false,
            filteredPackages: [],
        }
        this.exportRef = React.createRef();
    }

    componentDidMount() {
        this.props.getClusterList();
        if(this.props.newClusterData && this.props.newClusterData.id > 0)
        {
            this.setState({
                mode: 1,
                currentCluster: this.props.newClusterData,
                currentClusterId: this.props.newClusterData.id,
                currentClusterName: this.props.newClusterData.cluster_name
            })
            this.props.clearNewClusterData();
        }
    }

    componentWillUnmount(){
        this.props.clearClusterInfo()
    }

    handleCreateCluster = () => {
        this.props.history.push({
            pathname: "/cluster/create",
        });
    }

    handleClusterMenu = (cluster) => {
        this.setState({
          
          currentCluster: cluster,
          currentClusterId: cluster.id,
          currentClusterName: cluster.cluster_name
        });
      };
    
      handleMenuClose = () => {
        this.setState({
          
        });
      };

    handleViewClusterDetails = (cluster) => {
        this.setState({
            mode: 2,
            currentCluster: cluster,
            currentClusterId: cluster.id,
            currentClusterName: cluster.cluster_name
        })
    }

    handleHistoryClick = () => {
        this.handleInfoMenuClose();
        this.setState({
            mode: 1
        })
    }

    handleBack = () => {
        
        this.handleInfoMenuClose();
        this.setState({
          mode: 0,
          currentCluster: null,
          currentClusterId: 0,
          currentClusterName: ""
        });
        
        this.props.getClusterList();
      };
    
      handleClusterDelete = () => {
        
        this.handleInfoMenuClose();
        this.setState({
            isDeletePopupOpen: true,
        });
      };

      handleDisAgreeHandler = () => {
        this.setState({
            isDeletePopupOpen: false,
        });
      };
    
      handleAgreeHandler = () => {
        this.props.deleteCluster(this.state.currentClusterId);
        this.setState({
            isDeletePopupOpen: false,
            mode: 0,
            
        });
      };
      
      handleClusterDestroy = () => {
        
        this.handleInfoMenuClose();
        this.setState({
            isDestroyPopupOpen: true,
        });
      };

      handleDestroyDisAgreeHandler = () => {
        this.setState({
            isDestroyPopupOpen: false,
        });
      };
    
      handleDestroyAgreeHandler = () => {
        let installed = false
        const clusterDetails = this.state.currentCluster
        const {cluster} = clusterDetails
        if( cluster && cluster.dns_id > 0 && cluster.image_registry_id > 0 && (clusterDetails?.type === "imported" || clusterDetails?.status === AppConstants.ClusterStatus.Applied || clusterDetails?.status === AppConstants.ClusterStatus.PackageInstalled)){
            if(this.props.clusterPackageStatus && Object.keys(this.props.clusterPackageStatus).length >= this.state.filteredPackages?.length ){
                for(var ns in this.props.clusterPackageStatus){
                    if(this.props.clusterPackageStatus[ns].status === "installed"){
                        installed = true
                        break
                    }
                }
                if(!installed){
                    this.props.destroyCluster(this.state.currentClusterId);
                    this.setState({
                        isDestroyPopupOpen: false,
                        mode: 0,
                        
                    });
                }else{
                    Toast.warn(this.props.t('Cluster.ClusterList.uninstallError'))
                    this.setState({
                        isDestroyPopupOpen: false,
                        
                    });
                }
        }else{
            Toast.warn(this.props.t('Cluster.ClusterList.fetchingStatusError'))
        }
        this.handleInfoMenuClose()
        this.setState({
            isDestroyPopupOpen: false,
            
        });

      }else{
            this.props.destroyCluster(this.state.currentClusterId);
            this.handleInfoMenuClose()
            this.setState({
                isDestroyPopupOpen: false,
                
            });
      }
    }
      
      handleClusterExport = () => {
        
        this.handleInfoMenuClose();
        this.props.exportWorkflow(this.state.currentClusterId);
      }

    handleCluster_Apply = (cluster) => {
        this.setState({
            currentCluster: cluster,
            currentClusterId: cluster.id,
            currentClusterName: cluster.cluster_name,
            isApplyPopupOpen: true
        });
    }

    handleClusterApply = () => {
        this.handleInfoMenuClose();
        this.setState({ isApplyPopupOpen: true })    
    }

    handleApplyAgreeHandler = () => {
        this.props.applyTerraform(this.state.currentClusterId, null)
        this.setState({ isApplyPopupOpen: false })
    }
    handleApplyDisAgreeHandler = () => {
      this.setState({ isApplyPopupOpen: false })
    }

    handleEditCluster = () => {
        this.handleInfoMenuClose();
        this.setState({ isEditPopupOpen: true })    
    }

    handleEditAgreeHandler = () => {
        this.props.history.push({
            pathname: "/cluster/edit/" + this.state.currentClusterId,
        });
        this.setState({ isEditPopupOpen: false })
    }
    handleEditDisAgreeHandler = () => {
      this.setState({ isEditPopupOpen: false })
    }
    
    handleInfoMenuClick = (event) => {
        this.setState({ anchorElInfo : event.currentTarget });
    };

    handleInfoMenuClose = () => {
        this.setState({ anchorElInfo : null });
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps) {
            
            if(this.props.exportUrl === "" && nextProps.exportUrl !== ""){
                this.setState({
                    currentClusterUrl: nextProps.exportUrl
                }, () => { 
                    this.exportRef.current.click(); 
                    setTimeout(() => {
                        this.props.clearExportWorkflow();
                        this.setState({
                            currentClusterUrl: ""
                        })
                    }, 1000);
                })
            }
            if(this.props.destroyingCluster && !nextProps.destroyingCluster){
                this.setState({
                    mode: 1,
                })
            }
            if(this.props.applyingTerraform && !nextProps.applyingTerraform){
                this.setState({
                    mode: 1,
                })
            }
          
        }
    }

    afterInstall = () => {
        this.setState({
            mode: 1
        })
    }
    
    handleListFilterClick = (type) => {
        this.setState({ currentView: type })
    }

    handleImportCluster = () => {
        this.setState({
            isImportPopupOpen : true
        })
    }

    closeImportCluster = () => {
        this.setState({
            isImportPopupOpen : false
        })
    }
    importSuccessHandler = (data) => {
        this.setState({
            mode: 2,
            currentCluster: data,
            currentClusterId: data.id,
            currentClusterName: data.cluster_name,
            isImportPopupOpen : false
        })
    }

    handleEnableDisableCluster = (e, id) => {
        this.setState({
            isEnablePopupOpen: true,
            enableSelection: { active: e.target.checked },
            enableDisableId: id
        })
    }

    handleEnableAgreeHandler = () => {
        this.props.enableDisableCluster(this.state.enableDisableId, this.state.enableSelection)
        this.handleEnableDisAgreeHandler();
    }

    handleEnableDisAgreeHandler = () => {
        this.setState({
            isEnablePopupOpen : false,
            enableSelection : null,
            enableDisableId: 0
        })
    }

    importedClusterEdit = () => {
        this.setState({
            importClusterEditPopup: true
        })
        this.handleInfoMenuClose()
    }

    importClusterEditAgree = (updatedCluster) => {
        this.setState({
            importClusterEditPopup: false,
            mode: 2,
            cluster: updatedCluster,
            currentCluster: updatedCluster,
            currentClusterId: updatedCluster.id,
            currentClusterName: updatedCluster.cluster_name
        })
        this.props.getClusterDetails(updatedCluster.id);
    }

    importClusterEditDisagree = () => {
        this.setState({
            importClusterEditPopup: false
        })
    }

    updatePackage = (packages) => {
        this.setState({
            filteredPackages: packages
        })
    }

    render () {
        const { classes, clusterList, t } = this.props;
        const { currentCluster } = this.state; 
        const filteredClusters = clusterList && clusterList.length > 0 && clusterList.filter(x => (this.state.currentView === 2 && x.status === AppConstants.ClusterStatus.Destroyed) ||  (this.state.currentView === 1 && x.status !== AppConstants.ClusterStatus.Destroyed))
        return (
            <div data-test="main-container">
                <a href={this.state.currentClusterUrl} download ref={this.exportRef} >{""}</a>
                {
                    this.state.mode === 0 && 
                    <>
                        <div className={classes.projectListContainer}>
                            <Grid container justify="space-between" spacing={1}>
                                <Grid item>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Typography color="textPrimary" variant="h5" data-test="clusters-title">
                                                {t('Cluster.ClusterList.clusters')}
                                            </Typography>
                                        </Grid>
                                        {
                                            clusterList && clusterList.length > 0 &&
                                            <>
                                                <Grid item >
                                                    <Chip
                                                        label={t('Cluster.ClusterList.active')}
                                                        clickable
                                                        color="primary"
                                                        onClick={ () => this.handleListFilterClick(1) }
                                                        variant= { this.state.currentView === 1 ? "default" : "outlined" }
                                                        data-test="active-btn"
                                                    />
                                                </Grid>
                                                <Grid item >
                                                    <Chip
                                                        label={t('Cluster.ClusterList.destroyed')}
                                                        clickable
                                                        color="primary"
                                                        onClick={ () => this.handleListFilterClick(2) }
                                                        variant= { this.state.currentView === 2 ? "default" : "outlined" }
                                                        data-test="destroyed-btn"
                                                    />
                                                </Grid>
                                            </>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item className="right" xs={12} sm={6}>
                                    <Grid container justify="flex-end" >
                                        <Grid item>
                                            <CustomButton
                                                label={t('Cluster.ClusterList.import')}
                                                customClass="m-r-10"
                                                onClick={ this.handleImportCluster }
                                                data-test="import-btn"
                                            />
                                            <CustomButton
                                                label={t('Cluster.ClusterList.create')}
                                                onClick={this.handleCreateCluster}
                                                data-test="create-btn"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        {
                            !clusterList && [0, 1, 2].map((item, ind) => <CronJobSkeleton item={item} key={ind}/>)
                        }
                        {
                            clusterList && clusterList.length === 0 && (
                            <Grid item xs className="imgGrid" data-test="no-cluster-grid">
                                <img
                                    src="/images/infographics/no_env.svg"
                                    alt="No Jobs"
                                    className="defaultImg"
                                />
                                <p>{t('Cluster.ClusterList.noCluster')}</p>
                            </Grid>
                        )}
                        {
                            filteredClusters && filteredClusters.length === 0 &&
                            <Grid item xs className="imgGrid">
                                <img
                                    src="/images/infographics/no_env.svg"
                                    alt="No Jobs"
                                    className="defaultImg"
                                />
                                <p>{ this.state.currentView === 1 ? t('Cluster.ClusterList.noActiveCluster') : t('Cluster.ClusterList.noDestroyedCluster') }</p>
                            </Grid>
                        }
                        {
                            filteredClusters && filteredClusters.length > 0 && filteredClusters.map((cluster, ind) => {
                                return (
                                    <Card className={ `m-b-20 w-100 ${cluster.status === AppConstants.ClusterStatus.Destroyed ? "destroyed" : "" }`} key={ ind } data-test="cluster-card">
                                        <CardContent>
                                            
                                                <Grid container alignItems="center" spacing={4}>

                                                    <Grid item md={11} xs={9}>
                                                        <Grid container alignItems="center">
                                                            <Grid item md={9} sm={6} xs={12} className={classes.clickable} onClick={() => this.handleViewClusterDetails(cluster)}>
                                                                
                                                                    <Grid container>
                                                                        <Grid item md={12} xs={12} data-test="cluster-provider">
                                                                            { cluster.provider}
                                                                        </Grid>
                                                                        <Grid item md={12} xs={12}>
                                                                            <ButtonBase>
                                                                                <p className="commitmsg oneLine" title={ cluster.cluster_name } onClick={() => this.handleViewClusterDetails(cluster) } data-test="cluster-name" > { cluster.cluster_name }</p>
                                                                            </ButtonBase>
                                                                        </Grid>

                                                                        <Grid item md={12} xs={12}>
                                                                            
                                                                                <Grid container>
                                                                                    {
                                                                                        cluster.cluster_version &&
                                                                                        <Grid item md={4} xs={12} sm={12} className="header-details-grid">
                                                                                            <SettingsOutlinedIcon className={classes.svgicon} />
                                                                                            <span className="infoGrid" data-test="cluster-version" >{ cluster.cluster_version }</span>
                                                                                        </Grid>
                                                                                    }
                                                                                    <Grid item md={4} xs={12} sm={12} className="header-details-grid">
                                                                                        <DateHandler date={cluster.createdat} icon={<DateRangeOutlinedIcon className={classes.svgicon} />} data-test="cluster-created" />
                                                                                    </Grid>
                                                                                    <Grid item md={4} xs={12} sm={12} className="header-details-grid">
                                                                                        <PublicOutlinedIcon className={classes.svgicon} />
                                                                                        <span className="infoGrid" data-test="cluster-region" >{ cluster.region }</span>
                                                                                    </Grid>
                                                                                    
                                                                                </Grid>
                                                                            
                                                                        </Grid>

                                                                    </Grid>
                                                                
                                                            </Grid>

                                                            <Grid item md={3} sm={6} xs={12}>
                                                                <Grid container alignItems="center" spacing={2}>
                                                                    <Grid item xs={12} sm={7}>
                                                                        <StatusDOM status={cluster.status} type={ cluster.type }/>
                                                                    </Grid>
                                                                    
                                                                    <Grid item xs={12} sm={5}>
                                                                        {
                                                                            (cluster.status === AppConstants.ClusterStatus.Applied || cluster.status === AppConstants.ClusterStatus.PackageInstalled) && 
                                                                            <FormControlLabel
                                                                                control={
                                                                                    <Switch
                                                                                        name="active"
                                                                                        color="primary"
                                                                                        checked={ cluster.cluster?.active }
                                                                                        onChange={ (e) => this.handleEnableDisableCluster(e, cluster.id) }
                                                                                    />
                                                                                }
                                                                                label={t('Cluster.ClusterList.activeLabel')}
                                                                            />
                                                                        }
                                                                        {
                                                                            cluster.status === AppConstants.ClusterStatus.Planned &&
                                                                            <Button
                                                                                variant="contained"
                                                                                color="primary"
                                                                                onClick={(e) => this.handleCluster_Apply(e, cluster.id)}
                                                                            >
                                                                                Apply
                                                                            </Button>
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>
                                            
                                                    <Grid item md={1} xs={3} className="center">
                                                        <ClusterMenu cluster={ cluster }
                                                            handleClusterMenu={this.handleClusterMenu}
                                                            handleHistoryClick={this.handleHistoryClick}
                                                            handleClusterDelete={this.handleClusterDelete}
                                                            handleClusterDestroy={this.handleClusterDestroy}
                                                            handleClusterExport={this.handleClusterExport}
                                                            handleEditCluster={cluster.type === "imported" ? this.importedClusterEdit : this.handleEditCluster}
                                                            handleClusterApply={this.handleClusterApply} 
                                                            appliedClusters={this.props.appliedClusters}
                                                            data-test="cluster-menu"
                                                        />
                                                    </Grid> 

                                                </Grid>
                                            
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                    </>
                }
                {
                    this.state.mode !== 0 &&
                    <div className="m-b-20">
                        <ButtonBase 
                            onClick={this.state.mode === 2 ? this.handleBack : () => this.handleViewClusterDetails(this.state.currentCluster)} 
                            style={{ color: "#357dfd" }}
                        >
                            <ArrowBackIcon fontSize="small" />{" "}
                            <span className="jobNav">{this.state.mode === 2 ? t('Cluster.ClusterList.backToList') : t('Cluster.ClusterList.backToClusterDetails')}</span>
                        </ButtonBase>
                    {
                        this.state.mode === 2 &&
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <Typography variant="h4" >{ this.state.currentClusterName }</Typography>
                            </Grid>
                            <Grid item>
                                <Tooltip title="Show History" arrow placement="left">
                                    <IconButton onClick={() => this.handleHistoryClick()} className={classes.historyIcon}>
                                        <HistoryIcon />
                                    </IconButton>
                                </Tooltip>
                            <Button variant="contained" color="primary" endIcon={<ExpandMoreIcon/>} disableElevation disableFocusRipple disableTouchRipple
                                aria-controls="simple-menu" aria-haspopup="true" onClick={e => this.handleInfoMenuClick(e)}
                            >
                            Actions
                            </Button>
                                <Menu
                                  id="simple-menu"
                                  anchorEl={this.state.anchorElInfo}
                                  open={Boolean(this.state.anchorElInfo)}
                                  onClose={() => this.handleInfoMenuClose()}
                                  
                                  getContentAnchorEl={null}
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                  {
                                    currentCluster &&
                                    <ClusterMenuItems cluster={ currentCluster }
                                        handleHistoryClick = { this.handleHistoryClick }
                                        handleClusterDelete = { this.handleClusterDelete }
                                        handleClusterApply = { this.handleClusterApply }
                                        handleClusterDestroy = { this.handleClusterDestroy }
                                        handleClusterExport = { this.handleClusterExport }
                                        handleEditCluster = { currentCluster.type === "imported" ? this.importedClusterEdit : this.handleEditCluster }
                                        clusterPackageStatus = {this.props.clusterPackageStatus}
                                        appliedClusters={this.props.appliedClusters}
                                    />
                                  }
                                </Menu>
                            </Grid>
                        </Grid>
                    }
                    </div>
                }
                {
                    this.state.mode === 1 &&
                    <>
                        <Typography variant="h4">{ this.state.currentClusterName }</Typography><br />
                        <ClusterWorkflow clusterId={ this.state.currentClusterId } 
                            clusterName={ this.state.currentClusterName } 
                            clusterDetails={ this.state.currentCluster }
                            history={ this.props.history }
                            handleClusterApply = { this.handleClusterApply } 
                        />
                    </>
                }
                
                {
                    this.state.mode === 2 &&
                    <ClusterInfo clusterId={ this.state.currentClusterId } afterInstall={this.afterInstall} updatePackage={this.updatePackage} />
                }
                {
                    this.state.isImportPopupOpen &&
                    <ClusterImportPopup open={ this.state.isImportPopupOpen }
                        closeHandler= { this.closeImportCluster } 
                        successHandler = { this.importSuccessHandler }
                    />
                }
                {
                    this.state.importClusterEditPopup &&
                    <ClusterImportPopup open={ this.state.importClusterEditPopup }
                        closeHandler= { this.importClusterEditDisagree } 
                        successHandler = { this.importClusterEditAgree }
                        cluster={this.state.currentCluster}
                        edit={true}
                    />
                }
                
                <ConfirmDeletePopup
                    open={ this.state.isDeletePopupOpen}
                    handleAgree={this.handleAgreeHandler}
                    handleDisAgree={this.handleDisAgreeHandler}
                    message={`This action will permanently delete all the data. Please type "${this.state.currentClusterName}" to delete the Cluster : ${this.state.currentClusterName}`}
                    yesText={t('App.AppInfo.yesText')}
                    noText={t('App.AppInfo.noText')}
                    action="delete"
                    toMatchName={this.state.currentClusterName}
                    toDeleteModule="cluster"
                    loading={this.props.deletingCluster}
                />
                <ConfirmDeletePopup
                    open={ this.state.isDestroyPopupOpen}
                    handleAgree={this.handleDestroyAgreeHandler}
                    handleDisAgree={this.handleDestroyDisAgreeHandler}
                    message={`This action will permanently delete all the data. Please type "${this.state.currentClusterName}" to destroy the Cluster : ${this.state.currentClusterName}`}
                    yesText={t('App.AppInfo.yesText')}
                    noText={t('App.AppInfo.noText')}
                    action="destroy"
                    toMatchName={this.state.currentClusterName}
                    toDeleteModule="cluster"
                    loading={this.props.destroyingCluster}
                />
                <ConfirmActionPopup 
                    open={this.state.isEditPopupOpen} 
                    handleAgree={this.handleEditAgreeHandler} 
                    handleDisAgree={this.handleEditDisAgreeHandler} 
                    message={t('Cluster.ClusterList.editCluster')}
                    yesText={t('App.AppInfo.yesText')} 
                    noText={t('App.AppInfo.noText')} 
                />
                <ConfirmActionPopup 
                    open={this.state.isApplyPopupOpen} 
                    handleAgree={this.handleApplyAgreeHandler} 
                    handleDisAgree={this.handleApplyDisAgreeHandler} 
                    message={t('Cluster.ClusterList.applyCluster')} 
                    yesText={t('App.AppInfo.yesText')} 
                    noText={t('App.AppInfo.noText')} 
                /> 
                <ConfirmActionPopup 
                    open={ this.state.isEnablePopupOpen } 
                    handleAgree={this.handleEnableAgreeHandler} 
                    handleDisAgree={this.handleEnableDisAgreeHandler} 
                    message={ `Are you sure you want to ${ this.state.enableSelection && this.state.enableSelection.active ? 'enable' : 'disable' } cluster?` }
                    yesText={t('App.AppInfo.yesText')}
                    noText={t('App.AppInfo.noText')} 
                />        
                { this.props.deletingCluster && <BackdropLoader message={t('Cluster.ClusterList.deletingCluster')} /> }
                { this.props.destroyingCluster && <BackdropLoader message={t('Cluster.ClusterList.destroyingCluster')} /> }
                { this.props.fetchingClusterList && <BackdropLoader message={t('Cluster.ClusterList.loadingCluster')} /> }
                { this.props.exportingCluster && <BackdropLoader message={t('Cluster.ClusterList.exportingCluster')} /> }
                { this.props.applyingTerraform && <BackdropLoader message={t('Cluster.ClusterList.applyingCluster')} /> }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    clusterList: state.ClusterReducer.clusterList,
    fetchingClusterList: state.ClusterReducer.fetchingClusterList,
    newClusterData: state.ClusterReducer.newClusterData,
    deletingCluster: state.ClusterReducer.deletingCluster,
    destroyingCluster: state.ClusterReducer.destroyingCluster,
    exportingCluster: state.ClusterReducer.exportingCluster,
    exportUrl: state.ClusterReducer.exportUrl,
    applyingTerraform: state.ClusterReducer.applyingTerraform,
    clusterPackageStatus: state.ClusterReducer.clusterPackageStatus,
    appliedClusters: state.ClusterReducer.appliedClusters
})

const mapDispatchtoProps = dispatch => {
  return {
    getClusterList : () => dispatch(getClusterList()),
    clearNewClusterData: () => dispatch(clearNewClusterData()),
    deleteCluster: (id) => dispatch(deleteCluster(id)),
    destroyCluster: (id) => dispatch(destroyCluster(id)),
    exportWorkflow: (id) => dispatch(exportWorkflow(id)),
    clearExportWorkflow: () => dispatch(clearExportWorkflow()),
    clearClusterInfo: () => dispatch(clearClusterInfo()),
    applyTerraform: (id, history) => dispatch(applyTerraform(id, history)),
    enableDisableCluster: (id, jsonBody) => dispatch(enableDisableCluster(id, jsonBody)),
    getClusterDetails: (id) => dispatch(getClusterDetails(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(ClusterList)))