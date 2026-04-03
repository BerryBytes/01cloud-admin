import React from "react";
import InfoIcon from "@material-ui/icons/Info";
import { Typography, Link, Tooltip } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 400,
    padding: 10,
    borderRadius: 4,
  },
  infoIcon: {
    margin: "0 !important",
    marginLeft: "1rem !important",
    padding: 0,
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#fff",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: theme?.typography?.pxToRem(12),
    border: "1px solid #dadde9",
    boxShadow:
      "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
    borderRadius: "8px",
    padding: "0.5rem",
  },
}))(Tooltip);

export function InfoPopup(props) {
  const classes = useStyles();

  return (
    <span data-test="main-container">
      <HtmlTooltip
        data-test="tool-tip"
        placement="right-end"
        interactive
        title={
          props?.scope === "component" ? (
            props.message
          ) : (
            <Typography variant="h5" data-test="title">
              {props.message}{" "}
              {props.url && (
                <>
                  <br />
                  <strong> Reference </strong>
                  <Link
                    href={props.url}
                    target="_blank"
                    rel="noreferrer"
                    underline="hover"
                  >
                    {props.urlText ?? ""}
                    <LaunchIcon className="openLinkIcon" />
                  </Link>
                </>
              )}
            </Typography>
          )
        }
      >
        <InfoIcon
          data-test="info-icon"
          color="primary"
          
          className={classes.infoIcon}
          fontSize="small"
        />
      </HtmlTooltip>
    </span>
  );
}

export default InfoPopup;
