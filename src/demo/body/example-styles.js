export default (theme) => ({
  root: {
    'position': 'relative',
    'padding': theme.spacing(1),
    '& $ctr': {
      'position': 'relative',
      'display': 'flex',
      '& $sourceCtr': {
        'position': 'relative',
        'flex': 21,
        'width': '55%',
        'display': 'flex',
        'marginRight': theme.spacing(1),
        'flexDirection': 'column',
        '& >div:first-child': {
          position: 'relative',
          marginBottom: theme.spacing(1),
        },
        '& >div:nth-child(2)': {
          'position': 'relative',
          'display': 'flex',
          '& >div:first-child': {
            position: 'relative',
            flex: 21,
            marginRight: 5,
          },
          '& >div:nth-child(2)': {
            position: 'relative',
            flex: 21,
            marginLeft: 5,
          },
        },
      },
      '& $display': {
        position: 'relative',
        flex: 13,
      },
    },
  },
  sourceCtr: {},
  display: {},
  ctr: {},
});
