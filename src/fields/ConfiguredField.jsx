/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import ActiveComp from '@material-ui/icons/FiberManualRecord';
import fieldStyles from './field-styles';

// for unit testing only
export class RawConfiguredField extends React.Component {
  shouldComponentUpdate = nextProps => this.props.data !== nextProps.data
  render() {
    const {
      classes = {}, data, type, descriptionText, activeCompColor, helpText, Component = Input, LabelComponent, labelComponentProps = {},
      title, className, componentProps = {}, id,
    } = this.props;
    return (
      <FormControl id={`${id}-formControl`} className={classNames(classes.root, { [classes.withLabel]: LabelComponent })} style={{ flexDirection: (activeCompColor) ? 'row' : 'column' }}>
        {LabelComponent && title &&
          <LabelComponent
             id={`${id}-labelControl`}
            {...labelComponentProps}
            style={{
              left: 10,
            }}
          >{title}
          </LabelComponent>
        }
        {descriptionText && <p className={classes.description}>{descriptionText}</p>}
        {activeCompColor && <ActiveComp id={`${id}-activeComp`} style={{
              flexBasis: '6%',
              top: 22,
              position: 'relative',
              marginRight: 10,
              color: activeCompColor || 'grey',
            }}
        />}
        <Component
          className={className && classes[className]}
          value={data}
          type={type}
          {...componentProps}
        />
        {helpText && <FormHelperText id={`${id}-help`}>{helpText}</FormHelperText>}
      </FormControl>
    );
  }
}
export default withStyles(fieldStyles)(RawConfiguredField);
