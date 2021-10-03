// Library
import React from 'react';
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

// Internal
import ReactNativeForm from '../../../scripts/installer/frameworks/react-native/src/Form';

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

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ReactNativeForm />
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
