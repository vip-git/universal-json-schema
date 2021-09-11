Feature: tabsUI Feature
    Scenario Outline: tabsUI Form scenario
        Given I have a form for page tabsUI with following "<fieldRef>" "<shouldReload>" "<tabName>" "<stepName>" "<hasXHRSchema>" "<folderName>" "<refrencePointer>"

        When I test the field "<fieldRef>" based on following attributes
            | fieldName           | fieldType | uiSchemaType      | fieldFormValue | fieldUIValue  | fieldRef   | shouldSkip |
            
            | A list of strings          | array    | material-multiselect-native | bazinga  | bazinga | listOfStrings | true |
            
            | A multiple choices list          | array    | material-multiselect-native | false  | false | multipleChoicesList | true |
            
            | A list of fixed items          | array    | material-multiselect-native | lorem ipsum,false,2  | lorem ipsum,false,2 | fixedItemsList | true |
            
            | A list with a minimal number of items          | array    | material-multiselect-native | false  | false | minItemsList | true |
            
            | List and item level defaults          | array    | material-multiselect-native | carp,trout,bream,dream,cream  | carp,trout,bream,dream,cream | defaultsAndMinItems | true |
            
            | Inner list          | array    | material-multiselect-native | lorem ipsum  | lorem ipsum | nestedList | true |
            
            | Unorderable items          | array    | material-multiselect-native | false  | false | unorderable | true |
            
            | Unremovable items          | array    | material-multiselect-native | false  | false | unremovable | true |
            
            | No add, remove and order buttons          | array    | material-multiselect-native | false  | false | noToolbar | true |
            
            | Fixed array without buttons          | array    | material-multiselect-native | 98  | 98 | fixedNoToolbar | true |
            

        Then I expect the field "<fieldRef>" to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef          |
            
            | wise-club-trace           | wise-club-trace              | listOfStrings |
            
            | foo           | foo              | multipleChoicesList |
            
            | prickly-fear-scatter           | prickly-fear-scatter              | fixedItemsList |
            
            | watery-trade-qualify           | watery-trade-qualify              | minItemsList |
            
            | didactic-law-roll           | didactic-law-roll              | defaultsAndMinItems |
            
            | ablaze-contract-administer           | ablaze-contract-administer              | nestedList |
            
            | bitesized-trousers-spot           | bitesized-trousers-spot              | unorderable |
            
            | remarkable-bike-paste           | remarkable-bike-paste              | unremovable |
            
            | lopsided-line-stimulate           | lopsided-line-stimulate              | noToolbar |
            
            | languid-reputation-hang           | languid-reputation-hang              | fixedNoToolbar |
            
        Examples:
            | fieldRef   | tabName | stepName | shouldReload | hasXHRSchema | folderName | refrencePointer |
            
            | listOfStrings | Technical   | false     | true | false | tabs | Technical |
            
            | multipleChoicesList | Technical   | false     | false | false | tabs | Technical |
            
            | fixedItemsList | Technical   | false     | false | false | tabs | Technical |
            
            | minItemsList | Technical   | false     | false | false | tabs | Technical |
            
            | defaultsAndMinItems | Technical   | false     | false | false | tabs | Technical |
            
            | nestedList | Technical   | false     | false | false | tabs | Technical |
            
            | unorderable | Technical   | false     | false | false | tabs | Technical |
            
            | unremovable | Technical   | false     | false | false | tabs | Technical |
            
            | noToolbar | Technical   | false     | false | false | tabs | Technical |
            
            | fixedNoToolbar | Technical   | false     | false | false | tabs | Technical |
            

