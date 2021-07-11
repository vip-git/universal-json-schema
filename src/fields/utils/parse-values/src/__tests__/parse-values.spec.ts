// imports
import { coerceValue, deepStringify } from '..';

describe('parseValues', () => {
    it('parses deep stringify', () => {
      const value = '4.5';
      const expected = "{\"value\":\"4.5\",\"options\":{}}";
      const actual = deepStringify({
          value,
          options: {}
      });
      expect(actual).toStrictEqual(expected);
    });

    it('can parse string values', () => {
        const value = '4.5';
        const actual = coerceValue('string', value);
        const actual2 = coerceValue('string', 4.5);
        expect(actual).toStrictEqual(value);
        expect(actual2).toStrictEqual(value);
    });

    it('can parse boolean values', () => {
        const value = true;
        const actual = coerceValue('boolean', value);
        const actual2 = coerceValue('boolean', 'true');
        expect(actual).toStrictEqual(value);
        expect(actual2).toStrictEqual(value);
    });

    it('can parse unknown values', () => {
        const value = 'true';
        const actual = coerceValue('unknown', value);
        expect(actual).toStrictEqual(value);
    });

    it('can parse num values', () => {
        const parserType = [
            'number',
            'integer',
            'double',
            'float',
            'decimal'
        ];
        parserType.forEach((pt) => {
            const value = '121231.23';
            const actual = coerceValue(pt, value, {
                useLocaleString: 'us'
              });
            expect(actual).toStrictEqual(121231.23);
        })
    });
});