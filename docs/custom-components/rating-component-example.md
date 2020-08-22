# Rating Component Example

Detailed Example can be seen here :  
- [https://github.com/vip-git/react-jsonschema-form-material-ui/blob/6b9956479fe5a57ea3f98919fbac25a1e4bc10d9/src/demo/body/Example.jsx\#L27](https://github.com/vip-git/react-jsonschema-form-material-ui/blob/6b9956479fe5a57ea3f98919fbac25a1e4bc10d9/src/demo/body/Example.jsx#L27)

{% hint style="success" %}
**Rating Component Example**
{% endhint %}

![Custom Rating Component](../../.gitbook/assets/image%20%2818%29.png)

{% code title="schema.json" %}
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

{% code title="Example.jsx" %}
```bash
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

{% code title="formData.json" %}
```bash
{
  "customRating": 5,
}
```
{% endcode %}

