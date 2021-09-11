Feature: nested Feature
    Scenario Outline: nested Form scenario
        Given I have a form for page nested with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Task list title          | string    | material-input | My current tasks  | My current tasks | title | false |
            
            | Media (NL)          | array    | material-multiselect-native | [object Object],[object Object]  | [object Object],[object Object] | tasks | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | melted-assistance-prefer           | melted-assistance-prefer              | title |
            
            | violet-part-branch           | violet-part-branch              | tasks |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | title | false   | false     | true | false | nested | nested |
            
            | tasks | false   | false     | false | false | nested | nested |
            

