import React from "react";
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../helpers/utils'
import { OrganizationProjects } from './OrganizationProjects'
import { CardHeader, Collapse,TableContainer,TableHead } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";

configure({ adapter: new Adapter()})

const setup = (props) => {
    const initialProps = {
      classes: {},
      t: jest.fn(),
      ...props,
    };
    return shallow(<OrganizationProjects t={() => ""} {...initialProps} />);
  };

const project = {
  "id": "1219",
  "CreatedAt": "2021-08-23T06:35:01.73086Z",
  "UpdatedAt": "2021-08-23T06:55:26.137677Z",
  "DeletedAt": null,
  "name": "LK test",
  "description": "tests",
  "project_code": "",
  "tags": "",
  "cluster_scope": 0,
  "region": "ovh",
  "logging": "01Logs",
  "monitoring": "Prometheus",
  "base_domain": "",
  "dedicated_lb": false,
  "optimize_cost": false,
  "active": true,
  "attributes": null,
  "subscription": {
      "id": 195,
      "CreatedAt": "2021-04-16T11:36:33.044919Z",
      "UpdatedAt": "2021-08-23T06:55:26.134682Z",
      "DeletedAt": null,
      "name": "Normal Plan",
      "apps": 2,
      "disk_space": 1024,
      "memory": 1024,
      "cores": 1000,
      "data_transfer": 1024,
      "price": 0,
      "weight": 10,
      "attributes": "",
      "active": true,
      "cron_job": 1,
      "backups": 2,
      "resource_list": {
          "gpu": "0",
          "pods": "20",
          "secrets": "20",
          "services": "10",
          "configmaps": "10",
          "loadbalancers": "1",
          "persistentvolumeclaims": "4",
          "replicationcontrollers": "40"
      },
      "organization_id": 6,
      "load_balancer": 0
  },
  "subscription_id": 195,
  "image": "https://storage.googleapis.com/zerone-uploads/images/9a45c6b7-7069-4f32-a180-43b5e70b5661.png",
  "variables": null,
  "user_id": 197,
  "organization_id": 6
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
          expect(titleText.text()).toBe(" Projects ");
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
        expect(row.length).toBe(4);
      });

      it('should render no projects when there are not projects', () => {
        const wrapper = findByTestAttr(component, "no-projects");
        expect(wrapper.length).toBe(1)
      })

      describe('When projects data is present', () => {
        beforeEach(() => {
          component = setup({
            projectsList: [project]
          });
        });

        it('should render the id', () => {
          const wrapper = findByTestAttr(component,'project-id')
          expect(wrapper.text()).toBe(project.id)
        })

        it('should render the project name', () => {
          const wrapper = findByTestAttr(component,'project-name')
          expect(wrapper.text()).toBe(project.name)
        })

        it('should render the project subscription', () => {
          const wrapper = findByTestAttr(component,'project-subscription')
          expect(wrapper.text()).toBe(project?.subscription?.name + " Subscription")
        })

        it('should render active when active is true', () => {
            const wrapper = findByTestAttr(component,'project-active')
            expect(wrapper.length).toBe(project.active ? 1 : 0)
        })

        it('should render active when active is false', () => {
            const wrapper = findByTestAttr(component,'project-inactive')
            expect(wrapper.length).toBe(project.active ? 0 : 1)
        })

        it('should not render no projects when there are projects', () => {
          const wrapper = findByTestAttr(component, "no-projects");
          expect(wrapper.length).toBe(0)
        })
      })
  })