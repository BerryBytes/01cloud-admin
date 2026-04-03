import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Resource, StyledTableCell } from './Resource'
import { findByTestAttr, spaceConversion, coreConversion } from '../../helpers/utils'
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

configure({ adapter: new Adapter()})

const setup = (props,state) => {
    let initialProps = {
        t: jest.fn(),
        classes : {},
        history: {},
        fetchResources: jest.fn(),
        updateBreadcrumb: jest.fn(),
        deleteResource: jest.fn(),
        ...props
    }

    let component = shallow(<Resource {...initialProps} />)
    component.setState({...state})
    return component
}

const resourceList = [{
    ID: 10,
    name: "Resource 1",
    memory: 10,
    cores: 10,
    weight: "10",
    active: true
}]

describe("Resource Component",() => {
    let component = setup()

    it('Should render main component without any errors', () => {
        const wrapper = findByTestAttr(component, "main-component")
        expect(wrapper.length).toBe(1)
    })

    it('Should render list container typography', () => {
        const wrapper = findByTestAttr(component, "typography")
        expect(wrapper.length).toBe(1)
    })
    
    it('Should render create resource', () => {
        const wrapper = findByTestAttr(component, "createresource-button")
        expect(wrapper.length).toBe(1)
    })

    it("should render tickets table with atleast 7 TableCell", () => {
        const wrapper = findByTestAttr(component, "table-data");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(7);
    });

    it('should not render resource data if no resource data is present', () => {
        const wrapper = findByTestAttr(component, "resourceTable-data")
        expect(wrapper.length).toBe(0)
    })
     
    describe('When Data is Populated', () => {
        beforeEach(() => {
            component = setup();
            component.setProps({
                resourceList
            })
        })
    
        it('should render resource data if resource data is present', () => {
            const wrapper = findByTestAttr(component, "resourceTable-data")
            expect(wrapper.length).toBe(1)
        })

        it('should render resouce name component with text Resource 1', () => {
            const wrapper = findByTestAttr(component, "resource-name")
            expect(wrapper.text()).toBe(resourceList[0].name)
        })

        it('should render resouce memory component with text 10MB', () => {
            const wrapper = findByTestAttr(component, "resource-memory")
            expect(wrapper.text()).toBe(spaceConversion(resourceList[0].memory))
        })

        it('should render resouce cores component with 0.01 CPU', () => {
            const wrapper = findByTestAttr(component, "resource-cores")
            expect(wrapper.text()).toBe(coreConversion(resourceList[0].cores))
        })

        it('should render resource weight component with 10', () => {
            const wrapper = findByTestAttr(component, "resource-weight")
            expect(wrapper.text()).toBe(resourceList[0].weight)
        })

        it('should render active component when active',() => {
            const wrapper = findByTestAttr(component, "active-status")
            expect(wrapper.length).toBe(1)
        })

        it('should not render inactive component', () => {
            const wrapper = findByTestAttr(component, "inactive-status")
            expect(wrapper.length).toBe(0)
        })

        it('should not render active component when active',() => {
            component.setProps({
                resourceList: [{
                    ...resourceList,
                    active: false
                }]
            })
            const wrapper = findByTestAttr(component, "active-status")
            expect(wrapper.length).toBe(0)
        })

        it('should render inactive component', () => {
            component.setProps({
                resourceList: [{
                    ...resourceList,
                    active: false
                }]
            })
            const wrapper = findByTestAttr(component, "inactive-status")
            expect(wrapper.length).toBe(1)
        })

        it('should render edit link component', () => {
            const wrapper = findByTestAttr(component, "edit-link")
            expect(wrapper.length).toBe(1)
        })

        it('should render delete button component', () => {
            const wrapper = findByTestAttr(component, "delete-button")
            expect(wrapper.length).toBe(1)
        })

        it('on clicking delete button handle delete should be called', () => {
            const handleDelete = jest.fn()
            component.instance().handleDelete = handleDelete
            const wrapper = findByTestAttr(component,"delete-button")
            wrapper.props().onClick()
            expect(handleDelete).toHaveBeenCalled()
        })

        it('popup should not be opended intially', () => {
            const wrapper = findByTestAttr(component, "confirm-popup")
            expect(wrapper.props().open).toBeFalsy()
        })

        it('if delete popup is true then only popup should be opened', () => {
            component.setState({
                isDeletePopupOpened: true
            })
            const wrapper = findByTestAttr(component, "confirm-popup")
            expect(wrapper.props().open).toBeTruthy()
        })

        it('when disagree is clicked then then popup should not be visisble', () => {
            const wrapper = findByTestAttr(component, "confirm-popup")
            wrapper.props().handleDisAgree()
            expect(wrapper.props().open).toBeFalsy()
        })
        
        it('when agree is clicked then then delete function should be called', () => {
            const deletePopupAgreeHandler = jest.fn()
            component.instance().deletePopupAgreeHandler = deletePopupAgreeHandler
            const wrapper = findByTestAttr(component, "confirm-popup")
            wrapper.props().handleAgree()
            expect(wrapper.props().open).toBeFalsy()
            expect(deletePopupAgreeHandler).toHaveBeenCalled()
        })
    })
})