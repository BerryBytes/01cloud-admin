import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TableRow, TableHead } from '@material-ui/core';
import { PluginAddonList, StyledTableCell } from './PluginAddonsList';
import { findByTestAttr } from '../../helpers/utils';

configure({ adapter: new Adapter() })

const pluginList = [
    {
        "ID": 95,
        "CreatedAt": "2021-05-19T11:40:46.860074Z",
        "UpdatedAt": "2021-09-23T05:35:48.658099Z",
        "DeletedAt": null,
        "name": "helm chart",
        "description": "Helm Charts are simply Kubernetes YAML manifests combined into a single package that can be advertised to your Kubernetes clusters",
        "source_url": "https://helm.sh/",
        "image": "https://api.test.01cloud.dev/uploads/image/svg+xml/89a5cf39-d9fa-477f-8941-f83df60d5235.svg",
        "active": true,
        "support_ci": true,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": false,
        "service_detail": null,
        "AddOns": null,
        "attributes": "",
        "Categories": []
    },
    {
        "ID": 94,
        "CreatedAt": "2021-05-19T11:40:46.860074Z",
        "UpdatedAt": "2021-09-16T12:52:50.005096Z",
        "DeletedAt": null,
        "name": "docker",
        "description": "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.",
        "source_url": "https://www.docker.com/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/833f25d4-72ae-4e57-bef2-f8e5097fc1bd.png",
        "active": true,
        "support_ci": true,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": false,
        "service_detail": null,
        "AddOns": null,
        "attributes": "",
        "Categories": []
    },
    {
        "ID": 93,
        "CreatedAt": "2021-04-06T08:15:49.257942Z",
        "UpdatedAt": "2021-09-23T09:14:04.923649Z",
        "DeletedAt": null,
        "name": "mongoclient",
        "description": "Mongoclient is a tool to connect to your mongoDB Instance.",
        "source_url": "https://www.nosqlclient.com/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/1830d5dd-ea22-4ccc-857f-b96e2638139e.png",
        "active": true,
        "support_ci": false,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": true,
        "service_detail": {
            "service_port": "80",
            "service_type": "external"
        },
        "AddOns": null,
        "attributes": "",
        "Categories": []
    },
    {
        "ID": 92,
        "CreatedAt": "2021-03-30T10:16:09.638802Z",
        "UpdatedAt": "2021-09-16T12:52:50.032528Z",
        "DeletedAt": null,
        "name": "ubuntu",
        "description": "Ubuntu is a Linux distribution based on Debian and composed mostly of free and open-source software. Ubuntu is officially released in three editions: Desktop, Server, and Core for Internet of things devices and robots.",
        "source_url": "https://ubuntu.com/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/ab96db58-415e-4ac3-ac02-0840211a6d5d.png",
        "active": true,
        "support_ci": true,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": false,
        "service_detail": null,
        "AddOns": null,
        "attributes": "",
        "Categories": []
    },
    {
        "ID": 83,
        "CreatedAt": "2021-01-16T18:08:03.280345Z",
        "UpdatedAt": "2021-09-16T12:52:50.007519Z",
        "DeletedAt": null,
        "name": "golang",
        "description": "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.",
        "source_url": "https://golang.org/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/d568a395-9a71-40fd-9662-f396ebecd515.png",
        "active": true,
        "support_ci": true,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": false,
        "service_detail": null,
        "AddOns": null,
        "attributes": "",
        "Categories": []
    },
    {
        "ID": 82,
        "CreatedAt": "2020-12-17T12:40:42.368372Z",
        "UpdatedAt": "2021-09-23T09:14:04.949551Z",
        "DeletedAt": null,
        "name": "rabbitmq",
        "description": "RabbitMQ is a messaging broker - an intermediary for messaging. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.",
        "source_url": "https://www.rabbitmq.com/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/6041eae4-c437-4c5c-ae22-d50b5c972960.png",
        "active": true,
        "support_ci": false,
        "min_cpu": 200,
        "min_memory": 256,
        "is_add_on": true,
        "service_detail": null,
        "AddOns": null,
        "attributes": "",
        "Categories": [
            {
                "ID": 5,
                "CreatedAt": "2021-03-12T06:36:07.904874Z",
                "UpdatedAt": "2021-09-23T09:14:04.950712Z",
                "DeletedAt": null,
                "name": "Queue Manager",
                "description": "Queue Manager",
                "is_add_on": true,
                "Plugins": null
            }
        ]
    },
    {
        "ID": 81,
        "CreatedAt": "2020-12-16T17:00:45.518763Z",
        "UpdatedAt": "2021-09-23T09:14:04.941111Z",
        "DeletedAt": null,
        "name": "mongodb",
        "description": "MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.",
        "source_url": "https://www.mongodb.com",
        "image": "https://api.test.01cloud.dev/uploads/image/png/c6acf890-6b88-4684-a272-bf5fa0ca33e5.png",
        "active": true,
        "support_ci": false,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": true,
        "service_detail": {
            "master_slave": true,
            "service_port": "27017",
            "service_type": "internal"
        },
        "AddOns": null,
        "attributes": "",
        "Categories": [
            {
                "ID": 2,
                "CreatedAt": "2021-03-12T06:31:01.794633Z",
                "UpdatedAt": "2021-09-23T09:14:04.946779Z",
                "DeletedAt": null,
                "name": "Database",
                "description": "Database",
                "is_add_on": true,
                "Plugins": null
            }
        ]
    },
    {
        "ID": 80,
        "CreatedAt": "2020-12-01T13:18:20.711382Z",
        "UpdatedAt": "2021-09-16T12:52:50.015929Z",
        "DeletedAt": null,
        "name": "gitea",
        "description": "Gitea is a community managed lightweight code hosting solution written in Go.",
        "source_url": "https://gitea.io/en-us/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/4d604d6d-93db-4799-8771-230fde23d8c0.png",
        "active": true,
        "support_ci": false,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": false,
        "service_detail": null,
        "AddOns": null,
        "attributes": "",
        "Categories": []
    },
    {
        "ID": 79,
        "CreatedAt": "2020-11-18T12:26:21.498255Z",
        "UpdatedAt": "2021-09-23T09:14:04.917107Z",
        "DeletedAt": null,
        "name": "mosquitto",
        "description": "Eclipse Mosquitto is an open source message broker that implements the MQTT protocol. Mosquitto is lightweight and is suitable for use on all devices from low power single board computers to full servers.",
        "source_url": "https://mosquitto.org/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/90eb823d-07f2-48ad-a7c5-b56555173eea.png",
        "active": true,
        "support_ci": false,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": true,
        "service_detail": {
            "service_port": "1883",
            "service_type": "internal"
        },
        "AddOns": null,
        "attributes": "",
        "Categories": [
            {
                "ID": 5,
                "CreatedAt": "2021-03-12T06:36:07.904874Z",
                "UpdatedAt": "2021-09-23T09:14:04.950712Z",
                "DeletedAt": null,
                "name": "Queue Manager",
                "description": "Queue Manager",
                "is_add_on": true,
                "Plugins": null
            }
        ]
    },
    {
        "ID": 78,
        "CreatedAt": "2020-11-18T11:08:52.091146Z",
        "UpdatedAt": "2021-09-23T09:14:04.945609Z",
        "DeletedAt": null,
        "name": "postgresql",
        "description": "PostgreSQL is a powerful, open source object-relational database system that uses and extends the SQL language combined with many features that safely store and scale the most complicated data workloads.",
        "source_url": "https://www.postgresql.org/",
        "image": "https://api.test.01cloud.dev/uploads/image/png/457adf07-4702-477a-8ff6-bca28add43a3.png",
        "active": true,
        "support_ci": false,
        "min_cpu": 100,
        "min_memory": 128,
        "is_add_on": true,
        "service_detail": {
            "master_slave": true,
            "service_port": "5432",
            "service_type": "internal"
        },
        "AddOns": null,
        "attributes": "",
        "Categories": [
            {
                "ID": 2,
                "CreatedAt": "2021-03-12T06:31:01.794633Z",
                "UpdatedAt": "2021-09-23T09:14:04.946779Z",
                "DeletedAt": null,
                "name": "Database",
                "description": "Database",
                "is_add_on": true,
                "Plugins": null
            }
        ]
    }
]

const setup = (props = {}) => {
    const initialProps = {
        fetchCategories: jest.fn(),
        fetchPlugin: jest.fn(),
        pluginList,
        ...props
    }
    return shallow(<PluginAddonList classes={{}} t={() => {}} {...initialProps} />)
}

describe('Plugin Addon List Testing', () => {
    let component = setup({})
 
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the card header with text Plugin Addons', () => {
        const wrapper = findByTestAttr(component, 'card-header');
        expect(wrapper.props().title).toBe("Plugin Addons")
    })

    it('should render text field component inside the card header', () => {
        const wrapper = shallow(findByTestAttr(component, 'card-header').props().action)
        expect(wrapper.length).toBe(1)
    })

    it('should render text field component inside the card header', () => {
        const handleSearch = jest.fn()
        component.instance().handleSearch = handleSearch
        const wrapper = shallow(findByTestAttr(component, 'card-header').props().action)
        const searchField = findByTestAttr(wrapper, "search-field")
        searchField.props().onChange({ target: { value: "Test"} } )
        expect(handleSearch).toHaveBeenCalled()
    })

    it("should render plugin AddonList with atleast 2 TableCell when view mode is true", () => {
        component.setProps({ viewMode: true })
        const wrapper = findByTestAttr(component, "addon-table");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(2);
    });

    it("should render plugin AddonList with atleast 3 TableCell when view mode is false", () => {
        component.setProps({ viewMode: false })
        const wrapper = findByTestAttr(component, "addon-table");
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(3);
    });

    it('should show addon image ', () => {
        const wrapper = findByTestAttr(component, "addon-name").at(0);
        expect(wrapper.props().src).toBe("https://api.test.01cloud.dev/uploads/image/png/1830d5dd-ea22-4ccc-857f-b96e2638139e.png")
    })

    it('should show addon active status', () => {
        const wrapper = findByTestAttr(component, "addon-active").at(0);
        expect(wrapper.text()).toBe(" Active ")
    })
})
