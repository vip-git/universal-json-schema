Feature: alternatives Feature
    Scenario Outline: alternatives Form scenario
        Given I have a form for page alternatives with following <fieldRef>

        When I test the field based on following attributes
            | fieldName           | fieldType | fieldFormValue | fieldUIValue  | fieldRef   |
            
            | Brush color          |     | initial value  | initial value | currentColor |
            
            | Color mask          | array    | initial value  | initial value | colorMask |
            
            | Apply color mask          |     | initial value  | initial value | toggleMask |
            
            | Color palette          | array    | initial value  | initial value | colorPalette |
            
            | Blend mode          | string    | initial value  | initial value | blendMode |
            

        Then I expect the field to have following values
            | fieldResultOnChange | fieldUIResultOnChange | fieldRef   |
            
            | new value           | new value             | currentColor |
            
            | new value           | new value             | colorMask |
            
            | new value           | new value             | toggleMask |
            
            | new value           | new value             | colorPalette |
            
            | new value           | new value             | blendMode |
            
        Examples:
            | fieldRef   | tabName | stepName |
            
            | currentColor | false   | false    |
            
            | colorMask | false   | false    |
            
            | toggleMask | false   | false    |
            
            | colorPalette | false   | false    |
            
            | blendMode | false   | false    |
            

