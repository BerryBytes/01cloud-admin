import React from "react";
import { Clusterworkflow } from "./ClusterWorkflow";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";

configure({ adapter: new Adapter() });

const setup = (props) => {
	return shallow(<Clusterworkflow t={() => ""} {...props} />);
};

describe("ClusterWorkflow Component", () => {
	let component = setup();

	it("should render the main component without fail", () => {
		let wrapper = findByTestAttr(component, "main-container");
		expect(wrapper.length).toBe(1);
	});

	it("should render the cluster websocket component", () => {
		let wrapper = findByTestAttr(component, "cluster-ws");
		expect(wrapper.length).toBe(1);
	});

	it("shouldn't render the 'Apply' button if cluster status is not planned", () => {
		let wrapper = findByTestAttr(component, "apply-button");
		expect(wrapper.length).toBe(0);
	});

	it("should render the 'Apply' button if cluster is planned", () => {
		component = setup({
			classes: {},
			clusterDetails: { status: "planned" },
		});
		let wrapper = findByTestAttr(component, "apply-button");
		expect(wrapper.length).toBe(1);
	});

	it("simulating the 'Apply' button click", () => {
		component = setup({
			classes: {},
			clusterDetails: { status: "planned" },
		});
		const mockCallback = jest.fn();
		component.instance().handleApplyTerraform = mockCallback;
		let wrapper = findByTestAttr(component, "apply-button");
		wrapper.simulate("click");
		expect(mockCallback).toHaveBeenCalled();
	});

	it("shouldn't render the infinite scroll component if clusterWorkflows is empty", () => {
		let wrapper = findByTestAttr(component, "infinite-scroll");
		expect(wrapper.length).toBe(0);
	});

	it("should render the infinite scroll component if clusterWorkflows is not empty", () => {
		component = setup({ clusterWorkflows: [{}] });
		let wrapper = findByTestAttr(component, "infinite-scroll");
		expect(wrapper.length).toBe(1);
	});

	it("should render correct number of cluster history data card", () => {
		component = setup({ clusterWorkflows: [{}, {}, {}] });
		let wrapper = findByTestAttr(component, "data-card");
		expect(wrapper.length).toBe(3);
	});

	it("should render the skeletons when clusterWorkflows data hasn't been fetched yet", () => {
		component = setup();
		let wrapper = findByTestAttr(component, "card-skeleton");
		expect(wrapper.length).toBe(5);
	});

	it("should render the 'No history image' when clusterWorkflows is empty", () => {
		component = setup({ classes: {}, clusterWorkflows: [] });
		let wrapper = findByTestAttr(component, "no-history");
		expect(wrapper.length).toBe(1);
	});
});
