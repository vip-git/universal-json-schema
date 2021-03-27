Feature: radioChoice Feature
    Scenario Outline: radioChoice Form scenario
        Given I have a form for page radioChoice with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Number enum          | number    | initial value  | initial value | numberEnumRadio |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | numberEnumRadio |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | numberEnumRadio | false   | false    |
            

