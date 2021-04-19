module.exports = {
  clearValues: (path) => {
    $(path).setValue(' ');
    if (browser.capabilities.platformName === 'mac os x') {
      browser.keys(['Meta', 'a']);
    } else {
      browser.keys(['Control', 'a']);
    }
    browser.keys(['Backspace']);
  },
  uploadFile: (filePath, path) => {
    const remoteFilePath = browser.uploadFile(filePath);
    const fileId = $(path).getAttribute('id');
    browser.execute((id) => {
      document.getElementById(id).style = '';
    }, fileId);
    $(path).setValue(remoteFilePath);
    browser.execute((id) => {
      document.getElementById(id).style = 'display:none';
    }, fileId);
  },
};