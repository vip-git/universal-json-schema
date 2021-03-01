
export default theme => ({
  // root: {
  //   width: '100%',
  // },
  // flex: {
  //   flex: 1,
  // },
  // drawerList: {
  //   width: 250,
  // },
  // flexCtr: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   width: '100%',
  //   justifyContent: 'space-between',
  // },
  // menuButton: {
  //   marginLeft: -12,
  //   marginRight: 20,
  // },

  // projectList: {
  //   display: 'flex',
  // },
  // popperClose: {
  //   pointerEvents: 'none',
  // },
  permanentLeftDrawer: {
  },
  drawerList: {
    width: 250,
  },
  toolbar: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 250px)',
      marginLeft: 250,
    },
    '& h2': {
      marginLeft: theme.spacing(3),
    },
  },
});
