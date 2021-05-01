// Internal
import configureComponent from '../configure-component';

jest.mock('../component/get-component-props');
jest.mock('../component/get-component');
jest.mock('../label/get-label-component-props');
jest.mock('../label/get-label-component');

describe('configureComponent', () => {

  it('delegates to helper functions - control', async () => {
    // Function Mocks
    const getComponentProps = require('../component/get-component-props').default;
    const getComponent = require('../component/get-component').default;
    const getLabelComponentProps = require('../label/get-label-component-props').default;
    const getLabelComponent = require('../label/get-label-component').default;

    const props = { schema: { title: 'Default title' } };
    const expectedComponent = 'x';
    const expectedLabelComponent = 'y';
    const expectedComponentProps = { 'a': 'a' };
    const expectedLabelComponentProps = { 'b': 'b' };
    
    getComponent.mockImplementation(() => expectedComponent);
    getLabelComponent.mockImplementation(() => expectedLabelComponent);
    getComponentProps.mockImplementation(() => expectedComponentProps);
    getLabelComponentProps.mockImplementation(() => expectedLabelComponentProps);

    const { componentProps, labelComponentProps, Component, LabelComponent, className, title } = configureComponent(props);

    expect(Component).toBe(expectedComponent);
    expect(LabelComponent).toBe(expectedLabelComponent);
    expect(componentProps).toStrictEqual(expectedComponentProps);
    expect(labelComponentProps).toStrictEqual(expectedLabelComponentProps);
    expect(className).toBeNull();
    expect(title).toStrictEqual(props.schema.title);
  });

  it('substitutes title for ui:title if present', () => {
    const schema = { 'title': 'Default title' };
    const uiSchema = { 'ui:title': 'Another title' };
    const config = configureComponent({ schema, uiSchema });
    expect(config.title).toEqual('Another title');
  });

  it('sets classname for textarea', () => {
    const schema = {};
    const uiSchema = { 'ui:widget': 'textarea' };
    const { className } = configureComponent({ schema, uiSchema });
    expect(className).toEqual('textarea');
  });

  it('no LabelComponent if no title', () => {
    const schema = {};
    const { LabelComponent } = configureComponent({ schema });
    expect(LabelComponent).toBe(false);
  });
});
