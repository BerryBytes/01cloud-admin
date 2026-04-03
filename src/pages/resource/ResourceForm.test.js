import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ResourceForm } from './ResourceForm'
import { findByTestAttr } from '../../helpers/utils'

configure({ adapter: new Adapter() })

let resourceAction = jest.fn()

const setup = (props) => {
    const initialProps = {
        classes: {},
        history: {},
        resourceAction,
        ...props
    }

    let component = shallow(<ResourceForm {...initialProps} t={()=>""} />)
    return component
}

describe("Resource Form",()=> {
    let component = setup()

    it('should render resouce form without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })

    it('should render title of the card header', () => {
        const wrapper = findByTestAttr(component, "card-header")
        expect(wrapper.props().title).toBe('Add Resource')
    })

    it('should render formik without error', () => {
        const wrapper = findByTestAttr(component, "formik-component")
        expect(wrapper.length).toBe(1)
    })

    it('should render resource name input',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "resourcename-input");
        expect(input.length).toBe(1)
    })

    it('should render button',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "button");
        expect(input.length).toBe(1)
    })

    it('should render button',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "cancel-button");
        expect(input.length).toBe(1)
    })

    it('should render active switch',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "active");
        expect(input.length).toBe(1)
    })

    it('should render weight input',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "weight-input");
        expect(input.length).toBe(1)
    })

    it('should render cores input',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "cores-input");
        expect(input.length).toBe(1)
    })

    it('should render weight input',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "weight-input");
        expect(input.length).toBe(1)
    })

    it('should render memory input',() => {
        const wrapper = findByTestAttr(component,"formik-component")
        const input = findByTestAttr(wrapper.dive(), "memory-input");
        expect(input.length).toBe(1)
    })
     
})