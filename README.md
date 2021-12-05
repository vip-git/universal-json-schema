# React Json Schema Form \(Mui\)

[![codecov](https://codecov.io/gh/vip-git/react-jsonschema-form-material-ui/branch/main/graph/badge.svg?token=NAyWIbQN4g)](https://codecov.io/gh/vip-git/react-jsonschema-form-material-ui) [![Known Vulnerabilities](https://snyk.io/test/github/vip-git/react-jsonschema-form-material-ui/badge.svg?targetFile=package.json)](https://snyk.io/test/github/vip-git/react-jsonschema-form-material-ui?targetFile=package.json) [![GitHub package.json version](https://img.shields.io/github/package-json/v/vip-git/react-jsonschema-form-material-ui?style=plastic)](https://github.com/vip-git/react-jsonschema-form-material-ui) [![npm](https://img.shields.io/npm/dt/react-jsonschema-form-material-ui)](https://www.npmjs.com/package/react-jsonschema-form-material-ui) [![GitHub issues](https://img.shields.io/github/issues/vip-git/react-jsonschema-form-material-ui)](https://github.com/vip-git/react-jsonschema-form-material-ui/issues/) [![GitHub pull requests](https://img.shields.io/github/issues-pr/vip-git/react-jsonschema-form-material-ui)](https://github.com/vip-git/react-jsonschema-form-material-ui/pulls/)
 

[![Build and Test CI](https://github.com/vip-git/react-jsonschema-form-material-ui/actions/workflows/node.js.yml/badge.svg)](https://github.com/vip-git/react-jsonschema-form-material-ui/actions/workflows/node.js.yml) [![BrowserStack Status](https://automate.browserstack.com/badge.svg?badge_key=MzZ5RE5vdml6Yk5EM0JTZ3l5cGxJKzVLRWlqNVdHbDkzdkprejFkSWZtZz0tLTdxdGFIY3F5a2pXSmNMM2ZLaVMwQ3c9PQ==--74a6da6f146182f21dbe380708e81c257b1cefab%)](https://automate.browserstack.com/public-build/MzZ5RE5vdml6Yk5EM0JTZ3l5cGxJKzVLRWlqNVdHbDkzdkprejFkSWZtZz0tLTdxdGFIY3F5a2pXSmNMM2ZLaVMwQ3c9PQ==--74a6da6f146182f21dbe380708e81c257b1cefab%) [![Build Status](https://app.eu-central-1.saucelabs.com/buildstatus/vtsauce)](https://app.eu-central-1.saucelabs.com/builds/d31c750a8b0944d8ae40ac02038fb574)

A [**Material UI**](http://www.material-ui.com/) port of [**jsonschema-form.**](https://json-schema.org/)

A [**live playground**](https://react-jsonschema-form-material-ui.github56.now.sh/) and [**Detailed Docs**](https://react-json-schema.app/universal-json-schema/platform/web/react/material-ui)

## Install instructions via npm (MUI 5+)

```text
npm install --save react-jsonschema-form-material-ui
```
>Follow [Releases page](https://github.com/vip-git/react-jsonschema-form-material-ui/releases) to use latest or preleased tags.

#### For legacy version of < MUI 4 
```text
npm install --save react-jsonschema-form-material-ui@3.0.0-mui-4
```

## Basic Example Usage
```jsx
// Library
import React from 'react';
import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';

// Internals
import schema from '../simple/schema.json';
import uiSchema from '../simple/ui-schema.json';
const givenXhrSchema = require('./path-to your-xhr-schema.json'); // Optional
import givenFormData from '../simple/form-data.json';

export default () => {
  const [formData, setFormData] = React.useState(givenFormData);
  
  return <MaterialJsonSchemaForm 
            schema={schema} 
            uiSchema={uiSchema} 
	    xhrSchema={givenXhrSchema || {}} // Optional
	    theme={} // Optional - You need to explicitly provide your custom theme from MUI5 onwards
            formData={formData} 
            onChange={({ formData }) => setFormData(formData)}
            onSubmit={(submittedData) => console.log('form submitted', submittedData)}
          />;
};
```

## Advanced Example Usage

> More detailed example can be seen [here](https://github.com/vip-git/react-jsonschema-form-material-ui/blob/main/demo/web/react/body/Example.jsx#L39)

```jsx
// Library
import React from 'react';
import MaterialJsonSchemaForm from 'react-jsonschema-form-material-ui';

// Internals
const givenSchema = require('./path-to your-schema.json');
const givenUISchema = require('./path-to your-ui-schema.json');
const givenXhrSchema = require('./path-to your-xhr-schema.json');
const givenFormData = require('./path-to your-ui-formData.json');

const Example () => {
    
    const [formData, setFormData] = React.useState(givenFormData);
    
    const onSubmit = (value, callback) => {
        console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
        setTimeout(() => callback && callback(), 2000); // just an example in real world can be your XHR call
    }
    
    const onCancel = () => {
        console.log('on reset being called');
    }
    
    const onFormChanged = ({ formData }) => setFormData(formData);
    
    const onUpload = (value) => {
        console.log('onUpload: ', value); // eslint-disable-line no-console
    }
    
    return (
         <MaterialJsonSchemaForm
	    // Define Schema
	    schema={givenSchema}
	    uiSchema={givenUISchema}
	    xhrSchema={givenXhrSchema || {}}
            formData={formData}
	    theme={} // Optional - You need to explicitly provide your custom theme from MUI5 onwards
	    
	    // Define Event handlers
            onChange={onFormChanged} 
	    onSubmit={onSubmit}
	    
	    // Every Prop below is optional - every prop above this line is required
            onCancel={onCancel} /* optional */
	    onUpload={onUpload} /* optional */
            onError={onError} /* optional */
	    
            /* Optional Prop for custom functions to be executed for transforming data */
            interceptors={{
                translateRatings: (givenData, uiData) => ({ givenData, uiData }),
            }}
	    
            /* Optional Prop for custom components */
	    components={{
		  customComponent: ({ onChange, ...rest }) => (
			<CustomComponent onChange={onChange} formData={givenFormData} uiData={givenUIData} {...rest} />
		  ),
		  customRating: ({ onChange, ...rest }) => (
			<CustomRating onChange={onChange} formData={givenFormData} uiData={givenUIData} {...rest} />
		  ),
	    }}
	    
            /* Optional Prop for custom validation */
            validations={{
                confirmPassword: ({ schema, validations, formData, value }) => value !== formData.pass1 && ({
		      message: validations.confirmPassword.message,
		      inline: true,
                }),
            }}
	    
            /* Optional Prop to auto submit form on press of enter */
	    submitOnEnter
	/>
    );
}

export default Example;
```

## Latest Version [![npm version](https://badge.fury.io/js/react-jsonschema-form-material-ui.svg)](https://react-jsonschema-form-material-ui.github56.now.sh) \[JSONSchema-Draft-7 Support]

- Build system now upgraded to webpack 5
- React select values are no longer stringify results but array values.
- New Tabs UI to divide sub sections to tabs
- Additional Properties and Additional Items feature enabled
- `"ui:options"` and `"ui:style"` enabled for prop passing and styling every field
- On the fly module creation
- Reference Schema's via http and inline references
- Support alternatives - `oneOf`, `anyOf`, `allOf`
- Support for dependencies - array of conditionals
- new Prop `onError` to get errors available in form on every change
- new Prop `uiData` to control ui only data to add separation of concern with form data
- Demo updated with monaco editor and live validation changes
- New interceptors to transform form and uiData using uiSchema - `ui:interceptor`

> For more info you can follow our [changelog](https://github.com/vip-git/react-jsonschema-form-material-ui/blob/master/changelog.md)

## Contributing 
> We welcome [all contributions](/contributing.md), enhancements, and bug-fixes. 
> Open an [issue on GitHub](https://github.com/vip-git/react-jsonschema-form-material-ui/issues) and submit a [pull request](https://github.com/vip-git/react-jsonschema-form-material-ui/pulls).

#### Building/Testing
To build/test the project locally on your computer:

> Fork this repo and then clone
```
git clone https://github.com/vip-git/react-jsonschema-form-material-ui.git
```

> Install dependencies and module generator
```
npm install
```

> Run the demo to test your changes
```
npm start (open http://localhost:3005 once build is successful)
```

> Run the tests once you are done with your changes
```
npm test
```

You can send a PR through and a release will be made following [Semantic Versioning](https://semver.org/) once your PR gets merged.
