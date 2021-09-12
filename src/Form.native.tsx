// Library
import React from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

const ReactNativeForm = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View>
      <Text> I was here </Text>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
    </View>
  );
};

export default ReactNativeForm;