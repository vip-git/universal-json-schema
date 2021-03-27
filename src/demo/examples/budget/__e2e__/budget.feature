Feature: budget Feature
    Scenario Outline: budget Form scenario
        Given I have a form for page budget with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Roles          | array    | initial value  | initial value | roles |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | roles |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | roles | false   | false    |
            

