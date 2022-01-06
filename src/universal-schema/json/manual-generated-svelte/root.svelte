<script lang="ts">
// Components
 import CrossPlatformWrapper from './components/CrossPlatformWrapper.svelte';
 import CrossPlatformLoadingWrapper from './components/CrossPlatformLoadingWrapper.svelte';
 import FormField from './FormField.svelte';
 import FieldSet from './FieldSet.svelte';
 import FieldsetHTML from './components/FieldsetHTML.svelte';
 import LegendTitle from './components/LegendTitle.svelte';
 import LegendSubTitle from './components/LegendSubTitle.svelte';
 import ValidationMessages from './components/ValidationMessages.svelte';
 import FieldSetContent from './FieldSetContent.svelte';
 import FieldSetArray from './FieldSetArray.svelte';
 import Items from './Items.svelte';
 import RecursiveFields from './RecursiveFields.svelte';
 import Div from './components/Div.svelte';
 import Iterator from './components/Iterator.svelte';
 import Src from './components/Src.svelte';
 import AdditionalItems from './components/AdditionalItems.svelte';
 import EnumValues from './components/EnumValues.svelte';
 import ItemsArray from './components/ItemsArray.svelte';
 import FieldSetObject from './FieldSetObject.svelte';
 import FieldSetStepper from './FieldSetStepper.svelte';
 import Stepper from './components/Stepper.svelte';
 import Step from './components/Step.svelte';
 import StepLabel from './components/StepLabel.svelte';
 import Typography from './components/Typography.svelte';
 import Button from './components/Button.svelte';
 import FieldSetTabs from './FieldSetTabs.svelte';
 import AppBar from './components/AppBar.svelte';
 import Tabs from './components/Tabs.svelte';
 import Tab from './components/Tab.svelte';
 import TabPanel from './components/TabPanel.svelte';
 import CircularProgress from './components/CircularProgress.svelte';
 import FieldSetDefault from './FieldSetDefault.svelte';
 import ReorderableFormField from './components/ReorderableFormField.svelte';
 import AddNewButton from './components/AddNewButton.svelte';
 import FieldComponent from './FieldComponent.svelte';
 import UIFieldComponent from './components/UIFieldComponent.svelte';
 import FormRoot from './components/FormRoot.svelte';
 import UILabelComponent from './components/UILabelComponent.svelte';
 import Para from './components/Para.svelte';
 import ActiveComp from './components/ActiveComp.svelte';
 import UIComponent from './components/UIComponent.svelte';
 import FormHelperText from './components/FormHelperText.svelte';

// Parsers
import { RulesEngine } from '../helpers/rules-parser';

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

<CrossPlatformWrapper>
    {#await isformloading()}
        <div> </div>
    {:then isformloading}                
        {#if isformloading}
        <CrossPlatformLoadingWrapper></CrossPlatformLoadingWrapper>
        {:else}
            <FormField>
                {#await isfieldobjectorarray()}
        <div> </div>
    {:then isfieldobjectorarray}                
        {#if isfieldobjectorarray}
                    <FieldSet>
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
                            <FieldSetContent>
                                {#await isschematypearray()}
        <div> </div>
    {:then isschematypearray}                
        {#if isschematypearray}
                                    <FieldSetArray>
                                        <Items>
                                            {#await isschematypearrayrecursivefield()}
        <div> </div>
    {:then isschematypearrayrecursivefield}                
        {#if isschematypearrayrecursivefield}
                                                <RecursiveFields>
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
                                                </RecursiveFields>
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
                                        </Items>
                                    </FieldSetArray>
                                   {/if}
    {/await}
                                {#await isschematypeobject()}
        <div> </div>
    {:then isschematypeobject}                
        {#if isschematypeobject}
                                    <FieldSetObject>
                                        {#await isuischemapagetypesteps()}
        <div> </div>
    {:then isuischemapagetypesteps}                
        {#if isuischemapagetypesteps}
                                            <FieldSetStepper>
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
                                            </FieldSetStepper>
                                           {/if}
    {/await}
                                        {#await isuischemapagetypetabs()}
        <div> </div>
    {:then isuischemapagetypetabs}                
        {#if isuischemapagetypetabs}
                                            <FieldSetTabs>
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
                                            </FieldSetTabs>
                                           {/if}
    {/await}
                                        {#await isuischemapagetypedefault()}
        <div> </div>
    {:then isuischemapagetypedefault}                
        {#if isuischemapagetypedefault}
                                            <FieldSetDefault>
                                                {#await istabcontent()}
        <div> </div>
    {:then istabcontent}                
        {#if istabcontent}
                                                    <Div>
                                                        <FormField></FormField>
                                                    </Div>
                                                    {:else}
                                                        <Div>
                                                            {#await isschemaadditionalpropertiesgreaterthanproperties()}
        <div> </div>
    {:then isschemaadditionalpropertiesgreaterthanproperties}                
        {#if isschemaadditionalpropertiesgreaterthanproperties}
                                                                <FormField></FormField>
                                                               {/if}
    {/await}
                                                            {#await isschemawithadditionalproperties()}
        <div> </div>
    {:then isschemawithadditionalproperties}                
        {#if isschemawithadditionalproperties}
                                                                <Typography></Typography>
                                                                <ReorderableFormField></ReorderableFormField>
                                                                <AddNewButton></AddNewButton>
                                                               {/if}
    {/await}
                                                            {#await isschemaadditionalpropertieslessthanproperties()}
        <div> </div>
    {:then isschemaadditionalpropertieslessthanproperties}                
        {#if isschemaadditionalpropertieslessthanproperties}
                                                                <FormField></FormField>
                                                               {/if}
    {/await}
                                                        </Div>
                                                    
                                                   {/if}
    {/await}
                                            </FieldSetDefault>
                                           {/if}
    {/await}
                                    </FieldSetObject>
                                   {/if}
    {/await}
                            </FieldSetContent>
                        </FieldsetHTML>
                    </FieldSet>
                    {:else}
                        <FieldComponent>
                            {#await isformloading()}
        <div> </div>
    {:then isformloading}                
        {#if isformloading}
                                <Div></Div>
                                {:else}
                                    <UIFieldComponent>
                                        <FormRoot>
                                            {#await isallowedtorenderlabel()}
        <div> </div>
    {:then isallowedtorenderlabel}                
        {#if isallowedtorenderlabel}
                                                <UILabelComponent></UILabelComponent>
                                               {/if}
    {/await}
                                            {#await isallowedtorenderdescriptiontext()}
        <div> </div>
    {:then isallowedtorenderdescriptiontext}                
        {#if isallowedtorenderdescriptiontext}
                                                <Para></Para>
                                               {/if}
    {/await}
                                            {#await isallowedtorenderactivecomp()}
        <div> </div>
    {:then isallowedtorenderactivecomp}                
        {#if isallowedtorenderactivecomp}
                                                <ActiveComp></ActiveComp>
                                               {/if}
    {/await}
                                            {#await isallowedtorendercomponent()}
        <div> </div>
    {:then isallowedtorendercomponent}                
        {#if isallowedtorendercomponent}
                                                <UIComponent></UIComponent>
                                               {/if}
    {/await}
                                            {#await isallowedtorenderhelpertext()}
        <div> </div>
    {:then isallowedtorenderhelpertext}                
        {#if isallowedtorenderhelpertext}
                                                <FormHelperText></FormHelperText>
                                               {/if}
    {/await}
                                        </FormRoot>
                                    </UIFieldComponent>
                                
                               {/if}
    {/await}
                        </FieldComponent>
                    
                   {/if}
    {/await}
            </FormField>
        
       {/if}
    {/await}
</CrossPlatformWrapper>
