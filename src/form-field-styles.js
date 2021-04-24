import { makeStyles, createStyles } from '@material-ui/core/styles';
// :Theme
export default makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      '&:focus': {
        outline: 'none',
      },
    },
  })
);
