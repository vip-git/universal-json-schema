// Library
import React from 'react';

// Internal
import FieldSetArray from '../FieldSetArray';

// Config
import CONFIG from '@config/index';
import Utils from '@helpers/utils';

// Internal
import RENDER_PAGE_PAGE_LAYOUT, { getPageLayout } from './page-layout.variants';

const { SCHEMA_TYPE } = CONFIG;

const RENDER_BASED_ON_SCHEMA_TYPE = ({
  uiSchema,
  schema,
  xhrSchema,
  props,
}) => ({
  [SCHEMA_TYPE.ARRAY]: () => (
      <FieldSetArray 
        uiSchema={uiSchema}
        schema={schema}
        xhrSchema={xhrSchema}
        {...props} 
      />
  ),
  [SCHEMA_TYPE.OBJECT]: () => Utils.callFunctionIfExists(RENDER_PAGE_PAGE_LAYOUT({
    uiSchema,
    schema,
    xhrSchema,
    props,
  }), getPageLayout(uiSchema)),
});

export default RENDER_BASED_ON_SCHEMA_TYPE;
