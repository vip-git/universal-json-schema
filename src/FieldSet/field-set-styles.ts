import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';

const common = (theme: Theme) => ({
  addItemBtn: {
    'display': 'flex',
    'justifyContent': 'flex-end',
    '&>button': {
      'background': theme.palette.primary.main,
      'width': '3.75em',
      'color': theme.palette.common.white,
      'height': '1.25em',
      'borderRadius': 5,
      '&> span': {
        position: 'absolute',
        fontSize: 'small',
        textIndent: 12,
      },
    },
  },
});

export default {
  fieldSet: (theme: Theme) => createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      border: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      border: `1px dotted ${theme.palette.primary.main}`,
      margin: theme.spacing(1),
      padding: theme.spacing(1),
    },
  }),

  fieldSetObject: (theme: Theme) => createStyles({
    root: {
      'display': 'flex',
      'flexDirection': 'column',
      '&$row': {
        flexDirection: 'row',
      },
    },
    row: {},
    listItem: {},
    addItemBtn: {
      ...common(theme).addItemBtn,
      marginTop: 15,
      marginBottom: 20,
    },
  }),

  fieldSetArray: (theme: Theme) => createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    listItem: {},
    ...common(theme),
  }),

  fieldSetTabs: makeStyles({
    root: {
      '&:focus': {
        outline: 'none',
      },
    },
  }),

  reorderable: {
    root: {
      'display': 'flex',
      'alignItems': 'baseline',
      'justifyContent': 'space-between',
      'placeItems': 'flex-start',
      '& >fieldset': {
        width: '100%',
      },
    },
    listItem: {},
  },

  reorderControls: (theme: Theme) => createStyles({
    root: {
      'display': 'flex',
      'border': `1px solid ${theme.palette.grey[400]}`,
      'alignItems': 'center',
      'borderRadius': 5,
      'alignSelf': 'flex-start',
      'marginTop': 7,
      '& >button': {
        'borderRadius': 0,
        'width': '1.25em',
        'height': '1.25em',
        '&:not(:last-child)': {
          borderRight: `1px solid ${theme.palette.grey[400]}`,
        },
      },
    },
    remove: {
      'background': theme.palette.error.main,
      'color': theme.palette.common.white,
      '& >span': {
        position: 'absolute',
      },
    },
    removeCanReorder: {
      marginRight: 10,
    },
  }),
  
  fieldSetContent: {
    root: {
      marginTop: 20,
    },
    listItem: {},
  },
};
