# Checkbox

{% hint style="success" %}
**Checkbox Component Integration**
{% endhint %}

![Checkbox component integration](../.gitbook/assets/image%20%2813%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering currency component",
  "description": "A simple form with currency component",
  "type": "object",
  "properties": {
    "multipleChoicesList": {
      "type": "array",
      "title": "A multiple choices list",
      "items": {
        "type": "string",
        "enum": [
          "foo",
          "bar",
          "fuzz",
          "qux"
        ]
      },
      "uniqueItems": true
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
 "multipleChoicesList": {
    "ui:widget": "checkboxes"
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "multipleChoicesList": [
    "foo",
    "bar"
  ]
}
```
{% endcode %}

