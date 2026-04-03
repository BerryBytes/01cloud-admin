import { Tab, Tabs } from "@material-ui/core";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../../helpers/utils";
import { TicketOverView, TabPanel } from "./TicketOverView";
import OverviewTab from "../overviewTab/OverViewTab";
import OtherTicketTab from "../otherTicketTab/OtherTicketTab";
import NotesTab from "../notesTab/NotesTab";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
    const initialProps = {
        match: {
            params: {
                ticketId: 64
            }
        },
        history: { location: { push: jest.fn() } },
        classes: {} 
    };
    let comp = shallow(
        <TicketOverView {...initialProps} t={() => ""} {...props} />
    );
    return comp;
};

const tabs = {
    overview: {
        index: 0,
        component: OverviewTab
    },
    notes: {
        index: 1,
        component: NotesTab
    },
    otherticket: {
        index: 2,
        component: OtherTicketTab
    }
}

describe('Ticket Overview Tab Testing', () => {
    let component = setup({})
    it("should render the main container without error", () => {
        const wrapper = findByTestAttr(component, "main-container");
        expect(wrapper.length).toBe(1);
    });

    it("the title in the ticket should be  Ticket #64 ", () => {
        const wrapper = findByTestAttr(component, "ticketid-container");
        expect(wrapper.text()).toBe(" Ticket #64 ");
    });

    it('should render the back button', () => {
        const wrapper = findByTestAttr(component, "back-button");
        expect(wrapper.length).toBe(1);
    })

    it("should render the Tabs component", () => {
        const wrapper = component.find(Tabs)
        expect(wrapper.length).toBe(1);
    });

    it("should render 3 Tab component ", () => {
        const tab = component.find(Tab)
        expect(tab.length).toBe(3);
    });

    it("should render the overview tab", () => {
        const tab = findByTestAttr(component, "overview-tab");
        expect(tab.length).toBe(1);
    });

    it("should render the notes tab", () => {
        const tab = findByTestAttr(component, "notes-tab");
        expect(tab.length).toBe(1);
    });

    it("should render the otherticket tab", () => {
        const tab = findByTestAttr(component, "otherticket-tab");
        expect(tab.length).toBe(1);
    });

    describe("Tab Panels", () => {
        let tabPanels
        beforeEach(() => {
            tabPanels = component.find(TabPanel)
        })

        it("should render 3 Tabpanels", () => {
            expect(tabPanels.length).toBe(3)
        })

        Object.keys(tabs).forEach((k) => 
        {

            it(`should render 1 Tabpanel with name ${k}`, () => {
                const tanPanel = tabPanels.find(`[name='${k}']`)
                expect(tanPanel.length).toBe(1)
            })

            it(`should render ${k} tabpanel with correct index`, () => {
                const tanPanel = tabPanels.find(`[name='${k}']`)
                expect(tanPanel.props().index).toBe(tabs[k].index)
            })

            it(`should render ${k} tabpanel with correct component`, () => {
                const tanPanel = tabPanels.find(`[name='${k}']`)
                const comp = tanPanel.find(tabs[k].component)
                expect(comp.length).toBe(1)
            })
        })
    })
})