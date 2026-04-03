import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import { InfoPopup } from "./InfoPopup";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {}, t: jest.fn() };
  let comp = shallow(<InfoPopup {...initialProps} {...props} />);
  return comp;
};

describe("Info Popup Component", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render the html tool tip without error", () => {
    const wrapper = findByTestAttr(component, "tool-tip");
    expect(wrapper.length).toBe(1);
  });

  it("should render the info-icon without error", () => {
    const wrapper = findByTestAttr(component, "info-icon");
    expect(wrapper.length).toBe(1);
  });

  it("should render title as supplied from the UI", () => {
    component.setProps({
        scope: "component",
        message: "This is a component"
    })
    const wrapper = findByTestAttr(component, "tool-tip");
    expect(wrapper.props().title).toBe("This is a component")
  });
});
