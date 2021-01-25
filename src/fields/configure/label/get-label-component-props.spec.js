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
    const htmlid = 'unq';
    const expectedLabelProps = {
      htmlFor: htmlid,
      required: false,
    };
    const labelComponentProps = getLabelComponentProps({ schema, required, htmlid });
    expect(labelComponentProps).to.deep.equal(expectedLabelProps);
  });
});
