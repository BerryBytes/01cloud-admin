import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {
  findByTestAttr,
  getDateInStandardFormat,
} from "../../helpers/utils";
import { Registry } from "./Registry";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {} };
  let comp = shallow(<Registry {...initialProps} t={() => ""} {...props} />);
  return comp;
};

describe("Registry unit test", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render the 'Add Registry' button without fail", () => {
    const wrapper = findByTestAttr(component, "add-btn");
    expect(wrapper.length).toBe(1);
  });

  it("should not render the Add Registry Popup by default", () => {
    const wrapper = findByTestAttr(component, "add-reg-popup");
    expect(wrapper.length).toBe(0);
  });

  it("Clicking the 'Add Registry' button to open the popup", () => {
    const wrapper = findByTestAttr(component, "add-btn");
    wrapper.simulate("click");
    const popup = findByTestAttr(component, "add-reg-popup");
    expect(popup.length).toBe(1);
  });

  it("should render the Registry list table container", () => {
    const wrapper = findByTestAttr(component, "table-container");
    expect(wrapper.length).toBe(1);
  });

  it("no table rows should be displayed if registry list is empty", () => {
    component = setup({ registrylist: [] });
    const wrapper = findByTestAttr(component, "registry-row");
    expect(wrapper.length).toBe(0);
  });

  it("correct number of table rows should be displayed", () => {
    component = setup({ registrylist: [{}, {}] });
    const wrapper = findByTestAttr(component, "registry-row");
    expect(wrapper.length).toBe(2);
  });

  describe("Registry Table row", () => {
    beforeEach(() => {
        component = setup({
        registrylist: [
          {
            name: "my-registry",
            provider: "aws",
            createdat: "2021-03-25T11:09:11.736657Z",
          },
        ],
      })
    })

    it("should display correct rgistry name in the table row", () => {
      const wrapper = findByTestAttr(component, "registry-name").at(0);
      expect(wrapper.text()).toBe(" my-registry ");
    });

    it("should display correct rgistry name in the table row", () => {
      const wrapper = findByTestAttr(component, "registry-provider").at(0);
      expect(wrapper.text()).toBe("aws");
    });

    it("should display correct rgistry name in the table row", () => {
      const wrapper = findByTestAttr(component, "registry-created").at(0);
      expect(wrapper.text()).toBe(
        getDateInStandardFormat("2021-03-25T11:09:11.736657Z")
      );
    });

    it("should display registry edit icon without fail", () => {
      const wrapper = findByTestAttr(component, "registry-edit").at(0);
      expect(wrapper.length).toBe(1);
    });

    it("should display registry delete icon without fail", () => {
      const wrapper = findByTestAttr(component, "registry-delete").at(0);
      expect(wrapper.length).toBe(1);
    });
  });
});
