import React, {Component} from "react";
import {
    clearClusterPackageStatus,
    getClusterPackage,
    getPackageStatus,
    installClusterPackage,
    uninstallClusterPackage,
} from "../redux/actions";
import {connect} from "react-redux";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Collapse,
} from "@material-ui/core";

import {withStyles} from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import BackdropLoader from "../../../components/loader/BackdropLoader";
import ConfirmActionPopup from "../../../components/confirmactionpopup/ConfirmActionPopup";
import Loader from "../../../components/loader/Loader";
import CloseIcon from "@material-ui/icons/Close";
import {getStatusColor} from "../../../helpers/utils";
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import Skeleton from "react-loading-skeleton";
import Toast from "../../../components/toast/Toast";
import { withTranslation } from 'react-i18next';
import { Alert } from "@material-ui/lab";
import clsx from "clsx"

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.background.default,
        color: "grey",
        fontWeight: 500,
    },
    body: {
        color: "#555",
        fontSize: 14,
    },
    action: {
        alignSelf: "center",
    },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {},
}))(TableRow);

const transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ClusterInstallPopup(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                TransitionComponent={transition}
                keepMounted
                onClose={props.handleDisAgree}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                onEscapeKeyDown={props.handleDisAgree}
            >
                <DialogTitle>
                    <Typography className="dialogtitle">
                        <b>Are you sure ? </b>
                    </Typography>

                    <IconButton
                        aria-label="close"
                        size="small"
                        className="right"
                        onClick={props.handleDisAgree}
                    >
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{minWidth: 360}} dividers>
                    <Typography>
                        You are going to install {props.packages.length} package for cluster
                    </Typography>
                    <div className="packagelistdiv">
                        {
                            props.packageInstallAlert?.length > 0 && props.packageInstallAlert?.map((alert, ind) => (
                                <Grid
                                    container
                                    justify="center"
                                    alignItems={"center"}
                                    spacing={2}
                                    className="m-t-10"
                                    key={ind}
                                >
                                    <Grid item md="12" style={{textAlign: "center"}}>
                                        <Alert severity="error">
                                            {alert}
                                        </Alert>
                                    </Grid>
                                </Grid>
                            ))
                        }
                        {props.packages.map((p, ind) => (
                            <Grid
                                container
                                alignItems={"center"}
                                spacing={2}
                                className="m-t-10"
                                key={ind}
                            >
                                <Grid item key={ind} md="2">
                                    
                                    <img
                                        src={p?.icon ? p.icon : ""}
                                        alt=""
                                        width={30}
                                    >
                                    </img>
                                </Grid>
                                <Grid item key={ind} md="8">
                                    <Typography variant="subtitle1">{p.name}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    {!props.loading ? (
                        <Button
                            onClick={props.handleAgree}
                            color="primary"
                            variant="contained"
                            disabled={props.packageInstallAlert?.length > 0}
                        >
                            {props.yesText}
                        </Button>
                    ) : (
                        <div className="loader-center">
                            <Loader/>
                        </div>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}

const useStyles = (theme) => ({
    buttonsGrid: {
        display: "flex",
        justifyContent: "flex-end",
        padding: 5
    },
    expand: {
        transform: "rotate(0deg)",
        transition: theme?.transitions?.create("transform", {
            duration: theme?.transitions?.duration?.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    cardHeader: {
        padding: "0 !important",
    },
});

class ClusterPackage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredPackages: [],
            currentView: null,
            toInstallPackage: [],
            
            installPopUpOpen: false,
            selectAll: false,
            uninstallPopupOpen: false,
            currentPackage: null,
            packageInstallAlert: [],
            expanded: false,
        };
    }

    componentDidMount() {
        this.props.getClusterPackage();
        this.props.getPackageStatus(this.props.clusterDetails.id);
        if (this.props.clusterPackageConfig) {
            
            this.setFilteredPackages(this.props.clusterPackageConfig?.packages);
        }
        if (this.props.clusterPackageStatus) {
            
            this.setPackageStatus(this.props.clusterPackageStatus);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            nextProps.clusterPackageConfig &&
            !this.props.clusterPackageConfig
            
        ) {
            this.setFilteredPackages(nextProps.clusterPackageConfig?.packages);
        }
        if ((nextProps.clusterPackageStatus && !this.props.clusterPackageStatus) || (nextProps.clusterPackageStatus !== this.props.clusterPackageStatus)) {
            this.setPackageStatus(nextProps.clusterPackageStatus);
        }
    }

    setPackageStatus = (status) => {
        let filteredPackages = [];
        filteredPackages = this.props.clusterPackageConfig?.packages?.map((_p) => {
            
            if(status[_p.namespace]) _p.status = status[_p.namespace].status;
            return _p; 
            
        });
        this.setState({
            filteredPackages,
        });
    };

    setFilteredPackages = (packages) => {
        this.setState({
            filteredPackages: packages,
        }, () => {
            this.props.updatePackageList(this.state.filteredPackages)
        });
    };

    componentWillUnmount() {
        this.props.clearClusterPackageStatus();
        this.setState({
            filteredPackages: [],
        })
    }

    handlePackageFilter = (mode) => {
        if (mode !== this.state.currentView) {
            this.setState(
                {
                    currentView: mode,
                },
                () => {
                    let filteredPackages = [...this.state.filteredPackages];
                    let _toInstallPackage = [];
                    let pac = null;
                    switch (mode) {
                        case 1:
                            pac = this.props.clusterPackageConfig?.templates?.find((p) => {
                                return p.name === "tiny";
                            });
                            break;
                        case 2:
                            pac = this.props.clusterPackageConfig?.templates?.find((p) => {
                                return p.name === "small";
                            });
                            break;
                        case 3:
                            pac = this.props.clusterPackageConfig?.templates?.find((p) => {
                                return p.name === "large";
                            });
                            break;
                        default:
                            break;
                    }
                    if (pac) {
                        pac.packages.forEach((p) => {
                            const _p = this.props.clusterPackageConfig?.packages?.find(
                                (_pac) => {
                                    return _pac.name === p;
                                }
                            );
                            if (_p) {
                                const pIndex = filteredPackages?.findIndex((_pl) => {
                                    return _pl.name === _p.name;
                                });
                                if (_p.optional) {
                                    const plu = {
                                        chart: _p.chart,
                                        name: _p.name,
                                        
                                        required_dns: _p.required_dns ? _p.required_dns : false,
                                        set: []
                                    };
                                    _toInstallPackage.push(plu);
                                }
                                
                                if(this.props.clusterPackageStatus) _p.status = this.props?.clusterPackageStatus[_p.namespace]?.status;

                                filteredPackages[pIndex] = _p;
                                
                            }
                        });
                        this.setState({
                            toInstallPackage: _toInstallPackage,
                        });
                        this.setState(
                            {
                                filteredPackages,
                            },
                            () => {
                                this.props.updatePackageList(filteredPackages)
                                
                            }
                        );
                    }
                }
            );
        }
    };

    handleCheckboxChange = (e, pac) => {
        if (e.target.checked) {
            const _pac = {
                chart: pac.chart,
                name: pac.name,
                
                required_dns: pac.required_dns ? pac.required_dns : false,
                set: []
            };
            this.setState({
                toInstallPackage: [...this.state.toInstallPackage, _pac],
            });
        } else {
            const _toInstallPackage = this.state.toInstallPackage.filter((_pac) => {
                return _pac.name !== pac.name;
            });
            this.setState({
                toInstallPackage: _toInstallPackage,
            });
        }
    };

    isChecked = (name) => {
        const p = this.state.toInstallPackage.find((_p) => {
            return _p.name === name;
        });
        if (p) {
            return true;
        } else {
            return false;
        }
    };

    initiateInstall = () => {
        let _toInstall = [];
        this.state.filteredPackages.forEach((pac) => {
            if (!pac.optional && pac.status !== "installed") {
                const _pac = {
                    chart: pac.chart,
                    name: pac.name,
                    
                    required_dns: pac.required_dns ? pac.required_dns : false,
                    set: []
                };
                if(pac.needs) _pac.needs = pac.needs;
                _toInstall.push(_pac);
            }
        });
        const unique = [];
        const packages = [...this.state.toInstallPackage, ..._toInstall];
        let _alertMessage = []
        packages.forEach((p) => {
            const _p = unique.find((u) => {
                return u.name === p.name;
            });
            if (!_p) {
                if(p.name === "argo" && !this.props.registrySet) {
                    _alertMessage.push((
                        <span>
                            <b>Argo</b> cannot be installed. Registry need to be set first.<br />
                            <i>Please unselect the package.</i>
                        </span>
                    ));
                } 
                if(p.name === "velero" && !this.props.clusterDetails?.cluster?.cloud_storage){
                    _alertMessage.push((
                        <span>
                            <b>Velero</b> cannot be installed. Storage need to be set first.<br />
                            <i>Please unselect the package.</i>
                        </span>
                    ));
                }
                unique.push(p);
            }
        });
        this.setState({packageInstallAlert: _alertMessage});
        this.setState(
            {
                
                toInstallPackage: unique,
            },
            () => {
                this.setState({
                    installPopUpOpen: true,
                });
            }
        );
    };

    initiateUninstall = (pac) => {
        this.setState({
            uninstallPopupOpen: true,
            currentPackage: pac,
        });
    };

    initiateUninstallAll = () => {
        this.setState({
            uninstallAllPopupOpen: true,
        });
    };

    getUniquePackages = (packages) => {
        const unique = [];
        packages.forEach((p) => {
            const _p = unique.find((u) => {
                return u.name === p.name;
            });
            if (!_p) {
                unique.push(p);
            }
        });
        return unique;
    };

    selectAll = (e) => {
        let _toInstall = [];
        this.setState({
            selectAll: e.target.checked,
        });
        if (e.target.checked) {
            this.state.filteredPackages.forEach((p) => {
                if (p.optional) {
                    const _p = {
                        chart: p.chart,
                        name: p.name,
                        
                        required_dns: p.required_dns ? p.required_dns : false,
                        set: []
                    };
                    _toInstall.push(_p);
                }
            });
            this.setState({
                toInstallPackage: _toInstall,
            });
        } else {
            this.setState({
                toInstallPackage: [],
                currentView: null,
            });
        }
    };

    handleInstallAgree = () => {
        this.setState({
            installPopUpOpen: false,
            toInstallPackage: [],
        });
        this.props.installClusterPackage(
            this.props.clusterDetails.id,
            this.state.toInstallPackage,
            this.props.afterInstall
        );
    };

    handleInstallDisagree = () => {
        this.setState({
            installPopUpOpen: false,
            packageInstallAlert: null
        });
    };

    handleUninstallAgree = () => {
        const _pac = [
            {
                chart: this.state.currentPackage.chart,
                name: this.state.currentPackage.name,
                
                required_dns: this.state.currentPackage.required_dns ? this.state.currentPackage.required_dns : false,
                set: []
            },
        ];
        this.props.uninstallClusterPackage(
            this.props.clusterDetails.id,
            _pac,
            this.props.afterInstall
        );
        this.setState({
            uninstallPopupOpen: false,
            currentPackage: null,
        });
    };

    handleUninstallAllAgree = () => {
        let uPackages = []
        if(this.state.filteredPackages){
            this.state.filteredPackages.forEach(_package => {
                if(_package.status === "installed"){
                    const _pac = {
                        chart: _package.chart,
                        name: _package.name,
                        
                        required_dns: _package.required_dns ? _package.required_dns : false,
                        set: []
                    }
                    uPackages.push(_pac)
                }
            })
            if(uPackages.length === 0){
                Toast.info("No installed packages found.")
                return 
            }
            this.props.uninstallClusterPackage(
                this.props.clusterDetails.id,
                uPackages,
                this.props.afterInstall
            );
            this.setState({
                uninstallPopupOpen: false,
                currentPackage: null,
            });

        }
    };

    handleUninstallDisagree = () => {
        this.setState({
            uninstallPopupOpen: false,
            currentPackage: null,
        });
    };

    handleUninstallAllDisagree = () => {
        this.setState({
            uninstallAllPopupOpen: false,
        });
    };

    disableButton = () => {
        let disable = false;
        if(!this.state.filteredPackages) return true;
        if(this.state.filteredPackages.find(p => !p.status)) return true;
        const installed= this.state.filteredPackages?.find(p => {
            return (!p.optional && p.status !== "installed")
        })
        if(this.state.toInstallPackage?.length ===0 && ! installed){
            disable =true
        }
        return disable;
    }

    isStorageSetup = () => {

    }

    expandPackage = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        const {filteredPackages} = this.state;
        const { classes, t } = this.props;
        return (
            <div className="m-t-20">
                <Card>
                    <CardHeader
                        className={classes.cardHeader}
                        avatar={
                            <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={() => {
                                this.expandPackage()
                            }}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        }
                        title={ 
                            <Typography varaint="h5" display="inline">
                                <strong> {t('Cluster.ClusterPackage.packages')} </strong>{" "}
                            </Typography>
                        }
                        
                    >
                    </CardHeader>
                    <Collapse in={this.state.expanded}>
                        <CardContent>
                            <Grid container justify="space-between" spacing={4}>
                                <Grid item xs={12} sm={7} alignItems="center">
                                            <Grid container spacing={2} direction="column">
                                                <Grid item md="12">
                                                    <Typography color="textPrimary" variant="body1">
                                                        {t('Cluster.ClusterPackage.bestTemplate')}
                                                    </Typography>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                    <Chip
                                                        label={t('Cluster.ClusterPackage.tinyLabel')}
                                                        clickable
                                                        color="primary"
                                                        onClick={() => this.handlePackageFilter(1)}
                                                        variant={
                                                            this.state.currentView === 1 ? "default" : "outlined"
                                                        }
                                                    />
                                                    </Grid>
                                                    <Grid item>
                                                    <Chip
                                                        label={t('Cluster.ClusterPackage.smallLabel')}
                                                        clickable
                                                        color="primary"
                                                        onClick={() => this.handlePackageFilter(2)}
                                                        variant={
                                                            this.state.currentView === 2 ? "default" : "outlined"
                                                        }
                                                    />
                                                    </Grid>
                                                    <Grid item>
                                                    <Chip
                                                        label={t('Cluster.ClusterPackage.largeLabel')}
                                                        clickable
                                                        color="primary"
                                                        onClick={() => this.handlePackageFilter(3)}
                                                        variant={
                                                            this.state.currentView === 3 ? "default" : "outlined"
                                                        }
                                                    />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                </Grid>
                                <Grid item xs={12} sm={4} >
                                            <Grid container justify="flex-end">
                                                <Grid item xs={4} sm={5} md={7} className={classes.buttonsGrid}>
                                                    <Button
                                                        label="install"
                                                        onClick={this.initiateInstall}
                                                        color={"primary"}
                                                        variant="contained"
                                                        disabled={this.disableButton()}
                                                    >{t('Cluster.ClusterPackage.installLabel')}
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={4} sm={7} md={5} className={classes.buttonsGrid}>
                                                    <Button
                                                        label="Uninstall All"
                                                        onClick={() => this.initiateUninstallAll()}
                                                        color={"primary"}
                                                        variant="contained"
                                                        disabled={this.state.filteredPackages?.filter(p => p.status === "installed").length  === 0}
                                                    > {t('Cluster.ClusterPackage.uninstallLabel')}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                </Grid>
                                <Grid item xs={12}>    
                                    {filteredPackages?.length > 0 ? (
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell>
                                                            
                                                            <Checkbox
                                                                color="primary"
                                                                
                                                                onChange={(e) => {
                                                                    this.selectAll(e);
                                                                }}
                                                            />
                                                            
                                                        </StyledTableCell>
                                                        
                                                        <StyledTableCell></StyledTableCell>
                                                        <StyledTableCell>{t('Cluster.ClusterPackage.packages')}</StyledTableCell>
                                                        <StyledTableCell>{t('Cluster.ClusterPackage.description')}</StyledTableCell>
                                                        <StyledTableCell>{t('Cluster.ClusterPackage.status')}</StyledTableCell>
                                                        <StyledTableCell></StyledTableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {filteredPackages &&
                                                    filteredPackages.map((pac, ind) => (
                                                        <StyledTableRow key={ind}>
                                                            <StyledTableCell>
                                                                {pac.status !== "installed" && (
                                                                    <Checkbox
                                                                        color="primary"
                                                                        checked={
                                                                            this.isChecked(pac.name) || !pac.optional
                                                                        }
                                                                        disabled={!pac.optional}
                                                                        onChange={(e) => {
                                                                            this.handleCheckboxChange(e, pac);
                                                                        }}
                                                                    />
                                                                )}
                                                            </StyledTableCell>
                                                            
                                                            <StyledTableCell>
                                                                <img
                                                                    src={pac?.icon ? pac.icon : ""}
                                                                    alt={pac.name}
                                                                    width={50}
                                                                >
                                                                </img>
                                                            </StyledTableCell>
                                                            <StyledTableCell>{pac.title}</StyledTableCell>
                                                            <StyledTableCell>{pac.description}</StyledTableCell>
                                                            <StyledTableCell>
                                                                {pac.status ? (  
                                                                    
                                                                    pac.status === "installed" && (
                                                                        <CheckCircleSharpIcon style={{color: getStatusColor("installed")}} />
                                                                    )
                                                                ): (
                                                                    <Skeleton height={20} width={20} circle={true} />
                                                                )}
                                                            </StyledTableCell>
                                                            <StyledTableCell>
                                                                {pac.status &&
                                                                pac.status === "installed" &&
                                                                
                                                                (
                                                                    
                                                                    <IconButton title={`Uninstall ${pac.title}`} onClick={() => { this.initiateUninstall(pac); }} >
                                                                        <DeleteSharpIcon />
                                                                    </IconButton>
                                                                    
                                                                )}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ) : (
                                        <> </>
                                    )}
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Collapse>
                </Card>

                {this.props.installingPackage && (
                    <BackdropLoader message={t('Cluster.ClusterPackage.packageApplicationInitiated')}/>
                )}
                {this.props.uninstallingPackage && (
                    <BackdropLoader message={t('Cluster.ClusterPackage.packageUninstallInitiated')}/>
                )}
                {this.state.installPopUpOpen && (
                    <ClusterInstallPopup
                        message={t('Cluster.ClusterPackage.installPackages')}
                        packages={this.state.toInstallPackage}
                        yesText={t('Cluster.ClusterPackage.yesText')}
                        handleAgree={this.handleInstallAgree}
                        handleDisAgree={this.handleInstallDisagree}
                        open={this.state.installPopUpOpen}
                        packageInstallAlert={this.state.packageInstallAlert}
                    />
                )}
                {this.state.uninstallPopupOpen && (
                    <ConfirmActionPopup
                        open={this.state.uninstallPopupOpen}
                        handleAgree={this.handleUninstallAgree}
                        handleDisAgree={this.handleUninstallDisagree}
                        message={t('Cluster.ClusterPackage.uninstallPackages')}
                        yesText={t('App.AppInfo.yesText')}
                        noText={t('App.AppInfo.noText')}
                    />
                )}
                {this.state.uninstallAllPopupOpen && (
                    <ConfirmActionPopup
                        open={this.state.uninstallAllPopupOpen}
                        handleAgree={this.handleUninstallAllAgree}
                        handleDisAgree={this.handleUninstallAllDisagree}
                        message={t('Cluster.ClusterPackage.uninstallAllPackages')}
                        yesText={t('App.AppInfo.yesText')}
                        noText={t('App.AppInfo.noText')}
                    />
                )}
            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        getClusterPackage: () => dispatch(getClusterPackage()),
        installClusterPackage: (id, packages, callback) =>
            dispatch(installClusterPackage(id, packages, callback)),
        uninstallClusterPackage: (id, packages, callback) =>
            dispatch(uninstallClusterPackage(id, packages, callback)),
        getPackageStatus: (id) => dispatch(getPackageStatus(id)),
        clearClusterPackageStatus: () => dispatch(clearClusterPackageStatus()),
    };
};

const mapStateToProps = (state) => {
    return {
        clusterPackageConfig: state.ClusterReducer.clusterPackageConfig,
        clusterPackageStatus: state.ClusterReducer.clusterPackageStatus,
        installingPackage: state.ClusterReducer.installingPackage,
        uninstallingPackage: state.ClusterReducer.uninstallingPackage,
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(withStyles(useStyles)(withTranslation()(ClusterPackage)));
