import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ClusterForm } from './ClusterForm';
import { findByTestAttr } from '../../helpers/utils';
import { Formik } from "formik";

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        fetchRegions: jest.fn(),
        ...props
    }
    return shallow(<ClusterForm classes={{}} t={() => {}} {...initialProps} />)
}

describe('Cluster Form Testing', () => {
    let component = setup({})
    let formik = component.find(Formik);

    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render card header Add Cluster if edit is true', () => {
        component.setProps({ edit: false })
        const wrapper = findByTestAttr(formik.dive(), 'card-header');
        expect(wrapper.length).toBe(1)
        expect(wrapper.props().title).toBe("Add Cluster")
    })

    it("should render name field", () => {
        const field = findByTestAttr(formik.dive(), "name-field");
        expect(field.length).toBe(1);
    });

    it("should render context field", () => {
        const field = findByTestAttr(formik.dive(), "context-field");
        expect(field.length).toBe(1);
    });

    it("should render token field", () => {
        const field = findByTestAttr(formik.dive(), "token-field");
        expect(field.length).toBe(1);
    });

    it("should render config field", () => {
        const field = findByTestAttr(formik.dive(), "config-field");
        expect(field.length).toBe(1);
    });

    it("should render provider field", () => {
        const field = findByTestAttr(formik.dive(), "provider-field");
        expect(field.length).toBe(1);
    });

    it("should render region field", () => {
        const field = findByTestAttr(formik.dive(), "region-field");
        expect(field.length).toBe(1);
    });

    it("should render zone field", () => {
        const field = findByTestAttr(formik.dive(), "zone-field");
        expect(field.length).toBe(1);
    });

    it("should render tags field", () => {
        const field = findByTestAttr(formik.dive(), "tags-field");
        expect(field.length).toBe(1);
    });

    it("should render prometheus field", () => {
        const field = findByTestAttr(formik.dive(), "prometheus-field");
        expect(field.length).toBe(1);
    });

    it("should render argo field", () => {
        const field = findByTestAttr(formik.dive(), "argo-field");
        expect(field.length).toBe(1);
    });

    it("should render image field", () => {
        const field = findByTestAttr(formik.dive(), "image-field");
        expect(field.length).toBe(1);
    });

    it("should render username field", () => {
        const field = findByTestAttr(formik.dive(), "username-field");
        expect(field.length).toBe(1);
    });

    it("should render imagerepo field", () => {
        const field = findByTestAttr(formik.dive(), "imagerepo-field");
        expect(field.length).toBe(1);
    });

    it("should render imagerepopassword field", () => {
        const field = findByTestAttr(formik.dive(), "imagerepopassword-field");
        expect(field.length).toBe(1);
    });

    it("should render dnszone field", () => {
        const field = findByTestAttr(formik.dive(), "dnszone-field");
        expect(field.length).toBe(1);
    });

    it("should render pv field", () => {
        const field = findByTestAttr(formik.dive(), "pv-field");
        expect(field.length).toBe(1);
    });

    it("should render storage field", () => {
        const field = findByTestAttr(formik.dive(), "storage-field");
        expect(field.length).toBe(1);
    });

    it("should render storagesecret field", () => {
        const field = findByTestAttr(formik.dive(), "storagesecret-field");
        expect(field.length).toBe(1);
    });

    it("should render active field", () => {
        const field = findByTestAttr(formik.dive(), "active-field");
        expect(field.length).toBe(1);
    });

    it("should render button field", () => {
        const field = findByTestAttr(formik.dive(), "button-field");
        expect(field.length).toBe(1);
    });
}) 