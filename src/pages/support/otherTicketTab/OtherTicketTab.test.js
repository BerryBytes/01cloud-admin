import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from '../../../helpers/utils';
import { OtherTicketTab } from './OtherTicketTab';
import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
  } from "@material-ui/core";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
    const newProps = {
        ticketList: null,
        ticketDetails: null,
        getTicketList: jest.fn(),
        getTicketDetails: jest.fn(),
        match: {
            params : {
                ticketId: 84
            }
        },
        ...props
    }
const component = shallow(
    <OtherTicketTab classes={{}} t={() => ""} {...newProps} />
  );

return component;
}

const ticketList ={
    data: [
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
        "id": 84,
        "title": "new ticket",
        "category": "Engineering",
        "priority": "Medium",
        "status": "Open",
        "date": 1613638056,
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
        "id": 83,
        "title": "new ticket",
        "category": "Engineering",
        "priority": "Medium",
        "status": "Open",
        "date": 1613638056,
        "lastResponse": 18446744011573954816,
        "isLastResponse": true,
        "user": {
            "id": 188,
            "firstName": "Rupak",
            "lastName": "Acharya",
            "image": "https://api.test.01cloud.dev/uploads/image/jpeg/0cf9227c-9822-4595-9510-65b889a4d7e9.jpg",
            "email": "rupak.acharya@berrybytes.com"
        }
    }
]}

describe('Other Tickets Container', () => {
    let component = setUp({});
    const getTicketList = jest.fn();

    it("should render without errors", () => {
        const wrapper = findByTestAttr(component, "otherTickets-container")
        expect(wrapper.length).toBe(1);
    })

    it("should render  ticket-list-container initially", () => {
        const wrapper = findByTestAttr(component, "tab-container")
        expect(wrapper.length).toBe(1);
      });

    describe('Support Component With Some  Tickets', () => {
        beforeEach(() => {
            const props = {
                ticketList,
                getTicketList,
            };
            component = setUp(props, {});
        });

        it("should render TableContainer with 1 TableHead", () => {
            const wrapper = component.find(TableContainer);
            const head = wrapper.find(TableHead);
            expect(head.length).toBe(1);
        });

        it("should render tickets table with atleast 7 TableCell", () => {
            const wrapper = findByTestAttr(component, "tab-container");
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

        it("if id is 84 than it should not be in the list", () => {
            const cells = findByTestAttr(component, "ticket-id-cell");
            expect(cells.length).toBe(ticketList.data.length - 1 )
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
});