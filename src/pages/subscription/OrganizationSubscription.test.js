import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, spaceConversion, coreConversion } from '../../helpers/utils';
import { OrganizationSubscription, StyledTableCell } from './OrganizationSubscription';
import { TableHead, TableRow } from '@material-ui/core';

configure({ adapter: new Adapter() });

const setup = (props = {}) => {
    const newProps = {
        fetchOrgSubscriptions : jest.fn(),
        updateBreadcrumb: jest.fn(),
        ...props
    };

    return shallow(<OrganizationSubscription classes={{}} t={() => ''} {...newProps} />);
};

const sub = {
    "ID": 3,
    "CreatedAt": "2020-10-16T07:27:53.522509Z",
    "UpdatedAt": "2021-09-23T12:09:17.321101Z",
    "DeletedAt": null,
    "name": "Professional Plan",
    "cluster": "10",
    "memory": 5120,
    "cores": 5000,
    "no_of_user": "50",
    "price": 200,
    "weight": "20",
    "attributes": "",
    "active": true
}

describe('Organization Subscription Container', () => {
    let component = setup()

    it('should render without errors', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1);
    });

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

    it("should render subscription table with atleast 10 TableCell", () => {
        const wrapper = findByTestAttr(component, "table-container");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const cells = rows.find(StyledTableCell);
        expect(cells.length).toBe(10);
    })

    it('should not render fetching loader when fetching subscription is not defined', () => {
        const wrapper = findByTestAttr(component, "fetching-subscription")
        expect(wrapper.length).toBe(0)
    })

    it('should not render deleting loader when deleting subscription is not defined', () => {
        const wrapper = findByTestAttr(component, "deleting-subscription")
        expect(wrapper.length).toBe(0)
    })

    it('should render fetching loader when fetching subscription is defined', () => {
        component.setProps({fetchingSubscription : true})
        const wrapper = findByTestAttr(component, "fetching-subscription")
        expect(wrapper.length).toBe(1)
    })

    it('should render deleting loader when deleting subscription is defined', () => {
        component.setProps({deletingSubscription : true})
        const wrapper = findByTestAttr(component, "deleting-subscription")
        expect(wrapper.length).toBe(1)
    })

    describe('When Organization Subscription is Present',() => {
        beforeEach(() => {
            component = setup({
                orgSubscriptionList: [sub]
            });
        });

        it('should render the name of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-name")
            expect(wrapper.text()).toBe(sub.name)
        })

        it('should render the cluster of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-cluster")
            expect(wrapper.text()).toBe(sub.cluster)
        })

        it('should render the memory of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-memory")
            expect(wrapper.text()).toBe(spaceConversion(sub.memory))
        })

        it('should render the cores of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-cores")
            expect(wrapper.text()).toBe(coreConversion(sub.cores))
        })

        it('should render the users of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-users")
            expect(wrapper.text()).toBe(sub.no_of_user)
        })

        it('should render the price of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-price")
            expect(wrapper.text()).toBe("$"+sub.price)
        })

        it('should render the weight of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-weight")
            expect(wrapper.text()).toBe(sub.weight)
        })

        it('should render active or inactive status of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-active")
            expect(wrapper.length).toBe(sub.active ? 1 : 0)
        })

        it('should render active or inactive status of subscription', () => {
            const wrapper = findByTestAttr(component, "sub-inactive")
            expect(wrapper.length).toBe(sub.active ? 0 : 1)
        })

        it("should render edit icon button on action", () => {
            const wrapper = findByTestAttr(component, "edit-button")
            expect(wrapper.length).toBe(1)
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

    describe('When delete Popup is Open', () => {
        const deletePopupAgreeHandler = jest.fn()
        const deletePopupDisagreeHandler = jest.fn()
        beforeEach(() => {
            component = setup({
               deletePopupAgreeHandler,
               deletePopupDisagreeHandler
            });
        });

        it('should call handleAgree  when called handle Agree is called', () => {
            component.instance().deletePopupAgreeHandler = deletePopupAgreeHandler;
            const wrapper = findByTestAttr(component, 'delete-subscription');
            wrapper.props().handleAgree()
            expect(deletePopupAgreeHandler).toHaveBeenCalled()
        })

        it('should call handleDisAgree  when called handleDisAgree is called', () => {
            component.instance().deletePopupDisagreeHandler = deletePopupDisagreeHandler;
            const wrapper = findByTestAttr(component, 'delete-subscription');
            wrapper.props().handleDisAgree()
            expect(deletePopupDisagreeHandler).toHaveBeenCalled()
        })

        it('should open the delete popup once the delete has been clicked', () => {
            component.setState({ isDeletePopupOpened: true });
            const wrapper = findByTestAttr(component, 'delete-subscription');
            expect(wrapper.props().open).toBeTruthy()
        })
    })
});
