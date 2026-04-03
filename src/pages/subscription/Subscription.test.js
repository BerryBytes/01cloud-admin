import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../helpers/utils';
import { Subscription, StyledTableCell } from './Susbcription';
import { TableHead, TableRow } from '@material-ui/core';

configure({ adapter: new Adapter() });

const fetchSubscriptions = jest.fn()
const deleteSubscription = jest.fn()
const pushFunction = jest.fn()

const setUp = (props = {}) => {
    const newProps = {
        fetchSubscriptions,
        deleteSubscription,
        updateBreadcrumb: jest.fn(),
        history: {
            push: pushFunction,
        },
        ...props
    };

    const component = shallow(<Subscription classes={{}} t={() => ''} {...newProps} />);

    component.setState({
        subscriptionList: null,
        isDeletePopupOpened: false,
        selectedSubID: undefined,
    })
    return component;
};

const mountSetup = (props = {}) => {
    const newProps = {
        fetchSubscriptions,
        deleteSubscription,
        updateBreadcrumb: jest.fn(),
        ...props
    };

    const component = mount(<Subscription classes={{}} t={() => ''} {...newProps} />);

    component.setState({
        subscriptionList: null,
        isDeletePopupOpened: false,
        selectedSubID: undefined,
    })
    return component;
};

const subscriptionList = [
    {
        ID: 1,
        CreatedAt: '2020-04-29T01:37:25.030451Z',
        UpdatedAt: '2021-05-27T05:09:29.845781Z',
        DeletedAt: null,
        name: 'Starter Plan',
        apps: 2,
        disk_space: 10240,
        memory: 1024,
        cores: 1000,
        data_transfer: 10240,
        price: 0,
        weight: 20,
        attributes: '',
        active: true,
        cron_job: 10,
        backups: 5,
        resource_list: { pods: '50', secrets: '50', services: '50' },
        organization_id: 0,
        load_balancer: 0
    },
    {
        ID: 2,
        CreatedAt: '2020-04-29T01:38:05.162866Z',
        UpdatedAt: '2021-05-17T05:53:24.95374Z',
        DeletedAt: null,
        name: 'Professional Plan',
        apps: 4,
        disk_space: 20480,
        memory: 2048,
        cores: 2000,
        data_transfer: 20480,
        price: 10,
        weight: 10,
        attributes: '',
        active: true,
        cron_job: 10,
        backups: 10,
        resource_list: { pods: '50', secrets: '50', services: '50' },
        organization_id: 0,
        load_balancer: 3
    },
    {
        ID: 33,
        CreatedAt: '2020-08-22T07:22:52.45931Z',
        UpdatedAt: '2021-05-28T07:32:48.684442Z',
        DeletedAt: null,
        name: 'Advanced Plan',
        apps: 20,
        disk_space: 51200,
        memory: 5120,
        cores: 5000,
        data_transfer: 51200,
        price: 20,
        weight: 10,
        attributes: '',
        active: true,
        cron_job: 10,
        backups: 15,
        resource_list: { pods: '100', secrets: '100', services: '100' },
        organization_id: 0,
        load_balancer: 5
    }
];

describe('Support Container', () => {
    let component

    beforeEach(() => {
        component = setUp()
    })

    it('should render without errors', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1);
    });

    it("should fetch subscription on mount", () => {
        component = mountSetup()
        expect(fetchSubscriptions).toHaveBeenCalled()
    })

    it("should render header text", () => {
        const wrapper = findByTestAttr(component, "header-text")
        expect(wrapper.length).toBe(1)
    })

    it("should render create subscription button", () => {
        const wrapper = findByTestAttr(component, "create-sub-button")
        expect(wrapper.length).toBe(1)
    })

    it("create subscription button click should call create subscription function", () => {
        const handleCreateSubscription = jest.fn()
        const wrapper = findByTestAttr(component, "create-sub-button")
        component.instance().handleCreateSubscription = handleCreateSubscription
        wrapper.props().onClick()
        expect(handleCreateSubscription).toHaveBeenCalled()
    })

    it("create subscription button click should call history push", () => {
        const wrapper = findByTestAttr(component, "create-sub-button")
        wrapper.props().onClick()
        expect(pushFunction).toHaveBeenCalled()
    })

    it("should render table container", () => {
        const wrapper = findByTestAttr(component, "table-container")
        expect(wrapper.length).toBe(1)
    })

    it("should render 11 columns inside TableHead", () => {
        const wrapper = findByTestAttr(component, "table-container")
        const head = wrapper.find(TableHead)
        const cells = head.find(StyledTableCell)
        expect(cells.length).toBe(11)
    })

    it("shouldn't render subscriptions container if no subscriptionsList as prop or has length 0", () => {
        const wrapper = findByTestAttr(component, "table-container")
        const cells = findByTestAttr(wrapper, "subscriptions-list")
        expect(cells.length).toBe(0)
    })
    describe("subscriptions list as prop", () => {
        beforeEach(() => {
            component = setUp({
                subscriptionList
            })
        })

        it("should render subscriptions container same as length of subscriptionList", () => {
            const wrapper = findByTestAttr(component, "table-container")
            const cells = findByTestAttr(wrapper, "subscriptions-list")
            expect(cells.length).toBe(subscriptionList.length)
        })

        it("should render delete icon button on action", () => {
            const wrapper = findByTestAttr(component, "table-container")
            const row = findByTestAttr(wrapper, "subscriptions-list").at(0)
            const cell = findByTestAttr(row, "actions-container");
            const delButton = findByTestAttr(cell, "delete-button")
            expect(delButton.length).toBe(1)
        })

        it("delete icon button click should call handle Delete", () => {
            const handleDelete = jest.fn()
            component.instance().handleDelete = handleDelete
            const wrapper = findByTestAttr(component, "table-container")
            const row = findByTestAttr(wrapper, "subscriptions-list").at(0)
            const cell = findByTestAttr(row, "actions-container");
            const delButton = findByTestAttr(cell, "delete-button")
            delButton.props().onClick(1)
            expect(handleDelete).toHaveBeenCalled()
        })

        it("delete icon button click should set isDeletePopupOpend to true", () => {
            const wrapper = findByTestAttr(component, "table-container")
            const row = findByTestAttr(wrapper, "subscriptions-list").at(0)
            const cell = findByTestAttr(row, "actions-container");
            const delButton = findByTestAttr(cell, "delete-button")
            delButton.props().onClick(1)
            expect(component.state().isDeletePopupOpened).toBe(true)
        })
    })

    it("should render tickets table with atleast 11 TableCell", () => {
        const wrapper = findByTestAttr(component, "table-container");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const cells = rows.find(StyledTableCell);
        expect(cells.length).toBe(11);
        const sn = cells.findWhere((r) => r.text() === "S.N");
        expect(sn.length).toBeGreaterThanOrEqual(1);
        const name = cells.findWhere((r) => r.text() === "Name");
        expect(name.length).toBeGreaterThanOrEqual(1);
        const disk_space = cells.findWhere((r) => r.text() === "Disk Space");
        expect(disk_space.length).toBeGreaterThanOrEqual(1);
        const memory = cells.findWhere((r) => r.text() === "Memory");
        expect(memory.length).toBeGreaterThanOrEqual(1);
        const cores = cells.findWhere((r) => r.text() === "Cores");
        expect(cores.length).toBeGreaterThanOrEqual(1);
        const dataTransfer = cells.findWhere((r) => r.text() === "Data Transfers");
        expect(dataTransfer.length).toBeGreaterThanOrEqual(1);
        const backups = cells.findWhere((r) => r.text() === "No of Backups");
        expect(backups.length).toBeGreaterThanOrEqual(1);
        const price = cells.findWhere((r) => r.text() === "Price");
        expect(price.length).toBeGreaterThanOrEqual(1);
        const apps = cells.findWhere((r) => r.text() === "Apps");
        expect(apps.length).toBeGreaterThanOrEqual(1);
        const status = cells.findWhere((r) => r.text() === "Status");
        expect(status.length).toBeGreaterThanOrEqual(1);
        const field = cells.findWhere((r) => r.text() === "");
        expect(field.length).toBeGreaterThanOrEqual(1);
    });
});
