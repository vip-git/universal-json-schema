import { Theme } from '@material-ui/core/styles';
import { makeStyles, createStyles } from '@material-ui/styles';
// :Theme
export default makeStyles((theme: Theme) => createStyles({
  root: {
    'display': 'flex',
    '&:focus': {
      outline: 'none',
    },
  },
}),
);
