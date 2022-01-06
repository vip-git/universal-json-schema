<script lang="ts">
// Components
 import Items from './Items.svelte';

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


// formData,
// schema,
// xhrSchema,
// uiSchema,
// validations,
// prefixId,
// submitOnEnter,
// onChange,
// onSubmit,
// onStepNext,
// onStepBack,
// onStepSkip,
// onStepReset,
// onError,
// interceptors,

// Rules
const { rulesParser } = RulesEngine({}); 
</script>

<Items></Items>
