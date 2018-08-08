import React from 'react';
import { withStyles } from '@material-ui/core//styles';
import styles from './body-styles';
import Example from './Example';

export default withStyles(styles)(({ selectedDemo, classes }) => (
  <div className={classes.body}>
    {<Example data={selectedDemo} />}
  </div>
));
