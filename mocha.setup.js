// require('testdom')('<html><body></body></html>');
require('./jsdom-setup');
require('babel-register');

const gs = JSON.stringify;
global.JSON_stringify = gs;

function newStringify(val) {
  return gs(val, null, 2);
}
JSON.stringify = newStringify; // eslint-disable-line no-extend-native
