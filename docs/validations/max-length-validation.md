# Max Length \(Validation\)

## **Example \(Using Inbuilt rule\)**

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
      "maxLength": {
				"value": 10,
				"message": "'Telephone' should not exceed 10 digits",
				"inline": true
			}
		}
	}
}
```
{% endcode %}

