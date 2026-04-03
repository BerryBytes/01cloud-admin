import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserQuota from "./quota/quota";
import { fetchEmailContent, fetchEmailTemplates } from "./redux/action";

function Settings(props) {
  const { emailTemplate } = props;

  useEffect(() => {
    props.fetchEmailTemplates();
    return () => {};
  }, []);

  const handleClickEmail = (email) => {
    props.history.push({
      pathname: `/settings/email/${email}`,
      state: {
        emailTitle: email
      }
    });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Card>
            <CardHeader title={"Email"} />
            <Divider />
            <CardContent>
              <List component="nav">
                {emailTemplate?.sort().map((email) => (
                  <ListItem
                    key={email}
                    button
                    onClick={() => handleClickEmail(email)}
                    style={{ border: "0.01px solid lightgray", margin: "5px" }}
                  >
                    <Typography variant="h5">{email.charAt(0).toUpperCase() + email.slice(1).replace(/_/g, " ")}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <UserQuota />
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  emailTemplate: state.SettingsReducer.emailTemplate,
  emailContent: state.SettingsReducer.emailContent,
});

const mapDispatchtoProps = (dispatch) => {
  return {
    fetchEmailTemplates: () => dispatch(fetchEmailTemplates()),
    fetchEmailContent: (email) => dispatch(fetchEmailContent(email)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(Settings);
