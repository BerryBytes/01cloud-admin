import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateVersion } from './CreateVersion';
import { findByTestAttr } from '../../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        fetchPluginInfo: jest.fn(),
        pluginInfo: {
            image: "https://api.01Cloud.com/stock/image/2.jpg",
            name: "Node Js",
            description: "This is the plugin for node js"
        },
        match: {
                params: {
                    id: 47
            }
        },
        ...props
    }
    return shallow(<CreateVersion classes={{}} t={() => {}} {...initialProps} />)
}

describe('Create Plugin Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the plugin image with provided image', () => {
        const wrapper = findByTestAttr(component, 'plugin-image');
        expect(wrapper.props().src).toBe("https://api.01Cloud.com/stock/image/2.jpg")
    })

    it('should render the plugin name with provided name', () => {
        const wrapper = findByTestAttr(component, 'plugin-name');
        expect(wrapper.text()).toBe("Node Js")
    })

    it('should render the plugin description with provided description', () => {
        const wrapper = findByTestAttr(component, 'plugin-description');
        expect(wrapper.text()).toBe("This is the plugin for node js")
    })

    it('should render version form', () => {
        const wrapper = findByTestAttr(component, 'version-form');
        expect(wrapper.length).toBe(1)
    })
})
