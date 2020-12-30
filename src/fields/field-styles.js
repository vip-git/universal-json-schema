import { makeStyles, createStyles } from '@material-ui/core/styles';
// :Theme
export default makeStyles((theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      '&$withLabel': {
        marginTop: theme.spacing(3),
      },
    },
    textarea: {
      '& textarea': {
        height: 'initial',
      },
    },
    description: {
      transform: `translateY(4px)`,
      fontSize: '80%',
      color: theme.palette.grey[500],
    },
    withLabel: {},
  })
);
