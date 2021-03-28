const exampleFormE2ETemplate = `Feature: <%= pageName %> Feature
    Scenario Outline: <%= pageName %> Form scenario
        Given I have a form for page <%= pageName %> with following "<fieldRef>" "<shouldReload>"

        When I test the field based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            <% Object.keys(schema.properties).forEach((schemaProp) => { %>
            | <%= schema.properties[schemaProp].title %>          | <%= schema.properties[schemaProp].type %>    | <%= schema.properties[schemaProp].widget %> | <%= formData && formData[schemaProp] %>  | <%= formData && formData[schemaProp] %> | <%= schemaProp %> | <%= hasOnLoadData %> |
            <% }); %>

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            <% Object.keys(schema.properties).forEach((schemaProp) => { %>
            | <%= schema.properties[schemaProp].data %>           | <%= schema.properties[schemaProp].data %>              | <%= schemaProp %> |
            <% }); %>
        Examples:
            | fieldRef   | tabName | stepName | shouldReload |
            <% Object.keys(schema.properties).forEach((schemaProp, schemaIn) => { %>
            | <%= schemaProp %> | false   | false    | <%= schemaIn === 0 %> |
            <% }); %>

`;

module.exports = exampleFormE2ETemplate;
