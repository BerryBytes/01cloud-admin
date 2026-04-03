import React, { Component } from 'react'
import {
    withStyles,
    Grid,
    Link,
    Card,
    List, 
    ListItem, 
    ListItemText, 
    ListItemIcon,
    CardContent,
    CardHeader
} from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CheckIcon from '@material-ui/icons/Check';
import LaunchIcon from '@material-ui/icons/Launch';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { AppConstants } from '../../../../constants/appconstants';
import { withTranslation } from 'react-i18next';

const useStyles = () => ({
    actions: {
        display: 'flex',
        justifyContent: 'center'
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
    },
    permissionList: {
        maxHeight: 200,
        overflowY: "auto"
    },
    alignmiddle:{
        verticalAlign:"middle"
    },
    allowd:{
        color:"green"
    },
    notallowd:{
        color:"red"
    }

});

class Permissions extends Component {
    
    render() {
        const { classes, validationData, provider,t } = this.props;
        let learn_more_link = ""
        if(provider){
            switch(provider){
                case AppConstants.ClusterProvider.GCP:
                    learn_more_link = "https://cloud.google.com/iam/docs/understanding-roles/"
                    break
                case AppConstants.ClusterProvider.EKS:
                    learn_more_link = "https://aws.amazon.com/iam/features/manage-permissions/"
                    break
                default:
                    return
            }
        }
        return (
            <div>
                {
                    validationData &&
                    <Grid container justify="center" alignItems="center" spacing={2} className="m-t-20">
                        <Grid item md={12} >
                            <Card>
                                <CardHeader title="Permissions" />
                                <CardContent>
                                    <div className={classes.demo}>
                                        <Grid container spacing={2} justify="center" alignContent="center" alignItems="center">
                                            <Grid item> {t('Cluster.ProviderPermissions.total')} : { validationData.has_permission.length + validationData.no_permission.length }: </Grid>
                                            <Grid item><span className={classes.alignmiddle}><CheckIcon className={classes.allowd}/> </span> <span className={classes.alignmiddle}>{ validationData.has_permission ? validationData.has_permission.length : 0 }</span></Grid>
                                            <Grid item><span className={classes.alignmiddle}><ClearOutlinedIcon fontSize="small" className={classes.notallowd}/></span><span className={classes.alignmiddle}>{ validationData.no_permission ? validationData.no_permission.length : 0 }</span></Grid>
                                        </Grid>
                                        <List className={classes.permissionList}>
                                            {
                                                validationData.no_permission && validationData.no_permission.length > 0 && validationData.no_permission.map((item, ind) => (
                                                    <ListItem key={ ind }>
                                                        <ListItemIcon><ClearOutlinedIcon className={ classes.notallowd} /></ListItemIcon>
                                                        <ListItemText primary={item}/>
                                                    </ListItem>
                                                ))
                                                
                                            }
                                            {
                                                validationData.has_permission && validationData.has_permission.length > 0 &&validationData.has_permission.map((item, ind) => (
                                                    <ListItem key={ind}>
                                                        <ListItemIcon><CheckIcon className={classes.allowd}/></ListItemIcon>
                                                        <ListItemText primary={item} />
                                                    </ListItem>
                                                ))
                                            }
                                        </List>
                                        <div className="m-t-20"> 
                                            <Link
                                              target="_blank"
                                              href={learn_more_link}
                                              className="cnameLink"
                                              rel="noreferrer"
                                              underline="always"
                                            >
                                                {t('Cluster.ProviderPermissions.learnMore')}<LaunchIcon className="openLinkIcon" />
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                }
            </div>
        )
    }
}

const mapDispatchtoProps = () => {
    return {

    }
}

const mapStateToProps = () => {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(
    compose(
        withStyles,
    )(useStyles)(withTranslation()(Permissions))
)
