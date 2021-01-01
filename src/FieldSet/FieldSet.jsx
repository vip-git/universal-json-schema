/* eslint-disable radix */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classNames from 'classnames';
import endsWith from 'lodash/endsWith';
import isEqual from 'lodash/isEqual';
import has from 'lodash/has';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

// Internal
import fieldSetStyles from './field-set-styles';
import FieldSetArray from './FieldSetArray';
import FieldSetObject from './FieldSetObject';
import FieldSetTabs from './FieldSetTabs';

const isPageLayoutTabs = (uiSchema) => {
  const pageSchema = uiSchema['ui:page'];
  return (pageSchema && pageSchema['ui:layout'] && pageSchema['ui:layout'] === 'tabs') || false;
};

export const shouldHideTitle = (uiSchema, schema) => isPageLayoutTabs(uiSchema) || has(schema, 'items.enum');

export const RawFieldSetContent = (props) => {
  const { schema = {}, uiSchema = {} } = props;
  const { type } = schema;
  if (type === 'array') {
    return <FieldSetArray {...props} />;
  }
  if (type === 'object') {
    return isPageLayoutTabs(uiSchema) ? <FieldSetTabs {...props} /> : <FieldSetObject {...props} />;
  }
  return null;
};

export const FieldSetContent = withStyles(fieldSetStyles.fieldSetContent)(RawFieldSetContent);

// for unit testing
export class RawFieldSet extends React.Component {
  shouldComponentUpdate = (nextProps) => !isEqual(this.props, nextProps)

  render() {
    const { className, path, classes, schema = {}, hideTitle, idxKey } = this.props;
    const LegendTitle = () => (!hideTitle && !(has(schema, 'items.enum')) && (
      schema.title 
      && (Number.isNaN(parseInt(path.replace(/[^\d.]/g, ''), 0)) 
      || parseInt(path.replace(/[^\d.]/g, ''), 0) === 0)
        && (
            <InputLabel> 
              {schema.title}
            </InputLabel>
        )
    )) || <div />;
    return (
      <fieldset className={classNames(className, classes.root, { [classes.listItem]: endsWith(path, ']') })}>
        <LegendTitle />
        <FieldSetContent path={path} {...this.props} />
      </fieldset>
    );
  }
}

export default withStyles(fieldSetStyles.fieldSet)(RawFieldSet);
