# Nested

{% hint style="success" %}
**Nested Array Component Integration**
{% endhint %}

![Nested Array Component](../.gitbook/assets/image%20%287%29.png)

{% code title="schema.json" %}
```bash
{
  "title": "A list of tasks",
  "type": "object",
  "required": [
    "title"
  ],
  "properties": {
    "title": {
      "type": "string",
      "title": "Task list title"
    },
    "tasks": {
      "type": "array",
      "title": "Tasks",
      "items": {
        "title": "Media (NL)",
        "type": "object",
        "required": [
          "title"
        ],
        "properties": {
          "title": {
            "type": "string",
            "title": "Title",
            "description": "A sample title"
          },
          "details": {
            "type": "string",
            "title": "Task details",
            "description": "Enter the task details"
          },
          "done": {
            "type": "boolean",
            "title": "Done?",
            "default": false
          }
        }
      }
    }
  }
}
```
{% endcode %}

{% code title="uiSchema.json" %}
```bash
{
  "tasks": {
    "items": {
      "details": {
        "ui:widget": "textarea"
      }
    }
  }
}
```
{% endcode %}

{% code title="formData.json" %}
```bash
{
  "title": "My current tasks",
  "tasks": [
    {
      "title": "My first task",
      "details": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "done": true
    }
  ]
}
```
{% endcode %}

