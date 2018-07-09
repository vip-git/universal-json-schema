/* globals describe,it */
import { expect } from 'chai';

import getLabelComponentProps from './get-label-component-props';

describe('getLabelComponentProps', () => {
  it('configures props for simple field', () => {
    const schema = {
      'title': 'First name',
      'type': 'string',
    };
    const required = [];
    // const data = 'Maxamillian';
    const htmlId = 'unq';
    const expectedLabelProps = {
      htmlFor: htmlId,
      required: false,
    };
    const labelComponentProps = getLabelComponentProps({ schema, required, htmlId });
    expect(labelComponentProps).to.deep.equal(expectedLabelProps);
  });
});
