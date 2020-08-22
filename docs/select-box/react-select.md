---
description: >-
  This page explains how you can integrate react select component using
  uiSchema.json
---

# React-select

{% hint style="success" %}
**React Select Component integration**
{% endhint %}

![React Select Component](../../.gitbook/assets/image%20%286%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering react-select component",
  "description": "A simple form with react-select component",
  "type": "object",
  "properties": {
    "react-select": {
      "type": "string",
      "title": "React select",
      "enum": [
        "Yes",
        "No"
      ]
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
  "react-select": {
    "ui:widget": "material-select",
    "ui:isClearable": true
  },
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "react-select": "{\"value\":\"Yes\",\"label\":\"Yes\"}"
}
```
{% endcode %}



