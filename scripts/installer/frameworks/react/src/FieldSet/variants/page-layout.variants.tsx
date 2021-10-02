// Library
import React from 'react';

// Config
import CONFIG from '../../../config';

// Layout types
import FieldSetObject from '../FieldSetObject';
import FieldSetTabs from '../FieldSetTabs';
import FieldSetSteps from '../FieldSetStepper';

const { PAGE_LAYOUTS } = CONFIG;

export const isPageLayoutSet = (uiSchema) => {
  const pageSchema = uiSchema['ui:page'];
  return pageSchema ? pageSchema['ui:layout'] : false;
};

export const getPageLayout = (uiSchema) => isPageLayoutSet(uiSchema) || 'default';

const RENDER_PAGE_PAGE_LAYOUT = ({
  uiSchema,
  schema,
  xhrSchema,
  props,
}) => ({
  [PAGE_LAYOUTS.TABS]: () => (
      <FieldSetTabs 
        uiSchema={uiSchema} 
        schema={schema} 
        xhrSchema={xhrSchema}
        {...props} 
      />
  ),
  [PAGE_LAYOUTS.STEPS]: () => (
      <FieldSetSteps
        uiSchema={uiSchema} 
        schema={schema} 
        xhrSchema={xhrSchema}
        {...props} 
      />
  ),
  [PAGE_LAYOUTS.DEFAULT]: () => (
      <FieldSetObject 
        uiSchema={uiSchema} 
        schema={schema} 
        xhrSchema={xhrSchema}
        {...props} 
      />
  ),
});

export default RENDER_PAGE_PAGE_LAYOUT;
