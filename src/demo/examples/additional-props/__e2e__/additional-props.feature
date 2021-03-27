Feature: additionalProps Feature
    Scenario Outline: additionalProps Form scenario
        Given I have a form for page additionalProps with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | First name          | string    | initial value  | initial value | firstName |
            
            | Last name          | string    | initial value  | initial value | lastName |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | firstName |
            
            | new value           | new value             | lastName |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | firstName | false   | false    |
            
            | lastName | false   | false    |
            

