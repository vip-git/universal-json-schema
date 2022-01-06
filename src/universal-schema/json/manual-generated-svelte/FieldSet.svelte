<script lang="ts">
// Components
 import FieldsetHTML from './components/FieldsetHTML.svelte';
 import LegendTitle from './components/LegendTitle.svelte';
 import LegendSubTitle from './components/LegendSubTitle.svelte';
 import ValidationMessages from './components/ValidationMessages.svelte';
 import FieldSetContent from './FieldSetContent.svelte';

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

const istheretitle = async () => await rulesParser({
  "all": [
    {
      "any": [
        {
          "fact": "hideTitle",
          "operator": "isNotDefined",
          "value": false
        },
        {
          "fact": "path",
          "operator": "equal",
          "value": ""
        },
        {
          "fact": "path",
          "operator": "contains",
          "value": "."
        }
      ],
      "all": [
        {
          "fact": "schemaItemsEnum",
          "operator": "isNotDefined",
          "value": false
        },
        {
          "fact": "schemaTitle",
          "operator": "isDefined",
          "value": true
        }
      ]
    }
  ]
});

const istheresubtitle = async () => await rulesParser({
  "all": [
    {
      "fact": "isDefined",
      "operator": "contains",
      "value": "schemaDescription"
    }
  ]
});

const ispathempty = async () => await rulesParser({
  "all": [
    {
      "fact": "path",
      "operator": "equal",
      "value": ""
    }
  ]
});
const fieldSetProps = {
  schema,
  data,
  uiSchema,
  xhrSchema,
  onChange,
  onXHRSchemaEvent,
  onUpdateKeyProperty,
}
</script>

<FieldsetHTML>
    {#await istheretitle()}
        <div> </div>
    {:then istheretitle}                
        {#if istheretitle}
        <LegendTitle></LegendTitle>
       {/if}
    {/await}
    {#await istheresubtitle()}
        <div> </div>
    {:then istheresubtitle}                
        {#if istheresubtitle}
        <LegendSubTitle></LegendSubTitle>
       {/if}
    {/await}
    {#await ispathempty()}
        <div> </div>
    {:then ispathempty}                
        {#if ispathempty}
        <ValidationMessages></ValidationMessages>
       {/if}
    {/await}
    <FieldSetContent {...fieldSetProps}></FieldSetContent>
</FieldsetHTML>
