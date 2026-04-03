import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils"
import PromoCodePopup from "./PromoCodePopup";
import {
  Dialog
} from "@material-ui/core";

configure({ adapter: new Adapter() });

const setup = (props) => {
  const initialProps = {
    ...props,
  };

  return shallow(<PromoCodePopup classes={{}} {...initialProps} t={() => ""} />);
};

const promoCodesOnChange = {
    title: {value: "NEPAL", name: "title"},
    promocode: {value: "1124", name: "promoCode"},
    discount: {value: "15", name: "discount"},
    checkbox: {value: true, name: "percentageChange"},
    expiryDate: {value: "2021-08-05", name: "expiryDate"},
    limit: {value: "50", name: "limit"},
    activeStatus: {value: true, name: "activeStatus"},
}

describe('Promo Code Popup Test', () => {
    let component = setup({})
    it("Should Render Dialog Component", () => {
        const wrapper = component.find(Dialog);
        expect(wrapper.length).toBe(1);
    });
    
    it("Shouldn't Render Dialog Component", () => {
        const wrapper = component.find(Dialog).first();
        expect(wrapper.props().open).toBeFalsy();
    });

    describe('when open is true', () => {
        const handleCancelPopUp = jest.fn();
        const handleSubmit = jest.fn();
        beforeEach(() => {
          component = setup({
            openAddPopup: true,
            handleCancelPopUp,
            handleSubmit,
          });
        });

        it("Should Render Dialog Component", () => {
            const wrapper = component.find(Dialog).first();
            expect(wrapper.props().open).toBeTruthy();
        });

        it("When close in Dialog Box is Clicked it should close the popup", () => {
            const wrapper = component.find(Dialog).first();
            wrapper.props().onClose()
            expect(handleCancelPopUp).toHaveBeenCalled()
        });

        it("Dialog Title Should have edit if data is present and add when not", () => {
            const wrapper = findByTestAttr(component, 'dialog-title')
            expect(wrapper.length).toBe(1)
        });

        it("should render close icon", () => {
            const wrapper = findByTestAttr(component, 'close-icon')
            expect(wrapper.length).toBe(1)
        });

        it("Popup should close when close icon is clicked", () => {
            const wrapper = findByTestAttr(component, 'close-icon')
            wrapper.props().onClick()
            expect(handleCancelPopUp).toHaveBeenCalled()
        });

        it("should render whole grid container containing all form fields", () => {
            const wrapper = findByTestAttr(component, 'form-grid')
            expect(wrapper.length).toBe(1)
        })

        it('should render title field', () => {
            const wrapper = findByTestAttr(component, 'title-field')
            expect(wrapper.length).toBe(1)
        })

        it("auto focus should always be true on title field", () => {
            const wrapper = findByTestAttr(component, 'title-field')
            expect(wrapper.props().autoFocus).toBeTruthy()
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let titlefield = findByTestAttr(component, "title-field");
            titlefield.simulate("change", { target: { value: promoCodesOnChange.title.value , name: promoCodesOnChange.title.name }  });
            titlefield = findByTestAttr(component, "title-field");
            expect(titlefield.props().value).toBe(promoCodesOnChange.title.value);
        })

        it('should render promocode field', () => {
            const wrapper = findByTestAttr(component, 'promocode-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let promocodefield = findByTestAttr(component, "promocode-field");
            promocodefield.simulate("change", { target: { value: promoCodesOnChange.promocode.value , name: promoCodesOnChange.promocode.name }  });
            promocodefield = findByTestAttr(component, "promocode-field");
            expect(promocodefield.props().value).toBe(promoCodesOnChange.promocode.value);
        })

        it('should render discount field', () => {
            const wrapper = findByTestAttr(component, 'discount-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let discountfield = findByTestAttr(component, "discount-field");
            discountfield.simulate("change", { target: { value: promoCodesOnChange.discount.value , name: promoCodesOnChange.discount.name }  });
            discountfield = findByTestAttr(component, "discount-field");
            expect(discountfield.props().value).toBe(promoCodesOnChange.discount.value);
        })
        
        // it('should render checkbox field', () => {
        //     const checkBox = shallow(
        //         findByTestAttr(component, "percentage-field").props().control
        //       );
        //     expect(checkBox.length).toBe(1);
        // })

        // it('when on change event is fired the changes should incur in the UI', () => {
        //     const checkBox = shallow(
        //         findByTestAttr(component, "percentage-field").props().control
        //     );
        //     let checkBoxField = findByTestAttr(checkBox, "checkbox");
        //     checkBoxField.simulate("change", { target: { value: promoCodesOnChange.checkbox.value , name: promoCodesOnChange.checkbox.name }  });
        //     checkBoxField = findByTestAttr(checkBox, "checkbox");
        //     expect(checkBoxField.props().checked).toBe(promoCodesOnChange.checkbox.value);
        // })

        it('should render expiry Date field', () => {
            const wrapper = findByTestAttr(component, 'expiryDate-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let expiryDateField = findByTestAttr(component, "expiryDate-field");
            expiryDateField.simulate("change", { target: { value: promoCodesOnChange.expiryDate.value , name: promoCodesOnChange.expiryDate.name }  });
            expiryDateField = findByTestAttr(component, "expiryDate-field");
            expect(expiryDateField.props().value).toBe(promoCodesOnChange.expiryDate.value);
        })

        it('should render limit field', () => {
            const wrapper = findByTestAttr(component, 'limit-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let limitField = findByTestAttr(component, "limit-field");
            limitField.simulate("change", { target: { value: promoCodesOnChange.limit.value , name: promoCodesOnChange.limit.name }  });
            limitField = findByTestAttr(component, "limit-field");
            expect(limitField.props().value).toBe(promoCodesOnChange.limit.value);
        })

        it('should render status field', () => {
            const checkBox = shallow(
                findByTestAttr(component, "active-field").props().control
              );
            expect(checkBox.length).toBe(1);
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            const checkBox = shallow(
                findByTestAttr(component, "active-field").props().control
            );
            let checkBoxField = findByTestAttr(checkBox, "active");
            checkBoxField.simulate("change", { target: { value: promoCodesOnChange.activeStatus.value , name: promoCodesOnChange.activeStatus.name }  });
            checkBoxField = findByTestAttr(checkBox, "active");
            expect(checkBoxField.props().checked).toBe(promoCodesOnChange.activeStatus.value);
        })

        it('should render submit button', () => {
            const wrapper = findByTestAttr(component, 'submit-button')
            expect(wrapper.length).toBe(1)
        })
    })
})