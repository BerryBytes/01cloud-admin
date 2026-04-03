import React from 'react';
import { 
    Typography} from "@material-ui/core";
import { connect } from 'react-redux';
import BackdropLoader from "../../../components/loader/BackdropLoader";
import { getOrganizationList, getOrganizationById } from '../redux/actions';
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DashboardIcon from '@material-ui/icons/Dashboard';
import paths from "../../../constants/paths";
import DataTable from "../../../components/muidatatable/DataTable";
export class OrganizationsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          timer: null,
          page: 1,
          size: 20,
          search: "",
          columns: [
            {
              name: "id",
              label: "ID",
              options: {
                filter: false,
                sort: false,
              },
            },
            {
              name: "name",
              label: "Name",
              options: {
                filter: false,
                sort: false,
              },
            },
            {
              name: "owner",
              label: "Owner",
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
            },
          ],
          data: [],
        };
      }

    fetchOrganizationsList = () => {
        this.props.getOrganizationList(this.state.page, this.state.size, this.state.search);
    }   
    componentDidMount() {
        this.fetchOrganizationsList()
    }

    getOrganizationsList = (organizationList) => {
        return organizationList?.map((organization) => {
          const organizationLink = (
            <Link
                to={paths.ORGANIZATION_INFO.replace(":organizationId", organization.id)}
            >
                <IconButton aria-label="edit">
                    <VisibilityIcon />
                </IconButton>
            </Link>
          );

          const organizationID = (
            <Link
                to={paths.ORGANIZATION_INFO.replace(":organizationId", organization.id)}
                className="titleStyle"
            >
                {"#"+organization.id}
            </Link>
          );

          const orgname = (
                  <div className="orgDisplay">
                  {organization.image ? (
                    <img
                      src={organization.image}
                      alt="Organization Avatar"
                      style={{ width: 30, height: 30 }}
                    />
                  ) : (
                    <DashboardIcon
                      style={{ color: "#0057fa", width: 30, height: 30 }}
                    />
                  )}
                
                    <span className="org-m-4">{organization.name} </span>
                  </div>
          )

          return {
            id: organizationID,
            name:  orgname,
            owner: organization.user.first_name + ' ' + organization.user.last_name,
            actions: organizationLink
          };
        });
      };
    
      UNSAFE_componentWillReceiveProps = (newProps) => {
        if (this.props !== newProps) {
          this.setState({
            data: this.getOrganizationsList(newProps?.organizationList)
          })
        }
      };

      handleSearch = (query) => {
        this.setState({
          search: query === null ? '' : query,
          page: 1
        }, () => {
          if (this.state.timer) {
            clearTimeout(this.state.timer)
          }
          this.setState({
            timer: setTimeout(() => {
              this.fetchOrganizationsList()
            }, 1000)
          })
        })
      }

      handlePageChange = (currentPage) => {
        let nextPage = currentPage + 1
        this.setState({
          page: nextPage,
        }, () => {
          this.fetchOrganizationsList()
        })
      }
    
      handleSizeChange = (newSize) => {
        this.setState({
          size: newSize,
          page: 1,
        }, () => {
          this.fetchOrganizationsList()
        })
      }
    
    render() {
        
        return (
            <div data-test="main-container">
                <Typography color="textPrimary" variant="h5" className="m-b-20" data-test="page-title">
                    Organization List
                </Typography>

            <DataTable
            data-test="data-table"
            columns={this.state.columns}
            data={this.state.data}
            options={{
                filter: false,
                selectableRows: "none",
                jumpToPage: true,
                searchOpen: true,
                count: this.props.count,
                searchPlaceholder: "Search with Name",
                rowsPerPage: this.state.size,
                rowsPerPageOptions: [10, 15, 20, 30],
                serverSide: true,
                download: false,
                print: false,
                textLabels: {
                    pagination: {
                        jumpToPage: "Go to Page"
                    }
                },
                onChangeRowsPerPage: this.handleSizeChange,
                onSearchChange: this.handleSearch,
                onChangePage: this.handlePageChange,
            }}
            />
            {this.props.fetchingOrganizationList && <BackdropLoader message="Fetching Organization List" data-test="fetching-org"/>}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return {
        count: state.OrganizationReducer.count,
        organizationList: state.OrganizationReducer.organizationList,
        fetchingOrganizationList: state.OrganizationReducer.fetchingOrganizationList,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        getOrganizationList: (page,size,searchText) => dispatch(getOrganizationList(page,size,searchText)),
        getOrganizationById: (id) => dispatch(getOrganizationById(id)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(OrganizationsList);