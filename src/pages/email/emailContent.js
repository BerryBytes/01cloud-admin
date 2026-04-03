import { Button, TextareaAutosize } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { fetchEmailContent, updateEmailContent } from "../settings/redux/action";
import BackButton from "../../components/button/BackButton";

const useStyles = makeStyles({
  testArea: {
    width: "800px !important",
    height: "500px !important",
    fontSize: "20px",
    padding: "10px",
  },
  emailTitle: {
    backgroundColor: "#333333",
    width: "800px",
    padding: "15px 10px",
    fontSize: "20px",
    color: "white",
  },
  btnGroup: {
    display: "flex",
    width: "820px",
    marginTop: "10px",
    justifyContent: "flex-end",
  },
});

function EmailContent(props) {
  const classes = useStyles();

  const [emailContent, setEmailContent] = useState(null);

  const emailTitle = props.location.state.emailTitle;

  useEffect(() => {
    props.fetchEmailContent(emailTitle);
  },[])

  useEffect(() => {
    setEmailContent(props.emailContent)
  }, [props.emailContent]);

  const updateEmail = () => {
    const jsonPayload = {
        data: emailContent
    }
    props.updateEmailContent(emailTitle, jsonPayload);
  }

  const handleCancel = () => {
    props.history.push({
      pathname: "/settings",
    });
  }

  const tabChanger = () => {
    props.history.push({
      pathname: "/settings",
    });
  }

  return (
    <>
    <BackButton clickHandler={() => tabChanger()} name="Back To Settings"/>
      <div className={classes.emailTitle}>
        {emailTitle.charAt(0).toUpperCase() + emailTitle.slice(1).replace(/_/g, " ")}
      </div>
      <TextareaAutosize
        className={classes.testArea}
        maxRows={4}
        aria-label="maximum height"
        placeholder="Email Content"
        defaultValue={emailContent}
        onChange = {(e) => setEmailContent(e.target.value)}
      />
      <div className={classes.btnGroup}>
        <Button variant="contained" color="secondary" size="small"
        onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: "8px" }}
          disabled = {!emailContent}
          onClick = {() => updateEmail()}
        >
          Update
        </Button>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  emailContent: state.SettingsReducer.emailContent,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchEmailContent: (email) => dispatch(fetchEmailContent(email)),
    updateEmailContent: (emailTitle, email) => dispatch(updateEmailContent(emailTitle, email)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(EmailContent);
