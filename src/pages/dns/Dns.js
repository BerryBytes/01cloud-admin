import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getDnsList } from "./redux/actions";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import CustomButton from "../../components/custombutton/CustomButton";
import { getDateInStandardFormat } from "../../helpers/utils";
import EditIcon from "@material-ui/icons/Edit";

import AddDNSPopup from "../../components/adddnspopup/AddDNSPopup";

export function Dns(props) {
  const [openPopup, setOpenPopup] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    props.getDnsList();
  }, []);
  
  const handleClosePopup = () => {
    if(openPopup) setOpenPopup(false);
		if(editMode) setEditMode(false);
		if(editData) setEditData(null);
  }
  
  const handleAddClick = () => {
    setOpenPopup(true);
  }

  const handleEdit = dns => {
    setEditData(dns);
    setEditMode(true);
  }

  return (
    <div data-test="main-container">
      <div className="listContainer">
        <Typography color="textPrimary" variant="h4">
          DNS
        </Typography>
        <CustomButton
          label="Add Dns"
          onClick={() => handleAddClick()}
          data-test="add-btn"
        />
        {(editMode || openPopup) && (
            <AddDNSPopup
              openPopup={openPopup || editMode}
              handleClosePopup={handleClosePopup}
              editMode={editMode}
              editData={editData}
              data-test="add-dns-popup"
            />
          )}
      </div>
      <TableContainer component={Paper} data-test="table-container">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Provider</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.dnsList.length > 0 &&
              props.dnsList.map((dns, ind) => {
                return (
                  <TableRow key={ind} data-test="dns-row">
                    <TableCell
                      component="th"
                      scope="row"
                      key={ind}
                      data-test="dns-name"
                    >
                      {dns.name}
                    </TableCell>
                    <TableCell align="left" data-test="dns-provider">
                      {dns.provider}
                    </TableCell>
                    <TableCell align="left" data-test="dns-created">
                      {getDateInStandardFormat(dns.createdat)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(dns)}
                        data-test="edit-btn"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dnsList: state.DnsReducer.dnsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDnsList: () => dispatch(getDnsList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dns);
