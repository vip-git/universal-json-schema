<script>
    // Helpers
    import renderUIComponent from '../../helpers/render-ui-component';
    
    // Properties 
    export let schema = {};
    export let data = {};
    export let uiSchema = {};
    export let xhrSchema = {};
    export let onChange = () => {};
    
    // Component
    export const Component = renderUIComponent({
        schema,
        uiSchema,
        components: [],
        schemaVersion: '3'
    });
</script>
<div>
    <slot />
    <Component value='' label={schema.title}>
    </Component>
</div>
