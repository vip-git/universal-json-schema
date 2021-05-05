const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    babelConfig: resolveApp('scripts/config/jest/babel.config.js'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.src,
    'node_modules',
];

module.exports = paths;
