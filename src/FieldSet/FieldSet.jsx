import React from 'react';
import classNames from 'classnames';
import endsWith from 'lodash/endsWith';
import isEqual from 'lodash/isEqual';
import { withStyles } from '@material-ui/core/styles';
import { InputLabel } from '@material-ui/core/Input';
import fieldSetStyles from './field-set-styles';
import FieldSetArray from './FieldSetArray';
import FieldSetObject from './FieldSetObject';


export const RawFieldSetContent = (props) => {
  const { schema = {} } = props;
  const { type } = schema;
  if (type === 'array') {
    return <FieldSetArray {...props} />;
  }
  else if (type === 'object') {
    return <FieldSetObject {...props} />;
  }
  return null;
};
export const FieldSetContent = withStyles(fieldSetStyles.fieldSetContent)(RawFieldSetContent);


// for unit testing
export class RawFieldSet extends React.Component {
  shouldComponentUpdate = nextProps => !isEqual(this.props.data, nextProps.data)
  render() {
    const { className, path, classes, schema = {} } = this.props;
    return (
      <fieldset className={classNames(className, classes.root, { [classes.listItem]: endsWith(path, ']') })}>
        {schema.title &&
          <InputLabel>{schema.title}</InputLabel>
        }
        <FieldSetContent path={path} {...this.props} />
      </fieldset>
    );
  }
}

export default withStyles(fieldSetStyles.fieldSet)(RawFieldSet);
