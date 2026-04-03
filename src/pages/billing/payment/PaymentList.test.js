import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, getDateInStandardFormat } from '../../../helpers/utils';
import { TableRow, TableHead, TableCell } from '@material-ui/core';
import { PaymentList } from './PaymentList'

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<PaymentList classes={{}} t={() => {}} {...initialProps} />)
}

const paymentsList = [{
    createdat: "2021-08-05T06:22:58.305847Z",
    DeletedAt: null,
    id: "540",
    UpdatedAt: "2021-08-05T06:24:12.149639Z",
    amount: 2.18,
    gateway: null,
    gateway_id: 4,
    invoice: null,
    invoice_id: 945,
    mode: "instant",
    status: "success",
    title: "Payment for invoice #945",
    user: {
        createdat: "2020-12-17T04:58:59.876732Z",
        DeletedAt: null,
        id: 189,
        UpdatedAt: "2021-08-05T06:22:58.300098Z",
        active: true,
        first_name: "Raman",
        last_name: "Shrestha"
    }
}]

describe('Invoice List Page Testig', () => {
    let component = setup({})
    it('should render main component without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })

    it('should render the invoice header with text Payments List', () => {
        const wrapper = findByTestAttr(component, 'payments-header');
        expect(wrapper.length).toBe(1)
    })

    it('should not render reset button initially', () => {
        const wrapper = findByTestAttr(component, 'reset-button');
        expect(wrapper.length).toBe(0)
    })

    it('should render search field', () => {
        const wrapper = findByTestAttr(component, 'search-field');
        expect(wrapper.length).toBe(1)
    })

    it('expect changes to be seen when on change is clicked in status field',() => {
        let wrapper = findByTestAttr(component, "search-field")
        wrapper.props().handleSearchChange("Payments")
        wrapper = findByTestAttr(component, "search-field")
        expect(wrapper.props().search).toBe("Payments")
    })

    it('should render from Date field', () => {
        const wrapper = findByTestAttr(component, 'fromDate-field');
        expect(wrapper.length).toBe(1)
    })

    it('expect changes to be seen when on change is clicked in fromDate field',() => {
        let wrapper = findByTestAttr(component, "fromDate-field")
        wrapper.props().onChange({ target: { value: "2021-08-05" } })
        wrapper = findByTestAttr(component, "fromDate-field")
        expect(wrapper.props().value).toBe("2021-08-05")
    })

    it('should render to Date field', () => {
        const wrapper = findByTestAttr(component, 'toDate-field');
        expect(wrapper.length).toBe(1)
    })

    it('expect changes to be seen when on change is clicked in toDate field',() => {
        let wrapper = findByTestAttr(component, "toDate-field")
        wrapper.props().onChange({ target: { value: "2021-08-05" } })
        wrapper = findByTestAttr(component, "toDate-field")
        expect(wrapper.props().value).toBe("2021-08-05")
    })

    it('expect status field to be rendered', () => {
        const wrapper = findByTestAttr(component, 'status-field');
        expect(wrapper.length).toBe(1)
    })

    it('expect changes to be seen when on change is clicked in status field',() => {
        let wrapper = findByTestAttr(component, "status-field")
        wrapper.props().onChange({ target: { value: "success" } })
        wrapper = findByTestAttr(component, "status-field")
        expect(wrapper.props().value).toBe("success")
    })

    it('fetching loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'payments-loader');
        expect(wrapper.length).toBe(0)
    })

    it('fetching loader should not be rendered initially', () => {
        component = setup({
            fetchingPaymentsList: true
        })
        const wrapper = findByTestAttr(component, 'payments-loader');
        expect(wrapper.length).toBe(1)
    })

    describe("With Some Payments", () => {
        beforeEach(() => {
            component = setup({
                paymentsList: paymentsList
            })
        });

        it('pagination component should be rendered', () => {
            const wrapper = findByTestAttr(component, 'pagination-component');
            expect(wrapper.length).toBe(1)
        })

        it("should pass correct props to InfiniteScroll", () => {
            const wrapper = findByTestAttr(component, 'pagination-component');
            expect(wrapper.props().dataLength).toBe(paymentsList.length);
        });

        it("should render table with 6 cells", () => {
            const wrapper = findByTestAttr(component, 'table-field');
            const head = wrapper.find(TableHead);
            const rows = head.find(TableRow);
            const row = rows.find(TableCell);
            expect(row.length).toBe(6);
        });

        it('should render id of first component', () => {
            const wrapper = findByTestAttr(component, 'id-cell');
            expect(wrapper.text()).toBe(paymentsList[0].id)
        })

        it('should render title of the payment', () => {
            const wrapper = findByTestAttr(component, 'title-cell');
            expect(wrapper.text()).toBe(paymentsList[0].title)
        })

        it('should render generated date of the payment', () => {
            const wrapper = findByTestAttr(component, 'created-cell');
            expect(wrapper.text()).toBe(getDateInStandardFormat(paymentsList[0].createdat))
        })

        it('should render user name to which payment is associated', () => {
            const wrapper = findByTestAttr(component, 'user-cell');
            expect(wrapper.text()).toBe(paymentsList[0].user.first_name + " "+ paymentsList[0].user.last_name)
        })

        it('should render cost of the payment', () => {
            const wrapper = findByTestAttr(component, 'amount-cell');
            expect(wrapper.text()).toBe("$ "+ paymentsList[0].amount)
        })

        it('should render status of the payment', () => {
            const wrapper = findByTestAttr(component, 'status-cell');
            expect(wrapper.text()).toBe(paymentsList[0].status)
        })

        it('should render no payments component', () => {
            component = setup({
                paymentsList: []
            })
            const wrapper = findByTestAttr(component,'no-payments')
            expect(wrapper.length).toBe(1)
        })
    })
})