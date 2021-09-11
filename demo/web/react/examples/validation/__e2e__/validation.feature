Feature: validation Feature
    Scenario Outline: validation Form scenario
        Given I have a form for page validation with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Password          | string    | password | false  | false | pass1 | true |
            
            | Repeat password          | string    | password | false  | false | pass2 | true |
            
            | Age          | number    | material-input | 8  | 8 | age | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | robust-wax-sweep           | robust-wax-sweep              | pass1 |
            
            | meaty-ad-grin           | meaty-ad-grin              | pass2 |
            
            | 82173           | 82173              | age |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | pass1 | false   | false     | true | false | validation | validation |
            
            | pass2 | false   | false     | false | false | validation | validation |
            
            | age | false   | false     | false | false | validation | validation |
            

