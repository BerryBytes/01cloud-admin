import React from "react";
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../helpers/utils'
import { OrganizationClusters } from './OrganizationClusters'
import { CardHeader, Collapse,TableContainer,TableHead } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";
import { getDateInStandardFormat } from "../../helpers/utils"

configure({ adapter: new Adapter()})

const setup = (props) => {
    const initialProps = {
      classes: {},
      t: jest.fn(),
      ...props,
    };
    return shallow(<OrganizationClusters t={() => ""} {...initialProps} />);
  };
const cluster = {
    "ID": 459,
    "CreatedAt": "2021-08-12T08:17:31.127303Z",
    "UpdatedAt": "2021-08-13T16:31:57.62394Z",
    "DeletedAt": null,
    "cluster_name": "gketest",
    "cluster_version": "1.20.8-gke.900",
    "region": "us-east1",
    "zone": [
        "us-east1-b"
    ],
    "provider": "gcp",
    "project_id": "zerone-devops-qa",
    "credentials": "./uploads/json/1398471a-863a-4f60-a8e4-a53aa7d19582.json",
    "access_key": "",
    "secret_key": "",
    "vpc_name": "testvpc",
    "subnet_cidr_range": "10.1.0.0/20",
    "network_cidr": "",
    "network_policy": false,
    "pvc_write_many": false,
    "active": true,
    "status": "destroyed",
    "type": "",
    "tls": "",
    "nfs_detail": {
        "filestore_tier": "Select",
        "filestore_zone": "Select",
        "filestore_capacity": "",
        "filestore_instance_name": ""
    },
    "regional_cluster": false,
    "remove_default_node_pool": false,
    "node_group_count": 1,
    "node_group_detail": [
        {
            "disk_size": "10",
            "disk_type": "pd-ssd",
            "preemptible": false,
            "instance_type": "e2-standard-4",
            "max_node_count": 2,
            "min_node_count": 1,
            "node_group_name": "node-group-1",
            "node_autoscaling": false,
            "node_group_labels": [],
            "initial_node_count": 1
        }
    ],
    "organization_id": 6,
    "cluster": {
        "ID": 265,
        "CreatedAt": "2021-08-12T08:17:31.142236Z",
        "UpdatedAt": "2021-08-13T16:31:57.62221Z",
        "DeletedAt": null,
        "name": "gketest",
        "context": "",
        "configPath": "/data/config/berrybytes-6/kubeconfig",
        "token": "",
        "region": "us-east1",
        "provider": "gcp",
        "project_name": "zerone-devops-qa",
        "zone": "us-east1",
        "dns_id": 91,
        "labels": "",
        "nodes": 0,
        "pv_capacity": 20,
        "weight": 10,
        "attributes": "",
        "ArgoServerUrl": "",
        "PrometheusServerUrl": "https://zerone-monitoring.badimalikacampus.edu.np",
        "cloud_storage": null,
        "image_registry_id": 64,
        "active": false,
        "organization_id": 6,
        "total_memory": 30720,
        "provision_percentage": 0.7,
        "cluster_request": null,
        "cluster_request_id": 0
    },
    "cluster_id": 265
}

describe("Organization Projects component", () => {
    let component = setup();

    it("should render card-commponent", () => {
        const wrapper = findByTestAttr(component, "card-container");
        expect(wrapper.length).toBe(1);
    });

    it("should render card-header", () => {
        const header = component.find(CardHeader);
        expect(header.length).toBe(1);
    });

    describe("Card Avatar", () => {
        it("should render card-avatar", () => {
          const header = component.find(CardHeader);
          const avatar = header.props().avatar;
          expect(avatar).toBeTruthy();
        });
    
        it("should have Icon Button in avatar", () => {
          const header = component.find(CardHeader);
          const avatar = shallow(header.props().avatar);
          const iconButton = findByTestAttr(avatar, "icon-button");
          expect(iconButton.length).toBe(1);
        });
    
        it("simulate click of icon button should pass correct props to Collapse", () => {
          const header = component.find(CardHeader);
          const avatar = shallow(header.props().avatar);
          const iconButton = findByTestAttr(avatar, "icon-button");
          let collapse = component.find(Collapse);
          expect(collapse.props().in).toBe(true);
          iconButton.simulate("click");
          collapse = component.find(Collapse);
          expect(collapse.props().in).toBe(false);
        });
      });

      describe("Card Title", () => {
        it("should render card-title", () => {
          const header = component.find(CardHeader);
          const title = header.props().title;
          expect(title).toBeTruthy();
        });
    
        it("should have title text", () => {
          const header = component.find(CardHeader);
          const title = shallow(header.props().title);
          const titleText = findByTestAttr(title, "title-text");
          expect(titleText.text()).toBe(" Clusters ");
        });
      });

      it("should render projects table without errors", () => {
        const wrapper = component.find(TableContainer);
        expect(wrapper.length).toBe(1);
      });
    
      it("should render projects table with 1 TableHead", () => {
        const wrapper = component.find(TableContainer);
        const head = wrapper.find(TableHead);
        expect(head.length).toBe(1);
      });
    
      it("should render projects table with atleast 4 StyledTableRow for Org Projects", () => {
        const wrapper = component.find(TableContainer);
        const head = wrapper.find(TableHead);
        const rows = head.find(StyledTableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(5);
      });

      it('should render no projects when there are not projects', () => {
        const wrapper = findByTestAttr(component, "no-clusters");
        expect(wrapper.length).toBe(1)
      })

      describe('When clusters data is present', () => {
        beforeEach(() => {
          component = setup({
            clustersList: [cluster]
          });
        });

        it('should render the cluster name', () => {
            const wrapper = findByTestAttr(component,'cluster-name')
            expect(wrapper.text()).toBe(cluster?.cluster_name)
          })

          it('should render the cluster provider', () => {
            const wrapper = findByTestAttr(component,'cluster-provider')
            expect(wrapper.text()).toBe(cluster?.provider === "" ? "-" : cluster?.provider)
          })

          it('should render the cluster created date', () => {
            const wrapper = findByTestAttr(component,'cluster-date')
            expect(wrapper.text()).toBe(getDateInStandardFormat(cluster?.createdat))
          })

          it('should render the cluster status', () => {
            const wrapper = findByTestAttr(component,'cluster-status')
            expect(wrapper.text()).toBe(cluster?.status  === "" ? '-' : cluster?.status)
          })

        it('should render active when active is true', () => {
            const wrapper = findByTestAttr(component,'cluster-active')
            expect(wrapper.length).toBe(cluster.active ? 1 : 0)
        })

        it('should render active when active is false', () => {
            const wrapper = findByTestAttr(component,'cluster-inactive')
            expect(wrapper.length).toBe(cluster.active ? 0 : 1)
        })

        it('should not render clusters when there are no clusters', () => {
          const wrapper = findByTestAttr(component, "no-clusters");
          expect(wrapper.length).toBe(0)
        })
      })
  })