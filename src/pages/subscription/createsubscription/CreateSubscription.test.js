import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateSubscription } from './CreateSubscription';
import { findByTestAttr } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        ...props
    }
    return shallow(<CreateSubscription classes={{}} t={() => {}} {...initialProps} />)
}

describe('Create Subscription Form Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render orgaanization subscription form', () => {
        const wrapper = findByTestAttr(component, 'subscription-form');
        expect(wrapper.length).toBe(1)
    })
})