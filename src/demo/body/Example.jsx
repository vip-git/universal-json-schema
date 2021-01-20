/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './example-styles';
import Source from './Source';
import Form from '../../Form';

// Custom Components
import CustomRating from './custom-components/rating.component';
import CustomComponent from './custom-components/range-picker.component';

const FormComponent = ({
  givenSchema,
  givenUISchema,
  givenFormData,
  givenUIData,
  onCancel,
  onSubmit,
  onUpload,
  onFormChanged,
  onError,
}) => (
		<Form
			schema={givenSchema}
			uiSchema={givenUISchema}
      formData={givenFormData}
			onCancel={onCancel}
			onSubmit={onSubmit}
			onUpload={onUpload}
      onChange={onFormChanged}
      onError={onError}
      interceptors={{
        translateRatings: (givenData, uiData) => ({ givenData, uiData }),
      }}
			components={{
			  customComponent: ({ onChange, ...rest }) => (
					<CustomComponent onChange={onChange} formData={givenFormData} uiData={givenUIData} {...rest} />
			  ),
			  customRating: ({ onChange, ...rest }) => (
					<CustomRating onChange={onChange} formData={givenFormData} uiData={givenUIData} {...rest} />
			  ),
			}}
      validations={{
        confirmPassword: ({ schema, validations, formData, value }) => value !== formData.pass1 && ({
          message: validations.confirmPassword.message,
          inline: true,
        }),
      }}
			submitOnEnter
			activityIndicatorEnabled
		/>
);

const SourceSchema = ({
  classes,
  validSchema,
  schema,
  uiSchema,
  formData,
  onChange,
  hasSchemaError,
  showStuff,
}) => (
    <div className={classes.sourceCtr}>
      <div>
        <Source title={'JSONSchema.json'} source={schema} onChange={onChange('schema')} />
      </div>
      <div>
        <Source title={'uiSchema.json'} source={uiSchema} onChange={onChange('uiSchema')} />
        <Source title={'formData.json'} schema={validSchema} hasSchemaError={hasSchemaError} source={formData} onChange={onChange('formData')} />
      </div>
    </div>
);

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
    };
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { data: { schema, uiSchema, formData, uiData, schemaErrors, validSchema } } = nextProps;
    this.setState({
      schema, 
      uiSchema, 
      formData,
      uiData,
      validSchema,
      schemaErrors,
    });
  }

  onChange = (type) => (value) => {
    this.setState({ [type]: value });
  }

  onFormChanged = ({ formData, uiSchema, uiData, schemaErrors, validSchema }) => {
    this.setState({ formData, uiSchema, uiData, schemaErrors, validSchema });
  }

  onSubmit = (value, callback) => {
    console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
    setTimeout(() => callback && callback(), 2000);
  }

  onUpload = (value) => {
    console.log('onUpload:', value); // eslint-disable-line no-console
  }

  onFormError = (error = {}) => {
    console.log('error is', error);
  }

  onCancel = () => {
    const { data } = this.props;
    this.setState({
      ...data,
    });
  }

  render() {
    const { data: { title }, classes } = this.props;
    const { schema, uiSchema, formData, uiData, schemaErrors, validSchema } = this.state;
    const editorSchema = [{
      uri: 'http://json-schema.org/draft-07/schema',
      fileMatch: ['JSONSchema.json'],
      schema: undefined,
    },
    {
      uri: 'http://json-schema.org/draft-07/schema',
      fileMatch: ['uiSchema.json'],
      schema: undefined,
    },{
      uri: `${window.location.origin}/schema/simple/schema.json`,
      fileMatch: ['formData.json'],
      schema: validSchema,
    }]
    return (
      <Paper className={classes.root}>
        <h3>{title}</h3>
        <div className={classes.ctr}>
          <SourceSchema 
            classes={classes}
            schema={schema}
            validSchema={editorSchema}
            uiSchema={uiSchema}
            formData={formData}
            hasSchemaError={schemaErrors}
            onChange={this.onChange}
          />
          <div className={classes.display}>
            <FormComponent
              givenSchema={schema}
              givenUISchema={uiSchema}
              givenFormData={formData}
              givenUIData={uiData}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              onUpload={this.onUpload}
              onFormChanged={this.onFormChanged}
              onError={this.onFormError}
            />
          </div>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(Example);
