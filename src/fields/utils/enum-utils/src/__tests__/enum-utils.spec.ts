import {
    isEnum,
    isSingleSelect,
    isMultiSelect,
    getEnumTitle,
} from '../index';

describe('enumUtils', () => {
  it('returns schema has enum', () => {
    const schema = {
        0: {
            enum: [],
            expected: [],
        },
        1: {
            anyOf: [],
            expected: [],
        },
        2: {
            oneOf: [],
            expected: [],
        },
        3: {
            array: [],
            expected: false,
        }
    };
    [0, 1, 2].forEach(val => {
        const actual = isEnum(schema[val]);
        expect(actual).toStrictEqual(schema[val].expected);
    });
  });
  it('returns single select', () => {
    const schema = {
        0: {
            type: 'string',
            enum: [],
            expected: [],
        },
        1: {
            type: 'string',
            oneOf: [],
            expected: [],
        },
        2: {
            array: [],
            expected: false,
        }
    };
    [0, 1, 2].forEach(val => {
        const actual = isSingleSelect(schema[val]);
        expect(actual).toStrictEqual(schema[val].expected);
    });
  });
  it('returns multi select', () => {
    const schema = {
        0: {
            parsedArray: true,
            enum: [],
            expected: [],
        },
        1: {
            parsedArray: true,
            oneOf: [],
            expected: undefined,
        },
        2: {
            array: [],
            expected: undefined,
        }
    };
    [0, 1, 2].forEach(val => {
        const actual = isMultiSelect(schema[val]);
        expect(actual).toStrictEqual(schema[val].expected);
    });
  });
  it('returns enum title', () => {
    const schema = {
        0: {
            items: {
                title: 'hello'
            },
            enum: [],
            expected: 'hello',
        },
        1: {
            title: 'hello',
            oneOf: [],
            expected: 'hello',
        },
        2: {
            array: [],
            expected: '',
        }
    };
    [0, 1, 2].forEach(val => {
        const actual = getEnumTitle(schema[val]);
        expect(actual).toStrictEqual(schema[val].expected);
    });
  });
});
