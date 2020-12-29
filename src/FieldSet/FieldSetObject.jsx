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
  isTabContent = false,
  tabKey,
  ...rest 
}) => {
  const orientation = (uiSchema['ui:orientation'] === 'row' ? classes.row : null);
  if (isTabContent) {
    const newPath = path ? `${path}.${tabKey}` : tabKey;
    return (
      <div className={classNames(classes.root, orientation)}>
        <FormField
            key={tabKey}
            objectData={data}
            path={newPath}
            required={schema.required}
            schema={schema.properties[tabKey]}
            data={data[tabKey]}
            uiSchema={uiSchema[tabKey] || {}}
            validation={validation[tabKey] || {}}
            {...rest}
        />
      </div>
    );
  }
  return (
    <div className={classNames(classes.root, orientation)}>
      {keys(schema.properties).map((propId) => {
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
      })}
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetObject)(RawFieldSetObject);
