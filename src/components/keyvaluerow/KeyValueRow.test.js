import React from "react";
import { KeyValueRow } from "./KeyValueRow";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";
import { CopyIcon } from "../copyicon/CopyIcon";

configure({ adapter: new Adapter() });

const rowKey = "key";
const rowValue = "value";

const setup = (props) => {
  let _props = {
    className: "",
    rowKey: "",
    rowValue: "",
    ...props,
  };
  return shallow(<KeyValueRow {..._props} />);
};

describe("EnvironmentCard", () => {
  let component = setup({
    rowKey,
    rowValue,
  });

  it("should render the main if key and value are provided", () => {
    const wrapper = findByTestAttr(component, "mainContainer");
    expect(wrapper.length).toBe(1);
  });

  it("should render keycontainer if key provided", () => {
    const wrapper = findByTestAttr(component, "keyContainer");
    expect(wrapper.length).toBe(1);
  });

  it("should render valuecontainer if value provided", () => {
    const wrapper = findByTestAttr(component, "valueContainer");
    expect(wrapper.length).toBe(1);
  });

  it("should render key Container with correct value", () => {
    const wrapper = findByTestAttr(component, "keyContainer");
    const val = findByTestAttr(wrapper, "rowKey");
    expect(val.text()).toBe(rowKey);
  });

  it("should render Value Container with correct value", () => {
    const wrapper = findByTestAttr(component, "valueContainer");
    const val = findByTestAttr(wrapper, "rowValue");
    expect(val.text()).toBe(rowValue);
  });

  it("shouldn't render CopyIcon by default", () => {
    const wrapper = findByTestAttr(component, "mainContainer");
    const copyIcon = wrapper.find(CopyIcon);
    expect(copyIcon.length).toBe(0);
  });

  it("should render CopyIcon if prop has copy true", () => {
    component = setup({
      rowKey,
      rowValue,
      copy: true,
    });
    const wrapper = findByTestAttr(component, "mainContainer");
    const copyIcon = wrapper.find(CopyIcon);
    expect(copyIcon.length).toBe(1);
  });
});
