Feature: schemaDeps Feature
    Scenario Outline: schemaDeps Form scenario
        Given I have a form for page schemaDeps with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Simple          | object    | material-input | [object Object]  | [object Object] | simple | true |
            
            | Person          | object    | material-input | [object Object]  | [object Object] | conditional | true |
            
            | Person          | array    | material-multiselect-native | [object Object],[object Object]  | [object Object],[object Object] | arrayOfConditionals | true |
            
            | Fixed array of conditionals          | array    | material-multiselect-native | [object Object],[object Object],[object Object]  | [object Object],[object Object],[object Object] | fixedArrayOfConditionals | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | actual-shake-squeeze           | actual-shake-squeeze              | simple |
            
            | jittery-goldfish-admit           | jittery-goldfish-admit              | conditional |
            
            | thirsty-calculator-saw           | thirsty-calculator-saw              | arrayOfConditionals |
            
            | brown-patience-suppose           | brown-patience-suppose              | fixedArrayOfConditionals |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | simple | false   | false     | true | false | schema-dependencies | schema-dependencies |
            
            | conditional | false   | false     | false | false | schema-dependencies | schema-dependencies |
            
            | arrayOfConditionals | false   | false     | false | false | schema-dependencies | schema-dependencies |
            
            | fixedArrayOfConditionals | false   | false     | false | false | schema-dependencies | schema-dependencies |
            

