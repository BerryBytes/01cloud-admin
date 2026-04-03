import React from "react";
import { Card, Grid, Typography, Avatar } from "@material-ui/core";
import { getDateInStandardFormat, getDiffDays } from "../../../helpers/utils";
import { makeStyles } from "@material-ui/core/styles";
import MarkdownField from "../../../components/markdown/MarkdownField";
import ImagePopupModal from "../../../components/imagepopupmodal/ImagePopupModal";

const useStyles = makeStyles((theme) => ({
  styleParagraph: {
    
    fontSize: "16px",
    color: "black",
    fontWeight: "bolder",
  },
  divStyling: {
    padding: "2%",
  },
  paperUser: {
    color: theme.palette?.text?.secondary,
    marginTop: theme.spacing(2),
  },
  style1: {
    fontSize: "14px",
    color: "black",
    
    backgroundColor: "#f4f4f4",
    padding: "4px",
  },
  otherAction: {
    fontSize: "14px",
    color: "black",
    
    padding: "4px",
  },
  agentGrid: {
    padding: "2%",
  },
  imageBlur: {
    opacity: 0.4,
  },
  replyDesc: {
    margin: 5,
    padding: 5,
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export const ReplyHeader = (props) => {
  const classes = useStyles();
  const { convo } = props;

  return (
    <Grid
      container
      direction="row"
      className={props.otherAction ? classes.otherAction : classes.style1}
      spacing={2}
    >
      <Grid item data-test="avatar-container">
        <Avatar
          src={
            convo.userAvatar ? convo.userAvatar : "./Images/profile_image.png"
          }
          sizes="small"
          variant="circle"
          className={classes.small}
        />
      </Grid>

      <Grid item>
        <Grid container direction="row">
          <Typography
            color="initial"
            variant="h5"
            
            style={{
              marginTop: "7px",
            }}
            data-test="message-container"
          >
            {convo.userName} {props.message} on &nbsp;
          </Typography>
          <Typography
            style={{
              marginTop: "7px",
            }}
            color="initial"
            data-test="date-container"
          >
            {" "}
            {getDateInStandardFormat(convo.date * 1000)}{" "}
            {`(${getDiffDays(convo.date * 1000, true)})`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const OpenTicket = (props) => {
  const { convo } = props;
  const classes = useStyles();

  return (
    <>
      {convo.message ? (
        <Card className={classes.paperUser}>
          <ReplyHeader
            convo={convo}
            otherAction={false}
            message={"changed the ticket status to Open"}
          />

          {convo.message && (
            <div className={classes.replyDesc} data-test="message-container">
              <MarkdownField value={convo.message} readOnly={true} />
            </div>
          )}

          {convo.files?.length > 0 && (
            <div className={classes.agentGrid} data-test="attachment-container">
              <ImagePopupModal images={convo.files} readOnly={true} />
            </div>
          )}
        </Card>
      ) : (
        <div className="m-t-10">
          <ReplyHeader
            convo={convo}
            otherAction={true}
            message={"changed the ticket status to Open"}
          />
        </div>
      )}
    </>
  );
};

export const CloseTicket = (props) => {
  const { convo } = props;
  const classes = useStyles();

  return (
    <>
      {convo.message ? (
        <Card className={classes.paperUser}>
          <ReplyHeader
            convo={convo}
            otherAction={false}
            message={"changed the ticket status to Closed"}
          />

          {convo.message && (
            <div className={classes.replyDesc} data-test="message-container">
              <MarkdownField value={convo.message} readOnly={true} />
            </div>
          )}

          {convo.files?.length > 0 && (
            <div className={classes.agentGrid} data-test="attachment-container">
              <ImagePopupModal images={convo.files} readOnly={true} />
            </div>
          )}
        </Card>
      ) : (
        <div className="m-t-10">
          <ReplyHeader
            convo={convo}
            otherAction={true}
            message={"changed the ticket status to Closed"}
          />
        </div>
      )}
    </>
  );
};

export const ReplyTicket = (props) => {
  const classes = useStyles();
  const { convo } = props;

  return (
    <Card className={classes.paperUser}>
      <ReplyHeader
        convo={convo}
        otherAction={false}
        message={"replied to the ticket "}
      />

      {convo.message && (
        <div className={classes.replyDesc} data-test="message-container">
          <MarkdownField value={convo.message} readOnly={true} />
        </div>
      )}

      {convo.files?.length > 0 && (
        <div className={classes.agentGrid} data-test="attachment-container">
          <ImagePopupModal images={convo.files} readOnly={true} />
        </div>
      )}
    </Card>
  );
};

export const AssignTicket = (props) => {
  const { convo } = props;

  return (
    <div className="m-t-10">
      <ReplyHeader
        convo={props.convo}
        message={"Ticket " + convo.message}
        otherAction={true}
      />
    </div>
  );
};

export default function Reply(props) {
  const { convo } = props;

  return (
    <div data-test="reply-container">
      {convo.action === "reply" && <ReplyTicket convo={convo} />}
      {convo.action === "closed" && <CloseTicket convo={convo} />}
      {convo.action === "re-opened" && <OpenTicket convo={convo} />}
      {convo.action === "assigned" && <AssignTicket convo={convo} />}
    </div>
  );
}
