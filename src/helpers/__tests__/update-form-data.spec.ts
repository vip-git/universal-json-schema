import without from 'lodash/without';
import updateFormData, { addListItem, removeListItem, moveListItem } from '../update-form-data';

describe('updateFormData', () => {
  it('updates simple field', () => {
    const initial = {
      name: 'Bob',
    };
    const expected = {
      name: 'Harry',
    };
    expect(updateFormData(initial, 'name', 'Harry')).toStrictEqual(expected);
  });
  it('updates nested field', () => {
    const initial = {
      name: {
        firstName: 'Bob',
      },
    };
    const expected = {
      name: {
        firstName: 'Harry',
      },
    };
    expect(updateFormData(initial, 'name.firstName', 'Harry')).toStrictEqual(expected);
  });
  it('updates index field (object)', () => {
    const initial = {
      list: [{
        name: 'Bob',
      }],
    };
    const expected = {
      list: [{
        name: 'Harry',
      }],
    };
    expect(updateFormData(initial, 'list[0].name', 'Harry')).toStrictEqual(expected);
  });
  it('updates index field (simple)', () => {
    const initial = {
      list: ['Bob'],
    };
    const expected = {
      list: ['Harry'],
    };
    expect(updateFormData(initial, 'list[0]', 'Harry')).toStrictEqual(expected);
  });
  it('updates single field', () => {
    const initial = 'initialValue';
    const expected = 'updatedValue';

    expect(updateFormData(initial, '', 'updatedValue')).toStrictEqual(expected);
  });
  it('removes array item', () => {
    const initial = [
      'one',
      'two',
      'three',
    ];
    const expected = ['one', 'three'];
    const updated = updateFormData(initial, '', without(initial, 'two'));
    expect(updated).toStrictEqual(expected);
  });
  it('adds array item', () => {
    const initial = [
      'one',
      'two',
    ];
    const updatedVal = [...initial, 'three'];
    const expected = ['one', 'two', 'three'];
    const updated = updateFormData(initial, '', updatedVal);

    expect(updated).toStrictEqual(expected);
  });
  describe('addListItem', () => {
    it('adds list item', () => {
      const initial = {
        listItems: [
          '1',
          '2',
        ],
      };
      const expected = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };

      expect(addListItem(initial, 'listItems', '3')).toStrictEqual(expected);
    });
    it('adds list item to null list', () => {
      const initial = {
        listItems: null,
      };
      const expected = {
        listItems: [
          '1',
        ],
      };

      expect(addListItem(initial, 'listItems', '1')).toStrictEqual(expected);
    });
    it('adds list item - deep', () => {
      const initial = {
        'myprop': {
          listItems: [
            '1',
            '2',
          ],
        },
      };
      const expected = {
        'myprop': {
          listItems: [
            '1',
            '2',
            '3',
          ],
        },
      };

      expect(addListItem(initial, 'myprop.listItems', '3')).toStrictEqual(expected);
    });
  });
  describe('removeListItem', () => {
    it('remove list item', () => {
      const initial = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };
      const expected = {
        listItems: [
          '1',
          '3',
        ],
      };

      expect(removeListItem(initial, 'listItems', 1)).toStrictEqual(expected);
    });
    it('remove list item - deep', () => {
      const initial = {
        'myprop': {
          listItems: [
            '1',
            '2',
            '3',
          ],
        },
      };
      const expected = {
        'myprop': {
          listItems: [
            '1',
            '3',
          ],
        },
      };

      expect(removeListItem(initial, 'myprop.listItems', 1)).toStrictEqual(expected);
    });
  });
  describe('moveListItem', () => {
    it('moves list item up', () => {
      const initial = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };
      const expected = {
        listItems: [
          '2',
          '1',
          '3',
        ],
      };

      expect(moveListItem(initial, 'listItems', 1, -1)).toStrictEqual(expected);
    });
    it('moves list item down', () => {
      const initial = {
        listItems: [
          '1',
          '2',
          '3',
        ],
      };
      const expected = {
        listItems: [
          '2',
          '1',
          '3',
        ],
      };

      expect(moveListItem(initial, 'listItems', 0, 1)).toStrictEqual(expected);
    });
  });
});
