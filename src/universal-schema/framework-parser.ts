// Library
const { get, has } = require('lodash');
const ejs = require('ejs');
const format = require('xml-formatter');
const shelljs = require('shelljs');

// Framework
const framework = require('./framework.json');

// Generator
const reactFrameworkGenerator = require('./generators/framework-react.generator');
const svelteFrameworkGenerator = require('./generators/framework-svelte.generator');

type RenderComponent = {
    properties: any;
    methods: any;
    components: Array<any>;
}

type Components = Array<string>;

const markupSyntax = {
    root: '',
};
let currentComponentName = '';
const components = {
    root: []
};

const getComponentDefinitionByRef = ({
    ref,
    parent,
    methodResult = null
}) => {
    let finalRef = ref;
    if (ref.charAt(0) === '#') {
        const getRefOriginal = ref.replace('#/', '').replaceAll('/', '.');
        const getRefDef = getRefOriginal.includes('~') ? getRefOriginal.split('~')[0] : getRefOriginal;
        const methodResult = getRefOriginal.includes('~') ? getRefOriginal.split('~')[1] : null;
        const getRef = get(parent, getRefDef);
        if (has(getRef, 'ref')) {
            return getComponentDefinitionByRef({
                ref: getRef.ref,
                methodResult,
                parent
            });
        }
        finalRef = getRef;
    }
    const refJson = typeof finalRef === 'string' ? require(`./json/${finalRef}`) : finalRef;
    const comps = methodResult ? refJson.returns[methodResult] : refJson; 
    return {
        comps,
        methodResult,
        comment: ref
    };
}

const generateFrameworkCode = (frameworkName) => {
    switch (frameworkName) {
        case 'react':
            return reactFrameworkGenerator({
                shelljs,
                transformJSONtoCode,
                ejs,
                format,
                components
            });
        case 'svelte':
            return svelteFrameworkGenerator({
                shelljs,
                transformJSONtoCode,
                ejs,
                format,
                components
            });    
        default:
            return {};
    }
}

const transformJSONtoCode = () => {
    const component = require(framework.generate.ref);
    return generateTreeMarkup(
        component.components,
        component
    );
}


const generateTreeMarkup = (markupArray: any, parent, extraComponentName?: string) => {
    for (const mk in markupArray) {
        const ma = markupArray[mk];
        for (const componentName in ma) {
            currentComponentName = componentName;
            const ifComp = 'If';
            const thenComp = 'Then';
            const elseComp = 'Else';
            const conditionalComponents = [ifComp, thenComp, elseComp];
            const modifiedCompName = componentName.replace(componentName.charAt(0), componentName.charAt(0).toUpperCase());
            
            if (
                !components.root.includes(modifiedCompName) 
                && !conditionalComponents.includes(modifiedCompName)
            ) {
                components.root.push(modifiedCompName);
            }

            if (
                extraComponentName &&
                !components[extraComponentName].includes(modifiedCompName) 
                && !conditionalComponents.includes(modifiedCompName)
            ) {
                components[extraComponentName].push(modifiedCompName);
            }


            markupSyntax.root += `<${modifiedCompName}>`;
            if (extraComponentName) {
                markupSyntax[extraComponentName] += `<${modifiedCompName}>`;
            }
            /**
             * Finds if there is a if condition and generates the tag
             */
            if (componentName === 'if') {
                if (ma[componentName].then) {
                    markupSyntax.root += `<${thenComp}>`;
                    if (extraComponentName) {
                        markupSyntax[extraComponentName] += `<${thenComp}>`;
                    }
                        generateTreeMarkup(ma[componentName].then, parent, extraComponentName);
                    markupSyntax.root += `</${thenComp}>`;
                    if (extraComponentName) {
                        markupSyntax[extraComponentName] += `</${thenComp}>`;
                    }
                } 
                if (ma[componentName].else) {
                    markupSyntax.root += `<${elseComp}>`;
                    if (extraComponentName) {
                        markupSyntax[extraComponentName] += `<${elseComp}>`;
                    }
                        generateTreeMarkup(ma[componentName].else, parent, extraComponentName);
                    markupSyntax.root += `</${elseComp}>`;
                    if (extraComponentName) {
                        markupSyntax[extraComponentName] += `</${elseComp}>`;
                    }
                }
            }
            /**
             * Finds if there is ref mentioned to external json and generates tag
             */
            else if (ma[componentName].ref) {
                const { ref } = ma[componentName];
                const { comps, comment } = getComponentDefinitionByRef({ ref, parent });
                markupSyntax[componentName] = '';
                components[componentName] = [];
                generateTreeMarkup(comps.components, comps, componentName);
            }
            /**
             * Finds if there are components mentioned to external json
             */
            else if (ma[componentName].components) {
                generateTreeMarkup(ma[componentName].components, parent, extraComponentName);
            }
            markupSyntax.root += `</${modifiedCompName}>`;
            if (extraComponentName) {
                markupSyntax[extraComponentName] += `</${modifiedCompName}>`;
            }
        }
    };
    return markupSyntax;
}

try {
    const jsonComponents = generateFrameworkCode('svelte');
    // const transformedJsonComponents = addClosingBrackets(jsonComponents);
    // const fullMarkup = generateMarkup(
    //     transformedJsonComponents
    // );
    // console.log(fullMarkup);
    // console.log(jsonComponents);
    console.log(jsonComponents.root);
    // console.log(format(jsonComponents.root));
    // console.log(finalTags);
    // console.log(format(finalTags));
} catch(er) {
    console.log(er);
}
