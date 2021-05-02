/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const moduleGenerator = (
  moduleName,
  componentSettings,
  generatedLocation,
  shelljs,
  ejs,
) => {
  const templateFile = require(`./templates/${moduleName}-config.template.js`);
  const template = ejs.compile(templateFile, {});
  const finalString = template({ ...componentSettings });
  const shellFileString = new shelljs.ShellString(finalString);

  console.log(`Downloading ${moduleName} dependencies`);

  Object.keys(componentSettings[moduleName])
    .filter((c) => !componentSettings[moduleName][c].notAvailable)
    .forEach((modName) => {
      shelljs.exec(
        `npm install ${modName}@${componentSettings[moduleName][modName].version} --save-exact`,
      );
    });
  shelljs.cp(
    '-R',
    `node_modules/@react-jsonschema-form-${moduleName}/`,
    `${generatedLocation}/${moduleName}`,
  );

  Object.keys(componentSettings[moduleName])
    .filter((c) => !componentSettings[moduleName][c].notAvailable)
    .forEach((modName) => {
      shelljs.rm('-rf', `${generatedLocation}/${moduleName}/${componentSettings[moduleName][modName].name}/package.json`);
    });

  shellFileString.to(`${generatedLocation}/${moduleName}/index.js`);

  console.log(`${moduleName} downloaded successfully`);
};

module.exports = moduleGenerator;
