// Library
import React from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Internal
import FieldSetObject from './FieldSetObject';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box component={'div'} p={3}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const FieldSetTabs = (props) => {
  const { schema = {}, path } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='form-tabs'
        >
          {
            Object.keys(schema.properties).map((p, k) => (
              <Tab style={{ textTransform: 'none' }} label={schema.properties[p].title} key={`auto-tab-head-${k}`} {...a11yProps(k)} />
            ))
          }
        </Tabs>
      </AppBar>
      {
        Object.keys(schema.properties).map((p, k) => {
          const newPath = path ? `${path}.${p}` : p;
          return (
              <TabPanel key={`auto-tab-body-${k}`} value={value} index={k}>
                <FieldSetObject {...props} tabKey={p} isTabContent />
              </TabPanel>
          );
        })
      }
    </>
  );
};

export default FieldSetTabs;
