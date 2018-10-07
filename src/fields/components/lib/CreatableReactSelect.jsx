import React, { Component } from 'react';

import CreatableReactSelect from 'react-select/lib/Creatable';

const components = {
  DropdownIndicator: null,
};

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
  render() {
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
          inputValue={this.props.inputValue}
          isClearable
          isMulti
          menuIsOpen={false}
          onChange={this.props.onChange}
          onInputChange={this.props.onInputChange}
          onKeyDown={this.props.onKeyDown}
          styles={colourStyles}
          placeholder={'Type something and press enter...'}
          value={this.props.value}
        />
      </div>
    );
  }
}
