const _ = require('lodash');

const generateTestFile = ({
  schema,
  hashName,
  pageName,
  template,
  shelljs,
  generatedLocation,
}) => {
  const finalString = template({ schema, pageName: hashName });
  const shellFileString = new shelljs.ShellString(finalString);

  console.log(`Generating Integration Tests for ${pageName}`);

  shellFileString.to(`${generatedLocation}/${pageName}.feature`);

  console.log(`${pageName} tests generated successfully`);
};

const e2eTestsGenerator = (pageName, hashName, shelljs, ejs, generatedLocation) => {
  const templateFile = require('./templates/example-form-e2e.template.js');
  const template = ejs.compile(templateFile, {});
  const getDefinitionSchemaFromRef = require('../src/helpers/get-definition-schema');
  const schema = require(`../src/demo/examples/${pageName}/schema.json`);
  const uiSchema = require(`../src/demo/examples/${pageName}/ui-schema.json`);
  const formData = require(`../src/demo/examples/${pageName}/form-data.json`);
  const kebabize = (str) => {
    return str
      .split('')
      .map((letter, idx) => {
        return letter.toUpperCase() === letter
          ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
          : letter;
      })
      .join('');
  };
  if (!schema.properties) {
    schema.properties = schema;
  }
  if (_.has(uiSchema, 'ui:page.ui:layout')) {
    Object.keys(schema.properties).forEach((schemaProp) => {
      const finalSchema = schema.properties[schemaProp].$ref
        ? getDefinitionSchemaFromRef(
            schema.definitions,
            schema.properties[schemaProp],
            formData[schemaProp]
          )
        : schema.properties[schemaProp];
      generateTestFile({
        schema: finalSchema,
        hashName,
        pageName: `${pageName}-${kebabize(schemaProp)}`,
        template,
        shelljs,
        generatedLocation,
      });
    });
  } else {
    generateTestFile({
      schema,
      hashName,
      pageName,
      template,
      shelljs,
      generatedLocation,
    });
  }
  
};

module.exports = e2eTestsGenerator;
