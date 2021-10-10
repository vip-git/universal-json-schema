// Library
import React from 'react';

// Material UI
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

// UI
import Framework from '@universal-schema/framework';

const {
  wrapperComponents: {
    Typography,
  },
  styles: {
    FieldSetStyles: fieldSetStyles
  }
} = Framework.uiFramework;

// Internal
import FieldSetObject from './FieldSetObject';

// Helpers
import {
  getHashCodeFromXHRDef,
} from '@helpers/state-machine/form/hooks';

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
    uiSchema = { 'ui:page': { 'tabs': {} } },
    xhrProgress,
    onTabChange,
  } = props;
  const classes = fieldSetStyles.fieldSetTabs();
  const hashRef = getHashCodeFromXHRDef({
    eventName: 'onload',
    fieldPath: 'ui:page',
    xhrSchema,
  });
  const isFormLoading = xhrProgress && hashRef && xhrProgress[hashRef];
  const { 
    tabs = {
      props: {},
      style: {},
    },
    tab = {
      style: {},
      props: {},
    },
    tabPanel = {
      style: {},
      props: {},
    },
  } = uiSchema['ui:page'];
  const { style: tabsStyle, props: tabsProps } = tabs;
  const { style: tabStyle, props: tabProps } = tab;
  const { style: tabPanelStyle, props: tabPanelProps } = tabPanel;
  const value = tabsProps?.tabIndex || 0;

  return (
    <div 
      style={{
        width: '100%',
        ...tabsStyle,
      }}
    >
      <AppBar position='static' color='default' className={classes.root}>
        <Tabs 
          className={classes.root}
          value={value}
          onChange={onTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          scrollButtons='auto'
          aria-label='form-tabs'
          {...tabsProps}
        >
          {
            Object.keys(schema.properties).map((p, k) => (
              <Tab 
                className={classes.root}
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
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                key={`auto-tab-body-${newPath + k}`}
                value={value}
                index={k}
                className={classes.root}
                style={{ ...tabPanelStyle }}
                {...tabPanelProps}
              >
                {
                  isFormLoading ? (
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
