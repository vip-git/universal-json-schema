---
description: This page describes how you can integrated file upload widget
---

# Upload File

{% hint style="success" %}
**File Upload component**
{% endhint %}

![File upload widget](../.gitbook/assets/image%20%284%29.png)



{% code title="Example.jsx" %}
```jsx
<MaterialJsonSchemaForm
  schema={schema}
  uiSchema={uiSchema}
  formData={formData}
  onUpload={(file) => console.log("get uploaded file object")} // New addition
/>
```
{% endcode %}

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering upload component",
  "description": "A simple form with upload component",
  "type": "object",
  "properties": {
    "upload": {
      "type": "upload",
      "title": "Please upload your file"
    },
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
  "upload": {
    "ui:widget": "outlined",
    "ui:accept": "image/*",
    "ui:isMulti": true,
    "ui:buttonTitle": "Upload",
    "ui:icon": "add_circle"
  },
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "upload": "",
}
```
{% endcode %}

