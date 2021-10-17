const frameworkGenerator = ({ 
    shelljs, 
    frameworkName, 
    uiFrameworkName,
    uiFrameworkTemplate,
}) => {
    const frameworkDir = `${shelljs.pwd()}/src/framework`;
    const helpersDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/helpers`;
    const configDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/config`;
    const crossFrameworkDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/cross-framework-wrapper`;
    const typesDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/src/types`;
    const uniSchemaDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/universal-schema`;
    const reactMUIPackageJson = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/package.json`;
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
    shelljs.cp(reactMUIPackageJson, `${shelljs.pwd()}/package.json`);
    shelljs.exec(`cross-env FRAMEWORK_NAME=${frameworkName} UI_FRAMEWORK_NAME=${uiFrameworkName} npm install`);
    shelljs.rm('-rf', `${shelljs.pwd()}/package.json`);
    shelljs.mv(`${shelljs.pwd()}/package-original.json`, `${shelljs.pwd()}/package.json`);
}

module.exports = frameworkGenerator;
