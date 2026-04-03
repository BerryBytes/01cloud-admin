import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../helpers/utils';
import { LoadBalancerDetail } from './LoadBalancerDetail';

configure({ adapter : new Adapter()})

const backToListClickHandler = jest.fn()

const setup = (props) => {
    const initialProps = {
        match: {
            params: {
                lbId: 47
            }
        },
        history: {
            push: backToListClickHandler,
        },
        classes: {},
        t: jest.fn(),
        ...props
    }
    return shallow(<LoadBalancerDetail {...initialProps} />)
}

const lb = {
    "ID": 199,
    "CreatedAt": "2021-09-27T07:42:07.261704Z",
    "UpdatedAt": "2021-09-27T07:42:11.441747Z",
    "DeletedAt": null,
    "name": "test",
    "custom_domain": "",
    "cluster": {
        "ID": 256,
        "CreatedAt": "2021-05-11T04:26:22.530775Z",
        "UpdatedAt": "2021-09-27T07:42:11.437713Z",
        "DeletedAt": null,
        "name": "ovh",
        "context": "",
        "configPath": "/data/config/berrybytes/d30336d9-330f-46f4-b64d-da5c377ff3a4",
        "token": "",
        "region": "default",
        "provider": "ovh",
        "project_name": "",
        "zone": "obh-default",
        "dns_id": 94,
        "labels": "",
        "nodes": 0,
        "pv_capacity": 100,
        "weight": 10,
        "attributes": "",
        "ArgoServerUrl": "zerone-argo.test.01cloud.dev:443",
        "PrometheusServerUrl": "https://zerone-monitoring.test.01cloud.dev",
        "cloud_storage": {
            "provider": "gcp",
            "project_id": "zerone-devops-labs",
            "credentials": "./uploads/json/305ebff1-f0d0-44b2-9c34-f9cba9dd8218.json"
        },
        "image_registry_id": 145,
        "active": true,
        "organization_id": 0,
        "total_memory": 30720,
        "provision_percentage": 0.7,
        "cluster_request": null,
        "cluster_request_id": 0
    },
    "cluster_id": 256,
    "attributes": null,
    "project": {
        "ID": 1258,
        "CreatedAt": "2021-09-27T07:40:47.746416Z",
        "UpdatedAt": "2021-09-27T07:42:11.440403Z",
        "DeletedAt": null,
        "name": "Test",
        "description": "",
        "project_code": "",
        "tags": "",
        "cluster_scope": 0,
        "region": "",
        "logging": "01Logs",
        "monitoring": "Prometheus",
        "base_domain": "",
        "dedicated_lb": true,
        "optimize_cost": false,
        "active": true,
        "attributes": null,
        "subscription_id": 2,
        "variables": null,
        "user": {
            "ID": 189,
            "CreatedAt": "2020-12-17T04:58:59.876732Z",
            "UpdatedAt": "2021-09-27T07:42:11.420718Z",
            "DeletedAt": null,
            "first_name": "Raman",
            "last_name": "Shrestha",
            "email": "raman.shrestha@berrybytes.com",
            "image": "https://storage.googleapis.com/zerone-uploads/images/23f84d68-d1c8-423e-b7fa-3ec48b0650eb.PNG",
            "company": "Zero One Cloud",
            "designation": "Jr Js Dev",
            "password": "$2a$10$m1qq9jhPW1AY9Fgwim8F2e9dLAVlWB9PFj2wC3KxlwNH7k6JlQtUC",
            "email_verified": true,
            "active": true,
            "is_admin": true,
            "address_updated": true
        },
        "user_id": 189,
        "organization_id": 0
    },
    "project_id": 1258
}

describe('LoadBalancer List Component', () => {
    let component = setup()

    it('should render the main container without error', () => {
        const wrapper = findByTestAttr(component, 'main-container')
        expect(wrapper.length).toBe(1)
    })

    it('expect list title to be Environment Associated With LoadBalancer #47', () => {
        const wrapper = findByTestAttr(component, 'list-title')
        expect(wrapper.text()).toBe(" Environment Associated With LoadBalancer#47")
    })

    it('expect list id to be #47', () => {
        const wrapper = findByTestAttr(component, 'list-id')
        expect(wrapper.text()).toBe("#47")
    })

    it('should go back on click', () => {
        const wrapper = findByTestAttr(component, 'list-id')
        wrapper.props().onClick()
        expect(backToListClickHandler).toHaveBeenCalled()
    })

    it('should go back on click', () => {
        const wrapper = findByTestAttr(component, 'back-button')
        wrapper.props().onClick()
        expect(backToListClickHandler).toHaveBeenCalled()
    })

    it('should render no loadbalancers text when no loaad balancers are present', () => {
        component.setProps({
            lbData: []
        })
        const wrapper = findByTestAttr(component, 'no-loadBalancers')
        expect(wrapper.length).toBe(1)
    })

    it('should not render loader when fetching of loader is not done', () => {
        const wrapper = findByTestAttr(component, 'loading-loadBalancers')
        expect(wrapper.length).toBe(0)
    })

    it('should not render loader when fetching of loader is not done', () => {
        component.setProps({
            fetchingUsedLb: true
        })
        const wrapper = findByTestAttr(component, 'loading-loadBalancers')
        expect(wrapper.length).toBe(0)
    })

    describe('When Lb data is present', () => {
        beforeEach(() => {
            component = setup({
                lbData: [lb]
            })
        })

        it('should render no loadbalancers text when no loaad balancers are present', () => {
            const wrapper = findByTestAttr(component, 'no-loadBalancers')
            expect(wrapper.length).toBe(0)
        })

        it('should render the loadbalancer name', () => {
            const wrapper = findByTestAttr(component, 'lb-name')
            expect(wrapper.text()).toBe(lb.name)
        })

        it('should render the text env name', () => {
            const wrapper = findByTestAttr(component, 'lb-env')
            expect(wrapper.text()).toBe("Environment Name")
        })
    })
})