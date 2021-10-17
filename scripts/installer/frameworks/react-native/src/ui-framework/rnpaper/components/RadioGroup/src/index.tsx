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
  const { choices } = radioGroupProps({ onChange, schema, options });
  return (
      <View
        id={htmlid}
        aria-label={path}
        name={path}
        value={String(value)} 
        {...radioGroupProps({ onChange, schema, options })}
        {...options}
      >
        {
          choices 
          && choices.length 
          && choices.map((o) => (
              <RadioButton 
                key={o.key} 
                value={String(o.key)}
              />
          ),
          )
        }
      </View>
  );
};
