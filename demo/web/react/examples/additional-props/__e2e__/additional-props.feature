Feature: additionalProps Feature
    Scenario Outline: additionalProps Form scenario
        Given I have a form for page additionalProps with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Title          | string    | material-input | Chuck  | Chuck | title | false |
            
            | Subtitle          | string    | material-input | Norris  | Norris | subTitle | false |
            
            |           | object    | material-input | false  | false | additionalProperties | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | deafening-laugh-tie           | deafening-laugh-tie              | title |
            
            | common-delivery-attempt           | common-delivery-attempt              | subTitle |
            
            | jazzy-bottle-seek           | jazzy-bottle-seek              | additionalProperties |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | title | false   | false     | true | false | additional-props | additional-props |
            
            | subTitle | false   | false     | false | false | additional-props | additional-props |
            
            | additionalProperties | false   | false     | false | false | additional-props | additional-props |
            

