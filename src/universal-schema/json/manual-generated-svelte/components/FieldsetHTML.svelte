<script>
// Library
import { onDestroy, onMount } from "svelte";

// Parsers
import { RulesEngine } from '../../helpers/rules-parser';

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
</script>
<slot />