---
description: This page describes how you can add custom components to jsonschema
---

# Custom components

## What are custom components ?

By default [react-jsonschema-form-material-ui](https://github.com/vip-git/react-jsonschema-form-material-ui) has support for [**following inbuilt components**](../)\*\*\*\*

Custom components give you the possibility to enable any component inside react-jsonformschema with the ability to extend to any standalone component.

To enable your standalone component - Define your component to prop `components` as shown below

{% code title="Example.jsx" %}
```jsx
<Form
  schema={schema}
  uiSchema={uiSchema}
  formData={formData}
  onCancel={onCancel}
  onSubmit={onSubmit}
  onUpload={onUpload}
  onChange={onFormChanged}
  components={{
    customRating: ({ onChange }) => (
  		<CustomRating onChange={onChange} formData={formData} />
    ),
  }}
  submitOnEnter
  activityIndicatorEnabled
/>
```
{% endcode %}

In the above example - important bit is initialise a function with takes in parameter `onChange` and returns your custom component to forward that prop. This `onChange` can then be invoked whenever data needs to be persisted to formData as seen below.

{% code title="CustomRating.jsx" %}
```jsx
// Library
import React from 'react';
import Rating from '@material-ui/lab/Rating';

const CustomRating = ({ onChange, formData }) => (
	<Rating
		name='simple-controlled'
		value={formData.customRating}
		onChange={(event, newValue) => {
		  setValue(newValue);
		  onChange(newValue); // This onChange persists data to formData.json
		}}
	/>
);
```
{% endcode %}

**Schema.json** and **FormData.json** then will have the following value

{% code title="Schema.json" %}
```bash
{
  "title": "Example for rendering custom rating example",
  "description": "A simple form for rendering custom rating example",
  "type": "object",
  "properties": {
    "customRating": {
      "type": "integer",
      "title": "Custom Rating Component",
      "component": "customRating"
    },
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "customRating": 3
}
```
{% endcode %}

