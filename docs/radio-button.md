# Radio Button

{% hint style="success" %}
**Radio Button Component Integration**
{% endhint %}

![Radio Button component](../.gitbook/assets/image%20%289%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering currency component",
  "description": "A simple form with currency component",
  "type": "object",
  "properties": {
    "numberEnumRadio": {
      "type": "number",
      "title": "Number enum",
      "enum": [
        1,
        2,
        3
      ]
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
 "numberEnumRadio": {
    "ui:widget": "radio",
    "ui:options": {
      "inline": true
    }
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "numberEnumRadio": 3
}
```
{% endcode %}

