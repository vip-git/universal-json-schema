// Library
import React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

// Props
import radioGroupProps from './radio-group.props';

export default ({ 
  path, 
  options = {},
  value,
  htmlid, 
  inputProps, 
  nullOption,
  schema = {},
  onChange,
  ...rest 
}) => {
  const { choices, onPress } = radioGroupProps({ onChange, schema, options });
  return (
    <View style={{ marginBottom: 10 }}>
      <RadioButton.Group
        value={String(value)} 
        onValueChange={(newValue) => onPress({ target: { value: String(newValue) }})}
        {...options}
      >
        {
          choices 
          && choices.length 
          && choices.map((o) => (
            <RadioButton.Item 
              key={o.key} 
              label={String(o.value)} 
              value={String(o.key)} 
            />
          ),
          )
        }
      </RadioButton.Group>
    </View>
  );
};
