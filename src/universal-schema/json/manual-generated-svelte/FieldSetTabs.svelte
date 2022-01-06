<script lang="ts">
// Components
 import Div from './components/Div.svelte';
 import AppBar from './components/AppBar.svelte';
 import Tabs from './components/Tabs.svelte';
 import Tab from './components/Tab.svelte';
 import TabPanel from './components/TabPanel.svelte';
 import CircularProgress from './components/CircularProgress.svelte';
 import FieldSetObject from './FieldSetObject.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 

export let schema = ''; 

export let path = ''; 

export let xhrSchema = ''; 

export let uiSchema = ''; 

export let xhrProgress = ''; 

export let onTabChange = ''; 



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
const istabloading = async () => await rulesParser([]);
</script>

<Div>
    <AppBar>
        <Tabs>
            <Tab></Tab>
        </Tabs>
    </AppBar>
    <TabPanel>
        {#await istabloading()}
        <div> </div>
    {:then istabloading}                
        {#if istabloading}
            <Div>
                <CircularProgress></CircularProgress>
            </Div>
            {:else}
                <FieldSetObject></FieldSetObject>
            
           {/if}
    {/await}
    </TabPanel>
</Div>
