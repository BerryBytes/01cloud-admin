import {
    Button,
    Card,
    CardActions, CardContent,
    CardHeader,
    Divider, Grid, Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import BackdropLoader from '../../components/loader/BackdropLoader';
import MuiTextField from "../../components/textfield/MuiTextField";
import { updateClusterRepo } from './redux/actions';
import { useTranslation } from 'react-i18next';

const ClusterImportEndpoints = (props) => {
    const [t] = useTranslation()
    
    const [formData, setFormData] = useState({
        image_repo_username: "",
        image_repo_service: "",
        image_repo_password: "",
        image_repo_project: ""
    })

    const [errors, setErrors] = useState({});

    const handleSubmit = () => {
        let jsonBody = new FormData(); 
        jsonBody.append("image_repo_username", formData.image_repo_username);
        jsonBody.append("image_repo_service", formData.image_repo_service);
        jsonBody.append("image_repo_password", formData.image_repo_password);
        jsonBody.append("image_repo_project", formData.image_repo_project);
        props.updateClusterRepo(props.clusterId, jsonBody, props.mainClusterId);
    };

    const updateFormData = (e) => { 
        
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        const isEmptyCheck = e.currentTarget.getAttribute('emptyCheck');
        if (isEmptyCheck === "1") {
            setErrors({
                ...errors,
                [e.target.name]: e.target.value === "" ? "Value cannot be empty" : ""
            })
        }
    }
    const isFormValid = () => {
        let valid = false;
        let e = false
        Object.keys(errors).forEach(k => {
            if (errors[k]) {
                e = true
                return
            }
        })
        if(formData.image_repo_service.trim() !== "" 
            && formData.image_repo_project.trim() !== ""
            && !e)
        {
            valid = true;
        }
        return !valid; 
    }

    return (
        <>
            <Card className="m-t-20">
                <CardHeader title={t('Cluster.ClusterImportEndpoints.updateRepoDetails')} />
                <CardContent>
                    <Grid>
                        <Grid container spacing={2} >
                            <Grid item md="6">
                                <Typography variant='h5'> {t('Cluster.ClusterImportEndpoints.imageRepoService')} </Typography>
                                <MuiTextField
                                    name="image_repo_service"
                                    value={formData.image_repo_service}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                    inputProps={{
                                        emptyCheck: "1"
                                    }}
                                    error={errors.image_repo_service}
                                    helperText={errors.image_repo_service && errors.image_repo_service}
                                />
                            </Grid>
                            <Grid item md="6">
                                <Typography variant='h5' > {t('Cluster.ClusterImportEndpoints.imageRepoProject')}</Typography>
                                <MuiTextField
                                    name="image_repo_project"
                                    value={formData.image_repo_project}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                    inputProps={{
                                        emptyCheck: "1"
                                    }}
                                    error={errors.image_repo_project}
                                    helperText={errors.image_repo_project && errors.image_repo_project}
                                />
                            </Grid>

                            <Grid item md="6">
                                <Typography variant='h5' > {t('Cluster.ClusterImportEndpoints.imageRepoUsername')} </Typography>
                                <MuiTextField
                                    name="image_repo_username"
                                    value={formData.image_repo_username}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item md={6}>
                                <Typography variant='h5' >{t('Cluster.ClusterImportEndpoints.imageRepoPassword')}</Typography>
                                <MuiTextField
                                    name="image_repo_password"
                                    value={formData.image_repo_password}
                                    onChange={(e) => updateFormData(e)}
                                    type="text"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                        variant="contained"
                        disabled={isFormValid()}
                    >
                       {t('Cluster.ClusterImportEndpoints.update')}
                    </Button>
                </CardActions>
            </Card>
            
        { props.updatingRepoDetails && <BackdropLoader message={t('Cluster.ClusterImportEndpoints.updatingRepoDetails')} /> }
        </>
    );
};

const mapStateToProps = state => ({
    updatingRepoDetails: state.ClusterReducer.updatingRepoDetails
})

const mapDispatchtoProps = dispatch => {
    return {
        updateClusterRepo: (id, jsonBody, mainClusterId) => dispatch(updateClusterRepo(id, jsonBody, mainClusterId)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchtoProps
)(ClusterImportEndpoints)
