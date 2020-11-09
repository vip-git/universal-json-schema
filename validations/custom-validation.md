# Custom Validation

## What are custom validations ?

> Custom Validations are a way to provide validations using **custom functions** for your JSON Schema Form. You can provide either a **inline** error or **Global** Error Message**.**

## **Example \(Using Custom rule\)**

**Playground Link:** [**https://react-jsonschema-form-material-ui.github56.now.sh/\#validation**](https://react-jsonschema-form-material-ui.github56.now.sh/#validation)\*\*\*\*

```jsx
<Form
	schema={schema}
	uiSchema={uiSchema}
	formData={formData}
	onCancel={onCancel}
	onSubmit={onSubmit}
	onUpload={onUpload}
	onChange={onFormChanged}
	validations={{
     confirmPassword: (givenSchema, givenUISchema, value) => value !== formData.pass1 && ({
          message: givenUISchema['ui:validations'].confirmPassword.message,
          inline: true,
     }),
  }}
/>
```

{% code title="FormSchema.json" %}
```javascript
{
  "title": "Custom validation",
  "description": "This form defines custom validation rules checking that the two passwords match.",
  "type": "object",
  "properties": {
    "pass1": {
      "title": "Password",
      "type": "string",
      "minLength": 3
    },
    "pass2": {
      "title": "Repeat password",
      "type": "string",
      "minLength": 3
    }
  }
}

```
{% endcode %}

{% code title="UISchema.json" %}
```javascript
{
  "pass1": {
    "ui:widget": "password"
  },
  "pass2": {
    "ui:widget": "password",
    "ui:validations": {
      "confirmPassword": {
				"message": "Both passwords should be the same (2)",
				"inline": true
      }
    }
  }
}

```
{% endcode %}

