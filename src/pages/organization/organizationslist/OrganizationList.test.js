import React from "react";
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../../helpers/utils'
import { OrganizationsList } from './OrganizationsList'

configure({ adapter: new Adapter()})

const setup = (props) => {
    const initialProps = {
      getOrganizationList: jest.fn(),
      classes: {},
      t: jest.fn(),
      ...props,
    };
    return shallow(<OrganizationsList t={() => ""} {...initialProps} />);
  };

describe('Organization List Page', () => {
    let component = setup()

    it('should render page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container')
        expect(wrapper.length).toBe(1)
    })

    it('page title should be organization list', () => {
        const wrapper = findByTestAttr(component, 'page-title')
        expect(wrapper.text()).toBe("Organization List")
    })

    it('should render data table withoud error', () => {
        const wrapper = findByTestAttr(component, 'data-table')
        expect(wrapper.length).toBe(1)
    })
})