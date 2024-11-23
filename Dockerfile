
# Use an official node image
FROM node:20.18.1-alpine3.20

RUN set -xe \
    && apk add --no-cache bash git openssh \
    && git --version && bash --version && ssh -V && npm -v && node -v

# Environment Variables
ENV NODE_ENV production

RUN mkdir -p /opt/react-json-schema

WORKDIR /opt/react-json-schema
COPY src/ /opt/react-json-schema/src
COPY .babelrc /opt/react-json-schema/.babelrc
COPY scripts/generator/ /opt/react-json-schema/scripts/generator
COPY package.json /opt/react-json-schema/package.json
COPY package-lock.json /opt/react-json-schema/package-lock.json
COPY index.js /opt/react-json-schema/index.js
COPY webpack.config.js /opt/react-json-schema/webpack.config.js

RUN npm install
RUN npm link webpack && \ 
    npm link webpack-cli && \
    npm link compression-webpack-plugin && \
    npm link babel-loader && \
    npm link @babel/core && \
    npm link @babel/plugin-transform-runtime && \
    npm link @babel/plugin-proposal-class-properties && \
    npm link @babel/plugin-proposal-object-rest-spread && \
    npm link @babel/plugin-proposal-optional-chaining && \
    npm link @babel/plugin-syntax-dynamic-import && \
    npm link @babel/plugin-transform-modules-commonjs && \
    npm link @babel/plugin-transform-runtime && \
    npm link @babel/polyfill && \
    npm link @babel/preset-env && \
    npm link @babel/preset-react && \
    npm link @babel/preset-typescript && \
    npm link @babel/register && \
    npm link @babel/runtime
RUN node scripts/generator/index.js
RUN npx webpack
# EXPOSE 3000

CMD ["node", "index.js"]
    