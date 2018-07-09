export default theme => ({
  'root': {
    'padding': theme.spacing.unit,
    '& $ctr': {
      'display': 'flex',
      '& $sourceCtr': {
        'flex': 21,
        'display': 'flex',
        'marginRight': theme.spacing.unit,
        'flexDirection': 'column',
        '& >div:first-child': {
          marginBottom: theme.spacing.unit,
        },
        '& >div:nth-child(2)': {
          'display': 'flex',
          '& >div:first-child': {
            flex: 13,
            marginRight: theme.spacing.unit,
          },
          '& >div:nth-child(2)': {
            flex: 21,
          },
        },
      },
      '& $display': {
        flex: 13,
      },
    },
  },
  'sourceCtr': {},
  'display': {},
  'ctr': {},
});
