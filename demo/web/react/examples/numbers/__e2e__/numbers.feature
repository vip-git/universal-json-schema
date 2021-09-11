Feature: numbers Feature
    Scenario Outline: numbers Form scenario
        Given I have a form for page numbers with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Number          | number    | material-input | 3.14  | 3.14 | number | true |
            
            | Integer          | integer    | updown | 42  | 42 | integer | true |
            
            | Currency          | number    | material-input | false  | false | currency | true |
            
            | Number enum          | number    | material-native-select | 2  | 2 | numberEnum | true |
            
            | Number enum          | number    | radio | 2  | 2 | numberEnumRadio | true |
            
            | Integer range          | integer    | range | 42  | 42 | integerRange | true |
            
            | Integer range (by 10)          | integer    | range | 80  | 80 | integerRangeSteps | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | 8720           | 8720              | number |
            
            | 4864           | 4864              | integer |
            
            | 6753           | 6,753              | currency |
            
            | 1           | 1              | numberEnum |
            
            | 1           | 1              | numberEnumRadio |
            
            | 100           | 100              | integerRange |
            
            | 100           | 100              | integerRangeSteps |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | number | false   | false     | true | false | numbers | numbers |
            
            | integer | false   | false     | false | false | numbers | numbers |
            
            | currency | false   | false     | false | false | numbers | numbers |
            
            | numberEnum | false   | false     | false | false | numbers | numbers |
            
            | numberEnumRadio | false   | false     | false | false | numbers | numbers |
            
            | integerRange | false   | false     | false | false | numbers | numbers |
            
            | integerRangeSteps | false   | false     | false | false | numbers | numbers |
            

