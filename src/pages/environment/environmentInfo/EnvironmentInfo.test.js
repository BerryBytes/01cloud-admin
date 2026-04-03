import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { EnvironmentInfo } from './EnvironmentInfo';
import { findByTestAttr } from '../../../helpers/utils';

configure({ adapter: new Adapter() })

const environmentDetails = {
    "ID": 3549,
    "CreatedAt": "2021-04-29T07:02:53.639713Z",
    "UpdatedAt": "2021-04-29T07:02:53.639713Z",
    "DeletedAt": null,
    "name": "dev",
    "application": {
        "ID": 1753,
        "CreatedAt": "2021-04-29T07:01:53.218289Z",
        "UpdatedAt": "2021-04-29T07:02:54.479958Z",
        "DeletedAt": null,
        "name": "test-ghost-app",
        "project": {
            "ID": 1151,
            "CreatedAt": "2021-04-23T05:31:32.540623Z",
            "UpdatedAt": "2021-07-28T12:17:26.758415Z",
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
            "dedicated_lb": false,
            "optimize_cost": false,
            "active": true,
            "attributes": null,
            "subscription": {
                "ID": 185,
                "CreatedAt": "2021-03-02T06:05:24.212856Z",
                "UpdatedAt": "2021-07-28T12:17:26.752779Z",
                "DeletedAt": null,
                "name": "Default",
                "apps": 10,
                "disk_space": 10240,
                "memory": 2048,
                "cores": 2000,
                "data_transfer": 10240,
                "price": 0,
                "weight": 10,
                "attributes": "",
                "active": true,
                "cron_job": 5,
                "backups": 5,
                "resource_list": null,
                "organization_id": 160,
                "load_balancer": 0
            },
            "subscription_id": 185,
            "variables": null,
            "user": {
                "ID": 197,
                "CreatedAt": "2021-02-26T08:30:37.709994Z",
                "UpdatedAt": "2021-10-22T06:38:03.362254Z",
                "DeletedAt": null,
                "first_name": "Laxmikanth",
                "last_name": "kande",
                "email": "laxmikanth@berrybytes.com",
                "company": "Berrybytes",
                "designation": "Developer",
                "password": "$2a$10$eir3bvnQHJN1MzfMhFNwC.V/qbvPe4jX5zpWpE7pycUOsXB46U18.",
                "email_verified": true,
                "active": true,
                "is_admin": true,
                "address_updated": true
            },
            "user_id": 197,
            "organization": {
                "ID": 160,
                "CreatedAt": "2021-03-02T06:05:24.206921Z",
                "UpdatedAt": "2021-09-23T12:01:29.799439Z",
                "DeletedAt": null,
                "name": "BB",
                "description": "",
                "domain": "",
                "image": "https://api.test.01cloud.dev/uploads/image/png/12ce8903-c20f-4d9f-b354-a914465743d4.png",
                "user": null,
                "user_id": 197,
                "organization_plan_id": 3,
                "Plugins": null,
                "Members": null
            },
            "organization_id": 160
        },
        "project_id": 1151,
        "plugin": {
            "ID": 35,
            "CreatedAt": "2020-06-09T10:44:00.926099Z",
            "UpdatedAt": "2021-10-22T06:38:03.300731Z",
            "DeletedAt": null,
            "name": "ghost",
            "description": "Publish online, build a business, work from home",
            "source_url": "https://ghost.org",
            "image": "https://api.test.01cloud.dev/uploads/image/png/0a66eaac-c49f-4959-83ba-c2c19faa984c.png",
            "active": true,
            "support_ci": false,
            "min_cpu": 500,
            "min_memory": 512,
            "is_add_on": false,
            "service_detail": null,
            "AddOns": null,
            "attributes": "",
            "Categories": null
        },
        "plugin_id": 35,
        "cluster": {
            "ID": 249,
            "CreatedAt": "2021-04-29T03:57:29.26969Z",
            "UpdatedAt": "2021-09-15T10:07:53.647481Z",
            "DeletedAt": null,
            "name": "zeroone",
            "context": "",
            "configPath": "/data/config/bb-160/kubeconfig",
            "token": "",
            "region": "us-east-2",
            "provider": "aws",
            "project_name": "",
            "zone": "us-east-2",
            "dns_id": 88,
            "labels": "",
            "nodes": 0,
            "pv_capacity": 20,
            "weight": 10,
            "attributes": "",
            "ArgoServerUrl": "zerone-argo.01cloud.cf:443",
            "PrometheusServerUrl": "https://zerone-monitoring.01cloud.cf",
            "cloud_storage": {
                "region": "us-east-2",
                "provider": "aws",
                "access_key": "AKIAUXPRR6NNOCSBVJGG",
                "secret_key": "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"
            },
            "image_registry_id": 0,
            "active": false,
            "organization": {
                "ID": 160,
                "CreatedAt": "2021-03-02T06:05:24.206921Z",
                "UpdatedAt": "2021-09-23T12:01:29.799439Z",
                "DeletedAt": null,
                "name": "BB",
                "description": "",
                "domain": "",
                "image": "https://api.test.01cloud.dev/uploads/image/png/12ce8903-c20f-4d9f-b354-a914465743d4.png",
                "user": null,
                "user_id": 197,
                "organization_plan_id": 3,
                "Plugins": null,
                "Members": null
            },
            "organization_id": 160,
            "total_memory": 30720,
            "provision_percentage": 0.7,
            "cluster_request": null,
            "cluster_request_id": 0
        },
        "cluster_id": 249,
        "chart": null,
        "owner": null,
        "owner_id": 188,
        "git_repository_info": null,
        "git_repository": "",
        "git_repo_url": null,
        "git_token": "",
        "git_service": "",
        "image_url": "",
        "image_namespace": "",
        "image_repo": "",
        "image_service": "",
        "service_type": 0,
        "variables": "",
        "active": true,
        "attributes": ""
    },
    "application_id": 1753,
    "resource": {
        "ID": 178,
        "CreatedAt": "2021-03-02T06:05:24.216483Z",
        "UpdatedAt": "2021-04-29T07:02:54.481678Z",
        "DeletedAt": null,
        "name": "Default",
        "cores": 500,
        "memory": 512,
        "active": true,
        "weight": 10,
        "attributes": "",
        "organization_id": 160
    },
    "resource_id": 178,
    "plugin_version": {
        "ID": 374,
        "CreatedAt": "2021-03-23T11:01:40.974895Z",
        "UpdatedAt": "2021-05-18T03:25:53.514502Z",
        "DeletedAt": null,
        "plugin": {
            "ID": 35,
            "CreatedAt": "2020-06-09T10:44:00.926099Z",
            "UpdatedAt": "2021-10-22T06:38:03.300731Z",
            "DeletedAt": null,
            "name": "ghost",
            "description": "Publish online, build a business, work from home",
            "source_url": "https://ghost.org",
            "image": "https://api.test.01cloud.dev/uploads/image/png/0a66eaac-c49f-4959-83ba-c2c19faa984c.png",
            "active": true,
            "support_ci": false,
            "min_cpu": 500,
            "min_memory": 512,
            "is_add_on": false,
            "service_detail": null,
            "AddOns": null,
            "attributes": "",
            "Categories": null
        },
        "plugin_id": 35,
        "version": "1.6.20",
        "url": "/data/plugin/ghost/1.6.20",
        "change_logs": "- update",
        "attributes": "",
        "released": "2021-03-23T11:01:40.962699Z",
        "active": true,
        "versions": null
    },
    "plugin_version_id": 374,
    "replicas": 1,
    "git_url": "",
    "git_repository_info": null,
    "git_branch": "",
    "image_tag": "",
    "image_url": "",
    "service_type": 0,
    "variables": {
        "mariadb": {
            "db": {
                "pass": "f1ee6fe8-f82c-4a8a-8496-c7dad6327edc",
                "user": "mariadb_user",
                "database": "wp_database"
            },
            "rootUser": {
                "password": "ad846955-92b1-442f-963e-2017dedfdd57"
            }
        },
        "clients_fqdn": ""
    },
    "version": {
        "tag": "3.19.2",
        "info": [
            {
                "icon": "https://usefulangle.com/img/thumb/nodejs.png",
                "name": "node",
                "version": "v10.21.0"
            }
        ],
        "name": "3.19.2",
        "repo": "zeronecloud/ghost",
        "released": "June 12, 2020"
    },
    "other_version": [
        {
            "tag": "10.1",
            "info": [
                {
                    "icon": "https://mariadb.com/wp-content/uploads/2019/11/mariadb-logo_blue-transparent-300x75.png",
                    "name": "mariadb",
                    "version": "10.1"
                }
            ],
            "name": "10.1",
            "repo": "zeronecloud/mariadb",
            "released": "March 31, 2015",
            "deployment_name": "mariadb"
        }
    ],
    "user_variables": [],
    "active": false,
    "apply_immediately": false,
    "attributes": null,
    "repository_image": null,
    "ci_request": null,
    "hpa_scaler": {
        "enabled": false,
        "metrics": [
            {
                "name": "memory",
                "average_utilization": 50
            },
            {
                "name": "cpu",
                "average_utilization": 50
            }
        ],
        "max_replicas": 1,
        "min_replicas": 1,
        "scale_up_rule": null,
        "scale_down_rule": null
    },
    "Storage": [],
    "CronJob": [],
    "InitContainers": [],
    "load_balancer": null,
    "deployment_strategy": null,
    "load_balancer_id": 0,
    "parent": null,
    "parent_id": 0,
    "action": "",
    "scripts": {
        "run": "",
        "build": ""
    }
}

const setup = (props = {}) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        fetchEnvDetails: jest.fn(),
        fetchEnvironmentStateInitiate: jest.fn(),
        fetchEnvironmentInsights: jest.fn(),
        match: {
            params: {
                eId: 47
        }
    },
        ...props
    }
    return shallow(<EnvironmentInfo classes={{}} t={() => {}} {...initialProps} />)
}

describe('Environment Info Page Testing', () => {
    let component = setup({})
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    describe('when environment details is present', () => {
        beforeEach(() => {
          component = setup({
            environmentDetails: environmentDetails
          });
        });

        it('should render project icon if there is project image', () => {
            const wrapper = findByTestAttr(component, 'project-icon')
            expect(wrapper.length).toBe(0)
        })

        it('should render square icon if there is no project image', () => {
            const wrapper = findByTestAttr(component, 'square-icon')
            expect(wrapper.length).toBe(1)
        })

        it('should render name of environment', () => {
            const wrapper = findByTestAttr(component, 'environment-name')
            expect(wrapper.text()).toBe(environmentDetails.name)
        })

        it('should render name of application in the environment', () => {
            const wrapper = findByTestAttr(component, 'application-name')
            expect(wrapper.text()).toBe(environmentDetails.application.name)
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let nameField = findByTestAttr(component, "pod-status");
            nameField.simulate("change", { target: { value: "pod1" }  });
            nameField = findByTestAttr(component, "pod-status");
            expect(nameField.props().value).toBe("pod1");
        })

        it('when on change event is fired the changes should incur in the UI', () => {
            let nameField = findByTestAttr(component, "duration-change");
            nameField.simulate("change", { target: { value: "Hour" }  });
            nameField = findByTestAttr(component, "duration-change");
            expect(nameField.props().value).toBe("Hour");
        })

        it('should render the data transfer chart', () => {
            const wrapper = findByTestAttr(component, 'data-transfer')
            expect(wrapper.length).toBe(1)
        })

        it('should render the cpu usage chart', () => {
            const wrapper = findByTestAttr(component, 'cpu-usage')
            expect(wrapper.length).toBe(1)
        })

        it('should render the ram chart', () => {
            const wrapper = findByTestAttr(component, 'ram')
            expect(wrapper.length).toBe(1)
        })
    })
})
