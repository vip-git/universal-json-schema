Feature: simple Feature
    Scenario Outline: simple Form scenario
        Given I have a form for page simple with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Age          | integer    | updown | 75  | 75 | age | true |
            
            | Rating (Custom Component)          | integer    | customRating | 3  | 3 | customRating | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | 1361           | 1361              | age |
            
            | 17215           | 17215              | customRating |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | age | Integer   | false     | true | true | simple | integer |
            
            | customRating | Integer   | false     | false | true | simple | integer |
            

