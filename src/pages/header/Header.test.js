import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './Header';
import { findByTestAttr } from '../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<Header classes={{}} t={() => {}} {...initialProps} />)
}

describe('Header Page Testing', () => {
    let component = setup({})

    it('should render main container without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })

    it('should render icon button without error', () => {
        const wrapper = findByTestAttr(component, "icon-button")
        expect(wrapper.length).toBe(1)
    })

    it('should render user button without error', () => {
        const wrapper = findByTestAttr(component, "user-button")
        expect(wrapper.length).toBe(1)
    })

    it('simulating user button click', () => {
        const handleMenuClick = jest.fn()
        component.instance().handleMenuClick = handleMenuClick
        const wrapper = findByTestAttr(component, "user-button")
        wrapper.props().onClick()
        expect(handleMenuClick).toHaveBeenCalled()
    })

    it('should render user details in the text box', () => {
        component.setProps({
            userDetails: {
                first_name: "Srivalli",
                last_name: "Pushpa"
            }
        })
        const wrapper = findByTestAttr(component, "user-button")
        expect(wrapper.text()).toBe("Srivalli Pushpa ")
    })

    it('should render menu without error', () => {
        const wrapper = findByTestAttr(component, "menu")
        expect(wrapper.length).toBe(1)
    })

    it('simulating menu close click', () => {
        const handleMenuClose = jest.fn()
        component.instance().handleMenuClose = handleMenuClose
        const wrapper = findByTestAttr(component, "menu")
        wrapper.props().onClose()
        expect(handleMenuClose).toHaveBeenCalled()
    })

    it('should render menu item without error', () => {
        const wrapper = findByTestAttr(component, "item2")
        expect(wrapper.length).toBe(1)
    })

    it('should render menu item without error', () => {
        const wrapper = findByTestAttr(component, "item2")
        expect(wrapper.text()).toBe("Logout")
    })

    it('simulating menu close click', () => {
        const handleLogoutClick = jest.fn()
        component.instance().handleLogoutClick = handleLogoutClick
        const wrapper = findByTestAttr(component, "item2")
        wrapper.props().onClick()
        expect(handleLogoutClick).toHaveBeenCalled()
    })

    it('should render menu item without error', () => {
        const wrapper = findByTestAttr(component, "avatar")
        expect(wrapper.length).toBe(1)
    })

    it('should render menu item without error', () => {
        const wrapper = findByTestAttr(component, "avatar")
        expect(wrapper.props().src).toBe("./Images/profile_image.png")
    })
})
