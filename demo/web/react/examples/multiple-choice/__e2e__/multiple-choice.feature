Feature: multipleChoice Feature
    Scenario Outline: multipleChoice Form scenario
        Given I have a form for page multipleChoice with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | A multiple choices list          | array    | checkboxes | foo,bar,fuzz,qux  | foo,bar,fuzz,qux | multipleChoicesList | true |
            
            | A single choice list          | string    | checkboxes | false  | false | singleChoicesList | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | fuzz           | fuzz              | multipleChoicesList |
            
            | foo           | foo              | singleChoicesList |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | multipleChoicesList | false   | false     | true | false | multiple-choice | multiple-choice |
            
            | singleChoicesList | false   | false     | false | false | multiple-choice | multiple-choice |
            

