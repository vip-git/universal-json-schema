---
description: Material UI Date / Time picker component integration
---

# Material UI Date / Time picker

{% hint style="success" %}
## Material UI Date / Time picker
{% endhint %}

![Material UI Date / time picker](../.gitbook/assets/image%20%282%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering date component",
  "description": "A simple form with date component",
  "type": "object",
  "properties": {
    "date": {
      "type": "material-date",
      "title": "Date"
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
    "date": {
      "type": "material-date",
      "title": "Date"
    },
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "date": "2020-08-22T08:07:33+02:00"
}
```
{% endcode %}

