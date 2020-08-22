---
description: This component pre fixes against a dot with color as defined in uiSchema.json
---

# Component active / inactive

{% hint style="success" %}
**Component Active integration**
{% endhint %}

![Component Active / Inactive](../.gitbook/assets/image%20%289%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering rich text editor component",
  "description": "A simple form with rich text editor component",
  "type": "object",
  "properties": {
    "date": {
      "type": "material-date",
      "title": "Date"
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json // ui:activeCompColor" %}
```bash
{
"date": {
    "ui:activeCompColor": "red",
    "ui:widget": "alt-datetime"
 },
}
```
{% endcode %}

