import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Loader } from './Loader';
import { findByTestAttr } from '../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<Loader classes={{}} t={() => {}} {...initialProps} />)
}

describe('Loader Page Testing', () => {
    let component = setup({})
    
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the icon without error', () => {
        const wrapper = findByTestAttr(component, 'icon');
        expect(wrapper.length).toBe(1)
    })

    it('should render the icon without error', () => {
        const wrapper = findByTestAttr(component, 'icon');
        expect(wrapper.props().src).toBe("/images/logos/logo-white.svg")
    })
})
