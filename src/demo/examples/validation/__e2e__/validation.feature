Feature: validation Feature
    Scenario Outline: validation Form scenario
        Given I have a form for page validation with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Password          | string    | initial value  | initial value | pass1 |
            
            | Repeat password          | string    | initial value  | initial value | pass2 |
            
            | Age          | number    | initial value  | initial value | age |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | pass1 |
            
            | new value           | new value             | pass2 |
            
            | new value           | new value             | age |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | pass1 | false   | false    |
            
            | pass2 | false   | false    |
            
            | age | false   | false    |
            

