import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../helpers/utils';
import { User } from './User';

configure({ adapter : new Adapter()})

const setup = (props) => {
    const initialProps = {
        fetchUsers: jest.fn(),
        classes: {},
        t: jest.fn(),
        ...props
    }
    return shallow(<User {...initialProps} />)
}

describe('User List Component', () => {
    let component = setup()

    it('should render the main container without error', () => {
        const wrapper = findByTestAttr(component, 'main-container')
        expect(wrapper.length).toBe(1)
    })

    it('should render the user header div', () => {
        const wrapper = findByTestAttr(component, 'user-header')
        expect(wrapper.length).toBe(1)
    })

    it('should render data table containing user data', () => {
        const wrapper = findByTestAttr(component, 'data-table')
        expect(wrapper.length).toBe(1)
    })

    it('should not render discount popup', () => {
        const wrapper = findByTestAttr(component, 'user-discount')
        expect(wrapper.length).toBe(0)
    })

    it('should not render fetching user loader', () => {
        const wrapper = findByTestAttr(component, 'fetching-user')
        expect(wrapper.length).toBe(0)
    })

    it('should not render adding discount loader', () => {
        const wrapper = findByTestAttr(component, 'adding-discount')
        expect(wrapper.length).toBe(0)
    })

    it('should not render updating discount loader', () => {
        const wrapper = findByTestAttr(component, 'updating-discount')
        expect(wrapper.length).toBe(0)
    })

    it('should not render fetching discount loader', () => {
        const wrapper = findByTestAttr(component, 'fetching-discount')
        expect(wrapper.length).toBe(0)
    })

    it('should render discount popup', () => {
        component = setup({ userDiscount : true})
        const wrapper = findByTestAttr(component, 'user-discount')
        expect(wrapper.length).toBe(1)
    })

    it('should render fetching user loader', () => {
        component = setup({ fetchingUser: true })
        const wrapper = findByTestAttr(component, 'fetching-user')
        expect(wrapper.length).toBe(1)
    })

    it('should render adding discount loader', () => {
        component = setup({ addingUserDiscount : true })
        const wrapper = findByTestAttr(component, 'adding-discount')
        expect(wrapper.length).toBe(1)
    })

    it('should render updating discount loader', () => {
        component = setup({ updatingUserDiscount : true })
        const wrapper = findByTestAttr(component, 'updating-discount')
        expect(wrapper.length).toBe(1)
    })

    it('should not render fetching discount loader', () => {
        component = setup({ fetchingUserDiscount : true })
        const wrapper = findByTestAttr(component, 'fetching-discount')
        expect(wrapper.length).toBe(1)
    })
})