# Creatable select

{% hint style="success" %}
**Creatable Select Component integration**
{% endhint %}

![](../../.gitbook/assets/image%20%288%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering react-select component",
  "description": "A simple form with react-select component",
  "type": "object",
  "properties": {
    "creatableSelectTest": {
      "type": "string",
      "title": "Example creatable select",
      "enum": [
        "test",
        "teete",
        "etetet"
      ]
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
  "creatableSelectTest": {
    "ui:widget": "creatable-select"
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "creatableSelectTest": "[{\"label\":\"hello\",\"value\":\"hello\"},{\"label\":\"yes\",\"value\":\"yes\"}]"
}
```
{% endcode %}

