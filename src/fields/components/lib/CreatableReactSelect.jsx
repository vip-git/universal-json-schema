import React, { Component } from 'react';

import CreatableReactSelect from 'react-select/lib/Creatable';

const components = {
  DropdownIndicator: null,
};

const createOption = label => ({
  label,
  value: label,
});

const colourStyles = {
  control: styles => ({
    ...styles,
    top: 0,
    height: 10,
    overflow: 'auto',
    borderTop: 'none',
    boxShadow: 'none!important',
    background: 'white',
    borderLeft: 'none',
    borderColor: 'rgba(0, 0, 0, 0.42)!important',
    borderRight: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: 0,
    marginTop: 10,
    marginBottom: 10,
  }),
};

export default class CreatableInputOnly extends Component {
  state = {
    inputValue: '',
    value: [],
  };

  componentWillMount = () => {
    this.setState({
      value: this.props.value,
    });
  }

  handleChange = (value, actionMeta) => {
    console.group('Value Changed');
    console.log(value);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.props.onChange(value);
    this.setState({ value });
  };

  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };

  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        console.group('Value Added');
        console.log(value);
        console.groupEnd();
        const finalValue = [...value, createOption(inputValue)];
        this.props.onChange(finalValue);
        this.setState({
          inputValue: '',
          value: finalValue,
        });
        event.preventDefault();
    }
  };

  render() {
    const { inputValue, value } = this.state;
    return (
      <div>
        <span style={{
            fontSize: '0.7rem',
            color: 'gray',
            top: 13,
            position: 'relative',
          }}
        > 
          { this.props.label } 
        </span>
        <CreatableReactSelect
          components={components}
          inputValue={inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          styles={colourStyles}
          placeholder={'Type something and press enter...'}
          value={value}
        />
      </div>
    );
  }
}
