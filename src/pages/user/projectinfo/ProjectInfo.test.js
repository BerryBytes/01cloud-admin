import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr } from '../../../helpers/utils';
import { ProjectInfo, StyledTableCell } from './ProjectInfo';
import { TableHead } from "@material-ui/core";

configure({ adapter : new Adapter()})

const projectInfo = {
    name: "test",
    image: "test/projectimage.jpg",
    subscription: {
      name: "testSubscription"
    }
}

const setup = (props) => {
    const initialProps = {
        projectInfo:  projectInfo,
        match: {
            params: {
                pId: 47,
                uId: 213
            }
        },
        location: {
            hash: ""
        },
        fetchProjectApps: jest.fn(),
        fetchProjectInfo: jest.fn(),
        classes: {},
        t: jest.fn(),
        ...props
    }
    return shallow(<ProjectInfo {...initialProps} />)
}

describe('Project Info List Component', () => {
    let component = setup()

    it('should render the main container without error', () => {
        const wrapper = findByTestAttr(component, 'main-container')
        expect(wrapper.length).toBe(1)
    })

    it("should render correct project image", () => {
        component.setState({ projectInfo : projectInfo })
        const wrapper = findByTestAttr(component, "projectImage");
        expect(wrapper.props().src).toBe("test/projectimage.jpg");
    });

    it("should render dashboard icon if no image is present", () => {
        component.setState({ projectInfo : { name: "ok"} })
        const wrapper = findByTestAttr(component, "dashboard-icon");
        expect(wrapper.length).toBe(1)
    });

    it("should render correct project name", () => {
        component.setState({ projectInfo : projectInfo })
        const wrapper = findByTestAttr(component, "project-name");
        expect(wrapper.text()).toBe(projectInfo.name);
    });

    it("should render correct subscription name", () => {
        component.setState({ projectInfo : projectInfo })
        const wrapper = findByTestAttr(component, "subscription-name");
        expect(wrapper.text()).toBe(projectInfo.subscription.name);
    });

    it('should render the app card without error', () => {
        const wrapper = findByTestAttr(component, 'app-card')
        expect(wrapper.length).toBe(1)
    })

    it('should render the memory card without error', () => {
        const wrapper = findByTestAttr(component, 'memory-card')
        expect(wrapper.length).toBe(1)
    })

    it('should render the cores card without error', () => {
        const wrapper = findByTestAttr(component, 'cores-card')
        expect(wrapper.length).toBe(1)
    })

    it('should render the no apps card without error', () => {
        component.setState({
            projectApps: []
        })
        const wrapper = findByTestAttr(component, 'no-apps')
        expect(wrapper.length).toBe(1)
    })

    it('should not render the no apps card when apps data is present', () => {
        component.setState({
            projectApps: [{}]
        })
        const wrapper = findByTestAttr(component, 'no-apps')
        expect(wrapper.length).toBe(0)
    })

    it('should not render the no apps card when apps data is present', () => {
        component.setState({
            projectApps: [{}]
        })
        const wrapper = findByTestAttr(component, 'row')
        expect(wrapper.length).toBe(1)
    })

    it("should render 7 columns inside TableHead", () => {
        const wrapper = findByTestAttr(component, "projects-table")
        const head = wrapper.find(TableHead)
        const cells = head.find(StyledTableCell)
        expect(cells.length).toBe(7)
    })
})