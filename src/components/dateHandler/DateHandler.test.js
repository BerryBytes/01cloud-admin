import React from 'react';
import { DateHandler } from './DateHandler'
import { configure, shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { getDiffDays, getDateInStandardFormat, findByTestAttr } from '../../helpers/utils'

configure({ adapter: new Adapter()})

const setup = () => {
    const testProps = {}
    return shallow(<DateHandler t={() => ""} {...testProps} />);
}

describe('Date Handler Component', () => {
    const component = setup();

    it("should render the date component without error", () => {
		const wrapper = findByTestAttr(component, "date-container");
		expect(wrapper.length).toBe(1);
	});

    it("should render the tooltip ", () => {
		const wrapper = findByTestAttr(component, "tool-tip");
		expect(wrapper.length).toBe(1);
	});

    it("should render the info component", () => {
		const wrapper = findByTestAttr(component, "top-info");
		expect(wrapper.length).toBe(1);
	});

    it("when hovering on span it should show January 27, 2021 3:08 PM", () => {
        component.setProps({
            date: "2021-01-27T09:23:26.410996Z",
        });
		const wrapper = findByTestAttr(component, "top-info");
        expect(wrapper.props().title).toBe(
            getDateInStandardFormat("2021-01-27T09:23:26.410996Z")
          );
	});

    it("in span it should show 91d ago", () => {   
        component.setProps({
            date: "2021-01-28T09:23:26.410996Z",
        });
		const wrapper = findByTestAttr(component, "top-info");
        expect(wrapper.text()).toBe(
            getDiffDays("2021-01-28T09:23:26.410996Z", true)
          );
	});
})
