/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const path = require('path');

 const extraNodeModules = {
   '../../../scripts/installer/frameworks/react-native/src': path.resolve(__dirname + '/../../../scripts/installer/frameworks/react-native/src'),
   '../../examples': path.resolve(__dirname + '/../../examples'),
   '../../../scripts/generator': path.resolve(__dirname + '/../../../scripts/generator'),
   '../../../src': path.resolve(__dirname + '/../../../src')
 };

 const watchFolders = [
   path.resolve(__dirname + '/../../../scripts/installer/frameworks/react-native/src'),
   path.resolve(__dirname + '/../../examples'),
   path.resolve(__dirname + '/../../../scripts/generator'),
   path.resolve(__dirname + '/../../../src'),
 ];
 
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) =>
        //redirects dependencies referenced from common/ to local node_modules
        name in target ? target[name] : path.join(process.cwd(), `node_modules/${name}`),
    }),
    resolveRequest: (context, realModuleName, platform, moduleName) => {
      let module = realModuleName;
      if(realModuleName.includes('@universal-schema')) {
        module = module.replace('@universal-schema', path.resolve(__dirname + '/../../../src/universal-schema'));
      }
      if(realModuleName.includes('@core-types')) {
        module = module.replace('@core-types', path.resolve(__dirname + '/../../../src/types'));
      }
      if(realModuleName.includes('@helpers')) {
        module = module.replace('@helpers', path.resolve(__dirname + '/../../../src/helpers'));
      }
      if(realModuleName.includes('@framework')) {
        module = module.replace('@framework', path.resolve(__dirname + '/../../../scripts/installer/frameworks/react-native/src'));
      }
      const { resolveRequest: removed, ...restContext } = context;
      return require("metro-resolver").resolve(restContext, module, platform);
    }
  },
  watchFolders,
};
