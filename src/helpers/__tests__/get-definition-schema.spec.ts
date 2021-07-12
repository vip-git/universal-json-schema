import getDefinitionSchema from '../get-definition-schema';

describe('getDefinitionSchema', () => {
  it('can get definitions from schema', () => {
    // assemble
    const def = {
        "person": {
          "title": "Person",
          "type": "object",
          "properties": {
            "doYouHavePets": {
              "type": "string",
              "title": "Do you have any pets?",
              "enum": [
                "No",
                "Yes: One",
                "Yes: More than one"
              ],
              "default": "No"
            }
          },
          "required": [
            "doYouHavePets"
          ],
          "dependencies": {
            "doYouHavePets": {
              "oneOf": [
                {
                  "properties": {
                    "doYouHavePets": {
                      "const": "No"
                    }
                  }
                },
                {
                  "properties": {
                    "doYouHavePets": {
                      "const": "Yes: One"
                    },
                    "howOldPet": {
                      "title": "How old is your pet?",
                      "type": "number"
                    }
                  },
                  "required": [
                    "howOldPet"
                  ]
                },
                {
                  "properties": {
                    "doYouHavePets": {
                      "const": "Yes: More than one"
                    },
                    "getRidPet": {
                      "title": "Do you want to get rid of any?",
                      "type": "boolean"
                    },
                    "setRidPet": {
                      "title": "Do you want to set rid of any?",
                      "type": "string"
                    }
                  },
                  "required": [
                    "getRidPet"
                  ]
                }
              ]
            }
          }
        }
    };
    const properties = {
        "simple": {
          "src": "https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies",
          "title": "Simple",
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "credit_card": {
              "type": "number"
            }
          },
          "required": [
            "name"
          ],
          "dependencies": {
            "credit_card": {
              "properties": {
                "billing_address": {
                  "type": "string",
                  "title": "Billing Address"
                }
              },
              "required": [
                "billing_address"
              ]
            }
          }
        },
        "conditional": {
          "title": "Conditional",
          "$ref": "#/definitions/person"
        },
        "arrayOfConditionals": {
          "title": "Array of conditionals",
          "type": "array",
          "items": {
            "$ref": "#/definitions/person"
          }
        },
        "fixedArrayOfConditionals": {
          "title": "Fixed array of conditionals",
          "type": "array",
          "items": [
            {
              "title": "Primary person",
              "$ref": "#/definitions/person"
            }
          ],
          "additionalItems": {
            "title": "Additional person",
            "$ref": "#/definitions/person"
          }
        }
    };
    const expected = {
           "arrayOfConditionals": {
             "items": {
               "$ref": "#/definitions/person",
             },
             "title": "Array of conditionals",
             "type": "array",
           },
           "conditional": {
             "$ref": "#/definitions/person",
             "title": "Conditional",
           },
           "fixedArrayOfConditionals": {
             "additionalItems": {
               "$ref": "#/definitions/person",
               "title": "Additional person",
             },
             "items": [
               {
                 "$ref": "#/definitions/person",
                 "title": "Primary person",
               },
             ],
             "title": "Fixed array of conditionals",
             "type": "array",
           },
           "simple": {
             "dependencies": {
               "credit_card": {
                 "properties": {
                   "billing_address": {
                     "title": "Billing Address",
                     "type": "string",
                   },
                 },
                 "required": [
                   "billing_address",
                 ],
               },
             },
             "properties": {
               "credit_card": {
                 "type": "number",
               },
               "name": {
                 "type": "string",
               },
             },
             "required": [
               "name",
             ],
             "src": "https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies",
             "title": "Simple",
             "type": "object",
           },
           "title": undefined,
        };

    // act
    const actual = getDefinitionSchema(def, properties, {});

    // assert
    expect(actual).toEqual(expected);
  });
});
