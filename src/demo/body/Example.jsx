/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './example-styles';
import Source from './Source';
import Form from '../../Form';
import SimpleRating from './custom-rating';

const CustomComponent = ({ onChange, formData }) => {
  const [data, setData] = useState(formData.customComponent || '');
  return (
      <TextField
        id='standard-basic'
        label='Custom Text'
        value={data}
        onChange={(e) => setData(e.target.value)}
        onBlur={(e) => onChange(e.target.value)}
      />
  );
};

const CustomRating = ({ onChange, formData, ...rest }) => (
	<SimpleRating
		id='standard-basic'
		label='Standard'
		value={formData.customRating}
    persistData={onChange}
    {...rest}
	/>
);

const FormComponent = React.memo(
  ({
    schema,
    uiSchema,
    formData,
    onCancel,
    onSubmit,
    onUpload,
    onFormChanged,
  }) => (
		<Form
			schema={schema}
			uiSchema={uiSchema}
			formData={formData}
			onCancel={onCancel}
			onSubmit={onSubmit}
			onUpload={onUpload}
			onChange={onFormChanged}
			components={{
			  customComponent: ({ onChange, ...rest }) => (
					<CustomComponent onChange={onChange} formData={formData} {...rest} />
			  ),
			  customRating: ({ onChange, ...rest }) => (
					<CustomRating onChange={onChange} formData={formData} {...rest} />
			  ),
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
              schema={schema}
              uiSchema={uiSchema}
              formData={formData}
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
