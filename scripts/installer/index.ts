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
const shelljs = require('shelljs');

if (process.argv && process.argv.length === 3) {
    const framework = process.argv[2].replace('--', '');
    const frameworkDir = `${shelljs.pwd()}/src/framework`;

    switch (framework) {
        case 'reactMUI':
            shelljs.rm('-rf', frameworkDir);
            shelljs.mkdir(frameworkDir);
            shelljs.cp(
                '-R',
                'scripts/installer/templates/react/src/*',
                'src/framework/',
            );
            shelljs.cp(
                '-R',
                `${frameworkDir}/ui-framework/mui.framework.ts`,
                `${shelljs.pwd()}/src/universal-schema/ui-framework.ts`,
            );
            shelljs.cp(
                '-R',
                `${frameworkDir}/ui-framework/types/mui-framework.type.ts`,
                `${shelljs.pwd()}/src/universal-schema/types/ui-framework.type.ts`,
            );
            shelljs.rm('-rf', `${frameworkDir}/ui-framework`);
            break;
        
        case 'vueMUI':
            break;

        case 'reactNativePaper':

            break;
        
        case 'angularMUI':

            break;
        
        case 'stencilIonic':

            break;
        
        case 'svelteMUI':

            break;
        
        default:
            break;
    }

    console.log(framework + ' installed successfully');
}
