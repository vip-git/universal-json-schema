// require('testdom')('<html><body></body></html>');
require('./jsdom-setup');
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-syntax-dynamic-import',
  ],
});

const gs = JSON.stringify;
global.JSON_stringify = gs;

function newStringify(val) {
  return gs(val, null, 2);
}
JSON.stringify = newStringify; // eslint-disable-line no-extend-native
