---
description: >-
  This page describes how you can use inbuilt and custom validations using json
  form schema.
---

# Validations

Below table provides information on available validation rules

| Rule Name | Schema | UISchema | FormData | Type | **Status** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Max Length** |     **✅**  |     **✅**  |     **✅**   | Inbuilt |  ****[**Done**](max-length-validation.md)\*\*\*\* |
| **Min Length** |     **✅**   |     **✅**  |     **✅**   | Inbuilt |  [**Done**](min-length-validation.md)\*\*\*\* |
| **Maximum** |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](maximum-validation.md)\*\*\*\* |
| **Minimum** |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](minimum-validation.md)\*\*\*\* |
| **Pattern** |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](pattern-validation.md)\*\*\*\* |
| **Custom Rule** |     **✅**  |     **✅**   |     **✅**   | Custom |  [**Done**](custom-validation.md)\*\*\*\* |

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

\*\*\*\*

