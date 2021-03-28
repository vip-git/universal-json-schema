module.exports = {
  clearValues: (path) => {
    $(path).setValue(' ');
    browser.keys(['Meta', 'a']);
    browser.keys(['Backspace']);
  },
};