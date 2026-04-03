import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PromoCodeList  } from './PromoCodeList';
import { findByTestAttr, getDateInStandardFormat } from '../../../helpers/utils';
import { TableRow, TableHead, TableCell } from '@material-ui/core';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        ...props
    }
    return shallow(<PromoCodeList classes={{}} t={() => {}} {...initialProps} />)
}

const promoCode =  {
    createdat: "2021-08-02T12:20:33.614628Z",
    DeletedAt: null,
    id: 71,
    UpdatedAt: "2021-08-03T05:50:40.595237Z",
    active: true,
    code: "t",
    count: "10",
    discount: 50,
    expiry_date: "2021-08-20T00:00:00Z",
    is_percent: true,
    limit: "50",
    title: "test ok",
}

describe('Promo Code List Testing', () => {
    let component = setup({});
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the promo code header with text Promo Codes', () => {
        const wrapper = findByTestAttr(component, 'promocode-header');
        expect(wrapper.length).toBe(1)
    })

    it('should not render reset button initially', () => {
        const wrapper = findByTestAttr(component, 'reset-button');
        expect(wrapper.length).toBe(0)
    })

    it('expect search field component to be rendered', () => {
        const wrapper = findByTestAttr(component, 'search-field');
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
        let fetchingLoaderComponent = setup({ fetchingPromoCodes: true })
        const wrapper = findByTestAttr(fetchingLoaderComponent, 'fetching-loader');
        expect(wrapper.length).toBe(1)
    })

    it('fetching detail loader should be rendered', () => {
        let fetchingDetailLoaderComponent = setup({ fetchingPromoCodeDetail: true })
        const wrapper = findByTestAttr(fetchingDetailLoaderComponent, 'fetchingDetail-loader');
        expect(wrapper.length).toBe(1)
    })

    it('adding loader should be rendered ', () => {
        let addingLoaderComponent = setup({ addingPromoCode: true })
        const wrapper = findByTestAttr(addingLoaderComponent, 'adding-loader');
        expect(wrapper.length).toBe(1)
    })

    it('updating loader should be rendered', () => {
        let updatingLoaderComponent = setup({ updatingPromoCode: true })
        const wrapper = findByTestAttr(updatingLoaderComponent, 'updating-loader');
        expect(wrapper.length).toBe(1)
    })

    it('no promocode div should be rendered when there is no promo code detail', () => {
        let noPromoCodeComponent = setup({ promoCodesList: [] })
        const wrapper = findByTestAttr(noPromoCodeComponent, 'no-promocode');
        expect(wrapper.length).toBe(1)
    })

    it('promocode table should be rendered irrespective of data available', () => {
        const wrapper = findByTestAttr(component, 'promocode-table');
        expect(wrapper.length).toBe(1)
    })

    it("should render promo codes list table with atleast 9 TableCell", () => {
        const wrapper = findByTestAttr(component, "promocode-table");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(TableCell);
        expect(row.length).toBe(9);
    });

    describe('when promocode data is available', () => {
        let promoCodeComponent;
        let getPromoCodeDetail = jest.fn();
        beforeEach(() => {
            promoCodeComponent = setup({
                promoCodesList: [promoCode],
                getPromoCodeDetail
            })
        })
        
        it('should render title of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-title')
            expect(wrapper.text()).toBe(promoCode.title)
        })

        it('should render code of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-code')
            expect(wrapper.text()).toBe(promoCode.code)
        })

        it('should render created date of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-createdAt')
            expect(wrapper.text()).toBe(getDateInStandardFormat(promoCode.createdat))
        })

        it('should render expiry date of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-expirydate')
            expect(wrapper.text()).toBe(getDateInStandardFormat(promoCode.expiry_date))
        })

        it('should render percentage of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-percentage')
            expect(wrapper.text()).toBe(promoCode.is_percent ? promoCode.discount + " %" : promoCode.discount)
        })

        it('should render limit of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-limit')
            expect(wrapper.text()).toBe(promoCode.limit)
        })

        it('should render count of promo code', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-count')
            expect(wrapper.text()).toBe(promoCode.count)
        })

        it('should render active when active is true', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-active')
            expect(wrapper.length).toBe(promoCode.active ? 1 : 0)
        })

        it('should render active when active is false', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'promocode-inactive')
            expect(wrapper.length).toBe(promoCode.active ? 0 : 1)
        })

        it('should render the edit button', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'edit-icon')
            expect(wrapper.length).toBe(1)
        })

        it('get promocode should be called if edit is clicked', () => {
            const wrapper = findByTestAttr(promoCodeComponent,'edit-icon')
            wrapper.props().onClick()
            expect(getPromoCodeDetail).toHaveBeenCalled()
        })
    })
})