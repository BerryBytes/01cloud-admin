import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../../helpers/utils";
import { TicketNotePopup } from './TicketNotePopup';
import {
    Dialog
} from "@material-ui/core";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const newProps = {
    ...props,
  };
  return shallow(
    <TicketNotePopup classes={{}} t={() => ""} {...newProps} />
  );
};

describe('Ticket Note Popup Test', () => {
    let component = setup({})
    it("Should Render Dialog Component", () => {
        const wrapper = component.find(Dialog);
        expect(wrapper.length).toBe(1);
    });

    it("Shouldn't Render Dialog Component", () => {
        const wrapper = component.find(Dialog).first();
        expect(wrapper.props().open).toBeFalsy();
    });

    describe('when open is true', () => {
        const handleClose = jest.fn()
        const action = jest.fn()
        beforeEach(() => {
          component = setup({
            open: true,
            handleClose,
            action
          });
        });

        it("Should Render Dialog Component", () => {
            const wrapper = component.find(Dialog).first();
            expect(wrapper.props().open).toBeTruthy();
        });

        it("When close in Dialog Box is Clicked it should close the popup", () => {
            const wrapper = component.find(Dialog).first();
            wrapper.props().onClose()
            expect(handleClose).toHaveBeenCalled()
        });

        it("When close button in Dialog Box is Clicked it should close the popup", () => {
            const wrapper = findByTestAttr(component, "close-button");
            wrapper.props().onClick()
            expect(handleClose).toHaveBeenCalled()
        });

        it("Dialog Title should be props passed + Ticket", () => {
            component = setup({
                label: "Test Lablel"
            })
            const wrapper = findByTestAttr(component, "dialog-title");
            expect(wrapper.text()).toBe("Test Lablel Ticket")
        });

        it("Title of dialog Content should be Note", () => {
            const wrapper = findByTestAttr(component, "dialog-content");
            expect(wrapper.text()).toBe("Note")
        });

        it('should render markdown field', () => {
            const wrapper = findByTestAttr(component, 'markdown-field')
            expect(wrapper.length).toBe(1)
        })

        it('should render action button', () => {
            const wrapper = findByTestAttr(component, 'action-button')
            expect(wrapper.length).toBe(1)
        })

        it("Text in the button must be test label ticket", () => {
            component = setup({
                label: "Test Lablel"
            })
            const wrapper = findByTestAttr(component, 'action-button')
            expect(wrapper.text()).toBe("Test Lablel Ticket")
        });

        it('should render action button', () => {
            const wrapper = findByTestAttr(component, 'action-button')
            wrapper.props().onClick()
            expect(action).toHaveBeenCalled()
        })
    })
})