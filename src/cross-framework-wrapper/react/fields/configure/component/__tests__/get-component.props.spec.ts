// Library
import getComponentProps from '../get-component-props';

describe('getComponentProps', () => {
  it('configures props for simple field', () => {
    const schema = {
      'title': 'First name',
      'type': 'string',
    };
    const required = [];
    const path = 'firstName';
    const uiSchema = {};
    const htmlid = 'unq';
    const onChange = jest.fn();
    const expectedInputProps = {
      id: htmlid,
    };
    const componentProps = getComponentProps({ schema, uiSchema, required, path, htmlid, onChange });
    expect(componentProps).toHaveProperty('htmlid');
    expect(componentProps.htmlid).toContain(htmlid);
    expect(componentProps.type).toBe('string');
  });

  it('creates options property from enum', () => {
    const schema = {
      'title': 'First name',
      'enum': ['one', 'two', 'three'],
    };
    const uiSchema = {};
    const expectedOptions = ['one', 'two', 'three'];
    const componentProps = getComponentProps({ schema, uiSchema });
    expect(componentProps).toHaveProperty('schema');
    expect(componentProps.schema.enum).toStrictEqual(expectedOptions);
  });

  describe('ui:options.disabled', () => {
    it('as boolean adds disabled property', () => {
      const schema = {
        'title': 'First name',
        'enum': ['one', 'two', 'three'],
      };
      const uiSchema = {
        'ui:options': {
          disabled: true,
        },
      };
      const componentProps = getComponentProps({ schema, uiSchema });
      expect(componentProps).toHaveProperty('disabled');
      expect(componentProps.disabled).toBe(true);
    });

    it('as function adds disabled property', () => {
      const disabledStub = jest.fn(() => true);
      const schema = {
        'title': 'First name',
        'enum': ['one', 'two', 'three'],
      };
      const objectData = {
        x: 'one',
        y: 'two',
      };
      const uiSchema = {
        'ui:options': {
          disabled: disabledStub,
        },
      };
      const componentProps = getComponentProps({ data: objectData.x, objectData, schema, uiSchema });
      expect(componentProps).toHaveProperty('disabled');
      expect(componentProps.disabled).toBe(true);
      expect(disabledStub).toHaveBeenCalledWith('one', objectData);
    });
  });
 
  describe('when ui:widget=radio and schema.enum', () => {
    it('-> options', () => {
      const schema = {
        'title': 'First name',
        'enum': ['one', 'two', 'three'],
      };
      const uiSchema = {
        'ui:widget': 'radio',
      };
      const expectedOptions = ['one', 'two', 'three'];
      const componentProps = getComponentProps({ schema, uiSchema });
      expect(componentProps).toHaveProperty('schema');
      expect(componentProps.schema.enum).toStrictEqual(expectedOptions);
    });
  });

  describe('sets type', () => {
    describe('to number when type=number', () => {
      it('and ui:widget=updown', () => {
        const schema = {
          'title': 'First name',
          'type': 'number',
        };
        const uiSchema = {
          'ui:widget': 'updown',
        };
        const componentProps = getComponentProps({ schema, uiSchema });
        expect(componentProps).toHaveProperty('type');
        expect(componentProps.type).toBe('number');
      });
      it('and ui:widget=radio', () => {
        const schema = {
          'title': 'First name',
          'type': 'number',
        };
        const uiSchema = {
          'ui:widget': 'radio',
        };
        const componentProps = getComponentProps({ schema, uiSchema });
        expect(componentProps).toHaveProperty('type');
        expect(componentProps.type).toBe('number');
      });
    });

    describe('to number when type=integer', () => {
      it('and ui:widget=updown', () => {
        const schema = {
          'title': 'First name',
          'type': 'integer',
        };
        const uiSchema = {
          'ui:widget': 'updown',
        };
        const componentProps = getComponentProps({ schema, uiSchema });
        expect(componentProps).toHaveProperty('type');
        expect(componentProps.type).toBe('integer');
      });
      it('and ui:widget=radio', () => {
        const schema = {
          'title': 'First name',
          'type': 'integer',
        };
        const uiSchema = {
          'ui:widget': 'radio',
        };
        const componentProps = getComponentProps({ schema, uiSchema });
        expect(componentProps).toHaveProperty('type');
        expect(componentProps.type).toBe('integer');
      });
    });

    it('to password when ui:widget=password', () => {
      const schema = {
        'title': 'Password',
        'type': 'string',
      };
      const uiSchema = {
        'ui:widget': 'password',
      };
      const componentProps = getComponentProps({ schema, uiSchema });
      expect(componentProps).toHaveProperty('type');
      expect(componentProps.type).toBe('string');
    });
  });

  describe('with ui:widget=textarea', () => {
    it('sets widget to textarea', () => {
      const schema = { 'title': 'First name', 'type': 'string' };
      const uiSchema = { 'ui:widget': 'textarea' };
      const componentProps = getComponentProps({ schema, uiSchema });
      expect(componentProps.widget).toBe('textarea');
    });
  });

  it('passes mui:* properties', () => {
    const schema = { 'title': 'First name' };
    const uiSchema = { 'mui:myprop': 'boo' };
    const componentProps = getComponentProps({ schema, uiSchema });
    expect(componentProps).toHaveProperty('uiSchema');
    expect(componentProps.uiSchema['mui:myprop']).toBe('boo');
  });

  describe('onChange callback', () => {
    it('is called with event target value', () => {
      // prepare
      const schema = { 'title': 'First name' };
      const value = 'new value';
      const spy = jest.fn();

      // act
      const componentProps = getComponentProps({ schema, onChange: spy });
      const { onChange } = componentProps;
      const domEvent = { target: { value } };
      onChange(domEvent);

      // check
      expect(spy).toHaveBeenLastCalledWith({ 'target': { 'value': 'new value' } }, undefined, false);
    });

    describe('is called with typed value', () => {
      it('text -> number', () => {
        // prepare
        const schema = { 'title': 'First name', 'type': 'number' };
        const value = '3';
        const spy = jest.fn();

        // act
        const componentProps = getComponentProps({ schema, onChange: spy });
        const { onChange } = componentProps;
        const domEvent = { target: { value } };
        onChange(domEvent);

        // check
        expect(spy).toHaveBeenCalledWith({ 'target': { 'value': '3' } }, undefined, false);
      });
      it('number -> text', () => {
        // prepare
        const schema = { 'title': 'First name', 'type': 'string' };
        const value = 3;
        const spy = jest.fn();

        // act
        const componentProps = getComponentProps({ schema, onChange: spy });
        const { onChange } = componentProps;
        const domEvent = { target: { value } };
        onChange(domEvent);

        // check
        expect(spy).toHaveBeenCalledWith({ 'target': { 'value': 3 } }, undefined, false);
      });
    });
  });
});
