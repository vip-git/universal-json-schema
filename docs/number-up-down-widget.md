# Number / Up down widget

{% hint style="success" %}
**Number / Up Down Integration**
{% endhint %}

![](../.gitbook/assets/image%20%288%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering currency component",
  "description": "A simple form with currency component",
  "type": "object",
  "properties": {
    "age": {
      "type": "integer",
      "title": "Age"
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
 "age": {
    "ui:widget": "updown",
    "ui:title": "Age of person",
    "ui:description": "(earthian year)",
    "mui:className": "money"
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "age": 75
}
```
{% endcode %}

