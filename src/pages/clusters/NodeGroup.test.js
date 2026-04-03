import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";
import { NodeGroup } from "./NodeGroup";

configure({ adapter: new Adapter() });

const setup = (props) => {
  const testProps = {
    classes: {},
    clusterDetails: { cluster: {}, provider: "gcp" },
    ...props,
  };
  return shallow(<NodeGroup t={() => ""} {...testProps} />);
};

describe("NodeGroup Component", () => {
  let component = setup();
  let cd = { cluster: {}, provider: "gcp" };

  describe("Node group select", () => {
    it("should display the select-box to select the node group", () => {
      component = setup({
        clusterDetails: { ...cd, node_group_detail: [{}, {}, {}] },
      });
      const wrapper = findByTestAttr(component, "node-group-select");
      expect(wrapper.length).toBe(1);
    });

    it("should display the correct number of node groups to select", () => {
      const wrapper = findByTestAttr(component, "node-group-list");
      expect(wrapper.length).toBe(3);
    });
  });

  describe("Node group Details Card", () => {
    it("should display correct Node Group Name", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ node_group_name: "ng_name" }],
        },
      });
      const wrapper = findByTestAttr(component, "node-name");
      expect(wrapper.props().rowValue).toBe("ng_name");
    });

    it("should display correct Instance Type", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ instance_type: "type3" }],
        },
      });
      const wrapper = findByTestAttr(component, "node-ins-type");
      expect(wrapper.props().rowValue).toBe("type3");
    });

    it("should display correct Disk Type", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ disk_type: "type4" }],
        },
      });
      const wrapper = findByTestAttr(component, "node-d-type");
      expect(wrapper.props().rowValue).toBe("type4");
    });

    it("should display correct Disk Size", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ disk_size: "102400" }],
        },
      });
      const wrapper = findByTestAttr(component, "node-d-size");
      expect(wrapper.props().rowValue).toBe("102400 GB");
    });

    it("should display Cost Optimization detail", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ preemptible: true }],
        },
      });
      const wrapper = findByTestAttr(component, "node-preem");
      expect(wrapper.length).toBe(1);
    });

    it("should display correct Minimum Node Count", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ min_node_count: 4 }],
        },
      });
      const wrapper = findByTestAttr(component, "node-min");
      expect(wrapper.props().rowValue).toBe(4);
    });

    it("should display correct Maximum Node Count", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ max_node_count: 10 }],
        },
      });
      const wrapper = findByTestAttr(component, "node-max");
      expect(wrapper.props().rowValue).toBe(10);
    });

    it("should display correct Initial Node Count", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ initial_node_count: 5 }],
        },
      });
      const wrapper = findByTestAttr(component, "node-init");
      expect(wrapper.props().rowValue).toBe(5);
    });

    it("should display the 'Label' header if node labels are present", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ node_group_labels: [{}] }],
        },
      });
      const wrapper = findByTestAttr(component, "node-label-header");
      expect(wrapper.length).toBe(1);
    });

    it("should display correct key of label", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ node_group_labels: [{ key: "myKey" }] }],
        },
      });
      const wrapper = findByTestAttr(component, "node-label");
      expect(wrapper.props().rowKey).toBe("myKey");
    });

    it("should display correct value for corresponding key of label", () => {
      component = setup({
        clusterDetails: {
          ...cd,
          node_group_detail: [{ node_group_labels: [{ value: 1234 }] }],
        },
      });
      const wrapper = findByTestAttr(component, "node-label");
      expect(wrapper.props().rowValue).toBe(1234);
    });
  });
});
