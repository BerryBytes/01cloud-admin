import {
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import _ from "lodash";
import React, { Component, useState, useEffect } from "react";
import MuiNumberCounter from "../textfield/MuiNumberCounter";
import MuiTextField from "../textfield/MuiTextField";
import { uploadFile } from "../../pages/common/redux/actions";
import { connect } from "react-redux";

export const PropertyRow = (props) => {
  const objKeys = props.data && Object.keys(props.data);
  return (
    <>
      {!props.isBlocked && (
        <div
          style={
            props.ignoreAlternateColour
              ? { background: "" }
              : props.index % 2
              ? { background: "" }
              : { background: "#f5f5f5" }
          }
        >
          {props.sectionName && (
            <Typography className="m-b-20">{props.sectionName}</Typography>
          )}
          <Grid container spacing={2}>
            {objKeys &&
              objKeys.length > 0 &&
              objKeys.map((key, index) => {
                return key !== "title" &&
                  (!props.isDefaultRow || !props.isSectionBlockedEvent(key)) ? (
                  <Grid
                    item
                    xs={12}
                    md={props.gridItemOccupency ? props.gridItemOccupency : 6}
                    key={index}
                  >
                    <PropertyItem
                      data={props.data[key]}
                      handleValueChange={props.handleValueChange}
                      initialValues={props.initialValues}
                      errors={props.errors}
                      validateEmpty={props.validateEmpty}
                      uploadFile={props.uploadFile}
                    />
                  </Grid>
                ) : (
                  <></>
                );
              })}
          </Grid>
        </div>
      )}
    </>
  );
};

export const PropertyItem = (props) => {
  const item = props.data;
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [value, setValue] = useState(
    _.get(props.initialValues, item.finalField)
  );
  const [checked, setChecked] = useState(
    _.get(props.initialValues, item.finalField)
  );
  const [isFocused, setIsFocused] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (
      props.validateEmpty &&
      item.fieldType === "string" &&
      !value &&
      !item.optional
    ) {
      setHasError(true);
      props.handleValueChange(item, "", true);
    }
  }, []);

  const toggleEyeIcon = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handletextFeildsOnChange = (e) => {
    setValue(e.target.value);
    if (!item.optional) {
      setIsFocused(true);
      if (
        e.target.value &&
        item.validation &&
        !new RegExp(item.validation).test(e.target.value)
      ) {
        setHasError(true);
        props.handleValueChange(item, e.target.value, true);
      } else {
        if (props.validateEmpty && e.target.value.trim() === "") {
          setHasError(true);
          props.handleValueChange(item, e.target.value, true);
        } else {
          setHasError(false);
          props.handleValueChange(item, e.target.value, false);
        }
      }
    } else {
      props.handleValueChange(item, e.target.value, false);
    }
  };

  const fileUploadCallback = (responseFile) => {
    props.handleValueChange(item, responseFile?.path ?? "", false);
  };

  const handleSwitchChange = (e) => {
    setChecked(e.target.checked);
    props.handleValueChange(item, e.target.checked, false);
  };

  const handleFileChange = (e) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const _file = e.target.files[0];
      setSelectedFile(_file);
    }
  };

  useEffect(() => {
    if (item.fieldType === "file") {
      let uploadBody = new FormData();
      if (!selectedFile) {
        props.handleValueChange(item, "", true);
        return;
      }
      const sF = selectedFile;
      if (selectedFile !== null) {
        uploadBody.append("file_name", sF.name);
        uploadBody.append("file_type", "json");
        uploadBody.append("file", sF);
      }
      props.uploadFile(uploadBody, fileUploadCallback, true);
    }
  }, [selectedFile]);

  const handleSelectOnChange = (e) => {
    setValue(e.target.value);
    setHasError(false);
    props.handleValueChange(item, e.target.value, false);
  };

  const updateValueChange = (_value) => {
    props.handleValueChange(item, _value, false);
  };

  const isTextFieldErrorShow = () => {
    let _hasError = false;
    if (value) {
      _hasError = hasError;
    } else {
      if (props.validateEmpty) {
        if (!isFocused) _hasError = false;
        else {
          _hasError = true;
        }
      }
    }
    return _hasError;
  };

  return (
    <>
      {item.fieldType === "number" && (
        <MuiNumberCounter
          updateValueChange={updateValueChange}
          label={item.title}
          initialValue={value}
          defaultValue={item.defaultValue}
          unit={item.unit}
          isError={props.errors.indexOf(item.finalField) > -1}
          helperText={
            props.errors.indexOf(item.finalField) > -1 && item.errorDescription
          }
        />
      )}
      {item.fieldType === "string" && (
        <MuiTextField
          name={item.key}
          label={item.title}
          onChange={(e) => handletextFeildsOnChange(e)}
          value={value}
          helperText={
            isTextFieldErrorShow() && item.errorDescription
              ? item.errorDescription
              : item.description
          }
          error={isTextFieldErrorShow()}
          type={
            item.isProtected ? (isShowPassword ? "text" : "password") : "text"
          }
          InputProps={{
            endAdornment: item.isProtected && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => toggleEyeIcon()}
                  edge="end"
                >
                  {isShowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
      {item.fieldType === "boolean" && (
        <FormControlLabel
          control={
            <Switch
              name={item.key}
              color="primary"
              checked={checked}
              onChange={(e) => handleSwitchChange(e)}
            />
          }
          label={item.title}
        />
      )}
      {item.fieldType === "file" && (
        <>
          <br />
          <MuiTextField
            name={item.key}
            label={item.title}
            onChange={(e) => handleFileChange(e)}
            value={value}
            
            type="file"
            InputLabelProps={{ shrink: true }}
          />
        </>
      )}
      {item.fieldType === "list" && (
        <FormControl fullWidth variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            {item.title}
          </InputLabel>
          <Select
            color="primary"
            labelId="demo-simple-select-outlined-label"
            value={value}
            label={item.title}
            onChange={(e) => handleSelectOnChange(e)}
            MenuProps={{
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              },
            }}
          >
            
            {item.items &&
              item.items.length > 0 &&
              item.items.map((x, ind) => (
                <MenuItem value={x} key={ind}>
                  {x}
                </MenuItem>
              ))}
          </Select>
          
        </FormControl>
      )}
    </>
  );
};

class PluginConfigForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generalProps: {},
      propKeys: [],
      linkedProps: [],
    };
  }

  componentDidMount() {
    if (this.props.pluginVersionConfig.type) {
      this.extractProperties(this.props.pluginVersionConfig);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !this.props.pluginVersionConfig.type &&
      nextProps.pluginVersionConfig &&
      nextProps.pluginVersionConfig.type
    ) {
      this.extractProperties(nextProps.pluginVersionConfig);
    }
  }

  extractProperties = (config) => {
    let _props = {};
    let $this = this;
    if (config.properties) {
      const objectKeys = config.keys
        ? config.keys
        : Object.keys(config.properties);

      objectKeys.map(function (key) {
        if (config.properties[key]) {
          if (config.properties[key].type === "object") {
            const prps = $this.getProps(key, config.properties[key]);
            _props[key] = prps;
            _props[key].title = config.properties[key].title;
          } else {
            if (!_props.default) _props.default = {};
            _props.default[key] = $this.getObjectByKey(config, key, key);
            if (config.properties[key].linked_to) {
              $this.setLinkedProps({
                linked_to: config.properties[key].linked_to,
                finalField: key,
                linked_values: config.properties[key].linked_values,
              });
            }
          }
        }
      });
      this.setState({
        generalProps: _props,
        propKeys: Object.keys(_props),
      });
    }
  };

  getProps = (keyname, data) => {
    let obj = {};
    let $this = this;
    if (data.properties) {
      const objectKeys = data.keys ? data.keys : Object.keys(data.properties);
      objectKeys.map(function (key) {
        let _keyName = keyname + "." + key;
        if (data.properties[key]) {
          if (data.properties[key].type === "object") {
            const _obj = $this.getProps(_keyName, data.properties[key]);
            if (Object.keys(obj).length > 0) obj = { ...obj, ..._obj };
            else obj = _obj;
          } else {
            obj[key] = $this.getObjectByKey(data, key, _keyName);
            if (data.properties[key].linked_to) {
              $this.setLinkedProps({
                linked_to: data.properties[key].linked_to,
                finalField: _keyName,
              });
            }
          }
        }
      });
    }
    return obj;
  };

  getObjectByKey = (data, key, _keyName) => {
    return {
      key: key,
      finalField: _keyName,
      fieldType: data.properties[key].type,
      title: data.properties[key].title,
      description: data.properties[key].description,
      errorDescription: data.properties[key].errorDescription,
      validation: data.properties[key].validation,
      defaultValue: data.properties[key].value,
      isProtected: Boolean(data.properties[key].hidden),
      isShowPassword: false,
      linked_to: data.properties[key].linked_to,
      unit: data.properties[key].unit,
      items: data.properties[key].items,
      optional: data.properties[key].optional ?? data.properties[key].required,
    };
  };

  setLinkedProps = (obj) => {
    const { linkedProps } = this.state;
    linkedProps.push(obj);
  };

  isSectionBlocked = (keyName) => {
    let isBlocked = false;
    if (this.state.linkedProps && this.state.linkedProps.length > 0) {
      const isKeyExists = this.state.linkedProps.find(
        (x) => x.linked_to === keyName
      );
      if (isKeyExists) {
        if (isKeyExists.linked_values) {
          const value = _.get(this.props.initialValues, isKeyExists.finalField);
          
          if (value) {
            const valueDependents = isKeyExists.linked_values[value];
            if (valueDependents) {
              const indexExist = valueDependents.indexOf(keyName);
              if (indexExist > -1) {
                isBlocked = false;
              } else isBlocked = true;
            } else isBlocked = true;
          } else isBlocked = true;
        } else {
          const value = _.get(this.props.initialValues, isKeyExists.finalField);
          if (!value) {
            isBlocked = true;
          }
        }
      }
    }
    return isBlocked;
  };

  handleValueChange = (obj, value, isError) => {
    
    const { initialValues, isErrors } = this.props;
    let errorsList = [...isErrors];
    if (initialValues && obj && obj.finalField) {
      _.set(initialValues, obj.finalField, value);
    }

    const isKeyExists =
      this.state.linkedProps.length > 0 &&
      this.state.linkedProps.find((x) => x.finalField === obj.finalField);
    if (isKeyExists) {
      if (value) {
        /* empty */
      } else {
        const resetFields = errorsList.filter(
          (x) => x.indexOf(isKeyExists.linked_to) === 0
        );
        errorsList = errorsList.filter(
          (x) => x.indexOf(isKeyExists.linked_to) !== 0
        );
        if (resetFields && resetFields.length > 0) {
          resetFields.map((item) => {
            _.set(initialValues, item, 1);
          });
        }
      }
    }
    if (obj.key === "replicas") {
      isError = this.props.calculateResources(
        value,
        this.props.selectedResourceObject
      );
    }

    if (isError) {
      if (errorsList.indexOf(obj.finalField) <= -1) {
        errorsList.push(obj.finalField);
      }
    } else {
      const ind = errorsList.indexOf(obj.finalField);
      if (ind > -1) {
        errorsList.splice(ind, 1);
      }
    }
    this.props.handleValueChange(initialValues, errorsList);
  };

  render() {
    return (
      <>
        {this.state.generalProps &&
          this.state.propKeys &&
          this.state.propKeys.length > 0 &&
          this.state.propKeys.map((key, index) => {
            return (
              <Grid item xs={12} key={index}>
                <PropertyRow
                  rowKeyName={key}
                  data={this.state.generalProps[key]}
                  uploadFile={this.props.uploadFile}
                  handleValueChange={this.handleValueChange}
                  initialValues={this.props.initialValues}
                  linkedProps={this.state.linkedProps}
                  isBlocked={this.isSectionBlocked(key)}
                  index={index}
                  sectionName={this.state.generalProps[key].title}
                  errors={this.props.isErrors}
                  gridItemOccupency={this.props.gridItemOccupency}
                  isSectionBlockedEvent={this.isSectionBlocked}
                  isDefaultRow={key === "default"}
                  ignoreAlternateColour={this.props.ignoreAlternateColour}
                  validateEmpty={this.props.validateEmpty}
                />
              </Grid>
            );
          })}
      </>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchtoProps = (dispatch) => {
  return {
    uploadFile: (formData, callBack, isPrivate) =>
      dispatch(uploadFile(formData, callBack, isPrivate)),
  };
};

export default connect(mapStateToProps, mapDispatchtoProps)(PluginConfigForm);
