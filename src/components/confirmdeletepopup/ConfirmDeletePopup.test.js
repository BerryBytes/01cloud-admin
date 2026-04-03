import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import { Popup } from "./ConfirmDeletePopup";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {}, t: jest.fn() };
  let comp = shallow(<Popup {...initialProps} {...props} />);
  return comp;
};

describe("ConfirmDelete Popup Component", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render the popup close iconbutton without error", () => {
    const wrapper = findByTestAttr(component, "close-btn");
    expect(wrapper.length).toBe(1);
  });

  it("should render the delete message container", () => {
    const wrapper = findByTestAttr(component, "delete-msg");
    expect(wrapper.length).toBe(1);
  });

  it("should render the delete message as provided", () => {
    let deleteMessage =
      "The action you are taking cannot be undone. This will permanently delete your environment development";
    component.setProps({ message: deleteMessage });
    const wrapper = findByTestAttr(component, "delete-msg");
    expect(wrapper.text()).toBe(deleteMessage);
  });

  it("should render the input field without fail", () => {
    const wrapper = findByTestAttr(component, "input-field");
    expect(wrapper.length).toBe(1);
  });

  it("should not render the delete button if loading", () => {
    component = setup({ loading: true });
    const wrapper = findByTestAttr(component, "confirm-btn");
    expect(wrapper.length).toBe(0);
  });

  it("should render the delete button if not loading", () => {
    component = setup({ loading: false });
    const wrapper = findByTestAttr(component, "confirm-btn");
    expect(wrapper.length).toBe(1);
  });

  it("should remain the button disabled initially", () => {
    const wrapper = findByTestAttr(component, "confirm-btn");
    expect(wrapper.props().disabled).toBe(true);
  });

  it("should remain the button disabled if wrong value is entered in the input field", () => {
    component = setup({ loading: false, toMatchName: "development" });
    const input = findByTestAttr(component, "input-field");
    input.simulate("change", { target: { value: "some wrong text" } });
    const wrapper = findByTestAttr(component, "confirm-btn");
    expect(wrapper.props().disabled).toBe(true);
  });

  it("should re-enable the button if matching name is entered in the input field", () => {
    const input = findByTestAttr(component, "input-field");
    input.simulate("change", { target: { value: "development" } });
    const wrapper = findByTestAttr(component, "confirm-btn");
    expect(wrapper.props().disabled).toBe(false);
  });

  it("should not render the loader if not loading", () => {
    const wrapper = findByTestAttr(component, "loader");
    expect(wrapper.length).toBe(0);
  });

  it("should show the loader if 'loading' is true", () => {
    component = setup({ loading: true });
    const loader = findByTestAttr(component, "loader");
    expect(loader.length).toBe(1);
  });
});
