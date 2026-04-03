import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import { InfoPopupContainer } from "./InfoPopupContainer";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {}, t: jest.fn() };
  let comp = shallow(<InfoPopupContainer {...initialProps} {...props} />);
  return comp;
};

describe("Info Popup Component", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render the label without error", () => {
    component.setProps({ label: "My Label"})
    const wrapper = findByTestAttr(component, "label");
    expect(wrapper.text()).toBe(" My Label ");
  });

  it("should render info popup without error", () => {
    const wrapper = findByTestAttr(component, "info-popup");
    expect(wrapper.length).toBe(1);
  });
});
