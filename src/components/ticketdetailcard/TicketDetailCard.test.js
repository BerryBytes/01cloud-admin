import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAttr, getDateInStandardFormat } from '../../helpers/utils';
import { TicketDetailCard } from "./TicketDetailCard";

  configure({ adapter: new Adapter() });

  const setUp = (props = {}) => {
    const newProps = {
        ...props
    }
const component = shallow(
    <TicketDetailCard classes={{}} t={() => ""} {...newProps} />
  );

return component;
}

const ticketDetails = {
    "data": {
        "ok": true,
        "ticketDetails": {
            "id": 80,
            "title": "testing-nagraj",
            "category": "Engineering",
            "priority": "Medium",
            "status": "Open",
            "assignee": 90,
            "date": 1613381679,
            "lastResponse": 18446744011573954816,
            "isLastResponse": true,
            "application": {
                "id": 1599,
                "name": "v1"
            },
            "environment": {
                "id": 3193,
                "name": "development"
            },
            "organization": {
              "id": 6, 
              "name": "Berrybytes"
            },
            "project": {
                "id": 1029,
                "name": "pro"
            },
            "user": {
                "id": 164,
                "firstName": "Nag",
                "lastName": "Raj",
                "image": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "email": "nagraj@mailinator.com"
            },
            "notes": "this is notes",
            "description": "testing"
        },
        "conversation": [
            {
                "id": 48,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "testing for line 1",
                "date": 1613381885
            },
            {
                "id": 49,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "testing line 2",
                "date": 1613381972
            },
            {
                "id": 50,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "testing line 3",
                "date": 1613381981
            },
            {
                "id": 51,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "testing line 3",
                "date": 1613382194,
                "files": [
                    {
                        "fileType": "image/jpeg",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/jpeg/a28a4506-8f56-4322-9997-04bc10e7e7eb.jpeg",
                        "fileName": "taj-01.jpeg"
                    }
                ]
            },
            {
                "id": 52,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "Testing line 4",
                "date": 1613382265,
                "files": [
                    {
                        "fileType": "image/jpeg",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/jpeg/6118eb30-7394-4d21-b880-e95e8d9ba073.jpeg",
                        "fileName": "taj-01.jpeg"
                    }
                ]
            },
            {
                "id": 53,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "Testing line 5",
                "date": 1613382332,
                "files": [
                    {
                        "fileType": "image/jpeg",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/jpeg/a089ac4c-50c2-42cd-98ec-e761873b5259.jpeg",
                        "fileName": "taj-01.jpeg"
                    }
                ]
            },
            {
                "id": 54,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "Testing line 6",
                "date": 1613382391,
                "files": [
                    {
                        "fileType": "image/jpeg",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/jpeg/5ea8ac6f-8594-42e2-a228-7aea18d805fa.jpeg",
                        "fileName": "taj-01.jpeg"
                    }
                ]
            },
            {
                "id": 55,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "Data are characteristics or information, usually numeric, that are collected through observation.[1] In a more technical sense, data are a set of values of qualitative or quantitative variables about one or more persons or objects, while a datum (singular of data) is a single value of a single variable.[2]\n\nAlthough the terms \"data\" and \"information\" are often used interchangeably, these terms have distinct meanings. In some popular publications, data are sometimes said to be transformed into information when they are viewed in context or in post-analysis.[3] However, in academic treatments of the subject data are simply units of information. Data is used in scientific research, businesses management (e.g., sales data, revenue, profits, stock price), finance, governance (e.g., crime rates, unemployment rates, literacy rates), and in virtually every other form of human organizational activity (e.g., censuses of the number of homeless people by non-profit organizations).",
                "date": 1613382417
            },
            {
                "id": 56,
                "userId": 164,
                "userName": "Nag Raj",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/9ec5ab08-2ac9-4a11-9707-50773253f1eb.jpeg",
                "message": "Data are characteristics or information, usually numeric, that are collected through observation.[1] In a more technical sense, data are a set of values of qualitative or quantitative variables about one or more persons or objects, while a datum (singular of data) is a single value of a single variable.[2]\n\nAlthough the terms \"data\" and \"information\" are often used interchangeably, these terms have distinct meanings. In some popular publications, data are sometimes said to be transformed into information when they are viewed in context or in post-analysis.[3] However, in academic treatments of the subject data are simply units of information. Data is used in scientific research, businesses management (e.g., sales data, revenue, profits, stock price), finance, governance (e.g., crime rates, unemployment rates, literacy rates), and in virtually every other form of human organizational activity (e.g., censuses of the number of homeless people by non-profit organizations).\n\nData are measured, collected and reported, and analyzed, whereupon it can be visualized using graphs, images or other analysis tools. Data as a general concept refers to the fact that some existing information or knowledge is represented or coded in some form suitable for better usage or processing. Raw data (\"unprocessed data\") is a collection of numbers or characters before it has been \"cleaned\" and corrected by researchers. Raw data needs to be corrected to remove outliers or obvious instrument or data entry errors (e.g., a thermometer reading from an outdoor Arctic location recording a tropical temperature). Data processing commonly occurs by stages, and the \"processed data\" from one stage may be considered the \"raw data\" of the next stage. Field data is raw data that is collected in an uncontrolled \"in situ\" environment. Experimental data is data that is generated within the context of a scientific investigation by observation and recording.\n\nData are characteristics or information, usually numeric, that are collected through observation.[1] In a more technical sense, data are a set of values of qualitative or quantitative variables about one or more persons or objects, while a datum (singular of data) is a single value of a single variable.[2]\n\nAlthough the terms \"data\" and \"information\" are often used interchangeably, these terms have distinct meanings. In some popular publications, data are sometimes said to be transformed into information when they are viewed in context or in post-analysis.[3] However, in academic treatments of the subject data are simply units of information. Data is used in scientific research, businesses management (e.g., sales data, revenue, profits, stock price), finance, governance (e.g., crime rates, unemployment rates, literacy rates), and in virtually every other form of human organizational activity (e.g., censuses of the number of homeless people by non-profit organizations).\n\nData are measured, collected and reported, and analyzed, whereupon it can be visualized using graphs, images or other analysis tools. Data as a general concept refers to the fact that some existing information or knowledge is represented or coded in some form suitable for better usage or processing. Raw data (\"unprocessed data\") is a collection of numbers or characters before it has been \"cleaned\" and corrected by researchers. Raw data needs to be corrected to remove outliers or obvious instrument or data entry errors (e.g., a thermometer reading from an outdoor Arctic location recording a tropical temperature). Data processing commonly occurs by stages, and the \"processed data\" from one stage may be considered the \"raw data\" of the next stage. Field data is raw data that is collected in an uncontrolled \"in situ\" environment. Experimental data is data that is generated within the context of a scientific investigation by observation and recording.\n\nData are characteristics or information, usually numeric, that are collected through observation.[1] In a more technical sense, data are a set of values of qualitative or quantitative variables about one or more persons or objects, while a datum (singular of data) is a single value of a single variable.[2]\n\nAlthough the terms \"data\" and \"information\" are often used interchangeably, these terms have distinct meanings. In some popular publications, data are sometimes said to be transformed into information when they are viewed in context or in post-analysis.[3] However, in academic treatments of the subject data are simply units of information. Data is used in scientific research, businesses management (e.g., sales data, revenue, profits, stock price), finance, governance (e.g., crime rates, unemployment rates, literacy rates), and in virtually every other form of human organizational activity (e.g., censuses of the number of homeless people by non-profit organizations).\n\nData are measured, collected and reported, and analyzed, whereupon it can be visualized using graphs, images or other analysis tools. Data as a general concept refers to the fact that some existing information or knowledge is represented or coded in some form suitable for better usage or processing. Raw data (\"unprocessed data\") is a collection of numbers or characters before it has been \"cleaned\" and corrected by researchers. Raw data needs to be corrected to remove outliers or obvious instrument or data entry errors (e.g., a thermometer reading from an outdoor Arctic location recording a tropical temperature). Data processing commonly occurs by stages, and the \"processed data\" from one stage may be considered the \"raw data\" of the next stage. Field data is raw data that is collected in an uncontrolled \"in situ\" environment. Experimental data is data that is generated within the context of a scientific investigation by observation and recording.\n\nData are characteristics or information, usually numeric, that are collected through observation.[1] In a more technical sense, data are a set of values of qualitative or quantitative variables about one or more persons or objects, while a datum (singular of data) is a single value of a single variable.[2]\n\nAlthough the terms \"data\" and \"information\" are often used interchangeably, these terms have distinct meanings. In some popular publications, data are sometimes said to be transformed into information when they are viewed in context or in post-analysis.[3] However, in academic treatments of the subject data are simply units of information. Data is used in scientific research, businesses management (e.g., sales data, revenue, profits, stock price), finance, governance (e.g., crime rates, unemployment rates, literacy rates), and in virtually every other form of human organizational activity (e.g., censuses of the number of homeless people by non-profit organizations).\n\nData are measured, collected and reported, and analyzed, whereupon it can be visualized using graphs, images or other analysis tools. Data as a general concept refers to the fact that some existing information or knowledge is represented or coded in some form suitable for better usage or processing. Raw data (\"unprocessed data\") is a collection of numbers or characters before it has been \"cleaned\" and corrected by researchers. Raw data needs to be corrected to remove outliers or obvious instrument or data entry errors (e.g., a thermometer reading from an outdoor Arctic location recording a tropical temperature). Data processing commonly occurs by stages, and the \"processed data\" from one stage may be considered the \"raw data\" of the next stage. Field data is raw data that is collected in an uncontrolled \"in situ\" environment. Experimental data is data that is generated within the context of a scientific investigation by observation and recording.",
                "date": 1613382573
            },
            {
                "id": 64,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "hi",
                "date": 1613735094,
                "files": [
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/0264bddc-e5dd-4621-bfb0-ae595ba4ddfa.png",
                        "fileName": "Screenshot (2).png"
                    },
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/e008da70-1cdc-4e90-a304-8f5a0aab20f1.png",
                        "fileName": "Screenshot (3).png"
                    },
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/4a84bc02-491a-4161-8329-c0325b395dd7.png",
                        "fileName": "Screenshot (4).png"
                    },
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/bf1befe2-0429-49ca-b0ad-d8b6284fd113.png",
                        "fileName": "Screenshot (5).png"
                    }
                ]
            },
            {
                "id": 65,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "ok",
                "date": 1613735118,
                "files": [
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/7f0b6e38-2c19-4275-9de4-0eee9fc31b8d.png",
                        "fileName": "Screenshot (5).png"
                    },
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/bd5e1a2f-c64d-41cd-b777-53a7058bb851.png",
                        "fileName": "Screenshot (4).png"
                    }
                ]
            },
            {
                "id": 66,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "nag nag raj raj",
                "date": 1613735197
            },
            {
                "id": 67,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "nag nag raj ok",
                "date": 1613735226
            },
            {
                "id": 68,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "danga bali",
                "date": 1613739556
            },
            {
                "id": 69,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "ahahhah",
                "date": 1613739575,
                "files": [
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/06f6f388-14a5-4e9a-8a63-6307b81a4a1e.png",
                        "fileName": "Image 13.png"
                    },
                    {
                        "fileType": "image/png",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/png/cd4fac60-b85f-4ce2-9359-9e5bf87941ef.png",
                        "fileName": "Image 145.png"
                    }
                ]
            },
            {
                "id": 72,
                "userId": 90,
                "userName": "Sanjeev Roka",
                "userAvatar": "https://api.test.01cloud.dev/uploads/image/jpeg/363d6731-16f0-49c0-b19e-39a6175556ed.jpeg",
                "message": "Reply",
                "date": 1613968570,
                "files": [
                    {
                        "fileType": "image/jpeg",
                        "fileValue": "https://api.test.01cloud.dev/uploads/image/jpeg/bf84472a-92b8-42fa-aa65-5a4cfa1b9964.jpg",
                        "fileName": "Buddha.jpg"
                    }
                ]
            },
            {
                "id": 73,
                "userId": 189,
                "userName": "Raman Shrestha",
                "message": "ok",
                "date": 1613969611
            }
        ]
    },
}

describe('Ticket Detail Card Container', () => {
    let component = setUp({ticketDetails});

      it("should should render the ticket details container", () => {
        const wrapper = findByTestAttr(component, "ticket-details-container-test");
        expect(wrapper.length).toBe(1);
      });
      
      it("should should render the ticket details text container", () => {
        const wrapper = findByTestAttr(component, "ticket-details-test");
        expect(wrapper.length).toBe(1);
      });

      it("testing for header section it should be Ticket Details", () => {
        const wrapper = findByTestAttr(component, "ticket-details-test");
        expect(wrapper.text()).toBe(" Ticket Details ");
      });

      it("testing for issued Date section it should be Issued Date", () => {
        const wrapper = findByTestAttr(component, "issue-date-text");
        expect(wrapper.text()).toBe("Issued Date");
        expect(wrapper.length).toBe(1);
      });

      it("testing for issued Date value section it should be Feb 15, 2021 3:19 PM", () => {
        const wrapper = findByTestAttr(component, "issue-date-value");
        expect(wrapper.text()).toBe(getDateInStandardFormat(ticketDetails.data.ticketDetails.date * 1000,true));
        expect(wrapper.length).toBe(1);
      });
      
      it("testing for Last Updated value section it should be Last Updated", () => {
        const wrapper = findByTestAttr(component, "last-response-text");
        expect(wrapper.text()).toBe("Last Updated");
        expect(wrapper.length).toBe(1);
      });

      it("testing for last Response value", () => {
        const wrapper = findByTestAttr(component, "last-response-value");
        expect(wrapper.text()).toBe(getDateInStandardFormat(
            ticketDetails.data.conversation[
              ticketDetails.data.conversation.length - 1
            ].date * 1000, true
          ));
      });

    it("last Response should be N/A if no last reply is available", () => {
        component = setUp({
            ticketDetails: {data: { ...ticketDetails.data, conversation: []} },
        });
        const wrapper = findByTestAttr(component, "last-response-value");
        expect(wrapper.text()).toBe("N/A");
      });

      it("testing for Priority value section it should be Priority", () => {
        const wrapper = findByTestAttr(component, "priority-text");
        expect(wrapper.text()).toBe("Priority");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Priority value section it should be Medium", () => {
        const wrapper = findByTestAttr(component, "priority-value");
        expect(wrapper.text()).toBe(ticketDetails.data.ticketDetails.priority);
        expect(wrapper.length).toBe(1);
      });

      it("testing for Category value section it should be Category", () => {
        const wrapper = findByTestAttr(component, "category-text");
        expect(wrapper.text()).toBe("Category");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Category value section it should be Engineering", () => {
        const wrapper = findByTestAttr(component, "category-value");
        expect(wrapper.text()).toBe(ticketDetails.data.ticketDetails.category);
        expect(wrapper.length).toBe(1);
      });

      it("testing for Status value section it should be Status", () => {
        const wrapper = findByTestAttr(component, "status-text");
        expect(wrapper.text()).toBe("Status");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Status value section it should be Open", () => {
        const wrapper = findByTestAttr(component, "status-value");
        expect(wrapper.text()).toBe(" Open");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Project value section it should be Project", () => {
        const wrapper = findByTestAttr(component, "project-text");
        expect(wrapper.text()).toBe("Project");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Project value section", () => {
        const wrapper = findByTestAttr(component, "project-value");
        expect(wrapper.text()).toBe(ticketDetails.data.ticketDetails.project.name);
        expect(wrapper.length).toBe(1);
      });

      it("testing for Application value section it should be Application", () => {
        const wrapper = findByTestAttr(component, "application-text");
        expect(wrapper.text()).toBe("Application");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Application value section", () => {
        const wrapper = findByTestAttr(component, "application-value");
        expect(wrapper.text()).toBe(ticketDetails.data.ticketDetails.application.name);
        expect(wrapper.length).toBe(1);
      });

      it("testing for Environment value section it should be Environment", () => {
        const wrapper = findByTestAttr(component, "environment-text");
        expect(wrapper.text()).toBe("Environment");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Environment value section", () => {
        const wrapper = findByTestAttr(component, "environment-value");
        expect(wrapper.text()).toBe(ticketDetails.data.ticketDetails.environment.name);
        expect(wrapper.length).toBe(1);
      });

      it("testing for Organization value section it should be Organization", () => {
        const wrapper = findByTestAttr(component, "organization-text");
        expect(wrapper.text()).toBe("Organization");
        expect(wrapper.length).toBe(1);
      });

      it("testing for Organization value section", () => {
        const wrapper = findByTestAttr(component, "organization-value");
        expect(wrapper.text()).toBe(ticketDetails.data.ticketDetails.organization.name);
        expect(wrapper.length).toBe(1);
      });
});
