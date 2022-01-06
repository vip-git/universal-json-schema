<script lang="ts">
// Components
 import FieldSetStepper from './FieldSetStepper.svelte';
 import FieldSetTabs from './FieldSetTabs.svelte';
 import FieldSetDefault from './FieldSetDefault.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 
export let path = ''; 

export let schema: any = {}; 

export let data: any = {}; 

export let uiSchema: any = {}; 

export let xhrSchema: any = {}; 

export let onKeyDown = () => {};

export let onChange = () => {};

export let onXHRSchemaEvent = () => {};

export let hideTitle = ''; 

export let onUpdateKeyProperty = () => {};

export let dynamicKeyField = ''; 

export let prefixId = '';

const resolvedFacts = {
  uiSchemaType: uiSchema['ui:page'] && uiSchema['ui:page']['ui:layout'] || 'Default'
}

// Rules
const { rulesParser } = RulesEngine({
  resolvedFacts
}); 

const isuischemapagetypesteps = async () => await rulesParser({
  "all": [
    {
      "fact": "uiSchemaType",
      "operator": "equal",
      "value": "Steps"
    }
  ]
});

const isuischemapagetypetabs = async () => await rulesParser({
  "all": [
    {
      "fact": "uiSchemaType",
      "operator": "equal",
      "value": "Tabs"
    }
  ]
});

const isuischemapagetypedefault = async () => await rulesParser({
  "all": [
    {
      "fact": "uiSchemaType",
      "operator": "equal",
      "value": "Default"
    }
  ]
});
const fieldSetProps = {
  schema,
  data,
  uiSchema,
  xhrSchema,
  onChange,
}
</script>

<main>
    {#await isuischemapagetypesteps()}
        <div> </div>
    {:then isuischemapagetypesteps}                
        {#if isuischemapagetypesteps}
        <FieldSetStepper {...fieldSetProps}></FieldSetStepper>
       {/if}
    {/await}
    {#await isuischemapagetypetabs()}
        <div> </div>
    {:then isuischemapagetypetabs}                
        {#if isuischemapagetypetabs}
        <FieldSetTabs {...fieldSetProps}></FieldSetTabs>
       {/if}
    {/await}
    {#await isuischemapagetypedefault()}
        <div> </div>
    {:then isuischemapagetypedefault}                
        {#if isuischemapagetypedefault}
        <FieldSetDefault {...fieldSetProps}></FieldSetDefault>
       {/if}
    {/await}
</main>
