# Pattern \(Validation\)

### **Example \(Using Inbuilt rule\)**

{% code title="FormSchema.json" %}
```javascript
{
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "properties": {
    "telephone": {
      "type": "string",
      "title": "Telephone"
    }
  }
}

```
{% endcode %}

{% code title="UISchema.json" %}
```javascript
{
	"telephone": {
		"ui:validations": {
      "minLength": {
				"value": 10,
				"message": "'Telephone' must be at least 10 digits",
				"inline": true
			}
		}
	}
}
```
{% endcode %}

