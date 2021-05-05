import Enzyme, { shallow, render, mount } from 'enzyme';
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const fetch = require('node-fetch');
import jsdom from 'jest-environment-jsdom';
import renderer from 'react-test-renderer';
// React 17 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make Enzyme functions available in all test files without importing
global.shallow = shallow;
global.render = render;
global.renderer = renderer;
global.mount = mount;
global.jsdom = jsdom;
global.location = {};
global.document = {};
// global.Response = Response;
// global.Request = Request;
// global.Headers = Headers;
global.fetch = fetch;
global.window = Object.create(window);
const url = 'http://localhost';
Object.defineProperty(window, 'location', {
  value: {
    href: url,
  },
  writable: true,
});