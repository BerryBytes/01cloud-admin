import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Typography,
  OutlinedInput,
  Button,
  FormControl,
  Select,
  MenuItem,
  Card,
} from "@material-ui/core";
import "react-mde/lib/styles/css/react-mde-all.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  getTicketDetails,
  assignTickets,
  assignServiceType,
  closeTicket,
  replyTicket,
  getTicketGroup,
  getAdminGroup,
} from "../redux/actions";
import MarkdownField from "../../../components/markdown/MarkdownField";

import MultiFileUpload from "../../../components/multifileupload";

import ImagePopupModal from "../../../components/imagepopupmodal/ImagePopupModal";
import ServiceType from "../../../components/servicetype/ServiceType";
import TicketDetailCard from "../../../components/ticketdetailcard/TicketDetailCard";
import TicketNotePopup from "./TicketNotePopup";
import paths from "../../../constants/paths";
import BackdropLoader from "../../../components/loader/BackdropLoader";
import Reply from "./Reply";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    
    marginTop: theme.spacing(2),
  },
  styleGrid: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  labelStyle: {
    color: "black",
    fontWeight: "bolder",
    textAlign: "start",
    marginBottom: theme.spacing(2),
  },
  customButtonStyle: {
    marginTop: theme.spacing(2),
    height: 40,
    width: "6rem",
    minWidth: "200px",
    maxWidth: "100%",
  },
  styleParagraph: {
    
    fontSize: "16px",
    color: "black",
    fontWeight: "bolder",
  },
  styleGridText: {
    color: "#0057fa",
    fontWeight: "bolder",
  },
  styleGridValue: {
    color: "gray",
    fontWeight: "bolder",
  },
  headerText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  divStyling: {
    
  },
  styledGrid: {
    fontSize: "16px",
    color: "black",
    fontWeight: "bolder",
    backgroundColor: "gray",
    margin: "0",
    padding: "0",
  },
  paperUser: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
  },
  style1: {
    fontSize: "16px",
    color: "black",
    fontWeight: "bolder",
    backgroundColor: "#f4f4f4",
    padding: "2%",
  },
  agentGrid: {
    padding: "2%",
  },
  fileStyle: {
    padding: "2%",
  },
  spanStyle: {
    color: "#0057fa",
  },
  fixedPosition: {
    marginTop: theme.spacing(2),
    position: "sticky",
    zIndex: theme.zIndex.appBar,
    padding: "10px 0px 10px 10px",
    top: "65px",
    background: "#f6f8fa",
    marginBottom: theme.spacing(2),
    
  },
  fixedPositionRight: {
    marginTop: theme.spacing(2),
    position: "sticky",
    
    top: "70px",
    background: "#f6f8fa",
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  fixedHeight: {
    paddingRight: theme.spacing(1) + "px !important",
    marginLeft: theme.spacing(1),
  },
}));

export function OverviewTab(props) {
  const [value, setValue] = React.useState("");
  const [closeTicketPopupOpen, setCloseTicketPopupOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [reset, setReset] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [openAttachment, setOpenAttachment] = useState(false);

  const [serviceTypeValue, setServiceTypeValue] = useState("0");
  const [serviceTypeButtonEnabled, setServiceTypeButtonEnabled] = useState(
    false
  );

  const [assignToValue, setAssignToValue] = useState("0");
  const [assignnToButtonEnabled, setAssignToButtonEnabled] = useState(false);

  const classes = useStyles();

  const setFiles = (files) => {
    setFile(files);
    if (files.length > 0) {
      setReset(false);
    }
  };

  const handleImageOpen = (image) => {
    setOpenAttachment(!openAttachment);
    setCurrentImage(image);
  };

  const checkCategory = () => {
    const cat = props.ticketGroup?.data?.find(
      (data) =>
        data.title === props.ticketDetails?.data?.ticketDetails?.category
    );
    if (cat) {
      setServiceTypeValue(cat.id ?? 1);
    }
  };

  const checkAssignee = () => {
    const admin = props.adminGroup?.data?.user?.find(
      (data) => data.id === props.ticketDetails?.data?.ticketDetails?.assignee
    );
    if (admin) {
      setAssignToValue(admin.id ?? 3);
    } else {
      setAssignToValue(0);
    }
  };

  useEffect(() => {
    props.getTicketDetails(props.match.params.ticketId);
    props.getTicketGroup();
    props.getAdminGroup();
    checkCategory();
  }, []);

  useEffect(() => {
    checkCategory();
    checkAssignee();
  }, [
    props.ticketDetails?.data?.ticketDetails?.category,
    props.ticketDetails?.data?.ticketDetails?.assignee,
  ]);

  const serviceTypeValueChangeHandler = (e) => {
    setServiceTypeButtonEnabled(true);
    setServiceTypeValue(e.target.value);
  };

  const assignToValueChangeHandler = (e) => {
    setAssignToButtonEnabled(true);
    setAssignToValue(e.target.value);
  };

  const serviceTypeSaveClickHandler = () => {
    let payload = {
      payload: {
        supportType: serviceTypeValue,
      },
      id: props.match.params.ticketId,
    };
    props.assignServiceType(payload);
    setServiceTypeButtonEnabled(false);
  };

  const assignToClickHandler = () => {
    let jsonData = {
      assignedTo: assignToValue,
      ticketId: parseInt(props.match.params.ticketId),
    };
    props.assignTickets(jsonData);
    setAssignToButtonEnabled(false);
  };

  const clearReplyData = () => {
    setFile([]);
    setValue("");
  };

  const replyHandler = () => {
    let jsonData = {
      reply: value,
      ticketId: props.ticketDetails?.data?.ticketDetails?.id,
      userId: props.currentUser?.id,
    };
    if (file?.length > 0) {
      const uploadFiles = [];
      file.forEach((f) => {
        const _f = {
          fileName: f.file?.name,
          fileType: f.file?.type,
          fileValue: f.url,
        };
        uploadFiles.push(_f);
      });
      jsonData.file = uploadFiles;
    }
    clearReplyData();
    setReset(true);
    props.replyTicket(jsonData);
  };

  const isReplyValid = () => {
    let val = false;
    if (
      props.ticketDetail?.data?.ticketDetail?.status !== "Closed" &&
      value?.trim()?.length > 0
    ) {
      val = true;
    }
    return val;
  };

  const closeTicketHandler = () => {
    setCloseTicketPopupOpen(true);
  };

  const closeTicketAgreeHandler = (note) => {
    setCloseTicketPopupOpen(false);
    let payload = {
      payload: {
        status: "Closed",
        note: note,
      },
      id: props.match.params.ticketId,
    };
    props.closeTicket(payload);
    props.history.push({
      pathname: paths.TICKETOVERVIEW.replace(
        ":ticketId",
        props.match.params.ticketId
      ),
      state: { allyProp: 1 },
    });
  };

  const closeTicketDisagreeHandler = () => {
    setCloseTicketPopupOpen(false);
  };

  return (
    <div data-test="overview-container">
      <Grid
        xs={12}
        sm={7}
        className={classes.fixedPosition}
        data-test="ticket-title"
      >
        <Typography className="textPrimary" variant="h4">
          <strong> {props.ticketDetails?.data?.ticketDetails?.title}</strong> #
          {props.ticketDetails?.data?.ticketDetails?.id}{" "}
        </Typography>
        
      </Grid>
      <Grid container spacing={2}>
        <Grid item className={classes.fixedHeight} xs={12} sm={7}>
          {/* ticket description start */}
          {(props.ticketDetails?.data?.ticketDetails?.description ||
            props.ticketDetails?.data?.files?.length > 0) && (
            <Card className={classes.paper}>
              {props.ticketDetails?.data?.ticketDetails?.description && (
                <Grid container spacing={1} className={classes.styleGrid}>
                  <div data-test="ticket-description" style={{ width: "100%" }}>
                    <strong>Description</strong>
                    <hr />
                    <MarkdownField
                      value={
                        props.ticketDetails?.data?.ticketDetails?.description
                      }
                      readOnly={true}
                    />
                  </div>
                </Grid>
              )}
              {props.ticketDetails?.data?.files?.length > 0 && (
                <div data-test="files-container">
                  <Grid container spacing={3} className={classes.divStyling}>
                    <Grid className={classes.styleParagraph} item md={12}>
                      <Typography color="textPrimary" variant="h6">
                        Attachments
                      </Typography>
                    </Grid>
                  </Grid>
                  <ImagePopupModal
                    images={props.ticketDetails?.data?.files}
                    readOnly={true}
                  />
                </div>
              )}
            </Card>
          )}

          {props.ticketDetails?.data?.conversation?.length > 0 && (
            <div data-test="conversation-container">
              {props.ticketDetails?.data?.conversation?.map((convo, ind) => (
                <Reply
                  convo={convo}
                  key={ind}
                  handleImageOpen={handleImageOpen}
                />
              ))}
            </div>
          )}

          {/* ticket description end */}

          {/* Reply Ticket Start */}

          {props.ticketDetails?.data?.ticketDetails?.status === "Closed" ? (
            ""
          ) : (
            <Paper className={classes.paper} data-test="reply-container">
              <Grid container spacing={1} className={classes.styleGrid}>
                <Grid item md={12} sm={6} xs={12}>
                  <div className={classes.divStyling}>
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      
                      <MarkdownField
                        data-test="reply-markdown"
                        value={value}
                        onChange={setValue}
                        title={"Write a Reply"}
                      />
                    </FormControl>
                  </div>
                </Grid>
              </Grid>

              <MultiFileUpload
                setFile={setFiles}
                reset={reset}
                data-test="reply-file-upload"
              />

              <Grid
                container
                justify="flex-end"
                spacing={2}
                style={{ marginLeft: "-3%" }}
              >
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.customButtonStyle}
                    disabled={!isReplyValid()}
                    onClick={replyHandler}
                    data-test="reply-button"
                  >
                    {" "}
                    Reply{" "}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.customButtonStyle}
                    disabled={
                      props.ticketDetails?.data?.ticketDetails?.status ===
                      "Closed"
                        ? true
                        : false
                    }
                    onClick={closeTicketHandler}
                    data-test="close-button"
                  >
                    {" "}
                    Close Ticket{" "}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}

          {/* reply ticket end */}
        </Grid>

        <Grid item xs={12} sm={4}>
          <div className={classes.fixedPositionRight}>
            <TicketDetailCard ticketDetails={props.ticketDetails} />
            {/* service type Portion start*/}
            {props.ticketDetails?.data?.ticketDetails?.status === "Closed" ? (
              ""
            ) : (
              <ServiceType
                value={serviceTypeValue}
                onChange={serviceTypeValueChangeHandler}
                onClick={serviceTypeSaveClickHandler}
                ticketGroup={props.ticketGroup}
                serviceTypeButtonEnabled={!serviceTypeButtonEnabled}
              />
            )}
            {/* service type end */}

            {/* assign to portion start*/}
            {props.ticketDetails?.data?.ticketDetails?.status === "Closed" ? (
              ""
            ) : (
              <Paper className={classes.paper}>
                <Grid spacing={1} container>
                  <Grid
                    className={classes.styleParagraph}
                    item
                    xs={12}
                    sm={12}
                    md={12}
                  >
                    <p> Assign To </p>
                  </Grid>
                </Grid>
                <Grid container spacing={1} className={classes.styleGrid}>
                  <Grid item xs={12} sm={6} md={12}>
                    <FormControl variant="outlined" style={{ width: "100%" }}>
                      <Select
                        input={<OutlinedInput />}
                        labelId="supportType"
                        name="support_type"
                        value={assignToValue}
                        onChange={assignToValueChangeHandler}
                      >
                        {props.adminGroup?.data?.user?.map((data) => (
                          <MenuItem key={data.id} value={data.id}>
                            {data.firstName + " " + data.lastName}{" "}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container justify="center">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.customButtonStyle}
                    disabled={!assignnToButtonEnabled}
                    onClick={assignToClickHandler}
                  >
                    {" "}
                    Save{" "}
                  </Button>
                </Grid>
              </Paper>
            )}
            {/* assign to  end */}
          </div>
        </Grid>
      </Grid>

      {closeTicketPopupOpen && (
        <TicketNotePopup
          open={closeTicketPopupOpen}
          label="Close"
          action={closeTicketAgreeHandler}
          handleClose={() => closeTicketDisagreeHandler()}
        />
      )}
      {props.assignTicketLoader && <BackdropLoader message="Assigning Ticket" />}
      {props.serviceTypeLoader && <BackdropLoader message="Changing Service Type" />}
      {props.replyIssueLoader && <BackdropLoader message="Loading..." />}

      {currentImage && openAttachment && (
        <ImagePopupModal
          open={openAttachment}
          image={currentImage?.fileValue}
          alt={currentImage?.fileName}
          onClick={handleImageOpen}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ticketDetails: state.SupportReducer.ticketDetails,
    assignedTicketResponse: state.SupportReducer.assignedTicketResponse,
    assignedServiceTypeResponse:
      state.SupportReducer.assignedServiceTypeResponse,
    closedTicketResponse: state.SupportReducer.closedTicketResponse,
    replyIssueResponse: state.SupportReducer.replyIssueResponse,
    currentUser: state.AuthReducer.user,
    ticketGroup: state.SupportReducer.ticketGroup,
    adminGroup: state.SupportReducer.adminGroup,
    assignTicketLoader: state.SupportReducer.assignTicketLoader,
    serviceTypeLoader: state.SupportReducer.serviceTypeLoader,
    replyIssueLoader: state.SupportReducer.replyIssueLoader,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminGroup: () => dispatch(getAdminGroup()),
    getTicketGroup: () => dispatch(getTicketGroup()),
    getTicketDetails: (id) => dispatch(getTicketDetails(id)),
    assignTickets: (jsonData) => dispatch(assignTickets(jsonData)),
    assignServiceType: (jsonData) => dispatch(assignServiceType(jsonData)),
    closeTicket: (jsonData) => dispatch(closeTicket(jsonData)),
    replyTicket: (jsonData) => dispatch(replyTicket(jsonData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OverviewTab));
