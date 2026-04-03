import React from "react";
import { configure, shallow } from "enzyme";
import { SideBar } from "./Sidebar";
import SidebarNav from "./sidebarnav/SidebarNav"
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";
import { Hidden, Drawer } from '@material-ui/core';

configure({ adapter: new Adapter() });

const drawerToggle = jest.fn();

const setUp = (props = {}, state = {}) => {
  let newProps = {
    drawerToggle,
    mobileOpen: false,
    history: {
      push: jest.fn(),
    },
    ...props,
  };

  const component = shallow(<SideBar classes={{}} {...newProps} />);

  component.setState({
    ...state,
  });
  return component;
};

describe("Sidebar component", () => {
  let component;
  component = setUp();

  beforeEach(() => {});

  it("should render sidebar-container", () => {
    const wrapper = findByTestAttr(component, "sidebar-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render siderbar-container", () => {
    const wrapper = findByTestAttr(component, "sidebar-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render Hidden component", () => {
    const wrapper = component.find(Hidden);
    expect(wrapper.length).toBe(2);
  });

  it("should render one Hidden component with mdDown true", () => {
    const wrapper = component.find(Hidden);
    const c = wrapper.find({ mdDown: true });
    expect(c.length).toBe(1);
  });

  it("should render one Hidden component with lgUp true", () => {
    const wrapper = component.find(Hidden);
    const c = wrapper.find({ lgUp: true });
    expect(c.length).toBe(1);
  });

  describe("Hidden mdDown", () => {
    let c;
    beforeEach(() => {
      component = setUp();
      const wrapper = component.find(Hidden);
      c = wrapper.find({ mdDown: true });
    });

    it("should render Drawer component", () => {
      const d = c.find(Drawer);
      expect(d.length).toBe(1);
    });

    it("should render drawer container", () => {
      const comp = findByTestAttr(c, "drawer-container");
      expect(comp.length).toBe(1);
    });

    it("should render SidebarNav", () => {
      const sideNav = c.find(SidebarNav);
      expect(sideNav.length).toBe(1);
    });
  });
});
