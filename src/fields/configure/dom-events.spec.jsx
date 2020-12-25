/* globals describe,it */
/* eslint-disable no-unused-expressions */
import React from 'react';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme';

chai.use(sinonChai);

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

describe('dom events', () => {
  it('test click button', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(
      <button onClick={onClick} />,
    );

    const btnComp = wrapper.find('button');
    expect(btnComp).to.have.length(1);
    btnComp.simulate('click');
    expect(onClick).to.have.been.calledOnce;
  });
  it('test click checkbox', () => {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <input type={'checkbox'} onChange={onChange} value={'a'} checked />,
    );

    const btnComp = wrapper.find('input');
    expect(btnComp).to.have.length(1);
    btnComp.simulate('change');
    expect(onChange).to.have.been.calledOnce;
  });
});
