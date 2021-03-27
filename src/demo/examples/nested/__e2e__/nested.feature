Feature: Nested Feature
    Scenario Outline: Nested Form scenario
        Given I have a form for page nested with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue   | fieldUIValue     | fieldRef   |
            | Task list title     | string    | My current tasks | My current tasks | firstField |

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            | new value           | new value             | firstField |

        Examples:
            | fieldRef   | tabName | stepName |
            | firstField | false   | false    |
