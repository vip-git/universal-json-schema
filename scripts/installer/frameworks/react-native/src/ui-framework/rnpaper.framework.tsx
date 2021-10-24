// Library
import React from 'react';
import { ScrollView, TextInput } from 'react-native';
import { Checkbox, Portal, Text as RNText } from 'react-native-paper';

// Types
import { UIFramework } from './types/rnpaper-framework.type';

const Surface = Portal.Host as any;
const Text = RNText as any;

export const uiFramework: UIFramework = {
  name: 'ReactNativePaper',
  platform: 'mobile',
  internal: {
    CrossPlatformWrapper: ({ children }) => (
      <ScrollView>
        {children} 
      </ScrollView>
    ),
    CrossPlatformLoadingWrapper: ({ children }) => (
      <Text> 
        {children} 
      </Text>
    ),
    FormButtons: ({ children }) => (<Surface> {children} </Surface>),
    ValidationMessages: ({ children }) => (<Surface> {children} </Surface>),
  },
  wrapperComponents: {
    InputLabel: ({ children }) => (
      <Text>
        {children} 
      </Text>
    ),
    FormLabel: ({ children }) => (<Text> {children} </Text>),
    AppBar: ({ children }) => (<Surface> {children} </Surface>),
    Tabs: ({ children }) => (<Surface> {children} </Surface>),
    Tab: ({ children }) => (<Surface> {children} </Surface>),
    Box: ({ children }) => (<Surface> {children} </Surface>),
    CircularProgress: ({ children }) => (<Surface> {children} </Surface>),
    Typography: ({ children }) => (<Text> {children} </Text>),
    Divider: ({ children }) => (<Surface> {children} </Surface>),
    IconButton: ({ children }) => (<Surface> {children} </Surface>),
    AddCircle: ({ children }) => (<Surface> {children} </Surface>),
    Stepper: ({ children }) => (<Surface> {children} </Surface>),
    Step: ({ children }) => (<Surface> {children} </Surface>),
    StepLabel: ({ children }) => (<Surface> {children} </Surface>),
    Button: ({ children }) => (<Surface> {children} </Surface>),
    ArrowUpward: ({ children }) => (<Surface> {children} </Surface>),
    ArrowDownward: ({ children }) => (<Surface> {children} </Surface>),
    RemoveCircle: ({ children }) => (<Surface> {children} </Surface>),

    // Configure Field Wrapper
    FormControl: ({ children }) => (
      <Surface>
        {children} 
      </Surface>
    ),
    FormGroup: ({ children }) => (<Surface> {children} </Surface>),


    FormHelperText: ({ children }) => (<Text> {children} </Text>),
    ActiveComp: ({ children }) => (<Text> {children} </Text>),
    Div: ({ children }) => (
      <Surface>
        {children}
      </Surface>
    ),
    Span: ({ children }) => (<Text> {children} </Text>),
    FieldsetHTML: ({ children }) => (
      <Surface>
        {children} 
      </Surface>
    ),
    Para: ({ children }) => (<Text> {children} </Text>)
  },
  components: {
    string: {
      Input: (props) => (
        <TextInput {...props} />
      ),
    },
    array: {
      select: (props) => <TextInput {...props} />,
    },
    boolean: {
      checkbox: (props) => <Checkbox {...props} />,
    },
    null: {
      emptyDiv: Surface,
    },
  },
  styles: {
    FieldSetStyles: {
      fieldSetContent: () => ({
        root: ''
      }),
      fieldSet: () => ({
        root: '',
        listItem: ''
      }),
      reorderControls: () => ({
        root: ''
      }),
      fieldSetObject: () => ({
        root: '',
        row: '',
        addItemBtn: ''
      })
    },
    FormFieldStyles: () => ({
      root: '',
    }),
    FormStyles: () => ({
      root: '',
    }),
    defaultTheme: () => {},
    FieldStyles: () => ({
      root: '',
      radioLabel: '',
      normalLabel: '',
      withLabel: '',
      customLabel: '',
      description: '',
    }),
    FormStepperStyles: () => {}
  }
}
