# Maximum \(Validation\)

### **Example \(Using Inbuilt rule\)**

**Playground Link:** [**https://react-jsonschema-form-material-ui.github56.now.sh/\#numbers**](https://react-jsonschema-form-material-ui.github56.now.sh/#numbers)\*\*\*\*

{% code title="FormSchema.json" %}
```javascript
{
  "title": "A registration form",
  "description": "A simple form example.",
  "type": "object",
  "properties": {
    "integerRange": {
      "title": "Integer range",
      "type": "integer"
    }
  }
}

```
{% endcode %}

{% code title="UISchema.json" %}
```javascript
{
	"integerRange": {
		"ui:validations": {
      "minimum": {
				"value": 42,
				"message": "Integer should be in range between 42 and 100",
				"inline": true
			}
			"maximum": {
				"value": 100,
				"message": "Integer should be in range between 42 and 100",
				"inline": true
			}
		}
	}
}
```
{% endcode %}

