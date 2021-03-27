Feature: numbers Feature
    Scenario Outline: numbers Form scenario
        Given I have a form for page numbers with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Number          | number    | initial value  | initial value | number |
            
            | Integer          | integer    | initial value  | initial value | integer |
            
            | Currency          | number    | initial value  | initial value | currency |
            
            | Number enum          | number    | initial value  | initial value | numberEnum |
            
            | Number enum          | number    | initial value  | initial value | numberEnumRadio |
            
            | Integer range          | integer    | initial value  | initial value | integerRange |
            
            | Integer range (by 10)          | integer    | initial value  | initial value | integerRangeSteps |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | number |
            
            | new value           | new value             | integer |
            
            | new value           | new value             | currency |
            
            | new value           | new value             | numberEnum |
            
            | new value           | new value             | numberEnumRadio |
            
            | new value           | new value             | integerRange |
            
            | new value           | new value             | integerRangeSteps |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | number | false   | false    |
            
            | integer | false   | false    |
            
            | currency | false   | false    |
            
            | numberEnum | false   | false    |
            
            | numberEnumRadio | false   | false    |
            
            | integerRange | false   | false    |
            
            | integerRangeSteps | false   | false    |
            

