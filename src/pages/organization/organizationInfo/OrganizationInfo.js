import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import { getOrganizationById, getProjectOfOrganization, getClusterOfOrganization } from '../redux/actions';
import { OrganizationProjects } from '../../../components/organizationprojects/OrganizationProjects';
import { OrganizationMembers } from '../../../components/organizationmembers/OrganizationMembers';
import { OrganizationClusters } from '../../../components/organizationclusters/OrganizationClusters';
import BackButton from '../../../components/button/BackButton';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(2)
      },
      table: {
        minWidth: 650,
      }, 
      tableHeight: {
        maxHeight:300
      }
}))

export function OrganizationInfo(props){
    const classes = useStyles() 

    React.useEffect(() => {
        props.getOrganizationById(props.match.params.organizationId)
        props.getProjectOfOrganization(props.match.params.organizationId)
        props.getClusterOfOrganization(props.match.params.organizationId)
    }, [])

    const navToOrgList = () => {
        props.history.goBack()
    }

    return (
        <div className={classes.root} data-test="main-container">
                <BackButton clickHandler={() => navToOrgList()} name="Organizations List"/>
                <Grid container>
                   <Grid item md={4} xs={12}>
                        <Typography color="textPrimary" style={{ marginTop: 18}}  variant="h4" data-test="org-name">
                            {props.organizationDetailById?.name}
                        </Typography>
                   </Grid>
                </Grid>

                { 
                    props?.projectsList && 
                    <>
                        { 
                            <OrganizationProjects 
                                data-test="projects"
                                projectsList={props?.projectsList}
                            />
                        }
                    </>
                }

                { 
                    props.organizationDetailById?.members && 
                    <>
                        { 
                            <OrganizationMembers 
                                data-test="members"
                                membersList={props.organizationDetailById?.members}
                            />
                        }
                    </>
                }

                { 
                    props?.clustersList && 
                    <>
                        { 
                            <OrganizationClusters 
                                data-test="clusters"
                                clustersList={props?.clustersList}
                            />
                        }
                    </>
                }
        </div> 
    )
}

const mapStateToProps = state => {
    return {
        projectsList: state.OrganizationReducer.projectsList,
        clustersList: state.OrganizationReducer.clustersList,
        organizationDetailById: state.OrganizationReducer.organizationDetailById,
        fetchingOrganizationDetailById: state.OrganizationReducer.fetchingOrganizationDetailById,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        getOrganizationById: (id) => dispatch(getOrganizationById(id)),
        getProjectOfOrganization: (oid) => dispatch(getProjectOfOrganization(oid)),
        getClusterOfOrganization: (oid) => dispatch(getClusterOfOrganization(oid))
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(OrganizationInfo);