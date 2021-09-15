import React from 'react';
import { withStyles } from '@material-ui/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LeftDrawer from './LeftDrawer';
import menuStyles from './menu-styles';
import VersionSelect from './versionSelect';
import MaterialVersionSelect from './material-version-select';

class RawMenuAppBar extends React.Component {
  state = {
    drawerOpen: false,
  };

  toggleDrawer = (visible) => () => {
    this.setState({ drawerOpen: visible });
  };

  render() {
    const { classes, onSelectMenuItem, setVersion } = this.props;
    const { drawerOpen } = this.state;
    return (
      // eslint-disable-next-line react/jsx-fragments
      <React.Fragment>
        <AppBar position={'static'} className={classes.toolbar}>
          <Toolbar>
            <Hidden only={['lg', 'xl']}>
              <IconButton
                className={classes.menuButton}
                color='inherit'
                aria-label='Menu'
                onClick={this.toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <div className={classes.flexCtr}>
              <Typography color='inherit'>React JSONSchema Form (Material UI)</Typography>
            </div>
            <MaterialVersionSelect version={4} />
            <VersionSelect setVersion={setVersion} />
            <IconButton aria-label="github" onClick={() => { window.location.href = 'https://github.com/vip-git/react-jsonschema-form-material-ui'}}>
              <GitHubIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
        <LeftDrawer open={drawerOpen} toggleDrawer={this.toggleDrawer} onSelectMenuItem={onSelectMenuItem} />
      </React.Fragment>
    );
  }
}
export default withStyles(menuStyles)(RawMenuAppBar);
