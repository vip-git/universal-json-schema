/* eslint-disable no-undef */
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
  /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
  open(path) {
    browser.url(`${process.env.VERCEL_URL || 'https://react-jsonschema-form-material-ui-22ntiabxb-github56.vercel.app'}/#${path}`);
    return $('//button[@aria-label="full-screen-code"]').click();
  }
};
