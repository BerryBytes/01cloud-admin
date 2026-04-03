import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {
  findByTestAttr,
  getDiffBetweenDates,
  getDiffDays,
} from "../../helpers/utils";
import { CICDCard } from "./CicdCard";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = {
    classes: {},
    t: jest.fn(),
    data: {
      ci_request: {
        repository_image: { tag: "2625450f286e0d1fae7eaa5eee9b99e118ca5364" },
        git_url: "",
        commit_message: "added new feature",
        author: "James Smith",
        git_branch: "master",
      },
      workflow: {
        object_meta:{creationTimestamp:"2021-05-03T15:00:50Z"},
        creationTimestamp: { Time: "2021-05-03T15:00:50Z" },
        status: {
          started_at: "2021-05-03T15:00:50Z",
          finished_at: "2021-05-03T15:01:22Z",
          message: "workflow-message"
        },
      },
    },
    index: 0,
    source: "1",
    projectRole: { name: "Admin" },
  };
  let comp = shallow(<CICDCard {...initialProps} {...props} />);
  return comp;
};

describe("Create Environment: Template", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should show correct commit hash for the build", () => {
    const wrapper = findByTestAttr(component, "repo-tag");
    expect(wrapper.text()).toBe(
      "2625450f286e0d1fae7eaa5eee9b99e118ca5364".substring(0, 7)
    );
  });

  it("should show correct author name in the card", () => {
    const wrapper = findByTestAttr(component, "author-name");
    expect(wrapper.text()).toBe("James Smith");
  });

  it("should show correct git branch name in the card", () => {
    const wrapper = findByTestAttr(component, "branch-name");
    expect(wrapper.text()).toBe("master");
  });

  it("should show correct creation date difference in the card", () => {
    const wrapper = findByTestAttr(component, "time-diff");
    expect(wrapper.text()).toBe(getDiffDays("2021-05-03T15:00:50Z", true));
  });

  it("should show correct build running time in the card", () => {
    const wrapper = findByTestAttr(component, "started-time");
    expect(wrapper.text()).toBe(
      getDiffBetweenDates("2021-05-03T15:00:50Z", "2021-05-03T15:01:22Z")
    );
  });

  it("should not render the Re-Run button if build status isn't 'Failed'", () => {
    const reBtn = findByTestAttr(component, "rerun-btn");
    expect(reBtn.length).toBe(0);
  });

  it("shouldn't render the Stop button if build status is not 'running' or 'pending", () => {
    const stopBtn = findByTestAttr(component, "stop-btn");
    expect(stopBtn.length).toBe(0);
  });

  it("should render Re-Run button if status is 'Failed'", () => {
    component = setup({
      data: {
        workflow: {
          status: { phase: "Failed", started_at: {} },
          creationTimestamp: {},
        },
        ci_request: {},
      },
    });
    const stopBtn = findByTestAttr(component, "rerun-btn");
    expect(stopBtn.length).toBe(1);
  });
  
  it("shouldn render the Stop button if build status is 'running' or 'pending", () => {
    component = setup({
      data: {
        workflow: {
          status: { phase: "Pending", started_at: {} },
          creationTimestamp: {},
        },
        ci_request: {},
      },
    });
    const stopBtn = findByTestAttr(component, "stop-btn");
    expect(stopBtn.length).toBe(1);
  });
  
  it("should render expand icon without fail", () => {
    const wrapper = findByTestAttr(component, "expand-icon");
    expect(wrapper.length).toBe(1);
  })
  
  it("should render the skeletons instead of step components if no logdata available", () => {
    component = setup({logData: null})
    const wrapper = findByTestAttr(component, "cicd-skel");
    expect(wrapper.length >= 1).toBeTruthy()
  })
  
  it("should show no-workflow message if logdata is empty", () => {
    component = setup({logData: {Logs: []}})
    const wrapper = findByTestAttr(component, "no-workflow-msg");
    expect(wrapper.length).toBe(1)
  })

  it("should show correct number of step components", () => {
    component = setup({
      data: {
        workflow: {
          status: { phase: "Pending", started_at: {} },
          creationTimestamp: {},
        },
        ci_request: {},
        log_steps: [
          { type: "Cloning Repository", step: 1 },
          { type: "Building Image", step: 2 },
          { type: "Pushing Image", step: 3 },
        ],
      },
      logData: { logs: [{}] },
    });
    const wrapper = findByTestAttr(component, "step-comp");
    expect(wrapper.length).toBe(3)

  })
});
