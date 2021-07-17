// Library
import React from 'react';
import { mount } from 'enzyme';

// Internal
import Form from '../Form';

describe('Form', () => {
  it('Mount the form with basic fields', () => {
    const path = 'name';
    const onChange = jest.fn(() => 'onChangeFunc');
    const schema = {
      'type': 'string',
      'title': 'First Name',
    };

    const uiSchema = {
    };

    const data = 'Bob';

    // act
    const wrapper = mount(
      <Form 
        schema={schema}
        uiSchema={uiSchema}
        formData={data}
        prefixId={'test'}
        onChange={({ formData }) => jest.fn(formData)}
        onSubmit={(submittedData) => jest.fn(submittedData)}
      />,
    );

    // check
    expect(wrapper).toHaveLength(1);
  });


  it('Mount the form with basic fields (with error)', () => {
    const path = 'name';
    const onChange = jest.fn(() => 'onChangeFunc');
    const schema = {
      'type': 'string',
      'title': 'First Name',
    };

    const uiSchema = {
    };

    const data = 1;

    // act
    const wrapper = mount(
      <Form 
        schema={schema}
        uiSchema={uiSchema}
        formData={data}
        prefixId={'test'}
        onChange={({ formData }) => jest.fn(formData)}
        onSubmit={(submittedData) => jest.fn(submittedData)}
      />,
    );

    // check
    expect(wrapper).toHaveLength(1);
  });
});
