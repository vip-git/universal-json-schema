/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react';
import Rating from '@mui/lab/Rating';
import Typography from '@mui/material/Typography';

const SimpleRating = ({
  value: givenValue,
  persistData,
  color,
}) => {
  const [value, setValue] = React.useState(givenValue || 0);

  return (
	<>
		<Typography component='legend'>Custom Rating Component</Typography>
		<Rating
			name='simple-controlled'
			value={Number(value)}
			onChange={(event, newValue) => {
			  setValue(newValue);
			  persistData(newValue);
			}}
			style={{
			  color,
			}}
		/>
	</>
  );
};

const CustomRating = ({ onChange, formData, ...rest }) => (
	<SimpleRating
		id='standard-basic'
		label='Standard'
		value={Number(formData.customRating)}
        persistData={onChange}
        {...rest}
	/>
);

export default CustomRating;
