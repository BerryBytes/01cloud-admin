import React from "react";
import Reply, {
  ReplyTicket,
  CloseTicket,
  OpenTicket,
  AssignTicket,
  ReplyHeader,
} from "./Reply";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  findByTestAttr,
  getDiffDays,
  getDateInStandardFormat,
} from "../../../helpers/utils";
import { Avatar } from "@material-ui/core";
import MarkdownField from "../../../components/markdown/MarkdownField";
import ImagePopupModal from "../../../components/imagepopupmodal/ImagePopupModal";

configure({ adapter: new Adapter() });

const setUp = (props) => {
  const newprops = {
    convo: {},
    ...props,
  };

  const component = shallow(<Reply classes={{}} t={() => ""} {...newprops} />);

  return component;
};

const setUpReplyHeader = (props) => {
  const newprops = {
    convo: {},
    ...props,
  };

  const component = shallow(
    <ReplyHeader classes={{}} t={() => ""} {...newprops} />
  );

  return component;
};

const convo = {
  id: 28,
  userId: 90,
  userName: "Sanjeev Roka",
  userAvatar:
    "https://api.test.01cloud.dev/uploads/image/jpeg/363d6731-16f0-49c0-b19e-39a6175556ed.jpeg",
  message: "Test Reply",
  date: 1612347536,
  files: [],
  action: "reply",
};

const files = [
  {
    id: 28,
    userId: 90,
    userName: "Sanjeev Roka",
    userAvatar:
      "https://api.test.01cloud.dev/uploads/image/jpeg/363d6731-16f0-49c0-b19e-39a6175556ed.jpeg",
    message: "Test Reply",
    date: 1612347536,
    files: [
      {
        fileType: "image/png",
        fileValue:
          "https://api.test.01cloud.dev/uploads/image/png/8247a15a-6f35-4afa-9d8f-355b1676df76.png",
        fileName: "aws.png",
      },
      {
        fileType: "image/jpeg",
        fileValue:
          "https://api.test.01cloud.dev/uploads/image/jpeg/218ca3f4-7027-472c-850f-1df661b2afb3.jpg",
        fileName: "Buddha.jpg",
      },
      {
        fileType: "image/jpeg",
        fileValue:
          "https://api.test.01cloud.dev/uploads/image/jpeg/e7082cbb-9046-4893-abe9-8e444a9bc9f5.jpeg",
        fileName: "download.jpeg",
      },
    ],
  },
  {
    id: 29,
    userId: 90,
    userName: "Sanjeev Roka",
    userAvatar:
      "https://api.test.01cloud.dev/uploads/image/jpeg/363d6731-16f0-49c0-b19e-39a6175556ed.jpeg",
    message: "New Reply",
    date: 1612347552,
  },
];

describe("Reply Tab", () => {
  let component;
  beforeEach(() => {
    component = setUp({
      convo: convo,
    });
  });

  it("should render without errors", () => {
    const wrapper = findByTestAttr(component, "reply-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render ReplyTicket Component if convo has action 'reply'", () => {
    component = setUp({
      convo: { ...convo, action: "reply" },
    });
    const wrapper = component.find(ReplyTicket);
    expect(wrapper.length).toBe(1);
  });

  it("should render OpenTicket Component if convo has action 're-opened'", () => {
    component = setUp({
      convo: { ...convo, action: "re-opened" },
    });
    const wrapper = component.find(OpenTicket);
    expect(wrapper.length).toBe(1);
  });

  it("should render CloseTicket Component if convo has action 'closed'", () => {
    component = setUp({
      convo: { ...convo, action: "closed" },
    });
    const wrapper = component.find(CloseTicket);
    expect(wrapper.length).toBe(1);
  });

  it("should render AssignTicket Component if convo has action 'assigned'", () => {
    component = setUp({
      convo: { ...convo, action: "assigned" },
    });
    const wrapper = component.find(AssignTicket);
    expect(wrapper.length).toBe(1);
  });

  describe("ReplyHeader Test", () => {
    component;
    let props = {
      convo: convo,
    };
    beforeEach(() => {
      component = setUpReplyHeader(props);
    });

    it("should render Avatar with src as userAvatar if any", () => {
      const wrapper = component.find(Avatar);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().src).toBe(convo.userAvatar);
    });

    it("should render Avatar with static source if no userAvatar", () => {
      component = setUpReplyHeader({
        convo: { ...convo, userAvatar: null },
      });
      const wrapper = component.find(Avatar);
      expect(wrapper.length).toBeGreaterThanOrEqual(1);
      expect(wrapper.props().src).toBe("./Images/profile_image.png");
    });

    it("should render message as passed in the props", () => {
      props = {
        convo: { ...convo },
        message: "test-message",
      };
      component = setUpReplyHeader(props);
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBeGreaterThanOrEqual(1);
      expect(wrapper.text()).toBe(
        `${props.convo.userName} ${props.message} on \xa0`
      );
    });

    it("should render correct date as passed in the props", () => {
      props = {
        convo: { ...convo },
        message: "test-message",
      };
      component = setUpReplyHeader(props);
      const wrapper = findByTestAttr(component, "date-container");
      expect(wrapper.length).toBeGreaterThanOrEqual(1);
      expect(wrapper.text()).toBe(
        ` ${getDateInStandardFormat(convo.date * 1000)} (${getDiffDays(
          convo.date * 1000,
          true
        )})`
      );
    });
  });

  describe("OpenTicket Test", () => {
    component;
    let props;
    beforeEach(() => {
      props = {
        convo: { ...convo, action: "re-opened" },
      };
      component = shallow(<OpenTicket classes={{}} t={() => ""} {...props} />);
    });

    it("Should render ReplyHeader component with correct message", () => {
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
    });

    it("Should render ReplyHeader with otherAction prop true if no message", () => {
      props = { convo: { ...convo, message: null } };
      component = shallow(<OpenTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().otherAction).toBe(true);
    });

    it("Should render ReplyHeader with otherAction prop false if message", () => {
      component = shallow(<OpenTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().otherAction).toBe(false);
    });

    it("should render reply message in a MarkdownField in readonly mode if any message", () => {
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBe(1);
      const md = wrapper.find(MarkdownField);
      expect(md.length).toBe(1);
      expect(md.props().value).toBe(convo.message);
      expect(md.props().readOnly).toBe(true);
    });

    it("shouldn't render message container if no message", () => {
      props = { convo: { ...convo, message: null } };
      component = shallow(<OpenTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBe(0);
    });

    it("should render attachmnts in ImagePopupModel if conversation has files", () => {
      props = { convo: { ...convo, files: files } };
      component = shallow(<OpenTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = findByTestAttr(component, "attachment-container");
      expect(wrapper.length).toBe(1);
      const imgPopup = wrapper.find(ImagePopupModal);
      expect(imgPopup.length).toBe(1);
      expect(imgPopup.props().images).toBe(files);
      expect(imgPopup.props().readOnly).toBe(true);
    });

    it("shouldn't render attachment-container if empty files", () => {
      const wrapper = findByTestAttr(component, "attachment-container");
      expect(wrapper.length).toBe(0);
    });
  });

  describe("CloseTicket Test", () => {
    component;
    let props;
    beforeEach(() => {
      props = {
        convo: { ...convo, action: "closed" },
      };
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
    });

    it("Should render  ReplyHeader component with correct message", () => {
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
    });

    it("Should render ReplyHeader with otherAction prop true if no message", () => {
      props = { convo: { ...convo, message: null } };
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().otherAction).toBe(true);
    });

    it("Should render ReplyHeader with otherAction prop false if message", () => {
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().otherAction).toBe(false);
    });

    it("should render reply message in a MarkdownField in readonly mode if any message", () => {
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBe(1);
      const md = wrapper.find(MarkdownField);
      expect(md.length).toBe(1);
      expect(md.props().value).toBe(convo.message);
      expect(md.props().readOnly).toBe(true);
    });

    it("shouldn't render message container if no message", () => {
      props = { convo: { ...convo, message: null } };
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBe(0);
    });

    it("should render attachmnts in ImagePopupModel if conversation has files", () => {
      props = { convo: { ...convo, files: files } };
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = findByTestAttr(component, "attachment-container");
      expect(wrapper.length).toBe(1);
      const imgPopup = wrapper.find(ImagePopupModal);
      expect(imgPopup.length).toBe(1);
      expect(imgPopup.props().images).toBe(files);
      expect(imgPopup.props().readOnly).toBe(true);
    });

    it("shouldn't render attachment-container if empty files", () => {
      const wrapper = findByTestAttr(component, "attachment-container");
      expect(wrapper.length).toBe(0);
    });
  });

  describe("ReplyTicket Test", () => {
    component;
    let props;
    beforeEach(() => {
      props = {
        convo: { ...convo },
      };
      component = shallow(<ReplyTicket classes={{}} t={() => ""} {...props} />);
    });

    it("Should render  ReplyHeader component with correct message", () => {
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
    });

    it("Should render ReplyHeader with otherAction prop false", () => {
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().otherAction).toBe(false);
    });

    it("should render reply message in a MarkdownField in readonly mode if any message", () => {
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBe(1);
      const md = wrapper.find(MarkdownField);
      expect(md.length).toBe(1);
      expect(md.props().value).toBe(convo.message);
      expect(md.props().readOnly).toBe(true);
    });

    it("shouldn't render message container if no message", () => {
      props = { convo: { ...convo, message: null } };
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = findByTestAttr(component, "message-container");
      expect(wrapper.length).toBe(0);
    });

    it("should render attachmnts in ImagePopupModel if conversation has files", () => {
      props = { convo: { ...convo, files: files } };
      component = shallow(<CloseTicket classes={{}} t={() => ""} {...props} />);
      const wrapper = findByTestAttr(component, "attachment-container");
      expect(wrapper.length).toBe(1);
      const imgPopup = wrapper.find(ImagePopupModal);
      expect(imgPopup.length).toBe(1);
      expect(imgPopup.props().images).toBe(files);
      expect(imgPopup.props().readOnly).toBe(true);
    });

    it("shouldn't render attachment-container if empty files", () => {
      const wrapper = findByTestAttr(component, "attachment-container");
      expect(wrapper.length).toBe(0);
    });
  });

  describe("AssignTicket Test", () => {
    component;
    let props;
    beforeEach(() => {
      props = {
        convo: { ...convo },
      };
      component = shallow(
        <AssignTicket classes={{}} t={() => ""} {...props} />
      );
    });

    it("Should render  ReplyHeader component with correct message", () => {
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().message).toBe("Ticket " + props.convo.message);
    });
    it("Should render  ReplyHeader component with otherAction props as true", () => {
      const wrapper = component.find(ReplyHeader);
      expect(wrapper.length).toBe(1);
      expect(wrapper.props().otherAction).toBe(true);
    });
  });
});
