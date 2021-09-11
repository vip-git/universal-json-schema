Feature: arrays Feature
    Scenario Outline: arrays Form scenario
        Given I have a form for page arrays with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | A list of fixed items          | array    | material-multiselect-native | Some text,true,one  | Some text,true,one | fixedItemsList | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | quack-two-trust           | quack-two-trust              | fixedItemsList |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | fixedItemsList | false   | false     | true | false | arrays | arrays |
            

