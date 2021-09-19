/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import keys from 'lodash/keys';
import { withStyles } from '@mui/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import examples from '../examples';

// Context
import VersionContext from '../context/version.context';

import menuStyles from './menu-styles';

export default withStyles(menuStyles)(({ toggleDrawer, classes, onSelectMenuItem }) => { 
  const version = React.useContext(VersionContext);
  // onSelectMenuItem(examples[version][e], e) for bundler
  /*** 
    UI-Bundler disabled for now should be enabled after testing and release note / documentation on usage.
    <List subheader={<ListSubheader component='div'>Bundler</ListSubheader>}>
      <ListItem key={'bundler'} button>
          <ListItemText 
            primary={'UI-Bundler'} 
            onClick={onSelectMenuItem(examples[version].simple, 'ui-bundler')} 
          />
      </ListItem>
    </List> 
  ***/
  return (
    <div
      tabIndex={0}
      role='button'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.drawerList}
    >
      <List subheader={<ListSubheader component='div'>Showcase</ListSubheader>}>
        {keys(examples[version]).map((e) => (
          <ListItem key={e} button>
            <ListItemText primary={examples[version][e].title} onClick={onSelectMenuItem(examples[version][e], e)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
});
