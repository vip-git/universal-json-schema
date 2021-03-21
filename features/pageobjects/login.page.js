/* eslint-disable no-undef */
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
     * define selectors using getter methods
     */
  get inputUsername() {
    return $('#username'); 
  }

  get inputPassword() {
    return $('#password'); 
  }

  get btnSubmit() {
    return $('button[type="submit"]'); 
  }

  /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
  login(username, password) {
    this.inputUsername.setValue(username);
    this.inputPassword.setValue(password);
    this.btnSubmit.click(); 
  }

  /**
     * overwrite specifc options to adapt it to page object
     */
  open() {
    return super.open('login');
  }
}

module.exports = new LoginPage();
