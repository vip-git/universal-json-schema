# Telephone

{% hint style="success" %}
**Input Telephone Integration**
{% endhint %}

![Telephone input type](../.gitbook/assets/image%20%289%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering currency component",
  "description": "A simple form with currency component",
  "type": "object",
  "properties": {
    "telephone": {
      "type": "string",
      "title": "Telephone",
      "minLength": 10
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
 "telephone": {
    "ui:options": {
      "inputType": "tel"
    }
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "telephone": ""
}
```
{% endcode %}

