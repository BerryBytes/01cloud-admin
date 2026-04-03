import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Plugin } from './Plugin';
import { findByTestAttr } from '../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        fetchPlugin: jest.fn(),
        fetchPluginVersion: jest.fn(),
        deletePlugin: jest.fn(),
        ...props
    }
    return shallow(<Plugin classes={{}} t={() => {}} {...initialProps} />)
}

describe('Plugin Page Testing', () => {
    const handleCreatePlugin = jest.fn()
    let component = setup({})
    
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should not render when fetching plugin is false', () => {
        const wrapper = findByTestAttr(component, 'fetching-plugins');
        expect(wrapper.length).toBe(0)
    })

    it('should  render the when fetching plugin is true', () => {
        component.setProps({ fetchingPlugin: true})
        const wrapper = findByTestAttr(component, 'fetching-plugins');
        expect(wrapper.length).toBe(1)
    })

    it('should  render the data table container', () => {
        const wrapper = findByTestAttr(component, 'dataTable-container');
        expect(wrapper.length).toBe(1)
    })

    it('should  render the plugin title', () => {
        const wrapper = findByTestAttr(component, 'plugin-title');
        expect(wrapper.length).toBe(1)
    })

    it('should  render the create button', () => {
        const wrapper = findByTestAttr(component, 'create-button');
        expect(wrapper.length).toBe(1)
    })

    it('should  render the create button and on click create function should be called', () => {
        component.instance().handleCreatePlugin = handleCreatePlugin;
        const wrapper = findByTestAttr(component, 'create-button');
        wrapper.props().onClick()
        expect(handleCreatePlugin).toHaveBeenCalled()
    })

    describe('When Plugin Popup is Open', () => {
        const deletePopupAgreeHandler = jest.fn()
        const deletePopupDisagreeHandler = jest.fn()
        beforeEach(() => {
            component = setup({
               deletePopupAgreeHandler,
               deletePopupDisagreeHandler
            });
        });

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
    })
})
