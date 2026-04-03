import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { OrganizationSubscriptionForm } from './OrganizationSubscriptionForm';
import { findByTestAttr } from '../../helpers/utils';
import { Formik } from "formik";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<OrganizationSubscriptionForm classes={{}} t={() => {}} {...initialProps} />)
}

describe('Plugin Form Testing', () => {
    let component = setup({})
    let formik = component.find(Formik);

    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render card header Update Org Subscription if edit is true', () => {
        component.setProps({ edit: true})
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Update Org Subscription")
    })

    it('should render card header Create Org Subscription if edit is false', () => {
        component.setProps({ edit: false })
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Create Org Subscription")
    })

    it("should render name field", () => {
        const field = findByTestAttr(formik.dive(), "name-field");
        expect(field.length).toBe(1);
    });

    it("should render price field", () => {
        const field = findByTestAttr(formik.dive(), "price-field");
        expect(field.length).toBe(1);
    });

    it("should render cores field", () => {
        const wrapper = findByTestAttr(formik.dive(), "cores-field");
        expect(wrapper.length).toBe(1);
      });
  
    it("should render memory field", () => {
        const wrapper = findByTestAttr(formik.dive(), "memory-field");
        expect(wrapper.length).toBe(1);
    });

    it("should render cluster field", () => {
        const wrapper = findByTestAttr(formik.dive(), "cluster-field");
        expect(wrapper.length).toBe(1);
    });

    it("should render no of user field", () => {
        const wrapper = findByTestAttr(formik.dive(), "no_of_user-field");
        expect(wrapper.length).toBe(1);
    });

    it("should render weight field", () => {
        const wrapper = findByTestAttr(formik.dive(), "weight-field");
        expect(wrapper.length).toBe(1);
    });

    it("should render attributes field", () => {
        const wrapper = findByTestAttr(formik.dive(), "attributes-field");
        expect(wrapper.length).toBe(1);
    });

    it("should render active field", () => {
        const wrapper = findByTestAttr(formik.dive(), "active-field");
        expect(wrapper.length).toBe(1);
      });
    
    it("should render submit button", () => {
    const wrapper = findByTestAttr(formik.dive(), "submit-button");
    expect(wrapper.length).toBe(1);
    });
}) 