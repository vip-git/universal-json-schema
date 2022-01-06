<script lang="ts">
// Components
 import CrossPlatformWrapper from './components/CrossPlatformWrapper.svelte';
 import CrossPlatformLoadingWrapper from './components/CrossPlatformLoadingWrapper.svelte';
 import FormField from './FormField.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';
import FormSideEffects from '../helpers/form.side-effects';

// Properties 

export let theme = '';
  
export let formData = {}; 
  
export let schema = {}; 
  
export let xhrSchema = {}; 
  
export let uiSchema = {}; 
  
export let validations = {}; 

export let prefixId = '';
            
export let submitOnEnter = () => {};
            
export let onChange = () => {};
            
export let onUpload = () => {};
            
export let onSubmit = () => {};
            
export let onStepNext = () => {};
            
export let onStepBack = () => {};
            
export let onStepSkip = () => {};
            
export let onStepReset = () => {};
            
export let formButtons = () => {};

export let actionButtonPos = '';
            
export let onCancel = () => {};
   
export let activityIndicatorEnabled = false; 

export let submitValue = '';

export let cancelValue = '';

export let inProgressValue = '';
   
export let disabled = false; 

export let cancelVariant = '';

export let submitVariant = '';
            
export let onError = () => {};
  
export let interceptors = {}; 

// Side Effects
const {
  isFormLoading,
  isFormSubmitting,
  hasPageLayoutTabs,
  hasPageLayoutSteps,
  formEvents: {
    onXHRSchemaEvent,
    onUpdateKeyProperty
  }
} = FormSideEffects({
  formData,
  schema,
  xhrSchema,
  uiSchema,
  validations,
  prefixId,
  submitOnEnter,
  onChange,
  onSubmit,
  onStepNext,
  onStepBack,
  onStepSkip,
  onStepReset,
  onError,
  interceptors,
});

const resolvedFacts = {
  isFormLoading,
  isFormSubmitting,
  hasPageLayoutTabs,
  hasPageLayoutSteps
};

// Rules
const { rulesParser } = RulesEngine({
  resolvedFacts
});

const isformloading = async () => await rulesParser({
  "all": [
    {
      "fact": "isFormLoading",
      "operator": "equal",
      "value": true
    },
    {
      "fact": "hasPageLayoutTabs",
      "operator": "equal",
      "value": true
    }
  ]
});

const formFieldProps = {
  schema, 
  data: formData, 
  uiSchema,
  xhrSchema,
  onChange,
  onXHRSchemaEvent,
  onUpdateKeyProperty,
  resolvedFormFacts: resolvedFacts,
}

</script>

<CrossPlatformWrapper>
    {#await isformloading()}
        <div> </div>
    {:then isformloading}                
        {#if isformloading}
        <CrossPlatformLoadingWrapper></CrossPlatformLoadingWrapper>
        {:else}
            <FormField {...formFieldProps}></FormField>
        
       {/if}
    {/await}
</CrossPlatformWrapper>
