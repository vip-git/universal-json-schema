const reactNativeformWrapperTemplate = `
import React from 'react';
import { Chip } from 'react-native-paper';

const ReactNativeForm = () => (
  <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
);

export default ReactNativeForm;
`;

module.exports = reactNativeformWrapperTemplate;
