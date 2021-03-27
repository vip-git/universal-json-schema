const exampleFormE2ETemplate = `Feature: <%= pageName %> Feature
    Scenario Outline: <%= pageName %> Form scenario
        Given I have a form for page <%= pageName %> with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            <% Object.keys(schema.properties).forEach((schemaProp) => { %>
            | <%= schema.properties[schemaProp].title %>          | <%= schema.properties[schemaProp].type %>    | initial value  | initial value | <%= schemaProp %> |
            <% }); %>

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            <% Object.keys(schema.properties).forEach((schemaProp) => { %>
            | new value           | new value             | <%= schemaProp %> |
            <% }); %>
        Examples:
            | fieldRef   | tabName | stepName |
            <% Object.keys(schema.properties).forEach((schemaProp) => { %>
            | <%= schemaProp %> | false   | false    |
            <% }); %>

`;

module.exports = exampleFormE2ETemplate;
