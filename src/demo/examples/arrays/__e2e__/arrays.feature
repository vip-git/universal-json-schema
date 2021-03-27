Feature: arrays Feature
    Scenario Outline: arrays Form scenario
        Given I have a form for page arrays with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | A list of fixed items          | array    | initial value  | initial value | fixedItemsList |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | fixedItemsList |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | fixedItemsList | false   | false    |
            

