import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditCluster } from './EditCluster';
import { findByTestAttr } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        fetchClusterData: jest.fn(),
        match: {
            params: {
                id: 245
            }
        },
        ...props
    }
    return shallow(<EditCluster classes={{}} t={() => {}} {...initialProps} />)
}

describe('Edit Cluster Page Testing', () => {
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
