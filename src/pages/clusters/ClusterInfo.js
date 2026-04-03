import React, { Component } from 'react';
import {
    Grid,
    Card,
    CardContent,
} from '@material-ui/core';
import { ClusterStatus } from '../../components/statusindicator/statusindicator'
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { getClusterDetails, clearClusterInfo } from './redux/actions'
import { AppConstants } from '../../constants/appconstants';
import { getDateInStandardFormat } from '../../helpers/utils'
import BackdropLoader from '../../components/loader/BackdropLoader'

import ClusterPackage from './clusterpackage';
import ClusterWS from '../../containers/ClusterWS';
import ClusterDNS from './ClusterDNS';
import ClusterEnvironmentDetails from './ClusterEnvironmentDetails';
import ClusterRegistry from './ClusterRegistry';
import { withTranslation } from 'react-i18next';
import ClusterStorage from './ClusterStorage';
import NodeGroup from "./NodeGroup"
import KeyValueRow from '../../components/keyvaluerow/KeyValueRow';
import ClusterMonitor from './ClusterMonitor';

const useStyles = () => ({
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
    topcard:{
        minHeight:'175px'
    },
    noleftmargin:{
        marginLeft:0
    }
});

export class ClusterInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            activeNGIndex: 0
        }
    }

    componentDidMount() {
        if(this.props.clusterId > 0)
        {
          this.props.getClusterDetails(this.props.clusterId);
        }
    }

    componentWillUnmount(){
        this.props.clearClusterInfo()
    }

    handleNGSelection = (index) => {
        this.setState({ activeNGIndex: index });
    }

    render() {
        const { classes, clusterDetails, t } = this.props;
        const cluster = clusterDetails?.cluster;
        return (
            <>
                <ClusterWS clusterId={ this.props.clusterId }  /> 
                {
                clusterDetails &&
                <Grid data-test="main-container">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} data-test="cluster-info">
                            <Card>
                                <CardContent>
                                    
                                        {
                                            clusterDetails.cluster_version &&
                                                <KeyValueRow data-test="cluster-version" rowKey={t('Cluster.ClusterInfo.version')} rowValue={ clusterDetails.cluster_version} />
                                        }
                                        <KeyValueRow rowKey={t('Cluster.ClusterInfo.region')} rowValue={ clusterDetails.region} data-test="cluster-region" />
                                        <KeyValueRow rowKey={t('Cluster.ClusterInfo.provider')} rowValue={clusterDetails.provider ? clusterDetails.provider : clusterDetails.cluster.provider } data-test="cluster-provider" />
                                        <KeyValueRow rowKey={t('Cluster.ClusterInfo.status')} rowValue={ <ClusterStatus status={clusterDetails.status} data-test="cluster-status"/>} className="clusterInfoStatus" />
                                        <KeyValueRow rowKey={t('Cluster.ClusterInfo.created')} rowValue={ getDateInStandardFormat(clusterDetails.createdat) } data-test="cluster-created" />
                                    
                                </CardContent>
                            </Card>
                        </Grid>
                        {
                            clusterDetails.type !== "imported" &&
                            <Grid item xs={12} sm={6} data-test="project-info">
                                <Card className={classes.topcard}>
                                    <CardContent>
                                            {
                                                clusterDetails.project_id &&
                                                    <KeyValueRow rowKey={t('Cluster.ClusterInfo.projectId')} rowValue={ clusterDetails.project_id} data-test="project-id" />
                                            }
                                            {
                                                clusterDetails.vpc_name &&
                                                <KeyValueRow rowKey={t('Cluster.ClusterInfo.vpc')} rowValue={ clusterDetails.vpc_name} data-test="project-vpc" />
                                            }
                                            {
                                                clusterDetails.network_cidr &&
                                                <KeyValueRow rowKey={t('Cluster.ClusterInfo.vpcCIDR')} rowValue={ clusterDetails.network_cidr} data-test="project-cidr" />
                                            }
                                            {
                                                clusterDetails.subnet_cidr_range &&
                                                <KeyValueRow rowKey={t('Cluster.ClusterInfo.subnetCIDR')} rowValue={clusterDetails.subnet_cidr_range} data-test="project-subnet" />
                                            }
                                            <KeyValueRow rowKey={t('Cluster.ClusterInfo.pvcWriteMany')} rowValue={Boolean(clusterDetails.pvc_write_many).toString()} data-test="project-pvc" />
                                            {
                                                clusterDetails.zone && clusterDetails.zone.length > 0 && 
                                                    <KeyValueRow rowKey={t('Cluster.ClusterInfo.zone')} rowValue={(clusterDetails.zone[0]).toString()} data-test="project-zone" />
                                                 
                                            }
                                            
                                    </CardContent>
                                </Card>
                            </Grid>
                        }
                        {
                            clusterDetails.type === "imported" &&
                            <Grid item md={6} data-test="cluster-imported">
                                <Card>
                                    
                                    <CardContent>
                                        
                                            <KeyValueRow rowKey={t('Cluster.ClusterInfo.zone')} rowValue={clusterDetails.zone} data-test="imported-zone" />
                                            <KeyValueRow rowKey={t('Cluster.ClusterInfo.argoURL')} rowValue={clusterDetails?.cluster?.ArgoServerUrl} data-test="imported-argo" />
                                            <KeyValueRow rowKey={t('Cluster.ClusterInfo.promotheusURL')} rowValue={clusterDetails?.cluster?.PrometheusServerUrl} data-test="imported-url" />
                                        
                                    </CardContent>
                                </Card>
                            </Grid>
                        }
                    </Grid>

                        { cluster && clusterDetails.type !== "imported" &&
                            <NodeGroup clusterDetails= {clusterDetails} />  
                        }
                        { 
                            
                                    <ClusterRegistry clusterId={cluster.id} destroyed={clusterDetails.status === "destroyed"} mainClusterId={this.props.clusterId} cluster={cluster} />
                            
                        }
                        { 
                            cluster && 
                            <>
                                { 
                                    <ClusterDNS 
                                        dnsId={cluster.dns_id ?? null} 
                                        clusterId={cluster.id} 
                                        mainClusterId={ this.props.clusterId } 
                                        packagesInstalled={clusterDetails.status === "package-installed"}
                                        destroyed={clusterDetails.status === "destroyed"}
                                        data-test="cluster-dns" 
                                    />
                                }
                            </>
                        }
                        { 
                            cluster && 
                            <>
                                { 
                                    <ClusterStorage 
                                        packagesInstalled={clusterDetails.status === "package-installed"}
                                        destroyed={clusterDetails.status === "destroyed"}
                                        clusterDetails={clusterDetails}
                                        data-test="cluster-storage" 
                                    />
                                }
                            </>
                        }

                        {
                            cluster && 
                                <ClusterMonitor clusterId={this.props.clusterId} />
                        }
                      
                        {
                            cluster && cluster.dns_id > 0 &&
                            <>
                                {
                                    (clusterDetails?.type === "imported" || clusterDetails?.status === AppConstants.ClusterStatus.Applied || clusterDetails?.status === AppConstants.ClusterStatus.PackageInstalled) &&
                                        <ClusterPackage 
                                            updatePackageList={this.props.updatePackage} 
                                            afterInstall={this.props.afterInstall} 
                                            registrySet={cluster.image_registry_id > 0}
                                            clusterDetails = {this.props.clusterDetails}   
                                        />
                                }
                            </>
                        } 
                         
                            { 
                                cluster && 
                                <>
                                    { 
                                        <ClusterEnvironmentDetails 
                                            clusterId={cluster.id} 
                                        />
                                    }
                                </>
                            }
                             
                </Grid>
                }
                { this.props.fetchingClusterDetails && <BackdropLoader message={t('Cluster.ClusterInfo.loadingClusterDetails')} /> }
            </>
        )
    }
}

const mapStateToProps = state => ({
    clusterDetails: state.ClusterReducer.clusterDetails,
    fetchingClusterDetails: state.ClusterReducer.fetchingClusterDetails
})

const mapDispatchtoProps = dispatch => {
    return {
        getClusterDetails: (id) => dispatch(getClusterDetails(id)),
        clearClusterInfo: () => dispatch(clearClusterInfo())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(withStyles(useStyles)(withTranslation()(ClusterInfo)))
