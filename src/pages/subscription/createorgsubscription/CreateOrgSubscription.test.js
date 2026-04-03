import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateOrgSubscription } from './CreateOrgSubscription';
import { findByTestAttr } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<CreateOrgSubscription classes={{}} t={() => {}} {...initialProps} />)
}

describe('Create Organization Subscription Form Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render orgaanization subscription form', () => {
        const wrapper = findByTestAttr(component, 'orgSubscription-form');
        expect(wrapper.length).toBe(1)
    })

    it('should not render creating loader', () => {
        const wrapper = findByTestAttr(component, 'creating-subscription');
        expect(wrapper.length).toBe(0)
    })

    it('should render creating loader', () => {
        component.setProps({
            creatingSubscription: true
        })
        const wrapper = findByTestAttr(component, 'creating-subscription');
        expect(wrapper.length).toBe(1)
    })

})