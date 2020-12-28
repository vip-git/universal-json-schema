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

const FormComponent = React.memo(
  ({
    givenSchema,
    givenUISchema,
    givenFormData,
    onCancel,
    onSubmit,
    onUpload,
    onFormChanged,
  }) => (
		<Form
			schema={givenSchema}
			uiSchema={givenUISchema}
			formData={givenFormData}
			onCancel={onCancel}
			onSubmit={onSubmit}
			onUpload={onUpload}
			onChange={onFormChanged}
			components={{
			  customComponent: ({ onChange, ...rest }) => (
					<CustomComponent onChange={onChange} formData={givenFormData} {...rest} />
			  ),
			  customRating: ({ onChange, ...rest }) => (
					<CustomRating onChange={onChange} formData={givenFormData} {...rest} />
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
  ),
);

const SourceSchema = ({
  classes,
  schema,
  uiSchema,
  formData,
  onChange,
}) => (
    <div className={classes.sourceCtr}>
      <div>
        <Source title={'JSONSchema'} source={schema} onChange={onChange('schema')} />
      </div>
      <div>
        <Source title={'uiSchema'} source={uiSchema} onChange={onChange('uiSchema')} />
      </div>
      <div>
        <Source title={'formData'} source={formData} onChange={onChange('formData')} />
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
    const { data: { schema, uiSchema, formData } } = nextProps;
    this.setState({
      schema, 
      uiSchema, 
      formData,
    });
  }

  onChange = (type) => (value) => {
    this.setState({ [type]: value });
  }

  onFormChanged = ({ formData }) => {
    this.setState({ formData });
  }

  onSubmit = (value, callback) => {
    console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
    setTimeout(() => callback && callback(), 2000);
  }

  onUpload = (value) => {
    console.log('onUpload:', value); // eslint-disable-line no-console
  }

  onCancel = () => {
    const { data } = this.props;
    this.setState({
      ...data,
    });
  }

  render() {
    const { data: { title }, classes } = this.props;
    const { schema, uiSchema, formData } = this.state;
    return (
      <Paper className={classes.root}>
        <h3>{title}</h3>
        <div className={classes.ctr}>
          <SourceSchema 
            classes={classes}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={this.onChange}
          />
          <div className={classes.display}>
            <FormComponent
              givenSchema={schema}
              givenUISchema={uiSchema}
              givenFormData={formData}
              onCancel={this.onCancel}
              onSubmit={this.onSubmit}
              onUpload={this.onUpload}
              onFormChanged={this.onFormChanged}
            />
          </div>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(Example);
