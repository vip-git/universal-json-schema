### 3.0.0 [Breaking Changes]
- Build system now upgraded to webpack 5
- React select values are no stringify results but real values.
- New Tabs UI
- Additional Properties and Additional Items feature enabled
- "ui:options" and "ui:style" enabled for prop passing and styling every field
- On the fly module creation
- Refrence Schema's via http and inline refrences
- Support alternatives - oneOf, anyOf
- Support for dependencies - array of conditionals
- new Prop onError to get errors available in form on every change
- new Prop uiData to control ui only data to add seperation of concern with form data
- Demo updated with vscode editor and live validation changes
- New interceptors to transform form and uiData using uiSchema - `ui:interceptor`
- New `xhrSchema` feature enabled to make xhr calls onload, onsubmit and onclick to consume or post data


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
