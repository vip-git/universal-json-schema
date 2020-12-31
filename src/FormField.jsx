import React from 'react';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';
import FieldSet, { isPageLayoutTabs } from './FieldSet';
import Field from './fields';
import styles from './form-field-styles';

// exported for unit testing
export const RawFormField = React.memo(({
  schema, 
  data, 
  uiSchema = {},
  onChange, 
  onKeyDown,
  path, 
  ...rest 
}) => {
  const classes = styles();
  const { type } = schema;
  // Todo: condition for array should change
  if (type === 'object' || type === 'array') {
    return (
        <FieldSet
          path={path}
          schema={schema}
          data={data}
          uiSchema={uiSchema}
          onKeyDown={onKeyDown}
          onChange={onChange}
          hideTitle={isPageLayoutTabs(uiSchema)}
          {...rest} 
        />
    );
  }
  return (
      <Field
        className={classes.field}
        path={path}
        schema={schema}
        data={data}
        uiSchema={uiSchema}
        onChange={onChange && onChange(path)}
        onKeyDown={onKeyDown}
        {...rest}
      />
  );
}, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data) 
                            && isEqual(prevProps.schema, nextProps.schema)
                            && isEqual(prevProps.uiSchema, nextProps.uiSchema),
);

export default RawFormField;
