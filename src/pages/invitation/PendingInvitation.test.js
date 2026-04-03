import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Invitation, StyledTableCell } from './Invitation';
import { findByTestAttr } from '../../helpers/utils';
import { TableHead } from "@material-ui/core";

configure({ adapter: new Adapter() })

const invitation = {
  "ID": 52,
  "CreatedAt": "2021-06-07T04:41:30.843581Z",
  "UpdatedAt": "2021-07-05T06:43:10.759891Z",
  "DeletedAt": null,
  "first_name": "Kiran",
  "last_name": "Bandana",
  "email": "kiran.maharjan@berrybytes.com",
  "company": "Berrybytes",
  "designation": "Linux System Administrator",
  "email_sent": true,
  "token": "d921168f6cffb056085a1845030e4d1da9b762b4-01fb-4cd1-93d2-0182455b88c4",
  "remarks": "Tasks"
}

const invitationList = [
    {
      "ID": 52,
      "CreatedAt": "2021-06-07T04:41:30.843581Z",
      "UpdatedAt": "2021-07-05T06:43:10.759891Z",
      "DeletedAt": null,
      "first_name": "Kiran",
      "last_name": "Bandana",
      "email": "kiran.maharjan@berrybytes.com",
      "company": "Berrybytes",
      "designation": "Linux System Administrator",
      "email_sent": true,
      "token": "d921168f6cffb056085a1845030e4d1da9b762b4-01fb-4cd1-93d2-0182455b88c4",
      "remarks": "Tasks"
    },
    {
      "ID": 48,
      "CreatedAt": "2021-04-19T11:52:12.074327Z",
      "UpdatedAt": "2021-04-19T11:53:03.478743Z",
      "DeletedAt": null,
      "first_name": "Suraj",
      "last_name": "Machamasi",
      "email": "surajmachamasi@berrybytes.com",
      "company": "BerryBytes",
      "designation": "DevOps Engineer",
      "email_sent": true,
      "token": "9848f79e1aa4f8c696818eefc74560b5712fbdaf-07ed-4578-9a6a-a41a42ce4348",
      "remarks": "Test"
    },
    {
      "ID": 44,
      "CreatedAt": "2021-02-05T07:42:38.779771Z",
      "UpdatedAt": "2021-02-05T08:08:25.329641Z",
      "DeletedAt": null,
      "first_name": "sr",
      "last_name": "ku",
      "email": "g.sravankumar444@gmail.com",
      "company": "berrybytes",
      "designation": "software engineer",
      "email_sent": true,
      "token": "08e838e4a04ca88de9b7997fa23e695a86b96a87-7c39-4836-a0fb-d98f53368ba7",
      "remarks": "na"
    },
    {
      "ID": 42,
      "CreatedAt": "2021-02-02T06:09:42.822862Z",
      "UpdatedAt": "2021-02-12T12:19:19.312544Z",
      "DeletedAt": null,
      "first_name": "bb",
      "last_name": "ss",
      "email": "bbb@gmail.com",
      "company": "berrybytes",
      "designation": "developer",
      "email_sent": true,
      "token": "773ad6c8c9cc5c9aec020d413409f107a6325abb-93bd-4fd9-afd8-519ddae99b89",
      "remarks": "developing"
    },
    {
      "ID": 41,
      "CreatedAt": "2021-02-01T11:51:02.923785Z",
      "UpdatedAt": "2021-02-12T12:19:24.436855Z",
      "DeletedAt": null,
      "first_name": "ss",
      "last_name": "cc",
      "email": "bishow@gmail.com",
      "company": "berrybytes",
      "designation": "developer",
      "email_sent": true,
      "token": "3e14cee52e342c708c476bae4315b53fce549594-effa-4f86-8caf-6196ae54c966",
      "remarks": "software"
    },
    {
      "ID": 38,
      "CreatedAt": "2021-01-24T09:54:46.3244Z",
      "UpdatedAt": "2021-02-12T04:44:02.437187Z",
      "DeletedAt": null,
      "first_name": "bish",
      "last_name": "sth",
      "email": "bishowshrestha50@gmail.com",
      "company": "berrybytes",
      "designation": "developer",
      "email_sent": true,
      "token": "8c1b05200c803c988750e85fa6729d7e2d0e3a8e-45cb-4760-99a8-5ad7b6c0c7d7",
      "remarks": "software"
    },
    {
      "ID": 37,
      "CreatedAt": "2021-01-20T10:01:08.183495Z",
      "UpdatedAt": "2021-02-12T12:19:33.460143Z",
      "DeletedAt": null,
      "first_name": "fff",
      "last_name": "fff",
      "email": "g@gmail.com",
      "company": "ddd",
      "designation": "ddd",
      "email_sent": true,
      "token": "9ab26cee462bb3deee7835f9f7618850df65e787-1e39-4c2b-b3de-1ea519d722b6",
      "remarks": "dd"
    },
    {
      "ID": 32,
      "CreatedAt": "2021-01-04T06:21:42.538477Z",
      "UpdatedAt": "2021-01-04T07:28:09.233318Z",
      "DeletedAt": null,
      "first_name": "rajesh",
      "last_name": "gangoni",
      "email": "rajesh.gangoni@berrybytes.com",
      "company": "BerryBytes",
      "designation": "DevOps Engineer",
      "email_sent": true,
      "token": "7731d17d254d8554b061846943d42ca84209250b-7947-4761-8e4e-e5dd871e74b8",
      "remarks": "To work"
    },
    {
      "ID": 26,
      "CreatedAt": "2020-11-06T04:20:12.486143Z",
      "UpdatedAt": "2020-12-08T14:25:44.330064Z",
      "DeletedAt": null,
      "first_name": "Sarose",
      "last_name": "Jo",
      "email": "sarosejoshi@icloud.com",
      "company": "01cloud",
      "designation": "DevOps",
      "email_sent": true,
      "token": "2649b9f14b3f3603e1eba68864bfe829d0b45409-dab4-4e91-9d7c-dcf3f7252dde",
      "remarks": "Testing"
    },
    {
      "ID": 25,
      "CreatedAt": "2020-10-29T07:29:04.254655Z",
      "UpdatedAt": "2020-12-08T14:25:38.693744Z",
      "DeletedAt": null,
      "first_name": "helen",
      "last_name": "rai",
      "email": "velera4138@mojzur.com",
      "company": "nepallink",
      "designation": "IT",
      "email_sent": true,
      "token": "05983f58594827e117f761e4b2265d1f879a597c-55c9-4277-bd25-e3bf7e066f96",
      "remarks": "Test"
    },
    {
      "ID": 24,
      "CreatedAt": "2020-10-23T10:10:00.16175Z",
      "UpdatedAt": "2020-10-23T10:10:33.172177Z",
      "DeletedAt": null,
      "first_name": "pranjali1",
      "last_name": "Ghatol",
      "email": "pranjali@mailinator.com",
      "company": "Berrybytes",
      "designation": "dev",
      "email_sent": true,
      "token": "e2240c12adf3bb112a366f084251971cb96f0164-0c5e-42e2-975c-342a1a65945f",
      "remarks": "dev"
    },
    {
      "ID": 23,
      "CreatedAt": "2020-10-23T10:08:14.967981Z",
      "UpdatedAt": "2020-10-23T10:10:35.41848Z",
      "DeletedAt": null,
      "first_name": "Sandip",
      "last_name": "Ghatol",
      "email": "sandip@mailinator.com",
      "company": "Neapllink",
      "designation": "Admin",
      "email_sent": true,
      "token": "243b7f8ec71b1a366d47b9eed32c1d75ebf51435-81a1-4254-be00-05fd2edddc5b",
      "remarks": "PORD"
    },
    {
      "ID": 18,
      "CreatedAt": "2020-10-22T10:55:46.707694Z",
      "UpdatedAt": "2020-10-22T11:04:40.816008Z",
      "DeletedAt": null,
      "first_name": "demoraj",
      "last_name": "testing",
      "email": "demoraj@mailinator.com",
      "company": "demoraj",
      "designation": "devops",
      "email_sent": true,
      "token": "7788fe60fdd40b39167b846322b3635af676cae6-ab70-4e46-aad4-dd49f8e01903",
      "remarks": "demo"
    },
    {
      "ID": 16,
      "CreatedAt": "2020-10-22T07:17:30.1636Z",
      "UpdatedAt": "2020-10-22T07:17:30.163601Z",
      "DeletedAt": null,
      "first_name": "Hem",
      "last_name": "Shrestha",
      "email": "hem@berrybytes.com",
      "company": "Berrybytes",
      "designation": "Software Engineer",
      "email_sent": true,
      "token": "1f434e77c84764c6b0ae5175c20aad9a72989951-4d8e-4adc-963e-9159626b8a84",
      "remarks": "testing"
    },
    {
      "ID": 13,
      "CreatedAt": "2020-10-22T06:40:02.651743Z",
      "UpdatedAt": "2020-10-22T09:01:05.252895Z",
      "DeletedAt": null,
      "first_name": "test",
      "last_name": "100",
      "email": "test100@mailinator.com",
      "company": "bb",
      "designation": "dev",
      "email_sent": true,
      "token": "383d3e5a4400fb77724df4f457d4de53c86057eb-5d65-4804-8e51-dd9f887cf1a4",
      "remarks": "testing from console"
    }
  ]

const setup = (props = {}) => {
    const initialProps = {
        fetchInvitationList: jest.fn(),
        updateBreadcrumb: jest.fn(),
        ...props
    }
    return shallow(<Invitation classes={{}} t={() => {}} {...initialProps} />)
}

describe('Invitation Page Testing', () => {
    let component = setup({})
    const handleListFilterClick = jest.fn()
    const handleInvite = jest.fn()

    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render invitation header', () => {
        const wrapper = findByTestAttr(component, 'invitation-header');
        expect(wrapper.length).toBe(1)
    })

    it('should render no invitations when there are no invitations', () => {
        component.setProps({
            invitationList : []
        })
        const wrapper = findByTestAttr(component, 'no-invitation');
        expect(wrapper.length).toBe(1)
    })

    it('should not render pending chip', () => {
      const wrapper = findByTestAttr(component, 'pending-chip');
      expect(wrapper.length).toBe(0)
    })

    it('should not render approved chip', () => {
      const wrapper = findByTestAttr(component, 'approved-chip');
      expect(wrapper.length).toBe(0)
    })

    it('should render invite button', () => {
      const wrapper = findByTestAttr(component, 'invite-button');
      expect(wrapper.length).toBe(1)
    })

    it('should call handle Invite when invite button is clicked', () => {
      component.instance().handleInvite = handleInvite
      const wrapper = findByTestAttr(component, 'invite-button');
      wrapper.props().onClick()
      expect(handleInvite).toHaveBeenCalled()
    })

    it("should render 7 columns inside TableHead", () => {
      const wrapper = findByTestAttr(component, "invite-table")
      const head = wrapper.find(TableHead)
      const cells = head.find(StyledTableCell)
      expect(cells.length).toBe(7)
    })

    it("should render no pending when current view is 1 and list is empty", () => {
      component.setState({ currentView: 1 })
      component.setProps({ invitationList })
      const wrapper = findByTestAttr(component, "no-pending")
      expect(wrapper.length).toBe(1)
    })

    it("should render no approved when current view is 2 and list is empty", () => {
      component.setState({ currentView: 2 })
      component.setProps({ invitationList: [{}] })
      const wrapper = findByTestAttr(component, "no-approved")
      expect(wrapper.length).toBe(1)
    })

    describe('When Approve Popup is Open', () => {
      const approveAgreeHandler = jest.fn()
      const approveDisagreeHandler = jest.fn()
      beforeEach(() => {
          component = setup({
             approveAgreeHandler,
             approveDisagreeHandler
          });
      });

      it('should call handleAgree  when called handle Agree is called', () => {
          component.instance().approveAgreeHandler = approveAgreeHandler;
          const wrapper = findByTestAttr(component, 'approve-popup');
          wrapper.props().handleAgree()
          expect(approveAgreeHandler).toHaveBeenCalled()
      })

      it('should call handleDisAgree  when called handleDisAgree is called', () => {
          component.instance().approveDisagreeHandler = approveDisagreeHandler;
          const wrapper = findByTestAttr(component, 'approve-popup');
          wrapper.props().handleDisAgree()
          expect(approveDisagreeHandler).toHaveBeenCalled()
      })

      it('should open the approve popup once the approve has been clicked', () => {
          component.setState({ isApprovePopupOpened: true });
          const wrapper = findByTestAttr(component, 'approve-popup');
          expect(wrapper.props().open).toBeTruthy()
      })
  })

    describe('testing data in the invite-table', () => {
      beforeEach(() => {
        component = setup({
          invitationList: [invitation]
        })
      })

      it('should render the name of invitee', () => {
        component.setState({ currentView: 2});
        const wrapper = findByTestAttr(component,'name')
        expect(wrapper.text()).toBe(invitation.first_name + " " + invitation.last_name)
      })

      it('should render the email', () => {
        component.setState({ currentView: 2});
        const wrapper = findByTestAttr(component,'email')
        expect(wrapper.text()).toBe(invitation.email)
      })

      it('should render the designation', () => {
        component.setState({ currentView: 2});
        const wrapper = findByTestAttr(component,'designation')
        expect(wrapper.text()).toBe(invitation.designation)
      })

      it('should render the remarks', () => {
        component.setState({ currentView: 2});
        const wrapper = findByTestAttr(component,'remarks')
        expect(wrapper.text()).toBe(invitation.remarks)
      })

      it('should render the approved text', () => {
        component.setState({ currentView: 2});
        const wrapper = findByTestAttr(component,'approved')
        expect(wrapper.length).toBe(invitation.email_sent ? 1 : 0)
      })

      it('should render the approved button', () => {
        component.setState({ currentView: 2});
        const wrapper = findByTestAttr(component,'approve-button')
        expect(wrapper.length).toBe(invitation.email_sent ?  0 : 1)
      })
    })

    describe('When Inviation List is Present', () => {
        beforeEach(() => {
            component = setup({
                invitationList
            })
        })

        it('should render pending chip', () => {
          const wrapper = findByTestAttr(component, 'pending-chip');
          expect(wrapper.length).toBe(1)
        })

        it('should call handleListFilter Click on Clicking pending', () => {
          component.instance().handleListFilterClick = handleListFilterClick
          const wrapper = findByTestAttr(component, 'pending-chip');
          wrapper.props().onClick()
          expect(handleListFilterClick).toHaveBeenCalled()
        })

        it('should render approved chip', () => {
          const wrapper = findByTestAttr(component, 'approved-chip');
          expect(wrapper.length).toBe(1)
        })

        it('should call handleListFilter Click on Clicking approved', () => {
          component.instance().handleListFilterClick = handleListFilterClick
          const wrapper = findByTestAttr(component, 'approved-chip');
          wrapper.props().onClick()
          expect(handleListFilterClick).toHaveBeenCalled()
        })
    })

    describe('When is create Invite is open', () => {
      const handleInviteCancel = jest.fn()
      beforeEach(() => {
          component = setup({
             handleInviteCancel
          });
      });

      it('should open dialog when create invite is true', () => {
        component.setState({ isCreateInvitePopupOpen: true });
        const wrapper = findByTestAttr(component, 'dialog');
        expect(wrapper.props().open).toBeTruthy()
      })

      it('should call handleListFilter  on closing dialog', () => {
        component.setState({ isCreateInvitePopupOpen: true });
        component.instance().handleInviteCancel = handleInviteCancel
        const wrapper = findByTestAttr(component, 'dialog');
        wrapper.props().onClose()
        expect(handleInviteCancel).toHaveBeenCalled()
      })
      
      it('should call handleListFilter  on clicking close button', () => {
        component.setState({ isCreateInvitePopupOpen: true });
        component.instance().handleInviteCancel = handleInviteCancel
        const wrapper = findByTestAttr(component, 'close-button');
        wrapper.props().onClick()
        expect(handleInviteCancel).toHaveBeenCalled()
      })

      it('should call render Invite in Ui as title of dialog', () => {
        component.setState({ isCreateInvitePopupOpen: true });
        const wrapper = findByTestAttr(component, 'invite');
        expect(wrapper.text()).toBe('Invite')
      })

      it('should render add invitation div ', () => {
        component.setState({ isCreateInvitePopupOpen: true });
        const wrapper = findByTestAttr(component, 'add-invitation');
        expect(wrapper.length).toBe(1)
      })
    })
}) 