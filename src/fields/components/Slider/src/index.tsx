import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

/**
 * Todo: Implement all of this
 * - https://material-ui.com/components/slider/#range-slider
 */

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default ({
  label = '',
  path = '',
  value,
  schema,
  onChange,
  disabled = false,
  options = {},
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id='discrete-slider' gutterBottom>
        {label}
      </Typography>
      <Slider
        defaultValue={value}
        getAriaValueText={valuetext}
        aria-labelledby='discrete-slider'
        valueLabelDisplay='auto'
        step={10}
        marks
        min={10}
        max={110}
        disabled={disabled}
        onChange={onChange}
        {...options}
      />
    </div>
  );
};
