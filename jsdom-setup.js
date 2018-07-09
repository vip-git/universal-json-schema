/* eslint-disable import/no-extraneous-dependencies */

// https://stackoverflow.com/questions/41194264/mocha-react-navigator-is-not-defined
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

// function copyProps(src, target) {
//   const props = Object.getOwnPropertyNames(src)
//     .filter(prop => typeof target[prop] === 'undefined')
//     .reduce((result, prop) => ({
//       ...result,
//       [prop]: Object.getOwnPropertyDescriptor(src, prop),
//     }), {});
//   Object.defineProperties(target, props);
// }

global.window = window;
global.document = window.document;

global.navigator = {
  userAgent: 'node.js',
};
require('raf').polyfill(global);
