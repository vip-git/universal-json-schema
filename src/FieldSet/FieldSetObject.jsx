/* eslint-disable no-mixed-operators */
// Library
import React from 'react';
import classNames from 'classnames';
import keys from 'lodash/keys';
import get from 'lodash/get';

// Icons
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// Internal
import ReorderableFormField from './ReorderableFormField';
import FormField from '../FormField';

// Style
import fieldSetStyles from './field-set-styles';

// Helpers
import getDefaultValue from '../helpers/get-default-value';
import getDefinitionSchemaFromRef from '../helpers/get-definition-schema';
import { LoadingContext } from '../helpers/context';

export const RawFieldSetObject = ({ 
  className, 
  classes,
  schema: givenSchema = {},
  uiSchema = {},
  xhrSchema = {},
  data = {},
  uiData = {},
  definitions = {},
  id,
  idxKey,
  path,
  validation = {}, 
  isTabContent = false,
  tabKey,
  ...rest 
}) => {
  const schema = { ...givenSchema };
  const isLoading = React.useContext(LoadingContext);
  const orientation = (uiSchema['ui:orientation'] === 'row' ? classes.row : null);
  if (isTabContent) {
    const newPath = path ? `${path}.${tabKey}` : tabKey;
    const propSchema = schema.properties[tabKey].$ref 
      ? getDefinitionSchemaFromRef(definitions, schema.properties[tabKey], data[tabKey])
      : schema.properties[tabKey];
    const finalData = { ...data[tabKey] };  
    return (isLoading && isLoading[tabKey]) ? 'Loading...' : (
      <div className={classNames(classes.root, orientation)}>
        <FormField
            key={tabKey}
            objectData={data}
            path={newPath}
            required={schema.required}
            schema={propSchema}
            data={uiData[tabKey] && Object.assign(finalData, uiData[tabKey]) || finalData}
            uiSchema={uiSchema[tabKey] || {}}
            xhrSchema={xhrSchema?.properties && xhrSchema?.properties[tabKey] || {}}
            validation={validation[tabKey] || {}}
            definitions={definitions}
            {...rest}
        />
      </div>
    );
  }
  
  return (
    <div className={classNames(classes.root, orientation)}>
      {
        Object.keys(schema).indexOf('additionalProperties') > Object.keys(schema).indexOf('properties') 
        && keys(schema.properties).map((propId) => {
          const newPath = path ? `${path}.${propId}` : propId;
          const propSchema = schema.properties[propId].$ref
            ? getDefinitionSchemaFromRef(definitions, schema.properties[propId], data[propId])
            : schema.properties[propId];
          return (isLoading && isLoading[propId]) ? 'Loading...' : (
            <FormField
                key={propId}
                objectData={data}
                path={newPath}
                required={schema.required}
                schema={propSchema}
                data={uiData[propId] || data[propId]}
                uiSchema={uiSchema[propId] || {}}
                xhrSchema={xhrSchema?.properties && xhrSchema?.properties[propId] || {}}
                validation={validation[propId] || {}}
                definitions={definitions}
                {...rest}
            />
          );
        })
      }
      {
        schema.additionalProperties && (
          <Typography 
              id={`${id}-additionalProperties`}
              variant='body1' 
              style={{ 
                padding: 8,
                fontSize: '1rem',
                color: '#7a7a7a',
              }}
          >
            {schema.additionalProperties.title}
          </Typography>
        )
      }
      {
        schema.additionalProperties && keys(data).filter((adp) => !keys(schema.properties).includes(adp))
          .map((propId, idx) => {
            const newPath = path ? `${path}.${propId}` : propId;
            return (
              <ReorderableFormField
                  {...rest}
                  key={propId}
                  objectData={data}
                  path={newPath}
                  required={schema.required}
                  schema={schema.additionalProperties}
                  data={uiData[propId] || data[propId]}
                  uiSchema={uiSchema[propId] || {}}
                  xhrSchema={xhrSchema?.properties && xhrSchema?.properties[propId] || {}}
                  validation={validation[propId] || {}}
                  dynamicKeyField={propId}
                  onDeleteItem={rest.onRemoveProperty && rest.onRemoveProperty(newPath)}
                  canReorder={false}
                  definitions={definitions}
                  noTitle
              />
            );
          })
        }
        {
          schema.additionalProperties && (
            <div className={classes.addItemBtn}>
              <IconButton 
                onClick={
                  rest.onAddNewProperty 
                  && rest.onAddNewProperty(path, getDefaultValue(schema.additionalProperties))
                }
                style={uiSchema?.additionalProperties && uiSchema?.additionalProperties['ui:style'] ? {
                  ...uiSchema?.additionalProperties['ui:style'],
                } : {}}
              >
                <AddCircle /> 
                  <span 
                  style={{ 
                    position: 'relative',
                    right: 5,
                  }}
                  >
                  { uiSchema?.additionalProperties && uiSchema?.additionalProperties['ui:options']?.buttonTitle }
                  </span>
              </IconButton>
            </div>
          )
        }
        {
          Object.keys(schema).indexOf('additionalProperties') < Object.keys(schema).indexOf('properties') 
          && keys(schema.properties).map((propId) => {
            const newPath = path ? `${path}.${propId}` : propId;
            const propSchema = schema.properties[propId].$ref
              ? getDefinitionSchemaFromRef(definitions, schema.properties[propId], data[propId])
              : schema.properties[propId];
            return (isLoading && isLoading[propId]) ? 'Loading...' : (
              <FormField
                  key={propId}
                  objectData={data}
                  path={newPath}
                  required={schema.required}
                  schema={propSchema}
                  data={typeof uiData[propId] === 'string' && uiData[propId] || data[propId]}
                  uiSchema={uiSchema[propId] || {}}
                  xhrSchema={xhrSchema?.properties && xhrSchema?.properties[propId] || {}}
                  validation={validation[propId] || {}}
                  definitions={definitions}
                  {...rest}
              />
            );
          })
        }
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetObject)(RawFieldSetObject);
