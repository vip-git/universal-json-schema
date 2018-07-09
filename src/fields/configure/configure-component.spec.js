/* globals describe,it,beforeEach */
// eslint-disable-next-line max-len
/* eslint-disable import/no-webpack-loader-syntax,import/no-extraneous-dependencies,import/no-unresolved,no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// import configureComponent from './configure-component';

const inject = require('inject-loader!./configure-component');

chai.use(sinonChai);

describe('configureComponent', () => {
  let configureComponent;
  const getComponentProps = sinon.stub();
  const getLabelComponentProps = sinon.stub();
  const getLabelComponent = sinon.stub();
  const getComponent = sinon.stub();
  beforeEach(() => {
    configureComponent = inject({
      './get-component-props': getComponentProps,
      './get-label-component-props': getLabelComponentProps,
      './get-label-component': getLabelComponent,
      './get-component': getComponent,
    }).default;
  });
  it('delegates to helper functions - control', () => {
    const props = { schema: { title: 'Default title' } };
    const expectedComponent = 'x';
    const expectedLabelComponent = 'y';
    const expectedComponentProps = { 'a': 'a' };
    const expectedLabelComponentProps = { 'b': 'b' };
    getComponent.returns(expectedComponent);
    getLabelComponent.returns(expectedLabelComponent);
    getComponentProps.returns(expectedComponentProps);
    getLabelComponentProps.returns(expectedLabelComponentProps);

    const { componentProps, labelComponentProps, Component, LabelComponent, className, title } = configureComponent(props);

    expect(Component).to.equal(expectedComponent);
    expect(LabelComponent).to.equal(expectedLabelComponent);
    expect(componentProps).to.deep.equal(expectedComponentProps);
    expect(labelComponentProps).to.deep.equal(expectedLabelComponentProps);
    expect(className).to.be.null;
    expect(title).to.equal(props.schema.title);
  });
  it('substitutes title for ui:title if present', () => {
    const schema = { 'title': 'Default title' };
    const uiSchema = { 'ui:title': 'Another title' };
    const config = configureComponent({ schema, uiSchema });
    expect(config.title).to.equal('Another title');
  });
  it('sets classname for textarea', () => {
    const schema = {};
    const uiSchema = { 'ui:widget': 'textarea' };
    const { className } = configureComponent({ schema, uiSchema });
    expect(className).to.equal('textarea');
  });
  it('no LabelComponent if no title', () => {
    const schema = {};
    const { LabelComponent } = configureComponent({ schema });
    expect(LabelComponent).to.be.undefined;
  });
});
