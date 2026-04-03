import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from '../../helpers/utils';
import { Support } from './Support';

import {
    TableHead,
    TableRow,
    TableCell,
  } from "@material-ui/core";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
    const newProps = {
        ticketList: null,
        ticketStats: null,
        ticketGroup: null,
        adminGroup: null,
        getTicketList: jest.fn(),
        getTicketGroup: jest.fn(),
        getAdminGroup: jest.fn(),
        getTicketStats: jest.fn(),
        updateBreadcrumb: jest.fn(),
        ...props
    }
    
    const component = shallow(
        <Support classes={{}} t={() => ""} {...newProps} />
      );
    
    return component;
}

const ticketList ={data: [
    {
        "id": 85,
        "title": "new ticket",
        "category": "Engineering",
        "priority": "Medium",
        "status": "Open",
        "date": 1613638062,
        "lastResponse": 18446744011573954816,
        "isLastResponse": true,
        "user": {
            "id": 188,
            "firstName": "Rupak",
            "lastName": "Acharya",
            "image": "https://api.test.01cloud.dev/uploads/image/jpeg/0cf9227c-9822-4595-9510-65b889a4d7e9.jpg",
            "email": "rupak.acharya@berrybytes.com"
        }
    },
    {
        "id": 20,
        "title": "b",
        "category": "Others",
        "priority": "High",
        "status": "Open",
        "assignee": 3,
        "date": 1612165316,
        "lastResponse": 18446744011573954816,
        "isLastResponse": true,
        "user": {
            "id": 90,
            "firstName": "Sanjeev",
            "lastName": "Roka",
            "image": "https://api.test.01cloud.dev/uploads/image/jpeg/363d6731-16f0-49c0-b19e-39a6175556ed.jpeg",
            "email": "sanjeev.roka@nepallink.net"
        }
    }
]}

describe('Support Container', () => {
    let component = setUp({});
    const getTicketList = jest.fn();

    it("should render without errors", () => {
        const wrapper = findByTestAttr(component, "support-container")
        expect(wrapper.length).toBe(1);
    })

    it("should render unassigned ticket-list-container initially", () => {
        const wrapper = findByTestAttr(component, "unassigned-ticket-list-container");
        expect(wrapper.length).toBe(1);
      });

    it("should render assigned ticket-list-container initially", () => {
    const wrapper = findByTestAttr(component, "assigned-ticket-list-container");
    expect(wrapper.length).toBe(1);
    });

    it("should render card to show data", () => {
        const wrapper = findByTestAttr(component, "stats-card");
        expect(wrapper.length).toBe(1);
    });

    it("should render filter portion", () => {
        const wrapper = findByTestAttr(component, "filter-tickets");
        expect(wrapper.length).toBe(1);
    });

    it("should not render the reset button initially", () => {
        const wrapper = findByTestAttr(component, "reset-button");
        expect(wrapper.length).toBe(0);
    });

    it("should render a typography with text Unassigned Text in it", () => {
        const wrapper = findByTestAttr(component, "unassigned-ticket");
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toBe("Unassigned Tickets");
    });

    it("should render a typography with text Unassigned Text in it", () => {
        const wrapper = findByTestAttr(component, "assigned-ticket");
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toBe("Assigned Tickets");
    });

    it("should not render no-unassigned ticket initially", () => {
        const wrapper = findByTestAttr(component, "no-unassigned-ticket");
        expect(wrapper.length).toBe(0);
    });

    it("should not render no ticket available unassigned initially", () => {
        const wrapper = findByTestAttr(component, "no-ticket-available-unassigned");
        expect(wrapper.length).toBe(0);
    });

    it("should not render no-assigned ticket initially", () => {
        const wrapper = findByTestAttr(component, "no-assigned-ticket");
        expect(wrapper.length).toBe(0);
    });

    it("should not render no ticket available assigned initially", () => {
        const wrapper = findByTestAttr(component, "no-ticket-available-assigned");
        expect(wrapper.length).toBe(0);
    });

    describe('Support Component With Some Unassigned Tickets',() => {
        beforeEach(() => {
            const props = {
                ticketList,
                getTicketList,
            };
            component = setUp(props, {});
        });

        it("should render TableContainer with 1 TableHead", () => {
            const wrapper = findByTestAttr(component, "unassigned-ticket-list-container");
            const head = wrapper.find(TableHead);
            expect(head.length).toBe(1);
        });

        it("should render tickets table with atleast 7 TableCell", () => {
            const wrapper = findByTestAttr(component, "unassigned-ticket-list-container");
            const head = wrapper.find(TableHead);
            const rows = head.find(TableRow);
            const row = rows.find(TableCell);
            expect(row.length).toBe(7);
            const date = row.findWhere((r) => r.text() === "ID");
            expect(date.length).toBeGreaterThanOrEqual(1);
            const title = row.findWhere((r) => r.text() === "Title");
            expect(title.length).toBeGreaterThanOrEqual(1);
            const created = row.findWhere((r) => r.text() === "Date");
            expect(created.length).toBeGreaterThanOrEqual(1);
            const category = row.findWhere((r) => r.text() === "Category");
            expect(category.length).toBeGreaterThanOrEqual(1);
            const priority = row.findWhere((r) => r.text() === "Priority");
            expect(priority.length).toBeGreaterThanOrEqual(1);
            const status = row.findWhere((r) => r.text() === "Status");
            expect(status.length).toBeGreaterThanOrEqual(1);
            const lastResponse = row.findWhere((r) => r.text() === "Owner");
            expect(lastResponse.length).toBeGreaterThanOrEqual(1);
        });

        it("testing for id value at first node it should be 85", () => {
            const cell = findByTestAttr(component, "ticket-id-cell").at(0);
            expect(cell.text()).toBe("#85");
        });

        it("testing for title value at first node it should be new ticket", () => {
            const cell = findByTestAttr(component, "ticket-title-cell").at(0);
            expect(cell.text()).toBe("new ticket");
        });

        it("testing for date value at first node it should be February 18, 2021 2:17 PM", () => {
            const cell = findByTestAttr(component, "ticket-date-cell").at(0);
            expect(cell.text()).toBe("February 18, 2021 2:32 PM");
        });

        it("testing for category value at first node it should be Engineering", () => {
            const cell = findByTestAttr(component, "ticket-category-cell").at(0);
            expect(cell.text()).toBe("Engineering");
        });

        it("testing for priority value at first node it should be Medium", () => {
            const cell = findByTestAttr(component, "ticket-priority-cell").at(0);
            expect(cell.text()).toBe("    Medium");
        });

        it("testing for status value at first node it should be Open", () => {
            const cell = findByTestAttr(component, "ticket-status-cell").at(0);
            expect(cell.text()).toBe(" Open");
        });

        it("testing for owner value at first node it should be Rupak Acharya", () => {
            const cell = findByTestAttr(component, "ticket-owner-cell").at(0);
            expect(cell.text()).toBe("Rupak Acharya");
        });        
    });

    describe('Support Component With Some Assigned Tickets In it', () => {
        beforeEach(() => {
            const props = {
                ticketList,
                getTicketList
            };
            component = setUp(props, {});
        });

        it("should render TableContainer with 1 TableHead", () => {
            const wrapper = findByTestAttr(component, "assigned-ticket-list-container");
            const head = wrapper.find(TableHead);
            expect(head.length).toBe(1);
        });

        it("should render tickets table with atleast 7 TableCell", () => {
            const wrapper = findByTestAttr(component, "assigned-ticket-list-container");
            const head = wrapper.find(TableHead);
            const rows = head.find(TableRow);
            const row = rows.find(TableCell);
            expect(row.length).toBe(8);
            const date = row.findWhere((r) => r.text() === "ID");
            expect(date.length).toBeGreaterThanOrEqual(1);
            const title = row.findWhere((r) => r.text() === "Title");
            expect(title.length).toBeGreaterThanOrEqual(1);
            const created = row.findWhere((r) => r.text() === "Date");
            expect(created.length).toBeGreaterThanOrEqual(1);
            const assignee = row.findWhere((r) => r.text() === "Assignee");
            expect(assignee.length).toBeGreaterThanOrEqual(1);
            const category = row.findWhere((r) => r.text() === "Category");
            expect(category.length).toBeGreaterThanOrEqual(1);
            const priority = row.findWhere((r) => r.text() === "Priority");
            expect(priority.length).toBeGreaterThanOrEqual(1);
            const status = row.findWhere((r) => r.text() === "Status");
            expect(status.length).toBeGreaterThanOrEqual(1);
            const lastResponse = row.findWhere((r) => r.text() === "Owner");
            expect(lastResponse.length).toBeGreaterThanOrEqual(1);
        });

        it("testing for id value at first node it should be 85", () => {
            const cell = findByTestAttr(component, "ticket-id-cell-assigned").at(0);
            expect(cell.text()).toBe("#20");
        });

        it("testing for title value at first node it should be new ticket", () => {
            const cell = findByTestAttr(component, "ticket-title-cell-assigned").at(0);
            expect(cell.text()).toBe("b");
        });

        it("testing for date value at first node it should be February 1, 2021 1:11 PM", () => {
            const cell = findByTestAttr(component, "ticket-date-cell-assigned").at(0);
            expect(cell.text()).toBe("February 1, 2021 1:26 PM");
        });

        it("testing for category value at first node it should be Engineering", () => {
            const cell = findByTestAttr(component, "ticket-category-cell-assigned").at(0);
            expect(cell.text()).toBe("Others");
        });

        it("testing for priority value at first node it should be Medium", () => {
            const cell = findByTestAttr(component, "ticket-priority-cell-assigned").at(0);
            expect(cell.text()).toBe("    High");
        });

        it("testing for status value at first node it should be Open", () => {
            const cell = findByTestAttr(component, "ticket-status-cell-assigned").at(0);
            expect(cell.text()).toBe(" Open");
        });

        it("testing for owner value at first node it should be Rupak Acharya", () => {
            const cell = findByTestAttr(component, "ticket-owner-cell-assigned").at(0);
            expect(cell.text()).toBe("Sanjeev Roka");
        });

        it("testing for assignee value at first node it should be 3", () => {
            component.setProps({
                adminGroup:  {
                    data: {
                        user: 
                        [{"id":190,"firstName":"Rupak","lastName":"Acharya","email":"acharyarupak391@gmail.com"},
                        {"id":3,"firstName":"Roshan","lastName":"Rijal","email":"rijalroshan94@gmail.com"}]
                    }
                }  
            })
            const cell = findByTestAttr(component, "ticket-assignee-cell-assigned").at(0);
            expect(cell.text()).toBe("Roshan Rijal");
        });
    });

    describe('ticket Stats in Support Component', () => {
        
        it('should show title Open Tickets', () => {
                const cell = findByTestAttr(component, "open-count").at(0);
                expect(cell.props().title).toBe('Open Tickets')
        });

        it('should show title Closed Tickets', () => {
            const cell = findByTestAttr(component, "close-count").at(0);
            expect(cell.props().title).toBe('Closed Tickets')
        });

        it('should show title Total Tickets', () => {
            const cell = findByTestAttr(component, "total-tickets").at(0);
            expect(cell.props().title).toBe('Total Tickets')
        });

        it('should show title Ticket Types', () => {
            const cell = findByTestAttr(component, "ticket-types").at(0);
            expect(cell.props().title).toBe('Ticket Types')
        });
    });

});
