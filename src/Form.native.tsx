// Library
import React from 'react';
import { View, Text } from 'react-native';
import { Chip } from 'react-native-paper';

const ReactNativeForm = () => {
  const [checked, setChecked] = React.useState('first');
  // onPress={() => {}}
  return (
    <View>
      <Text> I was here </Text>
      <Chip icon='information'>Example Chip</Chip>
    </View>
  );
};

export default ReactNativeForm;
