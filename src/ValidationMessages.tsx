// Library
import React from 'react';
import keys from 'lodash/keys';
import filter from 'lodash/filter';

// Material UI
import Alert from '@mui/lab/Alert';
import { withStyles, makeStyles } from '@material-ui/styles';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

const validationStyles = {};

const alertStyles = makeStyles({
  root: {
    '& > div.MuiAlert-message': {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    '& > div.MuiAlert-icon': {
      display: 'flex',
      alignItems: 'center',
    },
  },
});

const Validation = ({ validation }) => {
  const styles = alertStyles();
  return (
    <div style={{ marginTop: 20 }}>
      <Alert severity='error' className={styles.root}>
        <span>
          {validation.title && (
          <b> 
          {' '}
          {validation.title} 
          {' '}
          <br />
          {' '}
          </b>
          )}
          {validation.message}
        </span>
        {validation.rule === 'offline' && (
          <Button onClick={validation.callback}> 
            <Icon>{'autorenew'}</Icon>
          </Button>
        )}
      </Alert>
    </div>
  );
};

const Validations = ({ validation }) => (
  <div>
    {validation.map((v, idx) => !v.inline && (
      <Validation 
        key={`${v + idx}`}
        validation={v}
      />
    ))}
  </div>
);
const ValidationMessages = ({ validation }) => (
  <div>
    {validation && filter(keys(validation), (k) => {
      const v = validation[k];
      return v && v.length > 0;
    }).map((v) => (
      <Validations key={v} validation={validation[v]} />
    ))}
  </div>
);

export default withStyles(validationStyles)(ValidationMessages);
