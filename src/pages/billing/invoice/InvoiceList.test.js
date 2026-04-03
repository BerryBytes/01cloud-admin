import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, getDateInStandardFormat } from '../../../helpers/utils';
import { TableRow, TableHead, TableCell } from '@material-ui/core';
import { InvoiceList } from './InvoiceList'

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<InvoiceList classes={{}} t={() => {}} {...initialProps} />)
}

const invoiceList =  [{
    createdat: "2021-08-05T06:22:58.293003Z",
    DeletedAt: null,
    id: "945",
    UpdatedAt: "2021-08-05T06:24:12.156415Z",
    is_paid: true,
    promo_amount: 16.77,
    promo_code_id: 0,
    promocode: null,
    remarks: "",
    start_date: "2021-08-04T00:00:00Z",
    sub_total: 16.77,
    total_cost: 16.77,
    title: "Invoice for August 5",
    user: {
        CreatedAt: "2020-12-17T04:58:59.876732Z",
        DeletedAt: null,
        ID: 189,
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

    it('should render the invoice header with text Gateways List', () => {
        const wrapper = findByTestAttr(component, 'invoice-header');
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
        wrapper.props().handleSearchChange("Invoice")
        wrapper = findByTestAttr(component, "search-field")
        expect(wrapper.props().search).toBe("Invoice")
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
    
    it('should render to user field', () => {
        const wrapper = findByTestAttr(component, 'user-field');
        expect(wrapper.length).toBe(1)
    })

    it('expect status field to be rendered', () => {
        const wrapper = findByTestAttr(component, 'status-field');
        expect(wrapper.length).toBe(1)
    })

    it('expect changes to be seen when on change is clicked in status field',() => {
        let wrapper = findByTestAttr(component, "status-field")
        wrapper.props().onChange({ target: { value: "true" } })
        wrapper = findByTestAttr(component, "status-field")
        expect(wrapper.props().value).toBe("true")
    })

    it('fetching loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'fetchingInvoice-loader');
        expect(wrapper.length).toBe(0)
    })

    it('fetching list loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'fetchingInvoiceList-loader');
        expect(wrapper.length).toBe(0)
    })

    it('fetching loader should be rendered', () => {
        component = setup({fetchingInvoiceData: true})
        const wrapper = findByTestAttr(component, 'fetchingInvoice-loader');
        expect(wrapper.length).toBe(1)
    })

    it('fetching list loader should be rendered', () => {
        component = setup({fetchingInvoiceList: true})
        const wrapper = findByTestAttr(component, 'fetchingInvoiceList-loader');
        expect(wrapper.length).toBe(1)
    })

    it('payment summary popup should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'paymentsummary-popup');
        expect(wrapper.length).toBe(0)
    })

    describe("With Some Invoices", () => {
        let getInvoiceById = jest.fn()
        beforeEach(() => {
            component = setup({
                invoiceList: invoiceList,
                getInvoiceById
            })
        });

        it('pagination component should be rendered', () => {
            const wrapper = findByTestAttr(component, 'pagination-component');
            expect(wrapper.length).toBe(1)
        })

        it("should pass correct props to InfiniteScroll", () => {
            const wrapper = findByTestAttr(component, 'pagination-component');
            expect(wrapper.props().dataLength).toBe(invoiceList.length);
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
            expect(wrapper.text()).toBe(invoiceList[0].id)
        })

        it('on Click of invoice id invoce popup should open', () => {
            const wrapper = findByTestAttr(component, 'id-cell');
            wrapper.props().onClick()
            expect(getInvoiceById).toHaveBeenCalled()
        })

        it('should render title of the invoice', () => {
            const wrapper = findByTestAttr(component, 'title-cell');
            expect(wrapper.text()).toBe(invoiceList[0].title)
        })

        it('on Click of title invoce popup should open', () => {
            const wrapper = findByTestAttr(component, 'title-cell');
            wrapper.props().onClick()
            expect(getInvoiceById).toHaveBeenCalled()
        })

        it('should render generated date of the invoice', () => {
            const wrapper = findByTestAttr(component, 'created-cell');
            expect(wrapper.text()).toBe(getDateInStandardFormat(invoiceList[0].createdat))
        })

        it('should render user name to which invoice is associated', () => {
            const wrapper = findByTestAttr(component, 'user-cell');
            expect(wrapper.text()).toBe(invoiceList[0].user.first_name + " "+ invoiceList[0].user.last_name)
        })

        it('should render cost of the invoice', () => {
            const wrapper = findByTestAttr(component, 'cost-cell');
            expect(wrapper.text()).toBe("$ "+ invoiceList[0].total_cost)
        })

        it('should render active when active is true', () => {
            const wrapper = findByTestAttr(component,'active-cell')
            expect(wrapper.length).toBe(invoiceList[0].is_paid ? 1 : 0)
        })

        it('should render active when active is false', () => {
            const wrapper = findByTestAttr(component,'inactive-cell')
            expect(wrapper.length).toBe(invoiceList[0].is_paid ? 0 : 1)
        })

        it('should not render no invoice component', () => {
            const wrapper = findByTestAttr(component,'no-invoice')
            expect(wrapper.length).toBe(0)
        })

        it('should render no invoice component', () => {
            component = setup({
                invoiceList: []
            })
            const wrapper = findByTestAttr(component,'no-invoice')
            expect(wrapper.length).toBe(1)
        })
    })
})