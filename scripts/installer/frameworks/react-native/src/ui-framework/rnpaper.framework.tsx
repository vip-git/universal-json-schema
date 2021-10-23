// Library
import React from 'react';
import { TextInput, Checkbox, Paragraph } from 'react-native-paper';

// Types
import { UIFramework } from './types/rnpaper-framework.type';

export const uiFramework: UIFramework = {
  name: 'ReactNativePaper',
  platform: 'mobile',
  internal: {
    CrossPlatformWrapper: ({ children }) => (<Paragraph> {children} </Paragraph>),
    CrossPlatformLoadingWrapper: ({ children }) => (<Paragraph> {children} </Paragraph>),
    FormButtons: ({ children }) => (<Paragraph> {children} </Paragraph>),
    ValidationMessages: ({ children }) => (<Paragraph> {children} </Paragraph>),
  },
  wrapperComponents: {
    InputLabel: ({ children }) => (<Paragraph> {children} </Paragraph>),
    FormLabel: ({ children }) => (<Paragraph> {children} </Paragraph>),
    AppBar: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Tabs: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Tab: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Box: ({ children }) => (<Paragraph> {children} </Paragraph>),
    CircularProgress: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Typography: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Divider: ({ children }) => (<Paragraph> {children} </Paragraph>),
    IconButton: ({ children }) => (<Paragraph> {children} </Paragraph>),
    AddCircle: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Stepper: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Step: ({ children }) => (<Paragraph> {children} </Paragraph>),
    StepLabel: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Button: ({ children }) => (<Paragraph> {children} </Paragraph>),
    ArrowUpward: ({ children }) => (<Paragraph> {children} </Paragraph>),
    ArrowDownward: ({ children }) => (<Paragraph> {children} </Paragraph>),
    RemoveCircle: ({ children }) => (<Paragraph> {children} </Paragraph>),
    FormControl: ({ children }) => (<Paragraph> {children} </Paragraph>),
    FormGroup: ({ children }) => (<Paragraph> {children} </Paragraph>),
    FormHelperText: ({ children }) => (<Paragraph> {children} </Paragraph>),
    ActiveComp: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Div: ({ children }) => (<Paragraph> {children} </Paragraph>),
    FieldsetHTML: ({ children }) => (<Paragraph> {children} </Paragraph>),
    Para: ({ children }) => (<Paragraph> {children} </Paragraph>)
  },
  components: {
    string: {
      Input: (props) => <TextInput {...props} />,
    },
    array: {
      select: (props) => <TextInput {...props} />,
    },
    boolean: {
      checkbox: (props) => <Checkbox {...props} />,
    },
    null: {
      emptyDiv: Paragraph,
    },
  },
  styles: {
    FieldSetStyles: {
      fieldSetContent: () => ({
        root: ''
      }),
      fieldSet: () => ({
        root: ''
      }),
      reorderControls: () => ({
        root: ''
      }),
      fieldSetObject: () => ({
        root: ''
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
