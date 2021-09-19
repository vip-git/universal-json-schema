Feature: radioChoice Feature
    Scenario Outline: radioChoice Form scenario
        Given I have a form for page radioChoice with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Number enum          | number    | radio | 3  | 3 | numberEnumRadio | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | 1           | 1              | numberEnumRadio |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | numberEnumRadio | false   | false     | true | false | radio-choice | radio-choice |
            

