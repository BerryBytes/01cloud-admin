import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils"
import GateWayPopUp from "./GateWayPopUp";
import {
  Dialog
} from "@material-ui/core";

configure({ adapter: new Adapter() });

const setup = (props) => {
  const initialProps = {
    ...props,
  };

  return shallow(<GateWayPopUp classes={{}} {...initialProps} t={() => ""} />);
};

const gatewayOnChange = {
    name: {value: "NEPAL", name: "name"},
    icon: {value: "Lorem Ipsum Dispum Ripsum", name: "icon"},
    code: {value: "1143", name: "code"},
    description: {value: "description is ok", name: "description"},
    initUrl: { value: "initUrl.com", name: "initUrl"},
    paymentUrl: { value: "paymentUrl.com", name: "paymentUrl"},
    successUrl: { value: "successUrl.com", name: "successUrl"},
    failureUrl: { value: "failureUrl.com", name: "failureUrl"},
    key: { value: "failureUrl.com", name: "key"},
    activeStatus: {value: false, name: "activeStatus"},
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
            nameField.simulate("change", { target: { value: gatewayOnChange.name.value , name: gatewayOnChange.name.name }  });
            nameField = findByTestAttr(component, "name-field");
            expect(nameField.props().value).toBe(gatewayOnChange.name.value);
        })

        it('should render icon field', () => {
            const wrapper = findByTestAttr(component, 'icon-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let iconField = findByTestAttr(component, "icon-field");
            iconField.simulate("change", { target: { value: gatewayOnChange.icon.value , name: gatewayOnChange.icon.name }  });
            iconField = findByTestAttr(component, "icon-field");
            expect(iconField.props().value).toBe(gatewayOnChange.icon.value);
        })

        it('should render code field', () => {
            const wrapper = findByTestAttr(component, 'code-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let codeField = findByTestAttr(component, "code-field");
            codeField.simulate("change", { target: { value: gatewayOnChange.code.value , name: gatewayOnChange.code.name }  });
            codeField = findByTestAttr(component, "code-field");
            expect(codeField.props().value).toBe(gatewayOnChange.code.value);
        })

        it('should render description field', () => {
            const wrapper = findByTestAttr(component, 'description-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let descriptionField = findByTestAttr(component, "description-field");
            descriptionField.simulate("change", { target: { value: gatewayOnChange.description.value , name: gatewayOnChange.description.name }  });
            descriptionField = findByTestAttr(component, "description-field");
            expect(descriptionField.props().value).toBe(gatewayOnChange.description.value);
        })

        it('should render country field', () => {
            const wrapper = findByTestAttr(component, 'country-field')
            expect(wrapper.length).toBe(1)
        })

        it('should render initUrl field', () => {
            const wrapper = findByTestAttr(component, 'initUrl-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let initUrlField = findByTestAttr(component, "initUrl-field");
            initUrlField.simulate("change", { target: { value: gatewayOnChange.initUrl.value , name: gatewayOnChange.initUrl.name }  });
            initUrlField = findByTestAttr(component, "initUrl-field");
            expect(initUrlField.props().value).toBe(gatewayOnChange.initUrl.value);
        })

        it('should render paymentUrl field', () => {
            const wrapper = findByTestAttr(component, 'paymentUrl-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let paymentUrlField = findByTestAttr(component, "paymentUrl-field");
            paymentUrlField.simulate("change", { target: { value: gatewayOnChange.paymentUrl.value , name: gatewayOnChange.paymentUrl.name }  });
            paymentUrlField = findByTestAttr(component, "paymentUrl-field");
            expect(paymentUrlField.props().value).toBe(gatewayOnChange.paymentUrl.value);
        })

        it('should render successUrl field', () => {
            const wrapper = findByTestAttr(component, 'successUrl-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let successUrlField = findByTestAttr(component, "successUrl-field");
            successUrlField.simulate("change", { target: { value: gatewayOnChange.successUrl.value , name: gatewayOnChange.successUrl.name }  });
            successUrlField = findByTestAttr(component, "successUrl-field");
            expect(successUrlField.props().value).toBe(gatewayOnChange.successUrl.value);
        })

        it('should render failureUrl field', () => {
            const wrapper = findByTestAttr(component, 'failureUrl-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let failureUrlField = findByTestAttr(component, "failureUrl-field");
            failureUrlField.simulate("change", { target: { value: gatewayOnChange.failureUrl.value , name: gatewayOnChange.failureUrl.name }  });
            failureUrlField = findByTestAttr(component, "failureUrl-field");
            expect(failureUrlField.props().value).toBe(gatewayOnChange.failureUrl.value);
        })

        it('should render key field', () => {
            const wrapper = findByTestAttr(component, 'key-field')
            expect(wrapper.length).toBe(1)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let keyField = findByTestAttr(component, "key-field");
            keyField.simulate("change", { target: { value: gatewayOnChange.key.value , name: gatewayOnChange.key.name }  });
            keyField = findByTestAttr(component, "key-field");
            expect(keyField.props().value).toBe(gatewayOnChange.key.value);
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
            let checkBoxField = findByTestAttr(checkBox, "activeStatus");
            checkBoxField.simulate("change", { target: { value: gatewayOnChange.activeStatus.value , name: gatewayOnChange.activeStatus.name }  });
            checkBoxField = findByTestAttr(checkBox, "activeStatus");
            expect(checkBoxField.props().checked).toBe(gatewayOnChange.activeStatus.value);
        })

        it('should render submit button', () => {
            const wrapper = findByTestAttr(component, 'submit-button')
            expect(wrapper.length).toBe(1)
        })
    })
})