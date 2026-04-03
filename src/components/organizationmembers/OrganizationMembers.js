import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { TableContainer, Paper,Table, TableBody, TableHead, Typography} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StyledTableCell, StyledTableRow } from "../../components/styledtabelcell/StyledTabelCell";

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { Link } from "react-router-dom";
import paths from "../../constants/paths";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    maxHeight: 400
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardHeader: {
    padding: "0 !important",
  },
    imgIcon: {
        width: 30,
        height: 30
    }
}));

export function OrganizationMembers(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card className="m-t-20" data-test="card-container">
        <CardHeader
          className={classes.cardHeader}
          avatar={
              <IconButton
                  data-test="icon-button"
                  className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
              >
                  <ExpandMoreIcon />
              </IconButton>
          }
          title={
            <Typography varaint="h5" display="inline">
              <strong data-test="title-text"> {"Members"} </strong>
            </Typography>
          }
        />
    
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table" data-test="table-data">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="left">  </StyledTableCell>
                          <StyledTableCell align="left"> Name </StyledTableCell>
                          <StyledTableCell align="left"> Email </StyledTableCell>
                          <StyledTableCell align="left"> Role </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      { props?.membersList?.length > 0 && props?.membersList?.map((member) => (
                          <TableBody key={member?.id}>
                                <StyledTableRow>
                                  <StyledTableCell>
                                    <Typography color="primary" variant="h5" data-test="member-icon">
                                        { member.icon ? <img src={member.icon} alt="user-avatar" className={classes.imgIcon}/>  : <PersonOutlineIcon className={classes.imgIcon} style={{color: "#0057fa"}} /> }       
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                    <Link
                                      data-test="user-link"
                                      to={paths.USER_INFO.replace(":userId", member?.user?.id)}
                                      className="titleStyle"
                                    >
                                      {member?.user?.first_name + ' ' + member?.user?.last_name}
                                    </Link>
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="user-email">
                                      {member?.user?.email}
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="user-admin">
                                        {member?.user?.is_admin ? 'Admin' : 'User'} 
                                  </StyledTableCell>
                                </StyledTableRow>
                          </TableBody>
                        ))
                      }
                    </Table>
                    {(!props.membersList ||  props?.membersList?.length <= 0 ) && (
                        <div className="alignCenter" data-test="no-members">
                          <p>No Members In the Organization</p>
                        </div>
                    )}
              </TableContainer>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default OrganizationMembers;