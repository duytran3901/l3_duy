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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  // root: {
  //   backgroundColor: theme.palette.background.paper,
  //   width: 500,
  // },
  rootVertical: {
    // flexGrow: 1,
    // display: "flex",
    // height: "100%",
    width: "100%",
    overflow: "hidden",
  },
  // tabsVertical: {
  //   borderRight: `1px solid ${theme.palette.divider}`,
  //   minWidth: 150,
  //   position: "fixed",
  //   height: "100%",
  // },
  // tabPanel: {
  //   marginLeft: 177 /* Đặt khoảng cách cho các tab bên trái */,
  //   width: "calc(100% - 150px)" /* Chiếm toàn bộ chiều rộng còn lại */,
  //   height: " 100%",
  //   backgroundColor: "#ededed",
  //   overflowY: "auto" /* Cho phép cuộn dọc nếu nội dung dài */,
  // },

}));

export const CustomTab = (props) => {
  const { tabs } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
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
            <Tab key={index} label={tab.label} {...a11yProps(tab.a11yPropsIndex)} disabled={tab.disabled}/>
          ))}
        </Tabs>
      </AppBar>
      {tabs?.map((tab, idx) => (
        <TabPanel key={idx} value={value} index={tab.a11yPropsIndex} dir={theme.direction}>
          {tab.content}
        </TabPanel>
      ))}
    </div>
  );
}
