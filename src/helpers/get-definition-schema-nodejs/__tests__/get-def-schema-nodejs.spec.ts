import getDefinitionSchema from '..';

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
      "title": "Conditional",
      "$ref": "#/definitions/person"
    };
    const expected = {
      "$ref": "#/definitions/person",
      "properties": {
        "doYouHavePets": {
          "default": "No",
          "enum": [
            "No",
            "Yes: One",
            "Yes: More than one",
          ],
          "title": "Do you have any pets?",
          "type": "string",
        },
      },
      "required": [
        "doYouHavePets",
      ],
      "title": "Person",
      "type": "object",
    };

    // act
    const actual = getDefinitionSchema(def, properties, {});

    // assert
    expect(actual).toEqual(expected);
  });

  it('can get definitions from schema (array)', () => {
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
    };

    const expected = {
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
    };
    // act
    const actual = getDefinitionSchema(def, properties, {});

    // assert
    expect(actual).toEqual(expected);
  });


  it('can get definitions from schema (without title)', () => {
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
              "anyOf": [
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
      "$ref": "#/definitions/person"
    };
    const expected = {
      "$ref": "#/definitions/person",
      "properties": {
        "doYouHavePets": {
          "default": "No",
          "enum": [
            "No",
            "Yes: One",
            "Yes: More than one",
          ],
          "title": "Do you have any pets?",
          "type": "string",
        },
      },
      "required": [
        "doYouHavePets",
      ],
      "title": "Person",
      "type": "object",
    };

    // act
    const actual = getDefinitionSchema(def, properties, {});

    // assert
    expect(actual).toEqual(expected);
  });
});
