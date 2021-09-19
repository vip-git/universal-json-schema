const _ = require('lodash');
const namor = require('namor');
const getDefinitionSchemaFromRef = require('../../src/helpers/get-definition-schema-nodejs');

const generateTestFile = ({
  schema,
  hashName,
  pageName,
  template,
  shelljs,
  generatedLocation,
  formData,
  hasOnLoadData,
  hasOnSubmitData,
  tabName,
  stepName,
  folderName,
  refrencePointer,
}) => {
  const finalString = template({
    schema,
    pageName: hashName,
    formData,
    hasOnLoadData,
    hasOnSubmitData,
    folderName,
    refrencePointer,
    tabName,
    stepName,
  });
  const shellFileString = new shelljs.ShellString(finalString);

  console.log(`Generating Integration Tests for ${pageName}`);

  shellFileString.to(`${generatedLocation}/${pageName}.feature`);

  console.log(`${pageName} tests generated successfully`);
};

const generateUISchemaType = ({
  schema,
  uiSchema,
  formData
}) => {
  const isTelephone = (propName) => _.has(uiSchema, `${propName}.ui:options.inputType`);
  /**
   * Todo: do something with uiSchema validations here
   * maxLength
   * minLength
   * pattern
   * minimum
   * maximum
   */
  Object.keys(schema.properties).forEach((schemaProp) => {
    const isTelephoneNumber = isTelephone(schemaProp) ? '+3119121345' : namor.generate({
            words: 3,
            saltLength: 0,
          });
    let data =
      schema.properties[schemaProp].type === 'number' ||
      schema.properties[schemaProp].type === 'integer'
        ? namor.generate({
            words: 0,
            numbers: 5,
            saltLength: 0,
          }).replace(0, '')
        : isTelephoneNumber

    if (schema.properties[schemaProp].maximum) {
      data = schema.properties[schemaProp].maximum;
    }      

    if (
      schema.properties[schemaProp] &&
      schema.properties[schemaProp].$ref
    ) {
      schema.properties[schemaProp] = getDefinitionSchemaFromRef(
        schema.definitions,
        schema.properties[schemaProp],
        formData[schemaProp]
      );
    }

    if (
      schema.properties[schemaProp] &&
      schema.properties[schemaProp].items &&
      schema.properties[schemaProp].items.$ref
    ) {
      schema.properties[schemaProp].items = getDefinitionSchemaFromRef(
        schema.definitions,
        schema.properties[schemaProp].items,
        formData[schemaProp]
      );
    }

    if (
      schema.properties[schemaProp].items &&
      schema.properties[schemaProp].items.title
    ) {
      schema.properties[schemaProp].title =
        schema.properties[schemaProp].items.title;
    }

    if (uiSchema && uiSchema[schemaProp] && uiSchema[schemaProp]['ui:widget']) {
      schema.properties[schemaProp]['widget'] =
        (
          uiSchema[schemaProp] &&
          uiSchema[schemaProp]['ui:options'] &&
          uiSchema[schemaProp]['ui:options'] === 'rich-text-editor'
        ) ? 'rich-text-editor'
          : uiSchema[schemaProp]['ui:widget'];

        if (uiSchema[schemaProp]['ui:widget'] === 'material-date') {
          data = '31-01-2021';
        }

        if (uiSchema[schemaProp]['ui:widget'] === 'upload') {
          data = 'checkbox.md';
        }
    } else if (
      uiSchema &&
      uiSchema[schemaProp] &&
      uiSchema[schemaProp]['ui:component']
    ) {
      schema.properties[schemaProp]['widget'] = uiSchema[schemaProp]['ui:component'];
    } else {
      const isTextArea = uiSchema['mui:multiline'] ? 'textarea' : 'material-input';
      const isArray =
        schema.properties[schemaProp].type === 'array'
          ? 'material-multiselect-native'
          : isTextArea;
      const isBoolean =
        schema.properties[schemaProp].type === 'boolean'
          ? 'material-checkbox'
          : isArray;
      const schemaFD = schema.properties[schemaProp];
      schema.properties[schemaProp]['widget'] =
        (schemaFD.anyOf || schemaFD.oneOf || schemaFD.enum)
          ? 'material-native-select'
          : isBoolean;
    }

    if (
      uiSchema &&
      uiSchema[schemaProp] &&
      uiSchema[schemaProp]['ui:options'] &&
      uiSchema[schemaProp]['ui:options']['useLocaleString']
    ) {
      schema.properties[schemaProp].uiData = Number(data).toLocaleString(
        uiSchema[schemaProp]['ui:options']['useLocaleString']
      );
    }

    const getEnumValue = (givenEnumData, formData) => {
      const enumData = Array.isArray(formData)
        ? givenEnumData.filter((el) => {
            return formData.indexOf(el) < 0;
          })
        : givenEnumData.filter((d) => !d.disabled);
      const enumVal =
        typeof enumData[0] === 'object'
          ? enumData[0].value || enumData[0].title
          : enumData[0];
      return typeof formData === 'string' ||
        (Array.isArray(formData) && formData.includes(enumVal))
        ? typeof enumData[1] === 'object'
          ? enumData[1].value || enumData[1].title
          : enumData[1]
        : enumVal;
    };
      
    const isEnumData =
      schema.properties[schemaProp].enum ||
      schema.properties[schemaProp].anyOf ||
      (schema.properties[schemaProp].items &&
        (schema.properties[schemaProp].items.enum ||
          schema.properties[schemaProp].items.anyOf));
    schema.properties[schemaProp].data = isEnumData
      ? getEnumValue(isEnumData, formData && formData[schemaProp])
      : data;
  });
  return schema;
}

const mapFormDataWithValues = (givenFormData, givenSchema) => {
  const schema = givenSchema.properties;
  const formData = {};
  if (givenFormData) {
    Object.keys(givenFormData).forEach((fd) => {
      const schemaFD = (schema[fd] && schema[fd].items) || schema[fd];
      if (schemaFD && (schemaFD.anyOf || schemaFD.oneOf || schemaFD.enum)) {
        const values = schemaFD.anyOf || schemaFD.oneOf || schemaFD.enum;
        const value = values.find(
          (d) => d.key == givenFormData[fd] || d.const == givenFormData[fd] || d === givenFormData[fd]
        );
        formData[fd] = value ? value.value || value.title || value : values;
      } else {
        formData[fd] = givenFormData[fd];
      }
    });
  }
  return formData;
}

const e2eTestsGenerator = (
  pageName,
  hashName,
  shelljs,
  ejs,
  generatedLocation,
  testsGeneratedFolder
) => {
  const templateFile = require('./templates/example-form-e2e.template.js');
  const template = ejs.compile(templateFile, {});
  let xhrSchema = {};
  let uiSchema = {};
  const schema = require(`../../demo/web/react/examples/${pageName}/schema.json`);
  try {
    uiSchema = require(`../../demo/web/react/examples/${pageName}/ui-schema.json`);
  } catch (err) {}
  try {
    xhrSchema = require(`../../demo/web/react/examples/${pageName}/xhr-schema.json`);
  } catch (err) {}
  const formData = require(`../../demo/web/react/examples/${pageName}/form-data.json`);

  if (schema.additionalProperties) {
    schema.properties.additionalProperties = schema.additionalProperties;
  }

  try {
    const testSchema = require(`../../demo/web/react/examples/${pageName}/tests-schema.json`);
    const subTestsFolder = `${testsGeneratedFolder}/${pageName}`;
    shelljs.rm('-rf', subTestsFolder);
    shelljs.mkdir(subTestsFolder);
    const shellTestFileString = new shelljs.ShellString(
      JSON.stringify(testSchema, null, 2)
    );
    shellTestFileString.to(`${subTestsFolder}/tests-schema.json`);
    console.log(`${pageName} custom schema tests generated successfully`);
  } catch (err) {}
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
    schema.properties = {
      single: schema,
    };
  }

  // This logic should be refactored to include nested field support
  if (
    _.has(uiSchema, 'ui:page.ui:layout') &&
    _.get(uiSchema, 'ui:page.ui:layout') === 'tabs'
  ) {
    Object.keys(schema.properties).forEach((schemaProp) => {
      const finalSchema = schema.properties[schemaProp].$ref
        ? getDefinitionSchemaFromRef(
            schema.definitions,
            schema.properties[schemaProp],
            formData[schemaProp]
          )
        : schema.properties[schemaProp];

      const newSchema = generateUISchemaType({
        schema: finalSchema,
        uiSchema: uiSchema[schemaProp],
        formData: formData[schemaProp],
      });
      const finalFormData = mapFormDataWithValues(
        formData[schemaProp],
        finalSchema
      );
      const uiLayout = _.get(uiSchema, 'ui:page.ui:layout');
      generateTestFile({
        schema: newSchema,
        hashName,
        pageName: `${pageName}-${kebabize(schemaProp)}`,
        template,
        shelljs,
        generatedLocation,
        folderName: pageName,
        refrencePointer: schemaProp,
        formData: finalFormData,
        xhrSchema: xhrSchema[schemaProp],
        hasOnLoadData: _.has(xhrSchema, 'ui:page.onload'),
        tabName: (uiLayout === 'tabs' && newSchema.title) || false,
        hasOnSubmitData: _.has(xhrSchema, 'ui:page.onsubmit'),
        stepName: (uiLayout === 'steps' && newSchema.title) || false,
      });
    });
  } else {
    const finalSchema = generateUISchemaType({
      schema,
      uiSchema,
      formData,
    });
    const finalFormData = mapFormDataWithValues(formData, finalSchema);
    generateTestFile({
      schema: finalSchema,
      hashName,
      pageName,
      folderName: pageName,
      refrencePointer: pageName,
      template,
      shelljs,
      tabName: false,
      stepName: false,
      generatedLocation,
      formData: finalFormData,
      xhrSchema,
      hasOnLoadData: _.has(xhrSchema, 'ui:page.onload'),
      hasOnSubmitData: _.has(xhrSchema, 'ui:page.onsubmit'),
    });
  }
};

module.exports = e2eTestsGenerator;
