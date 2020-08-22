# Nested

{% hint style="success" %}
**Nested Component Integration**
{% endhint %}

![Currency Component](../.gitbook/assets/image%20%285%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering currency component",
  "description": "A simple form with currency component",
  "type": "object",
  "properties": {
    "bio": {
      "type": "number",
      "title": "Currency"
    },
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
 "currency": {
    "ui:options": {
      "useLocaleString": "nl"
    }
  },
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "currency": "123.123",
}
```
{% endcode %}

