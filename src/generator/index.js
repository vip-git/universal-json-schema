/* eslint-disable import/no-extraneous-dependencies */
/**
 * Todo: 
 * This file will generate all custom components and integrate within react-json-schema project
 * - It should pick up the component name and versions
 * - It should add the component to the current react-json-schema library
 * - It should be able to generate and push this to a npm package manager (This part can be used for unimod as well)
 * */

/**
  * Things to complete
  * Step 1: Download the dependency by doing npm install for the package
  * Step 2: Copy the dependancy in generator folder
  * Step 3: Generate code in following files 
  *         - app-config          [Should generate the component name 'slug' and the location to the library]
  *         - component.config    [Should generate the actual logic of rendering the component]
  *         - package.json        [Should be able to generate package.json with giving name and version]
  *         - ** Tests ***        [Should eventually generate tests as well]
  * Step 4: Should be able to run the tests and compile the project 
  * Step 5: Should be able to publish the newly defined name to npm.
  */

const ejs = require('ejs');
const shelljs = require('shelljs');

const componentSettings = require('./components.json');

const templateFile = require('./templates/app-config.template.js');

const template = ejs.compile(templateFile, {});
const finalString = template({ components: componentSettings.components });
const shellFileString = new shelljs.ShellString(finalString);

shelljs.rm('-rf', 'src/fields/generated/components');
shelljs.rm('-rf', 'src/generator/node_modules');
shelljs.rm('-rf', 'src/generator/package-lock.json');
shelljs.rm('-rf', 'src/generator/package.json');

console.log('generating app config file');

shellFileString.to('src/fields/generated/app.config.js');

console.log('app config file generated');

console.log('Downloading component dependencies');

shelljs.cd('src/generator');
shelljs.exec('npm init --yes');
Object.keys(componentSettings.components)
  .filter((c) => !componentSettings.components[c].notAvailable)
  .forEach((compName) => {
    shelljs.exec(
      `npm install ${compName}@${componentSettings.components[compName].version} --save-exact`,
    );
  });
shelljs.cp(
  '-R',
  'node_modules/@react-jsonschema-form-components/',
  '../fields/generated/components',
);

console.log('Components downloaded successfully');
