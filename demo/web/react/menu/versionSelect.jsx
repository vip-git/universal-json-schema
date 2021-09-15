import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// Context
import VersionContext from '../context/version.context';

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
    bottom: 3
  },
  label: {
    color: 'white',
  },
  select: {
    color: 'white',
  },
}));

export default function VersionSelect({
  setVersion,
}) {
  const classes = useStyles();
  const version = useContext(VersionContext);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setVersion(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl}>
        <InputLabel className={classes.label}>Schema</InputLabel>
        <Select
            labelId='demo-controlled-open-select-label'
            id='demo-controlled-open-select'
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={version}
            onChange={handleChange}
            className={classes.select}
            disabled
        >
            <MenuItem value={3}> Version 3 </MenuItem>
            <MenuItem value={2}> Version 2 </MenuItem>
        </Select>
    </FormControl>
  );
}
