import React from 'react'
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { findByTestAttr } from '../../helpers/utils'
import { AddRegistry } from './AddRegistry';

configure({ adapter: new Adapter() })

const setup = (props) => {
    const initialProps = {
        classes: {},
        ...props
    }

    let component = shallow(<AddRegistry {...initialProps} t={() => ""} />)
    return component
}

describe("Add Registry Component", () => {
    let component = setup();

    it("should render main container without error",() => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })

    it("should not render adding loader",() => {
        const wrapper = findByTestAttr(component, "adding-loader")
        expect(wrapper.length).toBe(0)
    })

    it("should not render updating loader",() => {
        const wrapper = findByTestAttr(component, "updating-loader")
        expect(wrapper.length).toBe(0)
    })

    it("should render submit button",() => {
        const wrapper = findByTestAttr(component, "submit-button")
        expect(wrapper.length).toBe(1)
    })

    it("should render add Text if no registry details is available",() => {
        const wrapper = findByTestAttr(component, "submit-button")
        expect(wrapper.text()).toBe("Add")
    })

    it("should render select provider",() => {
        const wrapper = findByTestAttr(component, "select-provider")
        expect(wrapper.length).toBe(1)
    })

    it("should not render config form",() => {
        const wrapper = findByTestAttr(component, "config-form")
        expect(wrapper.length).toBe(0)
    })

    it("should render adding loader",() => {
        component.setProps({
            addingRegistry: true,
        })

        const wrapper = findByTestAttr(component, "adding-loader")
        expect(wrapper.length).toBe(1)
    })

    it("should render updating loader",() => {
        component.setProps({
            updatingRegistry: true,
        })

        const wrapper = findByTestAttr(component, "updating-loader")
        expect(wrapper.length).toBe(1)
    })

    it('the selected value should be AWS', () => {
        let wrapper = findByTestAttr(component,"select-provider");
        wrapper.props().onChange({
            target: {
                value : "AWS"
            }
        })

        wrapper = findByTestAttr(component,"select-provider");
        expect(wrapper.props().value).toBe("AWS")
    })

    it('select should be enabled if there is no registy details', () => {
        let wrapper = findByTestAttr(component,"select-provider");
        expect(wrapper.props().disabled).toBeFalsy()
    })

    it('select should be disabled if there is registy details', () => {
        component.setProps({
            registryDetails: [{}]
        })
        let wrapper = findByTestAttr(component,"select-provider");
        expect(wrapper.props().disabled).toBeTruthy()
    })

    it("should render update Text if  registry details is available",() => {
        component.setProps({
            registryDetails: [{}]
        })
        const wrapper = findByTestAttr(component, "submit-button")
        expect(wrapper.text()).toBe("Update")
    })

    it("initially the button should be disabled",() => {
        const wrapper = findByTestAttr(component, "submit-button")
        expect(wrapper.props().disabled).toBeFalsy()
    })
})