
// Internal
import getComponent from '../get-component';

// Material UI
const InputSpy = require('@mui/material/Input').default;
const RadioGroupSpy = require('@mui/material/RadioGroup').default;
const CheckboxSpy = require('@mui/material/Checkbox').default;
const SelectSpy = require('@mui/material/Select').default;

describe('getComponent', () => {
  it('configures props for simple field', () => {
    const schema = {
      'title': 'First name',
      'type': 'string',
    };
    const required = [];
    const path = 'firstName';
    const uiSchema = {};
    // const data = 'Maxamillian';
    const htmlid = 'unq';
    const onChange = jest.fn();
    const Component = getComponent({ schema, uiSchema, required, path, htmlid, onChange });
    expect(Component.id).toEqual(InputSpy.id);
  });
  // describe('yields Component', () => {
  //   describe('depending on ui:widget', () => {
  //     it('-> RadioGroup when ui:widget=radio and schema.enum', () => {
  //       const schema = {
  //         'enum': ['one', 'two', 'three'],
  //       };
  //       const uiSchema = {
  //         'ui:widget': 'radio',
  //       };
  //       const Component = getComponent({ schema, uiSchema });
  //       expect(Component.id).toEqual(RadioGroupSpy.id);
  //     });
  //     it('Checkbox when ui:widget=radio and schema.enum', () => {
  //       const schema = {
  //         'enum': ['one', 'two', 'three'],
  //       };
  //       const uiSchema = {
  //         'ui:widget': 'radio',
  //       };
  //       const Component = getComponent({ schema, uiSchema });
  //       expect(Component.id).toEqual(RadioGroupSpy.id);
  //     });
  //   });
  //   it('Checkbox when type=boolean', () => {
  //     const schema = {
  //       'type': 'boolean',
  //     };
  //     const uiSchema = {
  //     };
  //     const Component = getComponent({ schema, uiSchema });
  //     expect(Component.id).toEqual(CheckboxSpy.id);
  //   });
  //   it('Select when schema.enum', () => {
  //     const schema = {
  //       'enum': ['one', 'two', 'three'],
  //     };
  //     const uiSchema = {
  //     };
  //     const Component = getComponent({ schema, uiSchema });
  //     expect(Component.id).toEqual(SelectSpy.id);
  //   });
  //   it('Select when schema.enum, regardless of type', () => {
  //     const schema = {
  //       'type': 'number',
  //       'enum': ['one', 'two', 'three'],
  //     };
  //     const uiSchema = {
  //     };
  //     const Component = getComponent({ schema, uiSchema });
  //     expect(Component.id).toEqual(SelectSpy.id);
  //   });
  // });
});
