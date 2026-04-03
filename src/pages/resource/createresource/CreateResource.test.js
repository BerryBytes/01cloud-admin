import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreateResource } from './CreateResource'
import { findByTestAttr } from '../../../helpers/utils'

configure({ adapter: new Adapter() })

const setup = (props) => {
    const initialProps = {
        classes: {},
        history: {},
        updateBreadcrumb: jest.fn(),
        ...props
    }

    let component = shallow(<CreateResource {...initialProps} t={()=>""} />)
    return component
}

describe("Create Resource Form",()=> {
    let component = setup()

    it('should render resouce form without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })   
    
    it('should render resouce form without error', () => {
        const wrapper = findByTestAttr(component, "resource-form")
        expect(wrapper.length).toBe(1)
    }) 

    it('should call create resouce function', () => {
        const handleCreateResource = jest.fn()
        component.instance().handleCreateResource = handleCreateResource
        const wrapper = findByTestAttr(component, "resource-form")
        wrapper.props().resourceAction()
        expect(handleCreateResource).toHaveBeenCalled()
    }) 
})