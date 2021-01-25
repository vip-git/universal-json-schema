import React from 'react';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';
import FieldSet, { shouldHideTitle } from './FieldSet';
import Field from './fields';
import styles from './form-field-styles';

// exported for unit testing
export const RawFormField = React.memo(({
  schema, 
  data, 
  uiSchema = {},
  onChange, 
  dynamicKeyField,
  onUpdateKeyProperty,
  onKeyDown,
  path,
  ...rest 
}) => {
  const classes = styles();
  const { type, component: backwardsCompatibleComponent } = schema;
  const newComponent = uiSchema['ui:component'];
  const component = backwardsCompatibleComponent || newComponent;

  // Todo: condition for array should change
  if ((type === 'object' || type === 'array') && !component) {
    return (
        <FieldSet
          path={path}
          schema={schema}
          data={data}
          uiSchema={uiSchema}
          onKeyDown={onKeyDown}
          onChange={onChange}
          hideTitle={shouldHideTitle(uiSchema, schema)}
          onUpdateKeyProperty={onUpdateKeyProperty}
          dynamicKeyField={dynamicKeyField}
          {...rest} 
        />
    );
  }
  const onGivenChange = dynamicKeyField === 'key' ? onUpdateKeyProperty : onChange;
  return (
      <Field
        className={classes.field}
        path={path}
        schema={schema}
        data={data}
        uiSchema={uiSchema}
        onChange={onGivenChange && onGivenChange(path)}
        onKeyDown={onKeyDown}
        dynamicKeyField={dynamicKeyField}
        {...rest}
      />
  );
}, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data) 
                            && isEqual(prevProps.schema, nextProps.schema)
                            && isEqual(prevProps.uiData, nextProps.uiData)
                            && isEqual(prevProps.uiSchema, nextProps.uiSchema),
);

export default RawFormField;
