Feature: alternatives Feature
    Scenario Outline: alternatives Form scenario
        Given I have a form for page alternatives with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Color          | string    | material-native-select | Green  | Green | currentColor | false |
            
            | Color          | array    | material-multiselect-native | Blue  | Blue | colorMask | false |
            
            | Toggle          | boolean    | radio | false  | false | toggleMask | true |
            
            | Color          | array    | material-multiselect-native | Red  | Red | colorPalette | false |
            
            | Blend mode          | string    | material-native-select | Screen  | Screen | blendMode | false |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | Green           | Green              | currentColor |
            
            | Red           | Red              | colorMask |
            
            | envious-mask-slap           | envious-mask-slap              | toggleMask |
            
            | Red           | Red              | colorPalette |
            
            | Multiply           | Multiply              | blendMode |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | currentColor | false   | false     | true | false | alternatives | alternatives |
            
            | colorMask | false   | false     | false | false | alternatives | alternatives |
            
            | toggleMask | false   | false     | false | false | alternatives | alternatives |
            
            | colorPalette | false   | false     | false | false | alternatives | alternatives |
            
            | blendMode | false   | false     | false | false | alternatives | alternatives |
            

