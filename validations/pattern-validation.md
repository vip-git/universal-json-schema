# Pattern \(Validation\)

### **Example \(Using Inbuilt rule\)**

{% code title="FormSchema.json" %}
```javascript
{
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "title": "Email"
    }
  }
}

```
{% endcode %}

{% code title="UISchema.json" %}
```javascript
{
	"email": {
		"ui:validations": {
      "pattern": {
				"value": "[a-zA-Z]{1}[a-zA-Z\\-\\+_]@[a-zA-Z\\-_]+\\.com",
				"message": "Please enter valid email",
				"inline": true
			}
		}
	}
}
```
{% endcode %}

