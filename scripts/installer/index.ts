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
            generateFramework({ shelljs, frameworkName: 'react' });
            break;
        
        case 'vueMUI':
            generateFramework({ shelljs, frameworkName: 'vue' });
            break;

        case 'reactNativePaper':
            generateFramework({ shelljs, frameworkName: 'react-native' });
            break;
        
        case 'angularMUI':
            generateFramework({ shelljs, frameworkName: 'angular' });
            break;
        
        case 'stencilIonic':
            generateFramework({ shelljs, frameworkName: 'stencil' });
            break;
        
        case 'svelteMUI':
            generateFramework({ shelljs, frameworkName: 'stencil' });
            break;
        
        default:
            console.log('Nothing generated - please provide one of reactMUI, vueMUI, reactNativePaper, angularMUI, stencilIonic or svelteMUI');
            break;
    }

    if (framework) {
        console.log(framework + ' installed successfully');
    }
}
