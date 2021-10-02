// Library
import React from 'react';
import { mountTheme } from '../helpers/enzyme-unit-test';

// Internal
import ReactForm from '..';

const Form: any = ReactForm;

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
    const wrapper = mountTheme({
      component: (
        <Form 
          schema={schema}
          uiSchema={uiSchema}
          formData={data}
          prefixId={'test'}
          onChange={({ formData }) => jest.fn(formData)}
          onSubmit={(submittedData) => jest.fn(submittedData)}
        />
      )
    });

    // check
    expect(wrapper).toHaveLength(1);
  });


  it('Mount the form with basic fields (with error)', () => {
    const path = 'name';
    const onChange = jest.fn(() => 'onChangeFunc');
    const schema = {
      'type': 'integer',
      'title': 'First Name',
    };

    const uiSchema = {
    };

    const data = 'hello';

    // act
    const wrapper = mountTheme({
      component: (
        <Form 
          schema={schema}
          uiSchema={uiSchema}
          formData={data}
          prefixId={'test'}
          onChange={({ formData }) => jest.fn(formData)}
          onSubmit={(submittedData) => jest.fn(submittedData)}
        />
      )
    });

    // check
    expect(wrapper).toHaveLength(1);
  });
});
