import { makeStyles, createStyles } from '@material-ui/core/styles';
// :Theme
export default makeStyles((theme) => createStyles({
  root: {
    padding: theme.spacing(2),
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
