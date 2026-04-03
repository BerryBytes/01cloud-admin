import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr } from "../../helpers/utils";
import { ClusterStoragePopup } from "./ClusterStoragePopup";
import { ClusterProviders } from "../../constants/clusterconstants";
import { MenuItem } from "@material-ui/core";
import { AppConstants } from "../../constants/appconstants";

configure({ adapter: new Adapter() });

const setup = (props) => {
  const testProps = {
    classes: {},
    editMode: false,
    openPopup: true,
    clusterDetails: {},
    handleClosePopup: jest.fn(),
    providerConfig: {},
    ...props,
  };
  return shallow(<ClusterStoragePopup t={() => ""} {...testProps} />);
};

describe("ClusterStoragePopup component", () => {
  let component = setup();

  it("should render ", () => {
    const wrapper = findByTestAttr(component, "storage-popup");
    expect(wrapper.length).toBe(1);
  });

  it("Should pass open as false if openpopup is false", () => {
    component = setup({
      openPopup: false,
    });
    const wrapper = findByTestAttr(component, "storage-popup");
    expect(wrapper.props().open).toBe(false);
  });

  it("should render dialog title text", () => {
    const wrapper = findByTestAttr(component, "title-text");
    expect(wrapper.length).toBe(1);
  });

  it("Should render close button", () => {
    const wrapper = findByTestAttr(component, "close-button");
    expect(wrapper.length).toBe(1);
  });

  it("close button click simulate", () => {
    const handleClose = jest.fn();
    component = setup({
      handleClosePopup: handleClose,
    });
    const closeButton = findByTestAttr(component, "close-button");
    closeButton.simulate("click");
    expect(handleClose).toHaveBeenCalled();
  });

  it("Should render content container", () => {
    const wrapper = findByTestAttr(component, "content-container");
    expect(wrapper.length).toBe(1);
  });

  it("Should render provider select", () => {
    const wrapper = findByTestAttr(component, "provider-select");
    expect(wrapper.length).toBe(1);
  });

  it("Should render provider select", () => {
    const wrapper = findByTestAttr(component, "provider-select");
    const providers = wrapper.find(MenuItem);
    expect(providers.length).toBe(ClusterProviders.length + 1); 
  });

  it("Should render region select if Provider value is EKS ", () => {
    const provider = findByTestAttr(component, "provider-select");
    let region = findByTestAttr(component, "region-select");
    expect(region.length).toBe(0);
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.EKS } });
    region = findByTestAttr(component, "region-select");
    expect(region.length).toBe(1);
  });

  it("Shouldn't render region select if Provider value is GCP ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.GCP } });
    let region = findByTestAttr(component, "region-select");
    expect(region.length).toBe(0);
  });

  it("Should render access key field if Provider value is EKS ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.EKS } });
    let access_key = findByTestAttr(component, "access-key");
    expect(access_key.length).toBe(1);
  });

  it("Shouldn't render access key field if Provider value is GCP ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.GCP } });
    let access_key = findByTestAttr(component, "access-key");
    expect(access_key.length).toBe(0);
  });

  it("Should render secret key field if Provider value is EKS ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.EKS } });
    let secretKey = findByTestAttr(component, "secret-key");
    expect(secretKey.length).toBe(1);
  });

  it("Shouldn't render secret access key field if Provider value is GCP ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.GCP } });
    let secretKey = findByTestAttr(component, "secret-key");
    expect(secretKey.length).toBe(0);
  });

  it("Shouldn't render project id key field if Provider value is EKS ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.EKS } });
    let pId = findByTestAttr(component, "project-id");
    expect(pId.length).toBe(0);
  });

  it("Should render project id key field if Provider value is GCP ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.GCP } });
    let pId = findByTestAttr(component, "project-id");
    expect(pId.length).toBe(1);
  });

  it("Shouldn't render file field if Provider value is EKS ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.EKS } });
    let fileField = findByTestAttr(component, "file-field");
    expect(fileField.length).toBe(0);
  });

  it("Should render file field if Provider value is GCP ", () => {
    const provider = findByTestAttr(component, "provider-select");
    provider
      .props()
      .onChange({ target: { value: AppConstants.ClusterProvider.GCP } });
    let fileField = findByTestAttr(component, "file-field");
    expect(fileField.length).toBe(1);
  });

  it("Should render submit button ", () => {
    const submit = findByTestAttr(component, "submit-button");
    expect(submit.length).toBe(1);
  });
});
