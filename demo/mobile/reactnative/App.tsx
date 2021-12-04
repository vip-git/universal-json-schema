// Library
import React from 'react';
import {
  DefaultTheme,
  Card,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

// Internal
import ReactNativeForm from '../../../src/cross-framework-wrapper/react/Form';

// Demo
import examples from '../../examples';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      accent: 'gray',
    },
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? theme.colors.primary : theme.colors.accent,
  };
  
  // Make this dynamic based on array selection
  const { schema, uiSchema, formData } = examples[3].numbers;

  const onSubmit = () => {};
  const onCancel = () => {};
  const onUpload = () => {};
  const onFormChanged = () => {};
  const onError = () => {};

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Card>
          <Card.Title title="JSON Schema Form" subtitle="React-Native Paper" />
          <Card.Content>
            <ReactNativeForm 
              schema={schema}
              xhrSchema={{}}
              uiSchema={uiSchema}
              formData={formData}
              onCancel={onCancel}
              onSubmit={onSubmit}
              onStepNext={onSubmit}
              onUpload={onUpload}
              onChange={onFormChanged}
              onError={onError}
              interceptors={{}}
              components={{}}
              validations={{}}
              submitOnEnter
              activityIndicatorEnabled
            />
          </Card.Content>
        </Card>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
