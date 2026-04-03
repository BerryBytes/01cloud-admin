import React from "react";
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../helpers/utils'
import { OrganizationMembers } from './OrganizationMembers'
import { CardHeader, Collapse,TableContainer,TableHead } from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";

configure({ adapter: new Adapter()})

const setup = (props) => {
    const initialProps = {
      classes: {},
      t: jest.fn(),
      ...props,
    };
    return shallow(<OrganizationMembers t={() => ""} {...initialProps} />);
  };

const member = {
    "CreatedAt": "2020-09-08T12:20:52.377288Z",
    "DeletedAt": null,
    "ID": 11,
    "UpdatedAt": "2021-09-10T10:21:38.742157Z",
    "UserRole": 1,
    "organization": null,
    "organization_id": 6,
    "user": {
        "CreatedAt": "2020-08-20T10:48:03.718579Z",
        "DeletedAt": null,
        "ID": 150,
        "UpdatedAt": "2021-09-10T10:21:38.740266Z",
        "active": true,
        "address_updated": true,
        "company": "BerryBYtes",
        "email": "sanjeev.roka@berrybytes.com",
        "email_verified": true,
        "first_name": "Sanzv",
        "last_name": "san",
        "password": "$2a$10$3cIC12gljsI9QGjIvLKPneIYW9DF1lMbpPcI7O6ILPC.E.oX1BqGS"
    },
    "user_id": 150
}

describe("Organization Members component", () => {
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
          expect(titleText.text()).toBe(" Members ");
        });
      });

      it("should render members table without errors", () => {
        const wrapper = component.find(TableContainer);
        expect(wrapper.length).toBe(1);
      });
    
      it("should render members table with 1 TableHead", () => {
        const wrapper = component.find(TableContainer);
        const head = wrapper.find(TableHead);
        expect(head.length).toBe(1);
      });
    
      it("should render members table with atleast 4 StyledTableRow for Org Members", () => {
        const wrapper = component.find(TableContainer);
        const head = wrapper.find(TableHead);
        const rows = head.find(StyledTableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(4);
      });

      it('should render no projects when there are not projects', () => {
        const wrapper = findByTestAttr(component, "no-members");
        expect(wrapper.length).toBe(1)
      })

      describe('When projects data is present', () => {
        beforeEach(() => {
          component = setup({
            membersList: [member]
          });
        });

        it('should render the icon', () => {
          const wrapper = findByTestAttr(component,'member-icon')
          expect(wrapper.length).toBe(1)
        })

        it('should render the userlink', () => {
            const wrapper = findByTestAttr(component,'user-link')
            expect(wrapper.text()).toBe(member?.user?.first_name + ' ' + member?.user?.last_name)
        })

        it('should render the email', () => {
            const wrapper = findByTestAttr(component,'user-email')
            expect(wrapper.text()).toBe(member?.user?.email)
        })

        it('should render the email', () => {
            const wrapper = findByTestAttr(component,'user-admin')
            expect(wrapper.text()).toBe(member?.user?.is_admin ? 'Admin' : 'User')
        })

        it('should render no projects when there are not projects', () => {
            const wrapper = findByTestAttr(component, "no-members");
            expect(wrapper.length).toBe(0)
          })
    })
})