import React, { useState } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

export const CopyIcon = (props) => {
  const [toolText, setToolText] = useState("Copy");

  const copyToClipBoard = async (copyText) => {
    if (copyText !== "") {
      try {
        navigator.clipboard.writeText(copyText);
        setToolText("Copied");

        setTimeout(() => {
          setToolText("Copy");
        }, 1500);
      } catch {
        setToolText("Couldn't Copy");
      }
    }
  };

  return (
    <Tooltip title={toolText}>
      <IconButton>
        <FileCopyOutlinedIcon
          onClick={() => copyToClipBoard(props.copyText ?? "")}
        />
      </IconButton>
    </Tooltip>
  );
};

export default CopyIcon;
