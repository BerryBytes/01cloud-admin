import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { findByTestAttr } from "../../../helpers/utils";
import MarkdownField from "../../../components/markdown/MarkdownField";

import { OverviewTab } from './OverViewTab';

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const newProps = {
    ticketDetails: null,
    ticketGroup: null,
    ticket: { id: 68 },
    history: { location: { push: jest.fn() } },
    currentUser: {},
    getTicketDetails: jest.fn(),
    getTicketGroup: jest.fn(),
    assignTickets: jest.fn(),
    assignServiceType: jest.fn(),
    closeTicket: jest.fn(),
    replyTicket: jest.fn(),
    ...props,
  };
  const component = shallow(
    <OverviewTab classes={{}} t={() => ""} {...newProps} />
  );
  return component;
};

const ticketDetails = {
data :{
  ok: true,
  ticketDetails: {
    id: 68,
    title: "My new",
    category: "Engineering",
    priority: "Medium",
    status: "Open",
    date: 1612334134,
    lastResponse: 18446744011573955000,
    isLastResponse: true,
    description: "test Description",
  },
  files: [
    {
      fileType: "image/jpeg",
      fileValue:
        "https://api.test.01cloud.dev/uploads/image/jpeg/7dea065d-3c3e-47b5-bf46-24c12332280c.jpg",
      fileName: "Buddha.jpg",
    },
    {
      fileType: "image/png",
      fileValue:
        "https://api.test.01cloud.dev/uploads/image/png/caa38f09-8c11-49db-a619-51f9839f9006.png",
      fileName: "aws.png",
    },
  ],
  description: "hjhhhj",
  conversation: [
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
  ],
 }
};

describe('OverView Ticket Component', () => {
    let replyTicket = jest.fn();
    let closeTicket = jest.fn();
    let component;
    beforeEach(() => {
      component = setUp({
        ticketDetails,
      });
    });

    it("should render without errors", () => {
        const wrapper = findByTestAttr(component, "overview-container");
        expect(wrapper.length).toBe(1);
    });
    
    it("should render ticket title component", () => {
        const wrapper = findByTestAttr(component, "ticket-title");
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toBe(` ${ticketDetails.data.ticketDetails.title} #${ticketDetails.data.ticketDetails.id} `)
    });

    it("should render description in the markdown and it should be read only", () => {
        const wrapper = findByTestAttr(component, "ticket-description");
        expect(wrapper.length).toBe(1);
        const md = wrapper.find(MarkdownField);
        expect(md.length).toBe(1);
        expect(md.props().value).toBe(ticketDetails.data.ticketDetails.description);
        expect(md.props().readOnly).toBe(true);
      });

      it("should render files container if there is attachments in the tickets", () => {
        const wrapper = findByTestAttr(component, "files-container");
        expect(wrapper.length).toBe(1);
      });

      it("shouldn't render files container if there is attachments in the tickets", () => {
        component = setUp({
          ticketDetails: {data: { ...ticketDetails.data, files: []} },
        });
        const wrapper = findByTestAttr(component, "files-container");
        expect(wrapper.length).toBe(0);
      });

      it("should render conversation-container if the length of conversation is not 0", () => {
        const wrapper = findByTestAttr(component, "conversation-container");
        expect(wrapper.length).toBe(1);
      });

      it("shouldn't render conversation-container if the length of conversation is 0", () => {
        component = setUp({
            ticketDetails: {data: { ...ticketDetails.data, conversation: []} },
        });
        const wrapper = findByTestAttr(component, "conversation-container");
        expect(wrapper.length).toBe(0);
      });
      
      it("shouldn't render reply-component if status is closed", () => {
        component = setUp({
            ticketDetails: {
             data: {
                ...ticketDetails.data,
                ticketDetails: {
                ...ticketDetails.ticketDetails,
                status: "Closed",
                },
             } 
            },
          });
        const wrapper = findByTestAttr(component, "reply-container");
        expect(wrapper.length).toBe(0);
      });
     
      it("should render markdown and image upload component when ticket is open", () => {
        component = setUp({
            replyTicket,
            closeTicket,
            ticketDetails: {
             data: {
                ...ticketDetails.data,
                ticketDetails: {
                ...ticketDetails.ticketDetails,
                status: "Open",
                },
             } 
            },
          });
        const wrapper = findByTestAttr(component, "reply-container");
        expect(wrapper.length).toBe(1);

        const replybtn = findByTestAttr(component, "reply-button");
        expect(replybtn.length).toBe(1);
        replybtn.props().onClick();
        expect(replyTicket).toHaveBeenCalled();

        const closebtn = findByTestAttr(component, "close-button");
        expect(closebtn.length).toBe(1);

        const md = findByTestAttr(component, "reply-markdown");
        expect(md.length).toBe(1);
        expect(md.props().title).toBe("Write a Reply");

        const up = findByTestAttr(component, "reply-file-upload");
        expect(up.length).toBe(1);
      });
})
