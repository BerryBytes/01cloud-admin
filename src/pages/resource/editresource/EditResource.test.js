import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EditResource } from './EditResource'
import { findByTestAttr } from '../../../helpers/utils'

configure({ adapter: new Adapter() })

const setup = (props) => {
    const initialProps = {
        classes: {},
        history: {},
        fetchResourceData: jest.fn(),
        match: {
            params: {
                id: 213
            }
        },
        updateBreadcrumb: jest.fn(),
        ...props
    }

    let component = shallow(<EditResource {...initialProps} t={()=>""} />)
    return component
}

describe("Edit Resource Form",()=> {
    let component = setup()

    it('should render resouce form without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })   
    
    it('should render resouce form without error', () => {
        const wrapper = findByTestAttr(component, "resource-form")
        expect(wrapper.length).toBe(1)
    }) 

    it('should call edit resouce function', () => {
        const editResource = jest.fn()
        component.instance().editResource = editResource
        const wrapper = findByTestAttr(component, "resource-form")
        wrapper.props().resourceAction()
        expect(editResource).toHaveBeenCalled()
    }) 

    it('edit should always be true', () => {
        const wrapper = findByTestAttr(component, "resource-form")
        expect(wrapper.props().edit).toBeTruthy()
    }) 
})