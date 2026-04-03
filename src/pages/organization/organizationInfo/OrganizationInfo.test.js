import React from "react";
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../../helpers/utils'
import { OrganizationInfo } from './OrganizationInfo'

configure({ adapter: new Adapter()})

const setup = (props) => {
    const initialProps = {
      classes: {},
      t: jest.fn(),
      ...props,
    };
    return shallow(<OrganizationInfo t={() => ""} {...initialProps} />);
  };

describe('Organization Info Page', () => {
    let component = setup()

    it('should render page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container')
        expect(wrapper.length).toBe(1)
    })

    it('should render the name of organization', () => {
        let organizationComponent = setup({organizationDetailById : {name: "Test Organization"}})
        const wrapper = findByTestAttr(organizationComponent, 'org-name')
        expect(wrapper.text()).toBe("Test Organization")
    })

    it('should not render members component', () => {
        const wrapper = findByTestAttr(component, 'members')
        expect(wrapper.length).toBe(0)
    })

    it('should not render clusters component', () => {
        const wrapper = findByTestAttr(component, 'clusters')
        expect(wrapper.length).toBe(0)
    })

    it('should not render projects component', () => {
        const wrapper = findByTestAttr(component, 'projects')
        expect(wrapper.length).toBe(0)
    })

    it('should render members component', () => {
        let organizationComponent = setup({organizationDetailById : {members: {}}})
        const wrapper = findByTestAttr(organizationComponent, 'members')
        expect(wrapper.length).toBe(1)
    })

    it('should render clusters component', () => {
        let organizationComponent = setup({clustersList: {}})
        const wrapper = findByTestAttr(organizationComponent, 'clusters')
        expect(wrapper.length).toBe(1)
    })

    it('should render projects component', () => {
        let organizationComponent = setup({projectsList: {}})
        const wrapper = findByTestAttr(organizationComponent, 'projects')
        expect(wrapper.length).toBe(1)
    })
})