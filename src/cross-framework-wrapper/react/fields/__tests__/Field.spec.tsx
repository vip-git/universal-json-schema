// Library
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mountTheme, shallowTheme } from '@helpers/enzyme-unit-test';

// Material UI
import FormLabel from '@mui/material/FormLabel';

// Internal
import RadioGroup from '@react-jsonschema-form-components/material-radio-group';
import ConfiguredField from '../ConfiguredField';

const classes = {
  description: 'description',
  root: 'rootClassName',
  myComp: 'myCompClassName',
  withLabel: 'withLabelClass',
};

describe('Field', () => {
  it('mounts with standard attributes (control)', () => {
    const componentProps = {
      multiline: true,
    };
    const data = 'Hello';
    const type = 'string';
    const givenField = mountTheme({
      component: (
        <ConfiguredField type={type} data={data} componentProps={componentProps}  />
      )
    });
    
    const wrapper = givenField.find('RawConfiguredField');

    // test FormControl properties
    const FC = wrapper.find('ForwardRef(FormControl)');
    const FClass = FC.prop('className')
    expect(FC).toHaveLength(1);
    expect(FClass).toMatch(/makeStyles-root-1/)
    expect(FClass).not.toMatch(/withLabelClass/)

    // no helpText, descriptionText or LabelComponent
    expect(FC.children()).toHaveLength(1); // control

    // test Component properties
    const Component = wrapper.find('ForwardRef(Input)'); // control
    expect(Component.find('ForwardRef(TextareaAutosize)')).toHaveLength(1);
    expect(Component.prop('multiline')).toBe(componentProps.multiline);
    expect(Component.prop('value')).toBe(data);
    expect(Component.prop('type')).toBe(type);
    // expect(Component.prop('className')).toBeDefined(); // control
  });
  
  it('applies given className', () => {
    const wrapper = shallowTheme({
        component: (<ConfiguredField className={'myComp'} />
      )
    }).find('RawConfiguredField');
    const Component = wrapper.find('ForwardRef(Input)');
    expect(Component).toBeDefined();
    // expect(Component.prop('classes')).toBe('myComp');
  });

  it('renders provided Component', () => {
    const wrapper = mountTheme({
        component: (
          <ConfiguredField Component={RadioGroup} />
        )
      }).find('RawConfiguredField');
    expect(wrapper.find('ForwardRef(Input)')).toHaveLength(0);
    expect(wrapper.find('ForwardRef(RadioGroup)')).toHaveLength(1);
  });

  it('renders provided LabelComponent with title and labelComponentProps', () => {
    const labelComponentProps = {
      style: 'bold',
    };
    const title = 'Hello';
    const DummyLabel = ({ children }) => <div>{children}</div>;

    const wrapper =  mountTheme({
      component: (
        <ConfiguredField title={title} labelComponentProps={labelComponentProps} LabelComponent={DummyLabel} />
      )
    }).find('RawConfiguredField');

    const labelComp = wrapper.find(DummyLabel);
    expect(labelComp).toHaveLength(1);
    expect(labelComp.prop('style')).toBe(labelComponentProps.style);
    expect(labelComp.children()).toHaveLength(1);
    expect(labelComp.childAt(0).text()).toBe(title);
  });

  it('renders provided descriptionText', () => {
    const descriptionText = 'This is a field';
    const wrapper = mountTheme({
        component: (
          <ConfiguredField descriptionText={descriptionText} />
        )
      }).find('RawConfiguredField');

    const descriptionComp = wrapper.find('p');
    expect(descriptionComp).toHaveLength(1);
    expect(descriptionComp.prop('className')).toBe('makeStyles-description-24');
    expect(descriptionComp.text().trim()).toBe(descriptionText);
  });

  it('renders provided helpText', () => {
    const helpText = 'Help! I need somebody!';
    const id = 'unq-id';
    const wrapper = mountTheme({
        component: (
          <ConfiguredField id={id} helpText={helpText} />
        )
      }).find('RawConfiguredField');

    const helpComp = wrapper.find('ForwardRef(FormHelperText)');
    expect(helpComp).toHaveLength(1);
    expect(helpComp.prop('id')).toBe(`${id}-help`);
    expect(helpComp.children()).toHaveLength(1);
    expect(helpComp.childAt(0).text()).toBe(helpText);
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const data = 'Some value';
    const componentProps = {
      onChange,
    };
    const wrapper = mountTheme({
        component: (
          <ConfiguredField componentProps={componentProps} data={data} />
        )
      }).find('RawConfiguredField');

    const inputComp = wrapper.find('ForwardRef(Input)');
    act(() => {
      inputComp.prop('onChange')('value');
    });
    expect(onChange).toBeCalledWith('value');
  });

  it('has withLabel className ', () => {
    const wrapper =  mountTheme({
        component: (
          <ConfiguredField LabelComponent={FormLabel} />
        )
      }).find('RawConfiguredField');
    expect(wrapper.find('ForwardRef(FormControl)').prop('className')).toMatch(/makeStyles-withLabel/);
  });
});
