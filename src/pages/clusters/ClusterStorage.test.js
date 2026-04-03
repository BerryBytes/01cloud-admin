import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";
import { ClusterStorage } from "./ClusterStorage";
import { CardHeader, Collapse } from "@material-ui/core";
import ClusterStoragePopup from "../../components/clusterstoragepopup/ClusterStoragePopup";

configure({ adapter: new Adapter() });

const setup = (props) => {
  const testProps = {
    classes: {},
    settingClusterStorage: false,
    packagesInstalled: false,
    destroyed: false,
    clusterDetails: {},
    ...props,
  };
  return shallow(<ClusterStorage t={() => ""} {...testProps} />);
};

let clusterDetails = {
  cluster: {
    cloud_storage: {
      provider: "gcp",
    },
  },
};

describe("ClusterStorage component", () => {
  let component = setup();

  it("should render card-commponent", () => {
    const wrapper = findByTestAttr(component, "card-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render card-header", () => {
    const wrapper = findByTestAttr(component, "card-header");
    const header = component.find(CardHeader);
    expect(wrapper.length).toBe(1);
    expect(header.length).toBe(1);
  });

  describe("Card Avatar", () => {
    it("should render card-avatar", () => {
      const header = component.find(CardHeader);
      const avatar = header.props().avatar;
      expect(avatar).toBeTruthy();
    });

    it("should have Icon Button in avatar", () => {
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      expect(iconButton.length).toBe(1);
    });

    it("simulate click of icon button should pass correct props to Collapse", () => {
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      let collapse = component.find(Collapse);
      expect(collapse.props().in).toBe(false);
      iconButton.simulate("click");
      collapse = component.find(Collapse);
      expect(collapse.props().in).toBe(true);
    });
  });

  describe("Card Title", () => {
    it("should render card-title", () => {
      const header = component.find(CardHeader);
      const title = header.props().title;
      expect(title).toBeTruthy();
    });

    it("should have title text", () => {
      const header = component.find(CardHeader);
      const title = shallow(header.props().title);
      const titleText = findByTestAttr(title, "title-text");
      expect(titleText.length).toBe(1);
    });

    it("shouldn't render green check icon if no cloud_storage", () => {
      const header = component.find(CardHeader);
      const title = shallow(header.props().title);
      const checkIcon = findByTestAttr(title, "checked-icon");
      expect(checkIcon.props().style?.opacity).toBe("0");
    });

    it("should render green check icon if cloud_storage", () => {
      component = setup({
        clusterDetails: clusterDetails,
      });
      const header = component.find(CardHeader);
      const title = shallow(header.props().title);
      const checkIcon = findByTestAttr(title, "checked-icon");
      expect(checkIcon.length).toBe(1);
    });
  });

  describe("Card Action", () => {
    it("should render empty action if cluster destroyed or no cloud_storage", () => {
      const header = component.find(CardHeader);
      expect(header.props().action).toBeFalsy;
    });

    it("shouldn't render empty action if cluser not destroyed and there is cloud_storage", () => {
      component = setup({
        clusterDetails: clusterDetails,
        destroyed: false,
      });
      const header = component.find(CardHeader);
      expect(header.props().action).toBeTruthy;
    });

    it("shouldn't render edit action if card not expanded", () => {
      component = setup({
        clusterDetails: clusterDetails,
        destroyed: false,
      });
      const header = component.find(CardHeader);
      expect(header.props().action).toBeFalsy;
    });

    it("should render edit button if cluser not destroyed and there is cloud_storage and card expanded", () => {
      component = setup({
        clusterDetails: clusterDetails,
        destroyed: false,
      });
      let header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      header = component.find(CardHeader);
      const action = shallow(header.props().action);
      const editButton = findByTestAttr(action, "edit-button");
      expect(editButton.length).toBe(1);
    });

    it("simulate edit button", () => {
      component = setup({
        clusterDetails: clusterDetails,
        destroyed: false,
      });
      let header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      header = component.find(CardHeader);
      const action = shallow(header.props().action);
      const editButton = findByTestAttr(action, "edit-button");
      let clusterPopup = component.find(ClusterStoragePopup);
      expect(clusterPopup.length).toBe(0);
      editButton.simulate("click");
      clusterPopup = component.find(ClusterStoragePopup);
      expect(clusterPopup.length).toBe(1);
      expect(clusterPopup.props().editMode).toBe(true);
    });
  });

  describe("Card Content", () => {
    it("should render add storage container if no cloud_storage", () => {
      component = setup();
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const addStorage = findByTestAttr(component, "add-storage-container");
      expect(addStorage.length).toBe(1);
    });

    it("should render no-storage text if no cloud_storage", () => {
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const noStorageText = findByTestAttr(component, "no-storage-text");
      expect(noStorageText.length).toBe(1);
    });

    it("should render setupstorage button if no cloud_storage", () => {
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const setupButton = findByTestAttr(component, "setup-storage-button");
      expect(setupButton.length).toBe(1);
    });

    it("simulate setup storage button", () => {
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const setupButton = findByTestAttr(component, "setup-storage-button");
      let clusterPopup = component.find(ClusterStoragePopup);
      expect(clusterPopup.length).toBe(0);
      setupButton.simulate("click");
      clusterPopup = component.find(ClusterStoragePopup);
      expect(clusterPopup.length).toBe(1);
      expect(clusterPopup.props().editMode).toBe(false);
    });

    it("shouldn't render storage detail container if no cloud_storage", () => {
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const storageDetails = findByTestAttr(
        component,
        "storage-detail-container"
      );
      expect(storageDetails.length).toBe(0);
    });

    it("shouldn't render add storage container if cloud_storage", () => {
      component = setup({
        clusterDetails: clusterDetails,
      });
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const addStorage = findByTestAttr(component, "add-storage-container");
      expect(addStorage.length).toBe(0);
    });

    it("should render storage detail container if cloud_storage", () => {
      component = setup({
        clusterDetails: clusterDetails,
      });
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const storageDetails = findByTestAttr(
        component,
        "storage-detail-container"
      );
      expect(storageDetails.length).toBe(1);
    });

    it("should show provider info if cloud_storage is setup", () => {
      component = setup({
        clusterDetails: clusterDetails,
      });
      const header = component.find(CardHeader);
      const avatar = shallow(header.props().avatar);
      const iconButton = findByTestAttr(avatar, "icon-button");
      iconButton.simulate("click");
      const providerInfo = findByTestAttr(component, "provider-info");
      expect(providerInfo.length).toBe(1);
    });
  });
});
