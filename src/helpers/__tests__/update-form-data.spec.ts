import without from 'lodash/without';
import updateFormData, { setUISchemaData, addListItem, removeListItem, moveListItem, updateKeyFromSpec } from '../update-form-data';

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
  describe('updateKeyFromSpec', () => {
    it('updates simple field', () => {
      const initial = {
        name: 'Bob',
      };
      const expected = {
        Harry: 'Bob',
      };
      expect(updateKeyFromSpec(initial, 'name', 'Harry')).toStrictEqual(expected);
      expect(updateKeyFromSpec(initial, 'namze', 'Harzry')).toStrictEqual(initial);
    });
  });
  describe('uiSchema', () => {
    it('updates ui Schema', () => {
      const initial = {
        name: 'Bob',
      };
      const uiSchema = {
        "ui:page": {
          "ui:layout": "tabs",
          "props": {
            "ui:schemaErrors": true
          },
          "style": {
            "boxShadow": "none"
          },
          "tabs": {
            "style": {
              "width": "29vw",
              "marginTop": 10
            }
          },
          "tab": {
            "style": {
              "minWidth": 81
            }
          }
        },
        "string": {
          "firstName": {
            "ui:autofocus": true,
            "ui:emptyValue": ""
          },
          "react-select": {
            "ui:widget": "material-select",
            "ui:isClearable": true,
            "ui:placeholder": "Example Placeholder"
          },
          "upload": {
            "ui:widget": "upload",
            "ui:props": {
              "variant": "outlined",
              "accept": "image/*",
              "isMulti": true,
              "buttonTitle": "Upload",
              "icon": "add_circle"
            }
          },
          "bio": {
            "ui:widget": "textarea",
            "ui:options": "rich-text-editor"
          },
          "password": {
            "ui:widget": "password",
            "ui:help": "Hint: Make it strong!",
            "ui:validations": {
              "minLength": {
                "value": 3,
                "message": "'Password' must be at least 3 characters",
                "inline": true
              }
            }
          },
          "date": {
            "ui:activeCompColor": "red",
            "ui:widget": "material-date"
          },
          "telephone": {
            "ui:options": {
              "inputType": "tel"
            },
            "ui:validations": {
              "minLength": {
                "value": 10,
                "message": "'Telephone' must be at least 10 digits",
                "inline": true
              }
            }
          }
        },
        "integer": {
          "age": {
            "ui:widget": "updown",
            "ui:title": "Age of person",
            "ui:description": "(earthian year)",
            "mui:className": "money"
          },
          "customRating": {
            "ui:component": "customRating",
            "ui:interceptor": "translate-ratings",
            "ui:options": {
              "color": "red"
            }
          }
        },
        "number": {
          "currency": {
            "ui:interceptor": "translate-currency",
            "ui:options": {
              "useLocaleString": "nl"
            },
            "ui:data": "1.121.212.122"
          }
        },
        "boolean": {
          "radio": {
            "ui:widget": "radio",
            "ui:options": {
              "row": true
            }
          }
        },
        "array": {
          "selectTest": {
            "ui:widget": "material-multiselect",
            "mui:inputProps": {
              "className": "money"
            }
          },
          "xhrSelectTest": {
            "ui:widget": "material-multiselect"
          },
          "creatableSelectTest": {
            "ui:widget": "creatable-select",
            "ui:options": {
              "optionsOnly": true
            }
          }
        },
        "object": {
          "customComponent": {
            "ui:component": "customComponent",
            "ui:interceptor": "translateRangeDate",
            "ui:options": {}
          }
        }
      };
      const expected = {"array": {"creatableSelectTest": {"ui:options": {"optionsOnly": true}, "ui:widget": "creatable-select"}, "selectTest": {"mui:inputProps": {"className": "money"}, "ui:widget": "material-multiselect"}, "xhrSelectTest": {"ui:widget": "material-multiselect"}}, "boolean": {"radio": {"ui:options": {"row": true}, "ui:widget": "radio"}}, "integer": {"age": {"mui:className": "money", "ui:description": "(earthian year)", "ui:title": "Age of person", "ui:widget": "updown"}, "customRating": {"ui:component": "customRating", "ui:interceptor": "translate-ratings", "ui:options": {"color": "red"}}}, "number": {"currency": {"ui:data": "1.121.212.122", "ui:interceptor": "translate-currency", "ui:options": {"useLocaleString": "nl"}}}, "object": {"customComponent": {"ui:component": "customComponent", "ui:interceptor": "translateRangeDate", "ui:options": {}}}, "string": {"bio": {"ui:options": "rich-text-editor", "ui:widget": "textarea"}, "date": {"ui:activeCompColor": "red", "ui:widget": "material-date"}, "firstName": {"ui:autofocus": true, "ui:emptyValue": ""}, "password": {"ui:help": "Hint: Make it strong!", "ui:validations": {"minLength": {"inline": true, "message": "'Password' must be at least 3 characters", "value": 3}}, "ui:widget": "password"}, "react-select": {"ui:isClearable": true, "ui:placeholder": "Example Placeholder", "ui:widget": "material-select"}, "telephone": {"ui:options": {"inputType": "tel"}, "ui:validations": {"minLength": {"inline": true, "message": "'Telephone' must be at least 10 digits", "value": 10}}}, "upload": {"ui:props": {"accept": "image/*", "buttonTitle": "Upload", "icon": "add_circle", "isMulti": true, "variant": "outlined"}, "ui:widget": "upload"}}, "ui:page": {"props": {"ui:schemaErrors": true}, "style": {"boxShadow": "none"}, "tab": {"style": {"minWidth": 81}}, "tabs": {"style": {"marginTop": 10, "width": "29vw"}}, "ui:layout": "tabs"}};
      expect(setUISchemaData(initial, uiSchema, '', {})).toStrictEqual(expected);
    });
  });
});
