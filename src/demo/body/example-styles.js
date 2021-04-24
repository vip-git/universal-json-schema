import { makeStyles, createStyles } from '@material-ui/core/styles';

const rootStyle = (theme, type) => ({
  'position': 'relative',
  'padding': theme.spacing(1),
  '& $fullScreenButton': {
    top: 7,
    position: 'absolute',
    zIndex: 999,
    right: 10,
  },
  '& $ctr': {
    'position': 'relative',
    'display': (type === 'fullscreen') ? 'block' : 'flex',
    '& $sourceCtr': {
      'position': 'relative',
      'flex': 21,
      'width': '55%',
      'display': 'flex',
      'marginRight': theme.spacing(1),
      'flexDirection': 'column',
      '& >div:first-child': {
        'position': 'relative',
        'display': 'flex',
        'justifyContent': 'space-between',
        'marginBottom': theme.spacing(1),
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
      maxWidth: '40vw',
    },
  },
});

export default makeStyles((theme) => createStyles({
  root: {
    ...rootStyle(theme, 'normal'),
  },
  sourceCtr: {},
  display: {},
  ctr: {},
  fullScreenButton: {},
  fullScreenRoot: {
    ...rootStyle(theme, 'fullscreen'),
  },
}),
);
