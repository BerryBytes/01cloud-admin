import React, { Component } from "react";
import {
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { fetchPlugin, deletePlugin } from "./redux/actions";
import { withTranslation } from "react-i18next";
import CustomButton from "../../components/custombutton/CustomButton";
import BackdropLoader from "../../components/loader/BackdropLoader";
import { connect } from "react-redux";
import paths from "../../constants/paths";
import "./plugin.css";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import IconButton from "@material-ui/core/IconButton";
import { updateBreadcrumb } from "./redux/actions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DataTable from "../../components/muidatatable/DataTable";

export class Plugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDeletePopupOpened: false,
      selectedPluginId: undefined,
      timer: null,
      page: 1,
      size: 10,
      search: "",
      sortColumn: "ID",
      sortDirection: "desc",
      columns: [
        {
          name: "sn",
          label: "S.N.",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "id",
          label: "ID",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          name: "pluginImage",
          label: "  ",
          options: {
            filter: false,
            sort: false,
            display: true,
          },
        },
        {
          name: "name",
          label: "Name",
          options: {
            filter: true,
            sort: true,
          },
        },
        {
          name: "status",
          label: "Status",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "support_ci",
          label: "Support CI",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "is_addon",
          label: "Is Addon",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          name: "actions",
          label: "Actions",
          options: {
            filter: false,
            sort: false,
          },
        }
      ],
      data: []
    };
  }

  deletePopupAgreeHandler = () => {
    this.props.deletePlugin(this.state.selectedPluginId);
    this.setState({
      selectedPluginId: undefined,
      isDeletePopupOpened: false,
    });
  };

  deletePopupDisagreeHandler = () => {
    this.setState({
      selectedPluginId: undefined,
      isDeletePopupOpened: false,
    });
  };

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

  getPluginList = (pluginList) => {
    return pluginList.map((plugin, ind) => {
      const pluginImage = (
          <img
          src={plugin && plugin.image ? plugin.image : ""}
          alt="Plugin"
          width={50}
          >
          </img>
      );

      const actions = (
        <>
          <Link
            to={paths.PLUGIN_INFO.replace(":id", plugin.id)}
            className="activityInfoLink"
          >
            <IconButton aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </Link>
          <Link
            to={paths.EDIT_PLUGIN.replace(":id", plugin.id)}
            className="activityInfoLink"
          >
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton
            aria-label="delete"
            onClick={() => this.handleDelete(plugin.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      );
      return {
        sn: ((this.state.page - 1) * this.state.size) + (ind + 1),
        id: plugin.id,
        pluginImage: pluginImage,
        name: plugin.name,
        status:     
          plugin.active ? (
            <p>
              <span className="activestatus"></span> Active
            </p>
          ) : (
            <p>
              <span className="inactivestatus"></span> Inactive
            </p>
          ),
        support_ci:
          plugin.support_ci ? (
            <p>
              <span className="activestatus"></span>
              Support
            </p>
          ) : (
            <p>
              <span className="inactivestatus"></span>
              Doesn&apos;t Support
            </p>
          ),
        is_addon:
          plugin.is_add_on ? (
            <p>
              <span className="activestatus"></span>
              Addon
            </p>
          ) : (
            <p>
              <span className="inactivestatus"></span>
              Not Addon
            </p>
          ),
        actions: actions
      }
    })
  }

  UNSAFE_componentWillReceiveProps = (newProps) => {
    if (newProps.pluginList && newProps.pluginList.length > 0) {
      this.setState({
        data: this.getPluginList(newProps.pluginList)
      })
      const breadcrumbData = [{ name: "Plugins ", path: "/plugin" }];
      this.props.updateBreadcrumb(breadcrumbData);
    }
  };

  fetchPluginList(){
    this.props.fetchPlugin(this.state.page, this.state.size, this.state.search, this.state.sortColumn, this.state.sortDirection)
  }

  componentDidMount() {
    this.fetchPluginList();
  }

  handleSearch = (query) => {
    this.setState({
      search: query,
      page: 1
    }, () => {
      if (this.state.timer) {
        clearTimeout(this.state.timer)
      }
      this.setState({
        timer: setTimeout(() => {
          this.fetchPluginList()
        }, 1000)
      })
    })
  }

  handlePageChange = (currentPage) => {
    let nextPage = currentPage + 1
    this.setState({
      page: nextPage,
    }, () => {
      this.fetchPluginList()
    })
  }

  handleSizeChange = (newSize) => {
    this.setState({
      size: newSize,
      page: 1,
    }, () => {
      this.fetchPluginList()
    })
  }

  handleSortChange = (changedColumn, direction) => {
    this.setState({
      sortColumn: changedColumn,
      sortDirection: direction === "ascending" ? "asc" : "desc"
    }, () => {
      this.fetchPluginList()
    })
  }

  render() {
    const options = {
        selectableRows: "none",
        responsive: 'vertical',
        serverSide: true,
        count: this.props.pluginCount,
        searchOpen: true,
        download: false,
        print:false,
        filter: false,
        searchPlaceholder: "Search with Id and Name",
        rowsPerPage: this.state.size,
        jumpToPage: true,
        rowsPerPageOptions: [10, 20, 50],
        textLabels: {
          pagination: {
            jumpToPage: "Go to Page"
          }
        },
        
        onChangeRowsPerPage: this.handleSizeChange,
        onSearchChange: this.handleSearch,
        onChangePage: this.handlePageChange,
        onColumnSortChange: this.handleSortChange,
      };

    const { t } = this.props;
    const { isDeletePopupOpened } = this.state;

    return (
      <div data-test="main-container">
        <div className="listContainer">
          <Typography color="textPrimary" variant="h5" data-test="plugin-title">
            {t("Plugins")}
          </Typography>
          <CustomButton
            data-test="create-button"
            label={t("CreatePlugin")}
            onClick={() => this.handleCreatePlugin()}
          />
        </div>
        <div>
        <DataTable
            data-test="dataTable-container"
            title={"Plugin List"}
            data={this.state.data}
            columns={this.state.columns}
            options={options}
        />

          <ConfirmActionPopup
            data-test="plugin-deletePopup"
            open={isDeletePopupOpened}
            handleAgree={() => this.deletePopupAgreeHandler()}
            handleDisAgree={() => this.deletePopupDisagreeHandler()}
            message={`Are you sure you want to delete the Plugin?`}
            yesText="Yes"
            noText="No"
          />
        </div>
        {this.props.fetchingPlugin && <BackdropLoader message="Fetching Plugins" data-test="fetching-plugins" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pluginList: state.PluginReducer.pluginList,
    pluginCount: state.PluginReducer.pluginCount,
    fetchingPlugin: state.PluginReducer.fetchingPlugin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlugin: (page, size, search, sortColumn, sortDirection) => dispatch(fetchPlugin(page, size, search, sortColumn, sortDirection)),
    deletePlugin: (id) => dispatch(deletePlugin(id)),
    updateBreadcrumb: (breadcrumbData) =>
      dispatch(updateBreadcrumb(breadcrumbData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Plugin));
