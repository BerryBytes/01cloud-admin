import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PluginForm } from './PluginForm';
import { findByTestAttr } from '../../helpers/utils';
import { Formik } from "formik";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        fetchCategories: jest.fn(),
        ...props
    }
    return shallow(<PluginForm classes={{}} t={() => {}} {...initialProps} />)
}

describe('Plugin Form Testing', () => {
    let component = setup({})
    let formik = component.find(Formik);
 
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render card header Update Plugin if edit is true', () => {
        component.setProps({ edit: true})
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Update Plugin")
    })

    it('should render card header Add Plugin if edit is false', () => {
        component.setProps({ edit: false })
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Add Plugin")
    })

    it("should render name field", () => {
        const field = findByTestAttr(formik.dive(), "name-field");
        expect(field.length).toBe(1);
    });

    it("should render url field", () => {
        const field = findByTestAttr(formik.dive(), "url-field");
        expect(field.length).toBe(1);
    });

    it("should render minMemory field", () => {
        const field = findByTestAttr(formik.dive(), "minMemory-field");
        expect(field.length).toBe(1);
    });

    it("should render minMemory field", () => {
        const field = findByTestAttr(formik.dive(), "minMemory-field");
        expect(field.length).toBe(1);
    });

    it("should render minCpu field", () => {
        const field = findByTestAttr(formik.dive(), "minCpu-field");
        expect(field.length).toBe(1);
    });

    it("should render description field", () => {
        const field = findByTestAttr(formik.dive(), "description-field");
        expect(field.length).toBe(1);
    });

    it("should render file field", () => {
        const field = findByTestAttr(formik.dive(), "file-field");
        expect(field.length).toBe(1);
    });

    it("should render status field", () => {
        const field = findByTestAttr(formik.dive(), "status-field");
        expect(field.length).toBe(1);
    });

    it("should render ci field", () => {
        const field = findByTestAttr(formik.dive(), "ci-field");
        expect(field.length).toBe(1);
    });

    it("should render isAddon field", () => {
        const field = findByTestAttr(formik.dive(), "isAddon-field");
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