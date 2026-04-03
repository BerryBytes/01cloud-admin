import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AddInvitation } from './AddInvitation';
import { findByTestAttr } from '../../helpers/utils';
import { Formik } from "formik";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<AddInvitation classes={{}} t={() => {}} {...initialProps} />)
}

describe('Add Invitation Page Testing', () => {
    let component = setup({})
    let formik = component.find(Formik);

    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it("should render name field", () => {
        const field = findByTestAttr(formik.dive(), "name-field");
        expect(field.length).toBe(1);
    });

    it("should render invite button", () => {
        const field = findByTestAttr(formik.dive(), "invite-button");
        expect(field.length).toBe(1);
    });

    it("should render purpose field", () => {
        const field = findByTestAttr(formik.dive(), "purpose-field");
        expect(field.length).toBe(1);
    });

    it("should render designation field", () => {
        const field = findByTestAttr(formik.dive(), "designation-field");
        expect(field.length).toBe(1);
    });

    it("should render company field", () => {
        const field = findByTestAttr(formik.dive(), "company-field");
        expect(field.length).toBe(1);
    });

    it("should render email field", () => {
        const field = findByTestAttr(formik.dive(), "email-field");
        expect(field.length).toBe(1);
    });

    it("should render last name field", () => {
        const field = findByTestAttr(formik.dive(), "last-field");
        expect(field.length).toBe(1);
    });
}) 