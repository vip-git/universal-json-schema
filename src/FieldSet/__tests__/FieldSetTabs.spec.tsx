// Library
import React from 'react';
import { mount } from 'enzyme';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'; // Has to be made optional
import MomentUtils from '@date-io/moment';

// Internal
import FieldSetTabs from '../FieldSetTabs';

// Initial Contexts
import { StepperContext } from '../../helpers/context';

const { root, row } = {
  root: 'rootClassName',
  row: 'rowClassName',
};

describe('FieldSetTabs', () => {
    it('mounts with single field (control)', () => {
      const schema = {
        "title": "A registration form",
        "description": "A simple form example with various formData return types per tab.",
        "type": "object",
        "properties": {
          "string": {
            "type": "object",
            "title": "String",
            "required": [
              "firstName",
              "lastName"
            ],
            "properties": {
              "firstName": {
                "type": "string",
                "title": "First name"
              },
              "lastName": {
                "type": "string",
                "title": "Last name"
              },
              "select": {
                "type": "string",
                "title": "Example select",
                "enum": [
                  "Yes",
                  "No"
                ]
              },
              "react-select": {
                "type": "string",
                "title": "Example React select",
                "enum": [
                  "Yes",
                  "No"
                ]
              },
              "password": {
                "type": "string",
                "title": "Password",
                "minLength": 3
              },
              "upload": {
                "type": "string",
                "title": "Please upload your file"
              },
              "bio": {
                "type": "string",
                "title": "Bio"
              },
              "date": {
                "type": "string",
                "title": "Date"
              },
              "telephone": {
                "type": "string",
                "title": "Telephone"
              }
            }
          },
          "integer": {
            "type": "object",
            "title": "Integer",
            "properties": {
              "age": {
                "type": "integer",
                "title": "Age"
              },
              "customRating": {
                "type": "integer",
                "title": "Rating (Custom Component)"
              }
            }
          },
          "number": {
            "type": "object",
            "title": "Number",
            "properties": {
              "currency": {
                "type": "number",
                "title": "Currency"
              }
            }
          },
          "boolean": {
            "type": "object",
            "title": "Boolean",
            "properties": {
              "default": {
                "type": "boolean",
                "title": "checkbox (default)",
                "description": "This is the checkbox-description"
              },
              "radio": {
                "type": "boolean",
                "title": "radio buttons",
                "description": "This is the radio-description",
                "enum": [
                  {
                    "key": true,
                    "value": "Yes"
                  },
                  {
                    "key": false,
                    "value": "No"
                  }
                ]
              }
            }
          },
          "array": {
            "type": "object",
            "title": "Array",
            "properties": {
              "multiSelect": {
                "type": "array",
                "uniqueItems": true,
                "items": {
                  "title": "Example Multi select",
                  "type": "string",
                  "anyOf": [
                    {
                      "type": "string",
                      "const": "#ff0000",
                      "title": "Red"
                    },
                    {
                      "type": "string",
                      "const": "#00ff00",
                      "title": "Green"
                    },
                    {
                      "type": "string",
                      "const": "#0000ff",
                      "title": "Blue"
                    }
                  ]
                }
              },
              "creatableSelectTest": {
                "type": "array",
                "title": "Example creatable select",
                "items": {
                  "type": "string",
                  "enum": [
                    "test",
                    "teete",
                    "etetet"
                  ]
                }
              },
              "selectTest": {
                "type": "array",
                "title": "Example React Multi Select",
                "items": {
                  "type": "string",
                  "enum": [
                    {
                      "key": "Yes",
                      "style": {
                        "borderBottom": "solid 1px black"
                      },
                      "value": "Yes",
                      "disabled": true
                    },
                    "No",
                    "etetet"
                  ]
                },
                "uniqueItems": true
              },
              "xhrSelectTest": {
                "type": "array",
                "title": "Example XHR React Multi Select",
                "items": {
                  "type": "string",
                  "enum": []
                },
                "uniqueItems": true
              }
            }
          },
          "object": {
            "type": "object",
            "title": "Object",
            "properties": {
              "customComponent": {
                "type": "object",
                "title": "Custom Component",
                "component": "customComponent",
                "properties": {
                  "startDate": {
                    "type": "string",
                    "title": "Start Date"
                  },
                  "endDate": {
                    "type": "string",
                    "title": "End Date"
                  }
                }
              }
            }
          }
        }
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
            "ui:widget": "textarea"
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
            }
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

      const data = {
        "string": {
          "firstName": "Chuck",
          "lastName": "Norris",
          "upload": "",
          "bio": "<p><u>ads</u></p>",
          "password": "noneed",
          "telephone": ""
        },
        "integer": {
          "age": 75,
          "customRating": 3
        },
        "number": {},
        "boolean": {},
        "array": {
          "creatableSelectTest": [
            "test"
          ],
          "selectTest": [
            "Yes",
            "No"
          ]
        },
        "object": {
          "customComponent": ""
        }
      };

      // act
      const wrapper = mount(
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <StepperContext.Provider value={[1, false] as any}>
                <FieldSetTabs 
                    classes={{ row }}
                    schema={schema}
                    data={data}
                    path={''}
                    uiSchema={uiSchema}
                    xhrSchema={{}}
                    onKeyDown={jest.fn}
                    onChange={jest.fn}
                    onXHRSchemaEvent={jest.fn}
                    id={'1'}
                    idxKey={'1'}
                    validation={{}}
                    isTabContent={false}
                    tabKey={''}
                />
            </StepperContext.Provider>
        </MuiPickersUtilsProvider>,
      );

      // check
      expect(wrapper).toHaveLength(1);
      const ffComp = wrapper.find('FieldSetTabs');
      expect(ffComp).toHaveLength(1);
    });
});