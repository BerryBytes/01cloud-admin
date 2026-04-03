import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import CustomizedDialogs from "./CicdLogsPopup";

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {}, t: jest.fn(), openLogPopup: true };
  let comp = shallow(<CustomizedDialogs {...initialProps} {...props} />);
  return comp;
};

describe("Activity Logs Component", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render the build header without fail", () => {
    const wrapper = findByTestAttr(component, "build-header");
    expect(wrapper.length).toBe(1);
  });

  it("should render the build timer without fail", () => {
    const wrapper = findByTestAttr(component, "build-timer");
    expect(wrapper.length).toBe(1);
  });

  it("should not render the log div if no logdata available", () => {
    const wrapper = findByTestAttr(component, "log-div");
    expect(wrapper.length).toBe(0);
  });

  it("should render the log div if any logdata available", () => {
    component = setup({ logData: { logs: [{}] } });
    const wrapper = findByTestAttr(component, "log-div");
    expect(wrapper.length > 0).toBeTruthy();
  });

  it("should render the correct number log divs", () => {
    component = setup({
      logData: {
        logs: [
          {
            Log:
              "2021-05-06T07:24:23.145569514Z WARNING! Using --password via the CLI is insecure. Use --password-stdin.",
            Step: 1,
            Type: "Cloning Repository",
          },
          {
            Log:
              "\n2021-05-06T07:24:56.11581227Z e48f7a526315: Pushed\n2021-05-06T07:24:57.401859493Z 73d1e1b7058e: Pushed\n2021-05-06T07:25:00.651610177Z 6f7737f0957a: Pushed\n2021-05-06T07:25:07.724979955Z 76d631d75b940c65f1aa435f9bbec2f17def83c1: digest: sha256:7d7b36f06d30d102c394ce764c19d172fd09b9f80dcdfe50fbfeaa2c1d02f201 size: 2204",
            Step: 3,
            Type: "Pushing Image",
          },
          {
            Log:
              "\n2021-05-06T07:24:43.350939535Z   Stored in directory: /root/.cache/pip/wheels/25/1e/a8/7ce216cbd6f5156111887f4cc0b9dd01addfa9266600b48b90\n2021-05-06T07:24:43.350946486Z   Building wheel for MarkupSafe (setup.py): started\n2021-05-06T07:24:44.053000586Z   Building wheel for MarkupSafe (setup.py): finished with status 'done'\n2021-05-06T07:24:44.053048984Z   Created wheel for MarkupSafe: filename=MarkupSafe-1.1.1-py3-none-any.whl size=12629 sha256=1c00f6f62604cf56fffa73bb8e68561225e497edf54e5246bf61b0a2b1f13177\n2021-05-06T07:24:44.053058108Z   Stored in directory: /root/.cache/pip/wheels/0c/61/d6/4db4f4c28254856e82305fdb1f752ed7f8482e54c384d8cb0e",
            Step: 2,
            Type: "Building Image",
          },
        ],
      },
    });
    const wrapper = findByTestAttr(component, "log-div");
    expect(wrapper.length).toBe(3);
  });
});
