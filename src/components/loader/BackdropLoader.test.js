import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BackdropLoader } from './BackdropLoader';
import { findByTestAttr } from '../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<BackdropLoader classes={{}} t={() => {}} {...initialProps} />)
}

describe('BackdropLoader Page Testing', () => {
    let component = setup({})
    
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the backdrop without error', () => {
        const wrapper = findByTestAttr(component, 'backdrop');
        expect(wrapper.length).toBe(1)
    })

    it('should render the backrdop with open always true', () => {
        const wrapper = findByTestAttr(component, 'backdrop');
        expect(wrapper.props().open).toBeTruthy()
    })

    it('should render the loader without error', () => {
        const wrapper = findByTestAttr(component, 'loader');
        expect(wrapper.length).toBe(1)
    })

    it('should render the message without error', () => {
        component.setProps({ message: "Loading"})
        const wrapper = findByTestAttr(component, 'message');
        expect(wrapper.text()).toBe("Loading")
    })
})
