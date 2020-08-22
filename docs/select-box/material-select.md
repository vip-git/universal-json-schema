---
description: >-
  When you add enum values without any uiSchema.json it will fallback to default
  material select
---

# Material Select

{% hint style="success" %}
**Material Select Component integration**
{% endhint %}

![Material Select](../../.gitbook/assets/image%20%2816%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering react-select component",
  "description": "A simple form with react-select component",
  "type": "object",
  "properties": {
    "select": {
      "type": "string",
      "title": "Example select",
      "enum": [
        "Yes",
        "No"
      ]
    }
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "selectTest": "[{\"value\":\"Yes\",\"label\":\"Yes\"},{\"value\":\"No\",\"label\":\"No\"}]"
}
```
{% endcode %}

