/**
 * @description
 * This file is the dependancy donwloader based on arguments provided.
 * 
 * Current Support :
 * reactMUI -> renames current package json and brings react-mui-package.json as package.json to download dependancies.
 * reactNativePaper -> renames current package json and brings react-native-paper-package.json as package.json to download dependancies.
 * vueMUI -> renames current package json and brings vue-mui-package.json as package.json to download dependancies.
 * angularMUI -> renames current package json and brings angular-mui-package.json as package.json to download dependancies.
 * stencilIonic -> renames current package json and brings stencil-ionic-package.json as package.json to download dependancies.
 * svelteMUI -> renames current package json and brings svelte-mui-package.json as package.json to download dependancies.
 */
// Library
const shelljs = require('shelljs');
const generateFramework = require('./framework-generator');

if (process.argv && process.argv.length === 3) {
    const framework = process.argv[2].replace('--', '');
    
    switch (framework) {
        case 'reactMUI': 
            const reactUIFrameworkTemplate = `import { uiFramework } from './mui.framework';
            export { uiFramework };
            `;
            generateFramework({ 
                shelljs,
                frameworkName: 'react',
                uiFrameworkName: 'mui',
                uiFrameworkTemplate: reactUIFrameworkTemplate,
                interceptorFrameworkName: 'react',
                utilsFrameworkName: 'react'
            });
            break;
        
        case 'vueMUI':
            const vueUIFrameworkTemplate = `import { uiFramework } from './mui.framework';
            export { uiFramework };
            `;
            generateFramework({ 
                shelljs,
                frameworkName: 'vue',
                uiFrameworkName: 'mui',
                uiFrameworkTemplate: vueUIFrameworkTemplate,
                interceptorFrameworkName: 'vue',
                utilsFrameworkName: 'vue'
            });
            break;

        case 'reactNativePaper':
            const rnUIFrameworkTemplate = `import { uiFramework } from './rnpaper.framework';
            export { uiFramework };
            `;
            generateFramework({ 
                shelljs,
                frameworkName: 'react-native',
                uiFrameworkName: 'rnpaper',
                uiFrameworkTemplate: rnUIFrameworkTemplate,
                interceptorFrameworkName: 'react',
                utilsFrameworkName: 'react'
            });
            //shelljs.rm('-rf', `${shelljs.pwd()}/scripts/installer/frameworks/react-native/cross-framework-wrapper/react/form-styles.ts`);
            //shelljs.rm('-rf', `${shelljs.pwd()}/scripts/installer/frameworks/react-native/cross-framework-wrapper/react/form-field-styles.ts`);
            break;
        
        case 'angularMUI':
            const angularUIFrameworkTemplate = `import { uiFramework } from './mui.framework';
            export { uiFramework };
            `;
            generateFramework({ 
                shelljs,
                frameworkName: 'angular',
                uiFrameworkName: 'mui',
                uiFrameworkTemplate: angularUIFrameworkTemplate,
                interceptorFrameworkName: 'angular',
                utilsFrameworkName: 'angular'
            });
            break;
        
        case 'stencilDuetds':
            const stencilUIFrameworkTemplate = `import { uiFramework } from './duetds.framework';
            export { uiFramework };
            `;
            generateFramework({ 
                shelljs,
                frameworkName: 'stencil',
                uiFrameworkName: 'duetds',
                uiFrameworkTemplate: stencilUIFrameworkTemplate,
                interceptorFrameworkName: 'stencil',
                utilsFrameworkName: 'stencil'
            });
            break;
        
        case 'svelteMUI':
            const svelteUIFrameworkTemplate = `import { uiFramework } from './mui.framework';
            export { uiFramework };
            `;
            generateFramework({ 
                shelljs,
                frameworkName: 'svelte',
                uiFrameworkName: 'mui',
                uiFrameworkTemplate: svelteUIFrameworkTemplate,
                interceptorFrameworkName: 'svelte',
                utilsFrameworkName: 'svelte'
            });
            break;
        
        default:
            console.log('Nothing generated - please provide one of reactMUI, vueMUI, reactNativePaper, angularMUI, stencilIonic or svelteMUI');
            break;
    }

    if (framework) {
        console.log(framework + ' installed successfully');
    }
}
