import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// :Theme
export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '&:focus': {
        outline: 'none',
      },
    },
  })
);
