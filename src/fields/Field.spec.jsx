/* globals describe,it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Input from '@material-ui/core/Input';
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core/Form';
import { RadioGroup } from './components';
import { ConfiguredField } from './Field';

const classes = {
  description: 'description',
  root: 'rootClassName',
  myComp: 'myCompClassName',
  withLabel: 'withLabelClass',
};

chai.use(chaiEnzyme());
chai.use(sinonChai);
Enzyme.configure({ adapter: new Adapter() });

describe('Field', () => {
  it('mounts with standard attributes (control)', () => {
    const componentProps = {
      multiline: true,
    };
    const data = 'Hello';
    const type = 'string';
    const wrapper = shallow(
      <ConfiguredField type={type} data={data} classes={classes} componentProps={componentProps} />,
    );
    // test FormControl properties
    const FC = wrapper.find(FormControl);
    expect(FC).to.have.length(1);
    expect(FC).to.have.prop('className').match(/rootClassName/).not.match(/withLabelClass/);

    // no helpText, descriptionText or LabelComponent
    expect(FC.children()).to.have.length(1); // control

    // test Component properties
    const Component = wrapper.find(Input); // control
    expect(Component).to.be.present();
    expect(Component).to.have.prop('multiline', componentProps.multiline);
    expect(Component).to.have.prop('value', data);
    expect(Component).to.have.prop('type', type);
    expect(Component).to.not.have.prop('className'); // control
  });
  it('applies given className', () => {
    const wrapper = shallow(<ConfiguredField classes={classes} className={'myComp'} />);
    const Component = wrapper.find(Input);
    expect(Component).to.be.present();
    expect(Component).to.have.prop('className', classes.myComp);
  });
  it('renders provided Component', () => {
    const wrapper = shallow(<ConfiguredField Component={RadioGroup} />);
    expect(wrapper.find(Input)).to.not.be.present();
    expect(wrapper.find(RadioGroup)).to.be.present();
  });
  it('renders provided LabelComponent with title and labelComponentProps', () => {
    const labelComponentProps = {
      style: 'bold',
    };
    const title = 'Hello';
    const DummyLabel = ({ children }) => <div>{children}</div>;

    const wrapper = shallow(
      <ConfiguredField title={title} labelComponentProps={labelComponentProps} LabelComponent={DummyLabel} />,
    );

    const labelComp = wrapper.find(DummyLabel);
    expect(labelComp).to.be.present();
    expect(labelComp).to.have.prop('style', labelComponentProps.style);
    expect(labelComp.children()).to.have.length(1);
    expect(labelComp.childAt(0)).to.have.text(title);
  });
  it('renders provided descriptionText', () => {
    const descriptionText = 'This is a field';
    const wrapper = shallow(<ConfiguredField classes={classes} descriptionText={descriptionText} />);

    const descriptionComp = wrapper.find('p');
    expect(descriptionComp).to.have.length(1);
    expect(descriptionComp).to.have.prop('className', classes.description);
    expect(descriptionComp).to.have.text(descriptionText);
  });
  it('renders provided helpText', () => {
    const helpText = 'Help! I need somebody!';
    const id = 'unq-id';
    const wrapper = shallow(<ConfiguredField id={id} helpText={helpText} />);

    const helpComp = wrapper.find(FormHelperText);
    expect(helpComp).to.be.present();
    expect(helpComp).to.have.prop('id', `${id}-help`);
    expect(helpComp.children()).to.have.length(1);
    expect(helpComp.childAt(0).text()).to.equal(helpText);
  });
  it('calls onChange', () => {
    const onChange = sinon.spy();
    const data = 'Some value';
    const componentProps = {
      onChange,
    };
    const wrapper = shallow(<ConfiguredField componentProps={componentProps} data={data} />);

    const inputComp = wrapper.find(Input);
    inputComp.simulate('change', 'value');
    expect(onChange).to.be.calledWith('value');
  });
  it('has withLabel className ', () => {
    const wrapper = shallow(<ConfiguredField LabelComponent={FormLabel} classes={classes} />);

    expect(wrapper).prop('className').match(/withLabelClass/);
  });
});
