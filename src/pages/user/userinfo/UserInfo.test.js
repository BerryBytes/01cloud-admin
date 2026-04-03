import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { findByTestAttr, getDateInStandardFormat } from '../../../helpers/utils';
import { UserInfo, StyledTableCell } from './UserInfo';
import { TableHead } from "@material-ui/core";

configure({ adapter : new Adapter()})

const tabChanger = jest.fn()

const userInfo = {
    "id": "213",
    "createdat": "2021-09-29T06:59:25.368199Z",
    "UpdatedAt": "2021-09-29T06:59:59.377631Z",
    "DeletedAt": null,
    "first_name": "Ajay",
    "last_name": "Prajapati",
    "email": "ajayprazz@gmail.com",
    "company": "berrybytes",
    "password": "$2a$10$0TGDYy9MuoBJXjE6d5kD1uMZInIKftsYGZszurJfDmiqje3YEaKuG",
    "email_verified": true,
    "active": true,
    "address_updated": false
}

const project = {
    ID: 213,
    name: "Demo",
    apps_count: "12",
    active: true
}

const setup = (props) => {
    const initialProps = {
        updateBreadcrumb: jest.fn(),
        fetchUserInfo: jest.fn(),
        fetchUserProjects: jest.fn(),
        fetchSubscriptions: jest.fn(),
        history: {
            goBack: tabChanger
        },
        match: {
            params: {
                userId: 213
            }
        },
        userInfo: userInfo,
        classes: {},
        t: jest.fn(),
        ...props
    }
    return shallow(<UserInfo {...initialProps} />)
}

describe('LoadBalancer List Component', () => {
    let component = setup()

    it('should render the main container without error', () => {
        const wrapper = findByTestAttr(component, 'main-container')
        expect(wrapper.length).toBe(1)
    })

    it('should render the user first name ', () => {
        const wrapper = findByTestAttr(component, 'user-firstname')
        expect(wrapper.text()).toBe(String(userInfo.first_name)[0].toUpperCase())
    })

    it('should render the user name of user ', () => {
        const wrapper = findByTestAttr(component, 'username')
        expect(wrapper.text()).toBe(userInfo.first_name + " " + userInfo.last_name)
    })

    it('should render email of the user ', () => {
        const wrapper = findByTestAttr(component, 'user-email')
        expect(wrapper.text()).toBe(userInfo.email)
    })

    it('should render id of the user ', () => {
        const wrapper = findByTestAttr(component, 'userId')
        expect(wrapper.text()).toBe(userInfo.id)
    })

    it('should render company of the user ', () => {
        const wrapper = findByTestAttr(component, 'user-company')
        expect(wrapper.text()).toBe(userInfo.company)
    })

    it('should render creation date of user ', () => {
        const wrapper = findByTestAttr(component, 'user-createdAt')
        expect(wrapper.text()).toBe(getDateInStandardFormat(userInfo.createdat))
    })

    it('should render the toggle of active or inactive check box', () => {
        const wrapper = findByTestAttr(component, "active-status")
        expect(wrapper.length).toBe(1)
    })

    it('should render the toggle of is admin ', () => {
        const wrapper = findByTestAttr(component, "is-admin")
        expect(wrapper.length).toBe(1)
    })

    it('should render no user projects div ', () => {
        component.setProps({
            userProjects: []
        })
        const wrapper = findByTestAttr(component, "no-user-projects")
        expect(wrapper.length).toBe(1)
    })

    it("should render 6 columns inside TableHead", () => {
        const wrapper = findByTestAttr(component, "projects-table")
        const head = wrapper.find(TableHead)
        const cells = head.find(StyledTableCell)
        expect(cells.length).toBe(6)
    })

    describe('When there is project data', () => {
        beforeEach(() => {
            component = setup({
                userProjects: [project]
            })
        })

        it('should render the name of project', () => {
            const wrapper = findByTestAttr(component, "name")
            expect(wrapper.text()).toBe(project.name)
        })

        it('should render the apps count of project', () => {
            const wrapper = findByTestAttr(component, "count")
            expect(wrapper.text()).toBe(project.apps_count)
        })

        it('should render the subscription name of project', () => {
            const wrapper = findByTestAttr(component, "sub-name")
            expect(wrapper.length).toBe(1)
        })

        it('should render the edit button of project', () => {
            const wrapper = findByTestAttr(component, "edit")
            expect(wrapper.length).toBe(1)
        })

        it('should render the active status of project', () => {
            const wrapper = findByTestAttr(component, "active")
            expect(wrapper.length).toBe(project.active ? 1 : 0)
        })

        it('should render the inactive status of project', () => {
            const wrapper = findByTestAttr(component, "inactive")
            expect(wrapper.length).toBe(project.active ? 0 : 1)
        })
    })

    describe('When Approve Popup is Open', () => {
        const handleActiveStatusAgreeHandler = jest.fn()
        const handleActiveStatusDisAgreeHandler = jest.fn()
        beforeEach(() => {
            component = setup({
               handleActiveStatusAgreeHandler,
               handleActiveStatusDisAgreeHandler
            });
        });
  
        it('should call handleAgree  when called handle Agree is called', () => {
            component.instance().handleActiveStatusAgreeHandler = handleActiveStatusAgreeHandler;
            const wrapper = findByTestAttr(component, 'approve-popup');
            wrapper.props().handleAgree()
            expect(handleActiveStatusAgreeHandler).toHaveBeenCalled()
        })
  
        it('should call handleDisAgree  when called handleDisAgree is called', () => {
            component.instance().handleActiveStatusDisAgreeHandler = handleActiveStatusDisAgreeHandler;
            const wrapper = findByTestAttr(component, 'approve-popup');
            wrapper.props().handleDisAgree()
            expect(handleActiveStatusDisAgreeHandler).toHaveBeenCalled()
        })
  
        it('should open the approve popup once the approve has been clicked', () => {
            component.setState({ isActiveStatusPopupOpened: true });
            const wrapper = findByTestAttr(component, 'approve-popup');
            expect(wrapper.props().open).toBeTruthy()
        })
    })

    describe('When Admin Popup is Open', () => {
        const handleAdminStatusAgreeHandler = jest.fn()
        const handleAdminStatusDisAgreeHandler = jest.fn()
        beforeEach(() => {
            component = setup({
               handleAdminStatusAgreeHandler,
               handleAdminStatusDisAgreeHandler
            });
        });
  
        it('should call handleAgree  when called handle Agree is called', () => {
            component.instance().handleAdminStatusAgreeHandler = handleAdminStatusAgreeHandler;
            const wrapper = findByTestAttr(component, 'admin-popup');
            wrapper.props().handleAgree()
            expect(handleAdminStatusAgreeHandler).toHaveBeenCalled()
        })
  
        it('should call handleDisAgree  when called handleDisAgree is called', () => {
            component.instance().handleAdminStatusDisAgreeHandler = handleAdminStatusDisAgreeHandler;
            const wrapper = findByTestAttr(component, 'admin-popup');
            wrapper.props().handleDisAgree()
            expect(handleAdminStatusDisAgreeHandler).toHaveBeenCalled()
        })
  
        it('should open the admin popup once the admin has been clicked', () => {
            component.setState({ isAdminStatusPopupOpened: true });
            const wrapper = findByTestAttr(component, 'admin-popup');
            expect(wrapper.props().open).toBeTruthy()
        })
    })
})