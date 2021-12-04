// Library
import React from 'react';

import Form from '../../../../../src/framework';
import stepper from './form-bundler';

export default function FormComponent() {
  const {
    schema,
    uiSchema,
    formData,
    xhrSchema,
  } = stepper;

  const [formDataState, setFormData] = React.useState({ ...formData });

  const onFormChanged = ({ 
    formData: dFormData, 
    uiSchema: dUISchema,
    uiData,
    schemaErrors: givenSchemaErrors, 
    validSchema: givenValidSchema,
  }) => {
    setFormData(dFormData);
  };

  return (
    <Form
      schema={schema}
      xhrSchema={xhrSchema}
      uiSchema={uiSchema}
      formData={formDataState}
      onChange={onFormChanged}
    />
  );
}
