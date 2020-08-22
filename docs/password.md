# Password

{% hint style="success" %}
**Password Component Integration**
{% endhint %}

![Password Component Integration](../.gitbook/assets/image%20%2811%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "Example for rendering currency component",
  "description": "A simple form with currency component",
  "type": "object",
  "properties": {
    "password": {
      "type": "string",
      "title": "Password",
      "minLength": 3
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
 "password": {
    "ui:widget": "password",
    "ui:help": "Hint: Make it strong!"
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "password": "noneed"
}
```
{% endcode %}

