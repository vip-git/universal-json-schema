/* globals describe,it,beforeEach */
// eslint-disable-next-line max-len
/* eslint-disable import/no-webpack-loader-syntax,import/no-extraneous-dependencies,import/no-unresolved,no-unused-expressions */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);
const inject = require('inject-loader!./get-component');

let InputSpy;
let RadioGroupSpy;
let CheckboxSpy;
let SelectSpy;
let getComponent;

describe('getComponent', () => {
  beforeEach(() => {
    InputSpy = sinon.spy();
    RadioGroupSpy = sinon.spy();
    CheckboxSpy = sinon.spy();
    SelectSpy = sinon.spy();
    getComponent = inject({
      '@material-ui/core/Input': {
        default: InputSpy,
      },
      '../components': {
        RadioGroup: RadioGroupSpy,
        Checkbox: CheckboxSpy,
        Select: SelectSpy,
      },
    }).default;
  });
  it('configures props for simple field', () => {
    const schema = {
      'title': 'First name',
      'type': 'string',
    };
    const required = [];
    const path = 'firstName';
    const uiSchema = {};
    // const data = 'Maxamillian';
    const htmlId = 'unq';
    const onChange = sinon.spy();
    const Component = getComponent({ schema, uiSchema, required, path, htmlId, onChange });
    expect(Component.id).to.equal(InputSpy.id);
  });
  describe('yields Component', () => {
    describe('depending on ui:widget', () => {
      it('-> RadioGroup when ui:widget=radio and schema.enum', () => {
        const schema = {
          'enum': ['one', 'two', 'three'],
        };
        const uiSchema = {
          'ui:widget': 'radio',
        };
        const Component = getComponent({ schema, uiSchema });
        expect(Component.id).to.equal(RadioGroupSpy.id);
      });
      it('Checkbox when ui:widget=radio and schema.enum', () => {
        const schema = {
          'enum': ['one', 'two', 'three'],
        };
        const uiSchema = {
          'ui:widget': 'radio',
        };
        const Component = getComponent({ schema, uiSchema });
        expect(Component.id).to.equal(RadioGroupSpy.id);
      });
    });
    it('Checkbox when type=boolean', () => {
      const schema = {
        'type': 'boolean',
      };
      const uiSchema = {
      };
      const Component = getComponent({ schema, uiSchema });
      expect(Component.id).to.equal(CheckboxSpy.id);
    });
    it('Select when schema.enum', () => {
      const schema = {
        'enum': ['one', 'two', 'three'],
      };
      const uiSchema = {
      };
      const Component = getComponent({ schema, uiSchema });
      expect(Component.id).to.equal(SelectSpy.id);
    });
    it('Select when schema.enum, regardless of type', () => {
      const schema = {
        'type': 'number',
        'enum': ['one', 'two', 'three'],
      };
      const uiSchema = {
      };
      const Component = getComponent({ schema, uiSchema });
      expect(Component.id).to.equal(SelectSpy.id);
    });
  });
});
