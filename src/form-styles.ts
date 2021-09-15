import { Theme } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/styles';
// :Theme
export default makeStyles((theme: Theme) => createStyles({
  root: {
    'padding': theme.spacing(2),
    '&:focus': {
      outline: 'none',
    },
  },
  formButtons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  submit: {
    fontSize: '100%',
  },
  cancel: {
    fontSize: '100%',
    marginRight: 15,
  },
  button: {
    fontSize: '100%',
  },
}),
);
