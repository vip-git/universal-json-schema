/* eslint-disable max-len */
/* eslint-disable global-require,import/no-extraneous-dependencies */
const express = require('express');
const path = require('path');
const { generate } = require('shortid');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 3005;
const tempStorage = {};

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
    tempStorage[req.body.sessionId] = componentsJSON;
    return res.status(200).send(req.body);
  }

  return res.status(500).send({ 'error': 'Invalid Session' });
});
// Todo: Modularize this step with mini-functions
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
    const componentsInfo = tempStorage[req.body.sessionId];
    if (!fs.existsSync(`generator/${req.body.sessionId}`)) {
      fs.mkdirSync(`generator/${req.body.sessionId}`);
    }
    fs.writeFileSync(
      `generator/${req.body.sessionId}/components.json`,
      JSON.stringify(componentsInfo, null, 2),
    );
    const packageInfo = require('../../package.json');
    const packageName = `${req.body.packageName}-${generate().toLowerCase()}`;
    packageInfo.name = `@react-jsonschema-form-custom/${packageName}`;
    packageInfo.author = 'React JSON Schema Bot';
    packageInfo.version = req.body.packageVersion;
    delete packageInfo.scripts.postinstall;
    fs.writeFileSync(
      `generator/${req.body.sessionId}/package.json`,
      JSON.stringify(packageInfo, null, 2),
    );

    const readMeTemplate = `# React Json Schema Form Custom (${packageName})
>[**Material UI**](http://www.material-ui.com/) port of [**jsonschema-form.**](https://json-schema.org/)

>[**live playground**](https://react-jsonschema-form-material-ui.github56.now.sh/) and [**Detailed Docs**](https://react-json-schema.app/docs)

## Install instructions via npm

\`\`\`text
npm install --save ${packageInfo.name}
\`\`\`

## Example Usage

> More detailed example can be seen [here](https://github.com/vip-git/react-jsonschema-form-material-ui/blob/master/src/demo/body/Example.jsx)

\`\`\`jsx
// Library
import React from 'react';
import MaterialJsonSchemaForm from '${packageInfo.name}';

// Internals
const schema = require('./path-to your-schema.json');
const uiSchema = require('./path-to your-ui-schema.json');
const formData = require('./path-to your-ui-formData.json');

const Example () => {
    const onSubmit = (value, callback) => {
        console.log('onSubmit: %s', JSON.stringify(value)); // eslint-disable-line no-console
        setTimeout(() => callback && callback(), 2000); // just an example in real world can be your XHR call
    }
    
    const onCancel = () => {
        console.log('on reset being called');
    }
    
    const onFormChanged = ({ formData }) => {
        console.log('onFormChanged: ',formData); // eslint-disable-line no-console
    }
    
    const onUpload = (value) => {
        console.log('onUpload: ', value); // eslint-disable-line no-console
    }
    
    return (
      <MaterialJsonSchemaForm
        schema={givenSchema}
        uiSchema={givenUISchema}
        formData={givenFormData}
        onCancel={onCancel}
        onSubmit={onSubmit}
        onUpload={onUpload}
        onChange={onFormChanged}
        onError={onError}
        /* Optional Param for custom functions to be executed for transforming data */
        interceptors={{
            translateRatings: (givenData, uiData) => ({ givenData, uiData }),
        }}
        /* Optional Param for custom components */
        components={{
        customComponent: ({ onChange, ...rest }) => (
          <CustomComponent onChange={onChange} formData={givenFormData} uiData={givenUIData} {...rest} />
        ),
        customRating: ({ onChange, ...rest }) => (
          <CustomRating onChange={onChange} formData={givenFormData} uiData={givenUIData} {...rest} />
        ),
        }}
        /* Optional Param for custom validation */
        validations={{
            confirmPassword: ({ schema, validations, formData, value }) => value !== formData.pass1 && ({
            message: validations.confirmPassword.message,
            inline: true,
            }),
        }}
        /* Optional Param to auto submit form on press of enter */
        submitOnEnter
      />
    );
}

export default Example;
\`\`\`
    `;
    fs.writeFile(
      `generator/${req.body.sessionId}/README.md`,
      readMeTemplate,
      () => {},
    );

    /** Todo: replace this with environment variable */
    const npmrcTemplate = `
      //registry.npmjs.org/:_authToken=87a33854-e723-4936-bdf9-4b9409d2de66
      registry=https://registry.npmjs.org/
      always-auth=true
    `;

    fs.writeFile(
      `generator/${req.body.sessionId}/.npmrc`,
      npmrcTemplate,
      () => {},
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
COPY .npmignore /opt/react-json-schema/.npmignore
COPY generator/ /opt/react-json-schema/generator
COPY generator/${req.body.sessionId}/components.json /opt/react-json-schema/generator/components.json
COPY generator/${req.body.sessionId}/package.json /opt/react-json-schema/package.json
COPY generator/${req.body.sessionId}/README.md /opt/react-json-schema/README.md
COPY generator/${req.body.sessionId}/.npmrc /opt/react-json-schema/.npmrc
COPY index.js /opt/react-json-schema/index.js
COPY webpack.config.js /opt/react-json-schema/webpack.config.js

RUN npm install
RUN npm link webpack && \\ 
    npm link ejs && \\
    npm link shelljs && \\
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
RUN npm version
RUN npm publish --access public 

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
    return res.status(200).send({
      packageInfo,
      componentsInfo,
      readMeTemplate,
    });
  }
  return res.status(500).send({ error: 'Invalid Session' });
});

app.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
