Feature: simple Feature
    Scenario Outline: simple Form scenario
        Given I have a form for page simple with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | First name          | string    | material-input | Chuck  | Chuck | firstName | true |
            
            | Last name          | string    | material-input | Norris  | Norris | lastName | true |
            
            | Example select          | string    | material-native-select | false  | false | select | true |
            
            | Example React select          | string    | material-select | false  | false | react-select | true |
            
            | Password          | string    | password | noneed  | noneed | password | true |
            
            | Please upload your file          | string    | upload | false  | false | upload | true |
            
            | Bio          | string    | rich-text-editor | &lt;p&gt;&lt;u&gt;ads&lt;/u&gt;&lt;/p&gt;  | &lt;p&gt;&lt;u&gt;ads&lt;/u&gt;&lt;/p&gt; | bio | true |
            
            | Date          | string    | material-date | false  | false | date | true |
            
            | Telephone          | string    | material-input | false  | false | telephone | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | thirsty-queen-lie           | thirsty-queen-lie              | firstName |
            
            | steadfast-zinc-thank           | steadfast-zinc-thank              | lastName |
            
            | Yes           | Yes              | select |
            
            | Yes           | Yes              | react-select |
            
            | distinct-mask-conceive           | distinct-mask-conceive              | password |
            
            | checkbox.md           | checkbox.md              | upload |
            
            | international-idea-grow           | international-idea-grow              | bio |
            
            | 31-01-2021           | 31-01-2021              | date |
            
            | +3119121345           | +3119121345              | telephone |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | firstName | String   | false     | true | true | simple | string |
            
            | lastName | String   | false     | false | true | simple | string |
            
            | select | String   | false     | false | true | simple | string |
            
            | react-select | String   | false     | false | true | simple | string |
            
            | password | String   | false     | false | true | simple | string |
            
            | upload | String   | false     | false | true | simple | string |
            
            | bio | String   | false     | false | true | simple | string |
            
            | date | String   | false     | false | true | simple | string |
            
            | telephone | String   | false     | false | true | simple | string |
            

