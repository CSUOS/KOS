import React, { useState } from 'react';
import {
	Grid, Checkbox as Check, FormGroup, FormControlLabel
} from '@material-ui/core';

const Checkbox = () => {
	const [checked, setcChecked] = useState(false);

	const handleChange = (e: any) => {
		setcChecked(e.target.checked);
	};

	return (
		<Grid className="checkboxs">
			<FormGroup row>
				<FormControlLabel
					control={
						<Check
							checked={checked}
							onChange={handleChange}
						/>
					}
					label={undefined}
				/>
			</FormGroup>
		</Grid>
	);
};

export default Checkbox;
