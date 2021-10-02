import { Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
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
