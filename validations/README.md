---
description: >-
  This page describes how you can use inbuilt and custom validations using json
  form schema.
---

# Validations

Below table provides information on available validation rules

| Rule Name | Schema | UISchema | FormData | Type | **Status** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Max Length** |     **✅**  |     **✅**  |     **✅**   | Inbuilt |  ****[**Done**](../docs/material-ui-date-time-picker.md)\*\*\*\* |
| **Min Length** |     **✅**   |     **✅**  |     **✅**   | Inbuilt |  [**Done**](../docs/select-box/react-select.md)\*\*\*\* |
| **Maximum** |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](../docs/select-box/react-select.md)\*\*\*\* |
| **Minimum** |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](../docs/select-box/creatable-select.md)\*\*\*\* |
| **Pattern** |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](../docs/custom-components/rating-component-example.md)\*\*\*\* |
| **Custom Rule** |     **✅**  |     **✅**   |     **✅**   | Custom |  [**Done**](../docs/custom-components/rating-component-example.md)\*\*\*\* |

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

