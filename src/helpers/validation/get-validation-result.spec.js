/* globals describe,it */
import { expect } from 'chai';
import getValidationResult from './get-validation-result';

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
    const result = getValidationResult(schema, data);
    expect(result.firstName).to.have.length(1);
    expect(result.firstName[0].rule).to.equal('maxLength');
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
    const result = getValidationResult(schema, data);
    expect(result.firstName).to.have.length(0);
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
    const result = getValidationResult(schema, data);
    expect(result.firstName).to.have.length(1);
    expect(result.firstName[0].rule).to.equal('minLength');
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
      email: 'geoffs-fridges-at-gmail-dot-com',
    };
    const result = getValidationResult(schema, data);
    expect(result).to.haveOwnProperty('email');
    expect(result.email).to.have.length(1);
    expect(result.email[0].rule).to.equal('pattern');
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
      email: 'geoffs-fridges@geoff.com',
    };
    const result = getValidationResult(schema, data);
    expect(result).to.haveOwnProperty('email');
    expect(result.email).to.have.length(0);
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
    const result = getValidationResult(schema, data);
    expect(result.age).to.have.length(1);
    expect(result.age[0].rule).to.equal('minimum');
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
    const result = getValidationResult(schema, data);
    expect(result.age).to.have.length(0);
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
    const result = getValidationResult(schema, data);
    expect(result.age).to.have.length(1);
    expect(result.age[0].rule).to.equal('maximum');
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
    const result = getValidationResult(schema, data);
    expect(result.age).to.have.length(0);
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
    const result = getValidationResult(schema, data);
    expect(result.name).to.have.length(0);
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
    const result = getValidationResult(schema, data);
    expect(result.name).to.have.length(0);
  });
});
