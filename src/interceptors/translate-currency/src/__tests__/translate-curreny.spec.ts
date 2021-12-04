// imports
import translateCurrency from '..';

describe('translateCurrency', () => {
    it('returns formatted currency with original value (us)', () => {
      const value = '121231.23';
      const expected = {
        'formData': 121231.23, 
        'uiData': '121,231.23'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'us'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (fr)', () => {
      const value = '121231,23';
      const expected = {
        'formData': 121231.23, 
        'uiData': '121 231,23'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'fr'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (de)', () => {
      const value = '121231,23';
      const expected = {
        'formData': 121231.23, 
        'uiData': '121.231,23'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'de'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (empty)', () => {
      const value = '';
      const expected = {
        'formData': '', 
        'uiData': ''
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'in'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (edge case)', () => {
      const value = '123123.';
      const expected = {
        'formData': 123123, 
        'uiData': '123123.'
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'us'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (scientific notation)', () => {
      const value = '1231231231231231231231231231231231231231312313';
      const expected = {
        'formData': '1231231231231231300000000000000000000000000000',
        'uiData': '1.231.231.231.231.231.300.000.000.000.000.000.000.000.000.000',
      };
      const actual = translateCurrency({
          value,
          options: {
            useLocaleString: 'in'
          }
      });
      expect(actual).toStrictEqual(expected);
    });

    it('returns formatted currency with original value (window navigator)', () => {
      const languageGetter = jest.spyOn(window.navigator, 'language', 'get');
      languageGetter.mockReturnValue('in');
      const value = '1231231231231231231231231231231231231231312313';
      const expected = {
        'formData': '1231231231231231300000000000000000000000000000',
        'uiData': '1.231.231.231.231.231.300.000.000.000.000.000.000.000.000.000',
      };
      const actual = translateCurrency({
          value
      });
      expect(actual).toStrictEqual(expected);
    });
});