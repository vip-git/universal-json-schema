import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
// :Theme
export default makeStyles((theme: Theme) => createStyles({
  root: {
    'padding': theme.spacing(1),
    '&$withLabel': {
      marginTop: 10,
    },
    'flexBasis': '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  textarea: {
    '& textarea': {
      height: 'initial',
    },
  },
  description: {
    transform: 'translateY(4px)',
    fontSize: '80%',
    color: theme.palette.grey[500],
  },
  normalLabel: {
    left: 8,
    top: 8,
  },
  customLabel: {
    'left': 10,
    'transform': 'translate(0, 31px) scale(1)',
    '&.MuiFormLabel-filled': {
      transform: 'translate(0, 1.5px) scale(0.75);',
    },
    '&.Mui-focused': {
      transform: 'translate(0, 1.5px) scale(0.75);',
    },
  },
  withLabel: {},
}),
);
