export default theme => ({
  root: {
    'padding': theme.spacing.unit,
    '&$withLabel': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textarea: {
    '& textarea': {
      height: 'initial',
    },
  },
  description: {
    transform: `translateX(-${theme.spacing.unit * 2}px)`,
    fontSize: '80%',
    color: theme.palette.grey[500],
  },
  withLabel: {},
});
