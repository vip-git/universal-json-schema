// imports
import translateRangeDate from '..';

describe('translateRangeDate', () => {
    it('returns formatted date with original value', () => {
      const data = {
        startDate: '10-10-2010',
        endDate: '10-10-2020'
      };
      const expected = {
        'formData': {
          'endDate': '2020-10-09T22:00:00.000Z',
          'startDate': '2010-10-09T22:00:00.000Z',
        },
        'uiData': '10/10/2010 - 10/10/2020',
      };
      const actual = translateRangeDate({
          data,
          options: {
            useLocaleString: 'us'
          }
      });
      expect(actual).toStrictEqual(expected);
    });
});