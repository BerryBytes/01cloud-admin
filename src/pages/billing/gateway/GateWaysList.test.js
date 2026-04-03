import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GateWaysList } from './GateWaysList';
import { findByTestAttr } from '../../../helpers/utils';
import { TableRow, TableHead, TableCell } from '@material-ui/core';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<GateWaysList classes={{}} t={() => {}} {...initialProps} />)
}

const gateway =  {
    icon: "",
    CreatedAt: "2021-07-27T04:50:00.915191Z",
    DeletedAt: null,
    ID: 9,
    UpdatedAt: "2021-07-28T04:09:33.635935Z",
    active: false,
    code: "1144",
    country: "Nepal",
    description: "desc",
    name: "test"
}

describe('GateWays List Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the gateway header with text Gateways List', () => {
        const wrapper = findByTestAttr(component, 'gateways-header');
        expect(wrapper.length).toBe(1)
    })

    it('add button should be rendered', () => {
        const wrapper = findByTestAttr(component, 'add-button');
        expect(wrapper.length).toBe(1)
    })

    it('add popup should not be rendered', () => {
        const wrapper = findByTestAttr(component, 'add-popup');
        expect(wrapper.length).toBe(0)
    })

    it('should render popup when add button is clicked', () => {
        const addButton = findByTestAttr(component, 'add-button');
        addButton.props().onClick()
        const wrapper = findByTestAttr(component, 'add-popup');
        expect(wrapper.length).toBe(1)
    })

    it('no gateway div should be rendered when there is no gateway detail', () => {
        let noGatewayComponent = setup({ gateWaysList: [] })
        const wrapper = findByTestAttr(noGatewayComponent, 'no-gateway');
        expect(wrapper.length).toBe(1)
    })

    it('fetching loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'fetching-loader');
        expect(wrapper.length).toBe(0)
    })

    it('fetching detail loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'fetchingDetail-loader');
        expect(wrapper.length).toBe(0)
    })

    it('adding loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'adding-loader');
        expect(wrapper.length).toBe(0)
    })

    it('updating loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'updating-loader');
        expect(wrapper.length).toBe(0)
    })

    it('fetching loader should rendered only when fetching prop is true', () => {
        let fetchingLoaderComponent = setup({ fetchingGateWaysList: true })
        const wrapper = findByTestAttr(fetchingLoaderComponent, 'fetching-loader');
        expect(wrapper.length).toBe(1)
    })

    it('fetching detail loader should be rendered', () => {
        let fetchingDetailLoaderComponent = setup({ fetchingGateWayDetail: true })
        const wrapper = findByTestAttr(fetchingDetailLoaderComponent, 'fetchingDetail-loader');
        expect(wrapper.length).toBe(1)
    })

    it('adding loader should be rendered ', () => {
        let addingLoaderComponent = setup({ addingGateWay: true })
        const wrapper = findByTestAttr(addingLoaderComponent, 'adding-loader');
        expect(wrapper.length).toBe(1)
    })

    it('updating loader should be rendered', () => {
        let updatingLoaderComponent = setup({ updatingGateWay: true })
        const wrapper = findByTestAttr(updatingLoaderComponent, 'updating-loader');
        expect(wrapper.length).toBe(1)
    })

    it('gateways table should be rendered irrespective of data available', () => {
        const wrapper = findByTestAttr(component, 'gateway-table');
        expect(wrapper.length).toBe(1)
    })

    it("should render gate ways list table with atleast 7 TableCell", () => {
        const wrapper = findByTestAttr(component, "gateway-table");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(TableCell);
        expect(row.length).toBe(7);
    });

    describe('When GateWay Data is Available', () => {
        let getGateWayById = jest.fn();
        beforeEach(() => {
            component = setup({
                gatewaysList: [gateway],
                getGateWayById
            })
        })

        it('should render the edit button', () => {
            const wrapper = findByTestAttr(component,'edit-icon')
            expect(wrapper.length).toBe(1)
        })

        it('get gateway Id should be called if edit is clicked', () => {
            const wrapper = findByTestAttr(component,'edit-icon')
            wrapper.props().onClick()
            expect(getGateWayById).toHaveBeenCalled()
        })

        it('should render active when active is true', () => {
            const wrapper = findByTestAttr(component,'gateway-active')
            expect(wrapper.length).toBe(gateway.active ? 1 : 0)
        })

        it('should render active when active is false', () => {
            const wrapper = findByTestAttr(component,'gateway-inactive')
            expect(wrapper.length).toBe(gateway.active ? 0 : 1)
        })

        it('should render country of gateway', () => {
            const wrapper = findByTestAttr(component,'gateway-country')
            expect(wrapper.text()).toBe(gateway.country)
        })

        it('should render description of gateway', () => {
            const wrapper = findByTestAttr(component,'gateway-description')
            expect(wrapper.text()).toBe(gateway.description)
        })

        it('should render code of gateway', () => {
            const wrapper = findByTestAttr(component,'gateway-code')
            expect(wrapper.text()).toBe(gateway.code)
        })

        it('should render name of gateway', () => {
            const wrapper = findByTestAttr(component,'gateway-name')
            expect(wrapper.text()).toBe(gateway.name)
        })

        it('should render icon of gateway', () => {
            const wrapper = findByTestAttr(component,'gateway-icon')
            expect(wrapper.text()).toBe(gateway.icon)
        })
    })
})