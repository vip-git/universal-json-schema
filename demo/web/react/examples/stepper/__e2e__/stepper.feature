Feature: stepsUI Feature
    Scenario Outline: stepsUI Form scenario
        Given I have a form for page stepsUI with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Select Components          | object    | material-input | false  | false | SelectComponents | true |
            
            | Publish your Package          | object    | material-input | false  | false | PublishPackage | true |
            
            | Getting Started          | object    | material-input | [object Object]  | [object Object] | GettingStarted | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | naive-mailbox-sniff           | naive-mailbox-sniff              | SelectComponents |
            
            | poised-glove-emphasize           | poised-glove-emphasize              | PublishPackage |
            
            | healthy-trousers-buy           | healthy-trousers-buy              | GettingStarted |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | SelectComponents | false   | false     | true | false | stepper | stepper |
            
            | PublishPackage | false   | false     | false | false | stepper | stepper |
            
            | GettingStarted | false   | false     | false | false | stepper | stepper |
            

