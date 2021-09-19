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

// Config
const { CONFIG, folderHashMapping } = require('./config');

// Utils
const moduleGenerator = require('./modules-generator');
const e2eTestsGenerator = require('./e2e-tests-generator');

// Templates
const templateFile = require('./templates/app-config.template.js');

const template = ejs.compile(templateFile, {});
const finalString = template({ ...CONFIG });
const shellFileString = new shelljs.ShellString(finalString);

// Folder Variables
const generatedLocation = `${shelljs.pwd()}/src/generated`;
const generatorLocation = `${shelljs.pwd()}/scripts/generator`;
const demoFolder = `${shelljs.pwd()}/demo/web/react/examples`;
const testsGeneratedFolder = `${shelljs.pwd()}/src/__e2e__/page-objects/generated`;

const myArgs = process.argv.slice(2);

const generateE2ETests = () => {
  shelljs.rm('-rf', testsGeneratedFolder);
  shelljs.mkdir(testsGeneratedFolder);
  Object.keys(folderHashMapping).forEach(function (file) {
    if (!file.includes('.js')) {
      const generatedE2ELocation = `${demoFolder}/${file}/__e2e__`;
      shelljs.rm('-rf', generatedE2ELocation);
      shelljs.mkdir(generatedE2ELocation);
      e2eTestsGenerator(
        file,
        folderHashMapping[file],
        shelljs,
        ejs,
        generatedE2ELocation,
        testsGeneratedFolder
      );
    }
  });
};

if (myArgs[0] && myArgs[0] === '--testsOnly') {
  generateE2ETests();
} else {
  CONFIG.modules.forEach((md) => {
    shelljs.rm('-rf', `${generatedLocation}/${md}`);
  });
  shelljs.rm('-rf', `${generatorLocation}/node_modules`);
  shelljs.rm('-rf', `${generatorLocation}/package-lock.json`);
  shelljs.rm('-rf', `${generatorLocation}/package.json`);

  shelljs.mkdir(generatedLocation);

  console.log('generating app config file');

  shellFileString.to(`${generatedLocation}/app.config.js`);

  console.log('app config file generated');

  shelljs.cd(generatorLocation);
  shelljs.exec('npm init --yes');

  CONFIG.modules.forEach((md) => {
    // Generate Module
    moduleGenerator(md, componentSettings, generatedLocation, shelljs, ejs);
  });

  generateE2ETests();
}


