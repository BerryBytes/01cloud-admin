import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import UserDiscountPopUp from "./UserDiscountPopUp";
import { Dialog } from "@material-ui/core";

configure({ adapter: new Adapter() });

const handleCancelPopUp = jest.fn();
const clearDiscountData = jest.fn();
const updateDiscount = jest.fn();

const setup = props => {
  const initialProps = {
    userId: 1,
    clearDiscountData,
    userDiscountData: {
      discount: [],
      discount_is_percent: false,
      enable_discount: false,
    },
    openAddPopup: false,
    handleCancelPopUp,
    updateDiscount,
    ...props,
  };

  return shallow(<UserDiscountPopUp classes={{}} {...initialProps} />);
};

describe("User Discount PopUp Test", () => {
  let component = setup({});
  it("Should Render Dialog Component", () => {
    const wrapper = component.find(Dialog);
    expect(wrapper.length).toBe(1);
  });

  it("'open' prop of Dialogue should be false when open is false in props", () => {
    const wrapper = component.find(Dialog).first();
    expect(wrapper.props().open).toBeFalsy();
  });

  describe("when open is true", () => {
    beforeEach(() => {
      component = setup({
        openAddPopup: true,
      });
    });

    it("'open' prop of Dialogue should be true when open is true in props", () => {
      const wrapper = component.find(Dialog).first();
      expect(wrapper.props().open).toBeTruthy();
    });

    it("On Dialogue Box onClose it should call handleCancelPopUp", () => {
      const wrapper = component.find(Dialog).first();
      wrapper.props().onClose();
      expect(handleCancelPopUp).toHaveBeenCalled();
    });

    it("should render close icon", () => {
      const wrapper = findByTestAttr(component, "close-icon");
      expect(wrapper.length).toBe(1);
    });

    it("It should call handleCancelPopUp on click on close icon", () => {
      const closeIcon = findByTestAttr(component, "close-icon");
      closeIcon.props().onClick();
      expect(handleCancelPopUp).toHaveBeenCalled();
    });

    it("should render dialogue title", () => {
      const wrapper = findByTestAttr(component, "dialogue-title");
      expect(wrapper.length).toBe(1);
    });

    it("should render discount field", () => {
      const discountField = findByTestAttr(component, "discount-field");
      expect(discountField.length).toBe(1);
    });

    it("should render submit button", () => {
      const submitButton = findByTestAttr(component, "submit-button");
      expect(submitButton.length).toBe(1);
    });

    it("on discount field blur, initially error should be true", () => {
      let discountField = findByTestAttr(component, "discount-field");
      discountField.props().onBlur();

      discountField = findByTestAttr(component, "discount-field");

      expect(discountField.props().error).toBeTruthy();
    });

    it("on discount field change, error should be true when discount value less than 0 and submit button should be disabled", () => {
      let discountField = findByTestAttr(component, "discount-field");

      discountField.simulate("change", { target: { value: -1 } });

      discountField = findByTestAttr(component, "discount-field");

      expect(discountField.props().error).toBeTruthy();

      const submitButton = findByTestAttr(component, "submit-button");
      expect(submitButton.props().disabled).toBeTruthy();
    });

    it("on discount field change, error should be false when discount value greater than 0 and submit button should not be disabled", () => {
      let discountField = findByTestAttr(component, "discount-field");

      discountField.simulate("change", { target: { value: 1 } });

      discountField = findByTestAttr(component, "discount-field");

      expect(discountField.props().error).toBeFalsy();

      const submitButton = findByTestAttr(component, "submit-button");
      expect(submitButton.props().disabled).toBeFalsy();
    });

    it("on discount field change, error should be false when discount value is empty string and submit button should not be disabled", () => {
      let discountField = findByTestAttr(component, "discount-field");

      discountField.simulate("change", { target: { value: "" } });

      discountField = findByTestAttr(component, "discount-field");

      expect(discountField.props().error).toBeFalsy();

      const submitButton = findByTestAttr(component, "submit-button");
      expect(submitButton.props().disabled).toBeTruthy();
    });

    it("should call updateDiscount, clearDiscountData, handleCancelPopUp on submit button click", () => {
      const submitButton = findByTestAttr(component, "submit-button");
      submitButton.props().onClick();

      expect(updateDiscount).toHaveBeenCalled();
      expect(clearDiscountData).toHaveBeenCalled();
      expect(handleCancelPopUp).toHaveBeenCalled();
    });

    it("should render discountAction field", () => {
      const discountActionField = findByTestAttr(
        component,
        "discountAction-field"
      );
      expect(discountActionField.length).toBe(1);
    });

    it("initially checked prop of discountAction field switch should be false", () => {
        const discountActionField = shallow(
          findByTestAttr(component, "discountAction-field").props().control
        );
        let switchField = findByTestAttr(discountActionField, "switch");
        expect(switchField.props().checked).toBeFalsy();
      });

      it("on discountAction field's switch change, checked prop of discountAction field switch should be changed", () => {
        let discountActionField = shallow(
          findByTestAttr(component, "discountAction-field").props().control
        );
        let switchField = findByTestAttr(discountActionField, "switch");
  
        const initialChecked = switchField.props().checked;
  
        switchField.simulate("change");
  
        discountActionField = shallow(
          findByTestAttr(component, "discountAction-field").props().control
        );
  
        switchField = findByTestAttr(discountActionField, "switch");
  
        expect(switchField.props().checked).toBe(!initialChecked);
      });
  });
});
