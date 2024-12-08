import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function a11yPropsVertical(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: 170,
    paddingTop: 20
  },
  tabPanel: {
    width: '100%',
    maxWidth: '75vw',
    padding: theme.spacing(3),
    backgroundColor: '#ededed',
    overflowY: 'auto',
  },
  tabPanelVertical: {
    width: '100%',
    maxWidth: '75vw',
    padding: 0,
    backgroundColor: '#ededed',
    overflowY: 'auto',
  },
}));

export const CustomTab = (props) => {
  const { tabs } = props;
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} {...a11yProps(tab.a11yPropsIndex)} disabled={tab.disabled} />
          ))}
        </Tabs>
      </AppBar>
      <div className='mt-20'>
        {tabs?.map((tab, idx) => (
          <TabPanel key={idx} value={value} index={tab.a11yPropsIndex} dir={theme.direction}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}

export const VerticalCustomTab = (props) => {
  const { tabs } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yPropsVertical(index)} disabled={tab.disabled} />
        ))}
      </Tabs>
      <div className={classes.tabPanelVertical}>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index} dir={theme.direction}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
}