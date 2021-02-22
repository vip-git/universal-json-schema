/* eslint-disable global-require,import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 3005;

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config.demo');
  const webpackCompiler = webpack(webpackConfig);
  const webpackDevOptions = {
    publicPath: webpackConfig.output.publicPath,
  };
  app.use(require('webpack-dev-middleware')(webpackCompiler, webpackDevOptions));
  app.use(require('webpack-hot-middleware')(webpackCompiler));
}
// serve static files from webpack dist dir
const publicPath = path.join(__dirname, '../../dist');
app.use(express.static(publicPath));

app.use('/schema', express.static(path.join(__dirname, 'examples')));

// ping for load balancer checking health
app.get('/ping', (req, res) => res.status(200).send());

app.post('/create_components', (req, res) => {
  const componentsJSON = require('../../generator/components.json');
  const filter = (obj, predicate) => Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce(
      (givenRes, key) => Object.assign(givenRes, { [key]: obj[key] }),
      {},
    );

  // Filter Utils
  componentsJSON.utils = filter(componentsJSON.utils, (util) => req.body.listOfUtils.includes(util.name));

  // Filter Interceptors
  componentsJSON.interceptors = filter(
    componentsJSON.interceptors, 
    (util) => req.body.listOfInterceptors.includes(util.name),
  );

  // Filter Components
  componentsJSON.components = filter(
    componentsJSON.components, 
    (util) => req.body.listOfComponents.includes(util.name),
  );

  if (req.body && req.body.sessionId) {
    if (!fs.existsSync(`generator/${req.body.sessionId}`)) {
      fs.mkdirSync(`generator/${req.body.sessionId}`);
    }
    fs.writeFileSync(
      `generator/${req.body.sessionId}/components.json`,
      JSON.stringify(componentsJSON, null, 2),
    );
    return res.status(200).send(req.body);
  }

  return res.status(500).send({ 'error': 'Invalid Session' });
});
app.post('/publish_package', (req, res) => {
  if (req.body && req.body.sessionId) {
    const rmdir = (dir) => {
      const list = fs.readdirSync(dir);
      for (let i = 0; i < list.length; i++) {
        const filename = path.join(dir, list[i]);
        const stat = fs.statSync(filename);

        if (filename === '.' || filename === '..') {
          // pass these files
        }
        else if (stat.isDirectory()) {
          // rmdir recursively
          rmdir(filename);
        }
        else {
          // rm fiilename
          fs.unlinkSync(filename);
        }
      }
      fs.rmdirSync(dir);
    };
    const packageJSON = require('../../package.json');
    packageJSON.name = req.body.packageName;
    packageJSON.version = req.body.packageVersion;
    fs.writeFileSync(
      `generator/${req.body.sessionId}/package.json`,
      JSON.stringify(packageJSON, null, 2),
    );
    const dockerFileTemplate = `
# Use an official node image
FROM node:lts-alpine

RUN set -xe \\
    && apk add --no-cache bash git openssh \\
    && git --version && bash --version && ssh -V && npm -v && node -v

# Environment Variables
ENV NODE_ENV production

RUN mkdir -p /opt/react-json-schema

WORKDIR /opt/react-json-schema
COPY src/ /opt/react-json-schema/src
COPY .babelrc /opt/react-json-schema/.babelrc
COPY generator/ /opt/react-json-schema/generator
COPY generator/${req.body.sessionId}/components.json /opt/react-json-schema/generator/components.json
COPY generator/${req.body.sessionId}/package.json /opt/react-json-schema/package.json
COPY index.js /opt/react-json-schema/index.js
COPY webpack.config.js /opt/react-json-schema/webpack.config.js

RUN npm install
RUN npm link webpack && \\ 
    npm link webpack-cli && \\
    npm link compression-webpack-plugin && \\
    npm link babel-loader && \\
    npm link @babel/core && \\
    npm link @babel/plugin-transform-runtime && \\
    npm link @babel/plugin-proposal-class-properties && \\
    npm link @babel/plugin-proposal-object-rest-spread && \\
    npm link @babel/plugin-proposal-optional-chaining && \\
    npm link @babel/plugin-syntax-dynamic-import && \\
    npm link @babel/plugin-transform-modules-commonjs && \\
    npm link @babel/plugin-transform-runtime && \\
    npm link @babel/polyfill && \\
    npm link @babel/preset-env && \\
    npm link @babel/preset-react && \\
    npm link @babel/preset-typescript && \\
    npm link @babel/register && \\
    npm link @babel/runtime
RUN node generator/index.js
RUN npx webpack
# RUN npm login --username --password 
# RUN npm publish --access public 

CMD ["node", "index.js"]
    `;
    fs.writeFile(
      `Dockerfile${req.body.sessionId.toLowerCase()}`,
      dockerFileTemplate,
      () => {},
    );
    const shelljs = require('shelljs');
    shelljs.exec(
      `docker build -t ${req.body.sessionId.toLowerCase()} -f Dockerfile${req.body.sessionId.toLowerCase()} .`,
      () => {
        try {
          fs.unlinkSync(`Dockerfile${req.body.sessionId.toLowerCase()}`);
          rmdir(`generator/${req.body.sessionId}/`);
        }
        catch (err) {
          // console.error(err);
        }
      },
    );
    return res.status(200).send(req.body);
  }
  return res.status(500).send({ error: 'Invalid Session' });
});

app.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
