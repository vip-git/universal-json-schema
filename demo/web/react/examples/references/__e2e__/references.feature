Feature: references Feature
    Scenario Outline: references Form scenario
        Given I have a form for page references with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | Billing address          | object    | material-input | [object Object]  | [object Object] | billing_address | true |
            
            | Shipping address          | object    | material-input | [object Object]  | [object Object] | shipping_address | true |
            
            | Non-Recursive references          | object    | material-input | [object Object]  | [object Object] | noTree | true |
            
            | Recursive references          | object    | material-input | [object Object]  | [object Object] | tree | true |
            
            | Infinite Recursive references          | object    | material-input | false  | false | infinite | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | brave-purpose-spell           | brave-purpose-spell              | billing_address |
            
            | dry-ground-preach           | dry-ground-preach              | shipping_address |
            
            | handy-sea-step           | handy-sea-step              | noTree |
            
            | fallacious-history-shelter           | fallacious-history-shelter              | tree |
            
            | knowledgeable-energy-conceive           | knowledgeable-energy-conceive              | infinite |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | billing_address | false   | false     | true | false | references | references |
            
            | shipping_address | false   | false     | false | false | references | references |
            
            | noTree | false   | false     | false | false | references | references |
            
            | tree | false   | false     | false | false | references | references |
            
            | infinite | false   | false     | false | false | references | references |
            

