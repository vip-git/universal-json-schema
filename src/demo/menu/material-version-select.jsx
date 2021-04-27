import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white',
    bottom: 3,
    marginLeft: 'auto!important',
  },
  label: {
    color: 'white',
  },
  select: {
    color: 'white',
  },
}));

export default function VersionSelect({
    version
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    if (event.target.value === 4) {
        window.location.href = 'https://react-jsonschema-form-material-ui-github56.vercel.app';
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Material UI</InputLabel>
        <Select
            labelId='demo-controlled-open-select-label'
            id='demo-controlled-open-select'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={version}
            onChange={handleChange}
            className={classes.select}
        >
            <MenuItem value={5}> Version 5 </MenuItem>
            <MenuItem value={4}> Version 4 </MenuItem>
        </Select>
    </FormControl>
  );
}
