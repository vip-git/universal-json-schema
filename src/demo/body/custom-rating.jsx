/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function SimpleRating({
  value: givenValue,
  persistData,
  color,
}) {
  const [value, setValue] = React.useState(givenValue || 0);

  return (
		<div>
			<Box component='fieldset' mb={0} borderColor='transparent'>
				<Typography component='legend'>Custom Rating Component</Typography>
				<Rating
					name='simple-controlled'
					value={value}
					onChange={(event, newValue) => {
					  setValue(newValue);
					  persistData(newValue);
					}}
					style={{
					  color,
					}}
				/>
			</Box>
		</div>
  );
}
