import valuesToOptions from '../values-to-options';

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
    expect(actual).toStrictEqual(expected);
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
    expect(actual).toStrictEqual(expected);
  });
  it('handles const in array', () => {
    const values = [
      {
        'type': 'string',
        'const': '#ff0000',
        'title': 'Red'
      },
      {
        'type': 'string',
        'const': '#00ff00',
        'title': 'Green'
      },
      {
        'type': 'string',
        'const': '#0000ff',
        'title': 'Blue'
      }
    ];
    const expected = [
      {
       'disabled': false,
       'key': '#ff0000',
       'value': 'Red',
      },
      {
       'disabled': false,
       'key': '#00ff00',
       'value': 'Green',
      },
      {
        'disabled': false,
        'key': '#0000ff',
        'value': 'Blue',
      },
    ];
    const actual = valuesToOptions(values);
    expect(actual).toStrictEqual(expected);
  });
  it('handles without const in array', () => {
    const values = [
      {
        'type': 'string',
        'title': 'Red'
      },
      {
        'type': 'string',
        'title': 'Green'
      },
      {
        'type': 'string',
        'title': 'Blue'
      }
    ];
    const actual = valuesToOptions(values);
    expect(actual).toStrictEqual(values);
  });
  it('handles strings', () => {
    const values = '';
    const actual = valuesToOptions(values);
    expect(actual).toStrictEqual([]);
  });
});
