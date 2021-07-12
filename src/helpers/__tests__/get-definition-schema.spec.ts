import getDefinitionSchema, { flattenDefinitionSchemaFromRef, flattenSchemaPropFromDefinitions } from '../get-definition-schema';

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
    const expected2 = {
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
        "getRidPet": {
          "title": "Do you want to get rid of any?",
          "type": "boolean",
        },
        "howOldPet": {
          "title": "How old is your pet?",
          "type": "number",
        },
        "setRidPet": {
          "title": "Do you want to set rid of any?",
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
    const actual2 = flattenDefinitionSchemaFromRef(def, properties);

    // assert
    expect(actual).toEqual(expected);
    expect(actual2).toEqual(expected2);
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
    const actual2 = flattenDefinitionSchemaFromRef(def, properties);

    // assert
    expect(actual).toEqual(expected);
    expect(actual2).toEqual(expected);
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
    const expected2 = {
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
        "getRidPet": {
          "title": "Do you want to get rid of any?",
          "type": "boolean",
        },
        "howOldPet": {
          "title": "How old is your pet?",
          "type": "number",
        },
        "setRidPet": {
          "title": "Do you want to set rid of any?",
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
    const actual2 = flattenDefinitionSchemaFromRef(def, properties);

    // assert
    expect(actual).toEqual(expected);
    expect(actual2).toEqual(expected2);
  });

  it('can flatten Schema Prop From Definitions', () => {
    // assemble
    const properties = {
      "title": "Schema dependencies",
      "description": "These samples are best viewed without live validation.",
      "type": "object",
      "properties": {
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
      },
      "definitions": {
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
      }
    };
    const expected =  {
        "definitions": {
          "person": {
            "dependencies": {
              "doYouHavePets": {
                "oneOf": [
                  {
                    "properties": {
                      "doYouHavePets": {
                        "const": "No",
                      },
                    },
                  },
                  {
                    "properties": {
                      "doYouHavePets": {
                        "const": "Yes: One",
                      },
                      "howOldPet": {
                        "title": "How old is your pet?",
                        "type": "number",
                      },
                    },
                    "required": [
                      "howOldPet",
                    ],
                  },
                  {
                    "properties": {
                      "doYouHavePets": {
                        "const": "Yes: More than one",
                      },
                      "getRidPet": {
                        "title": "Do you want to get rid of any?",
                        "type": "boolean",
                      },
                      "setRidPet": {
                        "title": "Do you want to set rid of any?",
                        "type": "string",
                      },
                    },
                    "required": [
                      "getRidPet",
                    ],
                  },
                ],
              },
            },
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
          },
        },
        "description": "These samples are best viewed without live validation.",
        "properties": {
          "arrayOfConditionals": {
            "items": {
              "$ref": "#/definitions/person",
            },
            "title": "Array of conditionals",
            "type": "array",
          },
          "conditional": {
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
        },
        "title": "Schema dependencies",
        "type": "object",
      };

    // act
    const actual = flattenSchemaPropFromDefinitions(properties, {});

    // assert
    expect(actual).toEqual(expected);
  });
});
