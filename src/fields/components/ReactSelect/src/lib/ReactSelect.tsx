/* eslint-disable */

import React from 'react';
import Select from 'react-select';
import { withStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';

const classNames = require('classnames');

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing(1) / 2}px ${theme.spacing(1) / 4}px`,
  },
  chipFocused: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  },
  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color='textSecondary'
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      disabled={props.isDisabled}
      component='div'
      style={props.data.style ? {
        fontWeight: props.isSelected ? 500 : 400,
        ...props.data.style,
      } : {
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color='textSecondary'
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class IntegrationReactSelect extends React.Component<any, any> {
  state = {
    single: null,
    multi: null,
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: (base) => ({
        ...base,
        'height': 'auto',
        'color': theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return (
      <div key={`material-form-select- ${this.props.label}`} className={['material-form-select', classes.root].join(' ')}>
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: this.props.label,
              id: this.props.htmlid,
              InputLabelProps: {
                shrink: true,
              },
            }}
            placeholder={this.props.placeholder}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            options={this.props.suggestions}
            components={components}
            value={this.props.value}
            onChange={this.props.onChange}
            isMulti={this.props.multiple}
            isOptionDisabled={(option) => option.disabled}
          />
      </div>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(IntegrationReactSelect);
