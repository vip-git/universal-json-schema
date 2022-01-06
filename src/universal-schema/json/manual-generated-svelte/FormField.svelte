<script lang="ts">
// Components
 import FieldSet from './FieldSet.svelte';
 import FieldComponent from './FieldComponent.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 

export let path = ''; 

export let data = {}; 

export let objectData: any = {};

export let uiData = ''; 

export let schemaVersion = ''; 

export let schema: any = {}; 

export let uiSchema = {}; 

export let xhrSchema = {}; 

export let definitions = {};  

export let interceptors = ''; 

export let xhrProgress = ''; 

export let key: string = '';
export let required: boolean = false;

export let id = ''; 

export let onChange = () => {};

export let onXHRSchemaEvent: any = () => {};

export let onSubmit: any = () => {};

export let validation = ''; 

export let onKeyDown: any = () => {}; 

export let onMoveItemUp: any = () => {}; 

export let onMoveItemDown: any = () => {};

export let onDeleteItem: any = () => {}; 

export let onAddItem: any = () => {}; 

export let onAddNewProperty: any = () => {}; 

export let onRemoveProperty: any = () => {};

export let onUpdateKeyProperty: any = () => {}; 

export let onNext: any = () => {};

export let onBack: any = () => {}; 

export let onSkip: any = () => {}; 

export let onTabChange: any = () => {};

export let isSubmitDisabled = ''; 

export let resolvedFormFacts = {};

const resolvedFacts = {
  schemaType: schema.type
}

// Rules
const { rulesParser } = RulesEngine({
  resolvedFacts,
});

const isfieldobjectorarray = async () => await rulesParser({
  "all": [
    {
      "any": [
        {
          "fact": "schemaType",
          "operator": "equal",
          "value": "object"
        },
        {
          "fact": "schemaType",
          "operator": "equal",
          "value": "array"
        }
      ],
      "all": [
        {
          "fact": "component",
          "operator": "equal",
          "value": false
        }
      ]
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

const fieldComponentProps = {
  schema,
  data,
  uiSchema,
  xhrSchema,
  onChange,
  onXHRSchemaEvent,
  resolvedFormFacts,
}
</script>

{#await isfieldobjectorarray()}
        <div> </div>
    {:then isfieldobjectorarray}           
        {#if isfieldobjectorarray}
    <FieldSet {...fieldSetProps}></FieldSet>
    {:else}
        <FieldComponent {...fieldComponentProps}></FieldComponent>
    
   {/if}
    {/await}
