/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const assert = require('assert');
const { Builder, By, until } = require('selenium-webdriver');

// Input capabilities
const capabilities = {
  'browserName': 'Chrome',
  'browser_version': '79.0',
  'os': 'Windows',
  'os_version': '10',
  'resolution': '1024x768',
  'build': 'mocha-browserstack',
  'browserstack.user': 'bsuser10422',
  'browserstack.key': 'cmffipt5pwL4c5QyRwji',
  'name': 'React JSON Schema Form - Material UI',
};

const buildDriver = (caps) => new Builder()
  .usingServer('https://hub-cloud.browserstack.com/wd/hub')
  .withCapabilities(caps)
  .build();

describe('Testing forms', () => {
  let driver;
  beforeEach((done) => {
    driver = buildDriver(capabilities);
    done();
  });

  it('can load the initial page', async () => {
    await driver.get('https://react-jsonschema-form-material-ui.github56.now.sh');

    const autocomplete = await driver.findElement(
      By.xpath("//input[@value='Chuck']"),
    );
    autocomplete.sendKeys('BrowserStack');

    // // Wait unti pac-item item appears
    // await driver.wait(
    //   until.elementLocated(
    //     By.className('pac-item'),
    //   ),
    //   10000,
    // );

    const autocompleteResult = await driver.findElement(
      By.xpath('//button[2]'),
    );
    // autocompleteResult.click();

    // Or using sleep
    // Wait for 3 seconds
    await driver.sleep(3000);
    // assertion codes...
    const newName = await driver
      .findElement(By.xpath("//input[@value='ChuckBrowserStack']"))
      .getAttribute('value');
    // Cannot assert because the value doesn't appear in the DOM
    assert.equal(newName, 'ChuckBrowserStack');
  });

  afterEach((done) => {
    driver.quit(); 
    done();
  });
});
