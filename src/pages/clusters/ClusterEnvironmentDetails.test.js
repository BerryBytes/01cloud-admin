import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { findByTestAttr } from "../../helpers/utils";
import { ClusterEnvironmentDetails } from "./ClusterEnvironmentDetails";
import {
    TableHead
  } from "@material-ui/core";
  import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";

configure({ adapter: new Adapter()});

const setup = () => {
    const initialProps = {
        classes : {},
        getClusterDetails: jest.fn()
    }

    let component = shallow(
        <ClusterEnvironmentDetails {...initialProps} t={() => ""} />
    )

    return component
}

describe('Cluster Env Details unit Test',() => {
    let component = setup();

    it('should render card component without error', () => {
        const wrapper = findByTestAttr(component, "main-container");
        expect(wrapper.length).toBe(1)
    })

    it('should render if there is no data', () => {
        component.setProps({clusterEnvData: []})
        const wrapper = findByTestAttr(component, "no-env");
        expect(wrapper.length).toBe(1)
    })

    it("should render tickets table with atleast 3 TableCell", () => {
        const wrapper = findByTestAttr(component, "table-data");
        const head = wrapper.find(TableHead);
        const rows = head.find(StyledTableRow);
        const row = rows.find(StyledTableCell);
        expect(row.length).toBe(3);
    });

    it('should not render if there is data', () => {
        component.setProps({ clusterEnvData : [{}, {}]})
        const wrapper = findByTestAttr(component, "no-env");
        expect(wrapper.length).toBe(0)
    })
})