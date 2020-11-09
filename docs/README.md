---
description: React jsonschema form comes with inbuilt and custom components
---

# Documentation

## Install instructions via npm

```text
npm install --save react-jsonschema-form-material-ui
```

| **Component Name** | Schema | UISchema | FormData | Type | **Status** |
| :--- | :--- | :--- | :--- | :--- | :--- |
| \*\*\*\*[**Material UI - Date / Time Picker**](material-ui-date-time-picker.md)\*\*\*\* |     **✅**  |     **✅**  |     **✅**   | Inbuilt |  ****[**Done**](material-ui-date-time-picker.md)\*\*\*\* |
| \*\*\*\*[**Material UI Selectbox**](select-box/material-select.md)\*\*\*\* |     **✅**   |   ****❌  |     **✅**   | Inbuilt |  [**Done**](select-box/react-select.md)\*\*\*\* |
| \*\*\*\*[**React Select and Multi Select**](select-box/react-select.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](select-box/react-select.md)\*\*\*\* |
| \*\*\*\*[**React Creatable Select**](select-box/creatable-select.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](select-box/creatable-select.md)\*\*\*\* |
| \*\*\*\*[**Component active / inactive**](component-active-inactive.md)\*\*\*\* |   ****❌  **** |     **✅**   |   ****❌  | Inbuilt |  [**Done**](component-active-inactive.md)\*\*\*\* |
| \*\*\*\*[**Rich Text Editor**](rich-text-editor.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](rich-text-editor.md)\*\*\*\* |
| \*\*\*\*[**Upload File**](upload-file.md)\*\*\*\* |     **✅**   |     **✅**   |     **✅**   | Inbuilt |  [**Done**](upload-file.md)\*\*\*\* |
| \*\*\*\*[**Number / Up down widget**](number-up-down-widget.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](number-up-down-widget.md)\*\*\*\* |
| \*\*\*\*[**Telephone**](telephone.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](currency.md)\*\*\*\* |
| \*\*\*\*[**Currency**](currency.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](currency.md)\*\*\*\* |
| \*\*\*\*[**Nested**](nested.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](nested.md)\*\*\*\* |
| \*\*\*\*[**Password**](password.md)\*\*\*\* |     **✅**   |     **✅**   |     **✅**   | Inbuilt |  [**Done**](password.md)\*\*\*\* |
| \*\*\*\*[**Checkbox**](checkbox.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](checkbox.md)\*\*\*\* |
| \*\*\*\*[**Radio Button**](radio-button.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Inbuilt |  [**Done**](radio-button.md)\*\*\*\* |
| \*\*\*\*[**Rating Component**](custom-components/rating-component-example.md)\*\*\*\* |     **✅**  |     **✅**   |     **✅**   | Custom |  [**Done**](custom-components/rating-component-example.md)\*\*\*\* |

### **Example Usage**

> More detailed example can be seen [here](https://github.com/vip-git/react-jsonschema-form-material-ui/blob/master/src/demo/body/Example.jsx) and for usage on validations please [**see here**](validations/)\*\*\*\*

```jsx
// Library
import React from 'react';
import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';

// Internals
const schema = require('./path-to your-schema.json');
const uiSchema = require('./path-to your-ui-schema.json');
const formData = require('./path-to your-ui-formData.json');

class Example extends React.Component {
    onSubmit = (value, callback) => {
        console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
        setTimeout(() => callback && callback(), 2000); // just an example in real world can be your XHR call
    }
    onCancel = () => {
        console.log('on reset being called');
    }
    onFormChanged = ({ formData }) => {
        console.log('onFormChanged: ',formData); // eslint-disable-line no-console
    }
    onUpload = (value) => {
        console.log('onUpload: ', value); // eslint-disable-line no-console
    }
    render() {
        return (
             <MaterialJsonSchemaForm
                  schema={schema}
                  uiSchema={uiSchema}
                  formData={formData}
                  onCancel={this.onCancel}
                  onSubmit={this.onSubmit}
                  onUpload={this.onUpload}
                  onChange={this.onFormChanged}
                  submitOnEnter
                  activityIndicatorEnabled
            />
        );
    }
}
```



