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
import { getDateInStandardFormat } from "../../helpers/utils"

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
  }
}));

export function OrganizationClusters(props) {
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
              <strong data-test="title-text"> {"Clusters"} </strong>
            </Typography>
          }
        />
    
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
              <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table" data-test="table-data">
                      <TableHead>
                        <StyledTableRow>
                          <StyledTableCell align="left"> Name </StyledTableCell>
                          <StyledTableCell align="left"> Provider </StyledTableCell>
                          <StyledTableCell align="left"> Created </StyledTableCell>
                          <StyledTableCell align="left"> Phase </StyledTableCell>
                          <StyledTableCell align="left"> Status </StyledTableCell>
                        </StyledTableRow>
                      </TableHead>
                      { props?.clustersList?.length > 0 && props?.clustersList?.map((cluster) => (
                          <TableBody key={cluster?.id}>
                                <StyledTableRow>
                                  <StyledTableCell align="left" data-test="cluster-name">
                                      {cluster?.cluster_name}
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="cluster-provider">
                                      {cluster?.provider === "" ? "-" : cluster?.provider}
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="cluster-date">
                                        {getDateInStandardFormat(cluster?.createdat)} 
                                  </StyledTableCell>
                                  <StyledTableCell align="left" data-test="cluster-status">
                                        {cluster?.status  === "" ? '-' : cluster?.status}
                                  </StyledTableCell>
                                  <StyledTableCell align="left">
                                      <p>
                                        {cluster.active ? (
                                            <p>
                                            <span data-test="cluster-active" className="activestatus"></span> {t('Billing.PromoCodeList.active')}
                                            </p>
                                        ) : (
                                            <p>
                                            <span data-test="cluster-inactive" className="inactivestatus"></span> {t('Billing.PromoCodeList.inactive')}
                                            </p>
                                        )}  
                                      </p> 
                                  </StyledTableCell>
                                </StyledTableRow>
                          </TableBody>
                        ))
                      }
                    </Table>
                    {(!props.clustersList ||  props?.clustersList?.length <= 0 ) && (
                        <div className="alignCenter" data-test="no-clusters">
                          <p>No Clusters In the Organization</p>
                        </div>
                    )}
              </TableContainer>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
}

export default OrganizationClusters;