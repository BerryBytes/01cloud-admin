import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, spaceConversion, coreConversion } from '../../../helpers/utils';
import { Row } from './ProjectInfo';
import { TableHead, TableCell } from "@material-ui/core";

configure({ adapter : new Adapter()})

const row = {
    name: "Demo",
    environments: [{
        name: "Test",
        replicas: "1",
        resource: {
            memory: 1,
            cores: 1
        }
    }],
    total_memory: 10,
    total_cores: 10,
    active: true
}

const setup = (props) => {
    const initialProps = {
        row: row,
        classes: {},
        t: jest.fn(),
        ...props
    }
    return shallow(<Row {...initialProps} />)
}

describe('Row component Component', () => {
    let component = setup()

    it('should render name of project', () => {
        const wrapper = findByTestAttr(component, 'name')
        expect(wrapper.text()).toBe(row.name)
    })

    it('should render environments of project', () => {
        const wrapper = findByTestAttr(component, 'environments')
        expect(wrapper.length).toBe(1)
    })

    it('should render total memory of project', () => {
        const wrapper = findByTestAttr(component, 'memory')
        expect(wrapper.text()).toBe(spaceConversion(row.total_memory))
    })

    it('should render total cores of project', () => {
        const wrapper = findByTestAttr(component, 'cores')
        expect(wrapper.text()).toBe(coreConversion(row.total_cores))
    })

    it('should render status of project', () => {
        const wrapper = findByTestAttr(component, 'active')
        expect(wrapper.text()).toBe(row.active ? "Active" : "Inactive")
    })

    it('should render icon button of project', () => {
        const wrapper = findByTestAttr(component, 'icon-button')
        expect(wrapper.length).toBe(1)
    })

    it('should open collapse on click', () => {
        const wrapper = findByTestAttr(component, 'icon-button')
        wrapper.props().onClick()
        const collapse = findByTestAttr(component, 'collapse')
        expect(collapse.props().in).toBeTruthy()
    })

    it('should name of env of the project', () => {
        const wrapper = findByTestAttr(component, 'env-name')
        expect(wrapper.text()).toBe("Environments")
    })

    it("should render 5 columns inside TableHead", () => {
        const wrapper = findByTestAttr(component, "env-table")
        const head = wrapper.find(TableHead)
        const cells = head.find(TableCell)
        expect(cells.length).toBe(5)
    })

    it('should render total memory of environment', () => {
        const wrapper = findByTestAttr(component, 'env-memory')
        expect(wrapper.text()).toBe(spaceConversion(row.environments[0].resource.memory))
    })

    it('should render total replicas of environment', () => {
        const wrapper = findByTestAttr(component, 'env-replicas')
        expect(wrapper.text()).toBe((row.environments[0].replicas))
    })

    it('should render total name of environment', () => {
        const wrapper = findByTestAttr(component, 'environment-name')
        expect(wrapper.text()).toBe((row.environments[0].name))
    })

    it('should render total cores of environment', () => {
        const wrapper = findByTestAttr(component, 'env-cores')
        expect(wrapper.text()).toBe(coreConversion(row.environments[0].resource.cores))
    })
})