const { Given, When, Then } = require('@cucumber/cucumber');

const FormPage = require('../pageobjects/form.page');

const pages = {
  form: FormPage,
};

Given(
  /^I have a (\w+) for page (\w+) with following (.*)$/,
  (page, formPage, fieldRef) => {
    pages[page].open(fieldRef, formPage);
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
