# Main

## React Material-ui-jsonschema-form

[![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=QStsZ21iSHErWEh6UGVaZCt5MHNYTEZvbTR2azR2TnM5SWJMcmFOWjNDOD0tLUJlblVZbEVxR0lkb3JTUkUrV3JCOHc9PQ==--f5d3b4d260853b52c498f676e78e8d695a140542%)](https://automate.browserstack.com/public-build/QStsZ21iSHErWEh6UGVaZCt5MHNYTEZvbTR2azR2TnM5SWJMcmFOWjNDOD0tLUJlblVZbEVxR0lkb3JTUkUrV3JCOHc9PQ==--f5d3b4d260853b52c498f676e78e8d695a140542%)

A [Material UI](http://www.material-ui.com/) port of [react-jsonschema-form](https://github.com/mozilla-services/react-jsonschema-form).

A [live playground](https://react-jsonschema-form-material-ui.github56.now.sh/)

## Install instructions via npm

```text
npm install --save react-jsonschema-form-material-ui
```

## Example Usage

> More detailed example can be seen [here](https://github.com/vip-git/react-jsonschema-form-material-ui/blob/master/src/demo/body/Example.jsx)

{% code title="Example.jsx" %}
```text
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
{% endcode %}

## Latest Version [![npm version](https://badge.fury.io/js/react-jsonschema-form-material-ui.svg)](https://react-jsonschema-form-material-ui.github56.now.sh) \(Material UI 4+\)

* New version 2.0 support for material ui 4
* Webpack 4 integration
* Material UI picker module updated
* Support for File Upload and many more components
* Performance efficient refactored library size \(233kb gzip and 914kb non-gzip\)

## Support for Material UI &lt; 3.9

* Please use [version 1.0.109](https://github.com/vip-git/react-jsonschema-form-material-ui/tree/v1.x) of React Material-ui-jsonschema-form.

### New components integrated / Updates

* Material UI Date / time picker    
* Material UI Multi-selecbox    
* Creatable multi selectbox    
* Component active / inactive    
* Rich Text Editor
* Upload File
* `submitOnEnter` prop - enables to submit form on key press 'Enter'
* `activityIndicatorEnabled` prop - enables nice activity indicator besides your submit button allowing you to control the timing via a callback.

