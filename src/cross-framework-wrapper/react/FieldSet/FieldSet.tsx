// Library
import React from 'react';
import endsWith from 'lodash/endsWith';
import isEqual from 'lodash/isEqual';
import has from 'lodash/has';

// UI
import Framework from '@universal-schema/framework';

// Utils
import Utils from '@helpers/utils';

// Variants
import { FieldSetProps } from '@core-types/FieldSet.type';
import { isPageLayoutSet } from './variants/page-layout.variants';
import RENDER_BASED_ON_SCHEMA_TYPE from './variants/schema-type.variants';

// Types

const {
  internal: {
    ValidationMessages,
  },
  wrapperComponents: {
    Typography,
    Divider,
    Div,
    FieldsetHTML,
  },
  styles: {
    FieldSetStyles: fieldSetStyles,
  },
} = Framework.uiFramework;

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
      ) : <Div />);

    const LegendSubTitle = () => (schema.description ? (
      <Typography color='textSecondary' variant='body2'>
        {schema.description}
      </Typography>
    ) : <Div />);
    
    return (
      <FieldsetHTML className={classNames(className, classes.root, { [classes.listItem]: endsWith(path, ']') })}>
        {!noTitle && (<LegendTitle />)}
        {!noTitle && (<LegendSubTitle />)}
        {path === '' && <ValidationMessages validation={validation} />}
        <FieldSetContent path={path} {...props} />
      </FieldsetHTML>
    );
  }, (prevProps, nextProps) => isEqual(prevProps, nextProps));

export default RawFieldSet;
