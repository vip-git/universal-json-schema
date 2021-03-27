Feature: schemaDeps Feature
    Scenario Outline: schemaDeps Form scenario
        Given I have a form for page schemaDeps with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Simple          | object    | initial value  | initial value | simple |
            
            | Conditional          |     | initial value  | initial value | conditional |
            
            | Array of conditionals          | array    | initial value  | initial value | arrayOfConditionals |
            
            | Fixed array of conditionals          | array    | initial value  | initial value | fixedArrayOfConditionals |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | simple |
            
            | new value           | new value             | conditional |
            
            | new value           | new value             | arrayOfConditionals |
            
            | new value           | new value             | fixedArrayOfConditionals |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | simple | false   | false    |
            
            | conditional | false   | false    |
            
            | arrayOfConditionals | false   | false    |
            
            | fixedArrayOfConditionals | false   | false    |
            

