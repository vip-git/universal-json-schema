// Library
import React from 'react';
import classNames from 'classnames';
import keys from 'lodash/keys';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';

// Material UI
import { withStyles } from '@material-ui/core/styles';

// Internal
import { Typography } from '@material-ui/core';
import ReorderableFormField from './ReorderableFormField';
import FormField from '../FormField';
import fieldSetStyles from './field-set-styles';
import getDefaultValue from '../helpers/get-default-value';

export const RawFieldSetObject = ({ 
  className, 
  classes,
  schema = {},
  uiSchema = {},
  data = {}, 
  id,
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

  const AdditionalProperties = () => (
    <>
      {
          schema.additionalProperties && (
            <Typography 
                id={`${id}-additionalProperties`}
                variant='body' 
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
        {schema.additionalProperties && keys(data).filter((adp) => !keys(schema.properties).includes(adp))
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
                  data={data[propId]}
                  uiSchema={uiSchema[propId] || {}}
                  validation={validation[propId] || {}}
                  dynamicKeyField={propId}
                  onDeleteItem={rest.onRemoveProperty && rest.onRemoveProperty(newPath)}
                  canReorder={false}
              />
            );
          })}
          {
            schema.additionalProperties && (
              <div className={classes.addItemBtn}>
                <IconButton onClick={
                    rest.onAddNewProperty 
                    && rest.onAddNewProperty(path, getDefaultValue(schema.additionalProperties))
                  }
                >
                  <AddCircle /> 
                    {' '}
                </IconButton>
              </div>
            )
          }
      </>
  );

  const NormalProperties = () => (
    <>
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
    </>
  );

  return (
    <div className={classNames(classes.root, orientation)}>
      {
        Object.keys(schema).indexOf('additionalProperties') > Object.keys(schema).indexOf('properties') ? (
          <>
            <NormalProperties />
            <AdditionalProperties />
          </>
        ) : (
          <>
            <AdditionalProperties />
            <NormalProperties />
          </>
        )
      }
    </div>
  );
};
export default withStyles(fieldSetStyles.fieldSetObject)(RawFieldSetObject);
