import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr, getDateInStandardFormat } from "../../helpers/utils";
import { Dns } from "./Dns";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = {classes: {}, dnsList: []};
  let comp = shallow(<Dns {...initialProps} t={() => ""} {...props} />)
  return comp;
}

describe("Organization: DNS Tab unit test", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1)
  });
  
  it("should render the 'Add DNS' button without fail", () => {
    const wrapper = findByTestAttr(component, "add-btn");
    expect(wrapper.length).toBe(1)
  });
  
  it("Clicking the 'Add DNS' button and opening AddDNS Popup", () => {
    const wrapper = findByTestAttr(component, "add-btn");
    wrapper.simulate('click');
    const popup = findByTestAttr(component, "add-dns-popup");
    expect(popup.length).toBe(1)
  });
  
  it("should render DNS list table container without fail", () => {
    const wrapper = findByTestAttr(component, "table-container");
    expect(wrapper.length).toBe(1)
  });
  
  it("shouldn't render dns data table row if dns list empty", () => {
    component = setup({dnList: []})
    const wrapper = findByTestAttr(component, "dns-row");
    expect(wrapper.length).toBe(0)
  });
  
  it("should render correct number of dns data table row", () => {
    component = setup({dnsList: [{name: "dns1"}, {name: "dns0"}]})
    const wrapper = findByTestAttr(component, "dns-row");
    expect(wrapper.length).toBe(2)
  });

  describe("DNS table row", () => {
    beforeEach(()=>{
      component = setup({
        dnsList: [
          {
            name: "my-dns",
            provider: "aws",
            createdat: "2021-04-09T04:32:53.347875Z",
          },
        ],
      });
    })
    
    it("should display correct DNS name in the row", () => {
      const wrapper = findByTestAttr(component, "dns-name").at(0);
      expect(wrapper.text()).toBe("my-dns")
    })
    
    it("should display correct DNS provider in the row", () => {
      const wrapper = findByTestAttr(component, "dns-provider").at(0);
      expect(wrapper.text()).toBe("aws")
    })
    
    it("should display correct DNS provider in the row", () => {
      const wrapper = findByTestAttr(component, "dns-created").at(0);
      expect(wrapper.text()).toBe(getDateInStandardFormat("2021-04-09T04:32:53.347875Z"))
    })
    
    it("should display Edit Dns icon in the row", () => {
      const wrapper = findByTestAttr(component, "edit-btn").at(0);
      expect(wrapper.length).toBe(1)
    })
    
    it("clicking edit dns button and checking for edit popup to open", () => {
      const wrapper = findByTestAttr(component, "edit-btn").at(0);
      wrapper.simulate('click');
      const popup = findByTestAttr(component, "add-dns-popup");
      expect(popup.length).toBe(1);
    })
  })
})