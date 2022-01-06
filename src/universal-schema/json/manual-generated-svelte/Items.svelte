<script lang="ts">
// Components
 import RecursiveFields from './RecursiveFields.svelte';
 import AdditionalItems from './components/AdditionalItems.svelte';
 import EnumValues from './components/EnumValues.svelte';
 import ItemsArray from './components/ItemsArray.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 



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
const isschematypearrayrecursivefield = async () => await rulesParser([]);
const isschematypearrayadditionalitems = async () => await rulesParser([]);
const isschematypearrayenumvalues = async () => await rulesParser([]);
const isschematypearrayitemsarray = async () => await rulesParser([]);
</script>

<main>
    {#await isschematypearrayrecursivefield()}
        <div> </div>
    {:then isschematypearrayrecursivefield}                
        {#if isschematypearrayrecursivefield}
        <RecursiveFields></RecursiveFields>
       {/if}
    {/await}
    {#await isschematypearrayadditionalitems()}
        <div> </div>
    {:then isschematypearrayadditionalitems}                
        {#if isschematypearrayadditionalitems}
        <AdditionalItems></AdditionalItems>
       {/if}
    {/await}
    {#await isschematypearrayenumvalues()}
        <div> </div>
    {:then isschematypearrayenumvalues}                
        {#if isschematypearrayenumvalues}
        <EnumValues></EnumValues>
       {/if}
    {/await}
    {#await isschematypearrayitemsarray()}
        <div> </div>
    {:then isschematypearrayitemsarray}                
        {#if isschematypearrayitemsarray}
        <ItemsArray></ItemsArray>
       {/if}
    {/await}
</main>
