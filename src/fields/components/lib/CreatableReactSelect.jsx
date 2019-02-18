import React, { Component } from 'react';
import _ from 'lodash';
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
    this.props.onChange(value);
    this.setState({ value });
  };

  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };

  addMultipleValue = (MultiArray, multiValueArray) => {
    MultiArray.forEach((value, key) => {
      if (value !== '') {
        multiValueArray.push(createOption(value));
      }
    });

    return multiValueArray;
  }

  addSingleValue = (inputValue, multiValueArray) => {
    if (inputValue !== '') {
      multiValueArray.push(createOption(inputValue));
    }

    return multiValueArray;
  }

  saveValuesToObject = () => {
    const { inputValue, value } = this.state;
    if (!inputValue || (this.props.optionsOnly && _.values(_.mapValues(this.props.option, 'value')).indexOf(inputValue) === -1)) return;
    const multiValueArray = [...value];
    const combinedInputValue = (inputValue.split(' ').length === 1) ? 
      this.addSingleValue(inputValue, multiValueArray) : 
      this.addMultipleValue(inputValue.split(' '), multiValueArray);
    this.props.onChange(combinedInputValue);
    this.setState({
      inputValue: '',
      value: combinedInputValue,
    });
  }

  handleKeyDown = (event) => {
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.saveValuesToObject();
        event.preventDefault();
    }
  };

  renderCreatableSelectComponent = (value, inputValue) => ((this.props.optionsOnly) ? (
      <CreatableReactSelect
        id={this.props.htmlid}
        components={components}
        inputValue={inputValue}
        isClearable
        isValidNewOption={() => false}
        isMulti
        onChange={this.handleChange}
        onBlur={this.saveValuesToObject}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        options={this.props.options}
        styles={colourStyles}
        placeholder={'Type something and press enter...'}
        value={value}
      />
  ) : (
      <CreatableReactSelect
        id={this.props.htmlid}
        components={components}
        inputValue={inputValue}
        isClearable
        isMulti
        menuIsOpen={false}
        onChange={this.handleChange}
        onBlur={this.saveValuesToObject}
        onInputChange={this.handleInputChange}
        onKeyDown={this.handleKeyDown}
        options={this.props.options}
        styles={colourStyles}
        placeholder={'Type something and press enter...'}
        value={value}
      />
  ));

  render() {
    const { inputValue, value } = this.state;
    return (
      <div id={`${this.props.htmlid}_parent`}>
        <span style={{
            fontSize: '0.7rem',
            color: 'gray',
            top: 13,
            position: 'relative',
          }}
        > 
          { this.props.label } 
        </span>

        { this.renderCreatableSelectComponent(value, inputValue) }
      </div>
    );
  }
}
