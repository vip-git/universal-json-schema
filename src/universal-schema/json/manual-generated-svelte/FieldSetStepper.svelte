<script lang="ts">
// Components
 import Div from './components/Div.svelte';
 import Stepper from './components/Stepper.svelte';
 import Step from './components/Step.svelte';
 import StepLabel from './components/StepLabel.svelte';
 import Typography from './components/Typography.svelte';
 import Button from './components/Button.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

// Properties 

export let schema = ''; 

export let uiSchema = ''; 

export let path = ''; 

export let onNext = ''; 

export let onBack = ''; 

export let onSkip = ''; 

export let onSubmit = ''; 



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
const isactivestepfinalstep = async () => await rulesParser([]);
const isskipsteptobeshown = async () => await rulesParser([]);
</script>

<Div>
    <Stepper>
        <Step></Step>
        <StepLabel></StepLabel>
    </Stepper>
    {#await isactivestepfinalstep()}
        <div> </div>
    {:then isactivestepfinalstep}                
        {#if isactivestepfinalstep}
        <Div>
            <Div></Div>
            <Typography></Typography>
            <Button></Button>
        </Div>
        {:else}
            <Div>
                <Div></Div>
                <Div>
                    <Button></Button>
                    {#await isskipsteptobeshown()}
        <div> </div>
    {:then isskipsteptobeshown}                
        {#if isskipsteptobeshown}
                        <Button></Button>
                       {/if}
    {/await}
                    <Button></Button>
                </Div>
            </Div>
        
       {/if}
    {/await}
</Div>
