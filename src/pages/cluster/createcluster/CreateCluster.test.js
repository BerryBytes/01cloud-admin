import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateCluster } from './CreateCluster';
import { findByTestAttr } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        ...props
    }
    return shallow(<CreateCluster classes={{}} t={() => {}} {...initialProps} />)
}

describe('Create Cluster Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render plugin form', () => {
        const wrapper = findByTestAttr(component, 'form-container');
        expect(wrapper.length).toBe(1)
    })
    
})
