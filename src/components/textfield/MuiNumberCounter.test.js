import React from "react";
import { MuiNumberCounter } from "./MuiNumberCounter";
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
  return shallow(<MuiNumberCounter {..._props} />);
};

describe("Mui Number Counter ", () => {
    let component = setup();

    it('should render the text field container', () => {
        const wrapper = findByTestAttr(component, "text-field-container")
        expect(wrapper.length).toBe(1)
    })
});
