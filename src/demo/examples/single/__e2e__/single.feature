Feature: Single Feature
    Scenario Outline: Single Form scenario
        Given I have a form with following <fieldName>

        When I test the field based on following attributes
            | fieldType | fieldFormValue | fieldUIValue  |  fieldRef   |
            | string    | initial value  | initial value |  firstField |

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef    |
            | new value           | new value             | firstField  |

        Examples:
            | fieldName           | tabName   | stepName | fieldRef   |
            | A single-field form |   false   |  false   | firstField |
