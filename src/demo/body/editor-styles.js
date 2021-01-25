export default (theme) => ({
  root: {
    '& $ctr': {
      'position': 'relative',
      'borderStyle': 'solid',
      'borderWidth': 1,
      'borderColor': theme.palette.grey[500],
      'borderRadius': '5px',
      'flexDirection': 'column',
      'display': 'flex',
      '&$invalid': {
        '& $icon': {
          position: 'relative',
          color: 'red',
        },
      },
      '&$warning': {
        'position': 'relative',
        '& $icon': {
          color: 'darkred',
        },
      },
      '& $icon': {
        position: 'relative',
        color: 'green',
      },
      '& >div:first-child': {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: theme.palette.grey[500],
        backgroundColor: theme.palette.grey[300],
      },
    },
  },

  icon: {
    position: 'relative',
    marginLeft: theme.spacing(2),
  },
  title: {
    position: 'relative',
    marginLeft: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginRight: 6,
  },
  invalid: {
    position: 'relative',
  },
  warning: {
    position: 'relative',
  },
  ctr: {
    position: 'relative',
  },
});
