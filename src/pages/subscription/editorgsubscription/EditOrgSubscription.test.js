import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditOrgSubscription } from './EditOrgSubscription';
import { findByTestAttr } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<EditOrgSubscription classes={{}} t={() => {}} {...initialProps} />)
}

describe('Edit Organization Subscription Form Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render orgaanization subscription form', () => {
        component.setProps({
            orgSubscription: {}
        })
        const wrapper = findByTestAttr(component, 'orgSubscription-form');
        expect(wrapper.length).toBe(1)
    })

    it('should not render editing loader', () => {
        const wrapper = findByTestAttr(component, 'editing-subscription');
        expect(wrapper.length).toBe(0)
    })

    it('should render editing loader', () => {
        component.setProps({
            editingSubscription: true
        })
        const wrapper = findByTestAttr(component, 'editing-subscription');
        expect(wrapper.length).toBe(1)
    })

})