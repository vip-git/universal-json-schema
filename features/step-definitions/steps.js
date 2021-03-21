const { Given, When, Then } = require('@cucumber/cucumber');

const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

const pages = {
  login: LoginPage,
};

Given(/^I am on the (\w+) page$/, (page) => {
  pages[page].open();
});

When(/^I login with (\w+) and (.+)$/, (username, password) => {
  LoginPage.login(username, password);
});

Then(/^I should see a flash message saying (.*)$/, (message) => {
  expect(SecurePage.flashAlert).toBeExisting();
  expect(SecurePage.flashAlert).toHaveTextContaining(message);
});
