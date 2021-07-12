import transformSchema from '../transform-schema';

describe('transformSchema', () => {
  it('can transform schema', () => {
    // assemble
    const data = {
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
    
    const expected = {"description": "A simple form example with various formData return types per tab.", "properties": {"array": {"properties": {"creatableSelectTest": {"items": {"enum": ["test", "teete", "etetet"], "enum_titles": ["test", "teete", "etetet"], "type": "string"}, "title": "Example creatable select", "type": "array"}, "multiSelect": {"items": {"anyOf": [{"const": "#ff0000", "title": "Red", "type": "string"}, {"const": "#00ff00", "title": "Green", "type": "string"}, {"const": "#0000ff", "title": "Blue", "type": "string"}], "title": "Example Multi select", "type": "string"}, "type": "array", "uniqueItems": true}, "selectTest": {"items": {"enum": ["No", "etetet"], "enum_titles": ["No", "etetet"], "type": "string"}, "title": "Example React Multi Select", "type": "array", "uniqueItems": true}, "xhrSelectTest": {"items": {"enum": [], "enum_titles": [], "type": "string"}, "title": "Example XHR React Multi Select", "type": "array", "uniqueItems": true}}, "title": "Array", "type": "object"}, "boolean": {"properties": {"default": {"description": "This is the checkbox-description", "title": "checkbox (default)", "type": "boolean"}, "radio": {"description": "This is the radio-description", "enum": [true, false], "enum_titles": [true, false], "title": "radio buttons", "type": "boolean"}}, "title": "Boolean", "type": "object"}, "integer": {"properties": {"age": {"title": "Age", "type": "integer"}, "customRating": {"title": "Rating (Custom Component)", "type": "integer"}}, "title": "Integer", "type": "object"}, "number": {"properties": {"currency": {"title": "Currency", "type": "number"}}, "title": "Number", "type": "object"}, "object": {"properties": {"customComponent": {"component": "customComponent", "properties": {"endDate": {"title": "End Date", "type": "string"}, "startDate": {"title": "Start Date", "type": "string"}}, "title": "Custom Component", "type": "object"}}, "title": "Object", "type": "object"}, "string": {"properties": {"bio": {"title": "Bio", "type": "string"}, "date": {"title": "Date", "type": "string"}, "firstName": {"title": "First name", "type": "string"}, "lastName": {"title": "Last name", "type": "string"}, "password": {"minLength": 3, "title": "Password", "type": "string"}, "react-select": {"enum": ["Yes", "No"], "enum_titles": ["Yes", "No"], "title": "Example React select", "type": "string"}, "select": {"enum": ["Yes", "No"], "enum_titles": ["Yes", "No"], "title": "Example select", "type": "string"}, "telephone": {"title": "Telephone", "type": "string"}, "upload": {"title": "Please upload your file", "type": "string"}}, "required": ["firstName", "lastName"], "title": "String", "type": "object"}}, "title": "A registration form", "type": "object"};

    // act
    const actual = transformSchema(data);

    // assert
    expect(actual).toEqual(expected);
  });
});
