import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";
import { fetchPlugin } from "./redux/actions";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import paths from "../../constants/paths";
import MuiTextField from "../../components/textfield/MuiTextField";
import "./plugin.css";

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: "grey",
    fontWeight: 500,
  },
  body: {
    color: "#555",
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles(() => ({
  root: {},
}))(TableRow);

export class PluginAddonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeletePopupOpened: false,
      selectedPluginId: undefined,
      addons: [],
      isSelectAll: false,
      addonsCopy: [],
      searchText: "",
    };
  }

  handleDelete(pluginId) {
    this.setState({
      selectedPluginId: pluginId,
      isDeletePopupOpened: true,
    });
  }

  handleCreatePlugin = () => {
    this.props.history.push({
      pathname: `${paths.CREATE_PLUGIN}`,
    });
  };

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (
      (newProps.AddOns && !this.props.AddOns) ||
      (this.props.AddOns &&
        JSON.stringify(newProps.AddOns) !== JSON.stringify(this.props.AddOns))
    ) {
      this.setAddons(newProps.AddOns);
    }
  };

  setAddons = (addons) => {
    
    this.setState({
      addons,
      addonsCopy: addons,
    });
  };

  componentDidMount() {
    this.props.fetchPlugin();
    if (this.props.AddOns) {
      this.setAddons(this.props.AddOns);
    }
  }

  handleAddonToggle = (e, addon) => {
    let newAddons = [];
    if (e.target.checked) {
      newAddons = [...this.state.addons, addon];
    } else {
      newAddons = this.state.addons.filter((a) => {
        return a.id !== addon.id;
      });
    }
    this.setState(
      {
        addons: newAddons,
        addonsCopy: newAddons,
      },
      () => {
        const _addonsList = this.state.addons.map((a) => {
          return a.id;
        });
        const allAddons = this.props.pluginList.filter((a) => {
          return a.is_add_on;
        });
        this.setState({
          isSelectAll: _addonsList.length === allAddons.length ? true : false,
        });
        this.sendAddons(_addonsList);
      }
    );
  };

  sendAddons = (addonsIdList) => {
    const _addon = addonsIdList?.join(",");
    this.props.setAddons(_addon);
  };

  addonActive = (addon) => {
    const a = this.state.addons?.find((_a) => {
      return _a.id === addon.id;
    });
    if (a) {
      return true;
    }
    return false;
  };

  selectAll = (e) => {
    this.setState({
      isSelectAll: e.target.checked,
    });
    let _addons = [];
    if (e.target.checked) {
      const _newAddons = this.props.pluginList.filter((a) => {
        return a.is_add_on;
      });
      _addons = _newAddons;
    } else {
      _addons = this.state.addonsCopy;
    }
    this.setState(
      {
        addons: _addons,
      },
      () => {
        const _addonsList = this.state.addons.map((a) => {
          return a.id;
        });
        this.sendAddons(_addonsList);
      }
    );
  };

  handleSearch = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  render() {
    const { pluginList } = this.props;

    let filteredPlugin = pluginList.filter((p) => {
      if (this.props.viewMode) {
        return p.is_add_on && this.addonActive(p);
      }
      return p.is_add_on;
    });

    return (
      <div data-test="main-container">
        <Card>
          <CardHeader
            data-test="card-header"
            action={
              <MuiTextField
                id="searchText"
                data-test="search-field"
                label="Search Addons"
                name="searchText"
                style={{ width: "100%" }}
                color="primary"
                onChange={(e) => this.handleSearch(e)}
                value={this.state.searchText}
                margin="normal"
                variant="outlined"
              />
            }
            title={"Plugin Addons"}
          />
          <CardContent>
            <TableContainer component={Paper}>
              <Table data-test="addon-table">
                <TableHead>
                  <TableRow>
                    {!this.props.viewMode && (
                      <StyledTableCell>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.isSelectAll}
                              onChange={this.selectAll}
                              name="selectAll"
                              color="primary"
                              disabled={this.props.viewMode}
                            />
                          }
                          label="Name"
                        />
                      </StyledTableCell>
                    )}
                    
                    <StyledTableCell></StyledTableCell>
                    
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPlugin
                    .filter((p) =>
                      p.name
                        ?.toLowerCase()
                        .includes(this.state.searchText?.toLowerCase())
                    )
                    .map((addon, ind) => (
                      <StyledTableRow key={ind}>
                        {!this.props.viewMode && (
                          <StyledTableCell>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  data-test="addon-checkbox"
                                  checked={this.addonActive(addon)}
                                  onChange={(e) =>
                                    this.handleAddonToggle(e, addon)
                                  }
                                  name="pluginAddonActive"
                                  color="primary"
                                  disabled={this.props.viewMode}
                                />
                              }
                              label={
                                
                                addon.name
                              }
                            />
                          </StyledTableCell>
                        )}
                        
                        <StyledTableCell>
                          <img
                            data-test="addon-name"
                            alt={addon.name}
                            width={50}
                            src={addon.image}
                          >
                          </img>
                        </StyledTableCell>

                        <StyledTableCell>
                          <p data-test="addon-active">
                            <span
                              className={
                                addon.active ? "activestatus" : "inactivestatus"
                              }
                            >
                            </span>{" "}
                            {addon.active ? "Active " : "Inactive"}
                          </p>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pluginList: state.PluginReducer.pluginList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlugin: () => dispatch(fetchPlugin()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(PluginAddonList));
