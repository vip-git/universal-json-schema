Feature: single Feature
    Scenario Outline: single Form scenario
        Given I have a form for page single with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            |           |     | initial value  | initial value | title |
            
            |           |     | initial value  | initial value | type |
            
            | A single-field form          | string    | initial value  | initial value | properties |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | title |
            
            | new value           | new value             | type |
            
            | new value           | new value             | properties |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | title | false   | false    |
            
            | type | false   | false    |
            
            | properties | false   | false    |
            

