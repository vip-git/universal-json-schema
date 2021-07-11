import removeEmptyValues from '../remove-empty-values';

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
});
