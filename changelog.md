### [WIP] 3.0.0 
##### Follow [Releases](https://github.com/vip-git/react-jsonschema-form-material-ui/releases) to get detailed overview
- Strict support for JSONSchema-Draft-7 including validations using [Ajv](https://github.com/ajv-validator/ajv#ajv-json-schema-validator)
- Complete rewrite of v2 using `Typescript`
- Build system now upgraded to `Webpack 5`
- Support for `Material UI 5`
- Support for `React 17` and `NextJS 10`
- React select values are no stringify results but real values.
- New Tabs and Stepper UI using `ui:page` -> `"ui:layout": "tabs"`
- Additional Properties and Additional Items feature enabled
- "ui:options" and "ui:style" enabled for prop passing and styling every field
- On the fly module creation
- Reference Schema's via http and inline references
- Support alternatives - oneOf, anyOf
- Support for dependencies - array of conditionals
- new Prop [onError](./src/demo/body/Example.jsx#L48) to get errors available in form on every change
- New [interceptors](./src/demo/body/Example.jsx#L49-L71) prop to transform form and uiData using uiSchema - [ui:interceptor]./src/demo/examples/simple/ui-schema.json#L84)
- new concept called [uiData](./src/demo/body/Example.jsx#L68) to control ui only data to add seperation of concern with form data needs use of [interceptors](./src/demo/body/Example.jsx#L49-L71)
- Demo updated with vscode editor and live validation changes
- New `xhrSchema` feature enabled to make xhr calls [onload](./src/demo/examples/simple/xhr-schema.json#L3), [onsubmit](./src/demo/examples/simple/xhr-schema.json#L12) and [onclick](./src/demo/examples/simple/xhr-schema.json#L59) to consume or post data
- `type: null` support included for custom div support
- Integration with xstate for logic refactors
- XHR Schema now supports `ui:errors` which includes errors by `statusCodes` and a special case for `offline`
  Example :
    ```
    "ui:errors": {
        "offline": {
        "title": "You are Offline !",
        "message": "Please try again once you are online."
        }
    }
    ```


#### Previously version 2.x.x
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
