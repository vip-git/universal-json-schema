const frameworkGenerator = ({ shelljs, frameworkName }) => {
    const frameworkDir = `${shelljs.pwd()}/src/framework`;
    const helpersDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/helpers`;
    const configDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/config`;
    const uniSchemaDir = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/universal-schema`;
    const reactMUIPackageJson = `${shelljs.pwd()}/scripts/installer/frameworks/${frameworkName}/package.json`;
    shelljs.rm('-rf', frameworkDir);
    shelljs.rm('-rf', helpersDir);
    shelljs.rm('-rf', configDir);
    shelljs.rm('-rf', uniSchemaDir);
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
        `${shelljs.pwd()}/src/config`,
        configDir,
    );
    shelljs.ln(
        '-s',
        `${shelljs.pwd()}/src/universal-schema`,
        uniSchemaDir,
    );
    const uiFrameworkTemplate = `import { uiFramework } from './mui.framework';
    export { uiFramework };
    `;
    const shellFileString = new shelljs.ShellString(uiFrameworkTemplate);  
    shellFileString.to(`${shelljs.pwd()}/src/framework/ui-framework/index.ts`);
    shelljs.mv(`${shelljs.pwd()}/package.json`, `${shelljs.pwd()}/package-original.json`);
    shelljs.cp(reactMUIPackageJson, `${shelljs.pwd()}/package.json`);
    shelljs.exec('npm install');
    shelljs.rm('-rf', `${shelljs.pwd()}/package.json`);
    shelljs.mv(`${shelljs.pwd()}/package-original.json`, `${shelljs.pwd()}/package.json`);
}

module.exports = frameworkGenerator;
