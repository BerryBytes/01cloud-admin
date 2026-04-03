import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { SubscriptionForm } from "./SubscriptionForm";
import { findByTestAttr } from "../../helpers/utils";
import { Formik } from "formik";

configure({ adapter: new Adapter() });

const subscriptionAction = jest.fn();

const setup = (props = {}, state = {}) => {
  const initialProps = {
    classes: {},
    ...props,
  };
  let component = shallow(
    <SubscriptionForm {...initialProps} t={() => ""} history={{}} />
  );
  component.setState({
    showProject: true,
    showEnv: true,
    ...state,
  });
  return component;
};

const subData = {
  ID: 195,
  CreatedAt: "2021-04-16T11:36:33.044919Z",
  UpdatedAt: "2021-04-21T04:56:02.724268Z",
  DeletedAt: null,
  name: "Price 0",
  apps: 2,
  disk_space: 1024,
  memory: 1024,
  cores: 1000,
  data_transfer: 1024,
  price: 0,
  weight: 10,
  attributes: "",
  active: true,
  cron_job: 1,
  backups: 2,
  resource_list: {
    gpu: "0",
    pods: "20",
    secrets: "20",
    services: "10",
    configmaps: "10",
    loadbalancers: "1",
    persistentvolumeclaims: "4",
    replicationcontrollers: "40",
  },
  organization_id: 6,
  load_balancer: 0,
};

const minValues = {
  configmaps: 10,
  persistentvolumeclaims: 4,
  pods: 20,
  replicationcontrollers: 40,
  secrets: 20,
  services: 10,
  loadbalancers: 1,
  gpu: 0,
};

describe("Testing of Subscription Form", () => {
  let component;
  let formik;
  beforeEach(() => {
    component = setup({
      subscriptionAction,
    });
    component.instance().minValues = minValues;
    formik = component.find(Formik);
  });

  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render Formik", () => {
    expect(formik.length).toBe(1);
  });

  describe("Edit as false", () => {
    let wrapper;
    beforeEach(() => {
      component = setup({
        edit: false,
      });
      wrapper = component.find(Formik);
    });

    it("should pass empty string to subscription name as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.subscriptionName;
      expect(field).toBe("");
    });

    it("should pass empty string to memory as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.memory;
      expect(field).toBe("");
    });

    it("should pass empty string to diskSpace as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.diskSpace;
      expect(field).toBe("");
    });

    it("should pass empty string to apps as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.apps;
      expect(field).toBe("");
    });

    it("should pass empty string to dataTransfer as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.dataTransfer;
      expect(field).toBe("");
    });

    it("should pass empty string to backups as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.backups;
      expect(field).toBe(5);
    });

    it("should pass empty string to cores as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.cores;
      expect(field).toBe("");
    });

    it("should pass false to active as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.active;
      expect(field).toBe(true);
    });

    it("should pass correct values to resource_list as initialValues in Formik", () => {
      const resource_list = {
        configmaps: minValues.configmaps,
        persistentvolumeclaims: minValues.persistentvolumeclaims,
        pods: minValues.pods,
        replicationcontrollers: minValues.replicationcontrollers,
        secrets: minValues.secrets,
        services: minValues.services,
        loadbalancers: minValues.loadbalancers,
        gpu: minValues.gpu,
      };
      const field = wrapper.props().initialValues?.resource_list;
      expect(JSON.stringify(field)).toBe(JSON.stringify(resource_list));
    });
  });

  describe("Edit as true", () => {
    let wrapper;
    beforeEach(() => {
      component = setup({
        edit: true,
        subData,
      });
      wrapper = component.find(Formik);
    });

    it("should pass correct value to subscription name as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.subscriptionName;
      expect(field).toBe(subData.name);
    });

    it("should pass correct value to memory as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.memory;
      expect(field).toBe(subData.memory);
    });

    it("should pass correct value to diskSpace as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.diskSpace;
      expect(field).toBe(subData.disk_space);
    });

    it("should pass correct value to apps as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.apps;
      expect(field).toBe(subData.apps);
    });

    it("should pass correct value to dataTransfer as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.dataTransfer;
      expect(field).toBe(subData.data_transfer);
    });

    it("should pass correct value to backups as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.backups;
      expect(field).toBe(subData.backups);
    });

    it("should pass correct value to cores as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.cores;
      expect(field).toBe(subData.cores);
    });

    it("should pass correct value to active as initialValues in Formik ", () => {
      const field = wrapper.props().initialValues?.active;
      expect(field).toBe(subData.active);
    });

    it("should pass correct values to resource_list as initialValues in Formik", () => {
      const resource_list = {
        configmaps: subData.resource_list.configmaps,
        persistentvolumeclaims: subData.resource_list.persistentvolumeclaims,
        pods: subData.resource_list.pods,
        replicationcontrollers: subData.resource_list.replicationcontrollers,
        secrets: subData.resource_list.secrets,
        services: subData.resource_list.services,
        loadbalancers: subData.resource_list.loadbalancers,
        gpu: subData.resource_list.gpu,
      };
      const field = wrapper.props().initialValues?.resource_list;
      expect(JSON.stringify(field)).toBe(JSON.stringify(resource_list));
    });
  });

  it("Formik on submit event submit value call", () => {
    const submitValues = jest.fn();
    component.instance().submitValues = submitValues;
    formik.props().onSubmit({});
    expect(submitValues).toHaveBeenCalled();
    
  });

  it("Formik on submit event props action call", () => {
    formik.props().onSubmit({});
    expect(subscriptionAction).toHaveBeenCalled();
  });

  it("should render name-field", () => {
    const field = findByTestAttr(formik.dive(), "name-field");
    expect(field.length).toBe(1);
  });

  it("should render project-field expand button", () => {
    const field = findByTestAttr(formik.dive(), "show-project-button");
    expect(field.length).toBe(1);
  });

  it("should render env-field expand button", () => {
    const field = findByTestAttr(formik.dive(), "show-env-button");
    expect(field.length).toBe(1);
  });

  it("should set showProject false if intitally true when show project button clicked", () => {
    component.setState({
      showProject: true,
      showEnv: true,
    });
    const field = findByTestAttr(formik.dive(), "show-project-button");
    field.props().onClick();
    expect(component.state().showProject).toBe(false);
  });

  it("should set showEnv false if intitally true when show env button clicked", () => {
    component.setState({
      showProject: true,
      showEnv: true,
    });
    const field = findByTestAttr(formik.dive(), "show-env-button");
    field.props().onClick();
    expect(component.state().showEnv).toBe(false);
  });

  it("should set showEnv false if intitally true when show project button clicked", () => {
    component.setState({
      showProject: true,
      showEnv: true,
    });
    const field = findByTestAttr(formik.dive(), "show-project-button");
    field.props().onClick();
    expect(component.state().showEnv).toBe(true);
  });

  it("should set showProject false if intitally true when show env button clicked", () => {
    component.setState({
      showProject: false,
      showEnv: false,
    });
    const field = findByTestAttr(formik.dive(), "show-env-button");
    field.props().onClick();
    expect(component.state().showProject).toBe(false);
  });

  it("should pass 'in' prop to project Collapse as showProject", () => {
    const wrapper = findByTestAttr(formik.dive(), "project-collapse");
    expect(wrapper.length).toBe(1);
    expect(wrapper.props().in).toBe(component.state().showProject);
  });

  it("should pass 'in' prop to env Collapse as showEnv", () => {
    const wrapper = findByTestAttr(formik.dive(), "env-collapse");
    expect(wrapper.length).toBe(1);
    expect(wrapper.props().in).toBe(component.state().showEnv);
  });

  describe("show project true", () => {
    beforeEach(() => {
      component = setup();
      component.setState({
        showProject: true,
      });
      formik = component.find(Formik);
    });

    it("should render diskspace field", () => {
      const wrapper = findByTestAttr(formik.dive(), "diskspace-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render cores field", () => {
      const wrapper = findByTestAttr(formik.dive(), "cores-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render memory field", () => {
      const wrapper = findByTestAttr(formik.dive(), "memory-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render data transfer field", () => {
      const wrapper = findByTestAttr(formik.dive(), "dataTransfer-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render apps field", () => {
      const wrapper = findByTestAttr(formik.dive(), "apps-field");
      expect(wrapper.length).toBe(1);
    });
  });

  describe("show env true", () => {
    beforeEach(() => {
      component = setup();
      component.setState({
        showProject: true,
        showEnv: true,
      });
      formik = component.find(Formik);
    });

    it("should render configmaps field", () => {
      const wrapper = findByTestAttr(formik.dive(), "configmaps-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render persistentvolumeclaims field", () => {
      const wrapper = findByTestAttr(formik.dive(), "pv-claim-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render pods field", () => {
      const wrapper = findByTestAttr(formik.dive(), "pods-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render replicationcontrollers field", () => {
      const wrapper = findByTestAttr(formik.dive(), "replication-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render secret field", () => {
      const wrapper = findByTestAttr(formik.dive(), "secrets-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render services field", () => {
      const wrapper = findByTestAttr(formik.dive(), "services-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render lb field", () => {
      const wrapper = findByTestAttr(formik.dive(), "lb-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render gpu field", () => {
      const wrapper = findByTestAttr(formik.dive(), "gpu-field");
      expect(wrapper.length).toBe(1);
    });

    it("should render backups field", () => {
      const wrapper = findByTestAttr(formik.dive(), "backup-field");
      expect(wrapper.length).toBe(1);
    });
  });

  it("should render active field", () => {
    const wrapper = findByTestAttr(formik.dive(), "active-field");
    expect(wrapper.length).toBe(1);
  });

  it("should render submit button", () => {
    const wrapper = findByTestAttr(formik.dive(), "submit-button");
    expect(wrapper.length).toBe(1);
  });
});
