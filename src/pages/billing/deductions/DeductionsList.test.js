import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, getDateInStandardFormat } from '../../../helpers/utils';
import { TableRow, TableHead, TableCell } from '@material-ui/core';
import { DeductionsList } from './DeductionsList'

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<DeductionsList classes={{}} t={() => {}} {...initialProps} />)
}

const deduction = {
    CreatedAt: "2021-07-15T12:08:33.918223Z",
    DeletedAt: null,
    ID: 11,
    UpdatedAt: "2021-08-02T09:15:49.543379Z",
    attributes: "test attr",
    country: "India",
    date: "2022-07-01T06:08:56.736667Z",
    description: "India GST",
    is_percent: true,
    name: "GST",
    value: "18"
}

describe('Deduction List page testing', () => {
    let component = setup({})
    it('should render main component without error', () => {
        const wrapper = findByTestAttr(component, "main-container")
        expect(wrapper.length).toBe(1)
    })

    it('should render the deduction header', () => {
        const wrapper = findByTestAttr(component, 'deduction-header');
        expect(wrapper.length).toBe(1)
    })

    it('should render the add button', () => {
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

    it('deleting loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'deleting-loader');
        expect(wrapper.length).toBe(0)
    })

    it('updating loader should not be rendered initially', () => {
        const wrapper = findByTestAttr(component, 'updating-loader');
        expect(wrapper.length).toBe(0)
    })

    it('fetching loader should rendered only when fetching prop is true', () => {
        let fetchingLoaderComponent = setup({ fetchingDeductionsList: true })
        const wrapper = findByTestAttr(fetchingLoaderComponent, 'fetching-loader');
        expect(wrapper.length).toBe(1)
    })

    it('fetching detail loader should be rendered', () => {
        let fetchingDetailLoaderComponent = setup({ fetchingDeductionDetail: true })
        const wrapper = findByTestAttr(fetchingDetailLoaderComponent, 'fetchingDetail-loader');
        expect(wrapper.length).toBe(1)
    })

    it('adding loader should be rendered ', () => {
        let addingLoaderComponent = setup({ addingDeduction: true })
        const wrapper = findByTestAttr(addingLoaderComponent, 'adding-loader');
        expect(wrapper.length).toBe(1)
    })

    it('deleting loader should be rendered', () => {
        let deletingLoaderComponent = setup({ deletingDeduction: true })
        const wrapper = findByTestAttr(deletingLoaderComponent, 'deleting-loader');
        expect(wrapper.length).toBe(1)
    })

    it('updating loader should be rendered', () => {
        let updatingLoaderComponent = setup({ updatingDeduction: true })
        const wrapper = findByTestAttr(updatingLoaderComponent, 'updating-loader');
        expect(wrapper.length).toBe(1)
    })

    it('no deduction div should be rendered when there is no promo code detail', () => {
        let noDeductionComponent = setup({ deductionsList: [] })
        const wrapper = findByTestAttr(noDeductionComponent, 'no-deduction');
        expect(wrapper.length).toBe(1)
    })

    it('deduction table should be rendered irrespective of data available', () => {
        const wrapper = findByTestAttr(component, 'deduction-table');
        expect(wrapper.length).toBe(1)
    })

    it("should render deduction list table with atleast 7 TableCell", () => {
        const wrapper = findByTestAttr(component, "deduction-table");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(TableCell);
        expect(row.length).toBe(7);
    });

    describe('when deduction data is available', () => {
        let deductionComponent;
        let getDeductionById = jest.fn();
        let deleteDeduction = jest.fn()
        beforeEach(() => {
            deductionComponent = setup({
                deductionsList: [deduction],
                getDeductionById,
                deleteDeduction
            })
        })

        it('should render name of deduction', () => {
            const wrapper = findByTestAttr(deductionComponent,'name-cell')
            expect(wrapper.text()).toBe(deduction.name)
        })

        it('should render value of deduction', () => {
            const wrapper = findByTestAttr(deductionComponent,'value-cell')
            expect(wrapper.text()).toBe(deduction.value)
        })

        it('should render percentage of deduction', () => {
            const wrapper = findByTestAttr(deductionComponent,'percentage-cell')
            expect(wrapper.text()).toBe(deduction.is_percent ? "Active" : "Inactive")
        })

        it('should render country of deduction', () => {
            const wrapper = findByTestAttr(deductionComponent,'country-cell')
            expect(wrapper.text()).toBe(deduction.country)
        })

        it('should render description of deduction', () => {
            const wrapper = findByTestAttr(deductionComponent,'description-cell')
            expect(wrapper.text()).toBe(deduction.description)
        })

        it('should render date of deduction', () => {
            const wrapper = findByTestAttr(deductionComponent,'date-cell')
            expect(wrapper.text()).toBe(getDateInStandardFormat(deduction.date))
        })

        it('get deduction should be called if edit is clicked', () => {
            const wrapper = findByTestAttr(deductionComponent,'edit-icon')
            wrapper.props().onClick()
            expect(getDeductionById).toHaveBeenCalled()
        })

        it('delete deduction should be called if delete is clicked', () => {
            const wrapper = findByTestAttr(deductionComponent,'delete-icon')
            wrapper.props().onClick()
            expect(deleteDeduction).toHaveBeenCalled()
        })
    })
})