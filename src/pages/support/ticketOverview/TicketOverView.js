import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomButton from "../../../components/custombutton/CustomButton";
import OverviewTab from "../overviewTab/OverViewTab";
import OtherTicketTab from "../otherTicketTab/OtherTicketTab";
import NotesTab from "../notesTab/NotesTab";
import { updateBreadcrumb} from "../redux/actions";
import { connect } from 'react-redux';
export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2),
    },
}));

export function TicketOverView(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
      
        React.useEffect(() => {    
          props.updateBreadcrumb([
            {
              name: "Support",
              path: "/ticket",
            },
          ]);
      },[])

      React.useEffect(() => {    
        props.updateBreadcrumb([
          {
            name: "Support",
            path: "/ticket",
          },
        ]);
    },[props])

    React.useEffect(() => {
      setValue(0);
    }, [props.match.params.ticketId])

    React.useEffect(() => {
      props.history.location?.state?.allyProp === 1 ? setValue(1) : setValue(0);
    }, [props.history.location?.state?.allyProp])

    const backToListClickHandler = () => {
      props.history.push('/ticket');
    }
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <div className={classes.root} data-test="main-container">
            <div className="listContainer">
                <Typography color="textPrimary" variant="h5">
                    <strong data-test="ticketid-container"> Ticket #{props.match.params.ticketId} </strong>
                </Typography>
                <CustomButton
                    data-test="back-button"
                    onClick={backToListClickHandler}
                    label="Back to the List"
                />
            </div>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" style={{borderBottom: '1px solid #ccc'}}>
            <Tab label="Overview" {...a11yProps(0)} data-test="overview-tab"/>
            <Tab label="Notes" {...a11yProps(1)} data-test="notes-tab" />
            <Tab label="Other Tickets" {...a11yProps(2)} data-test="otherticket-tab" /> 
          </Tabs>
        <TabPanel value={value} index={0} name="overview">
           <OverviewTab />
        </TabPanel>
        <TabPanel value={value} index={1} name="notes">
          <NotesTab />
        </TabPanel>
        <TabPanel value={value} index={2} name="otherticket">
          <OtherTicketTab />
        </TabPanel>
      </div>
    );
}

const mapStateToProps = () => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBreadcrumb: (breadcrumbData) => dispatch(updateBreadcrumb(breadcrumbData)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TicketOverView);
