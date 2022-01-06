<script lang="ts">
// Components
 import Div from './components/Div.svelte';
 import FormField from './FormField.svelte';
 import Typography from './components/Typography.svelte';
 import ReorderableFormField from './components/ReorderableFormField.svelte';
 import AddNewButton from './components/AddNewButton.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Functions
import getschemaproperties from '../helpers/schema-props';

// Properties 

export let className = ''; 

export let schema: any = {}; 

export let data: any = {}; 

export let uiSchema: any = {}; 

export let xhrSchema: any = {}; 

export let uiData: any = {};

export let definitions: any = {}; 

export let onChange = () => {};

export let id = ''; 

export let idxKey = ''; 

export let path = ''; 

export let validation = ''; 

export let isTabContent = false; 

export let tabKey = ''; 

export let prefixId = '';

const resolvedFacts = {
  uiSchemaType: uiSchema['ui:page'] && uiSchema['ui:page']['ui:layout'] || 'Default',
  isTabContent,
  schemaAdditionalPropertiesLength: Object.keys(schema).indexOf('additionalProperties'),
  schemaPropertiesLength: Object.keys(schema).indexOf('properties'),
  schemaAdditionalProperties: schema.additionalProperties
}

// Rules
const { rulesParser } = RulesEngine({
  resolvedFacts
}); 

const istabcontent = async () => await rulesParser({
    "all": [
        {
            "fact": "isTabContent",
            "operator": "equal",
            "value": true
        }
    ]
});

const isschemaadditionalpropertiesgreaterthanproperties = async () => await rulesParser(
    {
        "all": [
            {
                "fact": "schemaPropertiesLength",
                "operator": "isDefined",
                "value": true
            },
            {
                "fact": "schemaAdditionalPropertiesLength",
                "operator": "greaterThan",
                "value": {
                    "fact": "schemaPropertiesLength"
                }
            }
        ]
    }
);

const isschemawithadditionalproperties = async () => await rulesParser(
    {
        "all": [
            {
                "fact": "schemaAdditionalProperties",
                "operator": "isDefined",
                "value": true
            }
        ]
    }
);

const isschemaadditionalpropertieslessthanproperties = async () => await rulesParser(
    {
        "all": [
            {
                "fact": "schemaPropertiesLength",
                "operator": "isDefined",
                "value": true
            },
            {
                "fact": "schemaAdditionalPropertiesLength",
                "operator": "lessThan",
                "value": {
                    "fact": "schemaPropertiesLength"
                }
            }
        ]
    }
);

</script>

{#await istabcontent()}
        <div> </div>
    {:then istabcontent}                
        {#if istabcontent}
    <Div>
        <FormField></FormField>
    </Div>
    {:else}
        <Div>
            {#await isschemaadditionalpropertiesgreaterthanproperties()}
        <div> </div>
    {:then isschemaadditionalpropertiesgreaterthanproperties}                
        {#if isschemaadditionalpropertiesgreaterthanproperties}
                <FormField></FormField>
               {/if}
    {/await}
            {#await isschemawithadditionalproperties()}
        <div> </div>
    {:then isschemawithadditionalproperties}                
        {#if isschemawithadditionalproperties}
                <Typography></Typography>
                <ReorderableFormField></ReorderableFormField>
                <AddNewButton></AddNewButton>
               {/if}
    {/await}
            {#await isschemaadditionalpropertieslessthanproperties()}
        <div> </div>
    {:then isschemaadditionalpropertieslessthanproperties}                
        {#if isschemaadditionalpropertieslessthanproperties}
            {#each getschemaproperties({
                schema,
                data,
                uiSchema,
                xhrSchema
            }) as fieldSchemaProps}
                <FormField {...fieldSchemaProps}></FormField>
            {/each}
        {/if}
    {/await}
        </Div>
    
   {/if}
    {/await}
