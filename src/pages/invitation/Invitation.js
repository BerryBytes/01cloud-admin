import { Divider, Typography, Grid, Chip, Menu, MenuItem } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from '@material-ui/icons/Close';
import React, { Component, useState } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import CustomButton from "../../components/custombutton/CustomButton";
import { getDateInStandardFormat } from "../../helpers/utils";
import { updateBreadcrumb } from "../project/redux/actions";
import AddInvitation from "./AddInvitation";
import { approveInvitation, deleteInvitation, emailResend, fetchInvitationList } from "./redux/actions";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: "grey",
    fontWeight: 500,
  },
  body: {
    color: "#555",
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
  root: {},
}))(TableRow);

export const ActionMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleBackupMenu = (e) => {
      setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const handleApproveorResendEmail = () => {
      handleMenuClose();
      props.handleApproveorResend()
  }
  
  const handleDelete = () => {
      handleMenuClose();
      props.handleDeleteInvitation()
  }

  return (
          <>
              <IconButton data-test="icon-btn" onClick={(e) => handleBackupMenu(e)}>
                  <MoreVertIcon />
              </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => handleMenuClose()}
                    getContentAnchorEl={null}
                    disableScrollLock={true}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    data-test="menu-container"
                >
                    <MenuItem onClick={() => handleApproveorResendEmail()}>{props.checkSendEmail?"Resend Email":"APPROVE"}</MenuItem>
                    <MenuItem onClick={() => handleDelete()}>DELETE</MenuItem>
                </Menu>
          </>                    
         )
}
export class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedInviteId: 0,
      isCreateInvitePopupOpen: false,
      currentView: 1,
      deleteId: 0,
      resendId:0,
      actionType:"",
      isPopupOpened: false,
    };
  }

  componentDidMount() {
    this.props.fetchInvitationList();
    const breadcrumbData = [{ name: "Invitations", path: "/invitations" }];
    this.props.updateBreadcrumb(breadcrumbData);
  }

    handleInvite = () => {
        this.setState({
            isCreateInvitePopupOpen: true
          })
    }

    handleInviteCancel = () => {
        this.setState({
            isCreateInvitePopupOpen: false
        })
    }
    
    handleApprove = (id) => {
        this.setState({ 
            selectedInviteId: id,
            actionType:"approve",
            isPopupOpened: true
        })
    }

    handleDelete = (id) => {
      this.setState({
        deleteId: id,
        actionType:"removeInvitation",
        isPopupOpened: true
      })
    }

    handleResendEmail = (id) =>{
      this.setState({ 
          resendId: id,
          actionType:"resendEmail",
          isPopupOpened: true
        })
    }

    agreeHandler = (actionType) => {
      if(actionType ==="resendEmail"){
        this.props.emailResend(this.state.resendId);
      }else if(actionType ==="approve"){
        this.props.approveInvitation(this.state.selectedInviteId);
      }else if(actionType === "removeInvitation"){
        this.props.deleteInvitation(this.state.deleteId);
      }
      this.setState({
        isPopupOpened: false,
        actionType:"",
        selectedInviteId: 0,
        deleteId: 0,
        resendId:0,
      })
    }

    disagreeHandler = () => {
      this.setState({
        isPopupOpened: false,
        actionType:"",
        selectedInviteId: 0,
        deleteId: 0,
        resendId:0,
      })
    }

    handleCreateEditSuccess = () => {
        this.setState({
            isCreateInvitePopupOpen: false
        })
    }

    handleListFilterClick = (type) => {
      this.setState({ currentView: type })
    }

  render() {
    const { invitationList, t } = this.props;
    const { actionType, currentView } = this.state;
    const filteredList = invitationList && invitationList.length > 0 && invitationList.filter(x => (this.state.currentView === 1 && !x.email_sent) ||  (this.state.currentView === 2 && x.email_sent))
    return (
      <div data-test="main-container">
        <div className="listContainer">
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography color="textPrimary" variant="h5" data-test="invitation-header">
                {t("Invitations")}
              </Typography>
            </Grid>
            {
                invitationList && invitationList.length > 0 &&
                <>
                    <Grid item>
                        <Chip
                            data-test="pending-chip"
                            label="Pending"
                            clickable
                            color="primary"
                            onClick={ () => this.handleListFilterClick(1) }
                            variant= { this.state.currentView === 1 ? "default" : "outlined" }
                        />    
                    </Grid>
                    <Grid item>
                        <Chip
                            data-test="approved-chip"
                            label="Approved"
                            clickable
                            color="primary"
                            onClick={ () => this.handleListFilterClick(2) }
                            variant= { this.state.currentView === 2 ? "default" : "outlined" }
                        />    
                    </Grid>
                </>
            }
          </Grid>
          <CustomButton
            data-test="invite-button"
            label={t("Invite")}
            onClick={() => this.handleInvite()}
          />
        </div>
        <TableContainer component={Paper}>
          <Table data-test="invite-table">
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Created At</StyledTableCell>
                <StyledTableCell>Company</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Purpose</StyledTableCell>
                {currentView === 2 && <StyledTableCell>Approved</StyledTableCell>}
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredList &&
                filteredList.map((invitation, ind) => (
                  <StyledTableRow key={invitation.id}>
                    <StyledTableCell>{ind + 1}</StyledTableCell>
                    <StyledTableCell data-test="name">{invitation.first_name + " " + invitation.last_name}</StyledTableCell>
                    <StyledTableCell data-test="email">
                      {invitation.email}
                    </StyledTableCell>
                    <StyledTableCell data-test="email">
                    {getDateInStandardFormat(invitation.createdat)} 
                    </StyledTableCell>
                    <StyledTableCell data-test="company">
                      {invitation.company}
                    </StyledTableCell>
                    <StyledTableCell data-test="designation">
                      {invitation.designation}
                    </StyledTableCell>
                    <StyledTableCell data-test="remarks">
                      {invitation.remarks}
                    </StyledTableCell>
                    {invitation.email_sent && 
                    <StyledTableCell>
                      <p><span className="activestatus" data-test="approved"></span>{getDateInStandardFormat(invitation.updatedat)}</p>
                    </StyledTableCell>
                    }
                    <StyledTableCell>
                      <ActionMenu
                        checkSendEmail = {invitation.email_sent}
                        handleApproveorResend = {invitation.email_sent?()=>this.handleResendEmail(invitation.id):()=>this.handleApprove(invitation.id)}
                        handleDeleteInvitation = {() => this.handleDelete(invitation.id)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
          {
              invitationList && invitationList.length === 0 && 
              <div className="alignCenter" data-test="no-invitation"> <p> No Invitations </p> </div>
            }
            {
              filteredList && filteredList.length === 0 && 
              <>{ this.state.currentView === 1 ? <div className="alignCenter"> <p data-test="no-pending"> No Pending Invitations </p> </div> : <div className="alignCenter"> <p data-test="no-approved"> No Approved Invitations </p> </div>}</>
            }
        </TableContainer>

        <ConfirmActionPopup
            data-test="approve-popup"
            open={this.state.isPopupOpened}
            handleAgree={() => this.agreeHandler(actionType)}
            handleDisAgree={() => this.disagreeHandler()}
            message={actionType==="approve"?"Are you sure you want to appove the user?":
            actionType==="removeInvitation"?"Are you sure you want to remove invitation?":
            actionType==="resendEmail"?"Are you sure you want to resend email?":""
            }
            yesText="Yes"
            noText="No"
        />

        {
            this.state.isCreateInvitePopupOpen &&
            <Dialog
                data-test="dialog"
                open={this.state.isCreateInvitePopupOpen}
                keepMounted
                onClose={() => this.handleInviteCancel()}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                disableBackdropClick={true}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <Typography data-test="invite" className='dialogtitle'>Invite</Typography>
                    <IconButton data-test="close-button" aria-label="close" size="small" className='rightbtn' onClick={() => this.handleInviteCancel()}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-slide-description">
                        <AddInvitation data-test="add-invitation" handleCreateEditSuccess={ this.handleCreateEditSuccess }/>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    invitationList: state.InvitationReducer.invitationList,
  };
};

const mapDispatchToProps = (dispatch) => ({
   fetchInvitationList: () => dispatch(fetchInvitationList()),
   approveInvitation: (id) => dispatch(approveInvitation(id)),
   updateBreadcrumb: (breadcrumbData) => dispatch(updateBreadcrumb(breadcrumbData)),
   deleteInvitation: (id) => dispatch(deleteInvitation(id)),
   emailResend: (id) => dispatch(emailResend(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Invitation));
