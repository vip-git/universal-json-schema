import React from 'react';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';
import FieldSet from './FieldSet';
import Field from './fields';
import styles from './form-field-styles';

// exported for unit testing
export class RawFormField extends React.Component {
  shouldComponentUpdate = nextProps => !isEqual(this.props.data, nextProps.data)
  render() {
    const { classes, schema, data, uiSchema = {}, onChange, onKeyDown, path, ...rest } = this.props;
    const { type } = schema;
    if (type === 'object' || type === 'array') {
      return (
              <FieldSet
                path={path}
                schema={schema}
                data={data}
                uiSchema={uiSchema}
                onKeyDown={onKeyDown}
                onChange={onChange}
                {...rest} 
              />
      );
    }
    return (
      <Field
        className={classes.field}
        path={path}
        schema={schema}
        data={data}
        uiSchema={uiSchema}
        onChange={onChange && onChange(path)}
        onKeyDown={onKeyDown}
        {...rest}
      />
    );
  }
}

export default withStyles(styles)(RawFormField);
