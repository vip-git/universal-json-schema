import getDefinitionSchema from '../get-definition-schema';

describe('getDefinitionSchema', () => {
  it('can get definitions from schema', () => {
    // assemble
    const data = {
      type: 'string',
    };
    const expected = {"title": undefined};

    // act
    const actual = getDefinitionSchema(data, {}, {});

    // assert
    expect(actual).toEqual(expected);
  });
});
