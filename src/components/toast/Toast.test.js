import React from "react";
import { Message } from "./Toast";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";

configure({ adapter: new Adapter() });

const setup = (props) => {
  let _props = {
    t: jest.fn(),
    classes: {},
    ...props,
  };
  return shallow(<Message {..._props} />);
};

describe("Toast Message Test ", () => {
    let component = setup();

    it('should render the main container without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })

    it('should render the icon container without error', () => {
        const wrapper = findByTestAttr(component, "icon")
        expect(wrapper.length).toBe(1)
    })

    it('should render the icon in the icon container', () => {
        component.setProps({ icon: "https://muxig.org/teddyphotos.jpg"})
        const wrapper = findByTestAttr(component, "icon")
        expect(wrapper.text()).toBe("https://muxig.org/teddyphotos.jpg")
    })

    it('should render the message container without error', () => {
        const wrapper = findByTestAttr(component, "message")
        expect(wrapper.length).toBe(1)
    })

    it('should render the message in the message container', () => {
        component.setProps({ msg: "Successfully Complied"})
        const wrapper = findByTestAttr(component, "message")
        expect(wrapper.text()).toBe("Successfully Complied")
    })
});