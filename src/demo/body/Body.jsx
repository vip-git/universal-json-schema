import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './body-styles';
import Example from './Example';
import UIBundler from './ui-bundler';

export default withStyles(styles)(({ selectedDemo, classes }) => (
  <div className={classes.body}>
    {
      window.location.hash.replace('#', '') === 'ui-bundler' ? (
        <UIBundler />
      ) : (
        <Example data={selectedDemo} />
      )
    }
  </div>
));
