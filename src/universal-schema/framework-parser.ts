// Library
const { get, has } = require('lodash');
const ejs = require('ejs');
const formatXML = require('xml-formatter');
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

type SupportedFrameworks = 'svelte'
| 'react'
| 'angular'
| 'stencil'
| 'vue'
| 'reactNative';

const markupSyntax = {
    root: '',
};

type Frameworks = Record<string, SupportedFrameworks>;

const frameworks: Frameworks = {
    react: 'react',
    vue: 'vue',
    angular: 'angular',
    svelte: 'svelte',
    stencil: 'stencil',
    reactNative: 'reactNative'
}

const selectedFramework = frameworks.svelte;

const ifComp = 'If';
const thenComp = 'Then';
const elseComp = 'Else';
const conditionalComponents = [ifComp, thenComp, elseComp];

let currentComponentName = '';

const components = {
    root: []
};

const properties = {
    root: []
};

const rules = {
    root: []
}

const imports = {
    root: []
}

const variables = {
    root: []
}

const format = (markup: string) => {
    switch (selectedFramework) {
        case frameworks.svelte:
            const ifOpeningSyntax = (match, p1, p2, p3, offset, string) => {
                return `{#await ${p2}}
        <div> </div>
    {:then ${p2.replace('(', '').replace(')', '')}}                
        {#if ${p2.replace('(', '').replace(')', '')}}`;
              };
            const ifClosingSyntax = `   {/if}
    {/await}`;
            const elseSyntax = '{:else}';
            const propsSyntax = (match, p1, p2, p3, offset, string) => {
                return `{...${p2}}`;
              };
            return formatXML(markup)
                    .replaceAll(/(props="(.+?)")/g, propsSyntax)
                    .replaceAll(/(\<If condition="(.+?)">)/g, ifOpeningSyntax)
                    .replaceAll(`</${ifComp}>`, ifClosingSyntax)
                    .replaceAll(`</${elseComp}>`, '')
                    .replaceAll(`<${elseComp}>`, elseSyntax);
        default:
            return formatXML(markup);
    }
}

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

const generateFrameworkCode = () => {
    switch (selectedFramework) {
        case frameworks.react:
            return reactFrameworkGenerator({
                shelljs,
                transformJSONtoCode,
                ejs,
                format,
                components,
                properties,
                rules
            });
        case frameworks.svelte:
            return svelteFrameworkGenerator({
                shelljs,
                transformJSONtoCode,
                ejs,
                format,
                components,
                properties,
                rules,
                imports,
                variables
            });    
        default:
            return {};
    }
}

const pushProperties = (jsonPropObj, propertiesObj) => {
    Object.keys(jsonPropObj).forEach((prop) => {
        propertiesObj.push({
            ...jsonPropObj[prop],
            propName: prop
        });
    })
}

const transformJSONtoCode = () => {
    const component = require(framework.generate.ref);
    const componentName = 'Form';
    markupSyntax[componentName] = '';
    components[componentName] = [];
    properties[componentName] = [];
    imports[componentName] = component.imports || [];
    variables[componentName] = component.variables || [];

    pushProperties(
        component.properties,
        properties.root
    );

    pushProperties(
        component.properties,
        properties[componentName]
    );

    return generateTreeMarkup(
        component.components,
        component,
        componentName
    );
}

const appendSyntaxToElement = (syntax: string, extraComponentName?: string) => {
    markupSyntax.root += syntax;
    if (extraComponentName) {
        markupSyntax[extraComponentName] += syntax;
    }
}

const conditionalSvelteOpeningBracket = (syntax: string, conditionRef, extraComponentName, extraComponentProps) => {
    switch (syntax) {
        case thenComp:
            return '';
        case ifComp:
            const functionCondition = conditionRef.split('/')[conditionRef.split('/').length - 1].replaceAll('-', '').replaceAll('.json', '');
            let condition = [];
            try {
                condition = require(`./json/${conditionRef}`);
            } catch(err) {}
            if (!rules[extraComponentName]) {
                rules[extraComponentName] = [];
            }
            rules[extraComponentName].push({
                name: functionCondition,
                condition: JSON.stringify(condition, null, 2)
            });
            return `<${syntax} condition="${functionCondition}()">`;    
        default:
            return extraComponentProps && extraComponentProps.length ? `<${syntax} props="${extraComponentProps[0]}">` : `<${syntax}>`;
    }
}

const conditionalSvelteClosingBracket = (syntax: string) => {
    switch (syntax) {
        case thenComp:
            return '';
        default:
            return `</${syntax}>`;
    }
}

const openingBracket = (syntax: string, conditionRef?: string, extraComponentName?: string, extraComponentProps?: Array<string>) => {
    switch (selectedFramework) {
        case frameworks.svelte:
            return conditionalSvelteOpeningBracket(syntax, conditionRef, extraComponentName, extraComponentProps);
        default:
            return `<${syntax}>`;
    }
};

const closingBracket = (syntax: string) => {
    switch (selectedFramework) {
        case frameworks.svelte:
            return conditionalSvelteClosingBracket(syntax);
        default:
            return `</${syntax}>`;
    }
}



const generateTreeMarkup = (markupArray: any, parent, extraComponentName?: string) => {
    for (const mk in markupArray) {
        const ma = markupArray[mk];
        for (const componentName in ma) {
            currentComponentName = componentName;
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

            if (ma[componentName].properties && !properties[componentName]) {
                properties[componentName] = [];
                pushProperties(
                    ma[componentName].properties,
                    properties[componentName]
                );
            }

            if (componentName === 'if') { 
                appendSyntaxToElement(
                    openingBracket(
                        modifiedCompName,
                        ma[componentName].ref,
                        extraComponentName,
                        ma[componentName].props || []
                    ), 
                    extraComponentName
                );
            } else {
                appendSyntaxToElement(
                    openingBracket(modifiedCompName, null, null, ma[componentName].props || []), 
                    extraComponentName
                );
            }

            /**
             * Finds if there is a if condition and generates the tag
             */
            if (componentName === 'if') {
                if (ma[componentName].then) {
                    appendSyntaxToElement(
                        openingBracket(thenComp),
                        extraComponentName
                    );
                        generateTreeMarkup(
                            ma[componentName].then, 
                            parent, 
                            extraComponentName
                        );
                    appendSyntaxToElement(
                        closingBracket(thenComp),
                        extraComponentName
                    );
                } 
                if (ma[componentName].else) {
                    appendSyntaxToElement(
                        openingBracket(elseComp),
                        extraComponentName
                    );
                        generateTreeMarkup(
                            ma[componentName].else, 
                            parent, 
                            extraComponentName
                        );
                    appendSyntaxToElement(
                        closingBracket(elseComp),
                        extraComponentName
                    );
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
                properties[componentName] = [];
                imports[componentName] = comps.imports || [];
                variables[componentName] = comps.variables || [];
                
                if (comps.properties) {
                    pushProperties(
                        comps.properties,
                        properties[componentName]
                    );
                }
                generateTreeMarkup(comps.components, comps, componentName);
            }
            /**
             * Finds if there are components mentioned to external json
             */
            else if (ma[componentName].components) {
                generateTreeMarkup(
                    ma[componentName].components, 
                    parent, 
                    extraComponentName
                );
            }
            appendSyntaxToElement(
                closingBracket(modifiedCompName), 
                extraComponentName
            );
        }
    };
    return markupSyntax;
}

try {
    const jsonComponents = generateFrameworkCode();
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
