import React from "react";
import { ButtonBase } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BackButton({clickHandler, name}) {
  return (
    <ButtonBase
      onClick={clickHandler}
      style={{ color: "#357dfd", marginBottom: 20 }}
    >
      <ArrowBackIcon fontSize="small" />{" "}
      <span className="jobNav">{name}</span>
    </ButtonBase>
  );
}

export default BackButton;
