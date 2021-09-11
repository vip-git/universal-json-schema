Feature: tabsUI Feature
    Scenario Outline: tabsUI Form scenario
        Given I have a form for page tabsUI with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Createdon          | string    | material-input | 123123  | 123123 | Createdon | false |
            
            | Createdby          | string    | material-input | 123123  | 123123 | Createdby | false |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | dependent-impulse-squeeze           | dependent-impulse-squeeze              | Createdon |
            
            | cynical-singer-applaud           | cynical-singer-applaud              | Createdby |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | Createdon | Change Data   | false     | true | false | tabs | Changedata |
            
            | Createdby | Change Data   | false     | false | false | tabs | Changedata |
            

