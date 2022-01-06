<script lang="ts">
// Components
 import FieldSetArray from './FieldSetArray.svelte';
 import FieldSetObject from './FieldSetObject.svelte';

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
  schemaType: schema.type
}

// Rules
const { rulesParser } = RulesEngine({
  resolvedFacts
});

const isschematypearray = async () => await rulesParser({
  "all": [
    {
      "fact": "schemaType",
      "operator": "caseInsenstiveEqual",
      "value": "Array"
    }
  ]
});
const isschematypeobject = async () => await rulesParser({
  "all": [
    {
      "fact": "schemaType",
      "operator": "caseInsenstiveEqual",
      "value": "Object"
    }
  ]
});
const fieldSetProps = {
  schema,
  data,
  uiSchema,
  xhrSchema,
}
</script>

<main>
    {#await isschematypearray()}
        <div> </div>
    {:then isschematypearray}                
        {#if isschematypearray}
        <FieldSetArray {...fieldSetProps}></FieldSetArray>
       {/if}
    {/await}
    {#await isschematypeobject()}
        <div> </div>
    {:then isschematypeobject}                
        {#if isschematypeobject}
        <FieldSetObject {...fieldSetProps}></FieldSetObject>
       {/if}
    {/await}
</main>
