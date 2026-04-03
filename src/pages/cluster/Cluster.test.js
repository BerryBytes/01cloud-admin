import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cluster, StyledTableCell } from './Cluster';
import { TableContainer,TableHead, TableRow } from "@material-ui/core";
import { findByTestAttr } from '../../helpers/utils';

configure({ adapter: new Adapter() })

const setup = (props = {}) => {
    const initialProps = {
        fetchClusterList: jest.fn(),
        ...props
    }
    return shallow(<Cluster classes={{}} t={() => {}} {...initialProps} />)
}

const cluster = {
    name: "Test",
    context: "Test",
    region: "us-east-1",
    zone: "Us1",
    provider: "AWS",
    pv_capacity: "10",
    active: true
}

describe('Cluster Page Testing', () => {
    let component = setup({})
    
    it('should render the whole page without error', () => {
        const wrapper = findByTestAttr(component, 'main-container');
        expect(wrapper.length).toBe(1)
    })

    it('should render the clusters part without error', () => {
        const wrapper = findByTestAttr(component, 'clusters');
        expect(wrapper.length).toBe(1)
    })

    it('should render the create cluster button', () => {
        const wrapper = findByTestAttr(component, 'create-cluster');
        expect(wrapper.length).toBe(1)
    })

    it('simulating on click on create button', () => {
        const handleCreateCluster = jest.fn()
        component.instance().handleCreateCluster = handleCreateCluster
        const wrapper = findByTestAttr(component, 'create-cluster');
        wrapper.props().onClick()
        expect(handleCreateCluster).toHaveBeenCalled()
    })

    it("should render members table with 1 TableHead", () => {
        const wrapper = component.find(TableContainer);
        const head = wrapper.find(TableHead);
        expect(head.length).toBe(1);
      });
    
      it("should render members table with atleast 4 StyledTableRow for Org Members", () => {
        const wrapper = component.find(TableContainer);
        const head = wrapper.find(TableHead);
        const rows = head.find(TableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(9);
      });

      describe('When projects data is present', () => {
        const deletePopupAgreeHandler = jest.fn()
        const deletePopupDisagreeHandler = jest.fn()
        beforeEach(() => {
          component = setup({
            clusterList: [cluster],
            deletePopupAgreeHandler,
            deletePopupDisagreeHandler
          });
        });

        it('should render the cluster name', () => {
            const wrapper = findByTestAttr(component,'name')
            expect(wrapper.text()).toBe(cluster.name)
        })

        it('should render the cluster context', () => {
            const wrapper = findByTestAttr(component,'context')
            expect(wrapper.text()).toBe(cluster.context)
        })

        it('should render the cluster region', () => {
            const wrapper = findByTestAttr(component,'region')
            expect(wrapper.text()).toBe(cluster.region)
        })

        it('should render the cluster zone', () => {
            const wrapper = findByTestAttr(component,'zone')
            expect(wrapper.text()).toBe(cluster.zone)
        })

        it('should render the cluster provider', () => {
            const wrapper = findByTestAttr(component,'provider')
            expect(wrapper.text()).toBe(cluster.provider)
        })

        it('should render the cluster capacity', () => {
            const wrapper = findByTestAttr(component,'capacity')
            expect(wrapper.text()).toBe(cluster.pv_capacity)
        })

        it('should render active when cluster is active', () => {
            const wrapper = findByTestAttr(component,'active')
            expect(wrapper.length).toBe(cluster.active ? 1 : 0)
        })

        it('should render inactive when cluster is inactive', () => {
            const wrapper = findByTestAttr(component,'inactive')
            expect(wrapper.length).toBe(cluster.active ? 0 : 1)
        })

        it('should render the edit button', () => {
            const wrapper = findByTestAttr(component,'edit-button')
            expect(wrapper.length).toBe(1)
        })

        it('should render the delete button', () => {
            const wrapper = findByTestAttr(component,'delete-button')
            expect(wrapper.length).toBe(1)
        })

        it('simulating on click on delete button', () => {
            const handleDelete = jest.fn()
            component.instance().handleDelete = handleDelete
            const wrapper = findByTestAttr(component, 'delete-button');
            wrapper.props().onClick()
            expect(handleDelete).toHaveBeenCalled()
        })

        it('should render the confirm action popup', () => {
            const wrapper = findByTestAttr(component,'actionpopup')
            expect(wrapper.length).toBe(1)
        })

        it('should call handleAgree  when called handle Agree is called', () => {
            component.instance().deletePopupAgreeHandler = deletePopupAgreeHandler;
            const wrapper = findByTestAttr(component, 'actionpopup');
            wrapper.props().handleAgree()
            expect(deletePopupAgreeHandler).toHaveBeenCalled()
        })

        it('should call handleDisAgree  when called handleDisAgree is called', () => {
            component.instance().deletePopupDisagreeHandler = deletePopupDisagreeHandler;
            const wrapper = findByTestAttr(component, 'actionpopup');
            wrapper.props().handleDisAgree()
            expect(deletePopupDisagreeHandler).toHaveBeenCalled()
        })
    })
})
