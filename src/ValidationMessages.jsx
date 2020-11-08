import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import keys from 'lodash/keys';
import filter from 'lodash/filter';

const validationStyles = {};

const Validation = ({ validation }) => (
  <div>
    <p>{validation.message}</p>
  </div>
);

const Validations = ({ validation }) => (
  <div>
    {validation.map((v, idx) => !v.inline && (<Validation key={`${v + idx}`} validation={v} />))}
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
