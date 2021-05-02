// Library
import React from 'react';

// Enzyme
import { shallow } from 'enzyme';

describe('dom events', () => {
  it('test click button', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <button onClick={onClick} />,
    );

    const btnComp = wrapper.find('button');
    expect(btnComp).toHaveLength(1);
    btnComp.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
  it('test click checkbox', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <input type={'checkbox'} onChange={onChange} value={'a'} checked />,
    );

    const btnComp = wrapper.find('input');
    expect(btnComp).toHaveLength(1);
    btnComp.simulate('change');
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
