Feature: simple Feature
    Scenario Outline: simple Form scenario
        Given I have a form for page simple with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Example Multi select          | array    | material-multiselect-native | false  | false | multiSelect | true |
            
            | Example creatable select          | array    | creatable-select | test,teete,etetet  | test,teete,etetet | creatableSelectTest | true |
            
            | Example React Multi Select          | array    | material-multiselect | [object Object],No,etetet  | [object Object],No,etetet | selectTest | true |
            
            | Example XHR React Multi Select          | array    | material-multiselect | false  | false | xhrSelectTest | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | Red           | Red              | multiSelect |
            
            | teete           | teete              | creatableSelectTest |
            
            | etetet           | etetet              | selectTest |
            
            |            |               | xhrSelectTest |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | multiSelect | Array   | false     | true | true | simple | array |
            
            | creatableSelectTest | Array   | false     | false | true | simple | array |
            
            | selectTest | Array   | false     | false | true | simple | array |
            
            | xhrSelectTest | Array   | false     | false | true | simple | array |
            

