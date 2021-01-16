/* eslint-disable global-require,import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3005;

const app = express();
app.use(bodyParser.json());

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

// ping for load balancer checking health
app.get('/ping', (req, res) => res.status(200).send());

app.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
