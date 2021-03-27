Feature: nested Feature
    Scenario Outline: nested Form scenario
        Given I have a form for page nested with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Task list title          | string    | initial value  | initial value | title |
            
            | Tasks          | array    | initial value  | initial value | tasks |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | title |
            
            | new value           | new value             | tasks |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | title | false   | false    |
            
            | tasks | false   | false    |
            

