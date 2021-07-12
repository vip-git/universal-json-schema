import removeEmptyValues, { isEmptyValues } from '../remove-empty-values';

describe('removeEmptyValues', () => {
  it('can remove empty values', () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = '';

    // act
    const actual = removeEmptyValues(data, {});

    // assert
    expect(actual).toEqual(data);
  });
  it('can remove empty values null schema', () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = '';

    // act
    const actual = removeEmptyValues(data, null);

    // assert
    expect(actual).toEqual(data);
  });
  it('can remove empty values (null)', () => {
    // assemble
    const data = {
      type: 'null',
    };
    const expected = '';

    // act
    const actual = removeEmptyValues(data, { type: 'null' });

    // assert
    expect(actual).toEqual(data);
  });
  it('can remove empty values (string)', () => {
    // assemble
    const data = '';
    const expected = '';

    // act
    const actual = removeEmptyValues(data, { type: 'string' });

    // assert
    expect(actual).toEqual(data);
  });
  it('can remove empty values null schema (string)', () => {
    // assemble
    const data = '';
    const expected = '';

    // act
    const actual = removeEmptyValues(data, null);

    // assert
    expect(actual).toEqual(data);
  });
  it('can remove empty values (object)', () => {
    // assemble
    const expected = false;

    // act
    const actual = isEmptyValues({});

    // assert
    expect(actual).toEqual(expected);
  });
  it('can remove empty values (number)', () => {
    // assemble
    const expected = false;

    // act
    const actual = isEmptyValues(1);

    // assert
    expect(actual).toEqual(expected);
  });
  it('can remove empty values (boolean)', () => {
    // assemble
    const expected = false;

    // act
    const actual = isEmptyValues(false);

    // assert
    expect(actual).toEqual(expected);
  });
});
