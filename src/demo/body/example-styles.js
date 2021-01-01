export default (theme) => ({
  root: {
    'padding': theme.spacing(1),
    '& $ctr': {
      'display': 'flex',
      '& $sourceCtr': {
        'flex': 21,
        'width': '55%',
        'display': 'flex',
        'marginRight': theme.spacing(1),
        'flexDirection': 'column',
        '& >div:first-child': {
          marginBottom: theme.spacing(1),
        },
        '& >div:nth-child(2)': {
          'display': 'flex',
          '& >div:first-child': {
            flex: 21,
            marginRight: 5,
          },
          '& >div:nth-child(2)': {
            flex: 21,
            marginLeft: 5,
          },
        },
      },
      '& $display': {
        flex: 13,
      },
    },
  },
  sourceCtr: {},
  display: {},
  ctr: {},
});
