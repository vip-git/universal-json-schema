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
    const shelljs = require('shelljs');
    shelljs.exec(`node generator/index.js ${req.body.sessionId}`);
    /**
     * Todo: add npm publish and webpack bundle code
     * Points:
     * - change generated folder for webpack.demo
     * - add new generated folder by hash for webpack bundle hash
     * - add npm publish after newly generated code
     */
    shelljs.exec(
      `cross-env GENERATED_SESSION_ID=${req.body.sessionId} node webpack`,
    );
    return res.status(200).send(req.body);
  }
  return res.status(500).send({ error: 'Invalid Session' });
});

app.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
