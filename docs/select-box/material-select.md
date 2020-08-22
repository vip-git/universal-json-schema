# Material Select

{% hint style="success" %}
**Material Select Component integration**
{% endhint %}

![Material Select](../../.gitbook/assets/image%20%2814%29.png)

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

{% code title="uiSchema.json" %}
```bash
{
  "selectTest": {
    "ui:widget": "material-multiselect",
    "mui:inputProps": {
      "className": "money"
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

