/* globals describe,it */
/* eslint-disable import/no-webpack-loader-syntax,import/no-extraneous-dependencies,import/no-unresolved,no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import getComponentProps from '../get-component-props';

chai.use(sinonChai);

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
    const onChange = sinon.spy();
    const expectedInputProps = {
      id: htmlid,
    };
    const componentProps = getComponentProps({ schema, uiSchema, required, path, htmlid, onChange });
    expect(componentProps).to.haveOwnProperty('inputProps');
    expect(componentProps.inputProps).toStrictEqual(expectedInputProps);
    expect(componentProps.type).to.equal('string');
  });
  it('creates options property from enum', () => {
    const schema = {
      'title': 'First name',
      'enum': ['one', 'two', 'three'],
    };
    const uiSchema = {};
    const expectedOptions = [
      { key: 'one', value: 'one' },
      { key: 'two', value: 'two' },
      { key: 'three', value: 'three' },
    ];
    const componentProps = getComponentProps({ schema, uiSchema });
    expect(componentProps).to.haveOwnProperty('options');
    expect(componentProps.options).toStrictEqual(expectedOptions);
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
      expect(componentProps).to.haveOwnProperty('disabled');
      expect(componentProps.disabled).to.equal(true);
    });
    it('as function adds disabled property', () => {
      const disabledStub = sinon.stub();
      disabledStub.returns(true);
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
      expect(componentProps).to.haveOwnProperty('disabled');
      expect(componentProps.disabled).to.equal(true);
      expect(disabledStub).to.have.been.calledWith('one', objectData);
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
      const expectedOptions = [
        { key: 'one', value: 'one' },
        { key: 'two', value: 'two' },
        { key: 'three', value: 'three' },
      ];
      const componentProps = getComponentProps({ schema, uiSchema });
      expect(componentProps).to.haveOwnProperty('options');
      expect(componentProps.options).toStrictEqual(expectedOptions);
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
        expect(componentProps).to.haveOwnProperty('type');
        expect(componentProps.type).to.equal('number');
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
        expect(componentProps).to.haveOwnProperty('type');
        expect(componentProps.type).to.equal('number');
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
        expect(componentProps).to.haveOwnProperty('type');
        expect(componentProps.type).to.equal('number');
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
        expect(componentProps).to.haveOwnProperty('type');
        expect(componentProps.type).to.equal('number');
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
      expect(componentProps).to.haveOwnProperty('type');
      expect(componentProps.type).to.equal('password');
    });
  });
  describe('with ui:widget=textarea', () => {
    it('sets rows and multiline', () => {
      const schema = { 'title': 'First name', 'type': 'string' };
      const uiSchema = { 'ui:widget': 'textarea' };
      const componentProps = getComponentProps({ schema, uiSchema });
      expect(componentProps).to.haveOwnProperty('rows');
      expect(componentProps).to.haveOwnProperty('multiline');
      expect(componentProps.rows).to.equal(5);
      expect(componentProps.multiline).to.equal(true);
    });
  });
  it('passes mui:* properties', () => {
    const schema = { 'title': 'First name' };
    const uiSchema = { 'mui:myprop': 'boo' };
    const componentProps = getComponentProps({ schema, uiSchema });
    expect(componentProps).to.haveOwnProperty('myprop');
    expect(componentProps.myprop).to.equal('boo');
  });
  describe('onChange callback', () => {
    it('is called with event target value', () => {
      // prepare
      const schema = { 'title': 'First name' };
      const value = 'new value';
      const spy = sinon.spy();

      // act
      const componentProps = getComponentProps({ schema, onChange: spy });
      const { onChange } = componentProps;
      const domEvent = { target: { value } };
      onChange(domEvent);

      // check
      expect(spy).to.have.been.calledWith(value);
    });
    describe('is called with typed value', () => {
      it('text -> number', () => {
        // prepare
        const schema = { 'title': 'First name', 'type': 'number' };
        const value = '3';
        const spy = sinon.spy();

        // act
        const componentProps = getComponentProps({ schema, onChange: spy });
        const { onChange } = componentProps;
        const domEvent = { target: { value } };
        onChange(domEvent);

        // check
        expect(spy).to.have.been.calledWith(3);
      });
      it('number -> text', () => {
        // prepare
        const schema = { 'title': 'First name', 'type': 'string' };
        const value = 3;
        const spy = sinon.spy();

        // act
        const componentProps = getComponentProps({ schema, onChange: spy });
        const { onChange } = componentProps;
        const domEvent = { target: { value } };
        onChange(domEvent);

        // check
        expect(spy).to.have.been.calledWith('3');
      });
    });
  });
});
