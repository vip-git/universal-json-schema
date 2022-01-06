<script lang="ts">
// Components
 import Div from './components/Div.svelte';
 import UIFieldComponent from './components/UIFieldComponent.svelte';
 import FormRoot from './components/FormRoot.svelte';
 import UILabelComponent from './components/UILabelComponent.svelte';
 import Para from './components/Para.svelte';
 import ActiveComp from './components/ActiveComp.svelte';
 import UIComponent from './components/UIComponent.svelte';
 import FormHelperText from './components/FormHelperText.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 
export let className = ''; 
export let path = ''; 
export let schema: any = {}; 
export let data: any = {}; 
export let uiSchema: any = {}; 
export let xhrSchema: any = {};  
export let onChange = () => {};
export let onXHRSchemaEvent = () => {};
export let onKeyDown = () => {}; 
export let dynamicKeyField = ''; 
export let prefixId = ''; 
export let widget = ''; 
export let type = ''; 
export let descriptionText = ''; 
export let activeCompColor = ''; 
export let helpText = ''; 
export let Component = ''; 
export let LabelComponent = ''; 
export let labelComponentProps = ''; 
export let title = schema.title; 
export let componentProps = ''; 
export let id = ''; 
export let htmlid = ''; 
export let isHidden = ''; 
export let isCustomComponent = ''; 
export let hasError = ''; 
export let hasInlineError = ''; 
export let validation = ''; 
export let xhrProgress = '';
export let resolvedFormFacts = {};

const resolvedFacts = {
  ...resolvedFormFacts,
  schemaType: schema.type,
  LabelComponent: true,
  title,
  isCustomComponent: false,
  descriptionText: 'Hello World',
  activeCompColor: false,
  canRenderComponent: true,
  helpText: 'helper'
}

// Rules
const { rulesParser } = RulesEngine({
    resolvedFacts
});

const isformloading = async () => await rulesParser({
  "all": [
    {
      "fact": "isFormLoading",
      "operator": "equal",
      "value": true
    },
    {
      "fact": "hasPageLayoutTabs",
      "operator": "equal",
      "value": true
    }
  ]
});

const isallowedtorenderlabel = async () => await rulesParser({
    "all": [
        {
            "fact": "LabelComponent",
            "operator": "isDefined",
            "value": true
        },
        {
            "fact": "title",
            "operator": "isDefined",
            "value": true
        },
        {
            "fact": "isCustomComponent",
            "operator": "isNotDefined",
            "value": false
        }
    ]
}
);

const isallowedtorenderdescriptiontext = async () => await rulesParser({
    "all": [
        {
            "fact": "descriptionText",
            "operator": "isDefined",
            "value": true
        },
        {
            "fact": "isCustomComponent",
            "operator": "isNotDefined",
            "value": false
        }
    ]
}
);

const isallowedtorenderactivecomp = async () => await rulesParser({
    "all": [
        {
            "fact": "activeCompColor",
            "operator": "isDefined",
            "value": true
        },
        {
            "fact": "isCustomComponent",
            "operator": "isNotDefined",
            "value": false
        }
    ]
}
);

const isallowedtorendercomponent = async () => await rulesParser({
    "all": [
        {
            "fact": "canRenderComponent",
            "operator": "equal",
            "value": true
        }
    ]
}
);

const isallowedtorenderhelpertext = async () => await rulesParser({
    "all": [
        {
            "fact": "helpText",
            "operator": "isDefined",
            "value": true
        },
        {
            "fact": "isCustomComponent",
            "operator": "isNotDefined",
            "value": false
        }
    ]
}
);
const uiComponentProps = {
  schema,
  data,
  uiSchema,
  xhrSchema,
  onChange
}
</script>

{#await isformloading()}
        <div> </div>
    {:then isformloading}                
        {#if isformloading}
    <Div></Div>
    {:else}
        <UIFieldComponent>
            <FormRoot>
                {#await isallowedtorenderlabel()}
        <div> </div>
    {:then isallowedtorenderlabel}                
        {#if isallowedtorenderlabel}
                    <UILabelComponent></UILabelComponent>
                   {/if}
    {/await}
                {#await isallowedtorenderdescriptiontext()}
        <div> </div>
    {:then isallowedtorenderdescriptiontext}                
        {#if isallowedtorenderdescriptiontext}
                    <Para></Para>
                   {/if}
    {/await}
                {#await isallowedtorenderactivecomp()}
        <div> </div>
    {:then isallowedtorenderactivecomp}                
        {#if isallowedtorenderactivecomp}
                    <ActiveComp></ActiveComp>
                   {/if}
    {/await}
                {#await isallowedtorendercomponent()}
        <div> </div>
    {:then isallowedtorendercomponent}                
        {#if isallowedtorendercomponent}
                    <UIComponent {...uiComponentProps}></UIComponent>
                   {/if}
    {/await}
                {#await isallowedtorenderhelpertext()}
        <div> </div>
    {:then isallowedtorenderhelpertext}                
        {#if isallowedtorenderhelpertext}
                    <FormHelperText></FormHelperText>
                   {/if}
    {/await}
            </FormRoot>
        </UIFieldComponent>
    
   {/if}
    {/await}
