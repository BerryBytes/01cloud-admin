import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import {
  findByTestAttr,
  paymentSummaryDateFormat2,
} from "../../helpers/utils";
import PaymentSummary from "./PaymentSummary"

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
  const initialProps = { classes: {}, t: jest.fn() };
  return shallow(<PaymentSummary {...initialProps} {...props} />);
};

describe("PaymentSummary Component", () => {
  let component = setup();

  it("should render the main container without error", () => {
    const wrapper = findByTestAttr(component, "main-container");
    expect(wrapper.length).toBe(1);
  });

  it("should render correct summary date", () => {
    let userInvoice = {
      start_date: "2020-04-09T19:18:06.000Z",
      end_date: "2020-06-09T19:18:06.000Z",
    };
    component = setup({
      invoice: userInvoice,
    });
    const title = shallow(
      findByTestAttr(component, "card-header").props().title
    );
    const date = findByTestAttr(title, "summary-date");
    expect(date.text()).toBe(
      " |  " + paymentSummaryDateFormat2(userInvoice.start_date, userInvoice.end_date)
    );
  });

  it("should render correct number of invoice item rows", () => {
    component = setup({
      invoice: {
        sub_total: 5.56,
        invoice_items: [
          { particular: "Project1", total: 1.0 },
          { particular: "my java project", days: 7, total: 4.56 },
        ],
        deduct_amount: 0.43,
        deduction: {
          name: "Tax",
          value: "13"
        },
        total_cost: "5.99"
      },
    });
    const row = findByTestAttr(component, "item-row");
    expect(row.length).toBe(2);
  });

  it("should render correct name of the invoive item", () => {
    const wrapper = findByTestAttr(component, "item-name").at(1);
    expect(wrapper.text()).toBe("my java project");
  });

  it("should render correct effective days of the invoive item", () => {
    const wrapper = findByTestAttr(component, "item-days").at(1);
    expect(wrapper.text()).toBe(" 7 ");
  });

  it("should render correct cost of the invoive item", () => {
    const wrapper = findByTestAttr(component, "item-total").at(1);
    expect(wrapper.text()).toBe(" $4.56 ");
  });

  it("should render correct subtotal of the items", () => {
    const wrapper = findByTestAttr(component, "subtotal");
    expect(wrapper.text()).toBe("$5.56");
  });

  it("should render correct deduction name", () => {
    const wrapper = findByTestAttr(component, "deduction-name");
    expect(wrapper.text()).toBe("Tax (13%)");
  });

  it("should render correct deduction amount", () => {
    const wrapper = findByTestAttr(component, "deduction-amount");
    expect(wrapper.text()).toBe(`$0.43`);
  });

  it("should render correct total value", () => {
    const wrapper = findByTestAttr(component, "total");
    expect(wrapper.text()).toBe("$5.99");
  });
});
