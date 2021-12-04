// Library
import React from 'react';
import { View } from 'react-native';

// Material UI
import { Checkbox, Subheading } from 'react-native-paper';

// Props
import checkboxProps, { CheckBoxProps } from './checkbox.props';

export default ({ value, type, onChange, schema = {}, options = {}, ...rest }: CheckBoxProps) => {
  const { 
    onChange: givenOnChange, 
    onGroupChange, 
    onEnumChange, 
    label, 
    choices,
  } = checkboxProps({ onChange, schema, value });
  
  const GroupCheckbox = () => (
    <View component='fieldset'>
      <Subheading component='legend'>{label}</Subheading>
      <View>
        {
          choices.map((o) => {
            const checked = typeof value === 'string' || Array.isArray(value) ? 
                              value?.includes(o.key) 
                            : typeof value === 'boolean' && value;
            return (
              <Checkbox
                checked={checked ? 'checked' : 'unchecked'}
                color={'red'}
                onPress={onGroupChange(String(o.key), o.adds)}
                disabled={o.disabled || false}
                {...options}
              />
            )
          })
        }
      </View>
    </View>
  );

  const CheckboxEnumComponent = () => (
    <>
      {(schema.title || schema.description) && (
        <Subheading component='legend'>
          {schema.title || schema.description}
        </Subheading>
      )}
      {
        choices.map((ev) => {
          const checked = String(value) === String(ev.key);
          return (
            <Checkbox
                checked={checked ? 'checked' : 'unchecked'}
                onPress={onEnumChange(ev.key, ev.adds)}
                color={'red'}
                disabled={ev.disabled || false}
                {...options}
            />
          )
        })
      }
    </>
  );

  if (schema.type === 'boolean') {
    const stringToBoolean = !!value;
    return (
      <>
        {schema.description && (<Subheading component='legend'>{schema.description}</Subheading>)}
        <Checkbox
            checked={typeof value === 'boolean' ? value : stringToBoolean}
            onChange={givenOnChange}
            color={'red'}
            disabled={options.disabled || false}
            {...options}
        />
      </>
    );
  }

  return schema.parsedArray ? (
    <GroupCheckbox />
  ) : <CheckboxEnumComponent />;
};
