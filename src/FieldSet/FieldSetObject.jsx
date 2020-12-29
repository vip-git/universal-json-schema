// Library
import React from 'react';
import classNames from 'classnames';
import keys from 'lodash/keys';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Internal
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';

export const RawFieldSetObject = ({ 
  className, 
  classes,
  schema = {},
  uiSchema = {},
  data = {}, 
  idxKey,
  path,
  validation = {}, 
  isTabContent,
  tabKey,
  ...rest 
}) => {
  const orientation = (uiSchema['ui:orientation'] === 'row' ? classes.row : null);
  const FormFieldContent = ({ propId }) => {
    const newPath = path ? `${path}.${propId}` : propId;
    return (
      <FormField
          key={propId}
          objectData={data}
          path={newPath}
          required={schema.required}
          schema={schema.properties[propId]}
          data={data[propId]}
          uiSchema={uiSchema[propId] || {}}
          validation={validation[propId] || {}}
          {...rest}
      />
    );
  };
  if (isTabContent) {
    const newPath = path ? `${path}.${tabKey}` : tabKey;
    return (
      <div className={classNames(classes.root, orientation)}>
        <FormFieldContent propId={tabKey} />
      </div>
    );
  }
  return (
    <div className={classNames(classes.root, orientation)}>
      {keys(schema.properties).map((p) => <FormFieldContent propId={p} />)}
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetObject)(RawFieldSetObject);
