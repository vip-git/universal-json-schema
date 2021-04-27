/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
import React from 'react';
import keys from 'lodash/keys';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import examples from '../examples';

// Context
import VersionContext from '../context/version.context';

import menuStyles from './menu-styles';

export default withStyles(menuStyles)(({ toggleDrawer, classes, onSelectMenuItem }) => { 
  const version = React.useContext(VersionContext);
  // onSelectMenuItem(examples[version][e], e) for bundler
  return (
    <div
      tabIndex={0}
      role='button'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.drawerList}
    >
      /* UI-Bundler disabled for now should be enabled after testing and release note / documentation on usage.
        <List subheader={<ListSubheader component='div'>Bundler</ListSubheader>}>
          <ListItem key={'bundler'} button>
              <ListItemText 
                primary={'UI-Bundler'} 
                onClick={onSelectMenuItem(examples[version].simple, 'ui-bundler')} 
              />
          </ListItem>
        </List> 
      */
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
