// Library
import React from 'react';
import isEqual from 'lodash/isEqual';
import forEach from 'lodash/forEach';
import has from 'lodash/has';
import set from 'lodash/set';
import get from 'lodash/get';

// Internal
import { isEmptyValues } from '@helpers/remove-empty-values';

// Types
import { FormFieldProps } from '@core-types/FormField.type';

// UI
import Framework from '@universal-schema/framework';
import Field from './fields';
import FieldSet, { shouldHideTitle } from './FieldSet';

const {
  styles: {
    FormFieldStyles: styles,
  },
} = Framework.uiFramework;

// exported for unit testing
export const RawFormField = React.memo(({
  schema, 
  data, 
  uiSchema = {},
  xhrSchema = {},
  onChange,
  onXHRSchemaEvent,
  dynamicKeyField,
  onUpdateKeyProperty,
  onKeyDown,
  path,
  id,
  ...rest 
}: FormFieldProps) => {
  const classes: any = styles();
  const { type, component: backwardsCompatibleComponent } = schema;
  const newComponent = uiSchema['ui:component'];
  const component = backwardsCompatibleComponent || newComponent;

  // Todo: condition for array should change
  if ((type === 'object' || type === 'array') && !component) {
    const newSchema = JSON.parse(JSON.stringify(schema));
    // Inject dependencies
    if (newSchema.dependencies) {
      forEach(newSchema.dependencies, (scd, scdk) => {
        if (has(data, scdk) && !isEmptyValues(get(data, scdk))) {
          set(newSchema, 'properties', { ...newSchema.properties, ...newSchema.dependencies[scdk].properties });
          set(newSchema, 'required', [...newSchema?.required, ...newSchema.dependencies[scdk]?.required]);
        }
      });
    }
    
    return (
        <FieldSet
          path={path}
          schema={newSchema}
          data={data}
          uiSchema={uiSchema}
          xhrSchema={xhrSchema}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onXHRSchemaEvent={onXHRSchemaEvent}
          hideTitle={shouldHideTitle(uiSchema, schema)}
          onUpdateKeyProperty={onUpdateKeyProperty}
          dynamicKeyField={dynamicKeyField}
          prefixId={id}
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
        xhrSchema={xhrSchema}
        onChange={onGivenChange && onGivenChange(path)}
        onXHRSchemaEvent={onXHRSchemaEvent(path)}
        onKeyDown={onKeyDown}
        dynamicKeyField={dynamicKeyField}
        prefixId={id}
        {...rest}
      />
  );
}, (prevProps, nextProps) => (
  isEqual(prevProps.data, nextProps.data) 
  && isEqual(prevProps.schema, nextProps.schema)
  && isEqual(prevProps.uiData, nextProps.uiData)
  && isEqual(prevProps.uiSchema, nextProps.uiSchema)
  && isEqual(prevProps.xhrSchema, nextProps.xhrSchema)
  && isEqual(prevProps.xhrProgress, nextProps.xhrProgress)
  && (
    (
      has(prevProps.schema, 'ui:component') 
      || has(prevProps.schema, 'component')
    ) ? prevProps.prefixId === nextProps.prefixId : true
  )
  && isEqual(prevProps.validation, nextProps.validation)
),
);

export default RawFormField;
