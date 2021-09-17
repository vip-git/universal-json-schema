import React from 'react';
import { withStyles } from '@material-ui/styles';
import Drawer from '@mui/material/Drawer';
import Hidden from '@mui/material/Hidden';
import MenuItems from './MenuItems';
import menuStyles from './menu-styles';

export default withStyles(menuStyles)(({ classes, open, toggleDrawer, onSelectMenuItem }) => (
  <div>
    <Hidden only={['xs', 'sm', 'md']}>
      <Drawer variant={'permanent'} className={classes.permanentLeftDrawer}>
        <MenuItems toggleDrawer={toggleDrawer} onSelectMenuItem={onSelectMenuItem} />
      </Drawer>
    </Hidden>
    <Hidden only={['lg', 'xl']}>
      <Drawer open={open} className={classes.leftDrawer} onClose={toggleDrawer(false)}>
        <MenuItems toggleDrawer={toggleDrawer} onSelectMenuItem={onSelectMenuItem} />
      </Drawer>
    </Hidden>
  </div>
));
