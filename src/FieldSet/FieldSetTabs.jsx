// Library
import React from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    'id': `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const FieldSetTabs = (props) => {
  const { 
    schema = {},
    path,
    xhrSchema = {}, 
    uiSchema = { 'ui:page': { 'ui:tabs': {} } },
  } = props;
  const xhrProgress = xhrSchema 
                        && xhrSchema['ui:page'] 
                        && xhrSchema['ui:page'].onload 
                        && xhrSchema['ui:page'].onload.xhrProgress;
  const tabsProps = uiSchema['ui:page']['ui:tabs']?.props || {};
  const tabsStyle = uiSchema['ui:page']['ui:tabs']?.style || {};
  const tabStyle = uiSchema['ui:page']['ui:tabs']?.tab?.style || {};
  const tabProps = uiSchema['ui:page']['ui:tabs']?.tab?.props || {};
  const tabPanelStyle = uiSchema['ui:page']['ui:tabs']?.tabPanel?.style || {};
  const tabPanelProps = uiSchema['ui:page']['ui:tabs']?.props || {};
  const [value, setValue] = React.useState(tabsProps?.tabIndex - 1 || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div 
      style={{
        width: '100%',
        ...tabsStyle,
      }}
    >
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='form-tabs'
          {...tabsProps}
        >
          {
            Object.keys(schema.properties).map((p, k) => (
              <Tab 
                style={{ textTransform: 'none', ...tabStyle }} 
                label={schema.properties[p].title} 
                key={`auto-tab-head-${schema.properties[p].title} + k}`} 
                {...a11yProps(k)} 
                {...tabProps}
              />
            ))
          }
        </Tabs>
      </AppBar>
      {
        Object.keys(schema.properties).map((p, k) => {
          const newPath = path ? `${path}.${p}` : p;
          return (
              <TabPanel 
                key={`auto-tab-body-${newPath + k}`}
                value={value}
                index={k}
                style={{ ...tabPanelStyle }}
                {...tabPanelProps}
              >
                {
                  xhrProgress ? (
                    <div 
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 50,
                      }}
                    > 
                      <CircularProgress disableShrink />
                    </div>
                  ) : (
                    <FieldSetObject 
                        {...props} 
                        tabKey={p}
                        isTabContent
                    />
                  )
                }
              </TabPanel>
          );
        })
      }
    </div>
  );
};

export default FieldSetTabs;
