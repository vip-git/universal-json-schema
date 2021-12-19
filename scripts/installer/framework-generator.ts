/**
 * @description
 * This file deals with setup for bundles to be generated for JSON Schema
 * Following tasks are executed as detailed below :
 * - Copy All source related to framework specified
 * - Copy dependency and build compiler configs
 * - Generate UI Framework file mentioned
 * - Install needed dependancies
 * @param param0 
 */
const frameworkGenerator = ({ 
    shelljs, 
    frameworkName, 
    uiFrameworkName,
    uiFrameworkTemplate,
    interceptorFrameworkName,
    utilsFrameworkName
}) => {
    const cleanUpFiles = [
        "package-lock.json",
        "custom-elements.json",
        "tsconfig.json",
        "stencil.config.ts",
        "rollup.config.js",
        "webpack.config.js"
    ];
    const frameworkDir = `${shelljs.pwd()}/src/framework`;
    const helpersDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/helpers`;
    const configDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/config`;
    const crossFrameworkDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/cross-framework-wrapper`;
    const typesDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/src/types`;
    const uniSchemaDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/universal-schema`;

    // Dependancy and bundler info
    const frameworkPackageJson = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/package.json`;
    const frameworkBuildJSON: { copy: Array<string> } = require(`./frameworks/${frameworkName}/build.json`);

    cleanUpFiles.forEach((cf) => {
        shelljs.rm('-rf', `${shelljs.pwd()}/${cf}`);
    });

    shelljs.rm('-rf', frameworkDir);
    shelljs.rm('-rf', helpersDir);
    shelljs.rm('-rf', configDir);
    shelljs.rm('-rf', uniSchemaDir);
    shelljs.rm('-rf', crossFrameworkDir);
    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/src`,
        frameworkDir,
    );

    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/src/helpers`,
        helpersDir,
    );

    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/src/cross-framework-wrapper`,
        crossFrameworkDir,
    );

    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/src/config`,
        configDir,
    );

    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/src/types`,
        typesDir,
    );

    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/src/universal-schema`,
        uniSchemaDir,
    );

    const shellFileString = new shelljs.ShellString(uiFrameworkTemplate);  
    shellFileString.to(`${shelljs.pwd()}/src/framework/ui-framework/index.ts`);
    shelljs.mv(`${shelljs.pwd()}/package.json`, `${shelljs.pwd()}/package-original.json`);
    shelljs.cp(frameworkPackageJson, `${shelljs.pwd()}/package.json`);
    frameworkBuildJSON.copy.forEach((buildFile) => {
        shelljs.cp(`${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/${buildFile}`, `${shelljs.pwd()}/${buildFile}`);
    });

    shelljs.exec(`cross-env INTERCEPTORS_FRAMEWORK_NAME=${interceptorFrameworkName} UTILS_FRAMEWORK_NAME=${utilsFrameworkName} COMPONENTS_FRAMEWORK_NAME=${frameworkName} UI_FRAMEWORK_NAME=${uiFrameworkName} npm install --force`);
    shelljs.exec(`cross-env INTERCEPTORS_FRAMEWORK_NAME=${interceptorFrameworkName} UTILS_FRAMEWORK_NAME=${utilsFrameworkName} COMPONENTS_FRAMEWORK_NAME=${frameworkName} UI_FRAMEWORK_NAME=${uiFrameworkName} npm run postinstall`);

    if (!process.env.CI_RUN) {
        shelljs.rm('-rf', `${shelljs.pwd()}/package.json`);
        shelljs.mv(`${shelljs.pwd()}/package-original.json`, `${shelljs.pwd()}/package.json`);
    }

    if (process.env.CI_RUN) {
        shelljs.rm('-rf', `${shelljs.pwd()}/package-original.json`);
    }
}

module.exports = frameworkGenerator;
