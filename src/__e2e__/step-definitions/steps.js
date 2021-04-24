const { Given, When, Then } = require('@cucumber/cucumber');

const FormPage = require('../page-objects/form.page');

const pages = {
  form: FormPage,
};

Given(
  /^I have a (\w+) for page (\w+) with following "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)" "(.*)"$/,
  (
    page,
    formPage,
    fieldRef,
    shouldReload,
    tabName,
    stepName,
    hasXHRData,
    folderName,
    refrencePointer
  ) => {
    $('//button[@aria-label="full-screen-code"]').click();
    pages[page].open(
      fieldRef,
      formPage,
      shouldReload,
      tabName,
      hasXHRData === 'true',
      folderName,
      refrencePointer
    );
  }
);

When(
  /^I test the field "(.*)" based on following attributes$/,
  (fieldRef, table) => {
    FormPage.testField(table);
  }
);

Then(
  /^I expect the field "(.*)" to have following values$/,
  (fieldRef, table) => {
    FormPage.changeFieldValueAndSubmit(table);
  }
);
