import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PluginInfo } from './PluginInfo';
import { findByTestAttr, getDateInStandardFormat } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        fetchPluginInfo: jest.fn(),
        fetchPluginVersion: jest.fn(),
        deleteVersion: jest.fn(),
        pluginInfo: {
            image: "https://api.01Cloud.com/stock/image/2.jpg",
            name: "Node Js",
            description: "This is the plugin for node js",
            AddOns: [{}]
        },
        match: {
                params: {
                    id: 47
            }
        },
        ...props
    }
    return shallow(<PluginInfo classes={{}} t={() => {}} {...initialProps} />)
}

const plugin = {
    "ID": 456,
    "CreatedAt": "2021-07-15T17:45:07.657069Z",
    "UpdatedAt": "2021-09-09T07:48:42.155906Z",
    "DeletedAt": null,
    "plugin_id": 95,
    "version": "1.0.1",
    "url": "/data/plugin/helm chart/1.0.1",
    "change_logs": "initial",
    "attributes": "",
    "released": "2021-07-15T17:45:07.635724Z",
    "active": true,
    "versions": null
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

    it('should render plugin addons form', () => {
        const wrapper = findByTestAttr(component, 'plugin-addons');
        expect(wrapper.length).toBe(1)
    })

    it('should render the plugin version Title with provided version Title', () => {
        const wrapper = findByTestAttr(component, 'plugin-versionTitle');
        expect(wrapper.text()).toBe("Versions")
    })

    it('should render the plugin version add text with provided version add text', () => {
        const wrapper = findByTestAttr(component, 'plugin-addVersion');
        expect(wrapper.text()).toBe("Add Version")
    })

    it('should render when there is no version to show', () => {
        const wrapper = findByTestAttr(component, 'no-version');
        expect(wrapper.length).toBe(1)
    })

    describe('When Plugin Version is Present', () => {
        const handleVersionDelete = jest.fn()
        const deletePopupAgreeHandler = jest.fn()
        const deletePopupDisagreeHandler = jest.fn()
        beforeEach(() => {
            component = setup({
               pluginVersion: [plugin],
               handleVersionDelete,
               deletePopupAgreeHandler,
               deletePopupDisagreeHandler
            });
        });

        it('should not render when there is version to show', () => {
            const wrapper = findByTestAttr(component, 'no-version');
            expect(wrapper.length).toBe(0)
        })

        it('should render the plugin version with provided version', () => {
            const wrapper = findByTestAttr(component, 'plugin-version');
            expect(wrapper.text()).toBe(plugin.version)
        })

        it('should render the date in which plugin was created', () => {
            const wrapper = findByTestAttr(component, 'plugin-createdAt');
            expect(wrapper.text()).toBe(getDateInStandardFormat(plugin.createdat))
        })

        it('should render the plugin delete icon', () => {
            const wrapper = findByTestAttr(component, 'plugin-deleteIcon');
            expect(wrapper.length).toBe(1)
        })

        it('should call handleVersionDelete when called', () => {
            component.instance().handleVersionDelete = handleVersionDelete;
            const wrapper = findByTestAttr(component, 'plugin-deleteIcon');
            wrapper.props().onClick()
            expect(handleVersionDelete).toHaveBeenCalled()
        })

        it('should call handleVersionDelete when called', () => {
            component.instance().handleVersionDelete = handleVersionDelete;
            const wrapper = findByTestAttr(component, 'plugin-deleteIcon');
            wrapper.props().onClick()
            expect(handleVersionDelete).toHaveBeenCalled()
        })

        it('should call handleAgree  when called handle Agree is called', () => {
            component.instance().deletePopupAgreeHandler = deletePopupAgreeHandler;
            const wrapper = findByTestAttr(component, 'plugin-deletePopup');
            wrapper.props().handleAgree()
            expect(deletePopupAgreeHandler).toHaveBeenCalled()
        })

        it('should call handleDisAgree  when called handleDisAgree is called', () => {
            component.instance().deletePopupDisagreeHandler = deletePopupDisagreeHandler;
            const wrapper = findByTestAttr(component, 'plugin-deletePopup');
            wrapper.props().handleDisAgree()
            expect(deletePopupDisagreeHandler).toHaveBeenCalled()
        })

        it('should open the delete popup once the delete has been clicked', () => {
            component.setState({ isDeletePopupOpened: true });
            const wrapper = findByTestAttr(component, 'plugin-deletePopup');
            expect(wrapper.props().open).toBeTruthy()
        })

        it('should render the plugin delete icon', () => {
            const wrapper = findByTestAttr(component, 'plugin-edit');
            expect(wrapper.length).toBe(1)
        })

    })
})
