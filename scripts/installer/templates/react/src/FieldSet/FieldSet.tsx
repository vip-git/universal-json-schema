// Library
import React from 'react';
import endsWith from 'lodash/endsWith';
import isEqual from 'lodash/isEqual';
import has from 'lodash/has';

// Material UI
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Utils
import Utils from '../helpers/utils';

// Styles
import fieldSetStyles from './field-set-styles';

// Validation Messages
import ValidationMessages from '../ValidationMessages';

// Variants
import { isPageLayoutSet } from './variants/page-layout.variants';
import RENDER_BASED_ON_SCHEMA_TYPE from './variants/schema-type.variants';

// Types
import { FieldSetProps } from '../types/FieldSet.type';

const classNames = require('classnames');

export const shouldHideTitle = (uiSchema, schema) => isPageLayoutSet(uiSchema) || has(schema, 'items.enum');

export const RawFieldSetContent = (props) => {
  const { schema = {}, uiSchema = {}, xhrSchema = {} } = props;
  const { type } = schema;
  const classes = fieldSetStyles.fieldSetContent();
  const SchemaTypeComponents = RENDER_BASED_ON_SCHEMA_TYPE({
    schema,
    uiSchema,
    xhrSchema,
    props: { ...props, classes },
  });
  return Utils.callFunctionIfExists(SchemaTypeComponents, type);
};

export const FieldSetContent = RawFieldSetContent;

// for unit testing
const RawFieldSet = React.memo(
  (props: FieldSetProps) => {
    const {
      className,
      path,
      schema = {},
      hideTitle, 
      noTitle, 
      validation,
    } = props;
    const classes = fieldSetStyles.fieldSet();
    const LegendTitle = () => ((
      !hideTitle 
      || path === '' 
      || path?.includes('.')
    ) && !has(schema, 'items.enum') && schema.title ? (
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
      ) : <div />);

    const LegendSubTitle = () => (schema.description ? (
      <Typography color='textSecondary' variant='body2'>
        {schema.description}
      </Typography>
    ) : <div />);
    
    return (
      <fieldset className={classNames(className, classes.root, { [classes.listItem]: endsWith(path, ']') })}>
        {!noTitle && (<LegendTitle />)}
        {!noTitle && (<LegendSubTitle />)}
        {path === '' && <ValidationMessages validation={validation} />}
        <FieldSetContent path={path} {...props} />
      </fieldset>
    );
  }, (prevProps, nextProps) => isEqual(prevProps, nextProps));

export default RawFieldSet;
