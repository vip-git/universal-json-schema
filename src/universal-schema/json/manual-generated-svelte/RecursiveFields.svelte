<script lang="ts">
// Components
 import Div from './components/Div.svelte';
 import Iterator from './components/Iterator.svelte';
 import Src from './components/Src.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 

export let path = ''; 

export let schema = ''; 

export let d = ''; 

export let onMoveItemUp = ''; 

export let onMoveItemDown = ''; 

export let onDeleteItem = ''; 

export let uiSchema = ''; 

export let idx = ''; 

export let data = ''; 

export let canReorder = ''; 

export let definitions = ''; 

export let startIdx = ''; 

export let rest = ''; 

export let classes = ''; 



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
const isschemadataarray = async () => await rulesParser([]);
const isschemadatanotrecursivehole = async () => await rulesParser([]);
</script>

<Div>
    {#await isschemadataarray()}
        <div> </div>
    {:then isschemadataarray}                
        {#if isschemadataarray}
        <Iterator></Iterator>
        <Src></Src>
       {/if}
    {/await}
    {#await isschemadatanotrecursivehole()}
        <div> </div>
    {:then isschemadatanotrecursivehole}                
        {#if isschemadatanotrecursivehole}
        <Src></Src>
       {/if}
    {/await}
</Div>
