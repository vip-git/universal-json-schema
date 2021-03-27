Feature: refrences Feature
    Scenario Outline: refrences Form scenario
        Given I have a form for page refrences with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Billing address          |     | initial value  | initial value | billing_address |
            
            | Shipping address          |     | initial value  | initial value | shipping_address |
            
            | Non-Recursive references          |     | initial value  | initial value | noTree |
            
            | Recursive references          |     | initial value  | initial value | tree |
            
            | Infinite Recursive references          |     | initial value  | initial value | infinite |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | billing_address |
            
            | new value           | new value             | shipping_address |
            
            | new value           | new value             | noTree |
            
            | new value           | new value             | tree |
            
            | new value           | new value             | infinite |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | billing_address | false   | false    |
            
            | shipping_address | false   | false    |
            
            | noTree | false   | false    |
            
            | tree | false   | false    |
            
            | infinite | false   | false    |
            

