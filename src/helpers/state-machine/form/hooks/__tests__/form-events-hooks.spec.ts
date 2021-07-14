// Import
import useFormEvents from '../form-events.hooks';

describe('useFormEvents', () => {
    [
        { 
            name: 'onMoveItemDown',
            fn: (formEvents) => formEvents['onMoveItemDown']('test.me', 1)()
        },
        { 
            name: 'onDeleteItem',
            fn: (formEvents) => formEvents['onDeleteItem']('test.me', 1)()
        },
        { 
            name: 'onAddItem',
            fn: (formEvents) => formEvents['onAddItem']('test.me', 1)()
        },
        { 
            name: 'onAddNewProperty',
            fn: (formEvents) => formEvents['onAddNewProperty']('test.me', 1)()
        },
        { 
            name: 'onRemoveProperty',
            fn: (formEvents) => formEvents['onRemoveProperty']('test.me', 1)()
        },
        { 
            name: 'onUpdateKeyProperty',
            fn: (formEvents) => formEvents['onUpdateKeyProperty']('test.me', 1)('hello', 'world') 
        },
        { 
            name: 'onFormValuesChange',
            fn: (formEvents) => formEvents['onFormValuesChange']('test.me', 1)('hello', 'world')
        },
        { 
            name: 'onXHRSchemaEvent',
            fn: (formEvents) => formEvents['onXHRSchemaEvent']('test.me', 1)('hello', 'world')
        },
        { 
            name: 'onFormSubmit',
            fn: (formEvents) => formEvents['onFormSubmit']('test.me', 1)
        },
        { 
            name: 'handleKeyEnter',
            fn: (formEvents) => formEvents['handleKeyEnter']({
                keyCode: 13,
            })
        },
        { 
            name: 'onTabChange',
            fn: (formEvents) => formEvents['onTabChange']('test.me', 1)
        },
    ].map((actionName) => {
        it(`Should be able execute ${actionName.name}`, () => {
            const params = {
                stateMachineService: {
                    send: jest.fn(),
                },
                validation: {},
                formData: {
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
                },
                schema: {
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
                },
                uiData: {}, 
                uiSchema: {
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
                },
                xhrSchema: {
                    "ui:errors": {
                      "offline": {
                        "title": "You are Offline !",
                        "message": "Please try again once you are online."
                      }
                    },
                    "ui:page": {
                      "onload": {
                        "xhr:datasource": {
                          "url": "https://60154dbe55dfbd00174ca231.mockapi.io/api/2",
                          "method": "GET",
                          "headers": {},
                          "payload": {},
                          "map:results": "#/definitions/results"
                        }
                      },
                      "onsubmit": {
                        "xhr:datasource": {
                          "url": "https://60154dbe55dfbd00174ca231.mockapi.io/api/2",
                          "method": "PUT",
                          "headers": {},
                          "map:payload": {
                            "string": {
                              "firstName:first_name": "${string.firstName}",
                              "lastName:last_name": "${string.lastName}",
                              "select": "${string.select}",
                              "react-select:react_select": "${string.react-select}",
                              "upload": "${string.upload}",
                              "bio": "${string.bio}",
                              "date": "${string.date}",
                              "password": "${string.password}",
                              "telephone": "${string.telephone}"
                            },
                            "integer": {
                              "customRating:custom_rating": "${integer.customRating}",
                              "age": "${integer.age}"
                            },
                            "number": {
                              "currency": "${number.currency}"
                            },
                            "boolean": {
                              "default": "${boolean.default}",
                              "radio": "${boolean.radio}"
                            },
                            "array": {
                              "multiSelect": "${array.multiSelect}",
                              "creatableSelectTest:creatable_select_test": "${array.creatableSelectTest}",
                              "selectTest:select_test": "${array.selectTest}"
                            },
                            "object": {
                              "customComponent:custom_component": {
                                "startDate:start_date": "${object.customComponent.startDate}",
                                "endDate:end_date": "${object.customComponent.endDate}"
                              }
                            }
                          },
                          "map:results": "#/definitions/results"
                        }
                      }
                    },
                    "properties": {
                      "array": {
                        "xhrSelectTest": {
                          "onload": {
                            "xhr:datasource": {
                              "url": "https://60154dbe55dfbd00174ca231.mockapi.io/api",
                              "method": "GET",
                              "headers": {},
                              "payload": {},
                              "map:items.enum": "name"
                            }
                          }
                        }
                      }
                    },
                    "definitions": {
                      "results": {
                        "string": {
                          "firstName": "${string.first_name}",
                          "lastName": "${string.last_name}",
                          "select": "${string.select}",
                          "react-select": "${string.react_select}",
                          "upload": "${string.upload}",
                          "bio": "${string.bio}",
                          "date": "${string.date}",
                          "password": "${string.password}",
                          "telephone": "${string.telephone}"
                        },
                        "integer": {
                          "customRating": "${integer.custom_rating}",
                          "age": "${integer.age}"
                        },
                        "number": {
                          "currency": "${number.currency}"
                        },
                        "boolean": {
                          "default": "${boolean.default}",
                          "radio": "${boolean.radio}"
                        },
                        "array": {
                          "multiSelect": "${array.multiSelect}",
                          "creatableSelectTest": "${array.creatable_select_test}",
                          "selectTest": "${array.select_test}"
                        },
                        "object": {
                          "customComponent": "${object.custom_component}"
                        }
                      }
                    }
                },
                interceptors: {},
                submitOnEnter: true,
                onSubmit: jest.fn(),
            };
            const sendSpy = jest.spyOn(params.stateMachineService, 'send');
            const formEvents = useFormEvents(params);
            actionName['fn'](formEvents);
            expect(sendSpy).toHaveBeenCalledTimes(1);
        });
    })
});
