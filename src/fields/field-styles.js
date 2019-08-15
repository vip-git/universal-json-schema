export default theme => ({
  root: {
    padding: theme.spacing(1),
    "&$withLabel": {
      marginTop: theme.spacing(3)
    }
  },
  textarea: {
    "& textarea": {
      height: "initial"
    }
  },
  description: {
    transform: `translateX(-${theme.spacing(2)}px)`,
    fontSize: "80%",
    color: theme.palette.grey[500]
  },
  withLabel: {}
});
