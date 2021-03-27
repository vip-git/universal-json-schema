Feature: prop-dependencies Feature
    Scenario Outline: prop-dependencies Form scenario
        Given I have a form for page single with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            | First name          | string    | initial value  | initial value | firstField |

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            | new value           | new value             | firstField |

        Examples:
            | fieldRef   | tabName | stepName |
            | firstField | false   | false    |

