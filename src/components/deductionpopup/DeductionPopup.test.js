import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils"
import DeductionPopUp from "./DeductionPopUp";
import {
  Dialog
} from "@material-ui/core";

configure({ adapter: new Adapter() });

const setup = (props) => {
  const initialProps = {
    ...props,
  };

  return shallow(<DeductionPopUp classes={{}} {...initialProps} t={() => ""} />);
};

const deductionOnChange = {
    name: {value: "NEPAL", name: "name"},
    description: {value: "Lorem Ipsum Dispum Ripsum", name: "description"},
    country: {value: "CHINA", name: "country"},
    effectiveDate: {value: "2021-08-05", name: "effectiveDate"},
    attributes: {value: "Attributes is ok", name: "attributes"},
    value: {value: "15", name: "value"},
    checkbox: {value: true, name: "percentageCheck"},
}

describe('Deduction Popup Test', () => {
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

        it('should render name field', () => {
            const wrapper = findByTestAttr(component, 'name-field')
            expect(wrapper.length).toBe(1)
        })

        it("auto focus should always be true on name field", () => {
            const wrapper = findByTestAttr(component, 'name-field')
            expect(wrapper.props().autoFocus).toBeTruthy()
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let nameField = findByTestAttr(component, "name-field");
            nameField.simulate("change", { target: { value: deductionOnChange.name.value , name: deductionOnChange.name.name }  });
            nameField = findByTestAttr(component, "name-field");
            expect(nameField.props().value).toBe(deductionOnChange.name.value);
        })

        it('should render description field', () => {
            const wrapper = findByTestAttr(component, 'description-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let descriptionField = findByTestAttr(component, "description-field");
            descriptionField.simulate("change", { target: { value: deductionOnChange.description.value , name: deductionOnChange.description.name }  });
            descriptionField = findByTestAttr(component, "description-field");
            expect(descriptionField.props().value).toBe(deductionOnChange.description.value);
        })

        it('should render country field', () => {
            const wrapper = findByTestAttr(component, 'country-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let countryField = findByTestAttr(component, "country-field");
            countryField.simulate("change", { target: { value: deductionOnChange.country.value , name: deductionOnChange.country.name }  });
            countryField = findByTestAttr(component, "country-field");
            expect(countryField.props().value).toBe(deductionOnChange.country.value);
        })

        it('should render effectiveDate field', () => {
            const wrapper = findByTestAttr(component, 'effectiveDate-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let effectiveDateField = findByTestAttr(component, "effectiveDate-field");
            effectiveDateField.simulate("change", { target: { value: deductionOnChange.effectiveDate.value , name: deductionOnChange.effectiveDate.name }  });
            effectiveDateField = findByTestAttr(component, "effectiveDate-field");
            expect(effectiveDateField.props().value).toBe(deductionOnChange.effectiveDate.value);
        })

        it('should render attributes field', () => {
            const wrapper = findByTestAttr(component, 'attributes-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let attributesField = findByTestAttr(component, "attributes-field");
            attributesField.simulate("change", { target: { value: deductionOnChange.attributes.value , name: deductionOnChange.attributes.name }  });
            attributesField = findByTestAttr(component, "attributes-field");
            expect(attributesField.props().value).toBe(deductionOnChange.attributes.value);
        })

        it('should render value field', () => {
            const wrapper = findByTestAttr(component, 'value-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let valueField = findByTestAttr(component, "value-field");
            valueField.simulate("change", { target: { value: deductionOnChange.value.value , name: deductionOnChange.value.name }  });
            valueField = findByTestAttr(component, "value-field");
            expect(valueField.props().value).toBe(deductionOnChange.value.value);
        })

        it('should render checkbox field', () => {
            const checkBox = shallow(
                findByTestAttr(component, "percentage-field").props().control
              );
            expect(checkBox.length).toBe(1);
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            const checkBox = shallow(
                findByTestAttr(component, "percentage-field").props().control
            );
            let checkBoxField = findByTestAttr(checkBox, "checkbox");
            checkBoxField.simulate("change", { target: { value: deductionOnChange.checkbox.value , name: deductionOnChange.checkbox.name }  });
            checkBoxField = findByTestAttr(checkBox, "checkbox");
            expect(checkBoxField.props().checked).toBe(deductionOnChange.checkbox.value);
        })

        it('should render submit button', () => {
            const wrapper = findByTestAttr(component, 'submit-button')
            expect(wrapper.length).toBe(1)
        })
    })
})