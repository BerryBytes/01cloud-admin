import React from "react";
import { ClusterList } from "./ClusterList";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";

configure({ adapter: new Adapter() });

const setup = () => {
	const testProps = {
		classes: {},
		getClusterList: jest.fn(),
		clusterList: [],
	};
	return shallow(<ClusterList t={() => ""} {...testProps} />);
};

describe("ClusterList component", () => {
	const component = setup();

	it("should render the main component without error", () => {
		const wrapper = findByTestAttr(component, "main-container");
		expect(wrapper.length).toBe(1);
	});

	it("should display 'Clusters' header without error", () => {
		const wrapper = findByTestAttr(component, "clusters-title");
		expect(wrapper.length).toBe(1);
	});

	it("should display the 'IMPORT' button", () => {
		const wrapper = findByTestAttr(component, "import-btn");
		expect(wrapper.length).toBe(1);
	});

	it("simulating click event for 'IMPORT' button", () => {
		const mockCall = jest.fn();
		component.instance().handleImportCluster = mockCall();
		const wrapper = findByTestAttr(component, "import-btn");
		wrapper.simulate("click");
		expect(mockCall).toHaveBeenCalled();
	});

	it("should display the 'CREATE' button", () => {
		const wrapper = findByTestAttr(component, "create-btn");
		expect(wrapper.length).toBe(1);
	});

	it("should not display the 'Active' button if cluster list is empty", () => {
		const wrapper = findByTestAttr(component, "active-btn");
		expect(wrapper.length).toBe(0);
	});

	it("should not display the 'Destroy' button if cluster list is empty", () => {
		const wrapper = findByTestAttr(component, "destroyed-btn");
		expect(wrapper.length).toBe(0);
	});

	it("should display the no-cluster grid if no clusters are present", () => {
		const wrapper = findByTestAttr(component, "no-cluster-grid");
		expect(wrapper.length).toBe(1);
	});

	it("should display the 'Active' button if cluster list not empty", () => {
		component.setProps({ clusterList: [{}] });
		const wrapper = findByTestAttr(component, "active-btn");
		expect(wrapper.length).toBe(1);
	});

	it("should display the 'Destroy' button if cluster list not empty", () => {
		const wrapper = findByTestAttr(component, "destroyed-btn");
		expect(wrapper.length).toBe(1);
	});

	it("'Active' button should be selected if currentView == 1", () => {
		component.setState({ currentView: 1 });
		const wrapper = findByTestAttr(component, "active-btn");
		expect(wrapper.props().variant).toBe("default");
	});

	it("'Destroyed' button should be selected if currentView == 2", () => {
		component.setState({ currentView: 2 });
		const wrapper = findByTestAttr(component, "destroyed-btn");
		expect(wrapper.props().variant).toBe("default");
	});

	it("should destroy the cluster card correctly", () => {
		component.setProps({
			clusterList: [{ status: "destroyed" }, { status: "destroyed" }],
		});
		const wrapper = findByTestAttr(component, "cluster-card");
		expect(wrapper.length).toBe(2);
	});

	it("should only display active clusters when 'Active' selected", () => {
		component.setState({ currentView: 1 });
		component.setProps({
			clusterList: [
				{ status: "active" },
				{ status: "active" },
				{ status: "destroyed" },
				{ status: "destroyed" },
				{ status: "destroyed" },
			],
		});
		const wrapper = findByTestAttr(component, "cluster-card");
		expect(wrapper.length).toBe(2);
	});

	it("should only display destroyed clusters when 'Destroyed' selected", () => {
		component.setState({ currentView: 2 });
		component.setProps({
			clusterList: [
				{ status: "active" },
				{ status: "active" },
				{ status: "destroyed" },
				{ status: "destroyed" },
				{ status: "destroyed" },
			],
		});
		const wrapper = findByTestAttr(component, "cluster-card");
		expect(wrapper.length).toBe(3);
	});

	describe("Cluster Card", () => {
		it("should display correct cluster provider", () => {
			component.setState({ currentView: 1 });
			component.setProps({
				clusterList: [{ status: "active", provider: "gcp" }],
			});
			const wrapper = findByTestAttr(component, "cluster-provider");
			expect(wrapper.text()).toBe("gcp");
		});

		it("should display correct cluster name", () => {
			component.setProps({
				clusterList: [
					{ status: "active", cluster_name: "test_cluster" },
				],
			});
			const wrapper = findByTestAttr(component, "cluster-name");
			expect(wrapper.text()).toBe(" test_cluster");
		});

		it("should display correct cluster version", () => {
			component.setProps({
				clusterList: [
					{ status: "active", cluster_version: "1.17.12-gke.1501" },
				],
			});
			const wrapper = findByTestAttr(component, "cluster-version");
			expect(wrapper.text()).toBe("1.17.12-gke.1501");
		});

		it("should display correct cluster creation date", () => {
			component.setProps({
				clusterList: [
					{
						status: "active",
						CreatedAt: "2021-01-27T09:23:26.410996Z",
					},
				],
			});
			const wrapper = findByTestAttr(component, "cluster-created");
			expect(wrapper.length).toBe(1);
		});

		it("should display correct cluster region", () => {
			component.setProps({
				clusterList: [{ status: "active", region: "Mumbai" }],
			});
			const wrapper = findByTestAttr(component, "cluster-region");
			expect(wrapper.text()).toBe("Mumbai");
		});

		it("should display the cluster menu", () => {
			const wrapper = findByTestAttr(component, "cluster-menu");
			expect(wrapper.length).toBe(1);
		});
	});
});
