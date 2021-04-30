const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const paths = {
    clientBuild: resolveApp('docker/frontend/prod/build/client'),
    serverBuild: resolveApp('docker/frontend/prod/build/server'),
    dotenv: resolveApp('.env'),
    src: resolveApp('src'),
    publicPath: '/static/',
};

paths.resolveModules = [
    paths.src,
    'node_modules',
];

module.exports = paths;
