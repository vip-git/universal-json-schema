/* globals describe,it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { default as CheckboxComp } from '..'; // eslint-disable-line import/no-named-default

describe('Checkbox', () => {
  it('mounts with standard attributes (control)', () => {
    const checked = true;
    const path = 'done';
    const label = 'Done';
    const wrapper = mount(
      <CheckboxComp label={label} path={path} checked={checked} />,
    );

    const fcComp = wrapper.find(FormControlLabel);
    expect(fcComp).to.have.length(1);
    expect(fcComp.prop('label')).to.equal(label);

    const cbComp = wrapper.find(Checkbox);
    expect(cbComp).to.have.length(1);
    expect(cbComp.prop('checked')).to.equal(checked);
    expect(cbComp.prop('value')).to.equal(path);
  });
  it('passes additional properties to the Checkbox component', () => {
    const props = {
      color: 'primary',
    };
    const wrapper = mount(
      <CheckboxComp {...props} />,
    );

    const cbComp = wrapper.find(Checkbox);
    expect(cbComp.prop('color')).to.equal(props.color);
  });
  it('calls onChange when clicked', () => {
    const onChange = sinon.spy();
    const checked = true;
    const wrapper = mount(
      <CheckboxComp path={'a'} value={checked} onChange={onChange} />,
    );

    const cbComp = wrapper.find('input');
    expect(cbComp).to.have.length(1);
    cbComp.simulate('change');
    expect(onChange).to.have.been.calledOnce;
  });
});
