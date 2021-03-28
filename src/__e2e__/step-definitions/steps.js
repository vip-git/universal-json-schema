const { Given, When, Then } = require('@cucumber/cucumber');

const FormPage = require('../page-objects/form.page');

const pages = {
  form: FormPage,
};

Given(
  /^I have a (\w+) for page (\w+) with following "(.*)" "(.*)"$/,
  (page, formPage, fieldRef, shouldReload) => {
    pages[page].open(fieldRef, formPage, shouldReload);
  }
);

When(
  /^I test the field based on following attributes$/,
  (table) => {
    FormPage.testField(table);
  }
);

Then(/^I expect the field to have following values$/, (table) => {
  FormPage.changeFieldValueAndSubmit(table);
});
