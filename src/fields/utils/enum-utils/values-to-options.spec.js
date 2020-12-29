/* globals describe,it */
import { expect } from 'chai';
import valuesToOptions from './values-to-options';

describe('valuesToOptions', () => {
  it('returns key = value form array', () => {
    const values = ['one', 'two', 'three'];
    const expected = [
      {
        key: 'one',
        value: 'one',
      },
      {
        key: 'two',
        value: 'two',
      },
      {
        key: 'three',
        value: 'three',
      },
    ];
    const actual = valuesToOptions(values);
    expect(actual).to.deep.equal(expected);
  });
  it('handles object', () => {
    const values = {
      one: 'One',
      two: 'Two',
      three: 'Three',
    };
    const expected = [
      {
        key: 'one',
        value: 'One',
      },
      {
        key: 'two',
        value: 'Two',
      },
      {
        key: 'three',
        value: 'Three',
      },
    ];
    const actual = valuesToOptions(values);
    expect(actual).to.deep.equal(expected);
  });
});
