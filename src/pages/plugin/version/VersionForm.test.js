import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { VersionForm } from './VersionForm';
import { findByTestAttr } from '../../../helpers/utils';
import { Formik } from "formik";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<VersionForm classes={{}} t={() => {}} {...initialProps} />)
}

describe('Version Form Testing', () => {
    let component = setup({})
    let formik = component.find(Formik);
 
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render card header Update Version if edit is true', () => {
        component.setProps({ edit: true})
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Update Version")
    })

    it('should render card header Add Version if edit is false', () => {
        component.setProps({ edit: false })
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Add Version")
    })

    it("should render version field", () => {
        const field = findByTestAttr(formik.dive(), "version-field");
        expect(field.length).toBe(1);
    });

    it("should render package field", () => {
        const field = findByTestAttr(formik.dive(), "package-field");
        expect(field.length).toBe(1);
    });

    it("should render changeLog field", () => {
        const field = findByTestAttr(formik.dive(), "changeLog-field");
        expect(field.length).toBe(1);
    });

    it("should render ci field", () => {
        const field = findByTestAttr(formik.dive(), "ci-field");
        expect(field.length).toBe(1);
    });

    it("should render cancel button", () => {
        const field = findByTestAttr(formik.dive(), "cancel-button");
        expect(field.length).toBe(1);
    });

    it("should render add button", () => {
        const field = findByTestAttr(formik.dive(), "add-button");
        expect(field.length).toBe(1);
    });
})