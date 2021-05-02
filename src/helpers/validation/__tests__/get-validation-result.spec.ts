import getValidationResult from '../get-validation-result';

describe('getValidations', () => {
  it('max len - fail', () => {
    const schema = {
      'properties': {
        'firstName': {
          'title': 'First name',
          'maxLength': 10,
        },
      },
    };
    const data = {
      firstName: 'Maxamillian',
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.firstName).toHaveLength(1);
    expect(result.firstName[0].rule).toBe('maxLength');
  });
  it('max-len - pass', () => {
    const schema = {
      'properties': {
        'firstName': {
          'title': 'First name',
          'maxLength': 10,
        },
      },
    };
    const data = {
      firstName: 'Max',
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.firstName).toHaveLength(0);
  });
  it('min-len - fail', () => {
    const schema = {
      'properties': {
        'firstName': {
          'title': 'First name',
          'minLength': 3,
        },
      },
    };
    const data = {
      firstName: 'Mi',
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.firstName).toHaveLength(1);
    expect(result.firstName[0].rule).toBe('minLength');
  });
  it('pattern - fail', () => {
    const schema = {
      'properties': {
        'email': {
          'title': 'Email',
          'pattern': '[a-zA-Z]{1}[a-zA-Z\\-\\+_]@[a-zA-Z\\-_]+\\.com',
        },
      },
    };
    const data = {
      email: 'react-jsonschema-at-gmail-dot-com',
    };
    const result = getValidationResult(schema, {}, data);
    expect(result).toHaveProperty('email');
    expect(result.email).toHaveLength(1);
    expect(result.email[0].rule).toBe('pattern');
  });
  it('pattern - pass', () => {
    const schema = {
      'properties': {
        'email': {
          'title': 'Email',
          'pattern': '[a-zA-Z]{1}[a-zA-Z\\-\\+_]@[a-zA-Z\\-_]+\\.com',
        },
      },
    };
    const data = {
      email: 'react.jsonschema@gmail.com',
    };
    const result = getValidationResult(schema, {}, data);
    expect(result).toHaveProperty('email');
    expect(result.email).toHaveLength(0);
  });
  it('minimum - fail', () => {
    const schema = {
      'properties': {
        'age': {
          'title': 'Age',
          'minimum': 10,
        },
      },
    };
    const data = {
      age: 9,
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.age).toHaveLength(1);
    expect(result.age[0].rule).toBe('minimum');
  });
  it('minimum - pass', () => {
    const schema = {
      'properties': {
        'age': {
          'title': 'Age',
          'minimum': 10,
        },
      },
    };
    const data = {
      age: 10,
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.age).toHaveLength(0);
  });
  it('maximum - fail', () => {
    const schema = {
      'properties': {
        'age': {
          'title': 'Age',
          'maximum': 18,
        },
      },
    };
    const data = {
      age: 19,
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.age).toHaveLength(1);
    expect(result.age[0].rule).toBe('maximum');
  });
  it('maximum - pass', () => {
    const schema = {
      'properties': {
        'age': {
          'title': 'Age',
          'maximum': 18,
        },
      },
    };
    const data = {
      age: 18,
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.age).toHaveLength(0);
  });
  it('no validations', () => {
    const schema = {
      'properties': {
        'name': {
          type: 'string',
        },
      },
    };
    const data = {
      name: 'Bob',
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.name).toHaveLength(0);
  });
  it('no validations, no value', () => {
    const schema = {
      'properties': {
        'name': {
          type: 'string',
        },
      },
    };
    const data = {
      name: null,
    };
    const result = getValidationResult(schema, {}, data);
    expect(result.name).toHaveLength(0);
  });
});
