/* eslint-disable no-mixed-operators */
/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import endsWith from 'lodash/endsWith';
import isEqual from 'lodash/isEqual';
import has from 'lodash/has';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Internal
import fieldSetStyles from './field-set-styles';
import FieldSetArray from './FieldSetArray';
import FieldSetObject from './FieldSetObject';
import FieldSetTabs from './FieldSetTabs';
import FieldSetSteps from './FieldSetStepper';

// Validation Messages
import ValidationMessages from '../ValidationMessages';

const isPageLayoutSet = (uiSchema) => {
  const pageSchema = uiSchema['ui:page'];
  return pageSchema && pageSchema['ui:layout'] || false;
};

export const shouldHideTitle = (uiSchema, schema, path) => isPageLayoutSet(uiSchema, path) || has(schema, 'items.enum');

export const RawFieldSetContent = (props) => {
  const { schema = {}, uiSchema = {}, xhrSchema = {}, } = props;
  const { type } = schema;
  if (type === 'array') {
    return (
      <FieldSetArray 
        uiSchema={uiSchema}
        schema={schema}
        xhrSchema={xhrSchema}
        {...props} 
      />
    );
  }
  if (type === 'object') {
    const pageLayout = isPageLayoutSet(uiSchema);
    switch (pageLayout) {
      case 'tabs':
        return (
          <FieldSetTabs 
            uiSchema={uiSchema} 
            schema={schema} 
            xhrSchema={xhrSchema}
            {...props} 
          />
        );

      case 'steps':
        return (
          <FieldSetSteps
            uiSchema={uiSchema} 
            schema={schema} 
            xhrSchema={xhrSchema}
            {...props} 
          />
        );  
    
      default:
        return (
          <FieldSetObject 
            uiSchema={uiSchema} 
            schema={schema} 
            xhrSchema={xhrSchema}
            {...props} 
          />
        );
    }
  }
  return null;
};

export const FieldSetContent = withStyles(fieldSetStyles.fieldSetContent)(RawFieldSetContent);

// for unit testing
export class RawFieldSet extends React.Component {
  shouldComponentUpdate = (nextProps) => !isEqual(this.props, nextProps)

  render() {
    const { 
      className, 
      path, classes, 
      schema = {}, hideTitle, 
      noTitle, validation, idxKey, 
      dynamicKeyField,
    } = this.props;
    const LegendTitle = () => (
      !hideTitle 
      || path === '' 
      || path?.includes('.')
    ) && !has(schema, 'items.enum') && schema.title && (
          <>
            <Typography 
              gutterBottom 
              variant='h6' 
                style={path !== '' ? {
                  fontSize: '1.2em',
                  marginTop: 15,
                } : {}}
            >
              {schema.title}
            </Typography>
            <Divider style={{ marginBottom: 6 }} />
          </>
    ) || <div />;

    const LegendSubTitle = () => schema.description && (
      <Typography color='textSecondary' variant='body2'>
        {schema.description}
      </Typography>
    ) || <div />;
    
    return (
      <fieldset className={classNames(className, classes.root, { [classes.listItem]: endsWith(path, ']') })}>
        {!noTitle && (<LegendTitle />)}
        {!noTitle && (<LegendSubTitle />)}
        {path === '' && <ValidationMessages validation={validation} />}
        <FieldSetContent path={path} {...this.props} />
      </fieldset>
    );
  }
}

export default withStyles(fieldSetStyles.fieldSet)(RawFieldSet);
