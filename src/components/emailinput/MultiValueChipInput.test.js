import React from "react";
import { MultiValueChipInput } from "./MultiValueChipInput";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";

configure({ adapter: new Adapter() });

const setup = () => {
	let props = {
		classes: {
			tagItem: "MultiValueChipInput-tagItem-214",
			button: "MultiValueChipInput-button-215",
    },
    values: []
	};
	return shallow(<MultiValueChipInput t={() => ""} {...props} />);
};

describe("MultiValue input component", () => {
	const component = setup();
  
  it("should render the main component without fail", () => {
		const wrapper = findByTestAttr(component, "main-container");
		expect(wrapper.length).toBe(1);
  });

  it("should render the values input field", () => {
		const wrapper = findByTestAttr(component, "tags-input");
		expect(wrapper.length).toBe(1);
  });

  it("should render no values if values list is empty", () => {
		const wrapper = findByTestAttr(component, "tags-div");
		expect(wrapper.length).toBe(0);
	});

	it("should render the correct number of tags as provided in props", () => {
		component.setProps({ values: ["tag1", "tag2", "tag3"] });
		const wrapper = findByTestAttr(component, "tags-div");
		expect(wrapper.length).toBe(3);
  });

  it("simulating key press in the values input field", () => {
    const wrapper = findByTestAttr(component, "tags-input");
    const mockCall = jest.fn()
    component.instance().handleKeyDown = mockCall();
    wrapper.simulate('keydown', {key: ""})
		expect(mockCall).toHaveBeenCalled();
  });

});