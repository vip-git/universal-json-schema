import getDefinitionSchema from '../get-definition-schema';

describe('getDefinitionSchema', () => {
  it('can get definitions from schema', () => {
    // assemble
    const def = {
        "Thing": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "default": "Default name"
                }
            }
        }
    };
    const properties = {
        "Technical": {
            "type": "object",
            "title": "Technical",
            "properties": {
            "listOfStrings": {
                "type": "array",
                "title": "A list of strings",
                "items": {
                "type": "string",
                "default": "bazinga"
                }
            },
            "multipleChoicesList": {
                "type": "array",
                "title": "A multiple choices list",
                "items": {
                "type": "string",
                "enum": [
                    "foo",
                    "bar",
                    "fuzz",
                    "qux"
                ]
                },
                "uniqueItems": true
            },
            "fixedItemsList": {
                "type": "array",
                "title": "A list of fixed items",
                "items": [
                {
                    "title": "A string value",
                    "type": "string",
                    "default": "lorem ipsum"
                },
                {
                    "title": "a boolean value",
                    "type": "boolean"
                }
                ],
                "additionalItems": {
                "title": "Additional item",
                "type": "number"
                }
            },
            "minItemsList": {
                "type": "array",
                "title": "A list with a minimal number of items",
                "minItems": 3,
                "items": {
                "$ref": "#/definitions/Thing"
                }
            },
            "defaultsAndMinItems": {
                "type": "array",
                "title": "List and item level defaults",
                "minItems": 5,
                "default": [
                "carp",
                "trout",
                "bream",
                "dream",
                "cream"
                ],
                "items": {
                "type": "string",
                "default": "unidentified"
                }
            },
            "nestedList": {
                "type": "array",
                "title": "Nested list",
                "items": {
                "type": "array",
                "title": "Inner list",
                "items": {
                    "type": "string",
                    "default": "lorem ipsum"
                }
                }
            },
            "unorderable": {
                "title": "Unorderable items",
                "type": "array",
                "items": {
                "type": "string",
                "default": "lorem ipsum"
                }
            },
            "unremovable": {
                "title": "Unremovable items",
                "type": "array",
                "items": {
                "type": "string",
                "default": "lorem ipsum"
                }
            },
            "noToolbar": {
                "title": "No add, remove and order buttons",
                "type": "array",
                "items": {
                "type": "string",
                "default": "lorem ipsum"
                }
            },
            "fixedNoToolbar": {
                "title": "Fixed array without buttons",
                "type": "array",
                "items": [
                {
                    "title": "A number",
                    "type": "number",
                    "default": 42
                },
                {
                    "title": "A boolean",
                    "type": "boolean",
                    "default": false
                }
                ],
                "additionalItems": {
                "title": "A string",
                "type": "string",
                "default": "lorem ipsum"
                }
            }
            }
        },
        "Changedata": {
            "title": "Change Data",
            "type": "object",
            "properties": {
            "Createdon": {
                "type": "string",
                "title": "Createdon"
            },
            "Createdby": {
                "type": "string",
                "title": "Createdby"
            }
            },
            "required": [
            "Createdon",
            "Createdby"
            ]
        }
    };
    const expected = {
        "Changedata": {
         "properties": {
           "Createdby": {
             "title": "Createdby",
             "type": "string",
           },
           "Createdon": {
             "title": "Createdon",
             "type": "string",
           },
         },
         "required": [
           "Createdon",
           "Createdby",
         ],
         "title": "Change Data",
         "type": "object",
       },
       "Technical": {
         "properties": {
           "defaultsAndMinItems": {
             "default": [
               "carp",
               "trout",
               "bream",
               "dream",
               "cream",
             ],
             "items": {
               "default": "unidentified",
               "type": "string",
             },
             "minItems": 5,
             "title": "List and item level defaults",
             "type": "array",
           },
           "fixedItemsList": {
             "additionalItems": {
               "title": "Additional item",
               "type": "number",
             },
             "items": [
               {
                 "default": "lorem ipsum",
                 "title": "A string value",
                 "type": "string",
               },
               {
                 "title": "a boolean value",
                 "type": "boolean",
               },
             ],
             "title": "A list of fixed items",
             "type": "array",
           },
           "fixedNoToolbar": {
             "additionalItems": {
               "default": "lorem ipsum",
               "title": "A string",
               "type": "string",
             },
             "items": [
               {
                 "default": 42,
                 "title": "A number",
                 "type": "number",
               },
               {
                 "default": false,
                 "title": "A boolean",
                 "type": "boolean",
               },
             ],
             "title": "Fixed array without buttons",
             "type": "array",
           },
           "listOfStrings": {
             "items": {
               "default": "bazinga",
               "type": "string",
             },
             "title": "A list of strings",
             "type": "array",
           },
           "minItemsList": {
             "items": {
               "$ref": "#/definitions/Thing",
             },
             "minItems": 3,
             "title": "A list with a minimal number of items",
             "type": "array",
           },
           "multipleChoicesList": {
             "items": {
               "enum": [
                 "foo",
                 "bar",
                 "fuzz",
                 "qux",
               ],
               "type": "string",
             },
             "title": "A multiple choices list",
             "type": "array",
             "uniqueItems": true,
           },
           "nestedList": {
             "items": {
               "items": {
                 "default": "lorem ipsum",
                 "type": "string",
               },
               "title": "Inner list",
               "type": "array",
             },
             "title": "Nested list",
             "type": "array",
           },
           "noToolbar": {
             "items": {
               "default": "lorem ipsum",
               "type": "string",
             },
             "title": "No add, remove and order buttons",
             "type": "array",
           },
           "unorderable": {
             "items": {
               "default": "lorem ipsum",
               "type": "string",
             },
             "title": "Unorderable items",
             "type": "array",
           },
           "unremovable": {
             "items": {
               "default": "lorem ipsum",
               "type": "string",
             },
             "title": "Unremovable items",
             "type": "array",
           },
         },
         "title": "Technical",
         "type": "object",
       },
        "title": undefined
    };

    // act
    const actual = getDefinitionSchema(def, properties, {});

    // assert
    expect(actual).toEqual(expected);
  });
});
