import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { FormControl, FormLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  labelStyle: {
    color: "black",
    fontWeight: "bolder",
    textAlign: "start",
    marginBottom: theme.spacing(1),
  },
  mdEditorStyle: {
    wordBreak: "break-word",
    color: 'black',
    padding: "5px 10px",
  }
}));

export const MarkdownField = (props) => {
  const classes = useStyles();
  return (
    <div>
      {props.readOnly ? (
        <MDEditor.Markdown className={classes.mdEditorStyle} source={props.value} />
      ) : (
        <>
          <FormControl variant="outlined" className="w-100">
            <FormLabel className={classes.labelStyle}>
              {props.title ?? "Description"}
              {}
            </FormLabel>
          </FormControl>
          <MDEditor
            value={props.value}
            onChange={props.onChange}
            height={250}
            preview={"edit"}
          />
        </>
      )}
    </div>
  );
};
export default MarkdownField;
