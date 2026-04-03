import Brightness1Icon from "@material-ui/icons/Brightness1";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HourglassEmptyOutlinedIcon from "@material-ui/icons/HourglassEmptyOutlined";
import { AppConstants } from "../../constants/appconstants";
import AdjustIcon from "@material-ui/icons/Adjust";
import React from "react";

export function StatusIndicator(props) {
  let statusIndicator = "";
  switch (props.status) {
    case "Succeeded":
      statusIndicator = (
        <div>
          <CheckCircleIcon className="successStep" />
        </div>
      );
      break;
    case "Running":
      statusIndicator = (
        <div>
          <Brightness1Icon className="runningStep" />
          <div className="lds1-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
      break;
    case "Pending":
      statusIndicator = (
        <div>
          <Brightness1Icon className="pendingStep" />
          <div className="lds1-hour">
            <HourglassEmptyOutlinedIcon className="pendingStepIcon" />
          </div>
        </div>
      );
      break;
    case "Failed":
      statusIndicator = (
        <div>
          <CancelIcon className="failedStep" />
        </div>
      );
      break;
    case "Undefined":
      statusIndicator = (
        <div>
          <CancelIcon className="failedStep" />
        </div>
      );
      break;
    default:
      statusIndicator = "";
  }
  return <div>{statusIndicator}</div>;
}

export function FilledStatusIndicator(props) {
  let statusIndicator = "";
  switch (props.status) {
    case "Succeeded":
      statusIndicator = (
        <div className="status-circle">
          <CheckCircleIcon className="successStep" />
        </div>
      );
      break;
    case "Running":
      statusIndicator = (
        <div className="status-circle">
          <Brightness1Icon className="runningStep" />
          <div className="lds1-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
      break;
    case "Pending":
      statusIndicator = (
        <div className="status-circle">
          <Brightness1Icon className="pendingStep" />
          <div className="lds1-hour">
            <HourglassEmptyOutlinedIcon className="pendingStepIcon" />
          </div>
        </div>
      );
      break;
    case "Failed":
      statusIndicator = (
        <div className="status-circle">
          <CancelIcon className="failedStep" />
        </div>
      );
      break;
    case "Undefined":
      statusIndicator = (
        <div className="status-circle">
          <CancelIcon className="failedStep" />
        </div>
      );
      break;
    default:
      statusIndicator = "";
  }
  return <div>{statusIndicator}</div>;
}

export function StepStatusIndicatorPopUp(props) {
  let stepStatusIndicator = "";
  switch (props.status) {
    case "Succeeded":
      stepStatusIndicator = (
        <div>
          <CheckCircleIcon className="successStep" />
        </div>
      );
      break;
    case "Running":
      stepStatusIndicator = (
        <div>
          <Brightness1Icon className="runningStep" />
          <div className="lds1-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
      break;
    case "Pending":
      stepStatusIndicator = (
        <div>
          <Brightness1Icon className="pendingStep" />
          <div className="lds1-hour">
            <HourglassEmptyOutlinedIcon className="pendingStepIcon" />
          </div>
        </div>
      );
      break;
    case "Failed":
      stepStatusIndicator = (
        <div>
          <CancelIcon className="failedStep" />
        </div>
      );
      break;
    default:
      stepStatusIndicator = "";
  }
  return <div> {stepStatusIndicator} </div>;
}

export function ClusterStatus(props) {
  let statusColor = "";
  let statusText = "";
  switch (props.status) {
    case AppConstants.ClusterStatus.Drafted:
      statusColor = "sandybrown";
      statusText = "Drafted";
      break;
    case AppConstants.ClusterStatus.Planning:
      statusColor = "orange"; 
      statusText = "Planning";
      break;
    case AppConstants.ClusterStatus.Planned:
      statusColor = "orange"; 
      statusText = "Planned";
      break;
    case AppConstants.ClusterStatus.Applying:
      statusColor = "orange"; 
      statusText = "Applying";
      break;
    case AppConstants.ClusterStatus.Applied:
      statusColor = "green"; 
      statusText = "Active";
      break;
    case AppConstants.ClusterStatus.Destroyed:
      statusColor = "red";
      statusText = "Destroyed";
      break;
    case AppConstants.ClusterStatus.Imported:
      statusColor = "blue";
      statusText = "Imported";
      break;
    case AppConstants.ClusterStatus.PackageInstalling:
      statusColor = "orange";
      statusText = "Package Installing";
      break;
    case AppConstants.ClusterStatus.PackageInstalled:
      statusColor = "green";
      statusText = "Active";
      break;
    default:
      statusColor = "";
      statusText = "";
  }
  return (
    <div>
      <span className="m-l-20">
        <AdjustIcon className="topIcon" style={{ color: statusColor }} />
        <span style={{ color: statusColor }} className="statusTxt">
          {" "}
          {statusText}
        </span>
      </span>
    </div>
  );
}

export function LoadbalancerStatusIndicator(props) {
  let icon, text, color;
  let iconStyle = { position: "absolute", fontSize: "20px" };
  let textStyle = { marginLeft: "25px" };

  switch (props.status) {
    case "Succeeded":
      icon = <CheckCircleIcon style={iconStyle} />;
      text = <span style={textStyle}>Active</span>;
      color = "#5b4";
      break;

    case "Pending":
    case "":
      icon = <HourglassEmptyOutlinedIcon style={iconStyle} />;
      text = <span style={textStyle}>In Progress</span>;
      color = "orange";
      break;

    default:
      icon = <i></i>;
  }
  return (
    <span style={{ position: "relative", color: color }}>
      {icon} {text}
    </span>
  );
}

export function BackupStatusIndicator(props) {
  let textStyle = { marginLeft: "5px" };
  let color = "";
  let text = props.status;
  switch (props.status) {
    case AppConstants.BackupStatus.New: 
      color="blue"
      break;
    case AppConstants.BackupStatus.Completed:
      color="green"
      break;
    case AppConstants.BackupStatus.PartiallyDone:
    case AppConstants.BackupStatus.InProgress:
      color = "orange"
      text = "InProgress"
      break;
    case AppConstants.BackupStatus.Failed:
    case AppConstants.BackupStatus.FailedValidation:
    case AppConstants.BackupStatus.PartiallyFailed:
      color = "red"
      text = "Failed"
      break;
    case AppConstants.BackupStatus.Deleting:
      color = "sandybrown"
      break;
    default:
      color = "black"
      text = "Pending"
  }
  return (
    <div className="topgridalign">
      <Brightness1Icon style={{ color: color, fontSize: 15 }}/> <span style={textStyle}>{text}</span>
    </div>
  )
}