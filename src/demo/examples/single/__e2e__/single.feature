Feature: Single Feature
    Scenario Outline: Single Form scenario
        Given I have a form for page single with following <fieldRef>

        When I test the field based on following attributes
            | fieldName            | fieldType      | fieldFormValue | fieldUIValue   | fieldRef    |
            | A single-field form  | string         | initial value  | initial value  | firstField  |

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef    |
            | new value           | new value             | firstField  |

        Examples:
            | fieldRef   | tabName   | stepName   |
            | firstField | false     | false      |
