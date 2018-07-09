/* globals describe,it */
import { expect } from 'chai';
import getDefaultValue from './get-default-value';

describe('getDefaultValue', () => {
  it('works for string', () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = '';

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).to.equal(expected);
  });
  it('works for string with default value', () => {
    // assemble
    const data = {
      type: 'string',
      default: 'foo',
    };
    const expected = 'foo';

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).to.equal(expected);
  });
  it('works for object', () => {
    // assemble
    const data = {
      type: 'object',
    };
    const expected = {};

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).to.deep.equal(expected);
  });
  it('works for object with properties', () => {
    // assemble
    const data = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    };
    const expected = { name: '' };

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).to.deep.equal(expected);
  });
  it('works for object with properties with default values', () => {
    // assemble
    const data = {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          default: 'bar',
        },
      },
    };
    const expected = { name: 'bar' };

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).to.deep.equal(expected);
  });
  it('works for nested object', () => {
    // assemble
    const data = {
      type: 'object',
      properties: {
        name: {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
            },
          },
        },
      },
    };
    const expected = { name: { firstName: '' } };

    // act
    const actual = getDefaultValue(data);

    // assert
    expect(actual).to.deep.equal(expected);
  });
});
