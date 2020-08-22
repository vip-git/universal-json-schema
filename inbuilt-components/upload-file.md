---
description: This page describes how you can integrated file upload widget
---

# Upload File

{% hint style="success" %}
**File Upload component**
{% endhint %}

![File upload widget](../.gitbook/assets/image%20%284%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering date component",
  "description": "A simple form with date component",
  "type": "object",
  "properties": {
    "bio": {
      "type": "string",
      "title": "Bio"
    },
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
  "title": "Example for rendering date component",
  "description": "A simple form with date component",
  "type": "object",
  "properties": {
    "bio": {
      "ui:widget": "textarea",
      "ui:options": "rich-text-editor"
    },
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "bio": "<p><u>ads</u></p><p><strong>Something nice</strong></p><p><em>Nice italic</em></p><ul><li>Some normal text</li></ul>",
}
```
{% endcode %}

