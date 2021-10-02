// Library
import React from 'react';
import { mountTheme } from '../../helpers/enzyme-unit-test';
import { act } from 'react-dom/test-utils';

// Internal
import FieldSetStepper from '../FieldSetStepper';

// Initial Contexts
import { StepperContext } from '../../helpers/context';

const { root, row } = {
  root: 'rootClassName',
  row: 'rowClassName',
};

describe('FieldSetStepper', () => {
    it('mounts with single field (control)', () => {
      const schema = {
        "type": "object",
        "properties": {
          "SelectComponents": {
            "title": "Select Components",
            "$ref": "#/definitions/componentsList"
          },
          "PublishPackage": {
            "title": "Publish your Package",
            "type": "object",
            "required": [
              "packageName",
              "packageVersion"
            ],
            "properties": {
              "packageName": {
                "type": "string",
                "title": "Package Name"
              },
              "packageVersion": {
                "type": "string",
                "title": "Package Version"
              }
            }
          },
          "GettingStarted": {
            "title": "Getting Started",
            "type": "object",
            "properties": {
              "results": {
                "type": "null",
                "title": "Results"
              }
            }
          }
        },
        "definitions": {
          "componentsList": {
            "title": "Select Components",
            "type": "object",
            "properties": {
              "selectTheme": {
                "type": "string",
                "title": "Which  Theme ?",
                "enum": [
                  "Material UI",
                  "No Theme"
                ],
                "default": "Material UI"
              }
            },
            "required": [
              "selectTheme"
            ],
            "dependencies": {
              "selectTheme": {
                "oneOf": [
                  {
                    "properties": {
                      "selectTheme": {
                        "const": "No Theme"
                      }
                    }
                  },
                  {
                    "properties": {
                      "selectTheme": {
                        "const": "Material UI"
                      },
                      "listOfComponents": {
                        "type": "array",
                        "title": "A list of components (Material Theme)",
                        "items": {
                          "type": "string",
                          "enum": [
                            {
                              "key": "material-radio-group",
                              "value": "material-radio-group",
                              "onData": {
                                "equals": "material-radio-group",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "creatable-react-select",
                              "value": "creatable-react-select",
                              "onData": {
                                "equals": "creatable-react-select",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "react-select",
                              "value": "react-select",
                              "onData": {
                                "equals": "react-select",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils",
                                    "parse-values"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "material-select",
                              "value": "material-select",
                              "disabled": true,
                              "onData": {
                                "equals": "material-select",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils",
                                    "parse-values"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "material-checkbox",
                              "value": "material-checkbox",
                              "disabled": true,
                              "onData": {
                                "equals": "material-checkbox",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "material-switch",
                              "value": "material-switch",
                              "onData": {
                                "equals": "material-switch",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "material-picker",
                              "value": "material-picker"
                            },
                            {
                              "key": "upload",
                              "value": "upload"
                            },
                            {
                              "key": "rich-text-editor",
                              "value": "rich-text-editor"
                            },
                            {
                              "key": "material-input",
                              "value": "material-input",
                              "disabled": true,
                              "onData": {
                                "equals": "material-input",
                                "adds": {
                                  "listOfUtils": [
                                    "enum-utils",
                                    "parse-values"
                                  ]
                                }
                              }
                            },
                            {
                              "key": "empty-div",
                              "value": "empty-div",
                              "disabled": true
                            },
                            {
                              "key": "ratings",
                              "value": "ratings"
                            }
                          ]
                        }
                      },
                      "listOfInterceptors": {
                        "type": "array",
                        "title": "A list of Interceptors",
                        "items": {
                          "type": "string",
                          "enum": [
                            {
                              "key": "translate-ratings",
                              "value": "translate-ratings"
                            },
                            {
                              "key": "translate-currency",
                              "value": "translate-currency",
                              "disabled": true
                            },
                            {
                              "key": "translate-range-date",
                              "value": "translate-range-date"
                            }
                          ]
                        }
                      },
                      "listOfUtils": {
                        "type": "array",
                        "title": "A list of components Utils",
                        "items": {
                          "type": "string",
                          "enum": [
                            {
                              "key": "enum-utils",
                              "value": "enum-utils",
                              "disabled": true
                            },
                            {
                              "key": "parse-values",
                              "value": "parse-values",
                              "disabled": true
                            }
                          ]
                        }
                      }
                    },
                    "required": [
                      "selectTheme",
                      "listOfComponents"
                    ]
                  }
                ]
              }
            }
          }
        }
      };

      const uiSchema = {
        "ui:page": {
          "ui:layout": "steps",
          "props": {
            "includeSkipButton": true,
            "includeResetButton": true,
            "ui:schemaErrors": true
          }
        },
        "SelectComponents": {
          "listOfComponents": {
            "ui:widget": "checkboxes"
          },
          "listOfInterceptors": {
            "ui:widget": "checkboxes"
          },
          "listOfUtils": {
            "ui:widget": "checkboxes"
          }
        },
        "PublishPackage": {
          "packageName": {},
          "packageVersion": {}
        }
      };

      const uiSchema2 = {
        "ui:page": {
          "ui:layout": "steps"
        },
        "SelectComponents": {
          "listOfComponents": {
            "ui:widget": "checkboxes"
          },
          "listOfInterceptors": {
            "ui:widget": "checkboxes"
          },
          "listOfUtils": {
            "ui:widget": "checkboxes"
          }
        },
        "PublishPackage": {
          "packageName": {},
          "packageVersion": {}
        }
      };

      const data = {
        "GettingStarted": {},
        "SelectComponents": {
          "sessionId": "Gsz3REkULqm3f6YMyK4X-",
          "listOfComponents": [
            "material-select",
            "material-checkbox",
            "material-input",
            "empty-div"
          ],
          "listOfInterceptors": [
            "translate-currency"
          ],
          "listOfUtils": [
            "enum-utils",
            "parse-values"
          ],
          "selectTheme": "Material UI"
        },
        "PublishPackage": {
          "sessionId": "Gsz3REkULqm3f6YMyK4X-"
        }
      };

      const onNext = jest.fn();
      const onBack = jest.fn();
      const onSkip = jest.fn();

      // act
      const wrapper = mountTheme({
        component: (
          <StepperContext.Provider value={[1, false] as any}>
            <FieldSetStepper 
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
                onNext={onNext}
                onBack={onBack}
                onSkip={onSkip}
            />
          </StepperContext.Provider>
        )
      });

      const wrapper2 = mountTheme({
        component: (
          <StepperContext.Provider value={[1, false] as any}>
            <FieldSetStepper 
                classes={{ row }}
                schema={schema}
                data={data}
                path={''}
                uiSchema={uiSchema2}
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
        )
      });

      // check
      expect(wrapper).toHaveLength(1);
      const ffComp = wrapper.find('ForwardRef(Stepper)');
      expect(ffComp).toHaveLength(1);
      expect(ffComp.prop('activeStep')).toBe(1);

      //act
      act(() => {
        const backButton = wrapper.find('ForwardRef(Button)').first();
        const nextButton = wrapper.find('ForwardRef(Button)').last();
        nextButton.prop('onClick')();
        backButton.prop('onClick')();
        expect(onNext).toHaveBeenCalled();
        expect(onBack).toHaveBeenCalled();
      });

      //act
      act(() => {
        const nextButton = wrapper.find('ForwardRef(Button)').at(1);
        nextButton.prop('onClick')();
        nextButton.prop('onClick')();
        expect(onSkip).toHaveBeenCalled();
        expect(onNext).toHaveBeenCalled();
      });
    });
});