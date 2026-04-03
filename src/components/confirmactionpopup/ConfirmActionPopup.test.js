import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import { Popup } from "./ConfirmActionPopup";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {}, t: jest.fn() };
  let comp = shallow(<Popup {...initialProps} {...props} />);
  return comp;
};

describe("Activity Logs Component", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should show the popup message container", () => {
    const wrapper = findByTestAttr(component, "popup-msg");
    expect(wrapper.length).toBe(1);
  });

  it("should show correct popup message", () => {
    component = setup({ message: "This is a popup message." });
    const wrapper = findByTestAttr(component, "popup-msg");
    expect(wrapper.text()).toBe("This is a popup message.");
  });

  it("should show the agree button in not loading", () => {
    const wrapper = findByTestAttr(component, "yes-text");
    expect(wrapper.length).toBe(1);
  });

  it("should show correct agree button text as provided", () => {
    component = setup({ yesText: "Are you sure?" });
    const wrapper = findByTestAttr(component, "yes-text");
    expect(wrapper.text()).toBe("Are you sure?");
  });

  it("should show the agree button in not loading", () => {
    const wrapper = findByTestAttr(component, "no-text");
    expect(wrapper.length).toBe(1);
  });

  it("should show correct agree button text as provided", () => {
    component = setup({ noText: "Cancel" });
    const wrapper = findByTestAttr(component, "no-text");
    expect(wrapper.text()).toBe("Cancel");
  });
});
