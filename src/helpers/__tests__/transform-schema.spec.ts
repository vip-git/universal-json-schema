import transformSchema from '../transform-schema';

describe('transformSchema', () => {
  it('can transform schema', () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = '';

    // act
    const actual = transformSchema(data);

    // assert
    expect(actual).toEqual(data);
  });
});
