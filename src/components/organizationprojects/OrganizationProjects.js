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
import { useTranslation } from 'react-i18next';

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
}));

export function OrganizationProjects(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [t] = useTranslation();

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
              <strong data-test="title-text"> {"Projects"} </strong>
            </Typography>
          }
        />
    
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="left"> ID </StyledTableCell>
                          <StyledTableCell align="left"> Name </StyledTableCell>
                          <StyledTableCell align="left"> Subscription </StyledTableCell>
                          <StyledTableCell align="left"> Status </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      { props?.projectsList?.length > 0 && props?.projectsList?.map((project) => (
                          <TableBody key={project?.id}>
                                <StyledTableRow>
                                  <StyledTableCell>
                                    <Typography color="primary" variant="h6" data-test="project-id">
                                        {project?.id}
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="project-name">
                                      {project?.name}
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="project-subscription">
                                      {project?.subscription?.name + " Subscription"}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                        {project?.active ? (
                                            <p data-test="project-active">
                                            <span className="activestatus"></span> {t('Billing.PromoCodeList.active')}
                                            </p>
                                        ) : (
                                            <p data-test="project-inactive">
                                            <span className="inactivestatus"></span> {t('Billing.PromoCodeList.inactive')}
                                            </p>
                                        )} 
                                  </StyledTableCell>
                                </StyledTableRow>
                          </TableBody>
                        ))
                      }
                    </Table>
                    {(!props.projectsList ||  props?.projectsList?.length <= 0 ) && (
                        <div className="alignCenter" data-test="no-projects">
                          <p>No Projects In the Organization</p>
                        </div>
                    )}
              </TableContainer>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default OrganizationProjects;