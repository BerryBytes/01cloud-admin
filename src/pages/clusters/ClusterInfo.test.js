import React from "react";
import { ClusterInfo } from "./ClusterInfo";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr, getDateInStandardFormat } from "../../helpers/utils";
import NodeGroup  from "./NodeGroup";
import ClusterPackage from "./clusterpackage";

configure({ adapter: new Adapter() });

const setup = () => {
	const testProps = {
		classes: {},
		clusterDetails: { cluster: {}, provider: "gcp" },
	};
	return shallow(<ClusterInfo t={() => ""} {...testProps} />);
};

describe("ClusterInfo component", () => {
	const component = setup();
	let cd = { cluster: {}, provider: "gcp" };

	it("should render the main component without error", () => {
		const wrapper = findByTestAttr(component, "main-container");
		expect(wrapper.length).toBe(1);
	});

	describe("Cluster Info Card", () => {
		it("should render the cluster info card", () => {
			const wrapper = findByTestAttr(component, "cluster-info");
			expect(wrapper.length).toBe(1);
		});

		it("should display correct cluster version", () => {
			component.setProps({
				clusterDetails: { ...cd, cluster_version: 32 },
			});
			const wrapper = findByTestAttr(component, "cluster-version");
			expect(wrapper.props().rowValue).toBe(32);
		});

		it("should display correct cluster region", () => {
			component.setProps({
				clusterDetails: { ...cd, region: "region1" },
			});
			const wrapper = findByTestAttr(component, "cluster-region");
			expect(wrapper.props().rowValue).toBe("region1");
		});

		it("should display correct cluster provider", () => {
			const wrapper = findByTestAttr(component, "cluster-provider");
			expect(wrapper.props().rowValue).toBe("gcp");
		});

		it("should display correct cluster creation date", () => {
			component.setProps({
				clusterDetails: {
					...cd,
					createdat: "2020-11-08T12:27:35.422126Z",
				},
			});
			const wrapper = findByTestAttr(component, "cluster-created");
			expect(wrapper.props().rowValue).toBe(
				getDateInStandardFormat("2020-11-08T12:27:35.422126Z")
			);
		});
	});

	describe("Project Info Card", () => {
		it("should render the project info card", () => {
			const wrapper = findByTestAttr(component, "project-info");
			expect(wrapper.length).toBe(1);
		});

		it("should display correct project ID", () => {
			component.setProps({ clusterDetails: { ...cd, project_id: 1003 } });
			const wrapper = findByTestAttr(component, "project-id");
			expect(wrapper.props().rowValue).toBe(1003);
		});

		it("should display correct VPC", () => {
			component.setProps({ clusterDetails: { ...cd, vpc_name: "vpc1" } });
			const wrapper = findByTestAttr(component, "project-vpc");
			expect(wrapper.props().rowValue).toBe("vpc1");
		});

		it("should display correct VPC CIDR", () => {
			component.setProps({
				clusterDetails: { ...cd, network_cidr: "net0" },
			});
			const wrapper = findByTestAttr(component, "project-cidr");
			expect(wrapper.props().rowValue).toBe("net0");
		});

		it("should display correct Subnet CIDR", () => {
			component.setProps({
				clusterDetails: { ...cd, subnet_cidr_range: "0.0.0.0" },
			});
			const wrapper = findByTestAttr(component, "project-subnet");
			expect(wrapper.props().rowValue).toBe("0.0.0.0");
		});

		it("should display correct PVC Write Many option", () => {
			component.setProps({
				clusterDetails: { ...cd, pvc_write_many: false },
			});
			const wrapper = findByTestAttr(component, "project-pvc");
			expect(wrapper.props().rowValue).toBe("false");
		});

		it("should display correct Zone", () => {
			component.setProps({ clusterDetails: { ...cd, zone: ["zone1"] } });
			const wrapper = findByTestAttr(component, "project-zone");
			expect(wrapper.props().rowValue).toBe("zone1");
		});
		
	});

	describe("Imported Cluster Info Card", () => {
		it("should not render the imported info card if cluster is not imported", () => {
			const wrapper = findByTestAttr(component, "cluster-imported");
			expect(wrapper.length).toBe(0);
		});

		it("should render the imported info card if cluster is imported", () => {
			component.setProps({ clusterDetails: { ...cd, type: "imported" } });
			const wrapper = findByTestAttr(component, "cluster-imported");
			expect(wrapper.length).toBe(1);
		});

		it("should display correct cluster zone", () => {
			component.setProps({
				clusterDetails: { ...cd, type: "imported", zone: "zone1" },
			});
			const wrapper = findByTestAttr(component, "imported-zone");
			expect(wrapper.props().rowValue).toBe("zone1");
		});

		it("should display correct Argo CD URL", () => {
			component.setProps({
				clusterDetails: {
					...cd,
					type: "imported",
					cluster: { ArgoServerUrl: "url1" },
				},
			});
			const wrapper = findByTestAttr(component, "imported-argo");
			expect(wrapper.props().rowValue).toBe("url1");
		});

		it("should display correct Prometheus URL", () => {
			component.setProps({
				clusterDetails: {
					...cd,
					type: "imported",
					cluster: { PrometheusServerUrl: "url1" },
				},
			});
			const wrapper = findByTestAttr(component, "imported-url");
			expect(wrapper.props().rowValue).toBe("url1");
		});
		
	});

	it("shouldn't render NodeGroup component if cluster is imported", () => {
		component.setProps({
			clusterDetails: {
				...cd,
				cluster: {
					dns_id: 1,
					image_registry_id: 1,
					
				},
				type: "imported",
			},
		});
		const nodeGroup = component.find(NodeGroup)
		expect(nodeGroup.length).toBe(0)
	})

	it("should render NodeGroup component if cluster is not imported", () => {
		component.setProps({
			clusterDetails: {
				...cd,
				cluster: {
					dns_id: 1,
					image_registry_id: 1,
					
				},
				type: "",
			},
		});
		const nodeGroup = component.find(NodeGroup)
		expect(nodeGroup.length).toBe(1)
	})

	it("should display the DNS setup card if cluster's dns id < 0", () => {
		component.setProps({ clusterDetails: { cluster: { dns_id: -1 } } });
		const wrapper = findByTestAttr(component, "cluster-dns");
		expect(wrapper.length).toBe(1);
	});

	it("should display the Package installation component for imported cluster ", () => {
		component.setProps({
			clusterDetails: {
				...cd,
				cluster: {
					dns_id: 1,
					image_registry_id: 1,
					
				},
				type: "imported",
			},
		});
		const wrapper = component.find(ClusterPackage)
		expect(wrapper.length).toBe(1);
	});
});
