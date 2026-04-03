import React, { Component } from 'react';
import { Dialog,
    DialogActions,
    DialogContent,
    Typography,
    Slide,
    Button, }
from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteUsersInProject,deleteUsersInEnvironment } from '../adduserpopup/redux/actions';

const transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ ref } { ...props } />;
});

class Popup extends Component {
    constructor(props){
        super(props);
        this.state = {
            allUsers : [],
            isPopupOpened : false,
            id : 0
        }
    }

    handleDeleteUser = () => {
        if(this.props.environmentDetailsComponent){
            this.deletUserInEnvironmentHandler();
        }else{
            this.deleteUserInProjectHandler();
        }
    }

    deleteUserInProjectHandler = () => {
        const payload = {
            project_id : this.props.projectDetails.id,
            user_id : this.props.userId
        }
        this.setState({
            isPopupOpened : false
        })
        this.props.deleteUsersInProjectAction(payload)
    }

    deletUserInEnvironmentHandler = () => {
        const payload = {
            environment_id :66,
            user_id : this.props.userId
        }
        this.setState({
            isPopupOpened : false
        })
        this.props.deleteUsersInEnvironmentAction(payload)
    }

    UNSAFE_componentWillReceiveProps = (newProps) => {
        if(this.state.id !== newProps.open){
            this.setState({
                isPopupOpened : true,
                id: newProps.open
            })
        }
    }

    handleClose = () => {
        this.setState({
            isPopupOpened : false
        })
    }

    render(){
        return(
            <Dialog
            open={ this.state.isPopupOpened }
            TransitionComponent={ transition }
            keepMounted
            onClose={ this.handleDisAgree }
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <Typography variant='subtitle1'>Are you sure you want to delete user?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={ this.handleClose }>
                        Close
                    </Button>
                    <Button onClick={ this.handleDeleteUser } color="primary">
                        Send Request
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = state => ({
    projectDetails: state.ProjectReducer.projectDetails
})

const mapDispatchtoProps = dispatch => {
    return {
        deleteUsersInProjectAction : (payload) => dispatch(deleteUsersInProject(payload)),
        deleteUsersInEnvironmentAction : (payload) => dispatch(deleteUsersInEnvironment(payload))
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Popup)
