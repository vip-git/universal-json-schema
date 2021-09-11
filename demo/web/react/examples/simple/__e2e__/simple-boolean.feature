Feature: simple Feature
    Scenario Outline: simple Form scenario
        Given I have a form for page simple with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | checkbox (default)          | boolean    | material-checkbox | false  | false | default | true |
            
            | radio buttons          | boolean    | radio | false  | false | radio | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | marked-cable-agree           | marked-cable-agree              | default |
            
            | Yes           | Yes              | radio |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | default | Boolean   | false     | true | true | simple | boolean |
            
            | radio | Boolean   | false     | false | true | simple | boolean |
            

